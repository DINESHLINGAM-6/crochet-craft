import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, Search, Instagram } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/assets/Logo.png";

const navItems = [
  { label: "Shop", path: "/products" },
  { label: "Our Story", path: "/about" },
  { label: "Courses", path: "#courses" },
  { label: "Contact", path: "#contact" },
];

export const Header = () => {
  const location = useLocation();
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigate = useNavigate();

  const handleNavClick = (path: string) => {
    setIsMenuOpen(false);
    if (!path.startsWith("#")) return;

    // If we're already on the homepage, smooth-scroll to the section
    if (location.pathname === "/") {
      const el = document.querySelector(path);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      // Navigate to home with hash — browser will scroll after landing
      navigate(`/${path}`);
    }
  };

  return (
    <>
      <motion.header
        animate={{
          backgroundColor: scrolled ? "rgba(246,242,234,0.92)" : "rgba(246,242,234,0.0)",
          backdropFilter: scrolled ? "blur(16px)" : "blur(0px)",
          boxShadow: scrolled ? "0 2px 20px rgba(229,127,132,0.12)" : "none",
          borderBottomColor: scrolled ? "rgba(229,224,216,0.8)" : "rgba(229,224,216,0)",
        }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 right-0 z-50 border-b"
      >
        <div className="max-w-[1140px] mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div
              className="w-9 h-9 flex items-center justify-center overflow-hidden"
            >
              <img src={Logo} alt="The Flower Hook" className="w-9 h-9 object-contain" />
            </div>
            <span
              className="font-cormorant italic"
              style={{ color: "#3C3C3C", fontSize: "1.35rem", fontWeight: 600, letterSpacing: "0.01em", lineHeight: 1 }}
            >
              The Flower Hook
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navItems.map((item) => (
              item.path.startsWith("#") ? (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className="relative text-sm font-inter font-medium transition-colors duration-200 group"
                  style={{ color: "#3C3C3C" }}
                >
                  {item.label}
                  <span
                    className="absolute -bottom-0.5 left-0 w-0 h-0.5 rounded-full group-hover:w-full transition-all duration-300"
                    style={{ background: "#E57F84" }}
                  />
                </button>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative text-sm font-inter font-medium transition-colors duration-200 group"
                  style={{ color: location.pathname === item.path ? "#E57F84" : "#3C3C3C" }}
                >
                  {item.label}
                  <span
                    className="absolute -bottom-0.5 left-0 h-0.5 rounded-full transition-all duration-300"
                    style={{
                      background: "#E57F84",
                      width: location.pathname === item.path ? "100%" : "0%",
                    }}
                  />
                </Link>
              )
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Social icons - desktop */}
            <div className="hidden lg:flex items-center gap-1 mr-2">
              <a
                href="https://www.instagram.com/theflowerhook"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-blush"
              >
                <Instagram className="w-5 h-5" style={{ color: "#E57F84" }} />
              </a>
            </div>

            {/* Search */}
            <Link
              to="/search"
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-blush"
            >
              <Search className="w-4 h-4" style={{ color: "#3C3C3C" }} />
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-semibold font-nunito text-white"
                style={{ background: "#E57F84" }}
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="hidden sm:inline">Cart</span>
                {totalItems > 0 && (
                  <span className="ml-0.5 w-5 h-5 rounded-full bg-white flex items-center justify-center text-xs font-bold" style={{ color: "#E57F84" }}>
                    {totalItems}
                  </span>
                )}
              </motion.div>
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden w-9 h-9 rounded-full flex items-center justify-center hover:bg-blush transition-colors"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className="w-5 h-5" style={{ color: "#3C3C3C" }} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/30 z-[60]"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed right-0 top-0 bottom-0 w-72 z-[70] flex flex-col"
              style={{ background: "#F6F2EA", borderLeft: "1px solid #E5E0D8" }}
            >
              {/* Mobile menu header */}
              <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: "#E5E0D8" }}>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 flex items-center justify-center">
                    <img src={Logo} alt="The Flower Hook" className="w-8 h-8 object-contain" />
                  </div>
                  <span
                    className="font-cormorant italic"
                    style={{ color: "#3C3C3C", fontSize: "1.2rem", fontWeight: 600 }}
                  >
                    The Flower Hook
                  </span>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-blush transition-colors"
                >
                  <X className="w-4 h-4" style={{ color: "#3C3C3C" }} />
                </button>
              </div>

              {/* Mobile nav links */}
              <div className="flex-1 overflow-y-auto p-5 space-y-1">
                {navItems.map((item, i) => (
                  item.path.startsWith("#") ? (
                    <button
                      key={item.path}
                      onClick={() => handleNavClick(item.path)}
                      className="w-full text-left px-4 py-3 rounded-2xl font-nunito font-semibold text-base transition-all duration-200 hover:bg-white hover:shadow-sm"
                      style={{ color: "#3C3C3C" }}
                    >
                      {item.label}
                    </button>
                  ) : (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-4 py-3 rounded-2xl font-nunito font-semibold text-base transition-all duration-200 hover:bg-white hover:shadow-sm"
                      style={{ color: location.pathname === item.path ? "#E57F84" : "#3C3C3C" }}
                    >
                      {item.label}
                    </Link>
                  )
                ))}

                <div className="pt-6">
                  <div className="h-px bg-[#E5E0D8] mb-6" />
                  <Link
                    to="/cart"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-2xl font-nunito font-semibold text-base transition-all duration-200 hover:bg-white hover:shadow-sm"
                    style={{ color: "#3C3C3C" }}
                  >
                    <ShoppingCart className="w-5 h-5" style={{ color: "#E57F84" }} />
                    Cart ({totalItems})
                  </Link>
                  <Link
                    to="/search"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-2xl font-nunito font-semibold text-base transition-all duration-200 hover:bg-white hover:shadow-sm"
                    style={{ color: "#3C3C3C" }}
                  >
                    <Search className="w-5 h-5" style={{ color: "#E57F84" }} />
                    Search
                  </Link>
                </div>

                <div className="pt-4">
                  <div className="flex items-center gap-3 px-4">
                    <a href="https://www.instagram.com/theflowerhook" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                      <Instagram className="w-6 h-6" style={{ color: "#E57F84" }} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};