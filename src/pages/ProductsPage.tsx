import { useState } from "react";
import { Search, Filter, Grid, List } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Import product images
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";

// Expanded product data
const allProducts = [
  {
    id: "1",
    name: "Handwoven Crochet Sunflower Bouquet",
    price: 1299,
    originalPrice: 1599,
    image: product1,
    rating: 5,
    reviewCount: 24,
    category: "Home Décor",
    isNew: true,
    isFeatured: true,
  },
  {
    id: "2",
    name: "Artisan Ceramic Bowl Set",
    price: 899,
    image: product2,
    rating: 4,
    reviewCount: 18,
    category: "Pottery",
    isFeatured: true,
  },
  {
    id: "3",
    name: "Hand-knitted Wool Scarf",
    price: 549,
    originalPrice: 699,
    image: product3,
    rating: 5,
    reviewCount: 31,
    category: "Textiles",
    isNew: true,
  },
  {
    id: "4",
    name: "Wooden Cutting Board Collection",
    price: 1199,
    image: product4,
    rating: 4,
    reviewCount: 12,
    category: "Woodwork",
    isFeatured: true,
  },
  {
    id: "5",
    name: "Macramé Wall Hanging",
    price: 799,
    originalPrice: 999,
    image: product1,
    rating: 5,
    reviewCount: 27,
    category: "Wall Art",
  },
  {
    id: "6",
    name: "Handmade Soap Gift Set",
    price: 449,
    image: product2,
    rating: 4,
    reviewCount: 15,
    category: "Bath & Body",
    isNew: true,
  },
  {
    id: "7",
    name: "Ceramic Tea Set",
    price: 1599,
    image: product3,
    rating: 5,
    reviewCount: 33,
    category: "Pottery",
  },
  {
    id: "8",
    name: "Woven Basket Collection",
    price: 699,
    originalPrice: 899,
    image: product4,
    rating: 4,
    reviewCount: 22,
    category: "Home Décor",
    isNew: true,
  },
];

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const categories = ["all", "Home Décor", "Pottery", "Textiles", "Woodwork", "Wall Art", "Bath & Body"];
  
  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return a.isNew ? -1 : 1;
      default:
        return a.isFeatured ? -1 : 1;
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-4">
            Our <span className="text-gradient">Products</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Discover our complete collection of handcrafted treasures, each piece uniquely created by skilled artisans.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>

              {/* View Toggle */}
              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {sortedProducts.length} of {allProducts.length} products
          </p>
        </div>

        {/* Products Grid */}
        <div className={`grid gap-6 mb-12 ${
          viewMode === "grid" 
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
            : "grid-cols-1 lg:grid-cols-2"
        }`}>
          {sortedProducts.map((product, index) => (
            <div 
              key={product.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filter criteria
            </p>
            <Button 
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductsPage;