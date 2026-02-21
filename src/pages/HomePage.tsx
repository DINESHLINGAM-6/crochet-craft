import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { CategoryCards } from "@/components/sections/CategoryCards";
import { ProductStash } from "@/components/sections/ProductStash";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { StorySection } from "@/components/sections/StorySection";
import { BrandPhilosophy } from "@/components/sections/BrandPhilosophy";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background font-inter flex flex-col selection:bg-primary/10">
      {/* Sticky nav now uses `fixed` positioning internally */}
      <Header />

      <main className="flex-1">
        {/* 1. Hero — full viewport, no top padding needed (header is fixed/transparent) */}
        <HeroSection />

        {/* 2. Animated Category Cards */}
        <CategoryCards />

        {/* 3. Product Stash Grid */}
        <ProductStash />

        {/* 4. Signature Featured Products (editorial asymmetric) */}
        <FeaturedProducts />

        {/* 5. Story Section */}
        <StorySection />

        {/* 6. Brand Philosophy */}
        <BrandPhilosophy />
      </main>

      <Footer />
    </div>
  );
}
