import Image from "next/image";
import Link from "next/link";

export default async function CategoryProductsPage({ params }: { params: { slug: string } }) {
  // Fetch all categories
  const categoriesRes = await fetch("https://api.escuelajs.co/api/v1/categories", {
    cache: "no-store",
  });
  const categories = await categoriesRes.json();

  // Find category by slug
  const category = categories.find((c: any) => c.slug === params.slug);
  if (!category) {
    return <div className="p-6 text-red-500">Category not found.</div>;
  }

  // Fetch products for that category
  const productsRes = await fetch(
    `https://api.escuelajs.co/api/v1/categories/${category.id}/products`,
    { cache: "no-store" }
  );
  const products = await productsRes.json();

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{category.name}</h1>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product: any) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="border rounded-lg p-4 hover:shadow-lg transition"
            >
              <Image
                src={
                  Array.isArray(product.images) && product.images.length > 0
                    ? product.images[0]
                    : "/placeholder.png"
                }
                alt={product.title}
                width={300}
                height={300}
                className="h-40 w-full object-contain mb-2"
              />
              <h3 className="font-semibold">{product.title}</h3>
              <p className="text-gray-600">${product.price}</p>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No products in this category.</p>
      )}
    </div>
  );
}
