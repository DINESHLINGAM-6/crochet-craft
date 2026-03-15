import { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, useInView, useScroll, useTransform, Variants } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { OurStorySection } from "@/components/sections/OurStorySection";
import { SignatureCraftSection } from "@/components/sections/SignatureCraftSection";
import { CollectionSection } from "@/components/sections/CollectionSection";
import { WhyHandmadeSection } from "@/components/sections/WhyHandmadeSection";
import { LearnToCrochetSection } from "@/components/sections/LearnToCrochetSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ContactSection } from "@/components/sections/ContactSection";

// ─── Scroll transition variants ──────────────────────────────────────────────
type TransitionStyle =
  | "fade-up"
  | "fade-left"
  | "fade-right"
  | "zoom-in"
  | "clip-reveal"
  | "blur-up"
  | "rotate-in";

const VARIANTS: Record<TransitionStyle, Variants> = {
  "fade-up": {
    hidden: { opacity: 0, y: 70 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-left": {
    hidden: { opacity: 0, x: -80 },
    visible: { opacity: 1, x: 0 },
  },
  "fade-right": {
    hidden: { opacity: 0, x: 80 },
    visible: { opacity: 1, x: 0 },
  },
  "zoom-in": {
    hidden: { opacity: 0, scale: 0.88 },
    visible: { opacity: 1, scale: 1 },
  },
  "clip-reveal": {
    hidden: { opacity: 0, clipPath: "inset(8% 4% 8% 4% round 20px)", scale: 0.97 },
    visible: { opacity: 1, clipPath: "inset(0% 0% 0% 0% round 0px)", scale: 1 },
  },
  "blur-up": {
    hidden: { opacity: 0, y: 50, filter: "blur(12px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  "rotate-in": {
    hidden: { opacity: 0, y: 60, rotate: -2, scale: 0.96 },
    visible: { opacity: 1, y: 0, rotate: 0, scale: 1 },
  },
};

// Easing curves for different moods
const EASES: Record<TransitionStyle, [number, number, number, number]> = {
  "fade-up":     [0.22, 1, 0.36, 1],
  "fade-left":   [0.22, 1, 0.36, 1],
  "fade-right":  [0.22, 1, 0.36, 1],
  "zoom-in":     [0.34, 1.2, 0.64, 1],
  "clip-reveal": [0.16, 1, 0.3, 1],
  "blur-up":     [0.22, 1, 0.36, 1],
  "rotate-in":   [0.34, 1.3, 0.64, 1],
};

// Subtle horizontal rule divider between sections
const SectionDivider = ({ color = "#E57F84", opacity = 0.15 }: { color?: string; opacity?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="relative overflow-hidden flex justify-center py-2">
      <motion.div
        style={{ height: 1, background: `linear-gradient(90deg, transparent, ${color}, transparent)`, opacity }}
        initial={{ width: 0 }}
        animate={isInView ? { width: "60%" } : { width: 0 }}
        transition={{ duration: 1.1, ease: "easeOut", delay: 0.1 }}
      />
    </div>
  );
};

// ─── The key wrapper — applies per-section entrance ─────────────────────────
interface ScrollSectionProps {
  children: React.ReactNode;
  style: TransitionStyle;
  duration?: number;
  delay?: number;
}

const ScrollSection = ({ children, style, duration = 0.9, delay = 0 }: ScrollSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" });
  const variant = VARIANTS[style];
  const ease = EASES[style];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variant}
      transition={{ duration, delay, ease }}
    >
      {children}
    </motion.div>
  );
};

// ─── Parallax floating decoration ────────────────────────────────────────────
const ParallaxBlob = ({
  top, left, right, bottom, size, color, speed,
}: {
  top?: string; left?: string; right?: string; bottom?: string;
  size: number; color: string; speed: number;
}) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 3000], [0, speed]);

  return (
    <motion.div
      style={{
        y, top, left, right, bottom,
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: "blur(70px)",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
};

// ─── Scrolling yarn thread decoration ────────────────────────────────────────
const YarnThread = () => {
  const { scrollY } = useScroll();
  const pathLength = useTransform(scrollY, [0, 4000], [0, 1]);

  return (
    <div className="fixed left-0 top-0 h-full pointer-events-none z-30" style={{ width: 3 }}>
      <svg width="3" height="100%" viewBox="0 0 3 100" preserveAspectRatio="none" className="h-full w-full">
        <motion.line
          x1="1.5" y1="0" x2="1.5" y2="100"
          stroke="url(#threadGrad)"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ pathLength }}
          vectorEffect="non-scaling-stroke"
        />
        <defs>
          <linearGradient id="threadGrad" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
            <stop offset="0%" stopColor="#E57F84" stopOpacity="0" />
            <stop offset="30%" stopColor="#E57F84" stopOpacity="0.6" />
            <stop offset="70%" stopColor="#C4A8E0" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#87CDB4" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

// ─── Section transition label that appears between sections ──────────────────
const SectionLabel = ({ emoji, text }: { emoji: string; text: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      className="flex items-center justify-center py-8 gap-3"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.55, ease: [0.34, 1.3, 0.64, 1] }}
    >
      <div
        className="flex items-center gap-2 px-5 py-2 rounded-full font-nunito font-semibold text-xs uppercase tracking-widest"
        style={{ background: "rgba(229,127,132,0.1)", border: "1px solid rgba(229,127,132,0.2)", color: "#E57F84" }}
      >
        <span>{emoji}</span>
        <span>{text}</span>
      </div>
    </motion.div>
  );
};

