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

  // Auto change image every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt="Crochet showcase"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-2xl animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-400/80 to-rose-500/80 text-white px-4 py-2 rounded-full mb-6 shadow-lg animate-scale-in">
            <Sparkles className="h-4 w-4 animate-pulse" />
            <span className="font-medium">Handcrafted Crochet Magic</span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-poppins font-bold mb-6 leading-tight animate-slide-up">
            <span className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400 bg-clip-text text-transparent">
              Beautiful
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-500 to-indigo-400 bg-clip-text text-transparent">
              Crochet
            </span>
            <br />
            <span className="bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent animate-pulse">
              Creations
            </span>
          </h1>

          {/* Description */}
          <p
            className="text-xl text-muted-foreground mb-8 leading-relaxed animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            Discover our stunning collection of handcrafted crochet items. From
            cozy blankets to elegant accessories, each piece is lovingly made
            with premium yarns and traditional techniques passed down through
            generations.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 animate-slide-up"
            style={{ animationDelay: "0.4s" }}
          >
            <Link to="/products">
              <Button
                size="xl"
                className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400 text-white shadow-lg hover:shadow-2xl hover:scale-105 transition-transform"
              >
                Shop Collection
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>

            <Button
              size="xl"
              className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md hover:shadow-xl hover:scale-105 transition-transform animate-pulse"
            >
              Learn Crochet Techniques
            </Button>
          </div>

          {/* Stats */}
          <div
            className="flex items-center gap-8 mt-12 animate-fade-in"
            style={{ animationDelay: "0.6s" }}
          >
            <div className="text-center hover:scale-110 transition-transform">
              <div className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                2000+
              </div>
              <div className="text-sm text-muted-foreground">
                Crochet Lovers
              </div>
            </div>
            <div className="text-center hover:scale-110 transition-transform">
              <div className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                800+
              </div>
              <div className="text-sm text-muted-foreground">
                Handmade Items
              </div>
            </div>
            <div className="text-center hover:scale-110 transition-transform">
              <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
                25+
              </div>
              <div className="text-sm text-muted-foreground">
                Crochet Patterns
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-pink-400/30 rounded-full blur-3xl animate-float"></div>
      <div
        className="absolute bottom-20 left-20 w-24 h-24 bg-purple-400/30 rounded-full blur-2xl animate-float"
        style={{ animationDelay: "2s" }}
      ></div>
    </section>
  );
};
