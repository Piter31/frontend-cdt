import { Navbar } from "@/components/store/Navbar";
import { Hero } from "@/components/store/Hero";
import { ProductCatalog } from "@/components/store/ProductCatalog";
import { Footer } from "@/components/store/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#faf6f0]">
      <Navbar />
      <Hero />
      <ProductCatalog />
      <Footer />
    </main>
  );
}
