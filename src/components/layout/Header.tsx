import { useState } from "react";
import { Search, ShoppingCart, User, Menu, Home, Package, Folder, X, ChevronRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

export const Header = () => {
  const location = useLocation();
  const { totalItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const navItems = [
    { label: "Home", path: "/", icon: Home },
    { label: "Products", path: "/products", icon: Package },
    { label: "Categories", path: "/categories", icon: Folder },
  ];

  return (
    <header className="sticky top-0 z-50 glass-effect border-b border-border/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-sm">🌸</span>
            </div>
            <h1 className="text-xl font-poppins font-medium tracking-wide text-foreground">
              The Flower Hook
            </h1>
          </Link>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "text-foreground hover:text-primary transition-colors font-medium relative group",
                isActive(item.path) && "text-primary font-semibold"
              )}
            >
              {item.label}
              {isActive(item.path) && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full animate-fade-in" />
              )}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          {/* Search - Hidden on small screens */}
          <Link to="/search">
            <Button variant="ghost" size="icon" className="hidden sm:flex hover:bg-primary/10 hover:text-primary transition-colors">
              <Search className="h-5 w-5" />
            </Button>
          </Link>

          {/* Cart */}
          <Link to="/cart">
            <Button variant="cart" className="relative group">
              <ShoppingCart className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline ml-2">Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center border border-white">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>

          {/* User Account - Desktop */}
          <Link to="/profile">
            <Button variant="ghost" size="icon" className="hidden lg:flex hover:bg-primary/10 hover:text-primary transition-colors">
              <User className="h-5 w-5" />
            </Button>
          </Link>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden hover:bg-primary/10">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] border-l border-border/50 bg-background/95 backdrop-blur-xl p-0">
               <div className="flex flex-col h-full">
                <SheetHeader className="p-6 border-b border-border/50 bg-muted/20">
                  <SheetTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center shadow-sm">
                      <span className="text-white font-bold text-sm">🌸</span>
                    </div>
                    <span className="font-poppins text-lg">Menu</span>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto py-6 px-4">
                  <div className="space-y-6">
                    {/* Main Nav Links */}
                    <div className="space-y-2">
                      <p className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Explore</p>
                      {navItems.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "flex items-center gap-3 p-3 rounded-xl transition-all",
                            isActive(item.path) 
                              ? "bg-primary/10 text-primary font-semibold" 
                              : "hover:bg-muted text-foreground"
                          )}
                        >
                          <item.icon className="h-5 w-5" />
                          <span>{item.label}</span>
                          {isActive(item.path) && <ChevronRight className="h-4 w-4 ml-auto" />}
                        </Link>
                      ))}
                    </div>

                    {/* Quick Actions */}
                    <div className="space-y-2">
                      <p className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">My Account</p>
                      <Link 
                        to="/search" 
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted text-foreground transition-all"
                      >
                         <Search className="h-5 w-5" />
                         <span>Search</span>
                      </Link>
                      <Link 
                        to="/profile" 
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted text-foreground transition-all"
                      >
                         <User className="h-5 w-5" />
                         <span>Profile</span>
                      </Link>
                    </div>

                    {/* Support */}
                    <div className="bg-primary/5 rounded-2xl p-4 mt-4">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-white rounded-full text-primary shadow-sm">
                                <Phone className="h-4 w-4" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold">Need Help?</p>
                                <p className="text-xs text-muted-foreground">+91 98765 43210</p>
                            </div>
                        </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 border-t border-border/50 bg-muted/20">
                  <Button 
                    variant="outline" 
                    className="w-full justify-center gap-2 rounded-xl"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-4 w-4" />
                    Close Menu
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};