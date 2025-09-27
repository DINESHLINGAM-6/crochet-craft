import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import heroImage from "@/assets/crochet-flowers-hero.jpg";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage}
          alt="Beautiful crocheted flowers in vibrant colors"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-2xl animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-secondary/80 backdrop-blur-sm text-secondary-foreground px-4 py-2 rounded-full mb-6 animate-scale-in">
            <Sparkles className="h-4 w-4 animate-pulse" />
            <span className="font-medium">Handcrafted Crochet Magic</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-poppins font-bold mb-6 leading-tight animate-slide-up">
            <span className="text-gradient">Beautiful</span>
            <br />
            <span className="text-foreground">Crochet</span>
            <br />
            <span className="text-foreground animate-pulse">Creations</span>
          </h1>

          {/* Description */}
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed animate-slide-up" style={{ animationDelay: "0.2s" }}>
            Discover our stunning collection of handcrafted crochet items. From cozy blankets to elegant accessories, each piece is lovingly made with premium yarns and traditional techniques passed down through generations.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <Link to="/products">
              <Button size="xl" variant="hero">
                Shop Collection
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            
            <Button size="xl" variant="elegant" className="animate-pulse">
              Learn Crochet Techniques
            </Button>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8 mt-12 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <div className="text-center hover-scale">
              <div className="text-2xl font-bold text-primary">2000+</div>
              <div className="text-sm text-muted-foreground">Crochet Lovers</div>
            </div>
            <div className="text-center hover-scale">
              <div className="text-2xl font-bold text-primary">800+</div>
              <div className="text-sm text-muted-foreground">Handmade Items</div>
            </div>
            <div className="text-center hover-scale">
              <div className="text-2xl font-bold text-primary">25+</div>
              <div className="text-sm text-muted-foreground">Crochet Patterns</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-accent/20 rounded-full blur-2xl animate-float" style={{ animationDelay: "2s" }}></div>
    </section>
  );
};