"use client";
import React, { useEffect, useState } from "react";
import crypto from "crypto-js"; // install with: npm install crypto-js

export const EsewaCheckout = ({ total }: { total: number }) => {
  const [signature, setSignature] = useState("");
  const totalInRupees = Math.round(total / 100);
  const transaction_uuid = Date.now().toString();

  // eSewa test credentials
  const productCode = "EPAYTEST";
  const secretKey = "8gBm/:&EnhH.1/q"; // 🔑 sandbox secret key (provided by eSewa docs)

  useEffect(() => {
    // signed fields
    const signedFields = [
      "total_amount",
      "transaction_uuid",
      "product_code",
    ];

    const data = `total_amount=${totalInRupees},transaction_uuid=${transaction_uuid},product_code=${productCode}`;

    // HMAC-SHA256
    const hash = crypto.HmacSHA256(data, secretKey).toString(crypto.enc.Base64);

    setSignature(hash);
  }, [totalInRupees, transaction_uuid]);

  return (
    <form
      action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
      method="POST"
      className="mt-4"
    >
      <input type="hidden" name="amount" value={totalInRupees} />
      <input type="hidden" name="tax_amount" value="0" />
      <input type="hidden" name="total_amount" value={totalInRupees} />
      <input type="hidden" name="transaction_uuid" value={transaction_uuid} />
      <input type="hidden" name="product_code" value={productCode} />
      <input type="hidden" name="product_service_charge" value="0" />
      <input type="hidden" name="product_delivery_charge" value="0" />
      <input
        type="hidden"
        name="success_url"
        value="http://localhost:3000/payment/success"
      />
      <input
        type="hidden"
        name="failure_url"
        value="http://localhost:3000/payment/failure"
      />

      {/* ✅ Now signed properly */}
      <input
        type="hidden"
        name="signed_field_names"
        value="total_amount,transaction_uuid,product_code"
      />
      <input type="hidden" name="signature" value={signature} />

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded mt-2 hover:bg-green-700"
      >
        Pay with eSewa
      </button>
    </form>
  );
};
