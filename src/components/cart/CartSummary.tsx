"use client";

import { FC } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  selectCartItems,
  selectCartSubtotalCents,
  selectDiscountPercent,
  selectCartTotalCents,
  updateQuantity,
  removeFromCart,
} from "@/store/cartSlice";
import Image from "next/image";

const CartSummary: FC = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const subtotalCents = useAppSelector(selectCartSubtotalCents);
  const discountPercent = useAppSelector(selectDiscountPercent);
  const totalCents = useAppSelector(selectCartTotalCents);

  const handleIncrease = (id: number | string, variantKey?: string) => {
    const item = items.find((i) => i.id === id && i.variantKey === variantKey);
    if (!item) return;
    dispatch(updateQuantity({ id, variantKey, quantity: item.quantity + 1 }));
  };

  const handleDecrease = (id: number | string, variantKey?: string) => {
    const item = items.find((i) => i.id === id && i.variantKey === variantKey);
    if (!item) return;
    dispatch(updateQuantity({ id, variantKey, quantity: item.quantity - 1 }));
  };

  const handleRemove = (id: number | string, variantKey?: string) => {
    dispatch(removeFromCart({ id, variantKey }));
  };

  if (items.length === 0)
    return <div className="p-6">Your cart is empty.</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={`${item.id}-${item.variantKey || "default"}`}
            className="flex items-center justify-between border-b pb-2"
          >
            <div className="flex items-center gap-4">
              <Image
                src={item.image}
                alt={item.title}
                height={200}
                width={200}
                className=" object-cover rounded"
              />
              <div>
                <h3 className="font-medium">{item.title}</h3>
                {item.variantKey && (
                  <p className="text-sm text-gray-500">{item.variantKey}</p>
                )}
                <p className="text-sm text-gray-700">
                  ${(item.priceCents / 100).toFixed(2)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleDecrease(item.id, item.variantKey)}
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => handleIncrease(item.id, item.variantKey)}
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                +
              </button>

              <button
                onClick={() => handleRemove(item.id, item.variantKey)}
                className="ml-4 text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t pt-4 space-y-2">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>${(subtotalCents / 100).toFixed(2)}</span>
        </div>
        {discountPercent > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount ({discountPercent}%):</span>
            <span>- ${(subtotalCents * discountPercent / 100 / 100).toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between font-bold text-lg">
          <span>Total:</span>
          <span>${(totalCents / 100).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
