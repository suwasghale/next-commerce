"use client";
import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import ProductImageMagnifier from "@/components/Product/ProductImageMagnifier";
import AddToCartButton from "@/components/cart/AddToCartButton";

interface Product {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  images: string[];
}

export default function ProductPage({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!searchParams.id) return notFound();
    fetch(`https://api.escuelajs.co/api/v1/products/${searchParams.id}`)
      .then((res) => res.json())
      .then(setProduct);
  }, [searchParams.id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      <ProductImageMagnifier
        alt={product.title}
        src={product.images?.[0] || "/placeholder.png"}
        width={400}
        height={400}
        zoom={2}
      />
      <div>
        <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
        <p className="text-xl text-green-600 mb-4">${product.price}</p>
        <p className="text-gray-700">{product.description}</p>

        {/* Use AddToCartButton here */}
        <AddToCartButton
          id={product.id}
          title={product.title}
          price={product.price}
          image={product.images?.[0]}
        />
      </div>
    </div>
  );
}
