import { Link } from "react-router-dom";
import { products as mockProducts } from "@/data/mockData";
import { MoveRight, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export const FeaturedProducts = () => {
  // Get 3 signature items
  const featured = mockProducts.slice(0, 3);

  if (!featured.length) return null; // Safety check

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const, // Fix type inference
      },
    },
  };

  return (
    <section className="py-24 md:py-32 bg-background border-t border-muted overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        {/* Section Header - Animated Reveal */}
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8"
        >
            <div className="max-w-xl">
                <span className="text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-4 block">
                    Curated Selection
                </span>
                <h2 className="text-5xl md:text-6xl font-playfair font-normal text-foreground leading-[1.1]">
                    The Signature <br/>
                    <span className="italic text-primary/80 font-light">Collection</span>
                </h2>
            </div>
            <Link to="/products" className="group flex items-center gap-2 text-xs tracking-widest uppercase border-b border-foreground/20 pb-2 hover:border-primary hover:text-primary transition-all duration-500">
                View All Works
                <MoveRight className="h-4 w-4 group-hover:translate-x-2 transition-transform duration-500" />
            </Link>
        </motion.div>

        {/* Asymmetric Grid - Staggered Entrance */}
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16"
        >
            {/* Large Feature - Magnetic Hover */}
            <motion.div 
              variants={itemVariants}
              className="md:col-span-2 group cursor-pointer relative"
            >
                <Link to={`/product/${featured[0]?.id}`}>
                    <div className="aspect-[4/5] md:aspect-[16/10] overflow-hidden relative">
                        <motion.img 
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            src={featured[0]?.image_url} 
                            alt={featured[0]?.name} 
                            className="w-full h-full object-cover"
                        />
                         {/* Vignette Overlay */}
                         <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                         
                         {/* Floating Action Button */}
                         <div className="absolute bottom-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 hidden md:block">
                             <ArrowUpRight className="h-6 w-6 text-white" />
                         </div>
                    </div>
                    
                    <div className="mt-8 flex justify-between items-start pr-4">
                        <div className="space-y-2">
                            <h3 className="text-3xl font-playfair font-medium text-foreground group-hover:text-primary transition-colors duration-500">
                                {featured[0]?.name}
                            </h3>
                            <p className="text-sm text-muted-foreground font-light tracking-widest uppercase">
                                Handcrafted / {featured[0]?.category}
                            </p>
                        </div>
                        <span className="text-xl font-light tracking-wide font-inter border border-foreground/10 px-4 py-1 rounded-full">
                            ${featured[0]?.price}
                        </span>
                    </div>
                </Link>
            </motion.div>

            {/* Smaller Stack - Visual Rhythm */}
            <div className="flex flex-col gap-16 mt-12 md:mt-32">
                {featured.slice(1, 3).map((product) => (
                    <motion.div 
                      key={product?.id} 
                      variants={itemVariants}
                      className="group cursor-pointer"
                    >
                        <Link to={`/product/${product?.id}`}>
                            <div className="aspect-[3/4] overflow-hidden relative">
                                <motion.img 
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    src={product?.image_url} 
                                    alt={product?.name} 
                                    className="w-full h-full object-cover" 
                                />
                                 {/* Vignette Overlay */}
                                 <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                             </div>
                             <div className="mt-6">
                                <h3 className="text-2xl font-playfair text-foreground group-hover:text-primary transition-colors duration-500">
                                    {product?.name}
                                </h3>
                                <div className="flex justify-between items-center mt-2 border-t border-foreground/10 pt-4">
                                   <p className="text-sm text-muted-foreground tracking-widest uppercase">
                                      View Details
                                   </p>
                                   <p className="text-lg text-foreground font-light">
                                      ${product?.price}
                                   </p>
                                </div>
                             </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </motion.div>
      </div>
    </section>
  );
};
