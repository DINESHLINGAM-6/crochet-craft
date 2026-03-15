import { useState, useEffect, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, X, ChevronDown, Sparkles, SlidersHorizontal } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { products as mockProducts, categories } from "@/data/mockData";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────
type SortOption = "featured" | "newest" | "price-low" | "price-high";

const ALL_CATS = ["All", ...Array.from(new Set(mockProducts.map((p) => p.category))).sort()];

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "featured",   label: "✨  Featured"   },
  { value: "newest",     label: "🆕  Newest First" },
  { value: "price-low",  label: "💰  Price: Low → High" },
  { value: "price-high", label: "💎  Price: High → Low" },
];

// ─── Dropdown ─────────────────────────────────────────────────────────────────
const Dropdown = ({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 pl-4 pr-3 py-2.5 rounded-xl text-sm font-inter font-medium transition-all duration-200 whitespace-nowrap"
        style={{
          background: open ? "#E57F84" : "white",
          color: open ? "white" : "#3C3C3C",
          border: `1.5px solid ${open ? "#E57F84" : "#E0D9D1"}`,
          boxShadow: open ? "0 4px 14px rgba(229,127,132,0.25)" : "0 1px 4px rgba(60,30,30,0.06)",
          minWidth: "160px",
        }}
      >
        <span className="flex-1 text-left truncate">{selected?.label ?? label}</span>
        <ChevronDown
          className="w-4 h-4 flex-shrink-0 transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute top-full left-0 mt-1.5 z-50 overflow-hidden"
            style={{
              background: "white",
              border: "1.5px solid #E5E0D8",
              borderRadius: "14px",
              boxShadow: "0 16px 48px rgba(60,30,30,0.14), 0 4px 16px rgba(60,30,30,0.06)",
              minWidth: "200px",
            }}
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => { onChange(opt.value); setOpen(false); }}
                className="w-full text-left px-4 py-2.5 text-sm font-inter transition-all duration-150 flex items-center gap-2"
                style={{
                  background: opt.value === value ? "#FDF0F0" : "transparent",
                  color: opt.value === value ? "#E57F84" : "#3C3C3C",
                  fontWeight: opt.value === value ? 600 : 400,
                }}
                onMouseEnter={(e) => {
                  if (opt.value !== value) (e.currentTarget as HTMLElement).style.background = "#FDF6F3";
                }}
                onMouseLeave={(e) => {
                  if (opt.value !== value) (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                {opt.value === value && (
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#E57F84" }} />
                )}
                {opt.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Star Rating ──────────────────────────────────────────────────────────────
const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-px">
    {Array.from({ length: 5 }, (_, i) => (
      <span key={i} className="text-xs leading-none" style={{ color: i < Math.round(rating) ? "#E57F84" : "#E5ded8" }}>
        ★
      </span>
    ))}
  </div>
);

// ─── Product Card ─────────────────────────────────────────────────────────────
const ProductCard = ({ product, index }: { product: (typeof mockProducts)[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [hovered, setHovered] = useState(false);
  const discount = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to cart!`, {
      style: { background: "#F8D9D9", color: "#3C3C3C", border: "1px solid #E57F84" },
    });
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    const itemLink = `${window.location.origin}/product/${product.id}`;
    const msg = `Hi! I'm interested in *${product.name}* (₹${product.price.toLocaleString("en-IN")}). Is it available?\nImage/Link: ${itemLink}`;
    window.open(`https://wa.me/919677558758?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.4 } }}
      transition={{ layout: { duration: 0.8 }, opacity: { duration: 0.7, delay: (index % 8) * 0.07 }, scale: { duration: 0.7, delay: (index % 8) * 0.07 } }}
    >
      <Link to={`/product/${product.id}`} className="group block h-full">
        <motion.div
          className="relative flex flex-col h-full overflow-hidden"
          style={{
            borderRadius: "20px",
            background: "white",
            boxShadow: hovered
              ? "0 20px 50px rgba(229,127,132,0.2), 0 4px 16px rgba(60,30,30,0.08)"
              : "0 2px 16px rgba(60,30,30,0.07)",
            transition: "box-shadow 0.5s cubic-bezier(0.25,0.46,0.45,0.94)",
          }}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          whileHover={{ y: -6, transition: { duration: 0.4 } }}
        >
          {/* Image */}
          <div className="relative overflow-hidden" style={{ aspectRatio: "1/1" }}>
            <motion.img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover"
              animate={{ scale: hovered ? 1.07 : 1 }}
              transition={{ duration: 0.7 }}
            />
            {/* Hover gradient */}
            <motion.div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(229,127,132,0.85) 0%, rgba(229,127,132,0.08) 50%, transparent 80%)" }}
              animate={{ opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.45 }}
            />
            {/* WhatsApp CTA */}
            <motion.button
              onClick={handleWhatsApp}
              className="absolute left-3 right-3 bottom-3 py-2.5 rounded-2xl font-nunito font-bold text-sm text-white flex items-center justify-center gap-2"
              style={{ background: "rgba(255,255,255,0.22)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.4)" }}
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: hovered ? 0 : 16, opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.35 }}
            >
              <span>💬</span> Order via WhatsApp
            </motion.button>
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {product.is_new && (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-nunito font-black text-white shadow-sm" style={{ background: "#E57F84" }}>
                  New
                </span>
              )}
              {discount > 0 && (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-nunito font-black shadow-sm" style={{ background: "#FDF6D6", color: "#3C3C3C" }}>
                  {discount}% off
                </span>
              )}
            </div>
          </div>

          {/* Card body */}
          <div className="flex flex-col gap-1 p-4 flex-1">
            <p className="font-inter text-[10px] uppercase tracking-widest" style={{ color: "#B0A9A0" }}>{product.category}</p>
            <h3 className="font-nunito font-bold text-sm leading-snug line-clamp-2" style={{ color: "#3C3C3C" }}>{product.name}</h3>
            <div className="flex items-center justify-between mt-1 mb-3">
              <div className="flex items-baseline gap-1.5">
                <span className="font-nunito font-black text-base" style={{ color: "#E57F84" }}>
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
                {product.original_price && (
                  <span className="font-inter text-xs line-through" style={{ color: "#B0A9A0" }}>
                    ₹{product.original_price.toLocaleString("en-IN")}
                  </span>
                )}
              </div>
              <StarRating rating={product.rating} />
            </div>
            <button
              onClick={handleAddToCart}
              className="w-full py-2 rounded-2xl font-nunito font-bold text-xs flex items-center justify-center gap-1.5 transition-all duration-200"
              style={{
                background: hovered ? "#E57F84" : "#FDF0F0",
                color: hovered ? "white" : "#E57F84",
                border: "1.5px solid #E57F84",
              }}
            >
              <span>🛒</span> Add to Cart
            </button>
          </div>

          {/* Bottom accent bar */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-0.5"
            style={{ background: "linear-gradient(90deg, #E57F84, #F4A7AA)" }}
            animate={{ scaleX: hovered ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>
      </Link>
    </motion.div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCat, setSelectedCat] = useState(searchParams.get("category") || "All");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [priceMax, setPriceMax] = useState(3000);
  const [showPriceSlider, setShowPriceSlider] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const filtered = mockProducts.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCat === "All" || p.category === selectedCat) &&
    p.price <= priceMax
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "newest") return parseInt(b.id) - parseInt(a.id);
    if (a.is_featured === b.is_featured) return 0;
    return a.is_featured ? -1 : 1;
  });

  const clearAll = () => { setSearchTerm(""); setSelectedCat("All"); setPriceMax(3000); };
  const hasFilters = searchTerm || selectedCat !== "All" || priceMax < 3000;

  const categoryOptions = ALL_CATS.map((c) => ({ value: c, label: c }));
  const sortOptions = SORT_OPTIONS;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#F6F2EA" }}>
      <div className="grain-overlay" />
      <Header />

      <main className="flex-1 pt-16">

        {/* ── Hero banner ───────────────────────────────────────────────────── */}
        <div
          className="relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #F4E7F3 0%, #F6F2EA 55%, #EFF9F4 100%)" }}
        >
          <div className="wash-blob" style={{ width: 400, height: 400, background: "#E9E3F6", top: "-120px", right: "-80px", opacity: 0.5 }} />
          <div className="wash-blob" style={{ width: 280, height: 280, background: "#F8D9D9", bottom: "-80px", left: "4%", opacity: 0.45 }} />
          <div className="wash-blob" style={{ width: 220, height: 220, background: "#D7F2E8", top: "30%", left: "38%", opacity: 0.35 }} />

          <div className="relative z-10 text-center py-20 px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <span className="section-label mb-4 inline-flex gap-2">
                <Sparkles className="w-3 h-3" /> Handcrafted with Love
              </span>
              <h1
                className="font-nunito font-black mt-5"
                style={{ fontSize: "clamp(2.2rem, 6vw, 4rem)", color: "#2d1b0e", lineHeight: 1.1 }}
              >
                The Flower Hook{" "}
                <span style={{ color: "#E57F84" }}>Collection</span>
              </h1>
              <p className="font-inter text-base mt-4 max-w-md mx-auto" style={{ color: "#7A7A7A", lineHeight: 1.7 }}>
                Every piece is handcrafted stitch by stitch — beautiful, lasting, and made with heart.
              </p>

              <motion.div
                className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-full"
                style={{ background: "white", border: "1px solid #E5E0D8", boxShadow: "0 4px 16px rgba(60,30,30,0.08)" }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.7 }}
              >
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#E57F84" }} />
                <span className="font-nunito font-bold text-sm" style={{ color: "#3C3C3C" }}>
                  {sorted.length} items available
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* ── Premium Controls Bar ───────────────────────────────────────────── */}
        <div
          className="sticky top-16 z-40"
          style={{
            background: "rgba(246,242,234,0.94)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(229,224,216,0.8)",
            boxShadow: "0 4px 20px rgba(60,30,30,0.05)",
          }}
        >
          <div className="max-w-[1240px] mx-auto px-5 py-3.5">
            <div className="flex flex-wrap items-center gap-3">

              {/* 🔍 Search */}
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#B0A9A0" }} />
                <input
                  type="text"
                  placeholder="Search handmade items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl font-inter outline-none transition-all"
                  style={{ border: "1.5px solid #E0D9D1", background: "white", color: "#3C3C3C", boxShadow: "0 1px 4px rgba(60,30,30,0.06)" }}
                  onFocus={(e) => (e.target.style.borderColor = "#E57F84")}
                  onBlur={(e) => (e.target.style.borderColor = "#E0D9D1")}
                />
                {searchTerm && (
                  <button onClick={() => setSearchTerm("")} className="absolute right-3.5 top-1/2 -translate-y-1/2">
                    <X className="w-3.5 h-3.5" style={{ color: "#B0A9A0" }} />
                  </button>
                )}
              </div>

              {/* Category Dropdown Removed (Replaced by Visual Category Row below) */}

              {/* ↕ Sort Dropdown */}
              <Dropdown
                label="Sort by"
                value={sortBy}
                options={sortOptions}
                onChange={(v) => setSortBy(v as SortOption)}
              />

              {/* 💲 Price Filter toggle */}
              <button
                onClick={() => setShowPriceSlider((v) => !v)}
                className="flex items-center gap-2 pl-4 pr-3 py-2.5 rounded-xl text-sm font-inter font-medium transition-all duration-200 whitespace-nowrap"
                style={{
                  background: showPriceSlider ? "#E57F84" : "white",
                  color: showPriceSlider ? "white" : "#3C3C3C",
                  border: `1.5px solid ${showPriceSlider ? "#E57F84" : "#E0D9D1"}`,
                  boxShadow: showPriceSlider ? "0 4px 14px rgba(229,127,132,0.25)" : "0 1px 4px rgba(60,30,30,0.06)",
                }}
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Price</span>
                {priceMax < 3000 && (
                  <span
                    className="w-4 h-4 rounded-full text-[9px] font-black flex items-center justify-center"
                    style={{ background: showPriceSlider ? "white" : "#E57F84", color: showPriceSlider ? "#E57F84" : "white" }}
                  >!</span>
                )}
                <ChevronDown
                  className="w-4 h-4 transition-transform duration-200"
                  style={{ transform: showPriceSlider ? "rotate(180deg)" : "rotate(0deg)" }}
                />
              </button>

              {/* ✖ Clear */}
              <AnimatePresence>
                {hasFilters && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={clearAll}
                    className="flex items-center gap-1.5 text-xs font-inter font-medium px-3 py-2.5 rounded-xl transition-all"
                    style={{ color: "#E57F84", background: "#FDF0F0", border: "1.5px solid #F4C5C7" }}
                  >
                    <X className="w-3 h-3" /> Clear all
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Price slider inline dropdown */}
            <AnimatePresence>
              {showPriceSlider && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="flex items-center gap-4 max-w-sm pt-3 pb-1">
                    <span className="font-inter text-xs font-semibold whitespace-nowrap" style={{ color: "#7A7A7A" }}>
                      Max Price
                    </span>
                    <input
                      type="range"
                      min={100} max={3000} step={50}
                      value={priceMax}
                      onChange={(e) => setPriceMax(Number(e.target.value))}
                      className="flex-1 h-1.5 cursor-pointer"
                      style={{ accentColor: "#E57F84" }}
                    />
                    <span className="font-nunito font-black text-sm whitespace-nowrap" style={{ color: "#E57F84" }}>
                      ₹{priceMax.toLocaleString("en-IN")}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Premium Visual Category Row ────────────────────────────────────── */}
        <div className="max-w-[1240px] mx-auto px-5 pt-8 pb-4">
          <div className="flex gap-5 overflow-x-auto pb-6 no-scrollbar items-center mask-fade-edges">
            <button
              onClick={() => setSelectedCat("All")}
              className="relative flex-shrink-0 flex flex-col items-center gap-3 group outline-none"
            >
              <div 
                className="w-[84px] h-[84px] rounded-full flex items-center justify-center transition-all duration-400 overflow-hidden bg-white"
                style={{ 
                  border: `3px solid ${selectedCat === "All" ? "#E57F84" : "#E5E0D8"}`,
                  boxShadow: selectedCat === "All" 
                    ? "0 10px 25px rgba(229,127,132,0.35)" 
                    : "0 4px 14px rgba(60,30,30,0.06)",
                  transform: selectedCat === "All" ? "scale(1.05)" : "scale(1)"
                }}
              >
                <motion.span 
                  className="text-3xl filter saturate-150"
                  whileHover={{ scale: 1.25, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  ✨
                </motion.span>
              </div>
              <span 
                className="font-nunito text-sm font-bold whitespace-nowrap transition-colors"
                style={{ color: selectedCat === "All" ? "#E57F84" : "#7A7A7A" }}
              >
                All Products
              </span>
            </button>
            
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.name)}
                className="relative flex-shrink-0 flex flex-col items-center gap-3 group outline-none"
              >
                <div 
                  className="w-[84px] h-[84px] rounded-full overflow-hidden transition-all duration-400 bg-white"
                  style={{ 
                    border: `3px solid ${selectedCat === cat.name ? "#E57F84" : "#E5E0D8"}`,
                    boxShadow: selectedCat === cat.name 
                      ? "0 10px 25px rgba(229,127,132,0.35)" 
                      : "0 4px 14px rgba(60,30,30,0.06)",
                    transform: selectedCat === cat.name ? "scale(1.05)" : "scale(1)"
                  }}
                >
                  <motion.img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                  {/* Subtle overlay on unselected items */}
                  {selectedCat !== cat.name && (
                    <div className="absolute inset-0 bg-white/20 group-hover:bg-transparent transition-colors duration-300 pointer-events-none" />
                  )}
                </div>
                <span 
                  className="font-nunito text-sm font-bold whitespace-nowrap transition-colors"
                  style={{ color: selectedCat === cat.name ? "#E57F84" : "#7A7A7A" }}
                >
                  {cat.name}
                </span>
                
                {/* Active indicator dot */}
                {selectedCat === cat.name && (
                  <motion.div 
                    layoutId="activeCategoryDot"
                    className="absolute -bottom-1 w-1.5 h-1.5 rounded-full"
                    style={{ background: "#E57F84" }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── Active filters chips + result count ───────────────────────────── */}
        <div className="max-w-[1240px] mx-auto px-5 pt-2 pb-2 flex flex-wrap items-center gap-2">
          <span className="font-inter text-sm" style={{ color: "#7A7A7A" }}>
            <span className="font-bold" style={{ color: "#3C3C3C" }}>{sorted.length}</span> items
          </span>
          {selectedCat !== "All" && (
            <span
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-nunito font-semibold cursor-pointer"
              style={{ background: "#F8D9D9", color: "#C0546A", border: "1px solid #F4C5C7" }}
              onClick={() => setSelectedCat("All")}
            >
              {selectedCat} <X className="w-3 h-3" />
            </span>
          )}
          {priceMax < 3000 && (
            <span
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-nunito font-semibold cursor-pointer"
              style={{ background: "#FDF6D6", color: "#8c6b25", border: "1px solid #EDE0A0" }}
              onClick={() => setPriceMax(3000)}
            >
              Under ₹{priceMax.toLocaleString("en-IN")} <X className="w-3 h-3" />
            </span>
          )}
          {searchTerm && (
            <span
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-nunito font-semibold cursor-pointer"
              style={{ background: "#E9E3F6", color: "#6B4FA0", border: "1px solid #D8CDEF" }}
              onClick={() => setSearchTerm("")}
            >
              "{searchTerm}" <X className="w-3 h-3" />
            </span>
          )}
        </div>

        {/* ── Products grid ─────────────────────────────────────────────────── */}
        <div className="max-w-[1240px] mx-auto px-5 py-6">
          {loading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="rounded-3xl overflow-hidden bg-white" style={{ boxShadow: "0 4px 20px rgba(60,30,30,0.06)" }}>
                  <div className="aspect-square" style={{ background: "linear-gradient(90deg, #F0EBE3, #E8E2DA, #F0EBE3)", backgroundSize: "200%", animation: "shimmer 1.5s infinite" }} />
                  <div className="p-4 space-y-2">
                    <div className="h-2.5 rounded-full w-1/2" style={{ background: "#EEE8E0" }} />
                    <div className="h-4 rounded-full w-4/5" style={{ background: "#EEE8E0" }} />
                    <div className="h-3 rounded-full w-1/3" style={{ background: "#EEE8E0" }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && sorted.length > 0 && (
            <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              <AnimatePresence mode="popLayout">
                {sorted.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {!loading && sorted.length === 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-28">
              <motion.div
                animate={{ rotate: [0, -10, 10, -5, 0] }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-6xl mb-6 inline-block"
              >🧶</motion.div>
              <h3 className="font-nunito font-black text-2xl mb-2" style={{ color: "#3C3C3C" }}>No items found</h3>
              <p className="font-inter text-sm mb-8 max-w-xs mx-auto" style={{ color: "#7A7A7A" }}>
                Try a different search or adjust your filters to discover more handmade treasures.
              </p>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} onClick={clearAll} className="btn-primary">
                Clear Filters & Show All ✨
              </motion.button>
            </motion.div>
          )}
        </div>

        {/* ── Bottom CTA ────────────────────────────────────────────────────── */}
        {!loading && sorted.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center py-16 mt-4"
            style={{ borderTop: "1px solid #E5E0D8" }}
          >
            <p className="font-nunito font-bold text-lg mb-2" style={{ color: "#3C3C3C" }}>
              Can't find what you're looking for?
            </p>
            <p className="font-inter text-sm mb-6" style={{ color: "#7A7A7A" }}>
              We take custom orders! Message us on WhatsApp for a bespoke creation.
            </p>
            <motion.a
              href="https://wa.me/919677558758?text=Hi! I'd like a custom crochet order."
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary inline-flex"
            >
              💬 Request Custom Order
            </motion.a>
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductsPage;
