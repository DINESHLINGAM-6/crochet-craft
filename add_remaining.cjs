const fs = require('fs');
const path = require('path');

const mockDataPath = path.join(__dirname, 'src/data/mockData.ts');
let content = fs.readFileSync(mockDataPath, 'utf8');

const remainingFiles = [
  'Bouquet_3.jpeg',
  'Crochet_Hat.jpeg',
  'Earing_1.jpeg',
  'Earing_2.jpeg',
  'Hair-ties_1.jpg.jpeg',
  'Hair-ties_10.jpg.jpeg',
  'Hair-ties_11.jpg.jpeg',
  'Hair-ties_12.jpg.jpeg',
  'Hair-ties_13.jpg.jpeg',
  'Hair-ties_2.jpg.jpeg',
  'Hair-ties_3.jpg.jpeg',
  'Hair-ties_4.jpg.jpeg',
  'Hair-ties_5.jpg.jpeg',
  'Hair-ties_6.jpg.jpeg',
  'Hair-ties_7.jpg.jpeg',
  'Hair-ties_8.jpg.jpeg',
  'Hair-ties_9.jpg.jpeg',
  'Ice cream keychain.jpeg',
  'keychain_10.jpeg',
  'keychain_11.jpeg',
  'keychain_12.jpeg',
  'keychain_13.jpeg',
  'keychain_14.jpeg',
  'keychain_15.jpeg',
  'Keychain_8.jpeg',
  'keychain_9.jpeg',
  'Pink rose.jpeg',
  'Rose pot.jpeg',
  'Rose_pot1.jpeg',
  'small bouquet.jpeg',
  'Sunflower pair keychain.jpeg',
  'Sunflower.jpeg',
  'Yellow bouquet.jpeg'
];

let importStatements = '';
let productDefinitions = '';

let idCounter = 300;

remainingFiles.forEach(file => {
  const varName = file.replace(/([^a-zA-Z0-9])/g, '').toLowerCase() + idCounter;
  
  importStatements += `import ${varName} from "../assets/${file}";\n`;

  let category = "Key Chains and Charms";
  let name = file.split('.')[0].replace(/_/g, ' ');
  let price = 150;
  
  if (file.toLowerCase().includes('bouquet') || file.toLowerCase().includes('flower') || file.toLowerCase().includes('rose') || file.toLowerCase().includes('lily') || file.toLowerCase().includes('tulip') || file.toLowerCase().includes('sunflower')) {
    category = "Flowers and Bouquet";
    if (file.toLowerCase().includes('bouquet')) price = 600;
    else price = 250;
  }
  
  if (file.toLowerCase().includes('pot')) {
    category = "Flower Pots";
    price = 450;
  }
  
  if (file.toLowerCase().includes('hair')) {
    category = "Hair Accessories";
    price = 150;
  }
  
  if (file.toLowerCase().includes('hat')) {
    category = "Hair Accessories"; // closest
    price = 800;
  }
  
  if (file.toLowerCase().includes('earing')) {
    category = "Key Chains and Charms"; // closest given options
    price = 250;
  }
  
  if (file.toLowerCase().includes('keychain')) {
    category = "Key Chains and Charms";
    price = 150;
  }
  
  productDefinitions += `
    {
        id: "${idCounter}",
        name: "${name.charAt(0).toUpperCase() + name.slice(1)}",
        price: ${price},
        original_price: ${Math.floor(price * 1.2)},
        description: "Handcrafted ${name.toLowerCase()}.",
        image_url: ${varName},
        category: "${category}",
        is_featured: false,
        is_new: true,
        stock_quantity: 10,
        rating: 5,
        reviews: 0,
    },`;
    
  idCounter++;
});

// insert imports before "// ─── Categories"
content = content.replace('// ─── Categories ──────────────────────────────────────────────────────────────', importStatements + '\n// ─── Categories ──────────────────────────────────────────────────────────────');

// insert products into array
content = content.replace('export const products = [', 'export const products = [' + productDefinitions);

fs.writeFileSync(mockDataPath, content, 'utf8');
console.log('Done!');
