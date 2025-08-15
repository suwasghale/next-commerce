import Image from "next/image";
import Link from "next/link";

const API = "https://api.escuelajs.co/api/v1/products";

export default async function ProductsPage() {
  let products;
  try {
    const res = await fetch(API);
    if (!res.ok) throw new Error("Failed to fetch products");
    products = await res.json();
    console.log(products);
  } catch (err) {
    products = null;
  }

  if (!products){
    <h3>Loading......</h3>
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {products.map((p: any) => (
        // <Link key={p.id} href={`/products/${p.id}`}>
        <Link key={p.slug} href={`/products/${p.slug}`}>
          <div className="border p-4 rounded-lg shadow-sm hover:shadow-lg transition">
            <Image src={p.images[0]} width={200} height={200} alt={p.title} className=" w-full object-contain mb-2" />
            <h3 className="font-bold">{p.title}</h3>
            <p>${p.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
