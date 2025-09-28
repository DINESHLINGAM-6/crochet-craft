import { Search, ShoppingCart, User, Heart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

export const Header = () => {
  const location = useLocation();
  const { totalItems } = useCart();

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 glass-effect border-b border-border/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">A</span>
            </div>
            <h1 className="text-xl font-poppins font-bold text-gradient">
              Crochet-Craft
            </h1>
          </Link>
        </div>

        {/* Navigation - Hidden on mobile */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className={cn(
              "text-foreground hover:text-primary transition-colors font-medium",
              isActive("/") && "text-primary font-semibold"
            )}
          >
            Home
          </Link>
          <Link 
            to="/products" 
            className={cn(
              "text-foreground hover:text-primary transition-colors font-medium",
              isActive("/products") && "text-primary font-semibold"
            )}
          >
            Products
          </Link>
          <Link 
            to="/products" 
            className="text-foreground hover:text-primary transition-colors font-medium"
          >
            Categories
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          {/* Search - Hidden on small screens */}
          <Link to="/search">
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Search className="h-5 w-5" />
            </Button>
          </Link>

          {/* Wishlist */}
          <Link to="/favorites">
            <Button variant="ghost" size="icon" className="relative">
              <Heart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                2
              </span>
            </Button>
          </Link>

          {/* Cart */}
          <Link to="/cart">
            <Button variant="cart">
              <ShoppingCart className="h-5 w-5" />
              <span className="hidden sm:inline">Cart</span>
              <span className="bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center ml-1">
                {totalItems}
              </span>
            </Button>
          </Link>

          {/* User Account - Hidden on small screens */}
          <Link to="/auth">
            <Button variant="ghost" size="icon" className="hidden lg:flex">
              <User className="h-5 w-5" />
            </Button>
          </Link>

          {/* Mobile Menu */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};