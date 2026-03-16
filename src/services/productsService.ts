import Papa from 'papaparse';

// ─── Existing assets ─────────────────────────────────────────────────────────
// ─── Category Assets ──────────────────────────────────────────────────────────
import sunflowerPot from "../assets/Sunflower pot.jpeg";
import ipadSleeve from "../assets/Ipad sleeve.jpeg";
import roseBouquet from "../assets/Rose bouquet.jpeg";
import roseKeychain from "../assets/Rose bouquet keychain.jpeg";
import roseSlingBag from "../assets/Rose-bouquet-sling-bag.jpeg";
import hairTies from "../assets/Hair-ties.jpg";

export const categories = [
    { id: 1,  name: "Flowers and Bouquet",        slug: "flowers-and-bouquet",        image: roseBouquet },
    { id: 2,  name: "Flower Pots",                slug: "flower-pots",                image: sunflowerPot },
    { id: 3,  name: "Key Chains and Charms",      slug: "key-chains-and-charms",      image: roseKeychain },
    { id: 4,  name: "Bags and pouches",           slug: "bags-and-pouches",           image: roseSlingBag },
    { id: 5,  name: "Book covers and Sleeves",    slug: "book-covers-and-sleeves",    image: ipadSleeve },
    { id: 6,  name: "Hair Accessories",           slug: "hair-accessories",           image: hairTies },
];

export interface Product {
  id: string;
  name: string;
  price: number;
  original_price: number;
  description: string;
  image_url: string;
  images?: string[];
  category: string;
  is_featured: boolean;
  is_new: boolean;
  stock_quantity: number;
  rating: number;
  reviews: number;
}

const GOOGLE_SHEETS_CSV_URL = 'https://docs.google.com/spreadsheets/d/1Vt0gBXgaXwxgt14G9fmsj1QfyrXn_tpROCVUdDUnXEk/export?format=csv&gid=0';

const convertDriveUrl = (url: string) => {
  if (!url) return "";
  
  // Aggressively clean the URL from quotes, BOM, and whitespace
  let cleanUrl = url.replace(/[\ufeff\u200b]/g, '').trim();
  while (cleanUrl.startsWith('"') && cleanUrl.endsWith('"')) {
    cleanUrl = cleanUrl.substring(1, cleanUrl.length - 1).trim();
  }
  
  if (cleanUrl.includes('drive.google.com')) {
    let id = "";
    if (cleanUrl.includes('/d/')) {
      id = cleanUrl.split('/d/')[1]?.split('/')[0]?.split('?')[0] || "";
    } else if (cleanUrl.includes('id=')) {
      id = cleanUrl.split('id=')[1]?.split('&')[0] || "";
    }
    
    if (id) {
      // thumbnail?sz=w800 is the most stable for mass-loading 
      // without hitting Google's "automated traffic" blocks (ERR_TOO_MANY_REDIRECTS)
      return `https://drive.google.com/thumbnail?id=${id}&sz=w800`;
    }
  }
  
  return cleanUrl;
};

export const fetchProducts = (): Promise<Product[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(GOOGLE_SHEETS_CSV_URL, {
      download: true,
      header: true,
      complete: (results) => {
        console.log("CSV Raw results.data length:", results.data?.length);
        const products: Product[] = results.data
          .filter((row: any) => row && typeof row === 'object' && Object.keys(row).length > 0)
          .map((row: any) => {
            // Helper to find value regardless of header quotes or BOM
            const getCleanVal = (key: string) => {
              const lowerKey = key.toLowerCase();
              const foundKey = Object.keys(row).find(k => {
                const kClean = k.replace(/[\ufeff\u200b"]/g, '').toLowerCase().trim();
                return kClean === lowerKey;
              });
              const val = foundKey ? row[foundKey] : undefined;
              if (typeof val === 'string') {
                return val.replace(/[\ufeff\u200b]/g, '').replace(/^"|"$/g, '').trim();
              }
              return val;
            };
            
            const isTrue = (val: any) => {
              if (typeof val === 'boolean') return val;
              const s = String(val || "").toLowerCase().trim();
              return s === 'true' || s === '1' || s === 'yes' || s === 't';
            };
            
            return {
              id: String(getCleanVal('id') || "").trim(),
              name: String(getCleanVal('name') || "").trim(),
              price: Number(getCleanVal('price')) || 0,
              original_price: Number(getCleanVal('original_price')) || 0,
              description: String(getCleanVal('description') || ""),
              image_url: convertDriveUrl(String(getCleanVal('image_url') || "")),
              category: String(getCleanVal('category') || "Uncategorized"),
              is_featured: isTrue(getCleanVal('is_featured')),
              is_new: isTrue(getCleanVal('is_new')),
              stock_quantity: Number(getCleanVal('stock_quantity')) || 0,
              rating: Number(getCleanVal('rating')) || 0,
              reviews: Number(getCleanVal('reviews')) || 0,
            };
          })
          .filter(p => p.id && p.name && p.id.toLowerCase() !== "id"); 
        
        console.log("Parsed products:", products.length);
        if (products.length > 0) {
          console.log("First product image URL:", products[0].image_url);
        }
        resolve(products);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};
