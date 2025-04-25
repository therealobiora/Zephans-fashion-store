"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

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
        setError(err.message);
        setLoading(false);
      }
    }
    if (id) fetchProduct();
  }, [id]);

  const handleBack = () => {
    router.push("/");
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
          className="mb-6 flex items-center text-gray-700 hover:text-black transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
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
            <h1 className="md:text-4xl text-2xl font-bold text-gray-900">
              {product.name}
            </h1>
            <p className="md:text-lg text-md font-semibold text-gray-800">
              {typeof product.price === "number"
                ? `₦${product.price.toLocaleString()}`
                : product.price}
            </p>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>

            {/* Sizes */}
            <div>
              <h3 className="text-md font-semibold text-gray-900 mb-2">
                Sizes:
              </h3>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors ${
                      selectedSize === size
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Details */}
            <div>
              <h3 className="text-md font-semibold text-gray-900 mb-2">
                Details:
              </h3>
              <ul className="text-gray-600 md:space-y-1">
                <li className="text-sm">Fabric: {product.details.fabric}</li>
                <li className="text-sm">Color: {product.details.color}</li>
                <li className="text-sm">Care: {product.details.care}</li>
                <li className="text-sm">Model: {product.details.model}</li>
              </ul>
            </div>

            {/* Add to Cart Button */}
            <button className="w-full md:w-2/3 bg-black text-white py-3 px-6 rounded-md font-medium hover:bg-gray-900 transition-colors">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
