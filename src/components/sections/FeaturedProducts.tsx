import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/ProductCard";

// Import product images
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";

// Mock product data - In real app, this would come from API
const featuredProducts = [
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
    image: product1, // Reusing for now
    rating: 5,
    reviewCount: 27,
    category: "Wall Art",
  },
  {
    id: "6",
    name: "Handmade Soap Gift Set",
    price: 449,
    image: product2, // Reusing for now
    rating: 4,
    reviewCount: 15,
    category: "Bath & Body",
    isNew: true,
  },
];

export const FeaturedProducts = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-gradient mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our most popular handcrafted items, carefully selected for their exceptional quality and unique design.
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
          <Button variant="elegant" size="lg" className="shadow-lg">
            View All Products
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};