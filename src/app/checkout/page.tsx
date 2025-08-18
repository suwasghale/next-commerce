"use client";

import React from "react";
import { useSelector } from "react-redux";
import { selectCartItems, selectCartSubtotalCents, selectCartTotalCents, selectDiscountPercent } from "@/store/cartSlice";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { OrderSummary } from "@/components/checkout/OrderSummary";

const CheckoutPage: React.FC = () => {
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotalCents);
  const total = useSelector(selectCartTotalCents);
  const discount = useSelector(selectDiscountPercent);

  if (items.length === 0) return <p className="p-4">Your cart is empty.</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 grid md:grid-cols-2 gap-6">
      <CheckoutForm />
      <OrderSummary items={items} subtotal={subtotal} total={total} discount={discount} />
    </div>
  );
};

export default CheckoutPage;
