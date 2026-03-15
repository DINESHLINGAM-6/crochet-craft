import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import storyImg from "@/assets/Multiple items.jpeg";

import type { Variants } from "framer-motion";

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE_OUT } },
};

const staggerChildren: Variants = {
  visible: { transition: { staggerChildren: 0.15 } },
};

export const OurStorySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const rotateDeg = useTransform(scrollYProgress, [0, 1], [-2, 2]);

  return (
    <section
      id="story"
      className="relative py-24 overflow-hidden"
      style={{ background: "#F6F2EA" }}
    >
      {/* Decorative blobs */}
      <div
        className="wash-blob"
        style={{ width: 350, height: 350, background: "#E9E3F6", top: "-60px", left: "-100px", opacity: 0.5 }}
      />
      <div
        className="wash-blob"
        style={{ width: 280, height: 280, background: "#F8D9D9", bottom: "0", right: "-80px", opacity: 0.4 }}
      />

      <div ref={ref} className="relative z-10 max-w-[1140px] mx-auto px-6">
        <motion.div
          variants={staggerChildren}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center"
        >
          {/* Left: Image */}
          <motion.div
            variants={fadeUp}
            className="relative order-last md:order-first"
          >
            <motion.div
              className="relative overflow-hidden card-rounded shadow-2xl"
              style={{ aspectRatio: "3/4", maxHeight: "560px" }}
            >
              <motion.img
                src={storyImg}
                alt="Artisan hands crocheting"
                style={{ y: imageY, scale: 1.2 }}
                className="w-full h-full object-cover"
              />

              {/* Glass subtle tint */}
              <div className="absolute inset-0 bg-black/5" />

              {/* Sticker badge */}
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-6 right-6 w-20 h-20 rounded-full flex flex-col items-center justify-center text-center shadow-lg"
                style={{ background: "#E57F84", zIndex: 2 }}
              >
                <span className="font-nunito font-black text-white text-xs leading-none">Since</span>
                <span className="font-nunito font-black text-white text-xl leading-none">2020</span>
              </motion.div>
            </motion.div>

            {/* Floating love note card */}
            <motion.div
              initial={{ opacity: 0, x: -30, rotate: -4 }}
              animate={isInView ? { opacity: 1, x: 0, rotate: -4 } : { opacity: 0, x: -30, rotate: -4 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="absolute -bottom-6 -left-4 md:-left-8 p-4 rounded-2xl"
              style={{
                background: "white",
                boxShadow: "0 8px 32px rgba(60,30,30,0.12)",
                maxWidth: "200px",
              }}
            >
              <p className="font-nunito font-bold text-sm" style={{ color: "#3C3C3C" }}>
                🌸 "Handmade with love"
              </p>
              <p className="font-inter text-xs mt-1" style={{ color: "#7A7A7A" }}>
                Every piece carries a piece of our hearts
              </p>
            </motion.div>
          </motion.div>

          {/* Right: Story text */}
          <motion.div variants={staggerChildren} className="flex flex-col gap-6">
            <motion.div variants={fadeUp}>
              <span className="section-label">Our Story</span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="font-playfair leading-tight"
              style={{ 
                fontSize: "clamp(2.2rem, 5vw, 3.5rem)", 
                color: "#3C3C3C", 
                lineHeight: 1.1,
                fontWeight: 500
              }}
            >
              Born from a quiet{" "}
              <span className="italic font-light" style={{ color: "#E57F84" }}>corner & a crochet hook</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="font-inter text-base leading-relaxed"
              style={{ color: "#7A7A7A" }}
            >
              The whole story began with the love and passion for crochet, which slowly turned into a small, self-made business. Like many parents, my day ends only after the last “one more glass of water” is poured, the favorite toy is found, and the house finally settles into a rare, peaceful silence.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="font-inter text-base leading-relaxed"
              style={{ color: "#7A7A7A" }}
            >
              That quiet moment is when I reach for my yarn. The gentle rhythm of crocheting helps me slow down and turn the busyness of the day into something soft, beautiful, and meaningful. Every item is carefully handcrafted with care and purpose—that’s why it is “Handmade with Love.” 💛
            </motion.p>

            {/* Values row */}
            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4 pt-2">
              {[
                { icon: "🌿", title: "Sustainable", desc: "Eco-friendly yarns & packaging" },
                { icon: "💛", title: "Slow-made", desc: "No mass production, ever" },
                { icon: "🎨", title: "Custom Orders", desc: "Made just for you" },
                { icon: "📦", title: "Gift-ready", desc: "Beautiful packaging included" },
              ].map(({ icon, title, desc }) => (
                <motion.div
                  key={title}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="flex items-start gap-3 p-4 rounded-2xl transition-all duration-300"
                  style={{ 
                    background: "rgba(255,255,255,0.7)", 
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.5)",
                    boxShadow: "0 4px 20px rgba(60,30,30,0.04)"
                  }}
                >
                  <span className="text-xl flex-shrink-0 mt-0.5">{icon}</span>
                  <div>
                    <p className="font-nunito font-bold text-sm" style={{ color: "#3C3C3C" }}>{title}</p>
                    <p className="font-inter text-xs leading-relaxed" style={{ color: "#7A7A7A" }}>{desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
