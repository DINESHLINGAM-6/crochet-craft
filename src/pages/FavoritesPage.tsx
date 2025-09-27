import { Heart, ShoppingCart } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/ProductCard";

const mockFavorites = [
  { id: "1", name: "Crocheted Baby Blanket", price: 45.99, image: "/src/assets/product-1.jpg", rating: 4.8, reviewCount: 124, category: "Baby Items" },
  { id: "3", name: "Crochet Flower Bouquet", price: 35.99, image: "/src/assets/product-3.jpg", rating: 4.7, reviewCount: 67, category: "Home Decor" },
];

const FavoritesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Favorites Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-accent/20 rounded-full">
              <Heart className="h-6 w-6 text-accent fill-current" />
            </div>
            <h1 className="text-4xl font-poppins font-bold text-gradient">
              Your Favorite Crochet Items
            </h1>
          </div>
          <p className="text-muted-foreground">
            Items you've saved for later - handpicked crochet treasures made with love
          </p>
        </div>

        {mockFavorites.length > 0 ? (
          <>
            {/* Actions Bar */}
            <div className="flex justify-between items-center mb-6 animate-slide-up">
              <p className="text-muted-foreground">
                {mockFavorites.length} items in your favorites
              </p>
              <Button variant="outline">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add All to Cart
              </Button>
            </div>

            {/* Favorites Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {mockFavorites.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-fade-in hover-lift"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ProductCard {...product} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16 animate-fade-in">
            <div className="mb-6">
              <Heart className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
              <h2 className="text-2xl font-poppins font-semibold mb-2">
                No favorites yet
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Start exploring our beautiful crochet collection and save your favorite items here
              </p>
            </div>
            <Button asChild>
              <a href="/products">Browse Crochet Collection</a>
            </Button>
          </div>
        )}

        {/* Crochet Tips Section */}
        <div className="mt-16 p-8 card-elevated rounded-lg animate-slide-up">
          <h3 className="text-2xl font-poppins font-semibold mb-4 text-gradient">
            💡 Crochet Care Tips
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Washing Your Crochet Items</h4>
              <p className="text-muted-foreground">
                Hand wash in cool water with gentle detergent. Lay flat to dry to maintain shape and texture.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Storage</h4>
              <p className="text-muted-foreground">
                Store in a clean, dry place. Fold carefully or roll to prevent creasing and stretching.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FavoritesPage;