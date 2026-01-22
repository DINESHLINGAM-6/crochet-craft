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
    <section className="py-20 px-4 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
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
                  "animate-fade-in shimmer h-64 md:h-80"
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-0 h-full">
                  {/* Image Container */}
                  <div className="relative w-full h-full overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                    />

                    {/* Gradient Overlay */}
                    <div
                      className={cn(
                        "absolute inset-0 bg-gradient-to-t opacity-60 group-hover:opacity-80 transition-all duration-500",
                        category.color
                      )}
                    />

                    {/* Category Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-start justify-between">
                        <div className="transform group-hover:translate-y-[-6px] transition-transform duration-300">
                          <h3 className="text-2xl font-bold mb-2 text-white drop-shadow-md">
                            {category.name}
                          </h3>
                          <p className="text-sm text-white/90 drop-shadow-sm leading-relaxed font-medium line-clamp-2">
                            {category.description}
                          </p>
                          {/* Item count hidden */}
                        </div>

                        <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 bg-white/25 backdrop-blur-md rounded-full p-2 transform group-hover:rotate-45">
                          <ArrowUpRight className="h-4 w-4 text-white" />
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
