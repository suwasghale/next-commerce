import Image from "next/image";
import { notFound } from "next/navigation";

interface Props {
  params: { slug: string };
}

const API = "https://api.escuelajs.co/api/v1/products";

export default async function ProductPage({ params }: Props) {
  let product;

  try {
    // 1. Get all products to find ID from slug
    const listRes = await fetch(API, { cache: "no-store" });
    const allProducts = await listRes.json();

    // 2. Find the product with this slug
    const matchedProduct = allProducts.find(
      (p: any) => p.slug === params.slug
    );

    if (!matchedProduct) notFound();

    // 3. Fetch the full details by ID
    const res = await fetch(`${API}/${matchedProduct.id}`, {
      cache: "no-store",
    });
    product = await res.json();
  } catch (err) {
    throw new Error("Failed to fetch product");
  }

  // Fallback image handling
  const imageUrl =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images[0]
      : "/placeholder.png";

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <Image
        src={imageUrl}
        width={1000}
        height={1000}
        alt={product.title || "Product image"}
        className="h-96 w-full object-contain mb-4"
      />
      <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
      <p className="text-xl text-gray-700 mb-4">${product.price}</p>
      <p>{product.description}</p>
    </div>
  );
}
