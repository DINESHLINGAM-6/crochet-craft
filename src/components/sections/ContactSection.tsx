import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { toast } from "sonner";

export const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const [form, setForm] = useState({ name: "", email: "", message: "", subject: "General Inquiry" });
  const [sending, setSending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      const data = new FormData();
      data.append("name", form.name);
      data.append("email", form.email);
      data.append("_subject", `[The Flower Hook] ${form.subject} from ${form.name}`);
      data.append("message", `Subject: ${form.subject}\n\n${form.message}`);
      data.append("_captcha", "false");
      data.append("_template", "box");

      const res = await fetch("https://formsubmit.co/ajax/Theflowerhook@gmail.com", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });

      const json = await res.json();
      if (json.success === "true" || json.success === true) {
        toast.success("Message sent! 💌", {
          description: "We'll get back to you within 24 hours.",
          style: { background: "#F8D9D9", color: "#3C3C3C", border: "1px solid #E57F84" },
        });
        setForm({ name: "", email: "", message: "", subject: "General Inquiry" });
      } else {
        throw new Error("Failed");
      }
    } catch {
      toast.error("Oops! Something went wrong.", {
        description: "Please try WhatsApp or email us directly.",
        style: { background: "#FDE8D8", color: "#3C3C3C", border: "1px solid #E57F84" },
      });
    } finally {
      setSending(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "0.875rem 1.25rem",
    borderRadius: "999px",
    border: "1.5px solid #E5E0D8",
    background: "white",
    color: "#3C3C3C",
    fontFamily: "Inter, sans-serif",
    fontSize: "0.9rem",
    outline: "none",
    transition: "border-color 0.2s",
  };

  const textareaStyle = {
    ...inputStyle,
    borderRadius: "24px",
    resize: "none" as const,
    minHeight: "140px",
  };

  return (
    <section
      id="contact"
      className="relative py-24 overflow-hidden"
      style={{ background: "#F6F2EA" }}
    >
      {/* Blob accents */}
      <div
        className="wash-blob"
        style={{ width: 300, height: 300, background: "#F4E7F3", top: "0", left: "0", opacity: 0.5 }}
      />
      <div
        className="wash-blob"
        style={{ width: 250, height: 250, background: "#D7F2E8", bottom: "0", right: "-80px", opacity: 0.4 }}
      />

      <div ref={ref} className="relative z-10 max-w-[900px] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="section-label">Get in Touch</span>
          <h2
            className="font-nunito font-black mt-4 mb-3"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: "#3C3C3C" }}
          >
            Let's talk crochet 🧶
          </h2>
          <p className="font-inter text-base" style={{ color: "#7A7A7A", maxWidth: "480px", margin: "0 auto" }}>
            Have a custom order idea, a collaboration in mind, or just want to say hello?
            We'd love to hear from you!
          </p>
        </motion.div>

        {/* Contact form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div
            className="p-8 md:p-12 rounded-3xl"
            style={{ background: "white", boxShadow: "0 8px 40px rgba(60,30,30,0.1)" }}
          >
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="font-nunito font-bold text-sm" style={{ color: "#3C3C3C" }}>Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "#E57F84")}
                  onBlur={(e) => (e.target.style.borderColor = "#E5E0D8")}
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="font-nunito font-bold text-sm" style={{ color: "#3C3C3C" }}>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  required
                  value={form.email}
                  onChange={handleChange}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "#E57F84")}
                  onBlur={(e) => (e.target.style.borderColor = "#E5E0D8")}
                />
              </div>

              {/* Subject - full width */}
              <div className="sm:col-span-2 flex flex-col gap-1.5">
                <label className="font-nunito font-bold text-sm" style={{ color: "#3C3C3C" }}>Subject</label>
                <select
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  style={{ ...inputStyle, cursor: "pointer" }}
                  onFocus={(e) => (e.target.style.borderColor = "#E57F84")}
                  onBlur={(e) => (e.target.style.borderColor = "#E5E0D8")}
                >
                  <option>General Inquiry</option>
                  <option>Custom Order</option>
                  <option>Online Course</option>
                  <option>Wholesale / Collaboration</option>
                </select>
              </div>

              {/* Message - full width */}
              <div className="sm:col-span-2 flex flex-col gap-1.5">
                <label className="font-nunito font-bold text-sm" style={{ color: "#3C3C3C" }}>Message</label>
                <textarea
                  name="message"
                  placeholder="Tell us what's on your mind..."
                  required
                  value={form.message}
                  onChange={handleChange}
                  style={textareaStyle}
                  onFocus={(e) => (e.target.style.borderColor = "#E57F84")}
                  onBlur={(e) => (e.target.style.borderColor = "#E5E0D8")}
                />
              </div>

              {/* Submit */}
              <div className="sm:col-span-2 flex justify-center pt-2">
                <motion.button
                  type="submit"
                  disabled={sending}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-primary px-10 py-3.5 text-base disabled:opacity-60"
                >
                  {sending ? "Sending..." : "Send Message 💌"}
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Info row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-6 mt-10"
        >
          {[
            { icon: "📱", label: "WhatsApp", value: "+91 96775 58758" },
            { icon: "📍", label: "Studio", value: "Chennai, TN" },
            { icon: "🕐", label: "Response time", value: "Within 24 hours" },
          ].map(({ icon, label, value }) => (
            <div key={label} className="flex items-center gap-2">
              <span className="text-xl">{icon}</span>
              <div>
                <p className="font-inter text-xs" style={{ color: "#7A7A7A" }}>{label}</p>
                <p className="font-nunito font-bold text-sm" style={{ color: "#3C3C3C" }}>{value}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
