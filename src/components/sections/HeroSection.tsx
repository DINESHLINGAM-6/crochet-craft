import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowDown } from "lucide-react";
import Logo from "@/assets/Logo.png";

/* ─── Framer-Motion variants ─────────────────────────────────── */
const fadeIn = {
  hidden: { opacity: 0 },
  show: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 1.4, delay, ease: "easeOut" },
  }),
};

const slideUp = {
  hidden: { opacity: 0, y: 40 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

/* ─── Inline SVG: line-art flower + hook ─────────────────────── */
const FlowerHookSVG = () => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-20 h-20 text-primary/60"
    aria-hidden="true"
  >
    {/* Flower petals */}
    <ellipse cx="60" cy="38" rx="6" ry="14" transform="rotate(0 60 38)" />
    <ellipse cx="60" cy="38" rx="6" ry="14" transform="rotate(60 60 52)" />
    <ellipse cx="60" cy="38" rx="6" ry="14" transform="rotate(120 60 52)" />
    <ellipse cx="60" cy="38" rx="6" ry="14" transform="rotate(180 60 52)" />
    <ellipse cx="60" cy="38" rx="6" ry="14" transform="rotate(240 60 52)" />
    <ellipse cx="60" cy="38" rx="6" ry="14" transform="rotate(300 60 52)" />
    {/* Flower centre */}
    <circle cx="60" cy="52" r="7" />
    {/* Stem */}
    <path d="M60 59 C60 72 55 76 50 80" />
    {/* Hook curve */}
    <path d="M50 80 C44 85 44 94 52 96 C60 98 64 92 60 88" />
    <circle cx="60" cy="88" r="1.5" fill="currentColor" />
  </svg>
);

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden"
      style={{
        /* warm paper-like textured background */
        background: "hsl(35, 28%, 95%)",
      }}
    >
      {/* ── Paper grain texture overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.045]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      {/* ── Warm radial glow – centre ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 50% 48%, rgba(210,170,130,0.18) 0%, transparent 70%)",
        }}
      />

      {/* ── Decorative rule lines ── */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(140,100,60,0.25) 30%, rgba(140,100,60,0.25) 70%, transparent 100%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{ background: "rgba(140,100,60,0.1)" }}
      />

      {/* ── Main centred content ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl mx-auto gap-10">

        {/* Logo mark – fade in first */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="show"
          custom={0.1}
          className="flex flex-col items-center gap-5"
        >
          {/* SVG line art */}
          <FlowerHookSVG />

          {/* Logo image */}
          <div
            className="w-20 h-20 rounded-full bg-white/70 flex items-center justify-center shadow-md"
            style={{ border: "1px solid rgba(140,100,60,0.18)", backdropFilter: "blur(4px)" }}
          >
            <img src={Logo} alt="The Flower Hook" className="w-12 h-12 object-contain" />
          </div>

          {/* Brand name */}
          <h1
            className="font-playfair font-normal tracking-[0.08em] leading-none"
            style={{ fontSize: "clamp(2.4rem, 6vw, 4rem)", color: "#2d1b0e" }}
          >
            The Flower Hook
          </h1>

          {/* Ornamental divider */}
          <div className="flex items-center gap-4 w-full justify-center">
            <span className="h-[1px] w-24 bg-gradient-to-r from-transparent to-primary/30" />
            <span className="text-primary/50 text-xs">✦</span>
            <span className="h-[1px] w-24 bg-gradient-to-l from-transparent to-primary/30" />
          </div>
        </motion.div>

        {/* Tagline – slides up after logo appears */}
        <motion.div
          variants={slideUp}
          initial="hidden"
          animate="show"
          custom={0.7}
          className="space-y-3"
        >
          <p
            className="font-playfair font-light italic tracking-wide"
            style={{
              fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
              color: "#5c3d1e",
              letterSpacing: "0.04em",
            }}
          >
            The Art of Slow Living.
          </p>
        </motion.div>

        {/* Sub-text – fades in last */}
        <motion.p
          variants={fadeIn}
          initial="hidden"
          animate="show"
          custom={1.2}
          className="font-inter font-light tracking-[0.22em] uppercase text-xs"
          style={{ color: "rgba(92,61,30,0.5)" }}
        >
          Founded in a small, sun-drenched studio
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={slideUp}
          initial="hidden"
          animate="show"
          custom={1.5}
          className="flex flex-wrap items-center justify-center gap-5 mt-2"
        >
          <Link to="/products">
            <motion.button
              whileHover={{ y: -2, boxShadow: "0 12px 36px rgba(92,61,30,0.22)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="px-9 py-3 text-xs font-inter font-semibold uppercase tracking-[0.25em] text-white"
              style={{
                background: "linear-gradient(135deg, #5c3d1e 0%, #a0522d 100%)",
                borderRadius: "2px",
              }}
            >
              View Signature Collection
            </motion.button>
          </Link>

          <Link to="/about">
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="px-9 py-3 text-xs font-inter font-semibold uppercase tracking-[0.25em]"
              style={{
                color: "#5c3d1e",
                border: "1px solid rgba(92,61,30,0.3)",
                borderRadius: "2px",
                background: "transparent",
              }}
            >
              Our Story
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* ── Scroll-down indicator ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4" style={{ color: "rgba(92,61,30,0.35)" }} />
        </motion.div>
        <span
          className="text-[9px] uppercase tracking-[0.35em] font-inter"
          style={{ color: "rgba(92,61,30,0.35)" }}
        >
          Scroll
        </span>
      </motion.div>
    </section>
  );
};
