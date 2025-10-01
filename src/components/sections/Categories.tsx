import { ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

// Import category images
import bagCharmImg from "@/assets/bag-charm-bow.jpg";
import blanketBouquetImg from "@/assets/red-rose-bouquet.jpg";
import bookLoversImg from "@/assets/book-sleeve-daisy.jpg";
import carHangingImg from "@/assets/car-hanging-bird.jpg";

const categories = [
  {
    id: "bag-charms",
    name: "Bag Charms",
    description: "Adorable crochet charms and accessories for your bags.",
    image: bagCharmImg,
    count: 8,
    color: "from-pink-400/40 to-rose-500/40",
  },
  {
    id: "blanket-bouquets",
    name: "Blanket Bouquets",
    description: "Beautiful crocheted flower bouquets and arrangements.",
    image: blanketBouquetImg,
    count: 15,
    color: "from-purple-400/35 to-indigo-500/40",
  },
  {
    id: "book-lovers",
    name: "Book Lovers",
    description: "Cozy book sleeves and literary crochet accessories.",
    image: bookLoversImg,
    count: 6,
    color: "from-yellow-400/40 to-orange-500/40",
  },
  {
    id: "car-hangings",
    name: "Car Hangings",
    description: "Cute hanging decorations to brighten your drives.",
    image: carHangingImg,
    count: 3,
    color: "from-green-400/40 to-emerald-500/40",
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
            Explore our crochet collection — from everyday essentials to unique handmade gifts, crafted with love and premium yarns.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <Link key={category.id} to={`/products?category=${category.id}`}>
              <Card
                className={cn(
                  "group cursor-pointer border-0 overflow-hidden relative rounded-2xl shadow-lg hover:shadow-2xl transition",
                  "animate-fade-in shimmer"
                )}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <CardContent className="p-0">
                  {/* Image Container */}
                  <div className="relative aspect-[4/5] overflow-hidden">
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
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <div className="flex items-start justify-between">
                        <div className="transform group-hover:translate-y-[-6px] transition-transform duration-300">
                          <h3 className="text-2xl font-bold mb-2 drop-shadow-lg">
                            {category.name}
                          </h3>
                          <p className="text-sm opacity-95 mb-3 drop-shadow-sm leading-relaxed">
                            {category.description}
                          </p>
                          <span className="inline-flex items-center text-xs bg-white/25 backdrop-blur-md px-3 py-1.5 rounded-full font-medium">
                            {category.count} items available
                          </span>
                        </div>

                        <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 bg-white/25 backdrop-blur-md rounded-full p-3 transform group-hover:rotate-45">
                          <ArrowUpRight className="h-5 w-5" />
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
