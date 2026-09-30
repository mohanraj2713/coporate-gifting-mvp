'use client';

import Link from 'next/link';
import { useStore } from '@/components/StoreProvider';
import { useState, useEffect } from 'react';

export default function PublicDashboardPage() {
  const { isSignedIn, signOut, wishlist, recentlyViewed, addRecentlyViewed, cart } = useStore();
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  useEffect(() => {
    fetch('/api/gifts').then(r => r.json()).then(data => setProducts(data)).catch(console.error);
    fetch('/api/categories').then(r => r.json()).then(data => setCategories(data)).catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-600 flex items-center justify-center text-white font-black text-lg shadow-md">
              P
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-teal-800">
                PrintoStyle Store
              </span>
            </div>
          </Link>
          <nav className="flex gap-6 items-center">
            <Link href="/" className="font-semibold text-teal-600">Home</Link>
            <Link href="/products" className="font-semibold text-slate-600 hover:text-teal-600">Products</Link>
            <Link href="/wishlist" className="font-semibold text-slate-600 hover:text-teal-600">
              Wishlist {wishlist.length > 0 && `(${wishlist.length})`}
            </Link>
            <Link href="/cart" className="font-semibold text-slate-600 hover:text-teal-600">
              Cart {cart.length > 0 && `(${cart.length})`}
            </Link>
            <Link href="/dashboard" className="font-semibold text-slate-600 hover:text-teal-600">Admin Login</Link>
            
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
              <Link href="/products" className="bg-teal-600 text-white px-5 py-2 rounded-lg font-bold shadow-md hover:bg-teal-700 transition-colors">
                Sign In
              </Link>
            )}
          </nav>
        </div>
      </header>

      <main className="pb-16">
        {/* Banner Area */}
        <section className="bg-teal-700 text-white py-20 px-4 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">Premium Custom Printing & Gifting</h1>
            <p className="text-teal-100 text-lg mb-8">Design and print stunning T-Shirts, Mugs, Business Cards, and Corporate Gifts.</p>
            <Link href="/products" className="bg-white text-teal-700 font-bold px-8 py-3 rounded-xl shadow-lg hover:bg-teal-50 transition-colors text-lg">
              Shop Now
            </Link>
          </div>
        </section>

        {/* Categories Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">Shop by Category</h2>
          <div className="flex flex-wrap gap-8 justify-center">
            {(categories.length > 0 ? categories : [{name: 'Apparel'}, {name: 'Accessories'}]).map((catObj, i) => {
              const catName = typeof catObj === 'string' ? catObj : (catObj.name || 'Uncategorized');
              return (
              <Link href={`/products?category=${catName}`} key={catName} className="group flex flex-col items-center gap-4">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-white border-4 border-slate-100 shadow-sm group-hover:border-teal-500 group-hover:shadow-md transition-all flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-slate-100 flex items-center justify-center text-slate-400 group-hover:scale-110 transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                  </div>
                </div>
                <h3 className="font-bold text-slate-700 text-sm text-center max-w-[120px] leading-tight group-hover:text-teal-700 transition-colors">{catName}</h3>
              </Link>
            ) })}
          </div>
        </section>

        {/* Your Wishlist Section */}
        {isSignedIn && wishlist.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-slate-100">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-slate-800">From Your Wishlist</h2>
              <Link href="/wishlist" className="text-teal-600 font-bold hover:underline">View All</Link>
            </div>
            
            <div className="flex gap-6 overflow-x-auto pb-4 snap-x">
              {wishlist.map(itemId => {
                const item = products.find(p => (p._id || p.id) === itemId) || { name: 'Premium Item ' + itemId, price: 49.00 };
                return (
                <Link href={`/products/${itemId}`} key={itemId} className="shrink-0 w-64 snap-start bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow group relative" onClick={() => addRecentlyViewed(itemId)}>
                  <div className="absolute top-6 right-6 z-10 text-rose-500 bg-white rounded-full p-2 shadow-md">
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                  </div>
                  <div className="aspect-square bg-slate-100 rounded-xl mb-4 overflow-hidden relative flex items-center justify-center text-slate-400">
                    {item.imageUrl ? <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" /> : 'Product Image'}
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg group-hover:text-teal-700 transition-colors truncate">{item.name}</h3>
                  <p className="text-teal-600 font-black text-xl mt-1">${(item.price || 49).toFixed(2)}</p>
                </Link>
              ) })}
            </div>
          </section>
        )}

        {/* Recently Checked Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-800">Recently Viewed</h2>
            <Link href="/products" className="text-teal-600 font-bold hover:underline">View All</Link>
          </div>
          
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x">
            {(recentlyViewed.length > 0 ? recentlyViewed : []).map(itemId => {
              const item = products.find(p => (p._id || p.id) === itemId) || { _id: itemId, name: 'Product ' + itemId, price: 49 };
              return (
              <Link href={`/products/${item._id || item.id}`} key={item._id || item.id} className="shrink-0 w-64 snap-start bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow group" onClick={() => addRecentlyViewed(item._id || item.id)}>
                <div className="aspect-square bg-slate-100 rounded-xl mb-4 overflow-hidden relative flex items-center justify-center text-slate-400">
                  {item.imageUrl ? <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" /> : 'Product Image'}
                </div>
                <h3 className="font-bold text-slate-800 text-lg group-hover:text-teal-700 transition-colors truncate">{item.name}</h3>
                <p className="text-teal-600 font-black text-xl mt-1">${(item.price || 49).toFixed(2)}</p>
              </Link>
            ) })}
          </div>
        </section>
      </main>

      {/* Public Footer */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 font-medium">
          &copy; 2026 PrintoStyle Store. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
