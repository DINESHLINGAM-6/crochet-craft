import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const WHY_ITEMS = [
  {
    icon: "🌿",
    title: "Sustainably made",
    desc: "We use natural, eco-certified yarns and biodegradable packaging. Every purchase is a step toward a slower, kinder planet.",
    color: "#D7F2E8",
  },
  {
    icon: "💛",
    title: "Slow crafted",
    desc: "No machines, no shortcuts. Each item is worked stitch by stitch, taking hours to complete — because quality can't be rushed.",
    color: "#FDF6D6",
  },
  {
    icon: "🎁",
    title: "Gifting with soul",
    desc: "Handmade gifts carry emotion that mass-produced ones never can. We wrap every order with care to make gifting extra special.",
    color: "#F8D9D9",
  },
  {
    icon: "♾️",
    title: "Made to last",
    desc: "Unlike fast fashion pieces, our crochet items are built to age beautifully — companions for years, not seasons.",
    color: "#E9E3F6",
  },
];

export const WhyHandmadeSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="why"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "#F4E7F3" }}
    >
      {/* Dynamic Background matching elegant theme */}
      <div className="absolute inset-0 dot-pattern opacity-40 mix-blend-overlay" />
      
      {/* Big decorative background text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{ overflow: "hidden", zIndex: 0 }}
      >
        <span
          className="font-nunito font-black uppercase tracking-widest"
          style={{
            fontSize: "clamp(100px, 22vw, 250px)",
            color: "rgba(229,127,132,0.06)",
            userSelect: "none",
            whiteSpace: "nowrap",
            transform: "translateY(-10%)"
          }}
        >
          HANDMADE
        </span>
      </div>

      <div ref={ref} className="relative z-10 max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label shadow-sm bg-white/50 backdrop-blur-md px-4 py-1.5 rounded-full inline-block mb-4">Why Handmade Matters</span>
          <h2
            className="font-nunito font-black mt-2 mb-5"
            style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)", color: "#2d1b0e", lineHeight: 1.1 }}
          >
            More than <span className="text-[#E57F84]">Yarn & Hooks</span>
          </h2>
          <p className="font-inter text-lg" style={{ color: "#6b7280", maxWidth: "600px", margin: "0 auto", lineHeight: 1.6 }}>
            When you choose handmade, you choose a story — of patience, skill,
            and genuine human care. Here's why that matters.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_ITEMS.map(({ icon, title, desc, color }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.65 }}
              whileHover={{ y: -8 }}
              className="card-hover"
            >
              <div
                className="p-7 rounded-[28px] h-full flex flex-col gap-4"
                style={{ background: "white", boxShadow: "0 4px 24px rgba(60,30,30,0.08)" }}
              >
                {/* Icon circle */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                  style={{ background: color }}
                >
                  {icon}
                </div>

                {/* Text */}
                <h3 className="font-nunito font-black text-lg" style={{ color: "#3C3C3C" }}>
                  {title}
                </h3>
                <p className="font-inter text-sm leading-relaxed flex-1" style={{ color: "#7A7A7A" }}>
                  {desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonial quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-14 text-center"
        >
          <div
            className="inline-block px-8 py-6 rounded-3xl"
            style={{ background: "#F8D9D9" }}
          >
            <p
              className="font-nunito font-bold text-xl italic"
              style={{ color: "#3C3C3C" }}
            >
              "When the hands create, the heart heals"
            </p>
            <p className="font-inter text-sm mt-2" style={{ color: "#7A7A7A" }}>
              — Our founding philosophy
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
