"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdCancel } from "react-icons/md";

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, getTotal, clearCart } = useCart();
  const router = useRouter();

  const handleCheckout = () => {
    console.log("Navigating to checkout");
    router.push("/checkout");
  };

  return (
    <section className="w-[95vw] mx-auto py-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Your Cart
      </h1>
      {cart.length === 0 ? (
        <p className="text-gray-500 text-sm text-center py-10">
          Your cart is empty
        </p>
      ) : (
        <div className="flex flex-col gap-6">
          {cart.map((item) => (
            <div
              key={item.key}
              className="flex items-center gap-4 border border-gray-200 p-4 rounded-lg sm:flex-row"
            >
              <Image
                src={item.image || "/images/placeholder.jpg"}
                alt={item.name}
                width={80}
                height={80}
                className="object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-xs text-gray-800">
                  {item.name}
                  {item.selectedSize && (
                    <span className="text-gray-500"> ({item.selectedSize})</span>
                  )}
                </h3>
                <p className="text-gray-500 text-xs">
                  ₦{item.price.toLocaleString()} x {item.quantity}
                </p>
                <p className="font-bold text-gray-800 text-xs">
                  ₦{(item.price * item.quantity).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="px-2 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 text-sm touch-action-manipulation cursor-pointer"
                  onClick={() => {
                    console.log("Minus button clicked for:", item.key);
                    updateQuantity(item.key, item.quantity - 1);
                  }}
                >
                  −
                </button>
                <span className="text-gray-800 text-xs w-5 text-center">
                  {item.quantity}
                </span>
                <button
                  className="px-2 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 text-sm touch-action-manipulation cursor-pointer"
                  onClick={() => {
                    console.log("Plus button clicked for:", item.key);
                    updateQuantity(item.key, item.quantity + 1);
                  }}
                >
                  +
                </button>
                <button
                  className="text-red-600 text-md ml-4 hover:text-gray-800 cursor-pointer"
                  onClick={() => {
                    console.log("Remove button clicked for:", item.key);
                    removeFromCart(item.key);
                  }}
                >
                  <MdCancel />
                </button>
              </div>
            </div>
          ))}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
            <h2 className="text-lg font-bold text-gray-800">
              Total: ₦{getTotal()}
            </h2>
            <div className="flex gap-2">
              <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-xs cursor-pointer"
                onClick={() => {
                  console.log("Clear cart clicked");
                  clearCart();
                }}
              >
                Clear Cart
              </button>
              <button
                className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-black text-xs cursor-pointer"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}