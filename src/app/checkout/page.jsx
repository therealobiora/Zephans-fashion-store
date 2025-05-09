"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Checkout() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    paymentMethod: "card",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const { cart, getTotal, clearCart } = useCart();
  const router = useRouter();

  // Handle form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle payment method change
  const handlePaymentMethodChange = (method) => {
    setForm({ ...form, paymentMethod: method });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.address || !form.phone) {
      toast.error("Please fill all required fields", {
        style: { color: "#DC2626" },
      });
      return;
    }
    if (
      form.paymentMethod === "card" &&
      (!form.cardNumber || !form.expiry || !form.cvv)
    ) {
      toast.error("Please fill all card details", {
        style: { color: "#DC2626" },
      });
      return;
    }
    toast.success("Order placed successfully!");
    clearCart(); // Clear cart
    router.push("/");
  };

  return (
    <section className="w-[95vw] mx-auto py-10 flex flex-col md:flex-row gap-6">
      <div className="md:w-1/2">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Checkout</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-800">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-200 rounded text-xs text-gray-800"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-800">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-200 rounded text-xs text-gray-800"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-800">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full p-2 border border-gray-200 rounded text-xs text-gray-800"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-800">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full p-2 border border-gray-200 rounded text-xs text-gray-800"
              required
            />
          </div>
          {/* Payment Method */}
          <div>
            <h3 className="text-xs font-medium text-gray-800 mb-2">
              Payment Method
            </h3>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-xs text-gray-800">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={form.paymentMethod === "card"}
                  onChange={() => handlePaymentMethodChange("card")}
                  className="text-gray-800"
                />
                Card
              </label>
              <label className="flex items-center gap-2 text-xs text-gray-800">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="payOnDelivery"
                  checked={form.paymentMethod === "payOnDelivery"}
                  onChange={() => handlePaymentMethodChange("payOnDelivery")}
                  className="text-gray-800"
                />
                Pay on Delivery
              </label>
            </div>
          </div>
          {/* Card Details */}
          {form.paymentMethod === "card" && (
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-800">
                  Card Number
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  value={form.cardNumber}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-200 rounded text-xs text-gray-800"
                  placeholder="1234 5678 9012 3456"
                  required={form.paymentMethod === "card"}
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-800">
                    Expiry (MM/YY)
                  </label>
                  <input
                    type="text"
                    name="expiry"
                    value={form.expiry}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-200 rounded text-xs text-gray-800"
                    placeholder="MM/YY"
                    required={form.paymentMethod === "card"}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-800">
                    CVV
                  </label>
                  <input
                    type="text"
                    name="cvv"
                    value={form.cvv}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-200 rounded text-xs text-gray-800"
                    placeholder="123"
                    required={form.paymentMethod === "card"}
                  />
                </div>
              </div>
            </div>
          )}
          <button
            type="submit"
            className="bg-gray-800 text-white px-4 py-2 rounded mt-4 hover:bg-black text-xs"
          >
            Place Order
          </button>
        </form>
      </div>
      <div className="md:w-1/2">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h2>
        {cart.length === 0 ? (
          <p className="text-gray-500 text-xs">No items in cart</p>
        ) : (
          <div className="flex flex-col gap-4">
            {cart.map((item) => (
              <div
                key={item.key}
                className="flex justify-between text-gray-800 text-xs"
              >
                <span>
                  {item.name}{" "}
                  {item.selectedSize && `(Size: ${item.selectedSize})`} x{" "}
                  {item.quantity}
                </span>
                <span>₦{(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between font-bold text-gray-800 text-xs">
                <span>Total</span>
                <span>₦{getTotal()}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
