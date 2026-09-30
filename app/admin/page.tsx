'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  Package, 
  Tag, 
  Building2, 
  Gift, 
  ShoppingBag, 
  Users, 
  Truck, 
  Boxes, 
  Plus,
  Search,
  CheckCircle2,
  Clock,
  FileSpreadsheet,
  ArrowUpRight,
  SlidersHorizontal,
  Sparkles,
  Download,
  MoreHorizontal,
  ShieldCheck,
  Filter
} from 'lucide-react';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'customers' | 'campaigns' | 'orders' | 'recipients' | 'vendors' | 'inventory' | 'delivery'>('products');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);

  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [recipients, setRecipients] = useState<any[]>([]);
  const [vendors, setVendors] = useState<any[]>([]);
  const [inventory, setInventory] = useState<any[]>([]);
  const [delivery, setDelivery] = useState<any[]>([]);

  const tabs = [
    { id: 'products', name: 'Products', icon: Package, count: products.length },
    { id: 'categories', name: 'Categories', icon: Tag, count: categories.length },
    { id: 'customers', name: 'Customers', icon: Building2, count: customers.length },
    { id: 'campaigns', name: 'Campaigns', icon: Gift, count: campaigns.length },
    { id: 'orders', name: 'Orders', icon: ShoppingBag, count: orders.length },
    { id: 'recipients', name: 'Recipients', icon: Users, count: recipients.length },
    { id: 'vendors', name: 'Vendors', icon: Boxes, count: vendors.length },
    { id: 'inventory', name: 'Inventory', icon: FileSpreadsheet, count: inventory.length },
    { id: 'delivery', name: 'Delivery Status', icon: Truck, count: delivery.length },
  ];

  useEffect(() => {
    fetch('/api/products').then(res => res.json()).then(data => { if (data && data.length > 0) setProducts(data); }).catch(console.error);
    fetch('/api/categories').then(res => res.json()).then(data => { if (data && data.length > 0) setCategories(data); }).catch(console.error);
    fetch('/api/customers').then(res => res.json()).then(data => { if (data && Array.isArray(data)) setCustomers(data); }).catch(console.error);
    fetch('/api/campaigns').then(res => res.json()).then(data => { if (data && Array.isArray(data)) setCampaigns(data); }).catch(console.error);
    fetch('/api/orders').then(res => res.json()).then(data => { if (data && Array.isArray(data)) setOrders(data); }).catch(console.error);
    fetch('/api/recipients').then(res => res.json()).then(data => { if (data && Array.isArray(data)) setRecipients(data); }).catch(console.error);
    fetch('/api/vendors').then(res => res.json()).then(data => { if (data && Array.isArray(data)) setVendors(data); }).catch(console.error);
    fetch('/api/inventory').then(res => res.json()).then(data => { if (data && Array.isArray(data)) setInventory(data); }).catch(console.error);
    fetch('/api/delivery').then(res => res.json()).then(data => { if (data && Array.isArray(data)) setDelivery(data); }).catch(console.error);
  }, []);

  return (
    <div className="space-y-6">
      
      {/* HEADER SECTION (LINEAR/VERCEL STYLE) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-900 text-white">
              Admin Ops
            </span>
            <span className="text-xs font-semibold text-slate-500">Live Management Engine</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 font-heading">
            Admin Operations Portal
          </h1>
          <p className="text-slate-500 text-xs mt-0.5">
            Manage product catalog, category hierarchy, client accounts, orders, inventory, and delivery tracking.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-slate-200 text-xs font-semibold h-9 rounded-xl flex items-center gap-2">
            <Download className="w-3.5 h-3.5" /> Export Data
          </Button>
          <Button 
            onClick={() => activeTab === 'categories' ? setShowAddCategoryModal(true) : setShowAddItemModal(true)}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs h-9 px-4 rounded-xl flex items-center gap-2 shadow-soft-sm"
          >
            <Plus className="w-3.5 h-3.5" /> {activeTab === 'categories' ? 'Add New Category' : 'Add New Item'}
          </Button>
        </div>
      </div>

      {/* METRIC CARDS (HIGH-CONTRAST APP SHELL STYLE) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white border-slate-200 shadow-soft-sm p-4 rounded-2xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Enterprise Clients</span>
            <div className="p-2 rounded-xl bg-slate-100 text-slate-700">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <p className="text-2xl font-black text-slate-900 font-heading">24 Companies</p>
            <p className="text-xs font-semibold text-emerald-600 mt-0.5 flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" /> +18% growth
            </p>
          </div>
        </Card>

        <Card className="bg-white border-slate-200 shadow-soft-sm p-4 rounded-2xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Catalog Items</span>
            <div className="p-2 rounded-xl bg-slate-100 text-slate-700">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <p className="text-2xl font-black text-slate-900 font-heading">{products.length} Products</p>
            <p className="text-xs font-semibold text-indigo-600 mt-0.5">
              {categories.length} Active Categories
            </p>
          </div>
        </Card>

        <Card className="bg-white border-slate-200 shadow-soft-sm p-4 rounded-2xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Orders Pipeline</span>
            <div className="p-2 rounded-xl bg-slate-100 text-slate-700">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <p className="text-2xl font-black text-slate-900 font-heading">48 Active</p>
            <p className="text-xs font-semibold text-amber-600 mt-0.5">
              8 Pending Approval
            </p>
          </div>
        </Card>

        <Card className="bg-white border-slate-200 shadow-soft-sm p-4 rounded-2xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Fulfillment Rate</span>
            <div className="p-2 rounded-xl bg-slate-100 text-slate-700">
              <Truck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <p className="text-2xl font-black text-emerald-600 font-heading">98.4%</p>
            <p className="text-xs font-semibold text-emerald-600 mt-0.5">
              Courier On-Time Rate
            </p>
          </div>
        </Card>
      </div>

      {/* LINEAR STYLE TAB BAR */}
      <div className="border-b border-slate-200 flex overflow-x-auto gap-6 scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 text-xs font-bold whitespace-nowrap flex items-center gap-2 border-b-2 transition-all ${
                isActive
                  ? 'border-slate-900 text-slate-900'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-slate-900' : 'text-slate-400'}`} />
              <span>{tab.name}</span>
              <span className={`px-2 py-0.2 rounded-full text-[10px] font-extrabold ${
                isActive ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* SEARCH AND FILTERS TOOLBAR */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-soft-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={`Filter ${activeTab}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs font-medium rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-slate-900 text-slate-900"
          />
        </div>
        <Button variant="outline" className="border-slate-200 text-xs font-semibold h-8 rounded-xl flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-500" /> Filter Options
        </Button>
      </div>

      {/* MAIN DATA TABLE CARD */}
      <Card className="bg-white border-slate-200 shadow-soft-sm rounded-2xl overflow-hidden">
        
        {/* Products Table */}
        {activeTab === 'products' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3.5">Product Name</th>
                  <th className="px-6 py-3.5">Category</th>
                  <th className="px-6 py-3.5">Unit Price</th>
                  <th className="px-6 py-3.5">Stock</th>
                  <th className="px-6 py-3.5">Vendor Supplier</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {products.map((p) => (
                  <tr key={p._id || p.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 font-bold">
                          <Package className="w-4 h-4 text-slate-600" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{p.name}</p>
                          <p className="text-[10px] text-slate-400 font-mono">SKU-{p._id || p.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-slate-100 text-slate-800 font-bold px-2.5 py-0.5 rounded text-[11px] border border-slate-200">
                        {p.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-extrabold text-slate-900">${p.price.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-emerald-700">{p.stock} units</span>
                    </td>
                    <td className="px-6 py-4 text-slate-600 font-medium">{p.vendor}</td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="outline" size="sm" className="rounded-lg text-[11px] font-bold border-slate-200 h-7">
                        Edit Item
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Categories Grid */}
        {activeTab === 'categories' && (
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex justify-between items-center hover:bg-slate-100/60 transition-colors">
                <div>
                  <h3 className="font-bold text-slate-900 text-xs">{cat.name}</h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">{cat.count} Active Products</p>
                </div>
                <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded text-[11px] border border-emerald-200">
                  {cat.growth}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Customers Table */}
        {activeTab === 'customers' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3.5">Company Account</th>
                  <th className="px-6 py-3.5">Admin Email</th>
                  <th className="px-6 py-3.5">Team Seats</th>
                  <th className="px-6 py-3.5">Total Spend</th>
                  <th className="px-6 py-3.5">Plan Tier</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {customers.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-900 text-white font-black text-xs flex items-center justify-center">
                          {c.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{c.name}</p>
                          <p className="text-[10px] text-emerald-600 font-bold">{c.status}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 font-medium">{c.email}</td>
                    <td className="px-6 py-4 font-bold text-slate-800">{c.userCount} seats</td>
                    <td className="px-6 py-4 font-extrabold text-slate-900">{c.spending}</td>
                    <td className="px-6 py-4">
                      <span className="bg-slate-100 text-slate-800 font-bold px-2.5 py-0.5 rounded text-[11px] border border-slate-200">
                        {c.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="outline" size="sm" className="rounded-lg text-[11px] font-bold border-slate-200 h-7">
                        Manage Account
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Orders Table */}
        {(activeTab === 'orders' || activeTab === 'delivery') && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3.5">Order ID</th>
                  <th className="px-6 py-3.5">Company Account</th>
                  <th className="px-6 py-3.5">Gift Item</th>
                  <th className="px-6 py-3.5">Quantity</th>
                  <th className="px-6 py-3.5">Total Amount</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-right">Update Workflow</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-slate-900">{o.id}</td>
                    <td className="px-6 py-4 font-bold text-slate-900">{o.company}</td>
                    <td className="px-6 py-4 text-slate-700 font-medium">{o.gift}</td>
                    <td className="px-6 py-4 font-bold">{o.qty} units</td>
                    <td className="px-6 py-4 font-extrabold text-slate-900">{o.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold ${
                        o.status === 'Delivered' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        o.status === 'Shipped' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                        'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {o.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <select className="text-xs font-semibold border border-slate-200 rounded-lg px-2 py-1 bg-white text-slate-800">
                        <option>Pending</option>
                        <option>Confirmed</option>
                        <option>Processing</option>
                        <option>Shipped</option>
                        <option>Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Fallback */}
        {['recipients', 'vendors', 'inventory'].includes(activeTab) && (
          <div className="p-12 text-center space-y-2">
            <Boxes className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="text-sm font-bold text-slate-900 capitalize">{activeTab} Operational Portal</h3>
            <p className="text-slate-500 text-xs max-w-sm mx-auto">
              Real-time control panel for batch operations and ERP inventory synchronization.
            </p>
          </div>
        )}
      </Card>

      {/* Add New Item Modal */}
      {showAddItemModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">Add New Product</h2>
              <button 
                onClick={() => setShowAddItemModal(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>
            
            <form onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const newProduct = {
                name: formData.get('name'),
                category: formData.get('category'),
                price: Number(formData.get('price')),
                stock: Number(formData.get('stock')),
                vendor: 'Internal', // hardcoded vendor for MVP form
                imageUrl: formData.get('imageUrl'),
              };
              try {
                const res = await fetch('/api/products', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(newProduct)
                });
                if (res.ok) {
                  const savedProduct = await res.json();
                  setProducts([savedProduct, ...products]);
                  setShowAddItemModal(false);
                }
              } catch (err) {
                console.error(err);
              }
            }}>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Product Name</label>
                  <input name="name" required type="text" placeholder="e.g. Premium Tech Bundle" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-slate-900 focus:outline-none" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                    <select name="category" required className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-slate-900 focus:outline-none bg-white">
                      <option>Employee Kits</option>
                      <option>Electronics</option>
                      <option>Apparel</option>
                      <option>Gift Hampers</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Unit Price ($)</label>
                    <input name="price" required type="number" step="0.01" placeholder="0.00" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-slate-900 focus:outline-none" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Stock Quantity</label>
                  <input name="stock" required type="number" placeholder="100" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-slate-900 focus:outline-none" />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Product Image URL</label>
                  <input name="imageUrl" type="url" placeholder="https://example.com/image.jpg" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-slate-900 focus:outline-none" />
                </div>
              </div>
              
              <div className="p-6 border-t border-slate-200 flex justify-end gap-3 bg-slate-50">
                <Button 
                  type="button"
                  variant="outline" 
                  onClick={() => setShowAddItemModal(false)}
                  className="rounded-lg font-bold"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 shadow-md"
                >
                  Save Product
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Add New Category Modal */}
      {showAddCategoryModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">Add New Category</h2>
              <button 
                onClick={() => setShowAddCategoryModal(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>
            
            <form onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const newCategory = {
                name: formData.get('name'),
                parentCategory: formData.get('parentCategory'),
                iconUrl: formData.get('iconUrl'),
                count: 0,
                growth: '+0%'
              };
              try {
                const res = await fetch('/api/categories', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(newCategory)
                });
                if (res.ok) {
                  const savedCategory = await res.json();
                  setCategories([savedCategory, ...categories]);
                  setShowAddCategoryModal(false);
                }
              } catch (err) {
                console.error(err);
              }
            }}>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category Name</label>
                  <input name="name" required type="text" placeholder="e.g. Desk Accessories" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-slate-900 focus:outline-none" />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Parent Category (Optional)</label>
                  <select name="parentCategory" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-slate-900 focus:outline-none bg-white">
                    <option value="">None (Top Level)</option>
                    <option>Employee Kits</option>
                    <option>Electronics</option>
                    <option>Apparel</option>
                    <option>Gift Hampers</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category Icon/Image URL</label>
                  <input name="iconUrl" type="url" placeholder="https://example.com/icon.png" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-slate-900 focus:outline-none" />
                </div>
              </div>
              
              <div className="p-6 border-t border-slate-200 flex justify-end gap-3 bg-slate-50">
                <Button 
                  type="button"
                  variant="outline" 
                  onClick={() => setShowAddCategoryModal(false)}
                  className="rounded-lg font-bold"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 shadow-md"
                >
                  Create Category
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
