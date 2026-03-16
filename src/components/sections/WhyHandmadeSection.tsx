import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Sprout, Clock, Heart, ShieldCheck, Quote } from "lucide-react";

const WHY_ITEMS = [
  {
    icon: Sprout,
    title: "Sustainably made",
    desc: "We use natural, eco-certified yarns and biodegradable packaging. Every purchase is a step toward a slower, kinder planet.",
    gradient: "from-[#D7F2E8] to-[#BEEAD4]",
    accent: "#87CDB4"
  },
  {
    icon: Clock,
    title: "Slow crafted",
    desc: "No machines, no shortcuts. Each item is worked stitch by stitch, taking hours to complete — because quality can't be rushed.",
    gradient: "from-[#FDF6D6] to-[#F9E8A8]",
    accent: "#EBD47B"
  },
  {
    icon: Heart,
    title: "Gifting with soul",
    desc: "Handmade gifts carry emotion that mass-produced ones never can. We wrap every order with care to make gifting extra special.",
    gradient: "from-[#F8D9D9] to-[#F1B9B9]",
    accent: "#E57F84"
  },
  {
    icon: ShieldCheck,
    title: "Made to last",
    desc: "Unlike fast fashion pieces, our crochet items are built to age beautifully — companions for years, not seasons.",
    gradient: "from-[#E9E3F6] to-[#D4C9ED]",
    accent: "#A08CCF"
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
          {WHY_ITEMS.map(({ icon: Icon, title, desc, gradient, accent }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.65 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div
                className="p-8 rounded-[32px] h-full flex flex-col gap-5 border border-white/50 transition-all duration-300 group-hover:shadow-[0_20px_40px_rgba(60,30,30,0.12)]"
                style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(12px)" }}
              >
                {/* Icon circle */}
                <div
                  className={`w-16 h-16 rounded-3xl flex items-center justify-center bg-gradient-to-br ${gradient} shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}
                  style={{ boxShadow: `0 10px 20px -5px ${accent}44` }}
                >
                  <Icon className="w-7 h-7" style={{ color: accent }} />
                </div>

                {/* Text */}
                <h3 className="font-nunito font-black text-xl" style={{ color: "#3C3C3C" }}>
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
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-20 text-center"
        >
          <div
            className="inline-block px-10 py-8 rounded-[2rem] relative"
            style={{ 
              background: "white", 
              boxShadow: "0 15px 45px rgba(229,127,132,0.15)",
              border: "1px solid rgba(229,127,132,0.1)"
            }}
          >
            <Quote className="absolute -top-4 -left-4 w-10 h-10 text-[#F8D9D9]" />
            <p
              className="font-nunito font-bold text-2xl italic relative z-10"
              style={{ color: "#3C3C3C" }}
            >
              "When the hands create, the heart heals"
            </p>
            <p className="font-inter text-sm mt-3 tracking-widest uppercase font-semibold" style={{ color: "#E57F84" }}>
              — Our founding philosophy
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
