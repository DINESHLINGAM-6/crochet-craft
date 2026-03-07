import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/assets/Logo.png";

interface SplashScreenProps {
  onComplete: () => void;
}

// Floating petal decoration
const Petal = ({ delay, x, size, rotate }: { delay: number; x: number; size: number; rotate: number }) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ left: `${x}%`, top: "-30px", fontSize: size }}
    initial={{ y: -60, opacity: 0, rotate: 0 }}
    animate={{ y: "120vh", opacity: [0, 0.8, 0.6, 0], rotate: rotate }}
    transition={{ duration: 4.5, delay, ease: "easeIn" }}
  >
    🌸
  </motion.div>
);

export const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"in" | "hold" | "out">("in");

  useEffect(() => {
    // After logo animates in → hold → fade page out
    const holdTimer = setTimeout(() => setPhase("hold"), 800);
    const outTimer = setTimeout(() => setPhase("out"), 2600);
    const doneTimer = setTimeout(() => onComplete(), 3400);
    return () => {
      clearTimeout(holdTimer);
      clearTimeout(outTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  const petals = [
    { delay: 0.2, x: 10, size: 20, rotate: 120 },
    { delay: 0.6, x: 25, size: 14, rotate: -90 },
    { delay: 0.1, x: 45, size: 18, rotate: 200 },
    { delay: 0.8, x: 60, size: 22, rotate: -150 },
    { delay: 0.3, x: 75, size: 16, rotate: 80 },
    { delay: 0.9, x: 88, size: 20, rotate: -60 },
    { delay: 0.5, x: 35, size: 12, rotate: 140 },
    { delay: 0.7, x: 55, size: 18, rotate: -200 },
  ];

  return (
    <AnimatePresence>
      {phase !== "out" ? (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{ background: "#F6F2EA" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Animated pastel blobs */}
          <motion.div
            className="absolute rounded-full"
            style={{ width: 500, height: 500, background: "radial-gradient(circle, #F4E7F3 0%, transparent 70%)", top: "-100px", right: "-100px" }}
            animate={{ scale: [0.8, 1.1, 0.95], opacity: [0, 0.6, 0.5] }}
            transition={{ duration: 2.5, ease: "easeOut" }}
          />
          <motion.div
            className="absolute rounded-full"
            style={{ width: 400, height: 400, background: "radial-gradient(circle, #D7F2E8 0%, transparent 70%)", bottom: "-80px", left: "-80px" }}
            animate={{ scale: [0.7, 1.05, 0.9], opacity: [0, 0.5, 0.4] }}
            transition={{ duration: 2.8, delay: 0.2, ease: "easeOut" }}
          />
          <motion.div
            className="absolute rounded-full"
            style={{ width: 300, height: 300, background: "radial-gradient(circle, #FDE8D8 0%, transparent 70%)", top: "30%", left: "-50px" }}
            animate={{ scale: [0.6, 0.95], opacity: [0, 0.4] }}
            transition={{ duration: 2, delay: 0.4, ease: "easeOut" }}
          />

          {/* Falling petals */}
          {phase === "hold" && petals.map((p, i) => <Petal key={i} {...p} />)}

          {/* Grain overlay */}
          <div className="grain-overlay" style={{ opacity: 0.03 }} />

          {/* Center content */}
          <div className="relative z-10 flex flex-col items-center gap-0">

            {/* Logo ring — expands on appear */}
            <motion.div
              className="relative flex items-center justify-center"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
            >
              {/* Outer ring pulse */}
              <motion.div
                className="absolute rounded-full"
                style={{ width: 120, height: 120, border: "1.5px solid rgba(229,127,132,0.3)" }}
                animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Middle ring */}
              <motion.div
                className="absolute rounded-full"
                style={{ width: 96, height: 96, border: "1.5px solid rgba(229,127,132,0.2)" }}
                animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
              />
              {/* Logo circle */}
              <motion.div
                className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-xl"
                style={{ border: "2px solid rgba(229,127,132,0.25)" }}
                animate={{ boxShadow: ["0 8px 30px rgba(229,127,132,0.15)", "0 16px 50px rgba(229,127,132,0.30)", "0 8px 30px rgba(229,127,132,0.15)"] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <motion.img
                  src={Logo}
                  alt="The Flower Hook"
                  className="w-12 h-12 object-contain"
                  initial={{ opacity: 0, rotate: -15, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                />
              </motion.div>
            </motion.div>

            {/* Brand name — elegant Cormorant italic */}
            <motion.div
              className="text-center mt-8"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1
                style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontSize: "clamp(2.4rem, 6vw, 3.5rem)",
                  fontWeight: 500,
                  fontStyle: "italic",
                  color: "#3C3C3C",
                  letterSpacing: "0.02em",
                  lineHeight: 1,
                }}
              >
                The Flower Hook
              </h1>
              <motion.p
                className="font-inter text-sm mt-2.5 tracking-widest uppercase"
                style={{ color: "#E57F84", letterSpacing: "0.22em" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                Handcrafted with Love
              </motion.p>
            </motion.div>

            {/* Animated divider line */}
            <motion.div
              className="mt-7"
              style={{ height: "1px", background: "linear-gradient(90deg, transparent, #E57F84, transparent)" }}
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 160, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
            />

            {/* Dot loader */}
            <motion.div
              className="flex gap-2 mt-7"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.4 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="block w-1.5 h-1.5 rounded-full"
                  style={{ background: "#E57F84" }}
                  animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.18, ease: "easeInOut" }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
