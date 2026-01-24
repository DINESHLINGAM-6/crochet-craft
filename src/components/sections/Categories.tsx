import { ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

// Import category images
import strawberryKeychain from "@/assets/strawberry-keychain.jpg";
import bagCharmBow from "@/assets/bag-charm-bow.jpg";
import miniTortoise from "@/assets/product-2.jpg"; // Placeholder for magnet
import handbagImg from "@/assets/product-1.jpg"; // Placeholder for handbag
import tulipPot from "@/assets/flower-3.jpg";
import sunflower from "@/assets/flower-1.jpg";
import redRoseBouquet from "@/assets/red-rose-bouquet.jpg";
import quranCover from "@/assets/book-sleeve-daisy.jpg";

const categories = [
  {
    id: "keychains",
    name: "Keychains",
    description: "Cute companions for your keys and bags.",
    image: strawberryKeychain,
    color: "from-pink-900/40 to-rose-900/60",
  },
  {
    id: "hair-accessories",
    name: "Hair Accessories",
    description: "Bows, clips, and bands to style your look.",
    image: bagCharmBow,
    color: "from-purple-900/40 to-indigo-900/60",
  },
  {
    id: "fridge-magnets",
    name: "Fridge Magnets",
    description: "Tiny treasures to brighten your kitchen.",
    image: miniTortoise,
    color: "from-green-900/40 to-emerald-900/60",
  },
  {
    id: "handbags",
    name: "Handbags",
    description: "Stylish handcrafted bags and totes.",
    image: handbagImg,
    color: "from-amber-900/40 to-orange-900/60",
  },
  {
    id: "flower-pots",
    name: "Flower Pots",
    description: "Everlasting potted blooms for your desk.",
    image: tulipPot,
    color: "from-teal-900/40 to-cyan-900/60",
  },
  {
    id: "flowers",
    name: "Flowers",
    description: "Single stems to create your own arrangement.",
    image: sunflower,
    color: "from-yellow-900/40 to-amber-900/60",
  },
  {
    id: "bouquets",
    name: "Bouquets",
    description: "Grand arrangements for special moments.",
    image: redRoseBouquet,
    color: "from-red-900/40 to-rose-900/60",
  },
  {
    id: "quran-cover",
    name: "Quran Cover",
    description: "Protective and beautiful covers.",
    image: quranCover,
    color: "from-blue-900/40 to-indigo-900/60",
  },
];

export const Categories = () => {
  return (
    <section className="py-8 px-4 relative overflow-hidden">
        {/* Subtle Background Blob */}
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] -z-10 translate-y-1/3 opacity-50" />
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-poppins font-bold mb-4">
            Shop by <span className="text-gradient">Category</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our curated collection of handcrafted wonders.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link key={category.id} to={`/products?category=${category.name}`}>
              <Card
                className={cn(
                  "group cursor-pointer border-0 overflow-hidden relative rounded-2xl shadow-lg hover:shadow-2xl transition",
                  "shimmer h-64 md:h-80"
                )}
              >
                <CardContent className="p-0 h-full">
                  {/* Image Container */}
                  <div className="relative w-full h-full overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                    />

                    {/* Gradient Overlay - Sage/Lavender Tint */}
                    <div
                      className={cn(
                        "absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-all duration-500",
                        "group-hover:from-primary/80 group-hover:via-secondary/40"
                      )}
                    />

                    {/* Category Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="flex items-end justify-between">
                        <div>
                          <h3 className="text-2xl font-poppins font-bold mb-2 text-white drop-shadow-md">
                            {category.name}
                          </h3>
                          <div className="h-0.5 w-12 bg-white mb-2" />
                          <p className="text-sm text-white/90 drop-shadow-sm font-light leading-relaxed">
                            {category.description}
                          </p>
                        </div>

                        <div className="bg-white/20 backdrop-blur-md rounded-full p-3 mb-2 hover:bg-white/30 transition-colors">
                          <ArrowUpRight className="h-5 w-5 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
