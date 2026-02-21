import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Instagram, Facebook } from "lucide-react";
import Logo from "@/assets/Logo.png";

const exploreLinks = [
  { label: "Collection", to: "/products" },
  { label: "Categories", to: "/categories" },
  { label: "Our Story", to: "/about" },
  { label: "Wishlist", to: "/favorites" },
];

const supportLinks = [
  { label: "Care Guide", to: "#" },
  { label: "Shipping & Returns", to: "#" },
  { label: "Sustainability", to: "#" },
  { label: "Contact Us", to: "#" },
];

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setJoined(true);
      setEmail("");
    }
  };

  return (
    <footer
      style={{ background: "hsl(35, 28%, 94%)" }}
      className="border-t border-muted/60"
    >
      {/* ── Top rule + brand prose ── */}
      <div
        className="py-16 md:py-20"
        style={{ borderBottom: "1px solid rgba(140,80,30,0.1)" }}
      >
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">

            {/* ── Brand column ── */}
            <div className="lg:col-span-1 space-y-6">
              <Link to="/" className="flex items-center gap-3 group w-fit">
                <div
                  className="w-9 h-9 rounded-full bg-white/80 flex items-center justify-center shadow-sm overflow-hidden"
                  style={{ border: "1px solid rgba(140,80,30,0.18)" }}
                >
                  <img src={Logo} alt="The Flower Hook" className="w-6 h-6 object-contain" />
                </div>
                <span
                  className="font-playfair font-normal text-base tracking-wide"
                  style={{ color: "#2d1b0e" }}
                >
                  The Flower Hook
                </span>
              </Link>

              <p
                className="font-inter font-light text-sm leading-[1.9] max-w-xs"
                style={{ color: "rgba(92,64,30,0.7)" }}
              >
                Handcrafted crochet atelier weaving nature's fleeting beauty
                into timeless floral art.{" "}
                <span className="italic" style={{ color: "rgba(140,80,30,0.65)" }}>
                  Sustainable, slow-crafted, and eternal.
                </span>
              </p>

              {/* Social icons */}
              <div className="flex items-center gap-4 pt-1">
                {[
                  { Icon: Instagram, href: "#" },
                  { Icon: Facebook, href: "#" },
                ].map(({ Icon, href }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                    style={{
                      border: "1px solid rgba(140,80,30,0.22)",
                      background: "rgba(255,255,255,0.5)",
                      color: "#7a4a1e",
                    }}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>

              <p
                className="block font-inter text-[10px] uppercase tracking-[0.25em] font-semibold pt-2"
                style={{ color: "rgba(140,80,30,0.45)" }}
              >
                © 2024 The Flower Hook
              </p>
            </div>

            {/* ── Explore ── */}
            <div className="space-y-5">
              <h4
                className="font-inter text-[10px] font-bold uppercase tracking-[0.32em]"
                style={{ color: "#5c3d1e" }}
              >
                Explore
              </h4>
              <ul className="space-y-3.5">
                {exploreLinks.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="group inline-flex items-center gap-2 font-inter font-light text-sm transition-colors duration-300"
                      style={{ color: "rgba(92,64,30,0.75)" }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLAnchorElement).style.color = "#5c3d1e")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(92,64,30,0.75)")
                      }
                    >
                      <ArrowRight
                        className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                      />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Support ── */}
            <div className="space-y-5">
              <h4
                className="font-inter text-[10px] font-bold uppercase tracking-[0.32em]"
                style={{ color: "#5c3d1e" }}
              >
                Support
              </h4>
              <ul className="space-y-3.5">
                {supportLinks.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="group inline-flex items-center gap-2 font-inter font-light text-sm transition-colors duration-300"
                      style={{ color: "rgba(92,64,30,0.75)" }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLAnchorElement).style.color = "#5c3d1e")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(92,64,30,0.75)")
                      }
                    >
                      <ArrowRight
                        className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                      />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Newsletter ── */}
            <div className="space-y-5">
              <h4
                className="font-inter text-[10px] font-bold uppercase tracking-[0.32em]"
                style={{ color: "#5c3d1e" }}
              >
                Newsletter
              </h4>

              <p
                className="font-inter font-light text-sm leading-[1.8]"
                style={{ color: "rgba(92,64,30,0.72)" }}
              >
                Sign up for exclusive updates on new collections and studio
                news.
              </p>

              {joined ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-3 text-sm font-inter font-medium"
                  style={{ color: "#7a4a1e" }}
                >
                  ✦ Thank you for joining! We'll be in touch.
                </motion.div>
              ) : (
                <form onSubmit={handleJoin} className="space-y-3">
                  {/* Input */}
                  <div
                    className="flex items-center overflow-hidden"
                    style={{
                      border: "1px solid rgba(140,80,30,0.22)",
                      borderRadius: "2px",
                      background: "rgba(255,255,255,0.6)",
                    }}
                  >
                    <input
                      type="email"
                      placeholder="Your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="flex-1 px-4 py-3 text-sm font-inter font-light bg-transparent outline-none placeholder:text-muted-foreground/50"
                      style={{ color: "#2d1b0e" }}
                    />
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      className="px-5 py-3 text-[10px] font-inter font-bold uppercase tracking-[0.25em] text-white whitespace-nowrap"
                      style={{
                        background: "linear-gradient(135deg, #b5451b 0%, #d4785a 100%)",
                      }}
                    >
                      Join
                    </motion.button>
                  </div>

                  <p
                    className="text-[10px] font-inter font-light"
                    style={{ color: "rgba(92,64,30,0.45)" }}
                  >
                    No spam, unsubscribe any time.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom strip ── */}
      <div className="py-5">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="font-inter text-[10px] font-light tracking-widest uppercase"
            style={{ color: "rgba(92,64,30,0.38)" }}
          >
            Handcrafted with love · Sustainable · Est. 2024
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms"].map((t) => (
              <Link
                key={t}
                to="#"
                className="font-inter text-[10px] font-light uppercase tracking-widest transition-colors duration-300"
                style={{ color: "rgba(92,64,30,0.38)" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color = "#7a4a1e")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(92,64,30,0.38)")
                }
              >
                {t}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
