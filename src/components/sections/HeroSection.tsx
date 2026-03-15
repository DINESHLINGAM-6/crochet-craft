import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero-crochet.png";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const YarnBall = ({ color, size, style }: { color: string; size: number; style: React.CSSProperties }) => (
  <motion.div
    animate={{ y: [0, -10, 0] }}
    transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }}
    style={{
      position: "absolute",
      width: size,
      height: size,
      borderRadius: "50%",
      background: color,
      opacity: 0.35,
      filter: "blur(1px)",
      ...style,
    }}
  />
);

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-svh w-full overflow-hidden flex flex-col"
      style={{ background: "#F6F2EA" }}
    >
      {/* Grain texture overlay */}
      <div className="grain-overlay" />

      {/* Decorative blobs */}
      <div
        className="wash-blob"
        style={{ width: 420, height: 420, background: "#F4E7F3", top: "-60px", right: "-60px", opacity: 0.7 }}
      />
      <div
        className="wash-blob"
        style={{ width: 320, height: 320, background: "#D7F2E8", bottom: "20%", left: "-80px", opacity: 0.5 }}
      />
      <div
        className="wash-blob"
        style={{ width: 240, height: 240, background: "#FDF6D6", bottom: "10%", right: "15%", opacity: 0.6 }}
      />

      {/* Floating yarn balls */}
      <YarnBall color="#E57F84" size={60} style={{ top: "18vh", left: "5vw" }} />
      <YarnBall color="#E9E3F6" size={80} style={{ top: "15vh", right: "5vw" }} />
      <YarnBall color="#D7F2E8" size={50} style={{ bottom: "22vh", left: "8vw" }} />
      <YarnBall color="#FDF6D6" size={70} style={{ bottom: "18vh", right: "8vw" }} />

      {/* Main content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center flex-1 gap-10 md:gap-16 px-6 pt-24 pb-16 max-w-[1140px] mx-auto w-full">
        {/* Left: Text content */}
        <div className="flex flex-col gap-6 md:w-[52%] text-center md:text-left">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="section-label">
              <Sparkles className="w-3 h-3" />
              Handmade with love.
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: EASE_OUT }}
            className="font-nunito font-black leading-tight"
            style={{
              fontSize: "clamp(2.4rem, 6vw, 4.2rem)",
              color: "#3C3C3C",
              lineHeight: 1.1,
            }}
          >
            Every stitch tells{" "}
            <span
              className="relative inline-block"
              style={{ color: "#E57F84" }}
            >
              a story
              <svg
                viewBox="0 0 150 12"
                fill="none"
                className="absolute -bottom-1 left-0 w-full"
                preserveAspectRatio="none"
              >
                <path
                  d="M3 9C30 3 70 1 147 6"
                  stroke="#E57F84"
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity="0.5"
                />
              </svg>
            </span>
          </motion.h1>



          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="flex items-center gap-8 justify-center md:justify-start"
          >
            {[
              { value: "500+", label: "Happy customers" },
              { value: "100%", label: "Handmade" },
              { value: "4-5 days", label: "Dispatch" },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center md:items-start">
                <span className="font-nunito font-black text-2xl" style={{ color: "#E57F84" }}>{value}</span>
                <span className="font-inter text-xs" style={{ color: "#7A7A7A" }}>{label}</span>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease: EASE_OUT }}
            className="flex flex-wrap gap-4 justify-center md:justify-start"
          >
            <Link to="/products">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 12px 30px rgba(229,127,132,0.4)" }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary text-base px-8 py-3.5 font-nunito font-bold"
              >
                Shop the Collection ✨
              </motion.button>
            </Link>
            <Link to="/about">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn-secondary text-base px-8 py-3.5 font-nunito font-bold"
              >
                Our Story
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Right: Hero image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.4, ease: EASE_OUT }}
          className="md:w-[44%] w-full"
        >
          <div
            className="relative overflow-hidden card-rounded shadow-soft"
            style={{
              aspectRatio: "4/5",
              maxHeight: "min(70vh, 540px)",
            }}
          >
            <img
              src={heroImg}
              alt="Handcrafted crochet items"
              className="w-full h-full object-cover"
            />

            {/* Overlay card: floating badge */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="absolute bottom-6 left-4 right-4"
            >
              <div
                className="rounded-2xl p-4 flex items-center gap-3"
                style={{
                  background: "rgba(255,255,255,0.88)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(229,224,216,0.8)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "#F8D9D9" }}
                >
                  <span className="text-lg">🧶</span>
                </div>
                <div>
                  <p className="font-nunito font-bold text-sm" style={{ color: "#3C3C3C" }}>
                    New arrivals weekly!
                  </p>
                  <p className="font-inter text-xs" style={{ color: "#7A7A7A" }}>
                    Fresh crochet drops every Monday
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4" style={{ color: "rgba(229,127,132,0.7)" }} />
        </motion.div>
        <span className="font-inter text-[9px] uppercase tracking-[0.3em]" style={{ color: "rgba(122,122,122,0.5)" }}>
          Scroll
        </span>
      </motion.div>
    </section>
  );
};
