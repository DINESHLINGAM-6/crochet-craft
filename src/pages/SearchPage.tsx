import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/ProductCard";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { products as mockProducts } from "@/data/mockData";
import { Link } from "react-router-dom";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Auto-focus logic can be added here if needed, or by using 'autoFocus' prop on Input

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }

    const timer = setTimeout(() => {
        const results = mockProducts.filter(product => 
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
        setHasSearched(true);
    }, 300); // Debounce

    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <div className="min-h-screen flex flex-col bg-background font-inter">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-8 animate-slide-up">
            <div className="text-center space-y-4">
                <h1 className="text-3xl md:text-4xl font-poppins font-bold text-foreground">
                    Find Your Treasure
                </h1>
                <p className="text-muted-foreground">
                    Search for specific flowers, accessories, or gifts
                </p>
            </div>

            <div className="relative">
                <Search className="absolute left-4 top-1/2 h-6 w-6 text-muted-foreground transform -translate-y-1/2" />
                <Input
                    autoFocus
                    placeholder="Type to search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-14 h-16 text-xl rounded-[1.5rem] shadow-soft border-primary/20 focus:border-primary focus:ring-4 focus:ring-primary/5 bg-white transition-all"
                />
            </div>

            {hasSearched && (
                <div className="space-y-6">
                    <p className="text-muted-foreground">
                        Found <span className="font-semibold text-foreground">{searchResults.length}</span> results for "{searchTerm}"
                    </p>

                    {searchResults.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {searchResults.map((product, index) => (
                                <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
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
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-muted/20 rounded-[2rem]">
                            <p className="text-lg font-medium text-foreground mb-2">No matches found</p>
                            <p className="text-muted-foreground mb-6">Try checking your spelling or use different keywords.</p>
                            <Link to="/products">
                                <Button className="button-primary">Browse All Products</Button>
                            </Link>
                        </div>
                    )}
                </div>
            )}
            
            {!hasSearched && (
                 <div className="pt-8">
                    <h3 className="font-semibold text-foreground mb-4">Popular Searches</h3>
                    <div className="flex flex-wrap gap-3">
                        {['Rose Bouquet', 'Bag Charm', 'Sunflower', 'Keychains', 'Gift Set'].map(tag => (
                            <button 
                                key={tag}
                                onClick={() => setSearchTerm(tag)}
                                className="px-4 py-2 bg-white border border-border rounded-full text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                 </div>
            )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SearchPage;