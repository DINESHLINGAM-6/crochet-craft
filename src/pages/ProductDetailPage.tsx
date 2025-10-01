import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductReviews } from "@/components/products/ProductReviews";
import { Star, Heart, ShoppingCart, Minus, Plus, ArrowLeft, Truck, Shield, RefreshCw } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
      loadRelatedProducts();
    }
  }, [id]);

  const loadProduct = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*, categories(name)')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      setProduct(data);
    } catch (error) {
      console.error('Error loading product:', error);
      toast({
        title: "Error",
        description: "Product not found",
        variant: "destructive"
      });
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  const loadRelatedProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*, categories(name)')
        .eq('is_active', true)
        .neq('id', id)
        .limit(4);
      
      if (error) throw error;
      setRelatedProducts(data || []);
    } catch (error) {
      console.error('Error loading related products:', error);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    
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
    handleAddToCart();
    navigate('/cart');
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
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product not found</h1>
            <Button onClick={() => navigate('/products')}>
              Back to Products
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
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
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 bg-background/80 hover:bg-background backdrop-blur-sm"
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
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
                {product.categories?.name}
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
                      className="h-5 w-5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <span className="text-muted-foreground">(127 reviews)</span>
              </div>

              <div className="flex items-baseline gap-4 mb-6">
                <p className="text-5xl font-bold text-primary">
                  ₹{product.price.toLocaleString()}
                </p>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-poppins font-semibold text-lg mb-3">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description || "This beautiful handcrafted crochet item is made with love and attention to detail. Each piece is unique and perfect for adding a personal touch to your home or wardrobe. Made with premium quality yarn for lasting beauty."}
              </p>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Availability</p>
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${product.stock_quantity > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className="font-semibold">
                    {product.stock_quantity > 0 ? `${product.stock_quantity} in stock` : 'Out of stock'}
                  </span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Material</p>
                <p className="font-semibold">Premium Acrylic Yarn</p>
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
                  onClick={handleAddToCart}
                  disabled={product.stock_quantity <= 0}
                  variant="outline"
                  className="flex-1 h-14 text-base font-semibold border-2 hover:border-primary/50"
                  size="lg"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button 
                  onClick={handleBuyNow}
                  disabled={product.stock_quantity <= 0}
                  className="flex-1 h-14 text-base font-semibold button-primary"
                  size="lg"
                >
                  Buy Now
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
                      <p>• Express delivery: 2-3 business days (additional charges apply)</p>
                      <p>• All orders are dispatched within 24 hours</p>
                      <p>• Track your order with the tracking number sent via email</p>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="font-poppins font-bold text-xl mb-4">Return Policy</h3>
                    <div className="space-y-4 text-muted-foreground">
                      <p>• 7-day easy return policy</p>
                      <p>• Items must be unused and in original packaging</p>
                      <p>• Full refund on approved returns</p>
                      <p>• Contact customer support for return initiation</p>
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
                  image={relatedProduct.image_url}
                  rating={5}
                  reviewCount={Math.floor(Math.random() * 50) + 1}
                  isNew={new Date(relatedProduct.created_at) > new Date(Date.now() - 30*24*60*60*1000)}
                  isFeatured={relatedProduct.is_featured}
                  category={relatedProduct.categories?.name || 'Crochet'}
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

export default ProductDetailPage;
