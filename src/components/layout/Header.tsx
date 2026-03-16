import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, Search, Instagram, ChevronDown } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/assets/Logo.png";
import { categories } from "@/services/productsService";

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
  const [isShopOpen, setIsShopOpen] = useState(false);
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

    // Navigate to home with hash
    if (location.pathname === "/") {
      // If already on homepage, update hash and scroll
      window.history.pushState(null, "", path);
      const el = document.querySelector(path);
      if (el) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = el.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    } else {
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
              style={{
                fontFamily: "'Cinzel Decorative', serif",
                fontWeight: 700,
                fontSize: "1.05rem",
                letterSpacing: "0.06em",
                lineHeight: 1,
                background: "linear-gradient(120deg, #8B3A52 0%, #C0546A 40%, #A0522D 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                whiteSpace: "nowrap",
              }}
            >
              The Flower Hook
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navItems.map((item) => {
              if (item.label === "Shop") {
                return (
                  <div key={item.path} className="relative group">
                    <Link
                      to={item.path}
                      className="relative text-sm font-inter font-medium transition-colors duration-200 group-hover:text-[#E57F84] flex items-center gap-1.5 py-2"
                      style={{ color: location.pathname === item.path || location.pathname.startsWith("/product") ? "#E57F84" : "#3C3C3C" }}
                    >
                      {item.label}
                      <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" />
                      <span
                        className="absolute bottom-1 left-0 h-0.5 rounded-full transition-all duration-300"
                        style={{
                          background: "#E57F84",
                          width: location.pathname === item.path || location.pathname.startsWith("/product") ? "100%" : "0%",
                        }}
                      />
                    </Link>
                    
                    {/* Premium Dropdown Menu */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-50">
                      <div className="bg-white rounded-2xl shadow-[0_20px_40px_rgba(60,30,30,0.08)] border border-[#E5E0D8] p-3 w-[290px] relative overflow-hidden">
                        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#8B3A52] via-[#C0546A] to-[#E57F84]" />
                        <Link 
                          to="/products"
                          className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-[#FDF0F0] transition-all duration-200 group/link mb-2"
                        >
                          <span className="font-nunito font-bold text-base text-[#3C3C3C] group-hover/link:text-[#E57F84]">View All Products</span>
                          <span className="text-[#E57F84] opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-200">→</span>
                        </Link>
                        <div className="h-px bg-gradient-to-r from-transparent via-[#E5E0D8] to-transparent mx-2 mb-2" />
                        <div className="flex flex-col gap-1">
                          {categories.map((cat) => (
                            <Link
                              key={cat.id}
                              to={`/products?category=${encodeURIComponent(cat.name)}`}
                              className="flex items-center gap-3.5 px-3 py-2.5 rounded-xl hover:bg-[#FDF6F3] transition-all duration-200 group/item"
                            >
                              <div className="w-10 h-10 rounded-full border border-[#E5E0D8] overflow-hidden flex-shrink-0 relative group-hover/item:border-[#E57F84] transition-colors">
                                <img src={cat.image} className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500" alt={cat.name} />
                              </div>
                              <span className="font-inter font-medium text-sm text-[#5a5a5a] group-hover/item:text-[#C0546A] leading-tight">{cat.name}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return item.path.startsWith("#") ? (
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
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Social icons - desktop */}
            <div className="hidden lg:flex items-center gap-1 mr-2">
              <a
                href="https://www.instagram.com/theflowerhook"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-[#FDF0F0] hover:scale-110"
              >
                <Instagram className="w-5 h-5" style={{ color: "#E57F84" }} />
              </a>
              <a
                href="https://wa.me/919840548758"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-[#E7F5EE] hover:scale-110"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                  fill="#25D366"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </a>
            </div>

            {/* Search */}
            <Link
              to="/search"
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-blush hover:scale-110"
            >
              <Search className="w-4 h-4" style={{ color: "#3C3C3C" }} />
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-semibold font-nunito text-white shadow-sm transition-all hover:shadow-md hover:brightness-105 cursor-pointer"
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
                    style={{
                      fontFamily: "'Cinzel Decorative', serif",
                      fontWeight: 700,
                      fontSize: "0.92rem",
                      letterSpacing: "0.06em",
                      lineHeight: 1,
                      background: "linear-gradient(120deg, #8B3A52 0%, #C0546A 40%, #A0522D 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      whiteSpace: "nowrap",
                    }}
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
                {navItems.map((item, i) => {
                  if (item.label === "Shop") {
                    return (
                      <div key={item.path} className="flex flex-col">
                        <div className="flex items-center justify-between">
                          <Link
                            to={item.path}
                            onClick={() => setIsMenuOpen(false)}
                            className="flex-1 px-4 py-3 rounded-2xl font-nunito font-semibold text-base transition-all duration-200 hover:bg-white hover:shadow-sm"
                            style={{ color: location.pathname === item.path || location.pathname.startsWith("/product") ? "#E57F84" : "#3C3C3C" }}
                          >
                            {item.label}
                          </Link>
                          <button 
                            onClick={(e) => { e.preventDefault(); setIsShopOpen(!isShopOpen); }}
                            className="p-3 mr-2 rounded-full hover:bg-white transition-colors"
                          >
                            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isShopOpen ? 'rotate-180' : ''}`} style={{ color: "#3C3C3C" }} />
                          </button>
                        </div>
                        
                        {/* Mobile Shop Categories */}
                        <AnimatePresence>
                          {isShopOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="pl-6 pr-4 py-2 flex flex-col gap-1.5">
                                <Link
                                  to="/products"
                                  onClick={() => setIsMenuOpen(false)}
                                  className="font-nunito font-bold text-sm text-[#E57F84] py-2.5 px-3 rounded-xl hover:bg-white transition-colors flex items-center justify-between"
                                >
                                  View All Products <span>→</span>
                                </Link>
                                <div className="h-px bg-[#E5E0D8] mx-3 my-1" />
                                {categories.map((cat) => (
                                  <Link
                                    key={cat.id}
                                    to={`/products?category=${encodeURIComponent(cat.name)}`}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white transition-colors group"
                                  >
                                    <div className="w-9 h-9 rounded-full border border-[#E5E0D8] overflow-hidden flex-shrink-0">
                                      <img src={cat.image} className="w-full h-full object-cover" alt={cat.name} />
                                    </div>
                                    <span className="font-inter font-medium text-sm text-[#7A7A7A] group-hover:text-[#C0546A] leading-snug">{cat.name}</span>
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  return item.path.startsWith("#") ? (
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
                  );
                })}

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
                    <a href="https://www.instagram.com/theflowerhook" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm hover:scale-110 transition-transform">
                      <Instagram className="w-6 h-6" style={{ color: "#E57F84" }} />
                    </a>
                    <a href="https://wa.me/919840548758" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm hover:scale-110 transition-transform">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-6 h-6"
                        fill="#25D366"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
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