const fs = require('fs');

let code = fs.readFileSync('app/wishlist/page.tsx', 'utf8');

// Add products state and fetch
if (!code.includes('useEffect')) {
  code = code.replace(/import \{ useRouter \} from 'next\/navigation';/, "import { useRouter } from 'next/navigation';\nimport { useState, useEffect } from 'react';");
}

const stateCode = `  const { wishlist, toggleWishlist, cart, toggleCart, isSignedIn, signOut } = useStore();
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  useEffect(() => {
    fetch('/api/gifts').then(r => r.json()).then(data => setProducts(data)).catch(console.error);
  }, []);`;

code = code.replace(
  `  const { wishlist, toggleWishlist, isSignedIn, signOut } = useStore();
  const router = useRouter();`,
  stateCode
);

// Map the wishlist properly
const oldMap = `{wishlist.map(item => (
              <div key={item} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-lg transition-shadow group relative">
                <button 
                  onClick={() => toggleWishlist(item)}
                  className="absolute top-6 right-6 z-10 text-rose-500 bg-white rounded-full p-2 shadow-md hover:bg-rose-50 hover:text-rose-600 transition-colors"
                >
                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                </button>
                
                <div className="aspect-square bg-slate-100 rounded-xl mb-4 overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-medium">
                    Product Image
                  </div>
                </div>
                
                <h3 className="font-bold text-slate-800 text-lg">Premium Item {item}</h3>
                <p className="text-sm text-slate-500 mt-1">Added to wishlist recently</p>
                
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                  <p className="text-teal-600 font-black text-xl">$49.00</p>
                  <Link 
                    href="/checkout"
                    className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-teal-700 transition-colors shadow-sm"
                  >
                    Buy Now
                  </Link>
                </div>
              </div>
            ))}`;

const newMap = `{wishlist.map(itemId => {
              const item = products.find(p => (p._id || p.id) === itemId) || { _id: itemId, name: 'Premium Item', price: 49 };
              return (
              <div key={itemId} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-lg transition-shadow group relative">
                <button 
                  onClick={() => toggleWishlist(itemId)}
                  className="absolute top-6 right-6 z-10 text-rose-500 bg-white rounded-full p-2 shadow-md hover:bg-rose-50 hover:text-rose-600 transition-colors"
                >
                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                </button>
                
                <div className="aspect-square bg-slate-100 rounded-xl mb-4 overflow-hidden relative">
                  {item.imageUrl ? <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" /> : <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-medium">Product Image</div>}
                </div>
                
                <h3 className="font-bold text-slate-800 text-lg truncate">{item.name}</h3>
                <p className="text-sm text-slate-500 mt-1">Added to wishlist recently</p>
                
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                  <p className="text-teal-600 font-black text-xl">$\{(item.price || 49).toFixed(2)}</p>
                  <button 
                    onClick={() => {
                      if (!cart.includes(itemId)) toggleCart(itemId);
                      toggleWishlist(itemId);
                      router.push('/checkout');
                    }}
                    className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-teal-700 transition-colors shadow-sm"
                  >
                    Move to Cart
                  </button>
                </div>
              </div>
            ) })}`;

code = code.replace(oldMap, newMap);

fs.writeFileSync('app/wishlist/page.tsx', code);
console.log('Updated wishlist page');
