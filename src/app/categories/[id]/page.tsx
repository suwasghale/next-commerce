import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface Props {
  params: { id: string };
}

export default async function CategoryPage({ params }: Props) {
  let products;
  const API = `https://api.escuelajs.co/api/v1/products?categoryId=${params.id}`;

  try {
    const res = await fetch(API);
    if (!res.ok) throw new Error("Failed to fetch category products");
    products = await res.json();
    if (!products.length) notFound();
  } catch (err) {
    throw new Error("Failed to fetch category products");
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Products in this Category</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p: any) => (
          <Link key={p.id} href={`/products/${p.id}`}>
            <div className="border p-4 rounded-lg shadow-sm hover:shadow-lg transition">
              <Image
                src={p.images[0]}
                width={200}
                height={200}
                alt={p.title}
                className="h-48 w-full object-contain mb-2"
              />
              <h3 className="font-bold">{p.title}</h3>
              <p>${p.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
