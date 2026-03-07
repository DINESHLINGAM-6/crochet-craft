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

  // Pick featured product
  const featured = products.find((p) => p.is_featured) || products[0];

  return (
    <section
      id="signature"
      className="relative py-24 overflow-hidden"
      style={{ background: "#F4E7F3" }}
    >
      {/* Dot pattern bg */}
      <div className="absolute inset-0 dot-pattern opacity-50" />

      {/* Blob accents */}
      <div
        className="wash-blob"
        style={{ width: 350, height: 350, background: "#E9E3F6", top: "-60px", right: "-60px", opacity: 0.6 }}
      />

      <div ref={ref} className="relative z-10 max-w-[1140px] mx-auto px-6">
        {/* Section label */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Signature Craft</span>
          <h2
            className="font-nunito font-black mt-4"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: "#3C3C3C" }}
          >
            Our most-loved creation
          </h2>
        </motion.div>

        {/* Product showcase card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div
            className="grid md:grid-cols-2 gap-0 overflow-hidden card-rounded shadow-soft"
            style={{ background: "white" }}
          >
            {/* Image side */}
            <div
              className="relative overflow-hidden group"
              style={{ minHeight: "420px" }}
            >
              <img
                src={featured.image_url}
                alt={featured.name}
                className="w-full h-full object-cover image-hover"
                style={{ minHeight: "420px" }}
              />

              {/* Price badge */}
              <div
                className="absolute top-6 left-6 rounded-2xl px-4 py-2"
                style={{ background: "#E57F84" }}
              >
                <span className="font-nunito font-black text-white text-lg">
                  ₹{featured.price.toLocaleString("en-IN")}
                </span>
              </div>

              {/* New badge */}
              {featured.is_new && (
                <div
                  className="absolute top-6 right-6 rounded-full px-3 py-1"
                  style={{ background: "#FDF6D6" }}
                >
                  <span className="font-nunito font-bold text-sm" style={{ color: "#3C3C3C" }}>
                    ✨ New
                  </span>
                </div>
              )}
            </div>

            {/* Content side */}
            <div className="flex flex-col justify-center p-10 md:p-14">
              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    style={{ color: i < Math.round(featured.rating) ? "#E57F84" : "#E5E0D8" }}
                  >
                    ★
                  </span>
                ))}
                <span className="font-inter text-sm ml-2" style={{ color: "#7A7A7A" }}>
                  ({featured.reviews} reviews)
                </span>
              </div>

              <h3
                className="font-nunito font-black mb-3"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", color: "#3C3C3C", lineHeight: 1.2 }}
              >
                {featured.name}
              </h3>

              <p className="font-inter text-base leading-relaxed mb-6" style={{ color: "#7A7A7A" }}>
                {featured.description}
              </p>

              {/* Details list */}
              <ul className="space-y-2 mb-8">
                {[
                  "100% premium cotton yarn",
                  "Handmade stitch by stitch",
                  "Ships in 2-3 business days",
                  "Beautifully gift-wrapped",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 font-inter text-sm" style={{ color: "#7A7A7A" }}>
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0" style={{ background: "#F8D9D9", color: "#E57F84" }}>
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Price + CTA */}
              <div className="flex flex-wrap items-center gap-4">
                <div>
                  <span className="font-nunito font-black text-3xl" style={{ color: "#E57F84" }}>
                    ₹{featured.price.toLocaleString("en-IN")}
                  </span>
                  {featured.original_price && (
                    <span className="ml-2 font-inter text-sm line-through" style={{ color: "#7A7A7A" }}>
                      ₹{featured.original_price.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>
                <Link to={`/product/${featured.id}`}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                    className="btn-primary"
                  >
                    Shop Now
                  </motion.button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
