"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";

export default function ProductDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const { addToCart } = useCart(); // NEW: Import useCart

  // NEW: Fetch product by ID
  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`/api/products/${id}`, {
          cache: "no-store",
        });
        if (!response.ok) throw new Error("Failed to fetch product");
        const data = await response.json();
        console.log("ProductDetail fetched data:", data);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        console.error("ProductDetail error:", err);
        setError(err.message);
        setLoading(false);
      }
    }
    if (id) fetchProduct();
  }, [id]);

  // NEW: Handle back navigation
  const handleBack = () => {
    router.push("/");
  };

  // NEW: Handle Add to Cart
  const handleAddToCart = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      toast.error("Please select a size", { style: { color: "#DC2626" } });
      return;
    }
    addToCart({ ...product, selectedSize });
    toast.success(
      (t) => (
        <span>
          {product.name} added to cart!
          <button
            className="ml-2 text-gray-800 underline text-sm"
            onClick={() => router.push("/cart")}
          >
            View Cart
          </button>
        </span>
      ),
      { duration: 4000 }
    );
  };

  // NEW: Handle Buy Now
  const handleBuyNow = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      toast.error("Please select a size", { style: { color: "#DC2626" } });
      return;
    }
    addToCart({ ...product, selectedSize });
    router.push("/checkout");
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Error: {error}
      </div>
    );
  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Product not found
      </div>
    );

  return (
    <div className="min-h-screen bg-white md:py-12 px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="mb-6 flex items-center text-gray-700 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="relative md:w-[95%] w-full h-[500px] md:h-[600px] overflow-hidden shadow-md">
            <Image
              src={product.image || "/images/placeholder.jpg"}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Details Section */}
          <div className="flex flex-col gap-6">
            <h1 className="md:text-4xl text-2xl font-bold text-gray-800">
              {/* NEW: Use text-gray-800 for consistency */}
              {product.name}
            </h1>
            <p className="md:text-lg text-md font-semibold text-gray-800">
              {typeof product.price === "number"
                ? `₦${product.price.toLocaleString()}`
                : product.price}
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              {/* NEW: Use text-sm */}
              {product.description}
            </p>

            {/* Sizes */}
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-2">
                {/* NEW: Use text-sm */}
                Sizes:
              </h3>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors ${
                      selectedSize === size
                        ? "bg-gray-800 text-white border-gray-800"
                        : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Details */}
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-2">
                Details:
              </h3>
              <ul className="text-gray-600 space-y-1">
                <li className="text-sm">Fabric: {product.details.fabric}</li>
                <li className="text-sm">Color: {product.details.color}</li>
                <li className="text-sm">Care: {product.details.care}</li>
                <li className="text-sm">Model: {product.details.model}</li>
              </ul>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                className="w-full sm:w-1/2 bg-gray-800 text-white py-3 px-6 rounded-md font-medium hover:bg-black transition-colors text-sm"
              >
                {/* NEW: Updated to useCart, text-sm */}
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="w-full sm:w-1/2 bg-gray-800 text-white py-3 px-6 rounded-md font-medium hover:bg-black transition-colors text-sm"
              >
                {/* NEW: Buy Now button */}
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
