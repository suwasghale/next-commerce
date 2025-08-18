"use client";

import React, { useState } from "react";

export const CheckoutForm: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    shipping: "standard",
    payment: "mock",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just mock submission
    console.log("Checkout data:", form);
    alert("Order placed successfully (mock)!");
    // TODO: clear cart, redirect to order confirmation
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded space-y-4">
      <h2 className="text-xl font-bold mb-2">Shipping Info</h2>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" className="border p-2 rounded w-full" required />
      <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" className="border p-2 rounded w-full" required />
      <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="border p-2 rounded w-full" required />
      <input name="address" value={form.address} onChange={handleChange} placeholder="Address" className="border p-2 rounded w-full" required />

      <h2 className="text-xl font-bold mt-4">Shipping Method</h2>
      <select title='shipping' name="shipping" value={form.shipping} onChange={handleChange} className="border p-2 rounded w-full">
        <option value="standard">Standard (Free)</option>
        <option value="express">Express (+$5)</option>
      </select>

      <h2 className="text-xl font-bold mt-4">Payment Method</h2>
      <select title="payment" name="payment" value={form.payment} onChange={handleChange} className="border p-2 rounded w-full">
        <option value="mock">Mock Payment</option>
        <option value="esewa">eSewa</option>
        <option value="stripe">Stripe</option>
      </select>

      <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 mt-4">
        Place Order
      </button>
    </form>
  );
};
