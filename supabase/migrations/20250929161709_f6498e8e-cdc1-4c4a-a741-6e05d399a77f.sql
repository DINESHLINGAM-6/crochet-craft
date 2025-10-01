-- Clear existing data and add real crochet categories and products

-- First clear existing data
DELETE FROM order_items;
DELETE FROM orders;
DELETE FROM products;
DELETE FROM categories;

-- Add real crochet categories
INSERT INTO categories (id, name, description, image_url) VALUES 
('550e8400-e29b-41d4-a716-446655440001', 'Bag Charms', 'Adorable crochet charms and accessories for bags', '/src/assets/bag-charm-bow.jpg'),
('550e8400-e29b-41d4-a716-446655440002', 'Blanket Bouquets', 'Beautiful crocheted flower bouquets and arrangements', '/src/assets/red-rose-bouquet.jpg'),
('550e8400-e29b-41d4-a716-446655440003', 'Book Lovers', 'Cozy book sleeves and literary accessories', '/src/assets/book-sleeve-daisy.jpg'),
('550e8400-e29b-41d4-a716-446655440004', 'Car Hangings', 'Cute hanging decorations for your car', '/src/assets/car-hanging-bird.jpg');

-- Add real crochet products
INSERT INTO products (id, name, description, price, image_url, category_id, is_featured, stock_quantity) VALUES 
-- Bag Charms
('650e8400-e29b-41d4-a716-446655440001', 'Blue Aura Bag (Random Charms)', 'Beautiful blue bag with assorted crochet charms', 1500, '/src/assets/bag-charm-bow.jpg', '550e8400-e29b-41d4-a716-446655440001', true, 10),
('650e8400-e29b-41d4-a716-446655440002', 'Bow Bag', 'Elegant crochet bow design bag', 1200, '/src/assets/bag-charm-bow.jpg', '550e8400-e29b-41d4-a716-446655440001', true, 15),
('650e8400-e29b-41d4-a716-446655440003', 'Bow Bag charm', 'Cute bow-shaped bag charm', 250, '/src/assets/bag-charm-bow.jpg', '550e8400-e29b-41d4-a716-446655440001', false, 25),

-- Home & Kitchen
('650e8400-e29b-41d4-a716-446655440004', 'Daisy Coaster Pot', 'Handcrafted daisy coaster with pot', 600, '/src/assets/book-sleeve-daisy.jpg', '550e8400-e29b-41d4-a716-446655440003', false, 20),
('650e8400-e29b-41d4-a716-446655440005', 'Daisy Flower Keychain', 'Delicate daisy keychain', 250, '/src/assets/book-sleeve-daisy.jpg', '550e8400-e29b-41d4-a716-446655440001', false, 30),

-- Bouquets
('650e8400-e29b-41d4-a716-446655440006', 'Dual Sunflower Bouquet', 'Bright sunflower bouquet pair', 450, '/src/assets/red-rose-bouquet.jpg', '550e8400-e29b-41d4-a716-446655440002', false, 8),
('650e8400-e29b-41d4-a716-446655440007', 'Giant Rose Bouquet', 'Large romantic rose bouquet', 2400, '/src/assets/red-rose-bouquet.jpg', '550e8400-e29b-41d4-a716-446655440002', true, 5),
('650e8400-e29b-41d4-a716-446655440008', 'Giant sunflower bouquet', 'Spectacular giant sunflower arrangement', 1500, '/src/assets/red-rose-bouquet.jpg', '550e8400-e29b-41d4-a716-446655440002', true, 6),
('650e8400-e29b-41d4-a716-446655440009', 'Lily Baby breath Bouquet', 'Elegant lily and baby breath combination', 1500, '/src/assets/red-rose-bouquet.jpg', '550e8400-e29b-41d4-a716-446655440002', false, 7),
('650e8400-e29b-41d4-a716-446655440010', 'Lotus Gajra', 'Traditional lotus flower gajra', 750, '/src/assets/red-rose-bouquet.jpg', '550e8400-e29b-41d4-a716-446655440002', false, 12),

-- Book Lovers
('650e8400-e29b-41d4-a716-446655440011', 'Floral Book Sleeve', 'Protective floral book cover', 850, '/src/assets/book-sleeve-daisy.jpg', '550e8400-e29b-41d4-a716-446655440003', true, 15),

