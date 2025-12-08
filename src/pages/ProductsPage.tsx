import { useState, useEffect } from "react";
import { Search, Grid, List, SlidersHorizontal } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductFilters } from "@/components/products/ProductFilters";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";


const ProductsPage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [selectedColor, setSelectedColor] = useState("All");
  const [selectedMaterial, setSelectedMaterial] = useState("All");
  const [inStockOnly, setInStockOnly] = useState(false);

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const loadProducts = async () => {
    try {
      // No data source available - set to empty array
      setProducts([]);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      // No data source available - set to empty array
      setCategories([]);
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.categories?.name === selectedCategory;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesStock = !inStockOnly || product.stock_quantity > 0;
    return matchesSearch && matchesCategory && matchesPrice && matchesStock;
  });

  const clearFilters = () => {
    setPriceRange([0, 3000]);
    setSelectedColor("All");
    setSelectedMaterial("All");
    setInStockOnly(false);
  };

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "newest":
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      default:
        return a.is_featured ? -1 : 1;
    }
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">Loading products...</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/10 to-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Banner */}
        <div className="mb-12 text-center bg-gradient-to-r from-primary/10 via-primary-glow/10 to-accent/10 rounded-3xl p-12 card-elevated animate-slide-up">
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="inline-block px-4 py-2 bg-background/80 backdrop-blur-sm rounded-full text-sm font-semibold mb-2">
              ✨ Handcrafted with Love
            </div>
            <h1 className="text-5xl md:text-6xl font-poppins font-bold mb-4">
              Our <span className="text-gradient">Crochet Collection</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Discover our complete collection of handcrafted crochet treasures, each piece uniquely created with premium materials for lasting beauty.
            </p>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="grid lg:grid-cols-4 gap-8 mb-10">
          {/* Desktop Filters */}
          <div className="hidden lg:block">
            <ProductFilters
              priceRange={priceRange}
              onPriceChange={setPriceRange}
              selectedColor={selectedColor}
              onColorChange={setSelectedColor}
              selectedMaterial={selectedMaterial}
              onMaterialChange={setSelectedMaterial}
              inStockOnly={inStockOnly}
              onInStockChange={setInStockOnly}
              onClearFilters={clearFilters}
            />
          </div>

          <div className="lg:col-span-3 space-y-6">
            {/* Search and Controls */}
            <div className="flex flex-col md:flex-row gap-4">
              {/* Mobile Filters */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden h-12 glass-effect border-2">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <ProductFilters
                      priceRange={priceRange}
                      onPriceChange={setPriceRange}
                      selectedColor={selectedColor}
                      onColorChange={setSelectedColor}
                      selectedMaterial={selectedMaterial}
                      onMaterialChange={setSelectedMaterial}
                      inStockOnly={inStockOnly}
                      onInStockChange={setInStockOnly}
                      onClearFilters={clearFilters}
                    />
                  </div>
                </SheetContent>
              </Sheet>

              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 text-muted-foreground transform -translate-y-1/2" />
                <Input
                  placeholder="Search beautiful crochet items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 text-base glass-effect border-2 focus:border-primary/50 transition-all"
                />
              </div>

              {/* Category & Sort */}
              <div className="flex items-center gap-3">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-56 h-12 glass-effect border-2 hover:border-primary/30 transition-colors">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent className="glass-effect">
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-56 h-12 glass-effect border-2 hover:border-primary/30 transition-colors">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="glass-effect">
                    <SelectItem value="featured">✨ Featured First</SelectItem>
                    <SelectItem value="newest">🆕 Newest Items</SelectItem>
                    <SelectItem value="price-low">💰 Price: Low to High</SelectItem>
                    <SelectItem value="price-high">💎 Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Toggle */}
                <div className="flex border-2 rounded-xl overflow-hidden glass-effect">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-none border-0 h-12 px-4"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-none border-0 h-12 px-4"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-8 animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <div className="flex items-center justify-between">
                <p className="text-lg text-muted-foreground">
                  Showing <span className="font-bold text-primary">{sortedProducts.length}</span> of{" "}
                  <span className="font-bold">{products.length}</span> beautiful items
                </p>
                {sortedProducts.length > 0 && <div className="text-sm text-muted-foreground">✨ Handcrafted with love</div>}
              </div>
            </div>

            {/* Products Grid */}
            <div
              className={`grid gap-8 mb-16 ${
                viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1 lg:grid-cols-2"
              }`}
            >
              {sortedProducts.map((product, index) => (
                <a
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="block animate-fade-in transform-gpu hover:scale-[1.02] transition"
                  style={{ animationDelay: `${index * 0.1 + 0.7}s` }}
                >
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    originalPrice={
                      product.name === "Mini daisy pot"
                        ? 350
                        : product.name === "Mini Rose Bouquet keychain (Purple)"
                        ? 350
                        : undefined
                    }
                    discountPercentage={
                      product.name === "Mini daisy pot" || product.name === "Mini Rose Bouquet keychain (Purple)" ? 14 : undefined
                    }
                    image={product.image_url}
                    rating={5}
                    reviewCount={Math.floor(Math.random() * 50) + 1}
                    isNew={new Date(product.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)}
                    isFeatured={product.is_featured}
                    category={product.categories?.name || "Crochet"}
                  />
                </a>
              ))}
            </div>

            {/* Empty State */}
            {sortedProducts.length === 0 && (
              <div className="text-center py-20 animate-bounce-in">
                <div className="mb-6">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center mb-6">
                    <div className="text-6xl">🧶</div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3">No crochet treasures found</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  We couldn't find any items matching your search. Try adjusting your filters or search terms.
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                  }}
                  className="button-primary px-8 py-3 text-lg font-semibold"
                  size="lg"
                >
                  ✨ Show All Products
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductsPage;

