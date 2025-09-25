import { Heart, Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

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
  isFeatured,
  category,
  className 
}: ProductCardProps) => {
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <Card className={cn(
      "group relative card-elevated border-0 hover-lift cursor-pointer overflow-hidden",
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
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="flex items-center gap-2">
              <Button 
                size="icon" 
                variant="secondary"
                className="rounded-full bg-background/90 hover:bg-background shadow-lg"
              >
                <Heart className="h-4 w-4" />
              </Button>
              <Button 
                variant="hero"
                size="sm"
                className="shadow-lg"
              >
                <ShoppingCart className="h-4 w-4 mr-1" />
                Quick Add
              </Button>
            </div>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {isNew && (
              <Badge variant="secondary" className="bg-primary text-primary-foreground font-medium">
                New
              </Badge>
            )}
            {isFeatured && (
              <Badge variant="secondary" className="bg-accent text-accent-foreground font-medium">
                Featured
              </Badge>
            )}
            {discount > 0 && (
              <Badge variant="destructive" className="font-medium">
                -{discount}%
              </Badge>
            )}
          </div>

          {/* Wishlist Button */}
          <Button 
            size="icon" 
            variant="ghost"
            className="absolute top-3 right-3 rounded-full bg-background/80 hover:bg-background opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-primary">
              ₹{price.toLocaleString()}
            </span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ₹{originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};