import { ArrowRight, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import hero1 from "@/assets/crochet-flowers-hero.jpg";

export const HeroSection = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0.5]);

  return (
    <section className="relative h-[100vh] w-full overflow-hidden bg-background">
      {/* Cinematic Background Image - Parallax */}
      <motion.div 
        style={{ y: y1, opacity }}
        className="absolute inset-0 z-0"
      >
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
          src={hero1}
          alt="Handcrafted crochet atelier"
          className="h-full w-full object-cover object-center opacity-95 brightness-[0.95]"
        />
        {/* Rich Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-background/20 to-transparent z-10 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10"></div>
      </motion.div>

      {/* Editorial Content - Left Aligned, Rich Motion */}
      <div className="relative z-20 container mx-auto h-full flex flex-col justify-center px-6 md:px-12 lg:px-24">
        <motion.div 
          style={{ y: y2 }}
          className="max-w-4xl space-y-10"
        >
            {/* Small Eyebrow Text */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="flex items-center gap-4"
            >
                <span className="h-[1px] w-12 bg-primary/40"></span>
                <span className="text-xs uppercase tracking-[0.4em] text-primary font-medium">
                    Est. 2024 • Handcrafted in India
                </span>
            </motion.div>

            {/* Main Title - Huge & Staggered */}
            <h1 className="text-7xl md:text-9xl lg:text-[10rem] font-playfair font-normal text-foreground leading-[0.85] tracking-tighter mix-blend-multiply drop-shadow-sm">
              <motion.span
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.2, 0.65, 0.3, 0.9] }}
                className="block"
              >
                The Flower
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6, ease: [0.2, 0.65, 0.3, 0.9] }}
                className="block italic font-light text-primary/90"
              >
                Hook.
              </motion.span>
            </h1>

            {/* Description - Rich & Spaced */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="text-xl md:text-2xl text-foreground/70 font-light leading-relaxed max-w-lg ml-2 tracking-wide backdrop-blur-sm"
            >
              A luxury crochet atelier weaving nature’s fleeting beauty into timeless floral art. 
              <span className="text-primary italic"> Sustainable, slow-crafted, and eternal.</span>
            </motion.p>

            {/* Minimal CTA */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="pt-8 ml-2"
            >
                <Link to="/products">
                    <Button variant="ghost" className="group text-lg uppercase tracking-widest border-b border-foreground/30 px-0 py-2 hover:bg-transparent hover:border-primary hover:text-primary transition-all duration-500 rounded-none h-auto">
                        View Signature Collection
                        <MoveRight className="ml-4 h-4 w-4 group-hover:translate-x-4 transition-transform duration-500 text-primary" />
                    </Button>
                </Link>
            </motion.div>
        </motion.div>
      </div>

      {/* Floating Badge - Glassmorphism */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-12 right-12 hidden lg:flex items-center gap-4 z-20"
      >
         <div className="bg-white/10 backdrop-blur-xl p-8 border border-white/20 shadow-2xl relative overflow-hidden group">
             <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
             <span className="block text-xs uppercase tracking-widest text-primary mb-2 relative z-10">Authentic</span>
             <span className="block text-3xl font-playfair font-medium text-foreground relative z-10">100% Cotton</span>
         </div>
      </motion.div>
    </section>
  );
};
