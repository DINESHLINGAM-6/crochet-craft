import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import storyImg from "@/assets/flower-2.jpg";

export const StorySection = () => {
  return (
    <section
      className="py-0 overflow-hidden border-t border-muted"
      style={{ background: "hsl(35, 25%, 96%)" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[80vh]">

        {/* ── LEFT: Image with "CHAPTER 1" overlay ── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="relative overflow-hidden group"
          style={{ minHeight: "520px" }}
        >
          {/* The main image */}
          <img
            src={storyImg}
            alt="Artisan hands crafting crochet in sunlight"
            className="absolute inset-0 w-full h-full object-cover brightness-[0.72] transition-all duration-[2s] group-hover:brightness-[0.8] group-hover:scale-[1.03]"
          />

          {/* Warm tint overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom right, rgba(80,40,10,0.35) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)",
            }}
          />

          {/* "CHAPTER 1" badge – top-left */}
          <div className="absolute top-8 left-8 z-10">
            <span
              className="font-inter font-light tracking-[0.38em] uppercase text-white/50 text-[10px] block"
            >
              Chapter 1
            </span>
            <span
              className="mt-1 block h-[1px] w-14"
              style={{ background: "rgba(255,255,255,0.22)" }}
            />
          </div>

          {/* Bottom-left editorial stamp */}
          <div
            className="absolute bottom-8 left-8 z-10 hidden md:block"
            aria-hidden="true"
          >
            <span
              className="font-playfair text-[6rem] leading-none font-bold"
              style={{ color: "rgba(255,255,255,0.06)" }}
            >
              2024
            </span>
          </div>
        </motion.div>

        {/* ── RIGHT: Text content ── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, ease: "easeOut", delay: 0.15 }}
          className="flex flex-col justify-center px-10 md:px-16 lg:px-24 py-20 gap-10"
        >
          {/* Eyebrow */}
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-[10px] font-inter font-semibold uppercase tracking-[0.35em]"
            style={{ color: "#a0522d" }}
          >
            Our Story
          </motion.span>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="font-playfair font-normal leading-[1.1] tracking-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", color: "#1e1108" }}
          >
            The Art of{" "}
            <span
              className="italic font-light"
              style={{ color: "#7a4a1e" }}
            >
              Slow Living.
            </span>
          </motion.h2>

          {/* Decorative left-border paragraph */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.55 }}
            className="pl-6 space-y-5"
            style={{ borderLeft: "1.5px solid rgba(140,80,30,0.22)" }}
          >
            <p
              className="font-inter font-light leading-[1.9] text-base"
              style={{ color: "#5c4030" }}
            >
              In a world chasing speed, we choose the rhythm of nature.
              Founded in a small, sun-drenched studio,{" "}
              <strong className="font-medium" style={{ color: "#3d2010" }}>
                The Flower Hook
              </strong>{" "}
              was born from a desire to preserve the fleeting beauty of blooms
              forever.
            </p>
            <p
              className="font-inter font-light leading-[1.9] text-base"
              style={{ color: "#5c4030" }}
            >
              Each piece is a rebellion against the temporary—meticulously looped
              by hand, stitch by stitch, with patience as our primary material.
            </p>
          </motion.div>

          {/* CTA — "READ OUR FULL STORY" with animated arrow */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.75 }}
          >
            <Link to="/about" className="group inline-flex items-center gap-4">
              <span
                className="font-inter text-xs font-semibold uppercase tracking-[0.28em] transition-colors duration-300"
                style={{ color: "#5c3d1e" }}
              >
                Read Our Full Story
              </span>
              <motion.span
                className="flex items-center"
                animate={{ x: 0 }}
                whileHover={{ x: 6 }}
              >
                <motion.div
                  className="group-hover:translate-x-1.5 transition-transform duration-400"
                >
                  <MoveRight
                    className="h-4 w-4 transition-transform duration-400 group-hover:translate-x-2"
                    style={{ color: "#a0522d" }}
                  />
                </motion.div>
              </motion.span>
              {/* Underline that grows on hover */}
              <span
                className="absolute -bottom-1 left-0 h-[1px] w-0 group-hover:w-full transition-all duration-500 ease-out"
                style={{ background: "#a0522d" }}
              />
            </Link>
          </motion.div>

          {/* Small facts strip */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.95 }}
            className="grid grid-cols-3 gap-6 pt-6"
            style={{ borderTop: "1px solid rgba(140,80,30,0.12)" }}
          >
            {[
              { value: "100%", label: "Hand-looped" },
              { value: "2024", label: "Est. India" },
              { value: "∞", label: "Lasts Forever" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p
                  className="font-playfair text-2xl font-normal"
                  style={{ color: "#a0522d" }}
                >
                  {value}
                </p>
                <p
                  className="font-inter text-[10px] uppercase tracking-widest mt-1"
                  style={{ color: "rgba(92,64,30,0.55)" }}
                >
                  {label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
