-- Create categories table
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category_id UUID REFERENCES public.categories(id),
  image_url TEXT,
  images TEXT[], -- Array of image URLs
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  shipping_address TEXT NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  payment_method TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create order_items table
CREATE TABLE public.order_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id),
  quantity INTEGER NOT NULL,
  price_per_item DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user roles enum and table
CREATE TYPE public.app_role AS ENUM ('admin', 'customer');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

-- Enable Row Level Security
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for public read access
CREATE POLICY "Categories are viewable by everyone" 
ON public.categories FOR SELECT USING (true);

CREATE POLICY "Products are viewable by everyone" 
ON public.products FOR SELECT USING (is_active = true);

CREATE POLICY "Orders are viewable by owner" 
ON public.orders FOR SELECT USING (user_id = auth.uid() OR user_id IS NULL);

CREATE POLICY "Order items are viewable by order owner" 
ON public.order_items FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.orders 
    WHERE orders.id = order_items.order_id 
    AND (orders.user_id = auth.uid() OR orders.user_id IS NULL)
  )
);

-- Admin policies (will need admin role function)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Admin policies for managing data
CREATE POLICY "Admins can manage categories" 
ON public.categories FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage products" 
ON public.products FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can view all orders" 
ON public.orders FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can view all order items" 
ON public.order_items FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Customer policies
CREATE POLICY "Customers can create orders" 
ON public.orders FOR INSERT WITH CHECK (true);

CREATE POLICY "Customers can create order items" 
ON public.order_items FOR INSERT WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON public.categories
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data
INSERT INTO public.categories (name, description, image_url) VALUES
('Crochet Clothing', 'Handmade crochet sweaters, cardigans, and tops', '/src/assets/category-textiles.jpg'),
('Amigurumi & Toys', 'Cute crochet dolls and stuffed animals', '/src/assets/category-pottery.jpg'),
('Home Decor', 'Crochet blankets, pillows, and decorative items', '/src/assets/category-woodwork.jpg'),
('Accessories', 'Crochet bags, hats, and jewelry', '/src/assets/category-jewelry.jpg');

INSERT INTO public.products (name, description, price, category_id, image_url, images, stock_quantity, is_featured) VALUES
('Handmade Crochet Sweater', 'Cozy wool sweater perfect for winter', 89.99, (SELECT id FROM public.categories WHERE name = 'Crochet Clothing'), '/src/assets/product-1.jpg', ARRAY['/src/assets/product-1.jpg'], 10, true),
('Cute Crochet Bear', 'Adorable amigurumi teddy bear for children', 24.99, (SELECT id FROM public.categories WHERE name = 'Amigurumi & Toys'), '/src/assets/product-2.jpg', ARRAY['/src/assets/product-2.jpg'], 15, true),
('Granny Square Blanket', 'Colorful handmade blanket for your home', 75.50, (SELECT id FROM public.categories WHERE name = 'Home Decor'), '/src/assets/product-3.jpg', ARRAY['/src/assets/product-3.jpg'], 8, true),
('Crochet Tote Bag', 'Stylish and durable everyday bag', 34.99, (SELECT id FROM public.categories WHERE name = 'Accessories'), '/src/assets/product-4.jpg', ARRAY['/src/assets/product-4.jpg'], 12, false);