import { Link } from "react-router-dom";
import { categories } from "@/data/mockData";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export const Categories = () => {
  return (
    <section className="py-0 bg-background border-t border-muted overflow-hidden">
      {/* Full Width Grid - Rich Editorial Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 h-[100vh] md:h-[80vh]">
        {categories.slice(0, 4).map((category, idx) => (
          <Link 
            key={category.id} 
            to={`/products?category=${category.name}`}
            className="group relative block w-full h-full overflow-hidden border-r border-b border-white/10"
          >
            {/* Background Image - Dramatic Parallax Zoom on Hover */}
            <div className="absolute inset-0 bg-muted overflow-hidden">
                <motion.img 
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover opacity-90 transition-all duration-700 brightness-[0.8] group-hover:brightness-100 group-hover:blur-[1px]"
                />
                
                {/* Rich Gradient Overlay - Reveals on Hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80 opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
            </div>

            {/* Content - Floating Effect */}
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-24 text-center p-8 z-10">
                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 + 0.2 }}
                  className="text-white/60 text-[10px] tracking-[0.4em] uppercase mb-4 opacity-70 group-hover:opacity-100 group-hover:text-primary transition-all duration-500 translate-y-4 group-hover:translate-y-0"
                >
                    Collection {idx + 1}
                </motion.span>
                
                <h3 className="text-4xl md:text-5xl font-playfair font-normal text-white tracking-tight mix-blend-overlay group-hover:mix-blend-normal transition-all duration-500 drop-shadow-2xl">
                    <span className="relative inline-block">
                        {category.name}
                        <span className="absolute -bottom-4 left-1/2 w-0 h-[1px] bg-primary -translate-x-1/2 group-hover:w-full transition-all duration-700 ease-out"></span>
                    </span>
                </h3>
                
                <div className="mt-8 overflow-hidden h-0 group-hover:h-auto transition-all duration-500 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0">
                    <span className="inline-flex items-center gap-3 text-white/90 text-xs tracking-[0.2em] uppercase hover:text-primary transition-colors border border-white/20 px-6 py-3 backdrop-blur-md rounded-none hover:bg-white/10">
                        Explore Collection
                        <ArrowUpRight className="h-3 w-3" />
                    </span>
                </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
