import { useEffect, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// ✅ Import images from src/assets
import hero1 from "@/assets/crochet-flowers-hero.jpg";
import hero2 from "@/assets/flower-1.jpg";
import hero3 from "@/assets/flower-2.jpg";
import hero4 from "@/assets/flower-3.jpg";
import hero5 from "@/assets/T5.jpg";

const images = [hero1, hero2, hero3, hero4, hero5];

export const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto change image every 6s (slower)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[hsl(40,20%,97%)]">
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt="Handcrafted crochet"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms] ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        {/* Soft Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(40,20%,97%)]/90 via-[hsl(40,20%,97%)]/50 to-transparent/20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(40,20%,97%)] via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 pt-20">
        <div className="max-w-xl animate-fade-in space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md text-[hsl(136,35%,45%)] px-5 py-2 rounded-full shadow-sm border border-[hsl(136,30%,85%)]">
            <Sparkles className="h-4 w-4" />
            <span className="font-medium tracking-wide text-sm">Welcome to The Flower Hook</span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-poppins font-medium leading-[1.1] text-foreground tracking-tight drop-shadow-sm">
            Weaving <br/>
            <span className="text-gradient italic font-normal">Nature's Beauty</span> <br/>
            into every loop.
          </h1>

          {/* Description */}
          <p
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg font-light"
          >
            A curated studio of handcrafted crochet blooms and accessories. Each piece is slowly made with love, patience, and the finest yarns to bring everlasting joy to your home.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 pt-4">
            <Link to="/products">
              <Button
                size="xl"
                className="button-primary h-14 px-8 text-lg w-full sm:w-auto"
              >
                Explore Collection
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>

            <Button
              size="xl"
              variant="outline"
              className="button-outline h-14 px-8 text-lg w-full sm:w-auto bg-transparent"
            >
              Our Story
            </Button>
          </div>
        </div>
      </div>

      {/* Subtle floating elements */}
      <div className="absolute bottom-10 right-10 w-fit p-4 bg-white/40 backdrop-blur-md rounded-2xl border border-white/50 shadow-sm animate-float hidden md:block">
         <p className="text-sm font-medium text-[hsl(136,35%,45%)]">🌿 sustainbly handcrafted</p>
      </div>
    </section>
  );
};
