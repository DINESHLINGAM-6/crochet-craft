import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchProducts, Product } from "@/services/productsService";

export const SignatureCraftSection = () => {
  const [featured, setFeatured] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts().then((allProducts) => {
      console.log("DEBUG: Signature section products", allProducts.length);
      const found = allProducts.find((p) => String(p.id) === "17") 
                 || allProducts.find(p => p.is_featured) 
                 || allProducts[0];
      setFeatured(found || null);
      setLoading(false);
    }).catch(err => {
      console.error("Signature fetch failed", err);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="py-20 text-center">Loading...</div>;
  if (!featured) return null;

  console.log("DEBUG: Rendering Signature section with", featured.name);

  return (
    <section id="signature" className="relative py-24 md:py-32 overflow-hidden" style={{ background: "#F4E7F3" }}>
      {/* Dynamic Background Blobs */}
      <div className="absolute inset-0 dot-pattern opacity-30 mix-blend-overlay" />
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full filter blur-[100px] opacity-60 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(233,227,246,1) 0%, rgba(244,231,243,0) 70%)", transform: "translate(20%, -20%)" }}
      />
      
      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-nunito font-black" style={{ color: "#1e1108", lineHeight: 1.1 }}>
            Our Most-Loved <span className="italic font-light text-[#E57F84]">Creation</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-0 overflow-hidden rounded-[2.5rem] shadow-2xl" style={{ background: "#FDF6F0" }}>
          {/* Image side */}
          <div className="relative group overflow-hidden h-[400px] lg:h-auto">
            <img 
              src={featured.image_url} 
              alt={featured.name} 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              onError={(e) => {
                const img = e.currentTarget as HTMLImageElement;
                const id = img.src.split('id=')[1]?.split('&')[0];
                if (id && !img.src.includes('thumbnail')) img.src = `https://drive.google.com/thumbnail?id=${id}&sz=w1000`;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 px-5 py-2 rounded-xl backdrop-blur-md bg-white/90 shadow-lg border border-white/50">
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#a0522d] block mb-1">Signature Price</span>
              <span className="text-2xl font-black text-[#E57F84]">₹{featured.price}</span>
            </div>
          </div>

          {/* Content side */}
          <div className="flex flex-col justify-center p-10 md:p-16 lg:p-20 relative bg-gradient-to-br from-[#FDF6F0] to-[#F7EBF5]">
            <h3 className="text-3xl md:text-4xl font-nunito font-black mb-6" style={{ color: "#1e1108" }}>{featured.name}</h3>
            <p className="text-base text-[#6b7280] leading-relaxed mb-8">
              {featured.description || "Individually handcrafted with the finest cotton yarn. Each piece tells a story of patience, art, and love."}
            </p>
            
            <ul className="space-y-3 mb-10 text-sm font-medium text-[#4b5563]">
              {["100% Premium Cotton Yarn", "Intricate Hand-stitched Details", "Eco-friendly Materials", "Perfect for Gifting"].map(item => (
                <li key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#FDF6F0] flex items-center justify-center text-[#E57F84] shadow-sm">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path d="M5 13l4 4L19 7" /></svg>
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <Link to={`/product/${featured.id}`} className="flex-1">
                <button className="w-full px-8 py-4 bg-[#E57F84] text-white rounded-2xl font-bold shadow-xl shadow-[#e57f84]/20 hover:scale-[1.02] hover:shadow-2xl transition-all">
                  Shop Now
                </button>
              </Link>
              <button 
                onClick={() => {
                  const msg = `Hi! I'm interested in your Signature Craft: *${featured.name}* (₹${featured.price}). Can you help me order it?\nDirect Image: ${featured.image_url}`;
                  window.open(`https://wa.me/919840548758?text=${encodeURIComponent(msg)}`, "_blank");
                }}
                className="flex-1 px-8 py-4 border-2 border-green-500 text-green-600 rounded-2xl font-bold hover:bg-green-50 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
