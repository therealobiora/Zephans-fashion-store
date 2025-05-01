import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import SubscribeSection from "@/components/SubscribeSection";
import Social from "@/components/Social";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <ProductGrid />
      <SubscribeSection />
      <Social />
      <Footer />
    </div>
  );
}
