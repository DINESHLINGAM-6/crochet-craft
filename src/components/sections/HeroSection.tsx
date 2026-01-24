import { useEffect, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// ✅ Import images from src/assets
import hero1 from "@/assets/crochet-flowers-hero.jpg";
import hero2 from "@/assets/flower-1.jpg";
import hero3 from "@/assets/flower-2.jpg";
import hero4 from "@/assets/flower-3.jpg";
import hero5 from "@/assets/T5.jpg";
import hero6 from "@/assets/red-rose-bouquet.jpg";
import hero7 from "@/assets/Sunflower pot.jpeg";

const images = [hero1, hero2, hero3, hero4, hero5, hero6, hero7];

export const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto change image every 8s (slower, more calming)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[hsl(40,30%,98%)]">
      {/* Background Slideshow - Softened with Ken Burns */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
             <motion.img
              src={images[currentIndex]}
              alt="Handcrafted crochet"
              className="w-full h-full object-cover"
              initial={{ scale: 1 }}
              animate={{ scale: 1.1 }}
              transition={{ duration: 20, ease: "linear" }}
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Lighter Overlay since we box the text now */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px] z-10"></div>
        {/* Subtle gradient at bottom for smooth transitions */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[hsl(40,30%,98%)] to-transparent z-10"></div>
      </div>

      {/* Content */}
      <div className="container relative z-20 mx-auto px-4 pt-20">
        <div className="max-w-2xl mx-auto md:mx-0">
            {/* Glass Card to Fix Visibility */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="bg-white/40 backdrop-blur-md rounded-[3rem] p-8 md:p-14 border border-white/50 shadow-soft"
            >
              <div className="space-y-8">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md text-primary px-5 py-2 rounded-full shadow-sm border border-primary/20">
                    <Sparkles className="h-4 w-4 text-accent" />
                    <span className="font-poppins font-medium tracking-wide text-sm">Welcome to The Flower Hook</span>
                  </div>

                  {/* Heading */}
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-5xl md:text-7xl font-poppins font-medium leading-[1.1] text-foreground tracking-tight drop-shadow-sm"
                  >
                    Weaving <br/>
                    <span className="text-gradient font-normal italic">Nature's Beauty</span> <br/>
                    into every loop.
                  </motion.h1>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg font-light"
                  >
                    A curated studio of handcrafted crochet blooms and accessories. Each piece is slowly made with love, patience, and the finest yarns.
                  </motion.p>

                  {/* CTA Buttons */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="flex flex-col sm:flex-row gap-5 pt-4"
                  >
                    <Link to="/products">
                      <Button
                        size="xl"
                        className="button-primary h-14 px-10 text-lg w-full sm:w-auto shadow-xl"
                      >
                        Explore Collection
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </Button>
                    </Link>

                    <Link to="/about">
                      <Button
                        size="xl"
                        variant="outline"
                        className="button-outline h-14 px-8 text-lg w-full sm:w-auto bg-white/50 border-2 hover:bg-white"
                      >
                        Our Story
                      </Button>
                    </Link>
                  </motion.div>
              </div>
            </motion.div>
        </div>
      </div>

      {/* Subtle floating elements - Desktop only */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-12 right-12 w-fit p-6 bg-white/70 backdrop-blur-xl rounded-[2rem] border border-white/50 shadow-lg animate-float hidden lg:block z-20"
      >
         <div className="flex items-center gap-4">
             <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center text-2xl">🌱</div>
             <div>
                <p className="text-sm font-bold text-foreground font-poppins">100% Handcrafted</p>
                <p className="text-xs text-muted-foreground">Sustainable & Unique</p>
             </div>
         </div>
      </motion.div>
    </section>
  );
};
