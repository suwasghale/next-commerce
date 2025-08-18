import CryptoJS from "crypto-js";

export function generateEsewaSignature(
  total_amount: string,
  transaction_uuid: string,
  product_code: string,
  secret: string
) {
  const message = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
  const hash = CryptoJS.HmacSHA256(message, secret);
  return CryptoJS.enc.Base64.stringify(hash);
}
