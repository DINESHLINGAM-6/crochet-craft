import { Link } from "react-router-dom";
import storyImg from "@/assets/flower-1.jpg";
import { MoveRight } from "lucide-react";

export const StorySection = () => {
  return (
    <section className="py-24 md:py-48 bg-background border-t border-muted overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
            {/* Image Side - Minimal Reveal */}
            <div className="w-full md:w-1/2 relative group">
                <div className="aspect-[3/4] md:aspect-[4/5] overflow-hidden bg-muted relative z-10">
                    <img 
                        src={storyImg} 
                        alt="Our artisan studio" 
                        className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-[1.02]" 
                    />
                    {/* Subtle grain overlay */}
                    <div className="absolute inset-0 bg-primary/5 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                </div>
                {/* Offset Border Text - Editorial Touch */}
                <div className="absolute -bottom-12 -left-12 hidden lg:block z-0 pointer-events-none opacity-50">
                    <span className="text-[12rem] font-playfair font-bold text-muted/20 leading-none">
                        Since
                    </span>
                </div>
            </div>

            {/* Content Side */}
            <div className="w-full md:w-1/2 space-y-12 pl-0 md:pl-12">
                <div>
                    <span className="text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-6 block">
                        Chapter I
                    </span>
                    <h2 className="text-4xl md:text-6xl font-playfair font-normal text-foreground leading-[1.1]">
                        The Art of <br />
                        <span className="italic font-light text-primary/80">Slow Living.</span>
                    </h2>
                </div>
                
                <div className="space-y-8 font-inter font-light text-lg text-muted-foreground leading-relaxed max-w-lg tracking-wide border-l border-primary/20 pl-8">
                    <p>
                        In a world chasing speed, we choose the rhythm of nature. 
                        Founded in a small, sun-drenched studio, The Flower Hook was born from a desire to preserve the fleeting beauty of blooms forever.
                    </p>
                    <p>
                        Each piece is a rebellion against the temporary—meticulously looped by hand, stitch by stitch, with patience as our primary material.
                    </p>
                </div>

                <div className="pt-4 group inline-block">
                    <Link to="/about" className="flex items-center gap-4 text-sm tracking-[0.2em] uppercase font-medium text-foreground hover:text-primary transition-colors duration-300">
                        Read Our Full Story
                        <span className="h-[1px] w-12 bg-foreground/30 group-hover:w-24 group-hover:bg-primary transition-all duration-500" />
                    </Link>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};
