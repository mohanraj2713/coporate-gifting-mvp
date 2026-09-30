const fs = require('fs');

let code = fs.readFileSync('app/page.tsx', 'utf8');

// 1. Add useEffect and useState to import
if (!code.includes('useEffect')) {
  code = code.replace(/import { useStore } from '@\/components\/StoreProvider';/, "import { useStore } from '@/components/StoreProvider';\nimport { useState, useEffect } from 'react';");
}

// 2. Add state and fetch inside PublicDashboardPage
const stateCode = `  const [products, setProducts] = useState<any[]>([]);
  useEffect(() => {
    fetch('/api/gifts').then(r => r.json()).then(data => setProducts(data)).catch(console.error);
  }, []);`;

code = code.replace(
  '  const { isSignedIn, signOut, wishlist } = useStore();',
  '  const { isSignedIn, signOut, wishlist } = useStore();\n' + stateCode
);

// 3. Replace Wishlist rendering
// We want to map wishlist IDs to actual products.
const oldWishlistMap = `{wishlist.map(item => (
                <Link href={\`/products/\${item}\`} key={item} className="shrink-0 w-64 snap-start bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow group relative">
                  <div className="absolute top-6 right-6 z-10 text-rose-500 bg-white rounded-full p-2 shadow-md">
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                  </div>
                  <div className="aspect-square bg-slate-100 rounded-xl mb-4 flex items-center justify-center text-slate-400">
                    Product Image
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg group-hover:text-teal-700 transition-colors truncate">Premium Item {item}</h3>
                  <p className="text-teal-600 font-black text-xl mt-1">$49.00</p>
                </Link>
              ))}`;

const newWishlistMap = `{wishlist.map(itemId => {
                const item = products.find(p => (p._id || p.id) === itemId) || { name: 'Premium Item ' + itemId, price: 49.00 };
                return (
                <Link href={\`/products/\${itemId}\`} key={itemId} className="shrink-0 w-64 snap-start bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow group relative">
                  <div className="absolute top-6 right-6 z-10 text-rose-500 bg-white rounded-full p-2 shadow-md">
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                  </div>
                  <div className="aspect-square bg-slate-100 rounded-xl mb-4 overflow-hidden relative flex items-center justify-center text-slate-400">
                    {item.imageUrl ? <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" /> : 'Product Image'}
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg group-hover:text-teal-700 transition-colors truncate">{item.name}</h3>
                  <p className="text-teal-600 font-black text-xl mt-1">$\{(item.price || 49).toFixed(2)}</p>
                </Link>
              ) })}`;

code = code.replace(oldWishlistMap, newWishlistMap);

// 4. Replace Recently Viewed mapping
const oldRecentlyViewed = `{[1, 2, 3, 4, 5].map(item => (
              <Link href={\`/products/\${item}\`} key={item} className="shrink-0 w-64 snap-start bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow group">
                <div className="aspect-square bg-slate-100 rounded-xl mb-4 flex items-center justify-center text-slate-400">
                  Product Image
                </div>
                <h3 className="font-bold text-slate-800 text-lg group-hover:text-teal-700 transition-colors truncate">Premium Custom Item {item}</h3>
                <p className="text-teal-600 font-black text-xl mt-1">$29.00</p>
              </Link>
            ))}`;

const newRecentlyViewed = `{(products.length > 0 ? products.slice(0, 5) : []).map(item => (
              <Link href={\`/products/\${item._id || item.id}\`} key={item._id || item.id} className="shrink-0 w-64 snap-start bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow group">
                <div className="aspect-square bg-slate-100 rounded-xl mb-4 overflow-hidden relative flex items-center justify-center text-slate-400">
                  {item.imageUrl ? <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" /> : 'Product Image'}
                </div>
                <h3 className="font-bold text-slate-800 text-lg group-hover:text-teal-700 transition-colors truncate">{item.name}</h3>
                <p className="text-teal-600 font-black text-xl mt-1">$\{(item.price || 49).toFixed(2)}</p>
              </Link>
            ))}`;

code = code.replace(oldRecentlyViewed, newRecentlyViewed);

fs.writeFileSync('app/page.tsx', code);
console.log('Updated homepage with live MongoDB products!');
