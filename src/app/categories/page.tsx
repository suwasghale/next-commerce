import Image from "next/image";
import Link from "next/link";

const API = "https://api.escuelajs.co/api/v1/categories";
export default async function CategoriesPage() {
    let categories;
    try{
        const categories_response = await fetch(API)
        if (!categories_response.ok) throw new Error("Failed to fetch categories");
        categories = await categories_response.json();
    }
    catch(error){
        categories = null;
    }
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"> 
                {
        categories && categories.map((cat:any)=>(
            <Link href={`/categories/${cat.id}`} key= {cat.id}>
            <Image src={cat.image} width={200} height={200} alt={cat.name} className="h-48 w-full object-contain mb-2" />
            <p className="text-xl font-bold text-center">{cat.name}</p>
            </Link>


        ))
      }
      </div>
  
    </div>
  );
}