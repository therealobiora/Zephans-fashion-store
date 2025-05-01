import { Poppins, Montserrat } from "next/font/google";
import { Toaster } from "react-hot-toast"; // NEW: Import Toaster
import { CartProvider } from "@/context/CartContext"; // NEW: Import CartProvider
import "./globals.css";

// NEW: Configure Poppins font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

// NEW: Configure Montserrat font
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${montserrat.variable}`}>
      <body className="bg-white text-black">
        {/* NEW: Remove poppins class, apply fonts via CSS */}
        <CartProvider>
          {children}
          <Toaster position="top-right" />
        </CartProvider>
      </body>
    </html>
  );
}
