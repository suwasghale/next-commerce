import Image from "next/image";
import { notFound } from "next/navigation";
import ProductImageMagnifier from "@/components/Product/ProductImageMagnifierifier";

interface Product {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  images: string[];
}

async function getProductById(id: number): Promise<Product> {
  const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

export default async function ProductPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { id?: string };
}) {
  const id = Number(searchParams.id);
  if (!id) return notFound();

  const product = await getProductById(id);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      <ProductImageMagnifier
        src={product.images?.[0] || "/placeholder.png"}
        width={400}
        height={400}
        zoom={2}
      />

      <div>
        <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
        <p className="text-xl text-green-600 mb-4">${product.price}</p>
        <p className="text-gray-700">{product.description}</p>
      </div>
    </div>
  );
}
