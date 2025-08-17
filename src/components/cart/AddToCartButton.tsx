"use client";

import { FC } from "react";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/store/hooks";
import { addItem } from "@/store/cartSlice";

interface AddToCartButtonProps {
  id: number | string;
  title: string;
  price: number;
  image?: string;
  variantKey?: string;
  stock?: number;
}

const AddToCartButton: FC<AddToCartButtonProps> = ({
  id,
  title,
  price,
  image,
  variantKey,
  stock,
}) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(
      addItem({
        id,
        title,
        priceCents: Math.round(price * 100),
        image: image || "/placeholder.png",
        quantity: 1,
        variantKey,
        stock,
      })
    );

    toast.success(`${title} added to cart!`, { duration: 3000 });
  };

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200 mt-4"
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
