import { useState } from "react";
import { 
  Package, 
  Plus, 
  Edit3, 
  Trash2, 
  Users, 
  ShoppingCart, 
  DollarSign,
  TrendingUp,
  Upload,
  Save
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Import product images
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";

// Mock data
const mockProducts = [
  {
    id: "1",
    name: "Handwoven Crochet Sunflower Bouquet",
    price: 1299,
    category: "Home Décor",
    stock: 15,
    status: "active",
    image: product1,
  },
  {
    id: "2", 
    name: "Artisan Ceramic Bowl Set",
    price: 899,
    category: "Pottery",
    stock: 8,
    status: "active",
    image: product2,
  },
];

const mockOrders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    date: "2024-09-25",
    total: 2598,
    status: "pending",
    items: 3,
  },
  {
    id: "ORD-002",
    customer: "Jane Smith", 
    date: "2024-09-24",
    total: 1299,
    status: "completed",
    items: 1,
  },
];

const AdminDashboard = () => {
  const [products, setProducts] = useState(mockProducts);
  const [orders, setOrders] = useState(mockOrders);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    description: "",
    image: null as File | null,
  });

  // Analytics data
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const completedOrders = orders.filter(order => order.status === "completed").length;

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) return;

    const product = {
      id: Date.now().toString(),
      name: newProduct.name,
      price: parseInt(newProduct.price),
      category: newProduct.category,
      stock: parseInt(newProduct.stock) || 0,
      status: "active" as const,
      image: product1, // In real app, would upload image
    };

    setProducts([...products, product]);
    setNewProduct({ name: "", price: "", category: "", stock: "", description: "", image: null });
    setIsAddingProduct(false);
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct({ ...product });
  };

  const handleUpdateProduct = () => {
    if (!editingProduct) return;

    setProducts(products.map(p => 
      p.id === editingProduct.id ? editingProduct : p
    ));
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const updateOrderStatus = (orderId: string, status: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status } : order
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-poppins font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your store, products, and orders
          </p>
        </div>

        <Tabs defaultValue="analytics" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="card-elevated border-0">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">₹{totalRevenue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>

              <Card className="card-elevated border-0">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{totalOrders}</div>
                  <p className="text-xs text-muted-foreground">+8% from last month</p>
                </CardContent>
              </Card>

              <Card className="card-elevated border-0">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Products</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{totalProducts}</div>
                  <p className="text-xs text-muted-foreground">Active products</p>
                </CardContent>
              </Card>

              <Card className="card-elevated border-0">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">
                    {Math.round((completedOrders / totalOrders) * 100)}%
                  </div>
                  <p className="text-xs text-muted-foreground">Order completion</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Product Management</h2>
              <Dialog open={isAddingProduct} onOpenChange={setIsAddingProduct}>
                <DialogTrigger asChild>
                  <Button variant="hero">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Product Name</Label>
                      <Input
                        id="name"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                        placeholder="Enter product name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="price">Price (₹)</Label>
                      <Input
                        id="price"
                        type="number"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                        placeholder="Enter price"
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select onValueChange={(value) => setNewProduct({...newProduct, category: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Home Décor">Home Décor</SelectItem>
                          <SelectItem value="Pottery">Pottery</SelectItem>
                          <SelectItem value="Textiles">Textiles</SelectItem>
                          <SelectItem value="Woodwork">Woodwork</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="stock">Stock Quantity</Label>
                      <Input
                        id="stock"
                        type="number"
                        value={newProduct.stock}
                        onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                        placeholder="Enter stock quantity"
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                        placeholder="Enter product description"
                      />
                    </div>
                    <Button onClick={handleAddProduct} className="w-full">
                      <Save className="h-4 w-4 mr-2" />
                      Add Product
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Products Table */}
            <Card className="card-elevated border-0">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-border/50">
                      <tr>
                        <th className="text-left p-4 font-semibold">Product</th>
                        <th className="text-left p-4 font-semibold">Category</th>
                        <th className="text-left p-4 font-semibold">Price</th>
                        <th className="text-left p-4 font-semibold">Stock</th>
                        <th className="text-left p-4 font-semibold">Status</th>
                        <th className="text-left p-4 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id} className="border-b border-border/30 hover:bg-muted/30">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-12 h-12 rounded-lg object-cover"
                              />
                              <span className="font-medium">{product.name}</span>
                            </div>
                          </td>
                          <td className="p-4">{product.category}</td>
                          <td className="p-4 font-semibold">₹{product.price.toLocaleString()}</td>
                          <td className="p-4">{product.stock}</td>
                          <td className="p-4">
                            <Badge variant={product.status === "active" ? "default" : "secondary"}>
                              {product.status}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEditProduct(product)}
                              >
                                <Edit3 className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteProduct(product.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <h2 className="text-2xl font-semibold">Order Management</h2>

            <Card className="card-elevated border-0">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-border/50">
                      <tr>
                        <th className="text-left p-4 font-semibold">Order ID</th>
                        <th className="text-left p-4 font-semibold">Customer</th>
                        <th className="text-left p-4 font-semibold">Date</th>
                        <th className="text-left p-4 font-semibold">Items</th>
                        <th className="text-left p-4 font-semibold">Total</th>
                        <th className="text-left p-4 font-semibold">Status</th>
                        <th className="text-left p-4 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id} className="border-b border-border/30 hover:bg-muted/30">
                          <td className="p-4 font-mono">{order.id}</td>
                          <td className="p-4">{order.customer}</td>
                          <td className="p-4">{order.date}</td>
                          <td className="p-4">{order.items}</td>
                          <td className="p-4 font-semibold">₹{order.total.toLocaleString()}</td>
                          <td className="p-4">
                            <Badge variant={
                              order.status === "completed" ? "default" : 
                              order.status === "pending" ? "secondary" : "destructive"
                            }>
                              {order.status}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <Select onValueChange={(status) => updateOrderStatus(order.id, status)}>
                              <SelectTrigger className="w-32">
                                <SelectValue placeholder="Update" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="processing">Processing</SelectItem>
                                <SelectItem value="shipped">Shipped</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-semibold">Store Settings</h2>
            
            <Card className="card-elevated border-0">
              <CardHeader>
                <CardTitle>Store Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="store-name">Store Name</Label>
                  <Input id="store-name" defaultValue="Artisan Marketplace" />
                </div>
                <div>
                  <Label htmlFor="store-email">Store Email</Label>
                  <Input id="store-email" type="email" defaultValue="hello@artisan.com" />
                </div>
                <div>
                  <Label htmlFor="store-phone">Store Phone</Label>
                  <Input id="store-phone" defaultValue="+91 98765 43210" />
                </div>
                <Button variant="hero">
                  <Save className="h-4 w-4 mr-2" />
                  Save Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;