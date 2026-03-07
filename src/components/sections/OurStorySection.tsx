import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import storyImg from "@/assets/story-artisan.png";

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
  const isInView = useInView(ref, { once: true, margin: "-80px" });

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
            <div
              className="relative overflow-hidden card-rounded"
              style={{ aspectRatio: "3/4", maxHeight: "560px" }}
            >
              <img
                src={storyImg}
                alt="Artisan hands crocheting"
                className="w-full h-full object-cover"
              />

              {/* Sticker badge */}
              <div
                className="absolute top-6 right-6 w-20 h-20 rounded-full flex flex-col items-center justify-center text-center"
                style={{ background: "#E57F84" }}
              >
                <span className="font-nunito font-black text-white text-xs leading-none">Since</span>
                <span className="font-nunito font-black text-white text-xl leading-none">2021</span>
              </div>
            </div>

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
              className="font-nunito font-black"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#3C3C3C", lineHeight: 1.15 }}
            >
              Born from a quiet{" "}
              <span style={{ color: "#E57F84" }}>corner & a crochet hook</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="font-inter text-base leading-relaxed"
              style={{ color: "#7A7A7A" }}
            >
              It started in a tiny sunlit corner of our home — just me, a crochet hook,
              and an overflowing basket of yarn. What began as a quiet hobby during
              the pandemic quickly blossomed into something I never expected.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="font-inter text-base leading-relaxed"
              style={{ color: "#7A7A7A" }}
            >
              When I gifted my first crochet cardigan to my sister, her tearful reaction
              told me everything. There's something irreplaceable about holding something
              made stitch by stitch, with intention and warmth. That's what we create here —
              not just products, but little pieces of heart.
            </motion.p>

            {/* Values row */}
            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4 pt-2">
              {[
                { icon: "🌿", title: "Sustainable", desc: "Eco-friendly yarns & packaging" },
                { icon: "💛", title: "Slow-made", desc: "No mass production, ever" },
                { icon: "🎨", title: "Custom Orders", desc: "Made just for you" },
                { icon: "📦", title: "Gift-ready", desc: "Beautiful packaging included" },
              ].map(({ icon, title, desc }) => (
                <div
                  key={title}
                  className="flex items-start gap-3 p-3 rounded-2xl"
                  style={{ background: "white" }}
                >
                  <span className="text-xl flex-shrink-0 mt-0.5">{icon}</span>
                  <div>
                    <p className="font-nunito font-bold text-sm" style={{ color: "#3C3C3C" }}>{title}</p>
                    <p className="font-inter text-xs" style={{ color: "#7A7A7A" }}>{desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
