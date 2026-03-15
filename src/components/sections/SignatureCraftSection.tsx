import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { products } from "@/data/mockData";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

export const SignatureCraftSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  // Pick featured product (id "17" is Rose Sling Bag, fits pink background nicely)
  const featured = products.find((p) => p.id === "17") || products[0];

  return (
    <section
      id="signature"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "#F4E7F3" }}
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 dot-pattern opacity-40 mix-blend-overlay" />
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full filter blur-[100px] opacity-60 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(233,227,246,1) 0%, rgba(244,231,243,0) 70%)", transform: "translate(20%, -20%)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full filter blur-[120px] opacity-40 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(253,246,214,1) 0%, rgba(244,231,243,0) 70%)", transform: "translate(-30%, 30%)" }}
      />

      <div ref={ref} className="relative z-10 max-w-[1200px] mx-auto px-6">
        {/* Section label */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label shadow-sm bg-white/50 backdrop-blur-md px-4 py-1.5 rounded-full inline-block">Signature Craft</span>
          <h2
            className="font-nunito font-black mt-5"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#2d1b0e", lineHeight: 1.1 }}
          >
            Our Most-Loved <span className="italic font-light text-[#E57F84]">Creation</span>
          </h2>
        </motion.div>

        {/* Product showcase card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div
            className="grid lg:grid-cols-2 gap-0 overflow-hidden rounded-[2.5rem]"
            style={{ 
              background: "#FDF6F0",
              boxShadow: "0 20px 80px rgba(160,82,45,0.12), 0 4px 20px rgba(176,84,112,0.08)"
            }}
          >
            {/* Image side - rich presentation */}
            <div className="relative group overflow-hidden">
              <div className="absolute inset-0 bg-[#f8f5f1] z-0" />
              <img
                src={featured.image_url}
                alt={featured.name}
                className="relative z-10 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
                style={{ minHeight: "500px", transformOrigin: "center" }}
              />

              {/* Sophisticated inner shadow / vignette */}
              <div 
                className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-700 opacity-60 group-hover:opacity-100"
                style={{
                  background: "radial-gradient(circle at center, transparent 30%, rgba(45,27,14,0.15) 100%)"
                }}
              />

              {/* Price badge floating */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="absolute bottom-8 left-8 z-30 px-6 py-3 rounded-2xl backdrop-blur-md shadow-xl"
                style={{ background: "rgba(255,255,255,0.9)", border: "1px solid rgba(255,255,255,0.5)" }}
              >
                <div className="text-[10px] uppercase tracking-widest font-semibold mb-0.5" style={{ color: "#a0522d" }}>Price</div>
                <span className="font-nunito font-black text-[#E57F84] text-2xl">
                  ₹{featured.price.toLocaleString("en-IN")}
                </span>
              </motion.div>

              {/* New badge */}
              {featured.is_new && (
                <div
                  className="absolute top-8 right-8 z-30 rounded-full px-4 py-1.5 shadow-lg backdrop-blur-md"
                  style={{ background: "rgba(253,246,214,0.95)", border: "1px solid rgba(255,255,255,0.6)" }}
                >
                  <span className="font-inter text-[11px] font-bold tracking-widest uppercase" style={{ color: "#8c6b25" }}>
                    ✨ New Arrival
                  </span>
                </div>
              )}
            </div>

            {/* Content side */}
            <div className="flex flex-col justify-center p-10 md:p-16 lg:p-20 relative"
              style={{ background: "linear-gradient(135deg, #FDF6F0 0%, #FAF0F4 60%, #F7EBF5 100%)" }}
            >
              {/* Subtle background decoration */}
              <div className="absolute top-0 right-0 w-48 h-48 opacity-10 pointer-events-none" 
                   style={{ background: "radial-gradient(circle, #C0546A 0%, transparent 70%)", transform: "translate(30%, -30%)" }} />
              <div className="absolute bottom-0 left-0 w-40 h-40 opacity-8 pointer-events-none" 
                   style={{ background: "radial-gradient(circle, #E57F84 0%, transparent 70%)", transform: "translate(-30%, 30%)" }} />

              {/* Stars */}
              <div className="flex items-center gap-1.5 mb-5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4" viewBox="0 0 24 24" fill={i < Math.round(featured.rating) ? "#f59e0b" : "#f1f1f1"}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
                <span className="font-inter text-[13px] font-medium ml-2" style={{ color: "#9ca3af" }}>
                  {featured.reviews} verified reviews
                </span>
              </div>

              <h3
                className="font-nunito font-black mb-5"
                style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", color: "#1e1108", lineHeight: 1.15 }}
              >
                {featured.name}
              </h3>

              <p className="font-inter text-base mt-2 mb-8" style={{ color: "#6b7280", lineHeight: 1.8 }}>
                {featured.description}
              </p>

              {/* Details list */}
              <ul className="space-y-4 mb-10 w-full max-w-sm">
                {[
                  "100% premium cotton yarn",
                  "Handmade stitch by stitch",
                  "Ships in 2-3 business days",
                  "Beautifully gift-wrapped",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 font-inter text-sm font-medium" style={{ color: "#4b5563" }}>
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm" style={{ background: "#fdf8f5" }}>
                      <svg className="w-3.5 h-3.5 text-[#E57F84]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>

              {/* CTA Area */}
              <div className="flex items-center gap-6 mt-2 pt-8" style={{ borderTop: "1px solid rgba(192,84,106,0.12)" }}>
                <Link to={`/product/${featured.id}`}>
                  <motion.button
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 px-8 py-4 rounded-xl font-inter font-semibold text-white tracking-wide shadow-lg transition-all"
                    style={{ background: "linear-gradient(135deg, #e57f84 0%, #db656a 100%)", boxShadow: "0 10px 25px rgba(229,127,132,0.3)" }}
                  >
                    Shop Now
                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </motion.button>
                </Link>
                
                {featured.original_price && (
                  <div className="flex flex-col">
                    <span className="font-inter text-[11px] uppercase tracking-widest text-[#9ca3af] font-semibold">Value</span>
                    <span className="font-inter text-sm line-through text-[#6b7280] font-medium">
                      ₹{featured.original_price.toLocaleString("en-IN")}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
