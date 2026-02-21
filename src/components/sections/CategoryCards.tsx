import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface CategoryCard {
  emoji: string;
  name: string;
  slug: string;
  count: number;
  gradient: string;
  borderColor: string;
  accentColor: string;
  bgColor: string;
}

const yarnCategories: CategoryCard[] = [
  {
    emoji: "🧵",
    name: "Acrylics 5 ply",
    slug: "acrylics-5ply",
    count: 32,
    gradient: "linear-gradient(135deg, #fff0f5 0%, #ffe4ef 100%)",
    borderColor: "rgba(240, 100, 140, 0.18)",
    accentColor: "#d63a6e",
    bgColor: "rgba(240, 100, 140, 0.08)",
  },
  {
    emoji: "🧶",
    name: "Acrylics 4 ply",
    slug: "acrylics-4ply",
    count: 48,
    gradient: "linear-gradient(135deg, #fff8ee 0%, #ffecd2 100%)",
    borderColor: "rgba(210, 120, 40, 0.18)",
    accentColor: "#c0652b",
    bgColor: "rgba(210, 120, 40, 0.08)",
  },
  {
    emoji: "🤍",
    name: "Velvet Blankie",
    slug: "velvet-blankie",
    count: 18,
    gradient: "linear-gradient(135deg, #f5f0ff 0%, #ede4ff 100%)",
    borderColor: "rgba(130, 80, 200, 0.18)",
    accentColor: "#7c3aed",
    bgColor: "rgba(130, 80, 200, 0.08)",
  },
  {
    emoji: "⭐",
    name: "Chunky Yarn",
    slug: "chunky-yarn",
    count: 27,
    gradient: "linear-gradient(135deg, #f0fff4 0%, #dcfce7 100%)",
    borderColor: "rgba(34, 150, 80, 0.18)",
    accentColor: "#166534",
    bgColor: "rgba(34, 150, 80, 0.08)",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

export const CategoryCards = () => {
  return (
    <section className="py-20 md:py-28 bg-background border-t border-muted overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span
            className="inline-block text-xs font-semibold tracking-[0.25em] uppercase mb-4 px-4 py-1.5 rounded-full"
            style={{
              color: "#a0522d",
              background: "rgba(160, 82, 45, 0.08)",
              border: "1px solid rgba(160, 82, 45, 0.15)",
            }}
          >
            Browse by Type
          </span>
          <h2 className="text-4xl md:text-5xl font-playfair font-normal text-foreground leading-[1.15]">
            The Yarn{" "}
            <span className="italic font-light" style={{ color: "#a0522d" }}>
              Collection
            </span>
          </h2>
          <p className="mt-4 text-base text-muted-foreground max-w-md mx-auto leading-relaxed">
            From delicate fine plies to ultra-chunky statement yarns — find your
            perfect match.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {yarnCategories.map((cat) => (
            <motion.div
              key={cat.slug}
              variants={cardVariants}
              whileHover={{
                scale: 1.02,
                y: -4,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="cursor-pointer group"
              style={{
                filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.06))",
              }}
            >
              <Link
                to={`/products?category=${encodeURIComponent(cat.name)}`}
                className="block"
              >
                <div
                  className="relative rounded-2xl overflow-hidden h-[220px] flex flex-col justify-between p-6 transition-shadow duration-300 group-hover:shadow-xl"
                  style={{
                    background: cat.gradient,
                    border: `1.5px solid ${cat.borderColor}`,
                    boxShadow:
                      "0 4px 20px rgba(0,0,0,0.06), 0 1px 6px rgba(0,0,0,0.04)",
                  }}
                >
                  {/* Top — Icon area */}
                  <div className="flex items-start justify-between">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl shadow-sm transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: "rgba(255,255,255,0.7)",
                        border: `1px solid ${cat.borderColor}`,
                        backdropFilter: "blur(4px)",
                      }}
                    >
                      {cat.emoji}
                    </div>

                    {/* Arrow — appears on hover */}
                    <div
                      className="mt-1 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0"
                      style={{ background: cat.bgColor }}
                    >
                      <ArrowRight className="h-4 w-4" style={{ color: cat.accentColor }} />
                    </div>
                  </div>

                  {/* Bottom — Name + count */}
                  <div>
                    <h3
                      className="text-xl font-playfair font-medium leading-tight"
                      style={{ color: cat.accentColor }}
                    >
                      {cat.name}
                    </h3>
                    <p
                      className="text-sm mt-1 font-inter font-light"
                      style={{ color: `${cat.accentColor}99` }}
                    >
                      ({cat.count}) products
                    </p>

                    {/* Animated underline on hover */}
                    <div
                      className="mt-3 h-[2px] w-0 group-hover:w-14 transition-all duration-500 ease-out rounded-full"
                      style={{ background: cat.accentColor }}
                    />
                  </div>

                  {/* Decorative corner blob */}
                  <div
                    className="absolute -top-8 -right-8 w-28 h-28 rounded-full opacity-30 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle, ${cat.accentColor}44, transparent 70%)`,
                    }}
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mt-12"
        >
          <Link to="/categories">
            <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase transition-all duration-300 group hover:gap-3"
              style={{ color: "#a0522d" }}
            >
              View All Categories
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
