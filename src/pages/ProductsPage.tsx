import { useState, useEffect, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, SlidersHorizontal, X, ChevronDown, ArrowUpDown, Sparkles } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { products as mockProducts } from "@/data/mockData";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────
type SortOption = "featured" | "newest" | "price-low" | "price-high";

const ALL_CATS = ["All", ...Array.from(new Set(mockProducts.map((p) => p.category))).sort()];

const SORT_OPTIONS: { value: SortOption; label: string; icon: string }[] = [
  { value: "featured", label: "Featured", icon: "✨" },
  { value: "newest",   label: "Newest",   icon: "🆕" },
  { value: "price-low",  label: "Price ↑", icon: "💰" },
  { value: "price-high", label: "Price ↓", icon: "💎" },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-px">
    {Array.from({ length: 5 }, (_, i) => (
      <span key={i} className="text-xs leading-none" style={{ color: i < Math.round(rating) ? "#E57F84" : "#E5ded8" }}>
        ★
      </span>
    ))}
  </div>
);

const ProductCard = ({
  product,
  index,
}: {
  product: (typeof mockProducts)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [hovered, setHovered] = useState(false);
  const discount = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;

  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to cart!`, {
      style: { background: "#F8D9D9", color: "#3C3C3C", border: "1px solid #E57F84" }
    });
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const msg = `Hi! I'm interested in *${product.name}* (₹${product.price.toLocaleString("en-IN")}). Is it available?`;
    window.open(`https://wa.me/919840548758?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } }}
      transition={{ layout: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }, opacity: { duration: 0.8, delay: (index % 8) * 0.08 }, scale: { duration: 0.8, delay: (index % 8) * 0.08, ease: [0.25, 0.46, 0.45, 0.94] } }}
    >
      <Link to={`/product/${product.id}`} className="group block h-full">
        <motion.div
          className="relative flex flex-col h-full overflow-hidden bg-white"
          style={{
            borderRadius: "24px",
            boxShadow: hovered
              ? "0 20px 50px rgba(229,127,132,0.2), 0 4px 16px rgba(60,30,30,0.08)"
              : "0 4px 20px rgba(60,30,30,0.07)",
            transition: "box-shadow 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          whileHover={{ y: -8, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } }}
        >
          {/* Image container */}
          <div className="relative overflow-hidden" style={{ aspectRatio: "1/1" }}>
            <motion.img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover"
              animate={{ scale: hovered ? 1.07 : 1 }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            />

            {/* Gradient scrim on hover */}
            <motion.div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(229,127,132,0.88) 0%, rgba(229,127,132,0.1) 55%, transparent 80%)" }}
              animate={{ opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            />

            {/* Order via WhatsApp CTA — slides up on hover */}
            <motion.button
              onClick={handleWhatsApp}
              className="absolute left-3 right-3 bottom-3 py-2.5 rounded-2xl font-nunito font-bold text-sm text-white flex items-center justify-center gap-2"
              style={{ background: "rgba(255,255,255,0.22)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.4)" }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: hovered ? 0 : 20, opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <span>💬</span> Order via WhatsApp
            </motion.button>

            {/* Top badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {product.is_new && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-nunito font-black text-white shadow-sm"
                  style={{ background: "#E57F84" }}
                >
                  New
                </motion.span>
              )}
              {discount > 0 && (
                <span
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-nunito font-black shadow-sm"
                  style={{ background: "#FDF6D6", color: "#3C3C3C" }}
                >
                  {discount}% off
                </span>
              )}
            </div>
          </div>

          {/* Card body */}
          <div className="flex flex-col gap-1 p-4 flex-1">
            <p className="font-inter text-[10px] uppercase tracking-widest" style={{ color: "#B0A9A0" }}>
              {product.category}
            </p>
            <h3 className="font-nunito font-bold text-sm leading-snug line-clamp-2" style={{ color: "#3C3C3C" }}>
              {product.name}
            </h3>
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

            {/* Always-visible Add to cart button */}
            <button
              onClick={handleAddToCart}
              className="w-full py-2  rounded-2xl font-nunito font-bold text-xs flex items-center justify-center gap-1.5 transition-all duration-200"
              style={{
                background: hovered ? "#E57F84" : "#FDF0F0",
                color: hovered ? "white" : "#E57F84",
                border: "1.5px solid #E57F84",
              }}
            >
              <span>🛒</span> Add to Cart
            </button>
          </div>

          {/* Bottom coral accent bar on hover */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-0.5"
            style={{ background: "linear-gradient(90deg, #E57F84, #F4A7AA)" }}
            animate={{ scaleX: hovered ? 1 : 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
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
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const filtered = mockProducts.filter((p) => {
    return (
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCat === "All" || p.category === selectedCat) &&
      p.price <= priceMax
    );
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "newest") return parseInt(b.id) - parseInt(a.id);
    if (a.is_featured === b.is_featured) return 0;
    return a.is_featured ? -1 : 1;
  });

  const clearAll = () => {
    setSearchTerm("");
    setSelectedCat("All");
    setPriceMax(3000);
  };

  const hasFilters = searchTerm || selectedCat !== "All" || priceMax < 3000;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#F6F2EA" }}>
      <div className="grain-overlay" />
      <Header />

      <main className="flex-1 pt-16">

        {/* ── Hero banner ──────────────────────────────────────────────────── */}
        <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #F4E7F3 0%, #F6F2EA 60%, #D7F2E8 100%)" }}>
          {/* Decorative blobs */}
          <div className="wash-blob" style={{ width: 380, height: 380, background: "#E9E3F6", top: "-100px", right: "-60px", opacity: 0.55 }} />
          <div className="wash-blob" style={{ width: 240, height: 240, background: "#F8D9D9", bottom: "-60px", left: "5%", opacity: 0.5 }} />
          <div className="wash-blob" style={{ width: 200, height: 200, background: "#D7F2E8", top: "30%", left: "40%", opacity: 0.4 }} />

          <div className="relative z-10 text-center py-20 px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <span className="section-label mb-4 inline-flex">
                <Sparkles className="w-3 h-3" /> Handcrafted with Love
              </span>
              <h1
                className="font-nunito font-black mt-5"
                style={{ fontSize: "clamp(2.2rem, 6vw, 4rem)", color: "#3C3C3C", lineHeight: 1.1 }}
              >
                The Flower Hook{" "}
                <span style={{ color: "#E57F84" }}>Collection</span>
              </h1>
              <p className="font-inter text-base mt-4 max-w-md mx-auto" style={{ color: "#7A7A7A" }}>
                Every piece is handcrafted stitch by stitch — beautiful, lasting, and made with heart.
              </p>

              {/* Live count badge */}
              <motion.div
                className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-full"
                style={{ background: "white", border: "1px solid #E5E0D8", boxShadow: "0 4px 16px rgba(60,30,30,0.08)" }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#E57F84" }} />
                <span className="font-nunito font-bold text-sm" style={{ color: "#3C3C3C" }}>
                  {sorted.length} items available
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* ── Controls bar ─────────────────────────────────────────────────── */}
        <div
          className="sticky top-16 z-40 shadow-sm"
          style={{ background: "rgba(246,242,234,0.92)", backdropFilter: "blur(16px)", borderBottom: "1px solid #E5E0D8" }}
        >
          <div className="max-w-[1240px] mx-auto px-5 py-3 flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 min-w-[180px]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#B0A9A0" }} />
              <input
                type="text"
                placeholder="Search handmade items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm rounded-full font-inter outline-none transition-all"
                style={{
                  border: "1.5px solid #E5E0D8",
                  background: "white",
                  color: "#3C3C3C",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#E57F84")}
                onBlur={(e) => (e.target.style.borderColor = "#E5E0D8")}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2"
                >
                  <X className="w-3.5 h-3.5" style={{ color: "#B0A9A0" }} />
                </button>
              )}
            </div>

            {/* Sort pills — compact */}
            <div className="flex gap-1.5 overflow-x-auto">
              {SORT_OPTIONS.map(({ value, label, icon }) => (
                <button
                  key={value}
                  onClick={() => setSortBy(value)}
                  className="flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-nunito font-semibold transition-all duration-200"
                  style={{
                    background: sortBy === value ? "#E57F84" : "white",
                    color: sortBy === value ? "white" : "#3C3C3C",
                    border: `1.5px solid ${sortBy === value ? "#E57F84" : "#E5E0D8"}`,
                  }}
                >
                  <span>{icon}</span>
                  <span className="hidden sm:inline">{label}</span>
                </button>
              ))}
            </div>

            {/* Filter toggle */}
            <button
              onClick={() => setShowFilters((v) => !v)}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-nunito font-semibold transition-all duration-200 flex-shrink-0"
              style={{
                border: `1.5px solid ${showFilters ? "#E57F84" : "#E5E0D8"}`,
                background: showFilters ? "#E57F84" : "white",
                color: showFilters ? "white" : "#3C3C3C",
              }}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filter</span>
              {hasFilters && (
                <span
                  className="w-4 h-4 rounded-full text-[9px] font-black flex items-center justify-center"
                  style={{ background: showFilters ? "white" : "#E57F84", color: showFilters ? "#E57F84" : "white" }}
                >
                  !
                </span>
              )}
            </button>

            {/* Clear */}
            <AnimatePresence>
              {hasFilters && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={clearAll}
                  className="flex-shrink-0 flex items-center gap-1 text-xs font-inter"
                  style={{ color: "#E57F84" }}
                >
                  <X className="w-3 h-3" /> Clear
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Filter drawer ─────────────────────────────────────────────────── */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
              style={{ borderBottom: "1px solid #E5E0D8", background: "rgba(246,242,234,0.85)", backdropFilter: "blur(12px)" }}
            >
              <div className="max-w-[1240px] mx-auto px-5 py-5 flex flex-col gap-5">
                {/* Category pills */}
                <div>
                  <p className="font-nunito font-bold text-xs uppercase tracking-widest mb-3" style={{ color: "#7A7A7A" }}>
                    Category
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {ALL_CATS.map((cat) => (
                      <motion.button
                        key={cat}
                        onClick={() => setSelectedCat(cat)}
                        whileTap={{ scale: 0.95 }}
                        className="filter-pill transition-all duration-150"
                        style={{
                          background: selectedCat === cat ? "#E57F84" : "white",
                          color: selectedCat === cat ? "white" : "#7A7A7A",
                          borderColor: selectedCat === cat ? "#E57F84" : "#E5E0D8",
                        }}
                      >
                        {cat}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Price range */}
                <div className="flex items-center gap-4 max-w-md">
                  <p className="font-nunito font-bold text-xs uppercase tracking-widest whitespace-nowrap" style={{ color: "#7A7A7A" }}>
                    Max price
                  </p>
                  <input
                    type="range"
                    min={100}
                    max={3000}
                    step={50}
                    value={priceMax}
                    onChange={(e) => setPriceMax(Number(e.target.value))}
                    className="flex-1 h-1.5 cursor-pointer"
                    style={{ accentColor: "#E57F84" }}
                  />
                  <span className="font-nunito font-black text-sm whitespace-nowrap" style={{ color: "#E57F84" }}>
                    ₹{priceMax.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Category quick strip ────────────────────────────────────────── */}
        <div className="max-w-[1240px] mx-auto px-5 pt-8 pb-2">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {ALL_CATS.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                whileTap={{ scale: 0.95 }}
                className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-nunito font-semibold transition-all duration-200"
                style={{
                  background: selectedCat === cat ? "#E57F84" : "white",
                  color: selectedCat === cat ? "white" : "#3C3C3C",
                  border: `1.5px solid ${selectedCat === cat ? "#E57F84" : "#E5E0D8"}`,
                  boxShadow: selectedCat === cat ? "0 4px 14px rgba(229,127,132,0.3)" : "none",
                }}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>

        {/* ── Products grid ────────────────────────────────────────────────── */}
        <div className="max-w-[1240px] mx-auto px-5 py-8">

          {/* Loading skeleton */}
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

          {/* Products */}
          {!loading && sorted.length > 0 && (
            <motion.div
              layout
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
            >
              <AnimatePresence mode="popLayout">
                {sorted.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Empty state */}
          {!loading && sorted.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-28"
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, -5, 0] }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-6xl mb-6 inline-block"
              >
                🧶
              </motion.div>
              <h3 className="font-nunito font-black text-2xl mb-2" style={{ color: "#3C3C3C" }}>
                No items found
              </h3>
              <p className="font-inter text-sm mb-8 max-w-xs mx-auto" style={{ color: "#7A7A7A" }}>
                Try a different search or adjust your filters to discover more handmade treasures.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={clearAll}
                className="btn-primary"
              >
                Clear Filters & Show All ✨
              </motion.button>
            </motion.div>
          )}
        </div>

        {/* ── Bottom banner ────────────────────────────────────────────────── */}
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
              href="https://wa.me/919840548758?text=Hi! I'd like a custom crochet order."
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
