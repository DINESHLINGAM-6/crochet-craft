import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { sectionVariants, TRANSITION_EASE, SECTION_TRANSITION_DURATION } from "@/lib/motion";

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
  staggerChildren?: number;
  yOffset?: number;
}

export const SectionReveal = ({
  children,
  className,
  delay = 0,
  duration = SECTION_TRANSITION_DURATION,
  threshold = 0.1,
  once = true,
  staggerChildren = 0.1,
  yOffset = 30,
}: SectionRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: threshold, once, margin: "-50px" });

  const variants = {
    hidden: { opacity: 0, y: yOffset },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
          duration, 
          delay, 
          ease: TRANSITION_EASE,
          staggerChildren
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};
