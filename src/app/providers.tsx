"use client";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { useEffect } from "react";
import { hydrateCart } from "@/store/cartSlice";
import { loadCartFromStorage } from "@/store/middleware";

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const savedCart = loadCartFromStorage();
    if (savedCart) store.dispatch(hydrateCart(savedCart));
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
