import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/ProductCard";
import { Link } from "react-router-dom";
import { products as mockProducts } from "@/data/mockData";

export const FeaturedProducts = () => {
  const featuredProducts = mockProducts.filter(p => p.is_featured).slice(0, 4);

  return (
    <section className="py-8 px-4 relative overflow-hidden">
      {/* Background Decor - Softer */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] -z-10 -translate-y-1/2 opacity-60" />
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
              />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link to="/products">
            <Button variant="default" size="lg" className="shadow-lg button-primary">
              View All Products
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};