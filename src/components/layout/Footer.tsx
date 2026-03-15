import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Instagram, Heart } from "lucide-react";
import { toast } from "sonner";
import Logo from "@/assets/Logo.png";

const footerLinks = {
  shop: [
    { label: "All Products", to: "/products" },
    { label: "Key Chains and Charms", to: "/products" },
    { label: "Flower Pots", to: "/products" },
    { label: "Bags and pouches", to: "/products" },
    { label: "Flowers and Bouquet", to: "/products" },
  ],
  learn: [
    { label: "Online Courses", to: "#courses" },
    { label: "In-person Workshop", to: "#workshop" },
    { label: "Our Story", to: "/about" },
    { label: "Blog", to: "#" },
  ],
  support: [
    { label: "Contact Us", to: "#contact" },
    { label: "Custom Orders", to: "#contact" },
    { label: "Shipping Policy", to: "#" },
    { label: "Returns", to: "#" },
  ],
};

export const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      toast.success("Subscribed! 🎉", {
        description: "You'll get cozy updates in your inbox.",
        style: { background: "#F8D9D9", color: "#3C3C3C", border: "1px solid #E57F84" },
      });
      setEmail("");
    }
  };

  const scrollToSection = (hash: string) => {
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer style={{ background: "#F4E7F3" }}>
      {/* Wave divider */}
      <div style={{ lineHeight: 0 }}>
        <svg viewBox="0 0 1440 60" fill="#F6F2EA" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "60px" }}>
          <path d="M0,0 C360,60 1080,0 1440,40 L1440,0 Z" />
        </svg>
      </div>

      <div className="max-w-[1140px] mx-auto px-6 pt-10 pb-6">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12" style={{ borderBottom: "1px solid rgba(229,127,132,0.15)" }}>
          {/* Brand col */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <Link to="/" className="flex items-center gap-2.5">
              <div
                className="w-9 h-9 flex items-center justify-center"
              >
                <img src={Logo} alt="The Flower Hook" className="w-9 h-9 object-contain" />
              </div>
              <span className="font-nunito font-black text-lg" style={{ color: "#3C3C3C" }}>The Flower Hook</span>
            </Link>

            <p className="font-inter text-sm leading-relaxed" style={{ color: "#7A7A7A", maxWidth: "300px" }}>
              Handmade crochet creations crafted with love and slow living principles.
              Every stitch tells a story of warmth, patience, and heart.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/theflowerhook"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
                style={{ border: "1px solid rgba(229,127,132,0.2)" }}
              >
                <Instagram className="w-6 h-6" style={{ color: "#E57F84" }} />
              </a>
              <a
                href="https://wa.me/919840548758"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
                style={{ border: "1px solid rgba(37, 211, 102, 0.2)" }}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                  fill="#25D366"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </a>
            </div>

            {/* Newsletter */}
            <div>
              <p className="font-nunito font-bold text-sm mb-2" style={{ color: "#3C3C3C" }}>
                Get cozy updates 🧶
              </p>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-4 py-2.5 rounded-full font-inter text-sm outline-none"
                  style={{
                    border: "1.5px solid rgba(229,127,132,0.3)",
                    background: "white",
                    color: "#3C3C3C",
                  }}
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-4 py-2.5 rounded-full font-nunito font-bold text-sm text-white flex-shrink-0"
                  style={{ background: "#E57F84" }}
                >
                  Join
                </motion.button>
              </form>
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h4 className="font-nunito font-black text-sm mb-4 uppercase tracking-wider" style={{ color: "#3C3C3C" }}>
              Shop
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.shop.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="font-inter text-sm transition-colors duration-200 hover:text-[#E57F84]"
                    style={{ color: "#7A7A7A" }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Learn links */}
          <div>
            <h4 className="font-nunito font-black text-sm mb-4 uppercase tracking-wider" style={{ color: "#3C3C3C" }}>
              Learn
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.learn.map(({ label, to }) => (
                <li key={label}>
                  {to.startsWith("#") ? (
                    <button
                      onClick={() => scrollToSection(to)}
                      className="font-inter text-sm transition-colors duration-200 hover:text-[#E57F84] text-left"
                      style={{ color: "#7A7A7A" }}
                    >
                      {label}
                    </button>
                  ) : (
                    <Link
                      to={to}
                      className="font-inter text-sm transition-colors duration-200 hover:text-[#E57F84]"
                      style={{ color: "#7A7A7A" }}
                    >
                      {label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Support links */}
          <div>
            <h4 className="font-nunito font-black text-sm mb-4 uppercase tracking-wider" style={{ color: "#3C3C3C" }}>
              Support
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.support.map(({ label, to }) => (
                <li key={label}>
                  {to.startsWith("#") ? (
                    <button
                      onClick={() => scrollToSection(to)}
                      className="font-inter text-sm transition-colors duration-200 hover:text-[#E57F84] text-left"
                      style={{ color: "#7A7A7A" }}
                    >
                      {label}
                    </button>
                  ) : (
                    <Link
                      to={to}
                      className="font-inter text-sm transition-colors duration-200 hover:text-[#E57F84]"
                      style={{ color: "#7A7A7A" }}
                    >
                      {label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-inter text-xs" style={{ color: "#7A7A7A" }}>
            © 2020 The Flower Hook. Made with{" "}
            <Heart className="inline w-3 h-3" style={{ color: "#E57F84" }} />{" "}
            in Chennai, Tamil Nadu.
          </p>
          <div className="flex items-center gap-4">
            {["Privacy Policy", "Terms", "Returns"].map((t) => (
              <Link
                key={t}
                to="#"
                className="font-inter text-xs transition-colors hover:text-[#E57F84]"
                style={{ color: "#7A7A7A" }}
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
