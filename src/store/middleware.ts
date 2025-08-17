import type { Middleware } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import type { CartState } from "./cartSlice";

/**
 * Key used in localStorage for persisting cart state.
 */
const CART_STORAGE_KEY = "cart_state";

/**
 * Middleware to persist cart changes in localStorage.
 * - Runs on every dispatched action
 * - After reducers run, checks if cart has changed
 * - Saves only the cart slice, not the whole Redux state
 */
export const cartPersistenceMiddleware: Middleware<{}, RootState> =
  (storeAPI) => (next) => (action) => {
    const result = next(action);

    const state = storeAPI.getState();
    const cartState = state.cart;

    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartState));
    } catch (error) {
      console.warn("Failed to save cart state:", error);
    }

    return result;
  };

/**
 * Load cart from localStorage.
 * - Returns a fully typed CartState or null
 */
export function loadCartFromStorage(): CartState | null {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    if (!saved) return null;

    const parsed = JSON.parse(saved);

    // ✅ Ensure it has the right shape (basic safety check)
    if (
      typeof parsed === "object" &&
      parsed.itemsByKey &&
      typeof parsed.itemsByKey === "object"
    ) {
      return {
        itemsByKey: parsed.itemsByKey,
        activeCoupon: parsed.activeCoupon ?? null,
      } as CartState;
    }

    return null;
  } catch (error) {
    console.warn("Failed to load cart state:", error);
    return null;
  }
}
