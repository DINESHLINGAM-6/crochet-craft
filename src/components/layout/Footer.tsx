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
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 rounded-lg flex items-center justify-center shadow-lg shadow-pink-300/40">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <h3 className="text-xl font-poppins font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                Crochet-Craft
              </h3>
            </div>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Supporting local artisans by connecting their handcrafted treasures with
              customers who value authenticity and quality.
            </p>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-pink-500 fill-pink-500" />
              <span>for Crochet-Crafts worldwide</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-poppins font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                "About Us",
                "Our Story",
                "Crochet Craft",
                "Quality Promise",
                "Shipping Info",
                "Return Policy",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-pink-500 transition-colors"
                  >
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
              {[
                "Pottery & Ceramics",
                "Textiles & Fabrics",
                "Woodwork",
                "Jewelry",
                "Home Décor",
                "Art & Sculptures",
              ].map((category) => (
                <li key={category}>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-purple-500 transition-colors"
                  >
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
              <Input placeholder="Enter your email" className="flex-1" />
              <Button
                variant="default"
                size="sm"
                className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white shadow-lg hover:shadow-pink-400/40 transition-all"
              >
                Subscribe
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <Button
                size="icon"
                className="rounded-full bg-gradient-to-br from-pink-500 to-rose-500 text-white hover:scale-110 shadow-lg"
              >
                <Instagram className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                className="rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-white hover:scale-110 shadow-lg"
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                className="rounded-full bg-gradient-to-br from-sky-400 to-blue-600 text-white hover:scale-110 shadow-lg"
              >
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-border/50 pt-8 mb-8">
          <h4 className="font-poppins font-semibold mb-4 text-center">Get in Touch</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-center gap-2 text-muted-foreground hover:text-pink-500 transition-colors">
              <Mail className="h-4 w-4" />
              <span>hello@Crochet.com</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-muted-foreground hover:text-purple-500 transition-colors">
              <Phone className="h-4 w-4" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-muted-foreground hover:text-indigo-500 transition-colors">
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
            <a href="#" className="hover:text-pink-500 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-purple-500 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-indigo-500 transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
