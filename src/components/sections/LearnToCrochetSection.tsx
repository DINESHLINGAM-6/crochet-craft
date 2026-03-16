import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Feather, Video, Files, MessageCircle, Star } from "lucide-react";
import courseImg from "@/assets/hero-crochet.png";

const LESSONS = [
  { icon: Feather, text: "Beginner-friendly, no experience needed", color: "#F8D9D9" },
  { icon: Video, text: "10 video lessons with lifetime access", color: "#D7F2E8" },
  { icon: Files, text: "Printable patterns & yarn guides", color: "#FDF6D6" },
  { icon: MessageCircle, text: "WhatsApp community support", color: "#E9E3F6" },
];

export const LearnToCrochetSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="courses"
      className="relative py-24 overflow-hidden scroll-mt"
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
            <div className="space-y-4">
              {LESSONS.map(({ icon: Icon, text, color }) => (
                <div key={text} className="flex items-center gap-4 group">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
                    style={{ background: "white", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
                  >
                    <Icon className="w-5 h-5" style={{ color: "#E57F84" }} />
                  </div>
                  <span className="font-inter text-base font-medium" style={{ color: "#5a5a5a" }}>{text}</span>
                </div>
              ))}
            </div>

            {/* Price + CTA */}
            <div className="flex flex-wrap items-center gap-6 mt-4">
              <div className="flex flex-col">
                <p className="font-inter text-xs uppercase tracking-widest font-bold" style={{ color: "#7A7A7A" }}>Course price</p>
                <p className="font-nunito font-black text-4xl" style={{ color: "#E57F84" }}>₹1,800</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(229,127,132,0.3)" }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary px-10 py-4"
                onClick={() => {
                  const el = document.getElementById("contact");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
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
              className="relative overflow-hidden rounded-[2.5rem]"
              style={{
                boxShadow: "0 30px 70px rgba(60,30,30,0.2)",
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
                className="absolute bottom-0 left-0 right-0 p-8"
                style={{
                  background: "linear-gradient(to top, rgba(60,30,30,0.95) 0%, rgba(60,30,30,0.7) 50%, transparent 100%)",
                }}
              >
                <p className="font-inter text-xs text-white/70 uppercase tracking-[0.2em] font-bold mb-2">Online Course</p>
                <p className="font-nunito font-black text-white text-2xl mb-3">Crochet for Beginners</p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#E57F84] text-[#E57F84]" />
                    ))}
                  </div>
                  <span className="text-white/80 text-sm font-inter ml-2">4.9 (128 students)</span>
                </div>
              </div>

              {/* Floating tag */}
              <div
                className="absolute top-6 right-6 px-5 py-2.5 rounded-2xl font-nunito font-black text-white text-lg shadow-xl"
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