// ─── HomePage ─────────────────────────────────────────────────────────────────
export default function HomePage() {
  const location = useLocation();

  // Scroll to section when arriving with a hash (e.g. from /products clicking Courses)
  useEffect(() => {
    if (!location.hash) return;
    // Small delay so sections have time to render
    const timeout = setTimeout(() => {
      const el = document.querySelector(location.hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 400);
    return () => clearTimeout(timeout);
  }, [location.hash]);
  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden" style={{ background: "#F6F2EA" }}>
      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Scrolling yarn thread on left edge */}
      <YarnThread />

      {/* Ambient parallax blobs — move at different speeds as you scroll */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <ParallaxBlob top="10%" left="-5%" size={500} color="#F4E7F3" speed={-120} />
        <ParallaxBlob top="40%" right="-8%" size={400} color="#D7F2E8" speed={80} />
        <ParallaxBlob top="70%" left="10%" size={350} color="#FDE8D8" speed={-60} />
        <ParallaxBlob top="90%" right="5%" size={300} color="#E9E3F6" speed={100} />
      </div>

      {/* Header */}
      <Header />

      <main className="flex-1 relative z-10">
        {/* ── 1. Hero ── no wrapper, has its own entrance */}
        <HeroSection />

        {/* ── 2. Our Story ── slides in from left, feels like opening a book */}
        <SectionLabel emoji="🌿" text="Our Story" />
        <ScrollSection style="fade-left" duration={1.0}>
          <OurStorySection />
        </ScrollSection>

        <SectionDivider color="#C4A8E0" opacity={0.2} />

        {/* ── 3. Signature Craft ── clips in like a curtain reveal */}
        <SectionLabel emoji="🧶" text="Signature Craft" />
        <ScrollSection style="clip-reveal" duration={1.1}>
          <SignatureCraftSection />
        </ScrollSection>

        <SectionDivider color="#E57F84" opacity={0.15} />

        {/* ── 4. Collection ── zooms in gently, draws eye to products */}
        <SectionLabel emoji="🛍️" text="The Collection" />
        <ScrollSection style="zoom-in" duration={0.9}>
          <CollectionSection />
        </ScrollSection>

        <SectionDivider color="#87CDB4" opacity={0.2} />

        {/* ── 5. Why Handmade ── fades up with slight blur for atmosphere */}
        <SectionLabel emoji="💛" text="Why Handmade" />
        <ScrollSection style="blur-up" duration={1.0}>
          <WhyHandmadeSection />
        </ScrollSection>

        <SectionDivider color="#E57F84" opacity={0.12} />

        {/* ── 6. Learn to Crochet ── slides in from right, feels fresh */}
        <SectionLabel emoji="📚" text="Learn to Crochet" />
        <ScrollSection style="fade-right" duration={1.0}>
          <LearnToCrochetSection />
        </ScrollSection>

        <SectionDivider color="#C4A8E0" opacity={0.18} />

        {/* ── 7. Testimonials ── slight rotate adds warmth, like handwritten notes */}
        <SectionLabel emoji="💬" text="What People Say" />
        <ScrollSection style="rotate-in" duration={1.0}>
          <TestimonialsSection />
        </ScrollSection>

        <SectionDivider color="#87CDB4" opacity={0.15} />

        {/* ── 8. Contact ── pure fade-up, calm close */}
        <SectionLabel emoji="✉️" text="Get in Touch" />
        <ScrollSection style="fade-up" duration={0.85} delay={0.05}>
          <ContactSection />
        </ScrollSection>
      </main>

      <Footer />
    </div>
  );
}
