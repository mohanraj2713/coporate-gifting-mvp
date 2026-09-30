const fs = require('fs');
let code = fs.readFileSync('app/admin/page.tsx', 'utf8');

// 1. Remove initial dummy products
code = code.replace(
  /const \[products, setProducts\] = useState\(\[[\s\S]*?\]\);/,
  'const [products, setProducts] = useState<any[]>([]);'
);

// 2. Remove initial dummy categories
code = code.replace(
  /const \[categories, setCategories\] = useState\(\[[\s\S]*?\]\);/,
  'const [categories, setCategories] = useState<any[]>([]);'
);

// 3. Update tabs count dynamically
code = code.replace(
  /\{ id: 'products', name: 'Products', icon: Package, count: 89 \},/,
  '{ id: \'products\', name: \'Products\', icon: Package, count: products.length },'
);
code = code.replace(
  /\{ id: 'categories', name: 'Categories', icon: Tag, count: 9 \},/,
  '{ id: \'categories\', name: \'Categories\', icon: Tag, count: categories.length },'
);

// 4. Update Metric cards
code = code.replace(
  /<p className="text-2xl font-black text-slate-900 font-heading">89 Products<\/p>/,
  '<p className="text-2xl font-black text-slate-900 font-heading">{products.length} Products</p>'
);
code = code.replace(
  /9 Active Categories/,
  '{categories.length} Active Categories'
);

// 5. Update SKU in table to use _id
code = code.replace(
  /<p className="text-\[10px\] text-slate-400 font-mono">SKU-2026-0\{p\.id\}<\/p>/,
  '<p className="text-[10px] text-slate-400 font-mono">SKU-{p._id || p.id}</p>'
);
// Make sure key uses _id
code = code.replace(
  /<tr key=\{p\.id\}/g,
  '<tr key={p._id || p.id}'
);

fs.writeFileSync('app/admin/page.tsx', code);
console.log('Admin page updated.');
