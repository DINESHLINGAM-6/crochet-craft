import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/ProductCard";
import { Link } from "react-router-dom";

// Import product images
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";

// Mock product data - In real app, this would come from API
const featuredProducts = [
  {
    id: "1",
    name: "Cozy Crocheted Baby Blanket",
    price: 45.99,
    originalPrice: 65.00,
    image: product1,
    rating: 4.9,
    reviewCount: 156,
    category: "Baby Items",
    isNew: true,
    isFeatured: true,
  },
  {
    id: "2", 
    name: "Handmade Crochet Scarf",
    price: 28.99,
    image: product2,
    rating: 4.8,
    reviewCount: 89,
    category: "Clothing",
    isFeatured: true,
  },
  {
    id: "3",
    name: "Crochet Flower Bouquet",
    price: 35.99,
    image: product3,
    rating: 4.7,
    reviewCount: 73,
    category: "Home Decor",
    isNew: true,
  },
  {
    id: "4",
    name: "Amigurumi Teddy Bear",
    price: 22.99,
    image: product4,
    rating: 4.6,
    reviewCount: 92,
    category: "Toys",
    isFeatured: true,
  },
];

export const FeaturedProducts = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-gradient mb-4">
            Featured Crochet Items
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our most loved crochet creations, each piece lovingly handcrafted with premium yarns and attention to detail that makes every item truly special.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {featuredProducts.map((product, index) => (
            <div 
              key={product.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link to="/products">
            <Button variant="elegant" size="lg" className="shadow-lg">
              View All Products
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};