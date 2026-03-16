import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { PageWrapper } from "@/components/layout/PageWrapper";

const CartPage = () => {
  const { items, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <PageWrapper className="flex-1 container mx-auto px-4 pt-24 pb-8">
          <div className="text-center py-16">
            <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
            <p className="text-muted-foreground mb-6">
              Add some beautiful crochet items to get started!
            </p>
            <Link to="/products">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        </PageWrapper>
        <Footer />
      </div>
    );
  }

  const handleCheckoutWhatsApp = () => {
    let msg = `Hi! I would like to place an order for the following items:\n\n`;
    items.forEach((item, index) => {
      // Use the direct image URL instead of the localhost link so WhatsApp can show a preview
      msg += `${index + 1}. *${item.name}* (x${item.quantity}) - ₹${(item.price * item.quantity).toLocaleString("en-IN")}\n   Image: ${item.image_url}\n`;
    });
    msg += `\n*Subtotal:* ₹${totalPrice.toLocaleString("en-IN")}`;
    msg += `\n*Shipping:* ₹90`;
    msg += `\n*Total:* ₹${(totalPrice + 90).toLocaleString("en-IN")}\n\n`;
    msg += `Please let me know the payment details and next steps. Thank you!`;

    window.open(`https://wa.me/919840548758?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <PageWrapper className="flex-1 container mx-auto px-4 pt-24 pb-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart ({totalItems} items)</h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <img 
                      src={item.image_url} 
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-primary font-bold">₹{item.price.toLocaleString("en-IN")}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="px-3 py-1 border rounded">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{totalPrice.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₹90</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{(totalPrice + 90).toLocaleString("en-IN")}</span>
                </div>
              </div>
              <div className="space-y-3 pt-4">
                <Button className="w-full" size="lg" onClick={handleCheckoutWhatsApp}>
                  Checkout via WhatsApp
                </Button>
                <Link to="/products" className="block">
                  <Button variant="outline" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </PageWrapper>
      <Footer />
    </div>
  );
};

export default CartPage;