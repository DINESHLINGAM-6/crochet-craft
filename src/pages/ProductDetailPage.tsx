
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductReviews } from "@/components/products/ProductReviews";
import { Star, Heart, ShoppingCart, Minus, Plus, ArrowLeft, Truck, Shield, RefreshCw, MessageCircle } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { products as mockProducts, categories as mockCategories } from "@/data/mockData";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    try {
      // Find from mock data
      const foundProduct = mockProducts.find(p => p.id === id);
      
      if (foundProduct) {
        setProduct(foundProduct);
        // Find related products (same category)
        const related = mockProducts
          .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
          .slice(0, 4);
        setRelatedProducts(related);
      } else {
        toast({
          title: "Product not found",
          description: "We couldn't find the product you're looking for.",
          variant: "destructive"
        });
        navigate('/products');
      }
    } catch (error) {
      console.error('Error loading product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    // For WhatsApp-centric site, regular cart might be secondary, 
    // but we can still keep it or just redirect to WhatsApp.
    // User requested "redirect to whatsapp". 
    // We'll keep cart for "Add to Cart" and WhatsApp for "Buy Now" as per conventions,
    // OR just open WhatsApp for both.
    // Getting cart functionality working with WhatsApp is complex (requires sending whole cart).
    // Let's assume Add to Cart adds to local cart context, and Buy Now opens WhatsApp.
    
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image_url: product.image_url
      });
    }
    
    toast({
      title: "Added to cart!",
      description: `${quantity} ${product.name} added to your cart`
    });
  };

  const handleBuyNow = () => {
    if (!product) return;
    const phoneNumber = "919876543210"; 
    const message = `Hi, I'm interested in purchasing *${product.name}* (Qty: ${quantity}) for ₹${product.price * quantity}. Could you please provide more details?`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
          <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return null; // Will redirect
  }

  const images = product.images || [product.image_url];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/20">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/products')}
          className="mb-8 hover-lift"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>

        {/* Product Details */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16 animate-fade-in">
          {/* Product Images */}
          <div className="space-y-4">
            <Card className="overflow-hidden card-elevated border-0">
              <CardContent className="p-0">
                <div className="aspect-square overflow-hidden relative group">
                  <img 
                    src={images[selectedImage]} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </CardContent>
            </Card>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all hover-lift ${
                      selectedImage === idx ? 'border-primary shadow-elegant' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-3 text-sm px-3 py-1">
                {product.category}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-4 text-gradient">
                {product.name}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={cn(
                        "h-5 w-5",
                        star <= product.rating ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"
                      )}
                    />
                  ))}
                </div>
                <span className="text-muted-foreground">({product.reviews} reviews)</span>
              </div>

              <div className="flex items-baseline gap-4 mb-6">
                <p className="text-5xl font-bold text-primary">
                  ₹{product.price.toLocaleString()}
                </p>
                {product.original_price && (
                   <p className="text-xl text-muted-foreground line-through">
                      ₹{product.original_price.toLocaleString()}
                   </p>
                )}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-poppins font-semibold text-lg mb-3">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description || "This beautiful handcrafted crochet item is made with love."}
              </p>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Availability</p>
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${product.stock_quantity > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className="font-semibold">
                    {product.stock_quantity > 0 ? 'In Stock' : 'Out of stock'}
                  </span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Material</p>
                <p className="font-semibold">Premium Yarn</p>
              </div>
            </div>

            <Separator />

            {/* Quantity Selector */}
            <div className="space-y-6">
              <div>
                <h3 className="font-poppins font-semibold mb-3">Quantity</h3>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="h-12 w-12"
                  >
                    <Minus className="h-5 w-5" />
                  </Button>
                  <span className="text-2xl font-bold w-16 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={quantity >= product.stock_quantity}
                    className="h-12 w-12"
                  >
                    <Plus className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button 
                  onClick={handleBuyNow}
                  disabled={product.stock_quantity <= 0}
                  className="w-full h-14 text-lg font-medium button-primary rounded-full shadow-lg shadow-teal-700/20"
                  size="lg"
                >
                  <MessageCircle className="h-6 w-6 mr-3" />
                  Order via WhatsApp
                </Button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="text-center space-y-2">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <p className="text-xs text-muted-foreground font-medium">Free Shipping</p>
              </div>
              <div className="text-center space-y-2">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <p className="text-xs text-muted-foreground font-medium">Secure Payment</p>
              </div>
              <div className="text-center space-y-2">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <RefreshCw className="h-6 w-6 text-primary" />
                </div>
                <p className="text-xs text-muted-foreground font-medium">Easy Returns</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-16 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <Tabs defaultValue="reviews" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto h-14 glass-effect">
              <TabsTrigger value="reviews" className="text-base">Reviews</TabsTrigger>
              <TabsTrigger value="shipping" className="text-base">Shipping Info</TabsTrigger>
            </TabsList>
            <TabsContent value="reviews" className="mt-8">
              <ProductReviews />
            </TabsContent>
            <TabsContent value="shipping" className="mt-8">
              <Card className="glass-effect border-2">
                <CardContent className="pt-6 space-y-6">
                  <div>
                    <h3 className="font-poppins font-bold text-xl mb-4">Shipping Information</h3>
                    <div className="space-y-4 text-muted-foreground">
                      <p>• Free shipping on all orders above ₹999</p>
                      <p>• Standard delivery: 5-7 business days</p>
                      <p>• Express delivery: 2-3 business days</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-3xl font-poppins font-bold mb-8 text-center">
              You May Also <span className="text-gradient">Love</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  id={relatedProduct.id}
                  name={relatedProduct.name}
                  price={relatedProduct.price}
                  originalPrice={relatedProduct.original_price}
                  image={relatedProduct.image_url}
                  rating={relatedProduct.rating}
                  reviewCount={relatedProduct.reviews}
                  isNew={relatedProduct.is_new}
                  isFeatured={relatedProduct.is_featured}
                  category={relatedProduct.category}
                />
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

// Helper for 'cn' since it was used in previous code but I need to make sure I import it if I used it.
// I imported 'cn' in my previous steps, but here I seem to have forgotten to import it or define it.
// Wait, I see `className={cn(...)` used in star mapping.
// I need simple `cn` function or import it.
// `import { cn } from "@/lib/utils";` is needed.

import { cn } from "@/lib/utils";

export default ProductDetailPage;
