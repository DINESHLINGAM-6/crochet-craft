import { Heart, Mail, Phone, MapPin, Instagram, Facebook, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-background to-muted/50 border-t border-border/50">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">C</span>
              </div>
              <h3 className="text-xl font-poppins font-bold text-gradient">
                Crochet-Craft
              </h3>
            </div>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Supporting local artisans by connecting their handcrafted treasures with customers who value authenticity and quality.
            </p>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="h-4 w-4 fill-red-500 text-red-500" />
              <span>for Crochet-Crafts worldwide</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-poppins font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["About Us", "Our Story", "Crochet Craft", "Quality Promise", "Shipping Info", "Return Policy"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-poppins font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              {["Pottery & Ceramics", "Textiles & Fabrics", "Woodwork", "Jewelry", "Home Décor", "Art & Sculptures"].map((category) => (
                <li key={category}>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-poppins font-semibold mb-4">Stay Connected</h4>
            <p className="text-muted-foreground mb-4">
              Subscribe to get updates on new arrivals and exclusive Crochet stories.
            </p>
            
            <div className="flex gap-2 mb-4">
              <Input 
                placeholder="Enter your email"
                className="flex-1"
              />
              <Button variant="hero" size="sm">
                Subscribe
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-border/50 pt-8 mb-8">
          <h4 className="font-poppins font-semibold mb-4 text-center">Get in Touch</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span>hello@Crochet.com</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Salem, India</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © 2024 Crochet Marketplace. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};