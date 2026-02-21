import { useState, useEffect } from "react";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronRight,
  Phone,
  Zap,
  Home,
  Package,
  Folder,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import Logo from "@/assets/Logo.png";

const navItems = [
  { label: "Shop", path: "/products", icon: Package },
  { label: "Our Makes", path: "/categories", icon: Folder },
  { label: "Courses", path: "/about", icon: Home },
  { label: "Flash Sale", path: "/products?sale=true", icon: Zap, isFlash: true },
];

export const Header = () => {
  const location = useLocation();
  const { totalItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (y) => {
      setScrolled(y > 60);
    });
    return () => unsubscribe();
  }, [scrollY]);

  const isActive = (path: string) => {
    const basePath = path.split("?")[0];
    if (basePath === "/" && location.pathname === "/") return true;
    if (basePath !== "/" && location.pathname.startsWith(basePath)) return true;
    return false;
  };

  return (
    <motion.header
      animate={{
        backgroundColor: scrolled
          ? "rgba(255, 252, 248, 0.88)"
          : "rgba(0,0,0,0)",
        backdropFilter: scrolled ? "blur(18px) saturate(180%)" : "blur(0px)",
        borderBottomColor: scrolled
          ? "rgba(160, 82, 45, 0.12)"
          : "rgba(0,0,0,0)",
        boxShadow: scrolled
          ? "0 4px 30px rgba(160, 82, 45, 0.08), 0 1px 0 rgba(160, 82, 45, 0.06)"
          : "none",
      }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 border-b"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* ── Logo ── */}
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.4 }}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm overflow-hidden"
            style={{ border: "1.5px solid rgba(160, 82, 45, 0.18)" }}
          >
            <img src={Logo} alt="Crochet Now India" className="w-7 h-7 object-contain" />
          </motion.div>
          <div className="flex flex-col leading-none">
            <span
              className="text-base font-playfair font-semibold"
              style={{ color: scrolled ? "#2d1b0e" : "#2d1b0e" }}
            >
              Crochet Now
            </span>
            <span
              className="text-[10px] font-inter tracking-[0.15em] uppercase"
              style={{ color: "#a0522d" }}
            >
              India 🧶
            </span>
          </div>
        </Link>

        {/* ── Desktop Nav ── */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "relative text-sm font-inter font-medium tracking-wide transition-colors duration-300",
                item.isFlash
                  ? "flex items-center gap-1"
                  : ""
              )}
              style={{
                color: isActive(item.path)
                  ? "#a0522d"
                  : item.isFlash
                  ? "#c0392b"
                  : "#2d1b0e",
              }}
            >
              {item.isFlash && <Zap className="h-3.5 w-3.5 fill-current" />}
              {item.label}

              {/* Animated active underline */}
              {isActive(item.path) && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full"
                  style={{ background: "linear-gradient(90deg, #c0392b, #e07b54)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}

              {/* Hover underline for non-active */}
              {!isActive(item.path) && (
                <span
                  className="absolute -bottom-1 left-0 right-0 h-[1.5px] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                  style={{ background: "rgba(160, 82, 45, 0.4)" }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* ── Right Actions ── */}
        <div className="flex items-center gap-1">
          {/* Search */}
          <Link to="/search">
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:flex h-9 w-9 rounded-full hover:bg-orange-50 transition-colors"
              style={{ color: "#5c3317" }}
            >
              <Search className="h-4.5 w-4.5" />
            </Button>
          </Link>

          {/* Account */}
          <Link to="/profile">
            <Button
              variant="ghost"
              size="icon"
              className="hidden lg:flex h-9 w-9 rounded-full hover:bg-orange-50 transition-colors group relative"
              style={{ color: "#5c3317" }}
            >
              <User className="h-4.5 w-4.5" />
              {/* Tooltip */}
              <span
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-semibold whitespace-nowrap px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{ background: "#2d1b0e", color: "#fff" }}
              >
                Log in
              </span>
            </Button>
          </Link>

          {/* Cart */}
          <Link to="/cart">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white ml-2"
              style={{
                background: "linear-gradient(135deg, #c0392b, #e07b54)",
                boxShadow: "0 4px 16px rgba(192, 57, 43, 0.35)",
              }}
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">Cart</span>
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    key="cart-count"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full text-[10px] font-bold text-white"
                    style={{ background: "#7c3aed" }}
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </Link>

          {/* Mobile Menu Trigger */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden h-9 w-9 rounded-full hover:bg-orange-50 ml-1"
                style={{ color: "#5c3317" }}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[300px] p-0 border-l"
              style={{ borderColor: "rgba(160, 82, 45, 0.12)", background: "#fffaf6" }}
            >
              <div className="flex flex-col h-full">
                {/* Mobile header */}
                <SheetHeader
                  className="p-6 border-b"
                  style={{ borderColor: "rgba(160, 82, 45, 0.1)" }}
                >
                  <SheetTitle className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm overflow-hidden"
                      style={{ border: "1.5px solid rgba(160, 82, 45, 0.18)" }}
                    >
                      <img src={Logo} alt="Menu" className="w-6 h-6 object-contain" />
                    </div>
                    <div className="flex flex-col leading-none">
                      <span className="font-playfair text-base font-semibold" style={{ color: "#2d1b0e" }}>
                        Crochet Now
                      </span>
                      <span className="text-[10px] tracking-widest uppercase" style={{ color: "#a0522d" }}>
                        India 🧶
                      </span>
                    </div>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto py-6 px-4 space-y-6">
                  {/* Nav links */}
                  <div className="space-y-1">
                    <p
                      className="px-3 text-[10px] font-bold uppercase tracking-widest mb-3"
                      style={{ color: "#b89282" }}
                    >
                      Navigate
                    </p>
                    {navItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-3 py-3 rounded-xl transition-all text-sm font-medium",
                          isActive(item.path)
                            ? "text-white"
                            : "text-foreground hover:bg-orange-50"
                        )}
                        style={
                          isActive(item.path)
                            ? {
                                background:
                                  "linear-gradient(135deg, #c0392b, #e07b54)",
                              }
                            : {}
                        }
                      >
                        <item.icon className="h-4 w-4 flex-shrink-0" />
                        <span>{item.label}</span>
                        {isActive(item.path) && (
                          <ChevronRight className="h-4 w-4 ml-auto" />
                        )}
                      </Link>
                    ))}
                  </div>

                  {/* Account links */}
                  <div className="space-y-1">
                    <p
                      className="px-3 text-[10px] font-bold uppercase tracking-widest mb-3"
                      style={{ color: "#b89282" }}
                    >
                      My Account
                    </p>
                    <Link
                      to="/search"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-orange-50 transition-all text-sm font-medium text-foreground"
                    >
                      <Search className="h-4 w-4" />
                      <span>Search</span>
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-orange-50 transition-all text-sm font-medium text-foreground"
                    >
                      <User className="h-4 w-4" />
                      <span>Log In / Account</span>
                    </Link>
                    <Link
                      to="/cart"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-orange-50 transition-all text-sm font-medium text-foreground"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span>Cart ({totalItems})</span>
                    </Link>
                  </div>

                  {/* Support card */}
                  <div
                    className="rounded-2xl p-4"
                    style={{
                      background: "rgba(160, 82, 45, 0.06)",
                      border: "1px solid rgba(160, 82, 45, 0.12)",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="p-2 rounded-full shadow-sm"
                        style={{ background: "white" }}
                      >
                        <Phone className="h-4 w-4" style={{ color: "#a0522d" }} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold" style={{ color: "#2d1b0e" }}>
                          Need Help?
                        </p>
                        <p className="text-xs" style={{ color: "#a0522d" }}>
                          +91 98765 43210
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Close button */}
                <div
                  className="p-4 border-t"
                  style={{ borderColor: "rgba(160, 82, 45, 0.1)" }}
                >
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-colors"
                    style={{
                      color: "#7a3b1e",
                      border: "1.5px solid rgba(160, 82, 45, 0.2)",
                      background: "transparent",
                    }}
                  >
                    <X className="h-4 w-4" />
                    Close Menu
                  </button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
};