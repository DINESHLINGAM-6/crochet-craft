import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { Categories } from "@/components/sections/Categories";
import { StorySection } from "@/components/sections/StorySection";
import { BrandPhilosophy } from "@/components/sections/BrandPhilosophy";
import { PageWrapper } from "@/components/layout/PageWrapper";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background font-inter flex flex-col selection:bg-primary/10">
      <Header />
      
      <PageWrapper className="flex-1">
        {/* 1. Hero Section - Cinematic */}
        <HeroSection />

        {/* 2. Signature Collection - Asymmetric Grid */}
        <FeaturedProducts />

        {/* 3. Story Section - Editorial Split */}
        <StorySection />

        {/* 4. Categories - Visual Tiles */}
        <Categories />

        {/* 5. Craftsmanship - Minimal Icons */}
        <BrandPhilosophy />
      </PageWrapper>

      <Footer />
    </div>
  );
}
