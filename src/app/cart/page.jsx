"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, getTotal } = useCart();
  const router = useRouter();

  const handleCheckout = () => {
    router.push("/checkout");
  };

  return (
    <section className="w-[95vw] mx-auto py-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        {/* NEW: Smaller heading, matches Navbar */}
        Your Cart
      </h1>
      {cart.length === 0 ? (
        <p className="text-gray-500 text-sm text-center py-10">
          {/* NEW: Smaller text */}
          Your cart is empty
        </p>
      ) : (
        <div className="flex flex-col gap-6">
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-4 border border-gray-200 p-4 rounded-lg"
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
                  {/* NEW: text-xs, matches Navbar */}
                  {item.name}
                </h3>
                <p className="text-gray-500 text-xs">
                  {/* NEW: text-xs */}₦{item.price.toLocaleString()} x{" "}
                  {item.quantity}
                </p>
                <p className="font-bold text-gray-800 text-xs">
                  {/* NEW: text-xs */}₦
                  {(item.price * item.quantity).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="px-2 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                >
                  -
                </button>
                <span className="text-gray-800 text-xs">{item.quantity}</span>
                {/* NEW: text-xs */}
                <button
                  className="px-2 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                >
                  +
                </button>
                <button
                  className="text-red-600 text-xs ml-4 hover:text-gray-800"
                  onClick={() => removeFromCart(item._id)}
                >
                  {/* NEW: text-xs, hover matches Navbar */}
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-between items-center mt-6">
            <h2 className="text-lg font-bold text-gray-800">
              {/* NEW: Smaller total */}
              Total: ₦{getTotal()}
            </h2>
            <button
              className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-black text-xs"
              onClick={handleCheckout}
            >
              {/* NEW: Gray-800 button, text-xs */}
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
