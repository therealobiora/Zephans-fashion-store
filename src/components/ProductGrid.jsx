"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BsCart4 } from "react-icons/bs";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { addToCart } = useCart();

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

  // Navigate to product details
  const handleProductClick = (id) => {
    console.log("Navigating to product:", id);
    router.push(`/product/${id}`);
  };

  // Updated add to cart with navigation option
  const handleAddToCart = (product, e) => {
    e.stopPropagation(); // Prevent parent click
    e.preventDefault(); // Prevent default behavior
    console.log("BsCart4 clicked, adding to cart:", product.name);
    addToCart(product);
    toast.success(
      (t) => (
        <span>
          {product.name} added to cart!
          <button
            className="ml-2 text-gray-800 underline text-xs"
            onClick={() => router.push("/cart")}
          >
            View Cart
          </button>
        </span>
      ),
      { duration: 4000 }
    );
  };

  if (error)
    return <div className="text-red-600 text-center py-10">Error: {error}</div>;

  return (
    <section className="w-full flex items-center justify-center flex-col text-start py-10">
      <div className="md:w-[70%] w-[95%] md:px-0 px-2 mb-6 flex md:items-center items-start justify-start">
        <h2 className="text-2xl font-bold text-gray-800">JUST IN</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 px-2 md:px-0 md:gap-6 md:w-[70%] w-[95%]">
        {products.map((product) => {
          const imageSrc =
            typeof product.image === "string" && product.image.trim() !== ""
              ? product.image
              : "/images/placeholder.jpg";
          return (
            <div key={product._id} className="text-start cursor-pointer">
              <div className="relative group">
                <div onClick={() => handleProductClick(product._id)}>
                  <Image
                    src={imageSrc}
                    alt={product.name || "Product Image"}
                    width={130}
                    height={48}
                    unoptimized
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
                </div>
                <button
                  className="absolute top-2 right-2 bg-white w-10 cursor-pointer h-10 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10"
                  onClick={(e) => handleAddToCart(product, e)}
                >
                  <BsCart4 className="text-gray-800 text-xl" />
                </button>
              </div>
              <div
                className="mt-2"
                onClick={() => handleProductClick(product._id)}
              >
                <h3 className="font-semibold text-xs text-gray-800">
                  {product.name}
                </h3>
                <p className="text-gray-500 text-xs md:pt-1">
                  {typeof product.price === "number"
                    ? `₦${product.price.toLocaleString()}`
                    : product.price}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
