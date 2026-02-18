import { Heart, Flower2, Clock } from "lucide-react";

export const BrandPhilosophy = () => {
  return (
    <section className="py-24 bg-muted/20 border-t border-muted">
      <div className="container mx-auto px-6 md:px-12 text-center max-w-4xl">
        <span className="text-xs font-semibold tracking-[0.3em] text-primary uppercase mb-6 block">
            Our Promise
        </span>
        <h2 className="text-3xl md:text-5xl font-playfair font-normal text-foreground mb-16 leading-tight">
          Every piece tells a story of <br className="hidden md:block" />
          <span className="italic text-primary/80">patience and nature.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24">
            {/* Block 1 */}
            <div className="flex flex-col items-center group">
                <div className="mb-6 p-4 rounded-full border border-primary/10 group-hover:bg-primary/5 transition-colors duration-500">
                    <Clock className="h-6 w-6 text-primary stroke-[1.5]" />
                </div>
                <h3 className="text-lg font-playfair font-medium text-foreground mb-3 tracking-wide">
                    Slow Crafted
                </h3>
                <p className="text-sm font-light text-muted-foreground leading-relaxed">
                    Hours of dedicated handwork 
                    woven into every stitch.
                </p>
            </div>

            {/* Block 2 */}
            <div className="flex flex-col items-center group">
                <div className="mb-6 p-4 rounded-full border border-primary/10 group-hover:bg-primary/5 transition-colors duration-500">
                    <Flower2 className="h-6 w-6 text-primary stroke-[1.5]" />
                </div>
                <h3 className="text-lg font-playfair font-medium text-foreground mb-3 tracking-wide">
                    Sustainable
                </h3>
                <p className="text-sm font-light text-muted-foreground leading-relaxed">
                    Plant-based fibers and eco-conscious 
                    dyes for a gentle footprint.
                </p>
            </div>

            {/* Block 3 */}
            <div className="flex flex-col items-center group">
                <div className="mb-6 p-4 rounded-full border border-primary/10 group-hover:bg-primary/5 transition-colors duration-500">
                    <Heart className="h-6 w-6 text-primary stroke-[1.5]" />
                </div>
                <h3 className="text-lg font-playfair font-medium text-foreground mb-3 tracking-wide">
                    Made with Love
                </h3>
                <p className="text-sm font-light text-muted-foreground leading-relaxed">
                    Created by artisans who pour 
                    their heart into the art.
                </p>
            </div>
        </div>
      </div>
    </section>
  );
};
