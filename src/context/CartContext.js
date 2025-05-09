"use client";

import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on client-side only
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("cart");
      if (saved) {
        try {
          const parsedCart = JSON.parse(saved);
          setCart(parsedCart);
          console.log("Loaded cart from localStorage:", parsedCart);
        } catch (error) {
          console.error("Failed to parse cart from localStorage:", error);
          setCart([]);
          localStorage.removeItem("cart");
        }
      }
    }
  }, []);

  // Save cart to localStorage and check for duplicates
  useEffect(() => {
    if (cart.length > 0 && typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    const keys = cart.map((item) => item.key);
    const uniqueKeys = new Set(keys);
    if (keys.length !== uniqueKeys.size) {
      console.warn("Duplicate keys in cart:", cart);
      // Optionally clear duplicates
      const uniqueCart = Array.from(
        new Map(cart.map((item) => [item.key, item])).values()
      );
      setCart(uniqueCart);
    }
    console.log("Cart state:", cart);
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    console.log("Adding to cart:", { id: product._id, name: product.name, selectedSize: product.selectedSize });
    setCart((prev) => {
      const key = product.selectedSize
        ? `${product._id}-${product.selectedSize}`
        : product._id;
      const existing = prev.find((item) => item.key === key);
      if (existing) {
        console.log("Item exists, incrementing quantity:", key);
        return prev.map((item) =>
          item.key === key
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      console.log("New item, adding to cart:", key);
      return [...prev, { ...product, quantity, key }];
    });
    toast.success(`${product.name} added to cart!`);
  };

  const updateQuantity = (id, quantity) => {
    console.log("updateQuantity called:", { id, quantity });
    setCart((prev) => {
      if (quantity < 1) {
        console.log("Quantity < 1, removing item:", id);
        return prev.filter((item) => item.key !== id);
      }
      const updated = prev.map((item) =>
        item.key === id ? { ...item, quantity } : item
      );
      console.log("Updated cart:", updated);
      return updated;
    });
  };

  const removeFromCart = (id) => {
    console.log("Removing from cart:", id);
    setCart((prev) => prev.filter((item) => item.key !== id));
    toast.success("Item removed from cart");
  };

  const clearCart = () => {
    console.log("Clearing cart");
    setCart([]);
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
    toast.success("Cart cleared");
  };

  const getTotal = () => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return total.toLocaleString();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}