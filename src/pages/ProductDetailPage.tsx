import { useState } from "react";
import { useParams } from "react-router-dom";
import { Heart, Star, Minus, Plus, ShoppingCart, Share2, ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ProductCard } from "@/components/products/ProductCard";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

// Import product images
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";

// Mock product data - in real app this would come from API
const productData = {
  "1": {
    id: "1",
    name: "Handwoven Crochet Sunflower Bouquet",
    price: 1299,
    originalPrice: 1599,
    images: [product1, product2, product3],
    rating: 5,
    reviewCount: 24,
    category: "Home Décor",
    isNew: true,
    isFeatured: true,
    inStock: true,
    description: "Beautiful handcrafted crochet sunflower bouquet that brings warmth and joy to any space. Each flower is carefully crocheted using premium cotton yarn in vibrant yellow and brown colors. Perfect as a gift or home decoration that lasts forever.",
    features: [
      "Handcrafted with premium cotton yarn",
      "Fade-resistant colors",
      "Eco-friendly and sustainable",
      "Perfect gift for any occasion",
      "No maintenance required"
    ],
    specifications: {
      "Material": "100% Cotton Yarn",
      "Dimensions": "12\" H x 8\" W",
      "Care": "Spot clean only",
      "Origin": "Handmade in India"
    }
  }
};

const relatedProducts = [
  {
    id: "2",
    name: "Artisan Ceramic Bowl Set",
    price: 899,
    image: product2,
    rating: 4,
    reviewCount: 18,
    category: "Pottery",
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
  },
  {
    id: "4",
    name: "Wooden Cutting Board Collection",
    price: 1199,
    image: product4,
    rating: 4,
    reviewCount: 12,
    category: "Woodwork",
  }
];

const ProductDetailPage = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Get product data (in real app, this would be fetched based on ID)
  const product = productData[id as keyof typeof productData] || productData["1"];

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-primary transition-colors">Products</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        {/* Back Button */}
        <Link to="/products">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Button>
        </Link>

        {/* Product Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square overflow-hidden rounded-xl border border-border/50">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={cn(
                    "aspect-square w-20 rounded-lg overflow-hidden border-2 transition-colors",
                    selectedImage === index 
                      ? "border-primary" 
                      : "border-border/50 hover:border-primary/50"
                  )}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Badges */}
            <div className="flex gap-2">
              {product.isNew && (
                <Badge variant="secondary" className="bg-primary text-primary-foreground">
                  New
                </Badge>
              )}
              {product.isFeatured && (
                <Badge variant="secondary" className="bg-accent text-accent-foreground">
                  Featured
                </Badge>
              )}
              {discount > 0 && (
                <Badge variant="destructive">
                  {discount}% OFF
                </Badge>
              )}
            </div>

            {/* Product Name */}
            <h1 className="text-3xl md:text-4xl font-poppins font-bold">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={cn(
                      "h-4 w-4",
                      star <= product.rating 
                        ? "fill-amber-400 text-amber-400" 
                        : "fill-muted text-muted"
                    )}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-primary">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Features */}
            <div>
              <h3 className="font-semibold mb-3">Key Features:</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-muted-foreground">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            {/* Quantity & Actions */}
            <div className="space-y-4">
              {/* Stock Status */}
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-sm font-medium text-green-700">In Stock</span>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center border border-border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="rounded-r-none h-10"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 min-w-[60px] text-center font-medium">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    className="rounded-l-none h-10"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button size="lg" variant="hero" className="flex-1">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                >
                  <Heart className={cn(
                    "h-5 w-5",
                    isWishlisted && "fill-red-500 text-red-500"
                  )} />
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Specifications */}
            <div className="bg-muted/30 rounded-lg p-4">
              <h3 className="font-semibold mb-3">Specifications:</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-muted-foreground">{key}:</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-poppins font-bold mb-6">You might also like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} {...relatedProduct} />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetailPage;