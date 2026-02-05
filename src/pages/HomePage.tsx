import { ArrowRight, Clock, Heart, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { Categories } from "@/components/sections/Categories";
import { Button } from "@/components/ui/button";
import { PageWrapper } from "@/components/layout/PageWrapper";

// Import images for the story section (using available assets)
import storyImg from "@/assets/flower-1.jpg";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background font-inter flex flex-col">
      <Header />
      
      <PageWrapper className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* Categories Section - Moved up to minimize gap */}
        <Categories />

        {/* Featured Products */}
        <FeaturedProducts />

        {/* Brand Philosophy / Story Teaser */}
        <section className="py-8 px-4 bg-muted/10 relative overflow-hidden">
             {/* Decorative background element */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse-slow" />
             
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
              <div className="w-full md:w-1/2">
                <div className="relative rounded-[2rem] overflow-hidden shadow-elegant rotate-[-2deg] hover:rotate-0 transition-transform duration-700">
                  <img 
                    src={storyImg} 
                    alt="Handcrafting process" 
                    className="w-full h-auto max-h-[500px] object-contain hover:scale-105 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 pointer-events-none" />
                </div>
              </div>
              
              <div className="w-full md:w-1/2 space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm font-medium text-primary shadow-sm border border-primary/20">
                  <Heart className="h-4 w-4 fill-primary/20" />
                  <span>Slow Fashion</span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-poppins font-medium leading-tight text-foreground">
                    Crafted with <span className="text-gradient font-semibold">Patience</span>, <br />
                    Woven with <span className="italic text-primary">Love</span>.
                </h2>
                
                <p className="text-lg text-muted-foreground leading-relaxed font-light">
                  In a world of fast production, The Flower Hook slows down time. 
                  Every petal, every stitch, and every loop is created by hand with intention and care. 
                  We believe that true beauty takes time, and that items made with love carry a special kind of magic.
                </p>
                
                <div className="grid grid-cols-2 gap-6 pt-4">
                    <div className="flex flex-col gap-2">
                        <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary-foreground">
                            <Clock className="h-5 w-5" />
                        </div>
                        <h4 className="font-semibold text-foreground">Time-Honored</h4>
                        <p className="text-sm text-muted-foreground">Hours of dedicated focus.</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                            <Sparkles className="h-5 w-5" />
                        </div>
                        <h4 className="font-semibold text-foreground">Unique Touch</h4>
                        <p className="text-sm text-muted-foreground">No two pieces are alike.</p>
                    </div>
                </div>

                <div className="pt-4">
                    <Link to="/about">
                        <Button variant="outline" className="button-secondary px-8 h-12">
                            Read Our Story
                        </Button>
                    </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter / Community Section */}
        <section className="py-8 px-4 bg-muted/30">
            <div className="container mx-auto text-center max-w-2xl">
                <span className="text-primary font-medium tracking-wide text-sm uppercase mb-4 block">Join Our Garden</span>
                <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-6 text-foreground">
                    Be the First to Bloom
                </h2>
                <p className="text-muted-foreground mb-8 text-lg font-light">
                    Subscribe to receive updates on new floral collections, exclusive handmade drops, and cozy crochet tips directly to your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <input 
                        type="email" 
                        placeholder="Your email address" 
                        className="h-12 px-6 rounded-full border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 w-full sm:w-80 shadow-sm"
                    />
                    <Button className="button-primary h-12 px-8">
                        Subscribe
                    </Button>
                </div>
            </div>
        </section>
      </PageWrapper>

      <Footer />
    </div>
  );
}