import { Heart, Star, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discountPrice?: number;
  discountPercentage?: number;
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
  discountPrice,
  discountPercentage,
  image, 
  rating, 
  reviewCount, 
  isNew, 
  isFeatured,
  category,
  className 
}: ProductCardProps) => {
  const discount = discountPercentage || (originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0);
  const finalPrice = discountPrice || price;

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const phoneNumber = "919677558758"; 
    const imageUrl = `${window.location.origin}${image}`;
    const message = `Hi, I would like to order:\n\n*Item:* ${name}\n*Price:* ₹${finalPrice}\n*Image:* ${imageUrl}\n\n*My Details:*\nName:\nAddress:`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <Link to={`/product/${id}`}>
      <Card className={cn(
        "group relative card-elevated border-0 hover-lift cursor-pointer overflow-hidden shimmer bg-white/50 hover:bg-white transition-all duration-500",
        "transform-gpu will-change-transform rounded-[1.5rem]",
        className
      )}>
        <CardContent className="p-0">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden bg-muted/20">
            <img 
              src={image} 
              alt={name}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            
            {/* Overlay Actions - Always visible for better UX */}
            <div className="absolute inset-0 flex items-end justify-center pb-4 pointer-events-none">
              <div className="pointer-events-auto transform transition-transform duration-300 hover:scale-105">
                <Button 
                  className="button-primary border-0 text-white font-medium px-6 py-2 tracking-wide shadow-xl shadow-black/20 backdrop-blur-sm"
                  size="sm"
                  onClick={handleWhatsAppClick}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Order via WhatsApp
                </Button>
              </div>
            </div>

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {isNew && (
              <Badge className="bg-white/90 backdrop-blur-md text-primary font-poppins text-xs font-semibold shadow-sm border border-white/50 px-3 py-1 animate-fade-in">
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

          {/* Pricing */}
          <div className="flex items-center justify-center gap-3">
            <span className="text-xl font-poppins font-bold text-primary">
              ₹{finalPrice.toLocaleString()}
            </span>
            {originalPrice && originalPrice > finalPrice && (
              <span className="text-sm text-muted-foreground/60 line-through font-light">
                ₹{originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
    </Link>
  );
};
