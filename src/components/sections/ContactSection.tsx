import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { toast } from "sonner";
import emailjs from '@emailjs/browser';
import { Send, MessageCircle, MapPin, Clock } from "lucide-react";

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
    padding: "1rem 1.5rem",
    borderRadius: "1.25rem",
    border: "1.5px solid #E5E0D8",
    background: "white",
    color: "#3C3C3C",
    fontFamily: "Inter, sans-serif",
    fontSize: "0.95rem",
    outline: "none",
    transition: "all 0.3s ease",
  };

  const textareaStyle = {
    ...inputStyle,
    borderRadius: "1.5rem",
    resize: "none" as const,
    minHeight: "160px",
  };

  return (
    <section
      id="contact"
      className="relative py-20 overflow-hidden scroll-mt"
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

      <div ref={ref} className="relative z-10 max-w-[1000px] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label bg-white/50 backdrop-blur-md px-4 py-1.5 rounded-full inline-block mb-4">Connect with us</span>
          <h2
            className="font-nunito font-black mt-2 mb-4"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.2rem)", color: "#3C3C3C", lineHeight: 1.1 }}
          >
            Let's talk <span className="text-[#E57F84] italic font-light">crochet</span>
          </h2>
          <p className="font-inter text-lg" style={{ color: "#7A7A7A", maxWidth: "520px", margin: "0 auto", lineHeight: 1.6 }}>
            Have a custom order idea, a collaboration in mind, or just want to say hello?
            We'd love to hear from you!
          </p>
        </motion.div>

        {/* Contact wrapper */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-stretch">
           {/* Left: Contact Info cards */}
           <motion.div 
             initial={{ opacity: 0, x: -30 }}
             animate={isInView ? { opacity: 1, x: 0 } : {}}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="lg:col-span-2 flex flex-col gap-6"
           >
              {[
                { 
                  icon: MessageCircle, 
                  label: "WhatsApp", 
                  color: "#D7F2E8",
                  accent: "#25D366",
                  value: "Chat Now",
                  href: "https://wa.me/919840548758"
                },
                { 
                  icon: MapPin, 
                  label: "Shop Location", 
                  color: "#F4E7F3",
                  accent: "#C4A8E0",
                  value: "Chennai, Tamil Nadu" 
                },
                { 
                  icon: Clock, 
                  label: "Response Time", 
                  color: "#FDF6D6",
                  accent: "#EBD47B",
                  value: "Within 24 hours" 
                },
              ].map(({ icon: Icon, label, value, color, accent, href }) => (
                <div 
                  key={label}
                  className="p-6 rounded-3xl bg-white/70 backdrop-blur-md border border-white/50 flex items-center gap-5 shadow-[0_4px_20px_rgba(60,30,30,0.03)]"
                >
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                    style={{ background: color }}
                  >
                    <Icon className="w-6 h-6" style={{ color: accent }} />
                  </div>
                  <div>
                    <p className="font-inter text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#7A7A7A" }}>{label}</p>
                    {href ? (
                      <a href={href} target="_blank" rel="noreferrer" className="font-nunito font-black text-lg hover:text-[#E57F84] transition-colors">
                        {value}
                      </a>
                    ) : (
                      <p className="font-nunito font-black text-lg" style={{ color: "#3C3C3C" }}>{value}</p>
                    )}
                  </div>
                </div>
              ))}
           </motion.div>

           {/* Right: Form */}
           <motion.div
             initial={{ opacity: 0, x: 30 }}
             animate={isInView ? { opacity: 1, x: 0 } : {}}
             transition={{ duration: 0.8, delay: 0.3 }}
             className="lg:col-span-3"
           >
             <div
               className="p-8 md:p-10 rounded-[2.5rem]"
               style={{ background: "white", boxShadow: "0_30px_60px_rgba(60,30,30,0.08)" }}
             >
               <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                 <div className="flex flex-col gap-2">
                   <label className="font-nunito font-bold text-sm ml-2" style={{ color: "#3C3C3C" }}>Your Name</label>
                   <input
                     type="text"
                     name="name"
                     placeholder="Your Name"
                     required
                     value={form.name}
                     onChange={handleChange}
                     style={inputStyle}
                     className="focus:ring-2 focus:ring-[#E57F84]/20 focus:border-[#E57F84]"
                   />
                 </div>

                 <div className="flex flex-col gap-2">
                   <label className="font-nunito font-bold text-sm ml-2" style={{ color: "#3C3C3C" }}>Email Address</label>
                   <input
                     type="email"
                     name="email"
                     placeholder="yourmail@gmail.com"
                     required
                     value={form.email}
                     onChange={handleChange}
                     style={inputStyle}
                     className="focus:ring-2 focus:ring-[#E57F84]/20 focus:border-[#E57F84]"
                   />
                 </div>

                 <div className="sm:col-span-2 flex flex-col gap-2">
                   <label className="font-nunito font-bold text-sm ml-2" style={{ color: "#3C3C3C" }}>What are you looking for?</label>
                   <select
                     name="subject"
                     value={form.subject}
                     onChange={handleChange}
                     style={{ ...inputStyle, cursor: "pointer" }}
                     className="focus:ring-2 focus:ring-[#E57F84]/20 focus:border-[#E57F84]"
                   >
                     <option>General Inquiry</option>
                     <option>Custom Order</option>
                     <option>Online Course</option>
                     <option>Wholesale / Collaboration</option>
                   </select>
                 </div>

                 <div className="sm:col-span-2 flex flex-col gap-2">
                   <label className="font-nunito font-bold text-sm ml-2" style={{ color: "#3C3C3C" }}>Message</label>
                   <textarea
                     name="message"
                     placeholder="Tell us about your dream crochet piece..."
                     required
                     value={form.message}
                     onChange={handleChange}
                     style={textareaStyle}
                     className="focus:ring-2 focus:ring-[#E57F84]/20 focus:border-[#E57F84]"
                   />
                 </div>

                 <div className="sm:col-span-2 pt-4">
                   <motion.button
                     type="submit"
                     disabled={sending}
                     whileHover={{ scale: 1.02, boxShadow: "0 15px 35px rgba(229,127,132,0.3)" }}
                     whileTap={{ scale: 0.98 }}
                     className="w-full btn-primary py-5 text-lg font-nunito font-black disabled:opacity-60 flex items-center justify-center gap-3"
                   >
                     {sending ? "Sending..." : (
                        <>
                          Send Message
                          <Send className="w-5 h-5" />
                        </>
                     )}
                   </motion.button>
                 </div>
               </form>
             </div>
           </motion.div>
        </div>
      </div>
    </section>
  );
};
