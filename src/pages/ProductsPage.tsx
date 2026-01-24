import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Grid, List, SlidersHorizontal, Sparkles } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductFilters } from "@/components/products/ProductFilters";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { products as mockProducts, categories as mockCategories } from "@/data/mockData";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { motion } from "framer-motion";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [selectedColor, setSelectedColor] = useState("All");
  const [selectedMaterial, setSelectedMaterial] = useState("All");
  const [inStockOnly, setInStockOnly] = useState(false);

  useEffect(() => {
    // Simulate loading for effect
    const timer = setTimeout(() => {
      setProducts(mockProducts);
      setCategories(mockCategories);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
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
        // simple ID check since IDs are numeric strings in mock data
        return parseInt(b.id) - parseInt(a.id);
      default:
        // Featured
        return (a.is_featured === b.is_featured) ? 0 : a.is_featured ? -1 : 1;
    }
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
           <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full opacity-50"></div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-[hsl(35_30%_96%)] to-background font-inter">
      <Header />

      <PageWrapper className="container mx-auto px-4 py-8">
        {/* Banner Section - Enhanced UI */}
        <div className="mb-16 relative overflow-hidden text-center bg-gradient-to-br from-[hsl(35_40%_96%)] via-white to-[hsl(35_40%_96%)] rounded-[2rem] p-12 lg:p-16 border border-border/40 shadow-soft">
           {/* Decorative Background Elements */}
           <div className="absolute top-0 left-0 w-64 h-64 bg-pink-300/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
           <div className="absolute bottom-0 right-0 w-80 h-80 bg-green-200/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
           
           <div className="relative z-10 max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-6 py-2 bg-white/60 backdrop-blur-md rounded-full text-sm font-medium text-primary shadow-sm mb-4 border border-white/50">
              <Sparkles className="h-4 w-4" />
              <span>Handcrafted with Love</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-poppins font-bold tracking-tight text-foreground leading-tight">
              Our <span className="text-primary inline-block decoration-wavy underline-offset-4">Handcrafted Collection</span>
            </h1>
            
            <p className="text-xl text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed font-light">
              Explore our boutique collection of crochet treasures. Each piece is uniquely designed and handmade with premium materials to bring joy to your life.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-10 mb-20">
          {/* Sidebar Filters - Enhanced */}
          <div className="hidden lg:block sticky top-24 h-fit space-y-6">
            <div className="bg-white/50 backdrop-blur-sm p-6 rounded-[1.5rem] border border-border/50 shadow-sm">
                <h3 className="font-poppins font-semibold text-lg mb-6 flex items-center gap-2">
                    <SlidersHorizontal className="h-5 w-5 text-primary" />
                    Filters
                </h3>
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
          </div>

          <div className="lg:col-span-3 space-y-8">
            {/* Search and Controls */}
            <div className="flex flex-col md:flex-row gap-5 p-4 bg-white/40 backdrop-blur-md rounded-[1.25rem] border border-white/60 shadow-sm">
              {/* Mobile Filters Trigger */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden h-12 rounded-xl border-2 hover:bg-white transition-all">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px] rounded-r-[1.5rem]">
                  <SheetHeader>
                    <SheetTitle className="font-poppins text-2xl">Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-8">
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
                <Search className="absolute left-4 top-1/2 h-5 w-5 text-muted-foreground/60 transform -translate-y-1/2" />
                <Input
                  placeholder="Search masterpieces..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 text-base bg-white/60 border-transparent hover:border-primary/20 focus:border-primary/50 focus:ring-2 focus:ring-primary/10 rounded-xl transition-all shadow-sm placeholder:text-muted-foreground/50"
                />
              </div>

              {/* Sort & View */}
              <div className="flex items-center gap-3 overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px] h-12 rounded-xl border-transparent bg-white/60 hover:bg-white shadow-sm transition-all focus:ring-primary/20">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-border/50 shadow-xl">
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[160px] h-12 rounded-xl border-transparent bg-white/60 hover:bg-white shadow-sm transition-all focus:ring-primary/20">
                    <SelectValue placeholder="Sort" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-border/50 shadow-xl">
                    <SelectItem value="featured">✨ Featured</SelectItem>
                    <SelectItem value="newest">🆕 Newest</SelectItem>
                    <SelectItem value="price-low">💰 Low to High</SelectItem>
                    <SelectItem value="price-high">💎 High to Low</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex bg-white/60 rounded-xl p-1 shadow-sm border border-white/60 ml-auto md:ml-0">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                    className={`h-10 w-10 rounded-lg transition-all ${viewMode === 'grid' ? 'shadow-md' : 'hover:bg-white/50'}`}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                    className={`h-10 w-10 rounded-lg transition-all ${viewMode === 'list' ? 'shadow-md' : 'hover:bg-white/50'}`}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Results Header */}
            <div className="flex items-center justify-between px-2">
                 <p className="text-muted-foreground"></p>
            </div>


            {/* Products Grid */}
            <div
              className={`grid gap-8 ${
                viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
              }`}
            >
              {sortedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    originalPrice={product.original_price}
                    image={product.image_url}
                    rating={product.rating}
                    reviewCount={product.reviews}
                    isNew={product.is_new}
                    isFeatured={product.is_featured}
                    category={product.category}
                    className="h-full"
                  />
                </motion.div>
              ))}
            </div>

            {/* Empty State - Enhanced */}
            {sortedProducts.length === 0 && (
              <div className="text-center py-32 animate-bounce-in bg-white/30 rounded-[2rem] border border-dashed border-border">
                <div className="mb-6 relative">
                   <div className="w-40 h-40 mx-auto bg-gradient-to-tr from-primary/10 to-accent/20 rounded-full flex items-center justify-center animate-pulse">
                        <div className="text-7xl">🧶</div>
                   </div>
                </div>
                <h3 className="text-3xl font-poppins font-bold mb-4 text-foreground">No treasures found</h3>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto text-lg leading-relaxed">
                  We couldn't find any items matching your current filters. Why not try clearing them to see all our beautiful creations?
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                    clearFilters();
                  }}
                  className="button-primary h-14 px-10 text-lg font-medium rounded-2xl shadow-xl shadow-primary/20"
                >
                  Clear Filters & Show All
                </Button>
              </div>
            )}
          </div>
        </div>
      </PageWrapper>

      <Footer />
    </div>
  );
};

export default ProductsPage;
