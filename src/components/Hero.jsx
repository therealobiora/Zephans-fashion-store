"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function HeroSection() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) =>
        setCategories(
          data.filter((category) => !category.image.startsWith("http"))
        )
      );
  }, []);

  return (
    <section className="md:w-[98%] w-[95%] mx-auto py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:h-[600px]">
        {categories.slice(0, 4).map((category, index) => (
          <a
            key={index}
            href={`/categories/${category.category}`}
            className="relative w-full h-full overflow-hidden group"
          >
            <Image
              src={category.image}
              alt={category.name}
              layout="fill"
              objectFit="cover"
              className="w-full h-full transition-transform duration-700 ease-in-out group-hover:scale-105 group-hover:brightness-75"
            />
            <div className="absolute bottom-0 right-0 bg-white px-3 py-1 text-black font-bold text-sm transition-opacity duration-700 group-hover:opacity-100">
              {category.name.toUpperCase()}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
