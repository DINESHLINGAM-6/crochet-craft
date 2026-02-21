import { motion } from "framer-motion";
import { Clock, Leaf, Heart } from "lucide-react";

const values = [
  {
    Icon: Clock,
    headline: "Slow Crafted",
    body: "Hours of dedicated handwork woven into every stitch — never rushed, always intentional.",
  },
  {
    Icon: Leaf,
    headline: "Sustainable",
    body: "Plant-based fibers and eco-conscious dyes leave only a gentle footprint on the earth.",
  },
  {
    Icon: Heart,
    headline: "Made with Love",
    body: "Every loop is placed by artisan hands who pour genuine care into the craft.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.16 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export const BrandPhilosophy = () => {
  return (
    <section
      className="relative overflow-hidden border-t border-muted"
      style={{ background: "hsl(35, 20%, 93%)" }}
    >
      {/* Faint grain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-32">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.85 }}
          className="text-center mb-20"
        >
          {/* Ornamental rule */}
          <div className="flex items-center justify-center gap-5 mb-7">
            <span
              className="h-[1px] w-16"
              style={{ background: "rgba(140,80,30,0.25)" }}
            />
            <span
              className="font-inter text-[10px] uppercase tracking-[0.38em] font-semibold"
              style={{ color: "#a0522d" }}
            >
              Our Promise
            </span>
            <span
              className="h-[1px] w-16"
              style={{ background: "rgba(140,80,30,0.25)" }}
            />
          </div>

          <h2
            className="font-playfair font-normal leading-[1.15] max-w-xl mx-auto"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", color: "#1e1108" }}
          >
            Every piece tells a story of{" "}
            <span className="italic font-light" style={{ color: "#7a4a1e" }}>
              patience and nature.
            </span>
          </h2>
        </motion.div>

        {/* Three columns */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16"
        >
          {values.map(({ Icon, headline, body }) => (
            <motion.div
              key={headline}
              variants={itemVariants}
              className="flex flex-col items-center text-center group"
            >
              {/* Icon circle */}
              <motion.div
                whileHover={{ scale: 1.08, rotate: 3 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="mb-8 w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-500 group-hover:bg-primary/8"
                style={{
                  border: "1px solid rgba(140,80,30,0.2)",
                  background: "rgba(255,255,255,0.55)",
                }}
              >
                <Icon
                  className="h-6 w-6 transition-colors duration-400"
                  style={{ color: "#a0522d" }}
                  strokeWidth={1.4}
                />
              </motion.div>

              {/* Headline */}
              <h3
                className="font-playfair font-medium text-lg tracking-wide mb-3"
                style={{ color: "#1e1108" }}
              >
                {headline}
              </h3>

              {/* Decorative rule */}
              <div
                className="w-8 h-[1px] mb-4 transition-all duration-500 group-hover:w-16"
                style={{ background: "rgba(140,80,30,0.35)" }}
              />

              {/* Body */}
              <p
                className="font-inter font-light text-sm leading-[1.85] max-w-xs"
                style={{ color: "rgba(92,64,30,0.72)" }}
              >
                {body}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom ornament */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex justify-center mt-20"
        >
          <div className="flex items-center gap-4">
            <span className="h-[1px] w-20" style={{ background: "rgba(140,80,30,0.18)" }} />
            <span className="font-playfair text-xs italic" style={{ color: "rgba(140,80,30,0.45)" }}>
              Est. 2024 · Handcrafted in India
            </span>
            <span className="h-[1px] w-20" style={{ background: "rgba(140,80,30,0.18)" }} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
