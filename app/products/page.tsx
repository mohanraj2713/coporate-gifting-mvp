'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/components/StoreProvider';

export default function ProductsPage() {
  const router = useRouter();
  const { isSignedIn, signIn, signOut, wishlist, toggleWishlist, addRecentlyViewed, cart, toggleCart } = useStore();
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<'wishlist' | 'buy' | null>(null);
  const [pendingItemId, setPendingItemId] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInError, setSignInError] = useState('');
  const [products, setProducts] = useState<any[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [sortOption, setSortOption] = useState<string>('Featured');
  
  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
  };
  
  const filteredProducts = products.filter(p => {
    const pPrice = Number(p.price || 49);
    if (pPrice > maxPrice) return false;
    if (selectedCategories.length > 0 && !selectedCategories.includes(p.category)) return false;
    return true;
  }).sort((a, b) => {
    if (sortOption === 'Price: Low to High') return Number(a.price || 49) - Number(b.price || 49);
    if (sortOption === 'Price: High to Low') return Number(b.price || 49) - Number(a.price || 49);
    return 0;
  });
  const [categories, setCategories] = useState<any[]>([]);
  useEffect(() => {
    fetch('/api/gifts').then(r => r.json()).then(data => setProducts(data)).catch(console.error);
    fetch('/api/categories').then(r => r.json()).then(data => setCategories(data)).catch(console.error);
  }, []);

  const handleWishlistClick = (itemId: number) => {
    if (!isSignedIn) {
      setPendingAction('wishlist');
      setPendingItemId(itemId);
      setShowSignInModal(true);
      return;
    }
    toggleWishlist(itemId);
  };

  const handleSignIn = async () => {
    setSignInError('');
    const success = await signIn(email, password);
    if (!success) {
      setSignInError('Invalid credentials');
      return;
    }
    
    setShowSignInModal(false);
    
    if (pendingAction === 'wishlist' && pendingItemId !== null) {
      toggleWishlist(pendingItemId);
    } else if (pendingAction === 'buy') {
      if (pendingItemId !== null && !cart.includes(pendingItemId)) {
        toggleCart(pendingItemId);
      }
      router.push('/cart');
    }
    setPendingAction(null);
    setPendingItemId(null);
    setEmail('');
    setPassword('');
  };

  const handleAddToCart = (itemId: string) => {
    if (!isSignedIn) {
      setPendingAction('buy');
      setPendingItemId(itemId);
      setShowSignInModal(true);
      return;
    }
    if (!cart.includes(itemId)) {
      toggleCart(itemId);
    }
    // Don't route to checkout, let them keep shopping
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans relative">
      {/* Sign In Modal */}
      {showSignInModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl relative">
            <button 
              onClick={() => setShowSignInModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
            <h2 className="text-2xl font-bold text-teal-800 mb-6 text-center">Sign In Required</h2>
            <p className="text-slate-600 mb-6 text-center">Please sign in to add items to your wishlist or checkout.</p>
            
            <div className="space-y-4 mb-6">
              {signInError && <p className="text-rose-500 text-sm font-bold text-center">{signInError}</p>}
              <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
              <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>

            <button 
              onClick={handleSignIn}
              className="w-full bg-teal-600 text-white font-bold py-3 rounded-xl hover:bg-teal-700 transition-colors"
            >
              Sign In
            </button>
          </div>
        </div>
      )}

      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-600 flex items-center justify-center text-white font-black text-lg">
              P
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-teal-800">
                PrintoStyle Store
              </span>
            </div>
          </Link>
          <nav className="flex gap-6 items-center">
            <Link href="/" className="font-semibold text-slate-600 hover:text-teal-600">Home</Link>
            <Link href="/products" className="font-semibold text-teal-600">Products</Link>
            <Link href="/wishlist" className="font-semibold text-teal-600 hover:underline">
              Wishlist {wishlist.length > 0 && `(${wishlist.length})`}
            </Link>
            <Link href="/cart" className="font-semibold text-slate-600 hover:text-teal-600">
              Cart {cart.length > 0 && `(${cart.length})`}
            </Link>
            
            {isSignedIn ? (
              <div className="flex items-center gap-4">
                <span className="font-semibold text-slate-600">User</span>
                <button 
                  onClick={() => signOut()} 
                  className="bg-slate-100 text-slate-600 px-5 py-2 rounded-lg font-bold hover:bg-slate-200"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setShowSignInModal(true)}
                className="bg-teal-600 text-white px-5 py-2 rounded-lg font-bold shadow-md hover:bg-teal-700"
              >
                Sign In
              </button>
            )}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex gap-8">
        
        {/* Left Sidebar Filter */}
        <aside className="w-1/4 shrink-0">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 sticky top-28">
            <h3 className="font-bold text-lg text-teal-800 mb-4">Filters</h3>
            
            <div className="mb-6">
              <h4 className="font-semibold text-slate-700 mb-3">Categories</h4>
              <ul className="space-y-3">
                {(categories.length > 0 ? categories : [{name: 'T-Shirts'}, {name: 'Mugs'}]).map(catObj => {
                  const catName = typeof catObj === 'string' ? catObj : (catObj.name || 'Uncategorized');
                  return (
                  <li key={catName} className="flex items-center gap-3">
                    <input type="checkbox" id={catName} checked={selectedCategories.includes(catName)} onChange={() => toggleCategory(catName)} className="w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500" />
                    <label htmlFor={catName} className="text-slate-600 font-medium cursor-pointer">{catName}</label>
                  </li>
                ) })}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-slate-700 mb-3">Price Range</h4>
                            <input type="range" className="w-full accent-teal-600" min="0" max="1000" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} />
              <div className="text-center font-bold text-teal-700 mt-2">Up to $\{maxPrice}</div>
              <div className="flex justify-between text-sm font-medium text-slate-500 mt-2">
                <span>$0</span>
                <span>$1000+</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Side Products */}
        <div className="w-3/4">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-slate-800">All Products</h2>
            <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="border border-slate-300 rounded-lg px-4 py-2 text-slate-600 font-medium bg-white focus:outline-none focus:ring-2 focus:ring-teal-500">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(filteredProducts.length > 0 ? filteredProducts : []).map(item => {
              const isWishlisted = wishlist.includes(item._id || item.id);
              return (
                <div key={item._id || item.id} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-lg transition-shadow group" onClick={() => addRecentlyViewed(item._id || item.id)}>
                  <div className="aspect-square bg-slate-100 rounded-xl mb-4 overflow-hidden relative cursor-pointer">
                    {item.imageUrl ? (
      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
    ) : (
      <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-medium">
        Product Image
      </div>
    )}
                    {/* Hover Actions */}
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWishlistClick(item._id || item.id);
                        }}
                        className={`p-3 rounded-full transition-colors shadow-lg ${
                          isWishlisted 
                            ? 'bg-rose-500 text-white hover:bg-rose-600' 
                            : 'bg-white text-slate-800 hover:text-rose-500'
                        }`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                      </button>
                    </div>
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg group-hover:text-teal-700 transition-colors cursor-pointer">{item.name}</h3>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-teal-600 font-black text-xl">${Number(item.price || 49).toFixed(2)}</p>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(item._id || item.id);
                      }}
                      className="bg-teal-50 text-teal-700 px-3 py-1.5 rounded-lg text-sm font-bold hover:bg-teal-600 hover:text-white transition-colors"
                    >
                      {cart.includes(item._id || item.id) ? 'In Cart' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </main>
    </div>
  );
}
