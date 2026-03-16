import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, MapPin, Quote, ExternalLink } from "lucide-react";

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
      className="relative py-24 overflow-hidden scroll-mt"
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
          className="text-center mb-16"
        >
          <span className="section-label shadow-sm bg-white/50 backdrop-blur-md px-4 py-1.5 rounded-full inline-block mb-4">Customer Reviews</span>
          <h2
            className="font-nunito font-black mt-2 mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3rem)", color: "#3C3C3C", lineHeight: 1.1 }}
          >
            Trusted by Customers{" "}
            <span className="italic font-light" style={{ color: "#E57F84" }}>Across India</span>
          </h2>
          <p className="font-inter text-lg" style={{ color: "#7A7A7A", maxWidth: "540px", margin: "0 auto", lineHeight: 1.6 }}>
            Verified experiences shared by our customers on Google. Click any review to read more.
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map(({ id, name, location, stars, text, avatar, avatarBg, cardBg, reviewUrl }, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.15, duration: 0.65 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <a
                href={reviewUrl}
                target="_blank"
                rel="noreferrer"
                className="block h-full no-underline"
                title={`Read ${name}'s review on Google`}
              >
                <div
                  className="p-8 rounded-[32px] h-full flex flex-col gap-5 cursor-pointer transition-all duration-300 group-hover:shadow-[0_20px_40px_rgba(60,30,30,0.1)]"
                  style={{
                    background: cardBg,
                    border: "1px solid rgba(255,255,255,0.4)",
                  }}
                >
                  {/* Stars + Google badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, j) => (
                        <Star
                          key={j}
                          className={`w-4 h-4 transition-all duration-500 group-hover:scale-125`}
                          style={{ 
                            color: j < stars ? "#E57F84" : "#E5E0D8",
                            fill: j < stars ? "#E57F84" : "transparent"
                          }}
                        />
                      ))}
                    </div>
                    {/* Google G badge */}
                    <div
                      className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase"
                      style={{
                        background: "rgba(255,255,255,0.8)",
                        color: "#7A7A7A",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
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
                  <div className="relative flex-1">
                    <Quote className="absolute -top-2 -left-2 w-8 h-8 text-black/5" />
                    <p className="font-inter text-sm leading-relaxed relative z-10 pt-2" style={{ color: "#3C3C3C", fontWeight: 450 }}>
                      {text}
                    </p>
                  </div>

                  {/* Reviewer */}
                  <div className="flex items-center gap-4 pt-5 border-t border-black/5">
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center font-nunito font-black text-white text-sm flex-shrink-0 shadow-lg transform transition-transform duration-500 group-hover:rotate-12"
                      style={{ background: avatarBg }}
                    >
                      {avatar}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="font-nunito font-bold text-sm truncate" style={{ color: "#3C3C3C" }}>{name}</p>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#E57F84]" />
                        <p className="font-inter text-[11px] font-medium" style={{ color: "#7A7A7A" }}>{location}</p>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-[#C0C0C0] opacity-0 group-hover:opacity-100 transition-all duration-300" />
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
          className="text-center mt-16"
        >
          <a
            href={ALL_REVIEWS_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-6 px-8 py-5 rounded-3xl transition-all duration-300 hover:shadow-[0_15px_30px_rgba(229,127,132,0.15)] group"
            style={{
              background: "white",
              border: "1px solid rgba(229,127,132,0.12)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-[#E57F84] text-[#E57F84]" />
              ))}
            </div>
            <div className="text-left border-l border-black/5 pl-6">
              <p className="font-nunito font-black text-2xl" style={{ color: "#3C3C3C" }}>5.0 Rating</p>
              <p className="font-inter text-xs font-semibold tracking-wide" style={{ color: "#E57F84" }}>
                from 15 Google reviews · View all <ExternalLink className="w-3 h-3 inline ml-1" />
              </p>
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
