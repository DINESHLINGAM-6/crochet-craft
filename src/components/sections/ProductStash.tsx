import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { products as mockProducts } from "@/data/mockData";
import { useState } from "react";

interface ProductStashItem {
  id: string;
  name: string;
  price: number;
  original_price?: number;
  image_url: string;
  category: string;
  rating: number;
  reviews: number;
}

interface ProductStashCardProps {
  product: ProductStashItem;
}

const ProductStashCard = ({ product }: ProductStashCardProps) => {
  const [hovered, setHovered] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const message = `Hi! I'd like to order the *${product.name}* (₹${product.price}). Can you help me?`;
    window.open(
      `https://wa.me/919876543210?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <Link to={`/product/${product.id}`}>
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
        className="h-full"
      >
        <Card
          className="h-full overflow-hidden border-0 rounded-2xl group"
          style={{
            boxShadow: hovered
              ? "0 20px 55px rgba(160, 82, 45, 0.16), 0 6px 20px rgba(0,0,0,0.08)"
              : "0 4px 16px rgba(0,0,0,0.06)",
            transition: "box-shadow 0.45s ease",
            background: "rgba(255,255,255,0.95)",
          }}
        >
          <CardContent className="p-0">
            {/* Product image */}
            <div
              className="relative aspect-square overflow-hidden"
              style={{ background: "#faf5ef" }}
            >
              <motion.img
                src={product.image_url}
                alt={product.name}
                animate={{ scale: hovered ? 1.045 : 1 }}
                transition={{ duration: 0.65, ease: "easeOut" }}
                className="w-full h-full object-cover"
              />

              {/* Soft gradient overlay on hover */}
              <motion.div
                animate={{ opacity: hovered ? 1 : 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(80, 30, 10, 0.38) 0%, transparent 55%)",
                }}
              />

              {/* Add to Cart — slides up on hover */}
              <motion.div
                initial={false}
                animate={{
                  y: hovered ? 0 : 20,
                  opacity: hovered ? 1 : 0,
                }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
                className="absolute bottom-0 left-0 right-0 pb-4 px-4"
              >
                <motion.button
                  onClick={handleAddToCart}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white tracking-wide shadow-xl"
                  style={{
                    background:
                      "linear-gradient(135deg, #c0392b 0%, #e07b54 100%)",
                    boxShadow: "0 6px 24px rgba(192, 57, 43, 0.4)",
                  }}
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </motion.button>
              </motion.div>

              {/* Discount badge */}
              {product.original_price && product.original_price > product.price && (
                <div
                  className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold text-white"
                  style={{ background: "#c0392b" }}
                >
                  {Math.round(
                    ((product.original_price - product.price) /
                      product.original_price) *
                      100
                  )}
                  % OFF
                </div>
              )}
            </div>

            {/* Product info */}
            <div className="p-4">
              {/* Category */}
              <p
                className="text-[10px] font-semibold uppercase tracking-widest mb-1.5"
                style={{ color: "#c0652b" }}
              >
                {product.category}
              </p>

              {/* Product name */}
              <h3
                className="font-playfair font-medium text-base leading-snug line-clamp-2 mb-2"
                style={{ color: "#2d1b0e" }}
              >
                {product.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="h-3 w-3"
                    style={{
                      fill: star <= Math.round(product.rating) ? "#f59e0b" : "#e5e7eb",
                      color: star <= Math.round(product.rating) ? "#f59e0b" : "#e5e7eb",
                    }}
                  />
                ))}
                <span className="text-[11px] text-muted-foreground ml-1">
                  ({product.reviews})
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2">
                <span
                  className="text-lg font-bold font-inter"
                  style={{ color: "#a0522d" }}
                >
                  ₹{product.price.toLocaleString()}
                </span>
                {product.original_price && product.original_price > product.price && (
                  <span className="text-sm text-muted-foreground line-through font-light">
                    ₹{product.original_price.toLocaleString()}
                  </span>
                )}
              </div>

              {/* Add to cart button — always-visible outline version */}
              <motion.button
                onClick={handleAddToCart}
                animate={{
                  borderColor: hovered
                    ? "rgba(192, 57, 43, 0.7)"
                    : "rgba(160, 82, 45, 0.25)",
                  color: hovered ? "#c0392b" : "#a0522d",
                }}
                transition={{ duration: 0.3 }}
                whileTap={{ scale: 0.97 }}
                className="mt-3 w-full py-2 rounded-xl text-sm font-medium tracking-wide border transition-colors"
                style={{
                  background: "transparent",
                }}
              >
                <span className="flex items-center justify-center gap-1.5">
                  <ShoppingCart className="h-3.5 w-3.5" />
                  Quick Order
                </span>
              </motion.button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
};

export const ProductStash = () => {
  const stashProducts = mockProducts.slice(0, 8);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
    },
  };

  return (
    <section className="py-20 md:py-28 border-t border-muted overflow-hidden" style={{ background: "#fdf8f3" }}>
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row items-end justify-between mb-14 gap-6"
        >
          <div>
            <span
              className="inline-block text-xs font-semibold tracking-[0.25em] uppercase mb-4 px-4 py-1.5 rounded-full"
              style={{
                color: "#a0522d",
                background: "rgba(160, 82, 45, 0.08)",
                border: "1px solid rgba(160, 82, 45, 0.15)",
              }}
            >
              Fresh Arrivals
            </span>
            <h2 className="text-4xl md:text-5xl font-playfair font-normal text-foreground leading-[1.15]">
              The Product{" "}
              <span className="italic font-light" style={{ color: "#a0522d" }}>
                Stash
              </span>
            </h2>
            <p className="mt-3 text-base text-muted-foreground max-w-sm leading-relaxed">
              Hand-selected favourites loved by our community of makers.
            </p>
          </div>

          <Link to="/products">
            <motion.span
              whileHover={{ x: 4 }}
              className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase"
              style={{ color: "#a0522d" }}
            >
              View All Products
              <span className="h-[1.5px] w-8 inline-block" style={{ background: "#a0522d" }} />
            </motion.span>
          </Link>
        </motion.div>

        {/* Product grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6"
        >
          {stashProducts.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductStashCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
