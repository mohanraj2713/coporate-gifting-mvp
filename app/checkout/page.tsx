'use client';

import Link from 'next/link';
import { useStore } from '@/components/StoreProvider';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { isSignedIn, signOut, cart, clearCart } = useStore();
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  
  useEffect(() => {
    fetch('/api/gifts').then(r => r.json()).then(data => setProducts(data)).catch(console.error);
  }, []);
  
  const cartItems = cart.map(itemId => {
    const p = products.find(prod => (prod._id || prod.id) === itemId);
    return p ? p : { _id: itemId, name: 'Premium Item', price: 49.00 };
  });
  
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price || 49), 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handlePlaceOrder = () => {
    alert('Order placed successfully!');
    clearCart();
    router.push('/');
  };

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
          <div className="flex items-center gap-6">
            <Link href="/products" className="text-teal-600 font-bold hover:underline">
              &larr; Back to Shopping
            </Link>
            {isSignedIn && (
              <div className="flex items-center gap-4 border-l border-slate-200 pl-6">
                <span className="font-semibold text-slate-600">User</span>
                <button 
                  onClick={() => signOut()} 
                  className="bg-slate-100 text-slate-600 px-5 py-2 rounded-lg font-bold hover:bg-slate-200"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row gap-8">
        
        {/* Left Side - Checkout Form */}
        <div className="flex-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Contact Information</h2>
            <div className="space-y-4">
              <input type="email" placeholder="Email Address" defaultValue="user@example.com" className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Shipping Address</h2>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="First Name" className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
              <input type="text" placeholder="Last Name" className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
              <input type="text" placeholder="Address Line 1" className="col-span-2 w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
              <input type="text" placeholder="City" className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
              <input type="text" placeholder="Postal Code" className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Payment Method</h2>
            <div className="p-4 border border-teal-500 bg-teal-50 rounded-xl flex items-center justify-between cursor-pointer">
              <span className="font-semibold text-teal-800">Credit Card</span>
              <div className="w-5 h-5 rounded-full border-4 border-teal-600 bg-white"></div>
            </div>
            <div className="mt-4 space-y-4">
              <input type="text" placeholder="Card Number" className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="MM/YY" className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                <input type="text" placeholder="CVC" className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Order Summary */}
        <aside className="w-full md:w-1/3">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm sticky top-28">
            <h2 className="text-xl font-bold text-slate-800 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center">
                <div className="flex gap-4 items-center">
                  <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center text-xs text-slate-400">Image</div>
                  <div>
                    <h4 className="font-bold text-slate-800">Premium Item</h4>
                    <p className="text-sm text-slate-500">Qty: 1</p>
                  </div>
                </div>
                <p className="font-bold text-teal-700">$49.00</p>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-4 space-y-2 text-sm font-medium">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>$49.00</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Taxes</span>
                <span>$4.90</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-slate-800 pt-2 border-t border-slate-200">
                <span>Total</span>
                <span className="text-teal-600">$53.90</span>
              </div>
            </div>

            <button className="w-full mt-8 bg-teal-600 text-white font-bold py-4 rounded-xl hover:bg-teal-700 transition-colors shadow-lg">
              Complete Order
            </button>
          </div>
        </aside>

      </main>
    </div>
  );
}
