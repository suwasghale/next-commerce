"use client"; // This marks the file as a client-side module in Next.js 13+, needed for hooks & client-side Redux usage.

import { configureStore } from "@reduxjs/toolkit"; 
// Import the main function from Redux Toolkit to configure the store with reducers, middleware, and devtools.

import cartReducer from "./cartSlice"; 
// Import the cart slice reducer to manage the cart state in the store.

import { cartPersistenceMiddleware, loadCartFromStorage } from "./middleware"; 
// Import the middleware that automatically saves cart state to localStorage and a helper to load saved cart state on initialization.

/**
 * Central Redux store.
 * - Adds slices (reducers)
 * - Attaches middleware (including our persistence)
 * - Enables Redux DevTools in development
 */
export const store = configureStore({
  reducer: {
    cart: cartReducer, // Register the cart slice under the "cart" key in the global state
  },
  preloadedState: { cart: loadCartFromStorage() || undefined }, 
  // Initialize the cart state from localStorage if available, else leave it undefined (fallback to slice default)

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
      // Disable strict serializable checks so Redux doesn't warn about non-serializable values (like Dates or complex objects)
    }).concat(cartPersistenceMiddleware), 
    // Add our custom middleware that saves cart changes to localStorage after every action

  devTools: process.env.NODE_ENV !== "production", 
  // Enable Redux DevTools extension only in development mode
});


/** Typed helpers */
export type RootState = ReturnType<typeof store.getState>; 
// Type representing the full state tree in Redux. Useful for type-safe selectors.

export type AppDispatch = typeof store.dispatch; 
// Type representing the dispatch function. Useful for type-safe dispatching of actions.
