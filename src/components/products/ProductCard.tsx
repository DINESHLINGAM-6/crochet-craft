import { Heart, Star, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isFeatured?: boolean;
  category: string;
  className?: string;
}

export const ProductCard = ({ 
  id, 
  name, 
  price, 
  originalPrice, 
  image, 
  rating, 
  reviewCount, 
  isNew, 
  category,
  className 
}: ProductCardProps) => {
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const message = `Hi! I'm interested in the *${name}* (₹${price}). Can you share more details?`;
    const url = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <Link to={`/product/${id}`}>
      <motion.div 
        className={cn("h-full", className)}
        initial="rest"
        whileHover="hover"
        animate="rest"
        variants={{
          rest: { y: 0 },
          hover: { y: -4, transition: { duration: 0.5, ease: "easeOut" } }
        }}
      >
        <Card className="h-full border-0 shadow-sm hover:shadow-lg transition-shadow duration-500 rounded-[1.5rem] overflow-hidden bg-white/80 backdrop-blur-sm group">
          <CardContent className="p-0">
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden bg-muted/20">
              <motion.img 
                src={image} 
                alt={name}
                className="w-full h-full object-cover"
                variants={{
                  rest: { scale: 1 },
                  hover: { scale: 1.03, transition: { duration: 0.5, ease: "easeOut" } }
                }}
              />
            
            {/* Overlay Actions - Slide up on hover */}
            <motion.div 
              className="absolute inset-0 flex items-end justify-center pb-6 pointer-events-none"
              variants={{
                rest: { opacity: 0, y: 20 },
                hover: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } }
              }}
            >
              <div className="pointer-events-auto">
                <Button 
                  className="button-primary border-0 text-white font-medium px-6 py-2 tracking-wide shadow-xl shadow-black/20 backdrop-blur-sm hover:scale-105 transition-transform"
                  size="sm"
                  onClick={handleWhatsAppClick}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Order via WhatsApp
                </Button>
              </div>
            </motion.div>

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {isNew && (
              <Badge className="bg-white/90 backdrop-blur-md text-primary font-poppins text-xs font-semibold shadow-sm border border-white/50 px-3 py-1">
                ✨ New Arrival
              </Badge>
            )}
            {discount > 0 && (
              <Badge className="bg-rose-500/90 backdrop-blur-md text-white font-bold shadow-sm border-0 animate-pulse px-3 py-1">
                {discount}% OFF
              </Badge>
            )}
          </div>
          </div>


        {/* Product Info */}
        <div className="p-5 text-center">
          {/* Category */}
          <p className="text-[10px] text-accent font-bold uppercase tracking-widest mb-2 font-poppins">
            {category}
          </p>

          {/* Product Name */}
          <h3 className="font-poppins font-semibold text-lg text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
            {name}
          </h3>

          {/* Rating */}
          <div className="flex items-center justify-center gap-1 mb-3 opacity-80 group-hover:opacity-100 transition-opacity">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={cn(
                    "h-3 w-3",
                    star <= rating 
                      ? "fill-amber-400 text-amber-400" 
                      : "fill-stone-200 text-stone-200"
                  )}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground ml-1">({reviewCount})</span>
          </div>

            {/* Price section */}
            <div className="flex items-baseline gap-2 mb-3 items-center justify-center">
               <span className="text-xl font-bold text-primary">₹{price.toLocaleString()}</span>
               {originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">₹{originalPrice.toLocaleString()}</span>
               )}
            </div>
          </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
};
