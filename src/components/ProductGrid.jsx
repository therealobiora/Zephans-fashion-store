"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function ProductGrid() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    }
    fetchProducts();
  }, []);

  return (
    <section className="w-[95%] mx-auto py-6">
      <h2 className="text-2xl font-bold">JUST IN</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {products.map((product) => (
          <div key={product._id} className="relative group">
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={400}
              className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/40">
              <button className="bg-white p-2 rounded-full">
                🛒 {/* Cart Icon */}
              </button>
            </div>
            <h3 className="font-semibold mt-2">{product.name}</h3>
            <p className="text-gray-600">₦{product.price.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
