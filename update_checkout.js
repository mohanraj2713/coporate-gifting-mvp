const fs = require('fs');

let code = fs.readFileSync('app/checkout/page.tsx', 'utf8');

if (!code.includes('useEffect')) {
  code = code.replace(/import { useStore } from '@\/components\/StoreProvider';/, "import { useStore } from '@/components/StoreProvider';\nimport { useState, useEffect } from 'react';\nimport { useRouter } from 'next/navigation';");
}

const stateCode = `  const { isSignedIn, signOut, cart, clearCart } = useStore();
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
  };`;

code = code.replace(
  `  const { isSignedIn, signOut } = useStore();`,
  stateCode
);

const oldOrderSummary = `            <div className="space-y-4 mb-6">
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
                <span className="text-emerald-600">Free</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Estimated Tax</span>
                <span>$4.90</span>
              </div>
            </div>

            <div className="border-t border-slate-200 mt-4 pt-4 flex justify-between items-center">
              <span className="font-bold text-slate-800">Total</span>
              <span className="text-2xl font-black text-teal-700">$53.90</span>
            </div>

            <button className="w-full mt-6 bg-teal-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-teal-700 transition-colors">
              Place Order
            </button>`;

const newOrderSummary = `            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2">
              {cartItems.length === 0 ? (
                <p className="text-slate-500 text-sm text-center py-4">Your cart is empty.</p>
              ) : (
                cartItems.map(item => (
                  <div key={item._id} className="flex justify-between items-center">
                    <div className="flex gap-4 items-center">
                      <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center text-xs text-slate-400 overflow-hidden">
                        {item.imageUrl ? <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" /> : 'Image'}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800">{item.name}</h4>
                        <p className="text-sm text-slate-500">Qty: 1</p>
                      </div>
                    </div>
                    <p className="font-bold text-teal-700">$\{(item.price || 49).toFixed(2)}</p>
                  </div>
                ))
              )}
            </div>

            <div className="border-t border-slate-200 pt-4 space-y-2 text-sm font-medium">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>$\{(subtotal).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                <span className="text-emerald-600">Free</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Estimated Tax</span>
                <span>$\{(tax).toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-slate-200 mt-4 pt-4 flex justify-between items-center">
              <span className="font-bold text-slate-800">Total</span>
              <span className="text-2xl font-black text-teal-700">$\{(total).toFixed(2)}</span>
            </div>

            <button 
              onClick={handlePlaceOrder}
              disabled={cartItems.length === 0}
              className="w-full mt-6 bg-teal-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Place Order
            </button>`;

code = code.replace(oldOrderSummary, newOrderSummary);

fs.writeFileSync('app/checkout/page.tsx', code);
console.log('Updated checkout page');
