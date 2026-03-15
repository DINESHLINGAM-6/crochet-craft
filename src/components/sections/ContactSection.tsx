import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { toast } from "sonner";
import emailjs from '@emailjs/browser';

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
      const templateParams = {
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
      };

      await emailjs.send(
        "service_flowerhook",
        "template_o1yv5in",
        templateParams,
        "n2COtH7jDaH6gcndf"
      );

      toast.success("Message sent successfully! 💌", {
        description: "The Flower Hook team has received your inquiry.",
        style: { background: "#F8D9D9", color: "#3C3C3C", border: "1px solid #E57F84" },
      });
      setForm({ name: "", email: "", message: "", subject: "General Inquiry" });
    } catch (error) {
      console.error("FAILED...", error);
      toast.error("Failed to send message. Please try again.", {
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
            { 
              icon: "📱", 
              label: "WhatsApp", 
              value: (
                <a href="https://wa.me/919840548758" target="_blank" rel="noreferrer" className="flex items-center transition-transform hover:scale-110 mt-0.5">
                  <svg className="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </a>
              )
            },
            { icon: "📍", label: "Studio", value: "Chennai, TN" },
            { icon: "🕐", label: "Response time", value: "Within 24 hours" },
          ].map(({ icon, label, value }) => (
            <div key={label} className="flex items-center gap-2">
              <span className="text-xl">{icon}</span>
              <div>
                <p className="font-inter text-xs" style={{ color: "#7A7A7A", marginBottom: "2px" }}>{label}</p>
                <div className="font-nunito font-bold text-sm" style={{ color: "#3C3C3C" }}>{value}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
