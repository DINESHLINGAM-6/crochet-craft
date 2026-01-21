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
    const phoneNumber = "919876543210"; // Replace with actual number
    const message = `Hi, I'm interested in purchasing *${name}* for ₹${finalPrice}. Could you please provide more details?`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <Link to={`/product/${id}`}>
      <Card className={cn(
        "group relative card-elevated border-0 hover-lift cursor-pointer overflow-hidden shimmer",
        "transform-gpu will-change-transform",
        className
      )}>
        <CardContent className="p-0">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden">
            <img 
              src={image} 
              alt={name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* Overlay Actions */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
              <div className="flex items-center gap-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <Button 
                  size="icon" 
                  variant="secondary"
                  className="rounded-full bg-white/95 hover:bg-white shadow-xl backdrop-blur-sm border-0 btn-glow"
                  onClick={(e) => {
                    e.preventDefault();
                    // Wishlist logic here
                  }}
                >
                  <Heart className="h-4 w-4 text-primary" />
                </Button>
                <Button 
                  className="shadow-xl bg-[var(--gradient-primary)] hover:scale-110 border-0 btn-glow text-white font-semibold"
                  size="sm"
                  onClick={handleWhatsAppClick}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Buy on WhatsApp
                </Button>
              </div>
            </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {isNew && (
              <Badge className="bg-[var(--gradient-secondary)] text-white font-bold shadow-lg border-0 animate-bounce-in">
                ✨ New
              </Badge>
            )}
            {isFeatured && (
              <Badge className="bg-[var(--gradient-accent)] text-primary font-bold shadow-lg border-0">
                ⭐ Featured
              </Badge>
            )}
            {discount > 0 && (
              <Badge className="bg-destructive text-destructive-foreground font-bold shadow-lg border-0 animate-pulse">
                -{discount}% OFF
              </Badge>
            )}
          </div>

          {/* Wishlist Button */}
          <Button 
            size="icon" 
            variant="ghost"
            className="absolute top-3 right-3 rounded-full bg-background/80 hover:bg-background opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={(e) => {
              e.preventDefault();
              // Wishlist logic component
            }}
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Category */}
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-1">
            {category}
          </p>

          {/* Product Name */}
          <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={cn(
                    "h-3 w-3",
                    star <= rating 
                      ? "fill-amber-400 text-amber-400" 
                      : "fill-muted text-muted"
                  )}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">({reviewCount})</span>
          </div>

          {/* Pricing */}
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl font-bold text-primary">
              ₹{finalPrice.toLocaleString()}
            </span>
            {originalPrice && originalPrice > finalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ₹{originalPrice.toLocaleString()}
              </span>
            )}
            {discount > 0 && (
              <Badge variant="destructive" className="text-xs font-bold">
                -{discount}%
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
    </Link>
  );
};
