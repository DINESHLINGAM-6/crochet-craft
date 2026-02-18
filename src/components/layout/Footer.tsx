import { Link } from "react-router-dom";
import Logo from "@/assets/Logo.png";

export const Footer = () => {
  return (
    <footer className="bg-background border-t border-muted/50 py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-sm font-light tracking-wide text-muted-foreground">
            {/* Brand - Signature */}
            <div className="space-y-6">
                <Link to="/" className="block w-24 grayscale opacity-80 hover:opacity-100 transition-opacity">
                    <img src={Logo} alt="The Flower Hook" />
                </Link>
                <p className="max-w-xs leading-relaxed text-xs">
                    Handcrafted crochet atelier. <br />
                    Weaving nature's beauty into timeless floral art.
                </p>
                <span className="block text-[10px] uppercase tracking-[0.2em] font-medium text-foreground pt-4">
                    © 2024 The Flower Hook
                </span>
            </div>

            {/* Links - Minimal Columns */}
            <div className="space-y-4">
                <h4 className="text-foreground uppercase tracking-[0.2em] text-xs font-semibold mb-6">Explore</h4>
                <ul className="space-y-3">
                    <li><Link to="/products" className="hover:text-primary transition-colors">Collection</Link></li>
                    <li><Link to="/categories" className="hover:text-primary transition-colors">Categories</Link></li>
                    <li><Link to="/about" className="hover:text-primary transition-colors">Our Story</Link></li>
                    <li><Link to="/favorites" className="hover:text-primary transition-colors">Wishlist</Link></li>
                </ul>
            </div>

            <div className="space-y-4">
                <h4 className="text-foreground uppercase tracking-[0.2em] text-xs font-semibold mb-6">Support</h4>
                <ul className="space-y-3">
                    <li><Link to="#" className="hover:text-primary transition-colors">Care Guide</Link></li>
                    <li><Link to="#" className="hover:text-primary transition-colors">Shipping & Returns</Link></li>
                    <li><Link to="#" className="hover:text-primary transition-colors">Sustainability</Link></li>
                    <li><Link to="#" className="hover:text-primary transition-colors">Contact Us</Link></li>
                </ul>
            </div>

            {/* Newsletter - Minimal Input */}
            <div className="space-y-6">
                <h4 className="text-foreground uppercase tracking-[0.2em] text-xs font-semibold mb-6">Newsletter</h4>
                <p className="text-xs leading-relaxed">
                    Be the first to receive updates on new collections and studio news.
                </p>
                <div className="relative border-b border-foreground/20 pb-2">
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        className="w-full bg-transparent outline-none placeholder:text-muted-foreground/50 text-foreground text-sm"
                    />
                    <button className="absolute right-0 bottom-2 text-xs uppercase tracking-widest text-primary hover:text-foreground transition-colors">
                        Join
                    </button>
                </div>
            </div>
        </div>
      </div>
    </footer>
  );
};
