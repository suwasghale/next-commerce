import {Hero} from "@/components/Hero";
export default function Home() {
  return (
   <>
    <Hero
      title="Sun-Ripened"
      highlight="Strawberries"
      subtitle="Fresh from our fields"
      description="Grown with care and harvested at peak ripeness, our organic strawberries are bursting with natural sweetness and vibrant flavor."
      stats={[
        { value: "100%", label: "Organic" },
        { value: "24h", label: "From Farm to Table" },
        { value: "5★", label: "Customer Rated" },
      ]}
      imageUrl="https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    />    
    <main className="container mx-auto px-4">
      {/* Other components can go here */}
      <p>hello</p>  Features.tsx
    <p>  Testimonials.tsx
  CallToAction.tsx
  Newsletter.tsx
  Pricing.tsx
  FAQ.tsx</p>

    </main>
   </>
  );
}
