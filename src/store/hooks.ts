// src/store/hooks.ts
"use client";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

/**
 * Custom typed hooks for Redux usage across the app.
 * 
 * - `useAppDispatch`: dispatch typed actions without retyping every time.
 * - `useAppSelector`: select typed state slices safely.
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
