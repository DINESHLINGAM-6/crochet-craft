import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { products } from "@/data/mockData";

type FilterKey = "All" | "Flowers and Bouquet" | "Flower Pots" | "Key Chains and Charms" | "Bags and pouches" | "Book covers and Sleeves" | "Hair Accessories";

const FILTER_MAP: Record<FilterKey, string[]> = {
  "All": [],
  "Flowers and Bouquet": ["Flowers and Bouquet"],
  "Flower Pots": ["Flower Pots"],
  "Key Chains and Charms": ["Key Chains and Charms"],
  "Bags and pouches": ["Bags and pouches"],
  "Book covers and Sleeves": ["Book covers and Sleeves"],
  "Hair Accessories": ["Hair Accessories"],
};

const filters: FilterKey[] = ["All", "Flowers and Bouquet", "Flower Pots", "Key Chains and Charms", "Bags and pouches", "Book covers and Sleeves", "Hair Accessories"];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {[...Array(5)].map((_, i) => (
      <span
        key={i}
        className="text-sm"
        style={{ color: i < Math.round(rating) ? "#E57F84" : "#E5E0D8" }}
      >
        ★
      </span>
    ))}
  </div>
);

export const CollectionSection = () => {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  let filteredProducts: typeof products = [];
  
  if (activeFilter === "All") {
    // Curated showcase of beautiful items for the 'All' tab
    const curatedIds = [
      "21", // Tulip & Lavender Bouquet
      "49", // Tulip Purse (replaces Rose Sling Bag which is in Signature Craft)
      "39", // Rose Bouquet Keychain
      "46", // Mini Purse
      "3",  // Daisy Quran Sleeve
      "8",  // Tulip Pot
    ];
    filteredProducts = products.filter(p => curatedIds.includes(p.id));
    filteredProducts.sort((a, b) => curatedIds.indexOf(a.id) - curatedIds.indexOf(b.id));
  } else {
    filteredProducts = products
      .filter((p) => FILTER_MAP[activeFilter].includes(p.category))
      .slice(0, 6);
  }

  return (
    <section
      id="collection"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "#f8f5f1" }}
    >
      {/* Dynamic Background matching elegant theme */}
      <div className="absolute inset-0 dot-pattern opacity-30 mix-blend-overlay" />
      <div
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full filter blur-[100px] opacity-40 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(233,227,246,1) 0%, rgba(248,245,241,0) 70%)", transform: "translate(-30%, -20%)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full filter blur-[120px] opacity-40 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(253,246,214,1) 0%, rgba(248,245,241,0) 70%)", transform: "translate(30%, 30%)" }}
      />

      <div ref={ref} className="relative z-10 max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="section-label shadow-sm bg-white/50 backdrop-blur-md px-4 py-1.5 rounded-full inline-block">The Collection</span>
          <h2
            className="font-nunito font-black mt-5 mb-4"
            style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)", color: "#2d1b0e", lineHeight: 1.1 }}
          >
            Shop by <span className="text-[#E57F84]">Vibe</span>
          </h2>
          <p className="font-inter text-lg" style={{ color: "#6b7280", maxWidth: "540px", margin: "0 auto", lineHeight: 1.6 }}>
            Every piece is unique, made with intention and love. Find the perfect charm that speaks to you.
          </p>
        </motion.div>

        {/* Filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`filter-pill ${activeFilter === f ? "active" : ""}`}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Products grid */}
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <Link
                to={`/product/${product.id}`}
                className="group block"
              >
                <div
                  className="card-hover overflow-hidden card-rounded"
                  style={{ background: "white", boxShadow: "0 4px 24px rgba(60,30,30,0.08)" }}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover image-hover"
                    />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      {product.is_new && (
                        <span
                          className="px-2.5 py-1 rounded-full text-xs font-nunito font-bold"
                          style={{ background: "#E57F84", color: "white" }}
                        >
                          New
                        </span>
                      )}
                      {product.original_price && (
                        <span
                          className="px-2.5 py-1 rounded-full text-xs font-nunito font-bold"
                          style={{ background: "#FDF6D6", color: "#3C3C3C" }}
                        >
                          Sale
                        </span>
                      )}
                    </div>

                    {/* Hover overlay */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                      style={{ background: "rgba(229,127,132,0.12)" }}
                    >
                      <span className="btn-primary text-sm">View Details</span>
                    </div>
                  </div>

                  {/* Card content */}
                  <div className="p-5">
                    <p className="font-inter text-xs mb-1 uppercase tracking-wider" style={{ color: "#7A7A7A" }}>
                      {product.category}
                    </p>
                    <h3 className="font-nunito font-bold text-base mb-2" style={{ color: "#3C3C3C" }}>
                      {product.name}
                    </h3>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-nunito font-black text-lg" style={{ color: "#E57F84" }}>
                          ₹{product.price.toLocaleString("en-IN")}
                        </span>
                        {product.original_price && (
                          <span className="font-inter text-sm line-through" style={{ color: "#7A7A7A" }}>
                            ₹{product.original_price.toLocaleString("en-IN")}
                          </span>
                        )}
                      </div>
                      <StarRating rating={product.rating} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View all */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link to="/products">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="btn-secondary"
            >
              View Full Collection →
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
