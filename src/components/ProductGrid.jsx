"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BsCart4 } from "react-icons/bs";

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products", { cache: "no-store" });
        if (!res.ok) {
          throw new Error(
            `Failed to fetch products: ${res.status} ${res.statusText}`
          );
        }
        const data = await res.json();
        console.log("ProductGrid fetched data:", data);
        setProducts(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err) {
        console.error("ProductGrid error:", err);
        setError(err.message);
        setProducts([]);
      }
    }
    fetchProducts();
  }, []);

  const handleProductClick = (id) => {
    console.log("Navigating to product:", id);
    router.push(`/product/${id}`);
  };

  if (error)
    return <div className="text-red-600 text-center py-10">Error: {error}</div>;

  return (
    <section className="w-full flex items-center justify-center flex-col text-start py-10">
      <div className="w-[70%] mb-6 flex items-center justify-start">
        <h2 className="text-2xl font-bold">JUST IN</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => {
          const imageSrc =
            typeof product.image === "string" && product.image.trim() !== ""
              ? product.image
              : "/images/placeholder.jpg";
          return (
            <div
              key={product._id}
              className="text-start cursor-pointer"
              onClick={() => handleProductClick(product._id)}
            >
              <div className="relative group">
                <Image
                  src={imageSrc}
                  alt={product.name}
                  width={130}
                  height={50}
                  className="w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105 group-hover:brightness-75"
                  onError={(e) =>
                    console.log(
                      "Image error for:",
                      product.name,
                      "src:",
                      e.target.src
                    )
                  }
                  onLoadingComplete={() =>
                    console.log(
                      "Image loaded for:",
                      product.name,
                      "src:",
                      imageSrc
                    )
                  }
                />
                <button className="absolute inset-0 flex items-center justify-center transition-opacity scale-0 group-hover:scale-100 duration-700 group-hover:opacity-100">
                  <span className="bg-white w-10 h-10 flex items-center justify-center cursor-pointer">
                    <BsCart4 className="text-black text-2xl" />
                  </span>
                </button>
              </div>
              <h3 className="font-semibold text-sm mt-2">{product.name}</h3>
              <p className="text-gray-500 text-[13px] md:pt-1">
                {typeof product.price === "number"
                  ? `₦${product.price.toLocaleString()}`
                  : product.price}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
