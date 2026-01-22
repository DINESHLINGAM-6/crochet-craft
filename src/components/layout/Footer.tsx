import { Heart, Mail, Phone, MapPin, Instagram, Facebook, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-[hsl(40,20%,97%)] border-t border-primary/10">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🌸</span>
              </div>
              <h3 className="text-xl font-poppins font-medium text-foreground tracking-wide">
                The Flower Hook
              </h3>
            </div>
            <p className="text-muted-foreground mb-4 leading-relaxed font-light">
              We bring threads to life. Handcrafted crochet gifts, flowers, and accessories made with love and precision.
            </p>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-[hsl(5,60%,70%)] fill-[hsl(5,60%,70%)]" />
              <span>in India</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-poppins font-medium mb-4 text-foreground">Quick Links</h4>
            <ul className="space-y-2">
              {[
                "Home",
                "Products",
                "Categories",
                "About Us",
                "Contact",
              ].map((link) => (
                <li key={link}>
                  <Link
                    to={link === "Home" ? "/" : `/${link.toLowerCase().replace(' ', '-')}`}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Collections */}
          <div>
            <h4 className="font-poppins font-medium mb-4 text-foreground">Collections</h4>
            <ul className="space-y-2">
              {[
                "Flowers",
                "Accessories",
                "Keychains",
                "Home Decor",
              ].map((category) => (
                <li key={category}>
                  <Link
                    to={`/products?category=${category}`}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-poppins font-medium mb-4 text-foreground">Stay Connected</h4>
            <p className="text-muted-foreground mb-4 font-light">
              Subscribe to get updates on new patterns and exclusive offers.
            </p>

            <div className="flex gap-2 mb-6">
              <Input 
                placeholder="Enter your email" 
                className="flex-1 bg-white border-primary/20 focus:border-primary/50 rounded-full" 
              />
              <Button
                variant="default"
                size="sm"
                className="button-primary px-6 border-0"
              >
                Join
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-primary/10 pt-8 mb-8">
          <h4 className="font-poppins font-medium mb-6 text-center text-foreground">Get in Touch</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-center gap-3 text-muted-foreground hover:text-primary transition-colors group">
              <div className="p-2 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
                 <Mail className="h-4 w-4" />
              </div>
              <span className="font-light">hello@theflowerhook.com</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-muted-foreground hover:text-primary transition-colors group">
              <div className="p-2 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
                 <Phone className="h-4 w-4" />
              </div>
              <span className="font-light">+91 98765 43210</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-muted-foreground hover:text-primary transition-colors group">
               <div className="p-2 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
                  <MapPin className="h-4 w-4" />
               </div>
              <span className="font-light">Chennai, Tamil Nadu</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm font-light">
            © 2025 The Flower Hook. All rights reserved.
          </p>
          <div className="flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
