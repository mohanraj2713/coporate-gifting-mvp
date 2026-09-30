const fs = require('fs');
let code = fs.readFileSync('app/products/page.tsx', 'utf8');

// First add useEffect to the import if not present
if (!code.includes('useEffect')) {
  code = code.replace(/import { useState } from 'react';/, "import { useState, useEffect } from 'react';");
}

// Add state for products
const stateCode = `  const [products, setProducts] = useState<any[]>([]);
  useEffect(() => {
    fetch('/api/products').then(r => r.json()).then(data => setProducts(data)).catch(console.error);
  }, []);`;

code = code.replace(
  '  const [pendingItemId, setPendingItemId] = useState<number | null>(null);',
  '  const [pendingItemId, setPendingItemId] = useState<any>(null);\n' + stateCode
);

// We need to change the mock array [1, 2, 3, 4, 5, 6].map(item => {
const oldMap = `[1, 2, 3, 4, 5, 6].map(item => {`;
const newMap = `(products.length > 0 ? products : []).map(item => {`;
code = code.replace(oldMap, newMap);

// Replace item rendering
code = code.replace(/key=\{item\}/g, 'key={item._id || item.id}');
code = code.replace(/wishlist.includes\(item\)/g, 'wishlist.includes(item._id || item.id)');
code = code.replace(/handleWishlistClick\(item\)/g, 'handleWishlistClick(item._id || item.id)');
code = code.replace(/handleBuyNow\(item\)/g, 'handleBuyNow(item._id || item.id)');

code = code.replace(/Premium Item \{item\}/g, '{item.name}');
code = code.replace(/\$49\.00/g, '${Number(item.price || 49).toFixed(2)}');

// Handle images
code = code.replace(
  /<div className="absolute inset-0 flex items-center justify-center text-slate-400 font-medium">\s*Product Image\s*<\/div>/,
  `{item.imageUrl ? (
      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
    ) : (
      <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-medium">
        Product Image
      </div>
    )}`
);

fs.writeFileSync('app/products/page.tsx', code);
console.log('Updated products page to use MongoDB live data');
