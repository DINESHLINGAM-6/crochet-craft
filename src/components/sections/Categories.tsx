import { ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Import category images
import potteryImg from "@/assets/category-pottery.jpg";
import textilesImg from "@/assets/category-textiles.jpg";
import woodworkImg from "@/assets/category-woodwork.jpg";
import jewelryImg from "@/assets/category-jewelry.jpg";

const categories = [
  {
    id: "pottery",
    name: "Pottery & Ceramics",
    description: "Handthrown bowls, vases, and tableware",
    image: potteryImg,
    count: 45,
    color: "from-amber-100 to-orange-100",
  },
  {
    id: "textiles",
    name: "Textiles & Fabrics",
    description: "Woven scarves, bags, and home décor",
    image: textilesImg,
    count: 67,
    color: "from-green-100 to-emerald-100",
  },
  {
    id: "woodwork",
    name: "Woodwork & Furniture",
    description: "Carved sculptures and functional pieces",
    image: woodworkImg, 
    count: 29,
    color: "from-brown-100 to-amber-100",
  },
  {
    id: "jewelry",
    name: "Handmade Jewelry",
    description: "Unique pieces crafted with precious metals",
    image: jewelryImg,
    count: 82,
    color: "from-pink-100 to-rose-100",
  },
];

export const Categories = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-poppins font-bold mb-4">
            Shop by <span className="text-gradient">Category</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our diverse range of handcrafted categories, each showcasing the unique skills and traditions of our artisan partners.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Card 
              key={category.id}
              className={cn(
                "group cursor-pointer card-elevated hover-lift border-0 overflow-hidden",
                "animate-fade-in"
              )}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <CardContent className="p-0">
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img 
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-t opacity-40 group-hover:opacity-60 transition-opacity duration-300",
                    category.color
                  )} />
                  
                  {/* Category Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-poppins font-semibold mb-1 drop-shadow-sm">
                          {category.name}
                        </h3>
                        <p className="text-sm opacity-90 mb-2 drop-shadow-sm">
                          {category.description}
                        </p>
                        <span className="text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                          {category.count} items
                        </span>
                      </div>
                      
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 backdrop-blur-sm rounded-full p-2">
                        <ArrowUpRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};