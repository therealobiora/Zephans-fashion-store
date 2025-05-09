"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiShoppingCart, FiSearch } from "react-icons/fi";
import { IoPersonOutline } from "react-icons/io5";
import { PiCaretDownThin } from "react-icons/pi";
import { FaBars, FaTimes } from "react-icons/fa";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";

export default function Navbar() {
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { cart } = useCart();
  const [itemCount, setItemCount] = useState(0); // Client-side count

  // Check login status
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    }
  }, []);

  // Compute cart item count on client-side
  useEffect(() => {
    setItemCount(cart.reduce((sum, item) => sum + item.quantity, 0));
  }, [cart]);

  // Handle logout
  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    setIsLoggedIn(false);
    toast.success("Logged out successfully");
  };

  const toggleShopMenu = () => setIsShopOpen(!isShopOpen);

  return (
    <nav className="bg-white py-4 px-4 sm:px-6 md:px-12 w-full flex items-center justify-center">
      <div className="w-full max-w-7xl flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <img
              src="/images/Zephannsn-logo-2.png"
              className="w-[120px] sm:w-[150px] md:w-[200px]"
              alt="Logo"
            />
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <div className="flex flex-1 justify-center text-sm font-semibold space-x-6">
            <Link
              href="/"
              className="text-gray-500 text-xs hover:text-gray-800"
            >
              HOME
            </Link>
            <div className="relative">
              <button
                className="flex items-center text-gray-500 text-xs hover:text-gray-800"
                onMouseEnter={() => setIsShopOpen(true)}
                onMouseLeave={() => setIsShopOpen(false)}
              >
                SHOP <PiCaretDownThin className="ml-1" />
              </button>
              {isShopOpen && (
                <div className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2 z-50">
                  <Link
                    href="/shop/dresses"
                    className="block px-4 py-3 text-gray-500 text-xs hover:text-gray-800"
                  >
                    Party szn
                  </Link>
                  <Link
                    href="/shop/dresses"
                    className="block px-4 py-3 text-gray-500 text-xs hover:text-gray-800"
                  >
                    Dresses
                  </Link>
                  <Link
                    href="/shop/dresses"
                    className="block px-4 py-3 text-gray-500 text-xs hover:text-gray-800"
                  >
                    Jumpsuits
                  </Link>
                  <Link
                    href="/shop/pant-sets"
                    className="block px-4 py-3 text-gray-500 text-xs hover:text-gray-800"
                  >
                    Pant Sets
                  </Link>
                  <Link
                    href="/shop/pant-sets"
                    className="block px-4 py-3 text-gray-500 text-xs hover:text-gray-800"
                  >
                    Playsuits
                  </Link>
                  <Link
                    href="/shop/minis"
                    className="block px-4 py-3 text-gray-500 text-xs hover:text-gray-800"
                  >
                    Short Sets
                  </Link>
                  <Link
                    href="/shop/skirt-sets"
                    className="block px-4 py-3 text-gray-500 text-xs hover:text-gray-800"
                  >
                    Skirt Sets
                  </Link>
                </div>
              )}
            </div>
            <Link
              href="/gift-card"
              className="text-gray-500 text-xs hover:text-gray-800"
            >
              GIFT CARD
            </Link>
          </div>
          <div className="flex items-center space-x-3">
            {isLoggedIn ? (
              <>
                <Link
                  href="/profile"
                  className="text-gray-800 text-xs hover:text-gray-800"
                >
                  <IoPersonOutline className="text-lg cursor-pointer text-gray-800" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-800 text-xs hover:text-gray-800"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login">
                <IoPersonOutline className="text-lg cursor-pointer text-gray-800" />
              </Link>
            )}
            <Link href="/cart" className="relative">
              <FiShoppingCart className="text-lg cursor-pointer text-gray-800" />
              {itemCount > 0 && (
                <span className="absolute -top-2.5 -right-3 bg-gray-700 text-white text-xs rounded-full px-1.5">
                  {itemCount}
                </span>
              )}
            </Link>
            <FiSearch className="text-lg cursor-pointer text-gray-800" />
            <button className="border border-gray-300 px-2 py-1 rounded-md text-xs text-gray-800">
              NGN
            </button>
          </div>
        </div>
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-800"
          >
            {isMobileMenuOpen ? (
              <FaTimes className="text-lg" />
            ) : (
              <FaBars className="text-lg" />
            )}
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden w-full bg-white absolute top-16 left-0 shadow-lg z-50">
          <div className="flex flex-col items-center py-4">
            <Link
              href="/"
              className="text-gray-500 text-sm py-2 hover:text-gray-800"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              HOME
            </Link>
            <div className="w-full text-center">
              <button
                className="text-gray-500 text-sm py-2 flex items-center justify-center w-full hover:text-gray-800"
                onClick={() => setIsShopOpen(!isShopOpen)}
              >
                SHOP <PiCaretDownThin className="ml-1" />
              </button>
              {isShopOpen && (
                <div className="bg-white py-2">
                  <Link
                    href="/shop/dresses"
                    className="block text-gray-500 text-sm py-2 hover:text-gray-800"
                    onClick={() => {
                      setIsShopOpen(false);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Party szn
                  </Link>
                  <Link
                    href="/shop/dresses"
                    className="block text-gray-500 text-sm py-2 hover:text-gray-800"
                    onClick={() => {
                      setIsShopOpen(false);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Dresses
                  </Link>
                  <Link
                    href="/shop/dresses"
                    className="block text-gray-500 text-sm py-2 hover:text-gray-800"
                    onClick={() => {
                      setIsShopOpen(false);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Jumpsuits
                  </Link>
                  <Link
                    href="/shop/pant-sets"
                    className="block text-gray-500 text-sm py-2 hover:text-gray-800"
                    onClick={() => {
                      setIsShopOpen(false);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Pant Sets
                  </Link>
                  <Link
                    href="/shop/pant-sets"
                    className="block text-gray-500 text-sm py-2 hover:text-gray-800"
                    onClick={() => {
                      setIsShopOpen(false);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Playsuits
                  </Link>
                  <Link
                    href="/shop/minis"
                    className="block text-gray-500 text-sm py-2 hover:text-gray-800"
                    onClick={() => {
                      setIsShopOpen(false);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Short Sets
                  </Link>
                  <Link
                    href="/shop/skirt-sets"
                    className="block text-gray-500 text-sm py-2 hover:text-gray-800"
                    onClick={() => {
                      setIsShopOpen(false);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Skirt Sets
                  </Link>
                </div>
              )}
            </div>
            <Link
              href="/gift-card"
              className="text-gray-500 text-sm py-2 hover:text-gray-800"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              GIFT CARD
            </Link>
            <div className="flex items-center space-x-3 py-2">
              {isLoggedIn ? (
                <>
                  <Link
                    href="/profile"
                    className="text-gray-800 text-xs hover:text-gray-800"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-gray-800 text-xs hover:text-gray-800"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <IoPersonOutline className="text-lg cursor-pointer text-gray-800" />
                </Link>
              )}
              <Link href="/cart" className="relative">
                <FiShoppingCart className="text-lg cursor-pointer text-gray-800" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-4 bg-gray-700 text-white text-xs rounded-full px-2">
                    {itemCount}
                  </span>
                )}
              </Link>
              <FiSearch className="text-lg cursor-pointer text-gray-800" />
            </div>
            <button className="border border-gray-300 px-2 py-1 rounded-md text-xs text-gray-800">
              NGN
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}