const fs = require('fs');
let content = fs.readFileSync('src/data/mockData.ts', 'utf8');

const categoryMap = {
  'Keychains': 'Key Chains and Charms',
  'Fridge Magnets': 'Key Chains and Charms',
  'Handbags': 'Bags and pouches',
  'Bags & Pouches': 'Bags and pouches',
  'Flowers': 'Flowers and Bouquet',
  'Bouquets': 'Flowers and Bouquet',
  'Quran Cover': 'Book covers and Sleeves',
  'Sleeves': 'Book covers and Sleeves',
  'Flower Pots': 'Flower Pots',
  'Hair Accessories': 'Hair Accessories',
};

for (const [oldCat, newCat] of Object.entries(categoryMap)) {
  const searchStr = 'category: "' + oldCat + '"';
  const replaceStr = 'category: "' + newCat + '"';
  content = content.split(searchStr).join(replaceStr);
  
  const searchStr2 = "category: '" + oldCat + "'";
  const replaceStr2 = "category: '" + newCat + "'";
  content = content.split(searchStr2).join(replaceStr2);
}

fs.writeFileSync('src/data/mockData.ts', content);
