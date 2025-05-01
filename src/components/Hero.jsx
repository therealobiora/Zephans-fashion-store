"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function HeroSection() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        console.log("HeroSection fetched data:", data);
        setProducts(Array.isArray(data) ? data.slice(0, 4) : []);
        setError(null);
      } catch (err) {
        console.error("HeroSection error:", err);
        setError(err.message);
        setProducts([]);
      }
    }
    fetchProducts();
  }, []);

  if (error)
    return <div className="text-red-600 text-center py-10">Error: {error}</div>;

  return (
    <section className="md:w-[98vw] w-[95vw] mx-auto py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 h-[600px] gap-4 md:h-[600px]">
        {products.length > 0 ? (
          products.map((product) => {
            const imageSrc =
              typeof product.image === "string" && product.image.trim() !== ""
                ? product.image
                : "/images/placeholder.jpg";
            return (
              <a
                key={product._id}
                href={`/categories/${product.category}`}
                className="relative w-full h-full overflow-hidden md:group"
              >
                <Image
                  src={imageSrc}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="w-full h-full md:transition-transform md:duration-700 md:ease-in-out md:group-hover:scale-105 md:group-hover:brightness-75"
                />
                <div className="absolute bottom-0 right-0 flex justify-center items-center bg-white px-3 py-1 text-black font-bold text-sm md:transition-opacity md:duration-700 md:group-hover:opacity-100">
                  {(product.name && product.name.toUpperCase()) ||
                    "Unknown Product"}
                </div>
              </a>
            );
          })
        ) : (
          <p className="text-gray-600 text-center py-10">loading...</p>
        )}
      </div>
    </section>
  );
}
