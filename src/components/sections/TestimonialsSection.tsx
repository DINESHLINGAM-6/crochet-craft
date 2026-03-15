import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ALL_REVIEWS_URL = "https://www.google.com/maps/place/The+Flower+Hook/@12.9635591,80.260068,14z/data=!4m12!1m2!2m1!1sThe+Flower+Hook+crochet+Chennai!3m8!1s0x3a525df279632ed7:0xbb886b63f289ae38!8m2!3d12.9635591!4d80.260068!9m1!1b1!15sCh9UaGUgRmxvd2VyIEhvb2sgY3JvY2hldCBDaGVubmFpkgELY3JhZnRfc3RvcmXgAQA!16s%2Fg%2F11n56773fr";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Muminah Raeesah",
    location: "Chennai",
    stars: 5,
    text: "The handwork, time and effort put into each of the detailing is really appreciated. They have a variety of items like hair clips, sling bags, Quran cover, mini purse and hampers. Best crocheting with very fine and good quality wool.",
    avatar: "M",
    avatarBg: "#C0546A",
    cardBg: "#FDF6F0",
    reviewUrl: "https://maps.app.goo.gl/9L4KWrK7HAWmWYQT6",
  },
  {
    id: 2,
    name: "Aynun Nazreen",
    location: "Chennai",
    stars: 5,
    text: "I ordered a rose bouquet — it was beautifully made and packed. The delivery was on time and they answered all my questions patiently. Absolutely loved it!",
    avatar: "A",
    avatarBg: "#9B72CF",
    cardBg: "#F7EBF5",
    reviewUrl: "https://maps.app.goo.gl/CCWj8imn8CZSeGPD6",
  },
  {
    id: 3,
    name: "Visalakshi Chidambaram",
    location: "Chennai",
    stars: 5,
    text: "Clean and neat work, delivers on time. She's super talented — made pretty key chains and coin pouches for me. Highly recommend her to everyone looking for unique handmade gifts!",
    avatar: "V",
    avatarBg: "#3A9E72",
    cardBg: "#EFF9F4",
    reviewUrl: "https://maps.app.goo.gl/P3cEcBfLseC7tpJj7",
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
          <span className="section-label">Customer Reviews</span>
          <h2
            className="font-nunito font-black mt-4 mb-3"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: "#3C3C3C" }}
          >
            Trusted by Customers{" "}
            <span className="italic font-light" style={{ color: "#E57F84" }}>Across India</span>
          </h2>
          <p className="font-inter text-base" style={{ color: "#7A7A7A", maxWidth: "460px", margin: "0 auto" }}>
            Verified experiences shared by our customers on Google. Click any review to read more.
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map(({ id, name, location, stars, text, avatar, avatarBg, cardBg, reviewUrl }, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.65 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="card-hover"
            >
              <a
                href={reviewUrl}
                target="_blank"
                rel="noreferrer"
                className="block h-full no-underline"
                title={`Read ${name}'s review on Google`}
              >
                <div
                  className="p-7 rounded-[28px] h-full flex flex-col gap-4 cursor-pointer transition-all duration-300"
                  style={{
                    background: cardBg,
                    boxShadow: "0 4px 24px rgba(60,30,30,0.07)",
                  }}
                >
                  {/* Stars + Google badge */}
                  <div className="flex items-center justify-between">
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
                    {/* Google G badge */}
                    <div
                      className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase"
                      style={{
                        background: "rgba(255,255,255,0.75)",
                        color: "#7A7A7A",
                        border: "1px solid rgba(0,0,0,0.06)",
                      }}
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      Google
                    </div>
                  </div>

                  {/* Quote */}
                  <p className="font-inter text-sm leading-relaxed flex-1" style={{ color: "#5a5a5a" }}>
                    "{text}"
                  </p>

                  {/* Reviewer */}
                  <div className="flex items-center gap-3 pt-2 border-t" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-nunito font-black text-white text-sm flex-shrink-0"
                      style={{ background: avatarBg }}
                    >
                      {avatar}
                    </div>
                    <div className="flex-1">
                      <p className="font-nunito font-bold text-sm" style={{ color: "#3C3C3C" }}>{name}</p>
                      <p className="font-inter text-xs" style={{ color: "#7A7A7A" }}>{location}</p>
                    </div>
                    {/* External link hint */}
                    <svg
                      className="w-3.5 h-3.5 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      style={{ color: "#C0C0C0" }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>

        {/* Overall rating + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href={ALL_REVIEWS_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-4 px-6 py-3 rounded-2xl transition-all duration-200 hover:shadow-md"
            style={{
              background: "rgba(255,255,255,0.6)",
              border: "1px solid rgba(229,127,132,0.18)",
              backdropFilter: "blur(8px)",
            }}
          >
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-xl" style={{ color: "#E57F84" }}>★</span>
              ))}
            </div>
            <div className="text-left">
              <p className="font-nunito font-black text-xl" style={{ color: "#3C3C3C" }}>5.0</p>
              <p className="font-inter text-xs" style={{ color: "#7A7A7A" }}>
                from 15 Google reviews · View all →
              </p>
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
