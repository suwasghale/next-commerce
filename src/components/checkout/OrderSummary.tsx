import React from "react";
import type { CartItem } from "@/store/cartSlice";
import Image from "next/image";

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  total: number;
  discount: number;
}

const formatPrice = (cents: number) => (cents / 100).toFixed(2);

export const OrderSummary: React.FC<OrderSummaryProps> = ({ items, subtotal, total, discount }) => {
  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>
      <ul className="divide-y divide-gray-200 mb-4">
        {items.map((item) => (
          <li key={item.id + (item.variantKey || "")} className="py-2 flex justify-between items-center">
            <Image height={50} width = {50} src={item.image} alt={item.title} className=" object-cover rounded" />
            <div>
              {item.title} {item.variantKey && `(${item.variantKey})`} x  <span className = 'font-bold text-xl'>{item.quantity}</span>
            </div>
            <div>${formatPrice(item.priceCents * item.quantity)}</div>
          </li>
        ))}
      </ul>
      <p>Subtotal: ${formatPrice(subtotal)}</p>
      {discount > 0 && <p>Discount: {discount}%</p>}
      <p className="font-bold text-lg">Total: ${formatPrice(total)}</p>
    </div>
  );
};

// "use client";
// import React from "react";
// import { useSelector } from "react-redux";
// import { EsewaCheckout } from "./EsewaCheckoutButton"; // 👈 import the new button

// export default function OrderSummary() {
//   const cart = useSelector((state: any) => state.cart);
//   const total = cart.items.reduce(
//     (acc: number, item: any) => acc + item.price * item.quantity,
//     0
//   );

//   return (
//     <div className="p-4 bg-gray-100 rounded-lg shadow-md">
//       <h2 className="text-xl font-bold mb-4">Order Summary</h2>

//       <ul>
//         {cart.items.map((item: any) => (
//           <li key={item.id} className="flex justify-between mb-2">
//             <span>
//               {item.name} x {item.quantity}
//             </span>
//             <span>Rs. {item.price * item.quantity}</span>
//           </li>
//         ))}
//       </ul>

//       {/* Applied Coupon */}
//       {cart.activeCoupon && (
//         <p className="text-green-600 font-semibold mt-2">
//           Applied Coupon: {cart.activeCoupon}
//         </p>
//       )}

//       <div className="flex justify-between mt-4 font-bold text-lg">
//         <span>Total:</span>
//         <span>Rs. {total}</span>
//       </div>

//       {/* ✅ Payment Options */}
//       <div className="mt-6 space-y-3">
//         <EsewaCheckout total={total} />   {/* 👈 eSewa button here */}
//         {/* Later: <KhaltiCheckout total={total} /> */}
//         {/* Later: <StripeCheckout total={total} /> */}
//       </div>
//     </div>
//   );
// }


