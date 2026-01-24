import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Heart, Clock, Sparkles, Sprout, Hand, Palette } from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import heroImg from "@/assets/flower-1.jpg";
import processImg from "@/assets/product-4.jpg";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background font-inter flex flex-col">
      <Header />
      
      <PageWrapper className="flex-1">
        {/* Intro Hero */}
        <section className="relative py-24 px-4 overflow-hidden">
             <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse-slow" />
             <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl -z-10" />

             <div className="container mx-auto text-center max-w-4xl space-y-6 animate-slide-up">
                 <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm font-medium text-primary shadow-sm border border-primary/20 mb-4">
                  <Sprout className="h-4 w-4" />
                  <span>Our Roots</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-poppins font-bold text-foreground leading-tight">
                    Where every stitch tells a <span className="text-gradient">Story</span>.
                </h1>
                <p className="text-xl text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
                    The Flower Hook isn't just a shop; it's a celebration of patience, nature, and the human touch in a digital world.
                </p>
             </div>
        </section>

        {/* Our Philosophy Grid */}
        <section className="py-16 px-4 bg-white/50 backdrop-blur-sm">
            <div className="container mx-auto">
                <div className="grid md:grid-cols-3 gap-8">
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
                        <div key={idx} className="p-8 rounded-[2rem] bg-white border border-border/50 shadow-soft hover:shadow-medium transition-all hover:-translate-y-2">
                            <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6`}>
                                <feature.icon className="h-7 w-7" />
                            </div>
                            <h3 className="font-poppins font-bold text-xl mb-3">{feature.title}</h3>
                            <p className="text-muted-foreground font-light">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* The Process Story */}
        <section className="py-24 px-4">
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="w-full lg:w-1/2 relative">
                        <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-all duration-700">
                            <img src={heroImg} alt="Crocheting in progress" className="w-full h-auto object-cover" />
                        </div>
                        {/* Decorative badge */}
                        <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-[1.5rem] shadow-xl max-w-xs animate-float">
                            <div className="flex items-center gap-4">
                                <div className="bg-primary/10 p-3 rounded-full">
                                    <Heart className="h-6 w-6 text-primary filled" />
                                </div>
                                <div>
                                    <p className="font-bold text-foreground">Made with Love</p>
                                    <p className="text-xs text-muted-foreground">Every single loop.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 space-y-8">
                        <h2 className="text-4xl font-poppins font-bold text-foreground">The Art of Crochet</h2>
                        <div className="space-y-6 text-lg text-muted-foreground font-light leading-loose">
                            <p>
                                It starts with a simple string. With rhythm and repetition, that string becomes a fabric, a flower, a friend.
                            </p>
                            <p>
                                At The Flower Hook, we believe that objects carry energy. A mass-produced plastic toy feels different from a hand-crocheted bunny that took 5 hours to make. The latter carries the warmth of the maker's hands, the quiet moments of their day, and the intention to create something beautiful.
                            </p>
                            <p>
                                When you choose one of our pieces, you aren't just buying a product. You are supporting a craft, preserving a tradition, and bringing a piece of art into your manufacturing-filled life.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Closing Note */}
        <section className="py-20 px-4 text-center bg-primary/5">
            <div className="container mx-auto max-w-3xl">
                <Sparkles className="h-8 w-8 text-primary mx-auto mb-6" />
                <h2 className="text-3xl font-poppins font-medium italic text-foreground mb-8">
                    "We weave nature's beauty into every loop, so you can keep a piece of the garden with you, always."
                </h2>
                <p className="font-bold text-muted-foreground">— The Flower Hook Team</p>
            </div>
        </section>
      </PageWrapper>

      <Footer />
    </div>
  );
}
