'use client';

import Link from 'next/link';
import { useStore } from '@/components/StoreProvider';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function CartPage() {
  const { cart, toggleCart, isSignedIn, signOut } = useStore();
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/gifts').then(r => r.json()).then(data => setProducts(data)).catch(console.error);
  }, []);

  const cartItems = cart.map(itemId => {
    const p = products.find(prod => (prod._id || prod.id) === itemId);
    return p ? p : { _id: itemId, name: 'Premium Item ' + itemId, price: 49.00 };
  });

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price || 49), 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-600 flex items-center justify-center text-white font-black text-lg">P</div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-teal-800">PrintoStyle Store</span>
            </div>
          </Link>
          <nav className="flex gap-6 items-center">
            <Link href="/" className="font-semibold text-slate-600 hover:text-teal-600">Home</Link>
            <Link href="/products" className="font-semibold text-slate-600 hover:text-teal-600">Products</Link>
            <Link href="/cart" className="font-semibold text-teal-600 border-b-2 border-teal-600 pb-1">Cart {cart.length > 0 && `(${cart.length})`}</Link>
            
            {isSignedIn ? (
              <div className="flex items-center gap-4">
                <span className="font-semibold text-slate-600">User</span>
                <button onClick={() => signOut()} className="bg-slate-100 text-slate-600 px-5 py-2 rounded-lg font-bold hover:bg-slate-200">Sign Out</button>
              </div>
            ) : (
              <Link href="/products" className="bg-teal-600 text-white px-5 py-2 rounded-lg font-bold shadow-md hover:bg-teal-700">Sign In</Link>
            )}
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Your Shopping Cart</h1>
          <Link href="/products" className="text-teal-600 font-bold hover:underline">Continue Shopping</Link>
        </div>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-20 bg-white border border-slate-200 rounded-2xl">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Your cart is empty</h2>
            <Link href="/products" className="text-teal-600 font-bold hover:underline">Start adding some products!</Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 space-y-4">
              {cartItems.map(item => (
                <div key={item._id} className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-slate-100 rounded-xl flex items-center justify-center overflow-hidden">
                      {item.imageUrl ? <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" /> : <span className="text-xs text-slate-400">Image</span>}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-lg">{item.name}</h3>
                      <p className="text-sm text-slate-500">Qty: 1</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <p className="font-bold text-teal-700 text-xl">${(item.price || 49).toFixed(2)}</p>
                    <button 
                      onClick={() => toggleCart(item._id)}
                      className="text-rose-500 hover:text-rose-700 font-medium text-sm flex items-center gap-1 bg-rose-50 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <aside className="w-full lg:w-1/3">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm sticky top-28">
                <h2 className="text-xl font-bold text-slate-800 mb-6">Cart Summary</h2>
                <div className="space-y-3 text-slate-600 font-medium">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-slate-200 mt-4 pt-4 flex justify-between items-center">
                    <span className="font-bold text-slate-800">Total</span>
                    <span className="text-2xl font-black text-teal-700">${total.toFixed(2)}</span>
                  </div>
                </div>
                <button 
                  onClick={() => router.push('/checkout')}
                  className="w-full mt-6 bg-teal-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-teal-700 transition-colors"
                >
                  Proceed to Checkout
                </button>
              </div>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}
