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
        <Link key={p.id} href={`/products/${p.id}`}>
          <div className="border p-4 rounded-lg shadow-sm hover:shadow-lg transition">
            <img src={p.images[0]} alt={p.title} className="h-48 w-full object-contain mb-2" />
            <h3 className="font-bold">{p.title}</h3>
            <p>${p.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
