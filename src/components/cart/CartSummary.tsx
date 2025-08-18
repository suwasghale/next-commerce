import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  selectCartTotalCents,
  selectCartSubtotalCents,
  selectDiscountPercent,
  updateQuantity,
  removeFromCart,
  applyCoupon,
  removeCoupon,
} from "@/store/cartSlice";
import type { AppDispatch } from "@/store/store";
import Image from "next/image";
import { selectActiveCoupon } from "@/store/cartSlice";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const formatPrice = (cents: number) => (cents / 100).toFixed(2);

export default function CartSummary(){
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector(selectCartItems);
  const subtotalCents = useSelector(selectCartSubtotalCents);
  const totalCents = useSelector(selectCartTotalCents);
  const discountPercent = useSelector(selectDiscountPercent);

  const [couponInput, setCouponInput] = useState("");

  const activeCoupon = useSelector(selectActiveCoupon)

  const handleQuantityChange = (id: string | number, variantKey: string | undefined, qty: number, stock?: number) => {
    const clampedQty = stock !== undefined ? Math.min(qty, stock) : qty;
    dispatch(updateQuantity({ id, variantKey, quantity: clampedQty }));
  };

  const handleRemove = (id: string | number, variantKey?: string) => {
    if (confirm("Remove this item from cart?")) {
      dispatch(removeFromCart({ id, variantKey }));
    }
  };

  const handleApplyCoupon = () => {
    if (couponInput.trim() === "") return;
    dispatch(applyCoupon(couponInput));
    setCouponInput("");
  };

  const handleRemoveCoupon = () => {
    dispatch(removeCoupon());
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {items.length === 0 ? (
        <>
           <p>Your cart is empty.</p>
        <Link href= '/products' className="text-bold text-2xl flex items-center" >Buy Here <ArrowRight/> </Link>
        </>
     
      ) : (
        <>
          <ul className="divide-y divide-gray-200">
            {items.map((item) => (
              <li key={item.id + (item.variantKey || "")} className="flex items-center py-4">
                <Image height={200} width = {200} src={item.image} alt={item.title} className=" object-cover rounded" />
                <div className="ml-4 flex-1">
                  <p className="font-medium">{item.title}</p>
                  {item.variantKey && <p className="text-sm text-gray-500">{item.variantKey}</p>}
                  <div className="mt-1 flex items-center space-x-2">
                    <button
                      className="px-2 py-1 border rounded disabled:opacity-50"
                      disabled={item.quantity <= 1}
                      onClick={() => handleQuantityChange(item.id, item.variantKey, item.quantity - 1)}
                    >
                      -
                    </button>
                    <input
                    aria-label="stock"
                      type="number"
                      value={item.quantity}
                      min={1}
                      max={item.stock ?? undefined}
                      className="w-12 text-center border rounded"
                      onChange={(e) => handleQuantityChange(item.id, item.variantKey, Number(e.target.value), item.stock)}
                    />
                    <button
                      className="px-2 py-1 border rounded disabled:opacity-50"
                      disabled={item.stock !== undefined && item.quantity >= item.stock}
                      onClick={() => handleQuantityChange(item.id, item.variantKey, item.quantity + 1, item.stock)}
                    >
                      +
                    </button>
                  </div>
                  {item.stock !== undefined && <p className="text-sm text-gray-400">Stock remaining: {item.stock - item.quantity}</p>}
                </div>
                <div className="ml-4 text-right">
                  <p>${formatPrice(item.priceCents * item.quantity)}</p>
                  <button
                    className="text-red-500 mt-2"
                    onClick={() => handleRemove(item.id, item.variantKey)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Coupon */}
          <div className="mt-4 flex-col  space-x-2 space-y-2">
            <label htmlFor="coupon">Apply Coupon Code</label>
            <input
              type="text"
              id="coupon"
              placeholder="Coupon code"
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
              className="border p-2 rounded flex-1"
            />
            <button onClick={handleApplyCoupon} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Apply
            </button>
            {discountPercent > 0 && (
              <button onClick={handleRemoveCoupon} className="text-red-500 underline">
                Remove Coupon
              </button>
            )}

        {
            activeCoupon !== null ?     <p className='text-gray-800 text-lg'> Applied Coupon: <span className='text-2xl text-red-600 bg-amber-300'>{activeCoupon}</span> </p> : ""
        }

          </div>

          {/* Totals */}
          <div className="mt-6 border-t pt-4 space-y-2 text-right text-red-600">
            <p>Subtotal: ${formatPrice(subtotalCents)}</p>
            {discountPercent > 0 && <p>Discount ({discountPercent}%): -${formatPrice(subtotalCents - totalCents)}</p>}
            <p className="font-bold text-lg">Total: ${formatPrice(totalCents)}</p>
          </div>

          {/* Checkout Button */}
          <Link href='/checkout' className="mt-6 text-right">
            <button   className="cursor-pointer bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700">
              Proceed to Checkout
            </button>
          </Link>
        </>
      )}
    </div>
  );
};
