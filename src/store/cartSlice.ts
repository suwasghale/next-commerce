// src/store/cartSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

/**
 * ──────────────────────────────────────────────────────────────────────────────
 * PRICE HANDLING (IMPORTANT)
 * ──────────────────────────────────────────────────────────────────────────────
 * We store prices in MINOR UNITS (integer cents) to avoid floating-point issues.
 * Example: $12.99 -> priceCents = 1299
 *
 * In your UI, format as dollars with Intl.NumberFormat or (priceCents / 100).toFixed(2)
 */

// Build a stable key from product id + optional variant
export const makeItemKey = (id: string | number, variantKey?: string) =>
  `${id}${variantKey ? ":" + variantKey : ""}`;

/**
 * Cart item stored in Redux (prices in cents).
 * - `variantKey` distinguishes size/color/etc. for same product id.
 * - `stock` optionally caps quantity.
 */
export interface CartItem {
  id: string | number;   // Product ID
  title: string;         // Display title
  priceCents: number;    // Price in cents (e.g., $12.99 => 1299)
  image: string;         // Thumbnail URL
  quantity: number;      // Current quantity
  variantKey?: string;   // e.g., "size:M|color:Blue"
  stock?: number;        // Optional stock limit for this item
}

/**
 * Normalized cart: dictionary keyed by `${id}${variantKey?}` for O(1) access.
 */
export interface CartState {
  itemsByKey: Record<string, CartItem>;
  activeCoupon: string | null; // store only the chosen code; validate server-side in real apps
}

/**
 * Demo coupon book (percent off). In production, fetch/validate server-side.
 */
const COUPONS: Record<string, number> = {
  TIHAR25: 25,
  DASHAIN25: 25,
  WINTER10: 10,
  SPRING15: 15,
};

/** Initial state. SSR-safe (no localStorage/window access). */
const initialState: CartState = {
  itemsByKey: {},
  activeCoupon: null,
};

/** Utilities */
const clampQuantity = (q: number, min: number, max: number) =>
  Math.max(min, Math.min(max, Math.floor(q)));

const ensurePositiveQuantity = (q: number) => Math.max(1, Math.floor(q || 1));

/**
 * Slice
 * Immer lets us "mutate" state; RTK produces immutable updates under the hood.
 */
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    /**
     * Add a new item OR increase quantity if same id+variant exists.
     * - Accepts a full CartItem (caller-friendly).
     * - Quantity is normalized and clamped against stock (if provided).
     */
    addItem: (state, action: PayloadAction<CartItem>) => {
      const incoming = action.payload;

      // Normalize key and quantity
      const key = makeItemKey(incoming.id, incoming.variantKey);
      const addQty = ensurePositiveQuantity(incoming.quantity);

      const existing = state.itemsByKey[key];
      if (existing) {
        // Remaining capacity if stock is defined
        const remaining = typeof existing.stock === "number"
          ? Math.max(0, existing.stock - existing.quantity)
          : Infinity;

        const increment = clampQuantity(addQty, 0, remaining);
        existing.quantity += increment;

        if (increment < addQty) {
          // Optionally surface this to a toast in UI
          console.warn(
            `Cart add limited by stock: requested ${addQty}, added ${increment} for ${key}`
          );
        }
      } else {
        // New line item — clamp initial quantity to stock (if any)
        const maxAllowed = typeof incoming.stock === "number" ? incoming.stock : Infinity;
        const initialQty = clampQuantity(addQty, 1, maxAllowed);
        state.itemsByKey[key] = { ...incoming, quantity: initialQty };
      }
    },

    /**
     * Update quantity directly (set), respecting stock and minimum of 1.
     * If quantity <= 0, remove the item (common UX pattern).
     */
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string | number; variantKey?: string; quantity: number }>
    ) => {
      const { id, variantKey, quantity } = action.payload;
      const key = makeItemKey(id, variantKey);
      const existing = state.itemsByKey[key];
      if (!existing) return;

      if (quantity <= 0) {
        delete state.itemsByKey[key];
        return;
      }

      const maxAllowed = typeof existing.stock === "number" ? existing.stock : Infinity;
      existing.quantity = clampQuantity(quantity, 1, maxAllowed);
    },

    /**
     * Remove an item completely (by id + optional variant).
     */
    removeFromCart: (
      state,
      action: PayloadAction<{ id: string | number; variantKey?: string }>
    ) => {
      const { id, variantKey } = action.payload;
      const key = makeItemKey(id, variantKey);
      delete state.itemsByKey[key];
    },

    /**
     * Clear the entire cart.
     */
    clearCart: (state) => {
      state.itemsByKey = {};
    },

        /**
     * Replace the entire cart state with a saved snapshot (e.g. from localStorage).
     * - Expect a full CartState payload
     * - Useful on app hydration (SSR/CSR handoff or reload)
     */
    hydrateCart: (state, action: PayloadAction<CartState>) => {
      state.itemsByKey = action.payload.itemsByKey ?? {};
      state.activeCoupon = action.payload.activeCoupon ?? null;
    },


    /**
     * Apply a coupon code (client-side). In a real system, verify server-side.
     * If code unknown, just store it (or you can reject here).
     */
    applyCoupon: (state, action: PayloadAction<string>) => {
      state.activeCoupon = action.payload.trim().toUpperCase();
    },

    /**
     * Remove any applied coupon.
     */
    removeCoupon: (state) => {
      state.activeCoupon = null;
    },
  },
});

/* =========================
   Selectors (typed helpers)
   ========================= */

// Base slice
const selectCartSlice = (s: RootState) => s.cart;

// Items dict → array (useful for rendering & persistence)
export const selectCartItems = (s: RootState): CartItem[] =>
  Object.values(selectCartSlice(s).itemsByKey);

// Total item count (sum of quantities)
export const selectCartCount = (s: RootState): number =>
  selectCartItems(s).reduce((sum, i) => sum + i.quantity, 0);

// Subtotal in cents (sum of price * qty)
export const selectCartSubtotalCents = (s: RootState): number =>
  selectCartItems(s).reduce((sum, i) => sum + i.priceCents * i.quantity, 0);

// Active discount percent (0..100)
export const selectDiscountPercent = (s: RootState): number => {
  const code = selectCartSlice(s).activeCoupon;
  return code ? COUPONS[code] ?? 0 : 0;
};

// Total after discount, in cents (no tax/shipping here)
export const selectCartTotalCents = (s: RootState): number => {
  const subtotal = selectCartSubtotalCents(s);
  const pct = selectDiscountPercent(s);
  return Math.round(subtotal - (subtotal * pct) / 100);
};

// active coupon code
export const selectActiveCoupon = (state: RootState) => state.cart.activeCoupon;


// Pick a single item (by id + variant)
export const makeSelectItem =
  (id: string | number, variantKey?: string) =>
  (s: RootState): CartItem | undefined =>
    selectCartSlice(s).itemsByKey[makeItemKey(id, variantKey)];

/* ============
   Exports
   ============ */
export const {
  addItem,
  updateQuantity,
  removeFromCart,
  clearCart,
  hydrateCart,
  applyCoupon,
  removeCoupon,
} = cartSlice.actions;

export default cartSlice.reducer;
