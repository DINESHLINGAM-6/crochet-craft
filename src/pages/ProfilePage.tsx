import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { User, Package, LogOut, Edit2, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkUser();
    fetchOrders();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUser(user);
      setDisplayName(user.user_metadata?.display_name || "");
      setPhone(user.user_metadata?.phone || "");
    }
  };

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select(`
        *,
        order_items (
          *,
          products (name, image_url)
        )
      `)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setOrders(data);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const handleSaveProfile = async () => {
    const { error } = await supabase.auth.updateUser({
      data: { display_name: displayName, phone }
    });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Profile updated successfully"
      });
      setIsEditing(false);
      checkUser();
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-poppins font-bold mb-8">
            My <span className="text-gradient">Profile</span>
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Account Details */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Account Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-24 h-24 bg-gradient-to-br from-pink-500 via-purple-500 to-rose-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                      {user?.email?.charAt(0).toUpperCase()}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label>Email</Label>
                      <Input value={user?.email || ""} disabled className="mt-1" />
                    </div>

                    <div>
                      <Label>Display Name</Label>
                      <Input
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label>Phone</Label>
                      <Input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        disabled={!isEditing}
                        className="mt-1"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    {!isEditing ? (
                      <Button onClick={() => setIsEditing(true)} className="w-full" variant="outline">
                        <Edit2 className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Button>
                    ) : (
                      <>
                        <Button onClick={handleSaveProfile} className="w-full">
                          <Save className="w-4 h-4 mr-2" />
                          Save Changes
                        </Button>
                        <Button onClick={() => setIsEditing(false)} variant="outline" className="w-full">
                          Cancel
                        </Button>
                      </>
                    )}

                    <Button onClick={handleLogout} variant="destructive" className="w-full">
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order History */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Order History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {orders.length === 0 ? (
                    <div className="text-center py-12">
                      <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                      <p className="text-lg text-muted-foreground">No orders yet</p>
                      <Button onClick={() => navigate("/products")} className="mt-4">
                        Start Shopping
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div key={order.id} className="border rounded-lg p-4 hover:shadow-md transition">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <p className="font-semibold">Order #{order.id.slice(0, 8)}</p>
                              <p className="text-sm text-muted-foreground">{formatDate(order.created_at)}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-lg">₹{order.total_amount}</p>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                order.status === "completed" ? "bg-green-100 text-green-700" :
                                order.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                                "bg-gray-100 text-gray-700"
                              }`}>
                                {order.status.toUpperCase()}
                              </span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            {order.order_items?.map((item: any) => (
                              <div key={item.id} className="flex gap-3 items-center">
                                {item.products?.image_url && (
                                  <img
                                    src={item.products.image_url}
                                    alt={item.products.name}
                                    className="w-12 h-12 object-cover rounded"
                                  />
                                )}
                                <div className="flex-1">
                                  <p className="text-sm font-medium">{item.products?.name}</p>
                                  <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                                </div>
                                <p className="text-sm font-semibold">₹{item.price_per_item}</p>
                              </div>
                            ))}
                          </div>

                          <Separator className="my-3" />

                          <div className="text-sm text-muted-foreground">
                            <p><strong>Ship to:</strong> {order.shipping_address}</p>
                            <p><strong>Contact:</strong> {order.customer_phone || order.customer_email}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
