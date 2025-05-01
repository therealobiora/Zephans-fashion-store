"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      toast.error("Please fill all fields", { style: { color: "#DC2626" } });
      return;
    }
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match", { style: { color: "#DC2626" } });
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }
      toast.success("Registered successfully! Please login.");
      router.push("/login");
    } catch (err) {
      toast.error(err.message, { style: { color: "#DC2626" } });
    }
  };

  return (
    <section className="w-[95vw] mx-auto py-10 flex justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Register</h1>
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
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-200 rounded text-xs text-gray-800"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-800">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 border border-gray-200 rounded text-xs text-gray-800"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-gray-800 text-white px-4 py-2 rounded mt-4 hover:bg-black text-xs"
          >
            Register
          </button>
        </form>
        <p className="text-gray-600 text-xs mt-4 text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-gray-800 underline">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}
