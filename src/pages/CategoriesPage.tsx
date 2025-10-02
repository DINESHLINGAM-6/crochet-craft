import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// Images
import bagCharmImg from "@/assets/bag-charm-bow.jpg";
import blanketBouquetImg from "@/assets/red-rose-bouquet.jpg";
import bookLoversImg from "@/assets/book-sleeve-daisy.jpg";
import carHangingImg from "@/assets/car-hanging-bird.jpg";

// Dummy categories data (replace with DB later)
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

export default function CategoriesPage() {
  const [search, setSearch] = useState("");

  // filter categories by search
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section
      className={cn(
        "py-20 px-4 min-h-screen relative overflow-hidden",
        "bg-gradient-to-br from-pink-100 via-purple-100 to-yellow-100"
      )}
    >
      {/* Decorative background blobs */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-pink-300 opacity-30 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-purple-300 opacity-30 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-yellow-200 opacity-20 rounded-full blur-2xl -z-10 animate-pulse" />

      <div className="container mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-4">
            Explore{" "}
            <span className="text-gradient bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 bg-clip-text text-transparent">
              Crochet Categories
            </span>{" "}
            <br />
            <span className="block text-lg font-normal mt-2 text-purple-700">
              and discover unique, handcrafted creations for every style and
              occasion!
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse our wide range of handcrafted crochet collections. Find the
            perfect gift, decoration, or personal favorite.
          </p>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search categories..."
              className="pl-10 bg-white/80 border-2 border-pink-200 focus:border-purple-400 transition"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex gap-3">
            {/* Example filter buttons */}
            <button className="px-4 py-2 text-sm font-medium rounded-full border border-pink-300 bg-pink-100 hover:bg-pink-200 text-pink-700 transition shadow">
              All
            </button>
            <button className="px-4 py-2 text-sm font-medium rounded-full border border-purple-300 bg-purple-100 hover:bg-purple-200 text-purple-700 transition shadow">
              Popular
            </button>
            <button className="px-4 py-2 text-sm font-medium rounded-full border border-yellow-300 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 transition shadow">
              Newest
            </button>
          </div>
        </div>

        {/* Categories Grid */}
        {filteredCategories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredCategories.map((category, index) => (
              <Link key={category.id} to={`/products?category=${category.id}`}>
                <Card
                  className={cn(
                    "group cursor-pointer border-0 overflow-hidden relative rounded-2xl shadow-xl hover:shadow-2xl transition",
                    "animate-fade-in shimmer bg-white/90"
                  )}
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <CardContent className="p-0">
                    {/* Image */}
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                      />
                      {/* Gradient */}
                      <div
                        className={cn(
                          "absolute inset-0 bg-gradient-to-t opacity-60 group-hover:opacity-80 transition-all duration-500",
                          category.color
                        )}
                      />
                      {/* Info */}
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
        ) : (
          <p className="text-center text-muted-foreground text-lg mt-20">
            No categories found matching{" "}
            <span className="font-medium">"{search}"</span>.
          </p>
        )}
      </div>
    </section>
  );
}
