import Papa from 'papaparse';

// ─── Existing assets ─────────────────────────────────────────────────────────
import strawberryKeychain from "../assets/strawberry-keychain.jpg";
import flower1 from "../assets/small bouquet.jpeg";
import hairTies from "../assets/Hair-ties.jpg";
import miniFlowerPot from "../assets/Mini flower pot.jpeg";
import multipleItems from "../assets/Multiple items.jpeg";
import quranCoverImg from "../assets/Quran cover.jpeg";
import roseSlingBag from "../assets/Rose-bouquet-sling-bag.jpeg";
import rosePot from "../assets/Rose-pot.jpg";
import sunflowerBouquetKeychain from "../assets/Sunflower bouquet keychain.jpeg";
import sunflowerPot from "../assets/Sunflower pot.jpeg";
import tulipLavender from "../assets/Tulip & lavender bouquet.jpeg";

// ─── New assets ───────────────────────────────────────────────────────────────
import blueWhiteBouquet from "../assets/Blue with white bouquet.jpeg";
import bouquet from "../assets/Bouquet.jpeg";
import chevronToteBag from "../assets/Chevron Tote bag.jpeg";
import daisyKeychain from "../assets/Daisy keychain.jpeg";
import flamingoKeychain from "../assets/Flamingo Keychain.jpeg";
import ipadSleeve from "../assets/Ipad sleeve.jpeg";
import keychain from "../assets/Keychain.jpeg";
import keychain2 from "../assets/Keychain_2.jpeg";
import keychain3 from "../assets/Keychain_3.jpeg";
import keychain4 from "../assets/Keychain_4.jpeg";
import keychain5 from "../assets/Keychain_5.jpeg";
import keychain6 from "../assets/Keychain_6.jpeg";
import largeBouquet from "../assets/Large bouquet.jpeg";
import miniPurseWithDivision from "../assets/Mini purse with division.jpeg";
import miniPurse from "../assets/Mini purse.jpeg";
import miniRosesBouquet from "../assets/Mini roses bouquet.jpeg";
import miniTulipBouquet from "../assets/Mini tulip bouquet.jpeg";
import multiColourBouquet from "../assets/Multi colour bouquet.jpeg";
import pouches from "../assets/Pouches.jpeg";
import roseBouquetKeychain from "../assets/Rose bouquet keychain.jpeg";
import roseBouquet from "../assets/Rose bouquet.jpeg";
import roseKeychain from "../assets/Rose keychain.jpeg";
import shaunTheSheepKeychain from "../assets/Shaun the sheep keychain.jpeg";
import sunflowerBouquet from "../assets/Sunflower bouquet.jpeg";
import tawafTasbihKeychain from "../assets/Tawaf tasbih keychain.jpeg";
import tulipKeychain from "../assets/Tulip keychain.jpeg";
import tulipPurse from "../assets/Tulip purse.jpeg";

import hairCap from "../assets/Hair cap.jpeg";
import dentistSet from "../assets/Dentist set.jpeg";
import tulip from "../assets/Tulip.jpeg";
import callaLilly from "../assets/Cally lilly.jpeg";
import lavender from "../assets/Lavender.jpeg";
import pingPong from "../assets/Ping pong.jpeg";
import largeRose from "../assets/Large rose.jpeg";
import lily from "../assets/Lily.jpeg";
import lilyBouquet from "../assets/Lily bouquet.jpeg";
import bouquet4 from "../assets/Bouquet_4.jpeg";
import blackPurse from "../assets/Black purse.jpeg";
import jerseyKeychain from "../assets/Jersey keychain.jpeg";
import bouquet2 from "../assets/Bouquet_2.jpeg";
import purse from "../assets/Purse.jpeg";
import keychain7 from "../assets/keychain_7.jpeg";

import bouquet3jpeg300 from "../assets/Bouquet_3.jpeg";
import crochethatjpeg301 from "../assets/Crochet_Hat.jpeg";
import earing1jpeg302 from "../assets/Earing_1.jpeg";
import earing2jpeg303 from "../assets/Earing_2.jpeg";
import hairties1jpgjpeg304 from "../assets/Hair-ties_1.jpg.jpeg";
import hairties10jpgjpeg305 from "../assets/Hair-ties_10.jpg.jpeg";
import hairties11jpgjpeg306 from "../assets/Hair-ties_11.jpg.jpeg";
import hairties12jpgjpeg307 from "../assets/Hair-ties_12.jpg.jpeg";
import hairties13jpgjpeg308 from "../assets/Hair-ties_13.jpg.jpeg";
import hairties2jpgjpeg309 from "../assets/Hair-ties_2.jpg.jpeg";
import hairties3jpgjpeg310 from "../assets/Hair-ties_3.jpg.jpeg";
import hairties4jpgjpeg311 from "../assets/Hair-ties_4.jpg.jpeg";
import hairties5jpgjpeg312 from "../assets/Hair-ties_5.jpg.jpeg";
import hairties6jpgjpeg313 from "../assets/Hair-ties_6.jpg.jpeg";
import hairties7jpgjpeg314 from "../assets/Hair-ties_7.jpg.jpeg";
import hairties8jpgjpeg315 from "../assets/Hair-ties_8.jpg.jpeg";
import hairties9jpgjpeg316 from "../assets/Hair-ties_9.jpg.jpeg";
import icecreamkeychainjpeg317 from "../assets/Ice cream keychain.jpeg";
import keychain10jpeg318 from "../assets/keychain_10.jpeg";
import keychain11jpeg319 from "../assets/keychain_11.jpeg";
import keychain12jpeg320 from "../assets/keychain_12.jpeg";
import keychain13jpeg321 from "../assets/keychain_13.jpeg";
import keychain14jpeg322 from "../assets/keychain_14.jpeg";
import keychain15jpeg323 from "../assets/keychain_15.jpeg";
import keychain8jpeg324 from "../assets/Keychain_8.jpeg";
import keychain9jpeg325 from "../assets/keychain_9.jpeg";
import pinkrosejpeg326 from "../assets/Pink rose.jpeg";
import rosepotjpeg327 from "../assets/Rose pot.jpeg";
import rosepot1jpeg328 from "../assets/Rose_pot1.jpeg";
import smallbouquetjpeg329 from "../assets/small bouquet.jpeg";
import sunflowerpairkeychainjpeg330 from "../assets/Sunflower pair keychain.jpeg";
import sunflowerjpeg331 from "../assets/Sunflower.jpeg";
import yellowbouquetjpeg332 from "../assets/Yellow bouquet.jpeg";

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
      // Using the thumbnail endpoint with a large size is often the most stable way 
      // to bypass Google's "virus scan" or "login" redirects for public files.
      return `https://drive.google.com/thumbnail?id=${id}&sz=w1200`;
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
