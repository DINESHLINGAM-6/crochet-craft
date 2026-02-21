import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, ShoppingCart } from "lucide-react";
import { products as mockProducts } from "@/data/mockData";

/* ─ First three specific products ─ */
const PRODUCT_IDS = ["1", "2", "3"]; // Red Rose Bouquet, Car Hanging Bird, Daisy Quran Sleeve

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export const FeaturedProducts = () => {
  const featured = PRODUCT_IDS.map(
    (id) => mockProducts.find((p) => p.id === id)!
  ).filter(Boolean);

  if (!featured.length) return null;

  const handleWhatsApp = (e: React.MouseEvent, name: string, price: number) => {
    e.preventDefault();
    e.stopPropagation();
    const msg = `Hi! I'm interested in the *${name}* (₹${price}). Can you share more details?`;
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <section
      className="py-24 md:py-36 border-t border-muted overflow-hidden"
      style={{ background: "hsl(35, 25%, 96%)" }}
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-20">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85 }}
          className="mb-20 flex flex-col md:flex-row items-end justify-between gap-8"
        >
          <div>
            <span
              className="block font-inter text-[10px] uppercase tracking-[0.35em] font-semibold mb-5"
              style={{ color: "#a0522d" }}
            >
              Curated Selection
            </span>
            <h2
              className="font-playfair font-normal leading-[1.1]"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#1e1108" }}
            >
              The Signature{" "}
              <span className="italic font-light" style={{ color: "#7a4a1e" }}>
                Collection
              </span>
            </h2>
          </div>

          <Link
            to="/products"
            className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] font-inter font-semibold transition-colors duration-300"
            style={{ color: "#5c3d1e" }}
          >
            View All Works
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </motion.div>

        {/* ── Product cards grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
        >
          {featured.map((product, idx) => (
            <motion.div
              key={product.id}
              variants={cardVariants}
              className="group"
            >
              <Link to={`/product/${product.id}`} className="block">
                {/* Image container */}
                <div
                  className="relative aspect-square overflow-hidden mb-6"
                  style={{
                    background: "#f5ede0",
                    borderRadius: "2px",
                  }}
                >
                  <motion.img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 1.4, ease: "easeOut" }}
                  />

                  {/* Dark vignette on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(30,10,0,0.45) 0%, transparent 55%)",
                    }}
                  />

                  {/* Add-to-cart button — floats up from bottom */}
                  <div
                    className="absolute bottom-0 left-0 right-0 px-5 pb-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out"
                  >
                    <button
                      onClick={(e) => handleWhatsApp(e, product.name, product.price)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-inter font-semibold uppercase tracking-[0.2em] text-white transition-colors duration-300"
                      style={{
                        border: "1px solid rgba(255,255,255,0.55)",
                        background: "rgba(255,255,255,0.12)",
                        backdropFilter: "blur(8px)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.22)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.12)";
                      }}
                    >
                      <ShoppingCart className="h-3.5 w-3.5" />
                      Add to Cart
                    </button>
                  </div>

                  {/* Index number — editorial watermark */}
                  <div
                    className="absolute top-4 right-4 font-playfair text-[3.5rem] font-bold leading-none pointer-events-none"
                    style={{ color: "rgba(255,255,255,0.07)" }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                </div>

                {/* Product info */}
                <div className="space-y-2 px-1">
                  {/* Descriptor */}
                  <p
                    className="font-inter text-[9px] uppercase tracking-[0.3em] font-semibold"
                    style={{ color: "rgba(140,80,30,0.6)" }}
                  >
                    Handcrafted / {product.category}
                  </p>

                  {/* Name */}
                  <h3
                    className="font-playfair font-medium text-xl leading-snug transition-colors duration-400 group-hover:text-primary"
                    style={{ color: "#1e1108" }}
                  >
                    {product.name}
                  </h3>

                  {/* Price + View Details row */}
                  <div
                    className="flex items-center justify-between pt-3"
                    style={{ borderTop: "1px solid rgba(140,80,30,0.12)" }}
                  >
                    {idx === 0 ? (
                      /* First product — show price prominently */
                      <span
                        className="font-inter text-lg font-light"
                        style={{ color: "#3d2010" }}
                      >
                        ₹{product.price.toLocaleString()}
                      </span>
                    ) : (
                      /* Others — "VIEW DETAILS ₹xxx" */
                      <span
                        className="font-inter text-xs font-semibold uppercase tracking-widest flex items-center gap-2 transition-all duration-300 group-hover:gap-3"
                        style={{ color: "#7a4a1e" }}
                      >
                        <span
                          className="underline-offset-2 decoration-primary/40"
                          style={{ textDecoration: "none" }}
                          onMouseEnter={(e) =>
                            ((e.target as HTMLElement).style.textDecoration = "underline")
                          }
                          onMouseLeave={(e) =>
                            ((e.target as HTMLElement).style.textDecoration = "none")
                          }
                        >
                          View Details
                        </span>
                        <span className="font-light" style={{ color: "#a0522d" }}>
                          ₹{product.price.toLocaleString()}
                        </span>
                      </span>
                    )}

                    <ArrowUpRight
                      className="h-4 w-4 opacity-0 group-hover:opacity-80 translate-y-1 group-hover:translate-y-0 transition-all duration-400"
                      style={{ color: "#a0522d" }}
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
