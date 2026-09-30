'use client';

import Link from 'next/link';
import { useStore } from '@/components/StoreProvider';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function WishlistPage() {
  const { wishlist, toggleWishlist, cart, toggleCart, isSignedIn, signOut } = useStore();
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  useEffect(() => {
    fetch('/api/gifts').then(r => r.json()).then(data => setProducts(data)).catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
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
            <Link href="/products" className="font-semibold text-slate-600 hover:text-teal-600">Products</Link>
            <Link href="/wishlist" className="font-semibold text-teal-600 border-b-2 border-teal-600 pb-1">
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
              <Link href="/products" className="bg-teal-600 text-white px-5 py-2 rounded-lg font-bold shadow-md hover:bg-teal-700">
                Sign In
              </Link>
            )}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Your Wishlist</h1>
          <Link href="/products" className="text-teal-600 font-bold hover:underline">
            Continue Shopping
          </Link>
        </div>
        
        {wishlist.length === 0 ? (
          <div className="text-center py-20 bg-white border border-slate-200 rounded-2xl">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Your wishlist is empty</h2>
            <Link href="/products" className="text-teal-600 font-bold hover:underline">
              Start adding some products!
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlist.map(itemId => {
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
                  <p className="text-teal-600 font-black text-xl">${(item.price || 49).toFixed(2)}</p>
                  <button 
                    onClick={() => {
                      if (!cart.includes(itemId)) toggleCart(itemId);
                      toggleWishlist(itemId);
                      router.push('/cart');
                    }}
                    className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-teal-700 transition-colors shadow-sm"
                  >
                    Move to Cart
                  </button>
                </div>
              </div>
            ) })}
          </div>
        )}
      </main>
    </div>
  );
}
