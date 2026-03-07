import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import courseImg from "@/assets/hero-crochet.png";

const LESSONS = [
  { icon: "🧶", text: "Beginner-friendly, no experience needed" },
  { icon: "📹", text: "10 video lessons with lifetime access" },
  { icon: "📋", text: "Printable patterns & yarn guides" },
  { icon: "💬", text: "WhatsApp community support" },
];

export const LearnToCrochetSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="courses"
      className="relative py-24 overflow-hidden"
      style={{ background: "#E9E3F6" }}
    >
      {/* Blob accent */}
      <div
        className="wash-blob"
        style={{ width: 300, height: 300, background: "#F8D9D9", bottom: "-60px", left: "-60px", opacity: 0.6 }}
      />
      <div
        className="wash-blob"
        style={{ width: 250, height: 250, background: "#D7F2E8", top: "-40px", right: "10%", opacity: 0.5 }}
      />

      <div ref={ref} className="relative z-10 max-w-[1140px] mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75 }}
            className="flex flex-col gap-6"
          >
            <span className="section-label">Learn to Crochet</span>

            <h2
              className="font-nunito font-black"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: "#3C3C3C", lineHeight: 1.15 }}
            >
              Start your own{" "}
              <span style={{ color: "#E57F84" }}>crochet journey</span> today
            </h2>

            <p className="font-inter text-base leading-relaxed" style={{ color: "#7A7A7A" }}>
              Our beginner online course has helped 200+ people fall in love with crochet.
              Go from zero to creating your first cozy project — all at your own pace,
              from your own home.
            </p>

            {/* Lesson list */}
            <div className="space-y-3">
              {LESSONS.map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <span className="text-xl">{icon}</span>
                  <span className="font-inter text-sm" style={{ color: "#7A7A7A" }}>{text}</span>
                </div>
              ))}
            </div>

            {/* Price + CTA */}
            <div className="flex flex-wrap items-center gap-5 mt-2">
              <div>
                <p className="font-inter text-sm" style={{ color: "#7A7A7A" }}>Course price</p>
                <p className="font-nunito font-black text-3xl" style={{ color: "#E57F84" }}>₹1,800</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary"
              >
                Enrol Now 🎉
              </motion.button>
            </div>
          </motion.div>

          {/* Right: Course card */}
          <motion.div
            initial={{ opacity: 0, x: 40, rotate: 2 }}
            animate={isInView ? { opacity: 1, x: 0, rotate: 2 } : {}}
            transition={{ duration: 0.75, delay: 0.2 }}
          >
            <div
              className="relative overflow-hidden rounded-3xl"
              style={{
                boxShadow: "0 24px 60px rgba(60,30,30,0.15)",
                transform: "rotate(2deg)",
              }}
            >
              <img
                src={courseImg}
                alt="Learn to crochet course"
                className="w-full object-cover"
                style={{ aspectRatio: "4/3" }}
              />

              {/* Course info overlay */}
              <div
                className="absolute bottom-0 left-0 right-0 p-6"
                style={{
                  background: "linear-gradient(to top, rgba(60,30,30,0.8), transparent)",
                }}
              >
                <p className="font-inter text-xs text-white/70 uppercase tracking-wider mb-1">Online Course</p>
                <p className="font-nunito font-black text-white text-xl">Crochet for Beginners</p>
                <div className="flex items-center gap-2 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} style={{ color: "#E57F84" }}>★</span>
                  ))}
                  <span className="text-white/70 text-sm font-inter ml-1">4.9 (128 students)</span>
                </div>
              </div>

              {/* Floating tag */}
              <div
                className="absolute top-4 right-4 px-3 py-2 rounded-2xl font-nunito font-black text-white text-sm"
                style={{ background: "#E57F84" }}
              >
                ₹1,800
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
