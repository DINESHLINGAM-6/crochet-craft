import { useState } from "react";
import { Search, Filter, Grid, List } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/products/ProductCard";

const mockProducts = [
  { id: "1", name: "Crocheted Baby Blanket", price: 45.99, image: "/src/assets/product-1.jpg", rating: 4.8, reviewCount: 124, category: "Baby Items" },
  { id: "2", name: "Handmade Crochet Scarf", price: 28.99, image: "/src/assets/product-2.jpg", rating: 4.9, reviewCount: 89, category: "Clothing" },
  { id: "3", name: "Crochet Flower Bouquet", price: 35.99, image: "/src/assets/product-3.jpg", rating: 4.7, reviewCount: 67, category: "Home Decor" },
  { id: "4", name: "Amigurumi Teddy Bear", price: 22.99, image: "/src/assets/product-4.jpg", rating: 4.6, reviewCount: 45, category: "Toys" },
];

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-poppins font-bold mb-4 text-gradient">
            Search Crochet Treasures
          </h1>
          <p className="text-muted-foreground mb-6">
            Discover beautiful handcrafted crochet items made with love
          </p>
          
          {/* Search Bar */}
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search for crochet items, patterns, accessories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <Button variant="outline" size="lg">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* View Toggle */}
          <div className="flex justify-between items-center">
            <p className="text-muted-foreground">
              {filteredProducts.length} products found
            </p>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className={`grid gap-6 animate-slide-up ${
          viewMode === "grid" 
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
            : "grid-cols-1"
        }`}>
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <p className="text-muted-foreground text-lg mb-4">
              No crochet items found matching "{searchTerm}"
            </p>
            <Button variant="outline" onClick={() => setSearchTerm("")}>
              Clear search
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default SearchPage;