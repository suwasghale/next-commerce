import Image from "next/image";
import Link from "next/link";

export default async function CategoriesPage() {
  const res = await fetch("https://api.escuelajs.co/api/v1/categories", {
    cache: "no-store",
  });
  const categories = await res.json();

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Categories</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {categories.map((category: any) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="border rounded-lg overflow-hidden hover:shadow-lg transition"
          >
            <Image
              src={category.image}
              alt={category.name}
              width={300}
              height={200}
              className="w-full h-40 object-cover"
            />
            <h2 className="p-4 font-semibold text-lg">{category.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
