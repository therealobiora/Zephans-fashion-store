"use client";

import { useState } from "react";
import Link from "next/link";
import { FiShoppingCart, FiSearch } from "react-icons/fi";
import { IoPersonOutline } from "react-icons/io5";
import { PiCaretDownThin } from "react-icons/pi";

export default function Navbar() {
  const [isShopOpen, setIsShopOpen] = useState(false);

  return (
    <nav className="bg-white py-6 px-6 md:px-12 w-full flex items-center justify-center">
      <div className="w-[80%] flex items-center justify-between">
        {/* Left Section (Logo) */}
        <div className="flex items-center">
          <Link href="/">
            <img
              src="/images/Zephannsn-logo-2.png"
              className="w-[150px] md:w-[200px]"
              alt="Logo"
            />
          </Link>
        </div>

        {/* Center Section (Nav Links) */}
        <div className="hidden md:flex flex-1 justify-center text-sm font-semibold space-x-6">
          <Link href="/" className="text-gray-500 text-xs hover:text-gray-800">
            HOME
          </Link>
          <div
            className="relative"
            onMouseEnter={() => setIsShopOpen(true)}
            onMouseLeave={() => setIsShopOpen(false)}
          >
            <button className="flex items-center text-gray-500 text-xs hover:text-gray-800">
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

        {/* Right Section (Icons & Currency) */}
        <div className="flex items-center space-x-4">
          <IoPersonOutline className="text-lg cursor-pointer" />
          <FiShoppingCart className="text-lg cursor-pointer" />
          <FiSearch className="text-lg cursor-pointer" />
          <button className="border border-gray-300 px-2 py-1 rounded-md text-xs">
            NGN
          </button>
        </div>
      </div>
    </nav>
  );
}
