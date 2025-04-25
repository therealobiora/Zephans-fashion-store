import Image from "next/image";
import { useState } from "react";

export default function ProductDetails({ product }) {
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="space-y-4">
          <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px]">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {product.images.map((img, index) => (
              <div key={index} className="relative w-full h-24 sm:h-32">
                <Image
                  src={img}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  fill
                  className="object-cover rounded-md cursor-pointer hover:opacity-80"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="space-y-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            {product.name}
          </h1>
          <p className="text-2xl text-gray-700">
            ₦{product.price.toLocaleString()}
          </p>
          <p className="text-gray-600 text-base sm:text-lg">
            {product.description}
          </p>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Size</label>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded-md text-sm ${
                    selectedSize === size
                      ? "bg-gray-900 text-white border-gray-900"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Quantity
            </label>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 border rounded-md text-gray-700 hover:bg-gray-100"
              >
                -
              </button>
              <span className="w-12 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 border rounded-md text-gray-700 hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          <button
            className="w-full bg-gray-900 text-white py-3 rounded-md hover:bg-gray-800 transition-colors"
            disabled={!selectedSize}
          >
            {selectedSize ? "Add to Cart" : "Select a Size"}
          </button>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">
              Product Details
            </h3>
            <ul className="text-gray-600 text-sm sm:text-base space-y-1">
              <li>Fabric Type: {product.details.fabric}</li>
              <li>Base Color: {product.details.color}</li>
              <li>Care Instructions: {product.details.care}</li>
              <li>Model Info: {product.details.model}</li>
            </ul>
          </div>

          <div className="text-sm text-gray-500">
            <p>Free shipping on orders over ₦50,000</p>
            <p>Delivery within Lagos: 1-2 days</p>
            <p>Delivery outside Lagos: 3-5 days</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 640px) {
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
          h1 {
            font-size: 1.75rem;
          }
          p {
            font-size: 0.875rem;
          }
        }
      `}</style>
    </div>
  );
}
