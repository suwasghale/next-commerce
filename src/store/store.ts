"use client";

import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import { cartPersistenceMiddleware } from "./middleware";

/**
 * Central Redux store.
 * - Adds slices (reducers)
 * - Attaches middleware (including our persistence)
 * - Enables Redux DevTools in development
 */
export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // allow non-serializables like Dates if needed
    }).concat(cartPersistenceMiddleware), // ✅ persistence middleware
  devTools: process.env.NODE_ENV !== "production",
});

/** Typed helpers */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
