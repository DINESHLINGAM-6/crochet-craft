import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import workshopImg from "@/assets/story-artisan.png";

const WORKSHOP_DETAILS = [
  { icon: "📍", label: "Location", value: "Calicut, Kerala" },
  { icon: "⏱️", label: "Duration", value: "2 hours" },
  { icon: "👥", label: "Group size", value: "Max 12 people" },
  { icon: "🎨", label: "All materials", value: "Provided" },
];

export const WorkshopSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="workshop"
      className="relative py-24 overflow-hidden scroll-mt"
      style={{ background: "#F6F2EA" }}
    >
      {/* Blobs */}
      <div
        className="wash-blob"
        style={{ width: 350, height: 350, background: "#FDF6D6", top: "-40px", right: "-80px", opacity: 0.6 }}
      />
      <div
        className="wash-blob"
        style={{ width: 250, height: 250, background: "#F8D9D9", bottom: "0", left: "-60px", opacity: 0.5 }}
      />

      <div ref={ref} className="relative z-10 max-w-[1140px] mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.75 }}
            className="relative"
          >
            <div
              className="overflow-hidden card-rounded"
              style={{
                aspectRatio: "4/3",
                boxShadow: "0 20px 60px rgba(60,30,30,0.15)",
              }}
            >
              <img
                src={workshopImg}
                alt="Crochet workshop in Calicut"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating date card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute -bottom-5 -right-4 md:-right-8 p-5 rounded-2xl"
              style={{
                background: "white",
                boxShadow: "0 8px 32px rgba(60,30,30,0.12)",
              }}
            >
              <div className="text-center">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-2"
                  style={{ background: "#F8D9D9" }}
                >
                  📅
                </div>
                <p className="font-nunito font-black text-sm" style={{ color: "#3C3C3C" }}>Every Saturday</p>
                <p className="font-inter text-xs" style={{ color: "#7A7A7A" }}>10 AM – 12 PM</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Workshop details */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.15 }}
            className="flex flex-col gap-6"
          >
            <span className="section-label">Workshop Day</span>

            <h2
              className="font-nunito font-black"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: "#3C3C3C", lineHeight: 1.15 }}
            >
              Join us for a{" "}
              <span style={{ color: "#E57F84" }}>cozy in-person</span> workshop
            </h2>

            <p className="font-inter text-base leading-relaxed" style={{ color: "#7A7A7A" }}>
              Spend a lovely Saturday morning learning crochet with like-minded makers.
              Our warm shop in Calicut is the perfect space to unwind, learn, and
              create beautiful things with your hands.
            </p>

            {/* Details grid */}
            <div className="grid grid-cols-2 gap-3">
              {WORKSHOP_DETAILS.map(({ icon, label, value }) => (
                <div
                  key={label}
                  className="p-4 rounded-2xl"
                  style={{ background: "white", border: "1px solid #E5E0D8" }}
                >
                  <span className="text-xl">{icon}</span>
                  <p className="font-inter text-xs mt-1" style={{ color: "#7A7A7A" }}>{label}</p>
                  <p className="font-nunito font-bold text-sm mt-0.5" style={{ color: "#3C3C3C" }}>{value}</p>
                </div>
              ))}
            </div>

            {/* Price + CTA */}
            <div className="flex flex-wrap items-center gap-5 mt-2">
              <div>
                <p className="font-inter text-sm" style={{ color: "#7A7A7A" }}>Workshop fee</p>
                <p className="font-nunito font-black text-3xl" style={{ color: "#E57F84" }}>₹899</p>
                <p className="font-inter text-xs" style={{ color: "#7A7A7A" }}>per person · includes materials</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary"
                onClick={() => {
                  const el = document.getElementById("contact");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Book a Spot 🎉
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
