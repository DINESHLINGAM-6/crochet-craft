import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Aisha Rahman",
    location: "Chennai",
    stars: 5,
    text: "I ordered the rose sling bag as a birthday gift for my daughter. She absolutely LOVED it! The quality is incredible — you can tell so much love went into every stitch. Will definitely order again!",
    avatar: "A",
    color: "#F8D9D9",
  },
  {
    id: 2,
    name: "Priya Menon",
    location: "Calicut",
    stars: 5,
    text: "Attended the workshop last Saturday and it was the best 2 hours I've spent in a long time. The instructor is so patient and the studio is so cozy. Already planning to attend the next one.",
    avatar: "P",
    color: "#E9E3F6",
  },
  {
    id: 3,
    name: "Divya Krishnan",
    location: "Bangalore",
    stars: 5,
    text: "The Tulip & Lavender bouquet I got is absolutely stunning. My friends keep asking where I got it and can't believe it's handmade crochet. A true keepsake that will last forever!",
    avatar: "D",
    color: "#D7F2E8",
  },
];

export const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="testimonials"
      className="relative py-24 overflow-hidden"
      style={{ background: "#F4E7F3" }}
    >
      {/* Blob accents */}
      <div
        className="wash-blob"
        style={{ width: 300, height: 300, background: "#E9E3F6", top: "-50px", left: "10%", opacity: 0.5 }}
      />
      <div
        className="wash-blob"
        style={{ width: 250, height: 250, background: "#FDF6D6", bottom: "-40px", right: "15%", opacity: 0.5 }}
      />

      <div ref={ref} className="relative z-10 max-w-[1140px] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="section-label">Testimonials</span>
          <h2
            className="font-nunito font-black mt-4 mb-3"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: "#3C3C3C" }}
          >
            Made with love, received with joy
          </h2>
          <p className="font-inter text-base" style={{ color: "#7A7A7A", maxWidth: "440px", margin: "0 auto" }}>
            Don't just take our word for it — here's what our lovely customers say.
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map(({ id, name, location, stars, text, avatar, color }, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.65 }}
              whileHover={{ y: -6 }}
              className="card-hover"
            >
              <div
                className="p-7 rounded-[28px] h-full flex flex-col gap-4"
                style={{ background: "white", boxShadow: "0 4px 24px rgba(60,30,30,0.08)" }}
              >
                {/* Stars */}
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <span
                      key={j}
                      className="text-lg"
                      style={{ color: j < stars ? "#E57F84" : "#E5E0D8" }}
                    >
                      ★
                    </span>
                  ))}
                </div>

                {/* Quote */}
                <p className="font-inter text-sm leading-relaxed flex-1" style={{ color: "#7A7A7A" }}>
                  "{text}"
                </p>

                {/* Reviewer */}
                <div className="flex items-center gap-3 pt-2 border-t" style={{ borderColor: "#F0ECE6" }}>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-nunito font-black text-white text-sm flex-shrink-0"
                    style={{ background: color.replace("D9", "84").replace("E3F6", "57F84").replace("F2E8", "57F84") || "#E57F84" }}
                  >
                    {avatar}
                  </div>
                  <div>
                    <p className="font-nunito font-bold text-sm" style={{ color: "#3C3C3C" }}>{name}</p>
                    <p className="font-inter text-xs" style={{ color: "#7A7A7A" }}>{location}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Overall rating */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-3">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-2xl" style={{ color: "#E57F84" }}>★</span>
              ))}
            </div>
            <div className="text-left">
              <p className="font-nunito font-black text-2xl" style={{ color: "#3C3C3C" }}>4.9</p>
              <p className="font-inter text-sm" style={{ color: "#7A7A7A" }}>from 200+ reviews</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
