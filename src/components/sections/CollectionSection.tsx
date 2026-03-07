import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { products } from "@/data/mockData";

type FilterKey = "All" | "Bouquets" | "Keychains" | "Bags" | "Accessories";

const FILTER_MAP: Record<FilterKey, string[]> = {
  All: [],
  Bouquets: ["Bouquets", "Flowers", "Flower Pots"],
  Keychains: ["Keychains"],
  Bags: ["Handbags", "Bags & Pouches", "Sleeves"],
  Accessories: ["Hair Accessories", "Fridge Magnets", "Quran Cover"],
};

const filters: FilterKey[] = ["All", "Bouquets", "Keychains", "Bags", "Accessories"];

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

  const filteredProducts = products
    .filter((p) => {
      if (activeFilter === "All") return true;
      return FILTER_MAP[activeFilter].includes(p.category);
    })
    .slice(0, 6);

  return (
    <section
      id="collection"
      className="relative py-24 overflow-hidden"
      style={{ background: "#F6F2EA" }}
    >
      {/* Blob accent */}
      <div
        className="wash-blob"
        style={{ width: 400, height: 400, background: "#D7F2E8", top: "0", right: "-100px", opacity: 0.4 }}
      />

      <div ref={ref} className="relative z-10 max-w-[1140px] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="section-label">The Collection</span>
          <h2
            className="font-nunito font-black mt-4 mb-3"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: "#3C3C3C" }}
          >
            Shop by vibe
          </h2>
          <p className="font-inter text-base" style={{ color: "#7A7A7A", maxWidth: "480px", margin: "0 auto" }}>
            Every piece is unique, made with intention and love.
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
