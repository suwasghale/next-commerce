// components/Hero.tsx
import { FC } from "react";
import Image from "next/image";

type Stat = {
  value: string;
  label: string;
};

type HeroProps = {
  title: string;
  highlight: string;
  subtitle: string;
  description: string;
  stats: Stat[];
  imageUrl: string;
};

const Hero: FC<HeroProps> = ({
  title,
  highlight,
  subtitle,
  description,
  stats,
  imageUrl,
}) => {
  return (
    <section className="min-h-screen pt-24 pb-12 px-6 md:px-12 flex flex-col lg:flex-row items-center justify-center max-w-7xl mx-auto gap-12">
      {/* Text Content */}
      <div className="lg:w-1/2 animate-fade-in">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          <span className="block">{title}</span>
          <span className="block text-berry-red">{highlight}</span>
        </h1>

        <div className="h-12 overflow-hidden mb-6">
          <h2 className="text-xl md:text-2xl font-semibold whitespace-nowrap border-r-4 border-r-berry-red pr-2 animate-typewriter animate-blink">
            {subtitle}
          </h2>
        </div>

        <p className="text-lg text-gray-700 mb-8 max-w-lg">{description}</p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button className="px-8 py-3 bg-berry-red text-white rounded-lg hover:bg-berry-red/90 transition-all transform hover:-translate-y-1 shadow-lg">
            Shop Now
          </button>
          <button className="px-8 py-3 border border-berry-red text-berry-red rounded-lg hover:bg-berry-red/10 transition-all">
            Visit Our Farm
          </button>
        </div>

        <div className="mt-12 flex items-center space-x-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="text-2xl font-bold text-berry-red">{stat.value}</span>
              <span className="text-gray-600">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Image Content */}
      <div className="lg:w-1/2 relative animate-slide-left delay-200">
        <div className="absolute -inset-4 bg-berry-green/20 rounded-3xl -z-10"></div>

        <div className="relative rounded-3xl overflow-hidden shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
          <Image
            src={imageUrl}
            alt={highlight}
            width={2070}
            height={1380}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Floating Elements */}
        <div className="absolute -top-6 -left-6 bg-white p-3 rounded-xl shadow-lg w-36 animate-float delay-300">
          <div className="w-8 h-8 rounded-full bg-berry-red/20 text-berry-red flex items-center justify-center mb-2">
            {/* replace <i> with Lucide icon if needed */}
            🌱
          </div>
          <h4 className="font-bold text-gray-800 text-sm">No Pesticides</h4>
          <p className="text-xs text-gray-600">100% Natural</p>
        </div>

        <div className="absolute -bottom-6 -right-6 bg-white p-3 rounded-xl shadow-lg w-36 animate-float delay-400">
          <div className="w-8 h-8 rounded-full bg-berry-green/20 text-berry-green flex items-center justify-center mb-2">
            🚚
          </div>
          <h4 className="font-bold text-gray-800 text-sm">Fast Delivery</h4>
          <p className="text-xs text-gray-600">Next Day Available</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
