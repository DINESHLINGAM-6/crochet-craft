import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Heart, Clock, Sparkles, Sprout, Hand, Palette } from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import heroImg from "@/assets/crochet-flowers-hero.jpg";
import storyArtisan from "@/assets/Bouquet_2.jpeg";
import { SectionReveal } from "@/components/ui/ScrollReveal";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function AboutPage() {
  const location = useLocation();
  const containerRef = useRef(null);

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
    }
  }, [location.hash]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -40]);
  return (
    <div className="min-h-screen bg-background font-inter flex flex-col">
      <Header />
      
      <PageWrapper className="flex-1">
        <div ref={containerRef}>
        {/* Intro Hero */}
        <section className="relative py-24 px-4 overflow-hidden">
             {/* Decorative blobs with slow motion */}
             <motion.div 
               animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
               transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
               className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" 
             />
             <motion.div 
               animate={{ x: [0, -40, 0], y: [0, 50, 0] }}
               transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
               className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl -z-10" 
             />

             <motion.div style={{ y: heroY }} className="container mx-auto text-center max-w-4xl space-y-8">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest text-primary shadow-sm border border-primary/20 mb-4"
                  >
                   <Sprout className="h-4 w-4" />
                   <span>Our Roots</span>
                 </motion.div>
                <h1 className="text-5xl md:text-7xl font-playfair font-bold text-foreground leading-[1.1]">
                    Where every stitch tells a <span className="text-primary italic font-medium">Story.</span>
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
                    The Flower Hook isn't just a shop; it's a celebration of patience, nature, and the human touch.
                </p>
             </motion.div>
        </section>

        {/* Our Philosophy Grid */}
        <section className="py-20 px-4 bg-white/40 backdrop-blur-sm relative border-y border-primary/5">
            <div className="container mx-auto">
                <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                    {[
                        {
                            icon: Clock,
                            title: "Slow & Steady",
                            desc: "We reject fast fashion. Each piece takes hours of focused care to create.",
                            color: "bg-primary/20 text-primary"
                        },
                        {
                            icon: Hand,
                            title: "Handmade by Humans",
                            desc: "No machines. Just hands, a hook, and a ball of yarn bringing ideas to life.",
                            color: "bg-secondary/20 text-secondary-foreground"
                        },
                        {
                            icon: Palette,
                            title: "Nature Inspired",
                            desc: "Our color palettes and designs are drawn directly from the garden.",
                            color: "bg-accent/20 text-accent"
                        }
                    ].map((feature, idx) => (
                        <motion.div 
                          key={idx} 
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: idx * 0.2 }}
                          whileHover={{ y: -8, scale: 1.02 }}
                          className="p-10 rounded-[2.5rem] bg-white border border-border/50 shadow-soft transition-all duration-300 group"
                        >
                            <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-8 transition-transform group-hover:scale-110 group-hover:rotate-6`}>
                                <feature.icon className="h-8 w-8" />
                            </div>
                            <h3 className="font-playfair font-bold text-2xl mb-4 text-[#3C3C3C]">{feature.title}</h3>
                            <p className="text-muted-foreground font-light leading-relaxed">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>

        {/* The Process Story */}
        <section className="py-24 md:py-36 px-4">
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                    <div className="w-full lg:w-1/2 relative">
                        <motion.div 
                          initial={{ opacity: 0, x: -50 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="relative rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-700 hover:shadow-primary/20"
                        >
                            <motion.img 
                              src={storyArtisan} 
                              alt="Crocheting in progress" 
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 1.5 }}
                              className="w-full h-auto object-cover aspect-[4/5]" 
                            />
                        </motion.div>
                        {/* Decorative badge with pulse */}
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                          whileInView={{ opacity: 1, scale: 1, rotate: -5 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5, duration: 0.8 }}
                          className="absolute -bottom-8 -left-8 bg-white p-8 rounded-[2rem] shadow-2xl max-w-xs"
                        >
                            <div className="flex items-center gap-5">
                                <motion.div 
                                  animate={{ scale: [1, 1.15, 1] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                  className="bg-primary/10 p-4 rounded-full"
                                >
                                    <Heart className="h-8 w-8 text-primary fill-primary" />
                                </motion.div>
                                <div>
                                    <p className="font-playfair font-bold text-xl text-foreground">Made with Love</p>
                                    <p className="text-sm text-muted-foreground font-medium">Every single loop.</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                    <div className="w-full lg:w-1/2 space-y-10">
                        <motion.h2 
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          className="text-4xl md:text-5xl font-playfair font-bold text-foreground leading-tight"
                        >
                          The Art of <span className="text-primary italic">Crochet</span>
                        </motion.h2>
                        <div className="space-y-8 text-xl md:text-2xl text-muted-foreground leading-relaxed italic" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}>
                            <motion.p
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.2 }}
                            >
                                The whole story began with the love and passion for crochet, which slowly turned into a small, self-made business. Like many parents, my day ends only after the last “one more glass of water” is poured, the favorite toy is found, and the house finally settles into a rare, peaceful silence. That quiet moment is when I reach for my yarn. The gentle rhythm of crocheting helps me slow down and turn the busyness of the day into something soft, beautiful, and meaningful.
                            </motion.p>
                            <motion.p
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.3 }}
                            >
                                This business was built on a simple belief: gifts should not only be beautiful, but also sustainable.
                            </motion.p>
                            <motion.p
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.4 }}
                            >
                                Every item is carefully handcrafted using quality yarns and thoughtful materials. When you shop here, you’re choosing something heartfelt, made with care and purpose—that’s why it is “Handmade with Love.” 💛
                            </motion.p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Policies Section for Footer Links */}
        <section id="policies" className="py-24 px-4 bg-white/60">
            <div className="container mx-auto max-w-5xl">
                <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
                    <motion.div 
                      id="shipping"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="space-y-6"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <Clock className="h-5 w-5 text-primary" />
                            </div>
                            <h3 className="font-playfair font-bold text-2xl text-foreground">Shipping Policy</h3>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                            Every item is handmade to order. Please allow **4-7 business days** for your piece to be carefully crafted before dispatch. 
                            We ship across India via reliable partners, and you will receive a tracking number as soon as your order is on its way.
                        </p>
                    </motion.div>

                    <motion.div 
                      id="returns"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="space-y-6"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                                <Heart className="h-5 w-5 text-secondary-foreground" />
                            </div>
                            <h3 className="font-playfair font-bold text-2xl text-foreground">Returns & Exchanges</h3>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                            Due to the personalized, handmade nature of our products, we generally do not accept returns. 
                            However, your satisfaction is our priority. If your item arrives damaged or has a defect, please contact us within **48 hours** with photos, and we will make it right.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>

        {/* Closing Note */}
        <section className="py-32 px-4 text-center bg-primary/5 relative overflow-hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="container mx-auto max-w-3xl"
            >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="mb-8"
                >
                  <Sparkles className="h-10 w-10 text-primary mx-auto" />
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-playfair font-medium italic text-foreground mb-10 leading-relaxed">
                    "We weave nature's beauty into every loop, so you can keep a piece of the garden with you, always."
                </h2>
                <p className="font-nunito font-black text-primary tracking-widest uppercase text-sm">— The Flower Hook Team —</p>
            </motion.div>
        </section>
        </div>
      </PageWrapper>

      <Footer />
    </div>
  );
}

