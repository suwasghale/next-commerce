import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

const API = "https://api.escuelajs.co/api/v1/products";

export default async function ProductPage({ params }: Props) {
  let product;
  try {
    const res = await fetch(`${API}/${params.id}`);
    if (res.status === 404) notFound();
    product = await res.json();
  } catch (err) {
    throw new Error("Failed to fetch product");
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <img src={product.images[0]} alt={product.title} className="h-96 w-full object-contain mb-4" />
      <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
      <p className="text-xl text-gray-700 mb-4">${product.price}</p>
      <p>{product.description}</p>
    </div>
  );
}