-- Keychains
('650e8400-e29b-41d4-a716-446655440012', 'Mini Bouquet Rose keychain', 'Tiny rose bouquet keychain', 350, '/src/assets/red-rose-bouquet.jpg', '550e8400-e29b-41d4-a716-446655440001', false, 40),
('650e8400-e29b-41d4-a716-446655440013', 'Mini Rose Bouquet keychain (Purple)', 'Purple mini rose keychain', 300, '/src/assets/red-rose-bouquet.jpg', '550e8400-e29b-41d4-a716-446655440001', false, 35),
('650e8400-e29b-41d4-a716-446655440014', 'rainbow keychain', 'Colorful rainbow keychain', 300, '/src/assets/car-hanging-bird.jpg', '550e8400-e29b-41d4-a716-446655440001', false, 25),
('650e8400-e29b-41d4-a716-446655440015', 'Strawberry keychain', 'Sweet strawberry keychain', 250, '/src/assets/car-hanging-bird.jpg', '550e8400-e29b-41d4-a716-446655440001', false, 30),

-- Pots & Decor
('650e8400-e29b-41d4-a716-446655440016', 'Mini daisy pot', 'Adorable mini daisy in pot', 300, '/src/assets/book-sleeve-daisy.jpg', '550e8400-e29b-41d4-a716-446655440003', false, 20),
('650e8400-e29b-41d4-a716-446655440017', 'Mini Roses Pot', 'Small roses arrangement in pot', 600, '/src/assets/red-rose-bouquet.jpg', '550e8400-e29b-41d4-a716-446655440003', false, 15),
('650e8400-e29b-41d4-a716-446655440018', 'Rose Coaster with Pot', 'Rose-themed coaster and pot set', 600, '/src/assets/red-rose-bouquet.jpg', '550e8400-e29b-41d4-a716-446655440003', false, 18),
('650e8400-e29b-41d4-a716-446655440019', 'Sunflower Desk Pot', 'Bright sunflower for your desk', 450, '/src/assets/book-sleeve-daisy.jpg', '550e8400-e29b-41d4-a716-446655440003', false, 22),

-- Individual Flowers
('650e8400-e29b-41d4-a716-446655440020', 'Pink Rose', 'Single beautiful pink rose', 200, '/src/assets/red-rose-bouquet.jpg', '550e8400-e29b-41d4-a716-446655440002', false, 50),
('650e8400-e29b-41d4-a716-446655440021', 'Red Rose', 'Classic single red rose', 200, '/src/assets/red-rose-bouquet.jpg', '550e8400-e29b-41d4-a716-446655440002', false, 50),
('650e8400-e29b-41d4-a716-446655440022', 'Sunflower Bouquet', 'Cheerful sunflower arrangement', 250, '/src/assets/red-rose-bouquet.jpg', '550e8400-e29b-41d4-a716-446655440002', false, 25),

-- Special Items
('650e8400-e29b-41d4-a716-446655440023', 'Pink rose Bouquet Blanket', 'Large rose bouquet blanket', 2999, '/src/assets/red-rose-bouquet.jpg', '550e8400-e29b-41d4-a716-446655440002', true, 3),
('650e8400-e29b-41d4-a716-446655440024', 'Reversible Bouquet Doll', 'Unique reversible doll design', 800, '/src/assets/red-rose-bouquet.jpg', '550e8400-e29b-41d4-a716-446655440002', false, 10),
('650e8400-e29b-41d4-a716-446655440025', 'Rose Bouquet (8 inches)', 'Perfect 8-inch rose bouquet', 800, '/src/assets/red-rose-bouquet.jpg', '550e8400-e29b-41d4-a716-446655440002', false, 12),
('650e8400-e29b-41d4-a716-446655440026', 'Rose Tote Bag', 'Stylish tote bag with rose design', 1800, '/src/assets/bag-charm-bow.jpg', '550e8400-e29b-41d4-a716-446655440001', true, 8),
('650e8400-e29b-41d4-a716-446655440027', 'Sunflower Hairpin', 'Beautiful sunflower hair accessory', 300, '/src/assets/book-sleeve-daisy.jpg', '550e8400-e29b-41d4-a716-446655440001', false, 25);