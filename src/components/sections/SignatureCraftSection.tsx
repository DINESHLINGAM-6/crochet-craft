import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchProducts, Product } from "@/services/productsService";
import { handleDriveImageError } from "@/lib/utils";
import { CheckCircle2, ShoppingBag, MessageSquare, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export const SignatureCraftSection = () => {
  const [featured, setFeatured] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts().then((allProducts) => {
      console.log("DEBUG: Signature section products", allProducts.length);
      const found = allProducts.find((p) => String(p.id) === "17") 
                 || allProducts.find(p => p.is_featured) 
                 || allProducts[0];
      setFeatured(found || null);
      setLoading(false);
    }).catch(err => {
      console.error("Signature fetch failed", err);
      setLoading(false);
    });
  }, []);

  if (loading) return (
    <div className="py-24 text-center">
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="font-nunito font-bold text-[#E57F84]"
      >
        Discovering something special...
      </motion.div>
    </div>
  );
  if (!featured) return null;

  return (
    <section id="signature" className="relative py-24 md:py-32 overflow-hidden scroll-mt" style={{ background: "#F4E7F3" }}>
      {/* Dynamic Background Blobs */}
      <div className="absolute inset-0 dot-pattern opacity-30 mix-blend-overlay" />
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full filter blur-[120px] opacity-60 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(233,227,246,1) 0%, rgba(244,231,243,0) 70%)", transform: "translate(20%, -20%)" }}
      />
      
      <div className="relative z-10 max-w-[1240px] mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-label bg-white/50 backdrop-blur-md px-4 py-1.5 rounded-full inline-block mb-4">Featured Highlight</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-nunito font-black" style={{ color: "#3C3C3C", lineHeight: 1.1 }}>
            Our Most-Loved <span className="italic font-light text-[#E57F84]">Creation</span>
          </h2>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-0 overflow-hidden rounded-[3rem] shadow-[0_40px_100px_rgba(60,30,30,0.15)]" 
          style={{ background: "white" }}
        >
          {/* Image side */}
          <div className="relative group overflow-hidden h-[450px] lg:h-auto">
            <motion.img 
              src={featured.image_url} 
              alt={featured.name} 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 1.2 }}
              className="w-full h-full object-cover"
              onError={(e) => handleDriveImageError(e, featured.name)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-8 left-8 px-6 py-3 rounded-2xl backdrop-blur-xl bg-white/90 shadow-2xl border border-white/50">
              <span className="text-[10px] uppercase tracking-[0.2em] font-black text-[#7A7A7A] block mb-1">Price</span>
              <span className="text-3xl font-black text-[#E57F84]">₹{featured.price}</span>
            </div>
          </div>

          {/* Content side */}
          <div className="flex flex-col justify-center p-10 md:p-16 lg:p-20 relative bg-gradient-to-br from-white to-[#FDF6F0]">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-4xl md:text-5xl font-nunito font-black mb-8" style={{ color: "#3C3C3C" }}>{featured.name}</h3>
              <p className="text-lg text-[#7A7A7A] leading-relaxed mb-10 font-inter">
                {featured.description || "Individually handcrafted with the finest cotton yarn. Each piece tells a story of patience, art, and love."}
              </p>
              
              <ul className="space-y-4 mb-12">
                {["100% Premium Cotton Yarn", "Intricate Hand-stitched Details", "Eco-friendly Materials", "Perfect for Gifting"].map((item, idx) => (
                  <motion.li 
                    key={item} 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 text-sm font-bold text-[#5A5A5A]"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#D7F2E8] flex items-center justify-center text-[#2D8A6A] shadow-sm flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    {item}
                  </motion.li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-5">
                <Link to={`/product/${featured.id}`} className="flex-1">
                  <motion.button 
                    whileHover={{ scale: 1.03, boxShadow: "0 15px 35px rgba(229,127,132,0.3)" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-8 py-5 bg-[#E57F84] text-white rounded-2xl font-black shadow-xl shadow-[#e57f84]/20 flex items-center justify-center gap-3 transition-all"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    Shop Now
                  </motion.button>
                </Link>
                <motion.button 
                  whileHover={{ scale: 1.03, backgroundColor: "#E9F5EB" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const msg = `Hi! I'm interested in your Signature Craft: *${featured.name}* (₹${featured.price}). Can you help me order it?\nDirect Image: ${featured.image_url}`;
                    window.open(`https://wa.me/919840548758?text=${encodeURIComponent(msg)}`, "_blank");
                  }}
                  className="flex-1 px-8 py-5 border-2 border-[#25D366] text-[#25D366] rounded-2xl font-black flex items-center justify-center gap-3 bg-transparent transition-all"
                >
                  <MessageSquare className="w-5 h-5" />
                  WhatsApp Order
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
