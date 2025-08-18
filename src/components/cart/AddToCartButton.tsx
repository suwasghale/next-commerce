"use client";

import { FC } from "react";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addItem, makeSelectItem } from "@/store/cartSlice";

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

  // Read the current item from Redux to know existing quantity
  const selectItem = makeSelectItem(id, variantKey);
  const item = useAppSelector(selectItem);

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

    const newQty = (item?.quantity || 0) + 1;

    toast.success(
      <p> {title} added! You now have <strong> {newQty} </strong> in your cart.</p> ,
      { duration: 3000 } 
    );
  };

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200 mt-4"
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
