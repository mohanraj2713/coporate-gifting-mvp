'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  Search, 
  Truck, 
  DollarSign, 
  CheckCircle2, 
  Package, 
  MoreVertical, 
  Plus, 
  FileText, 
  Download, 
  Clock, 
  ExternalLink,
  X,
  CreditCard,
  Building2,
  Calendar,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';

interface Order {
  _id: string;
  invoiceNumber: string;
  recipientName: string;
  recipientEmail: string;
  giftName: string;
  giftImage: string;
  quantity: number;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered';
  paymentStatus: 'pending' | 'paid' | 'failed';
  trackingNumber?: string;
  courier?: string;
  deliveryDate?: string;
  createdDate: string;
}

const orders: Order[] = [
  {
    _id: '1',
    invoiceNumber: 'INV-2026-8841',
    recipientName: 'Q3 Employee Appreciation Team',
    recipientEmail: 'sarah.j@acmecorp.com + 49 others',
    giftName: 'Executive Tech & Wellness Kit',
    giftImage: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&auto=format&fit=crop&q=60',
    quantity: 50,
    totalAmount: 7499.50,
    status: 'processing',
    paymentStatus: 'paid',
    trackingNumber: 'FX-8893420199-US',
    courier: 'FedEx Express',
    deliveryDate: '2026-10-30',
    createdDate: '2026-09-25'
  },
  {
    _id: '2',
    invoiceNumber: 'INV-2026-9932',
    recipientName: 'Q4 VIP Global Partners Group',
    recipientEmail: 'mbrown@clientgroup.com + 119 others',
    giftName: 'Artisanal Gourmet Celebration Hamper',
    giftImage: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=500&auto=format&fit=crop&q=60',
    quantity: 120,
    totalAmount: 14280.00,
    status: 'confirmed',
    paymentStatus: 'paid',
    trackingNumber: 'DHL-300492811-INT',
    courier: 'DHL Worldwide',
    deliveryDate: '2026-12-15',
    createdDate: '2026-09-20'
  },
  {
    _id: '3',
    invoiceNumber: 'INV-2026-7721',
    recipientName: 'Engineering Onboarding Batch #4',
    recipientEmail: 'elena.r@acmecorp.com + 24 others',
    giftName: 'Premium Leather Work Tote',
    giftImage: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&auto=format&fit=crop&q=60',
    quantity: 25,
    totalAmount: 3125.00,
    status: 'shipped',
    paymentStatus: 'paid',
    trackingNumber: 'UPS-1Z9999999999999999',
    courier: 'UPS Ground',
    deliveryDate: '2026-10-05',
    createdDate: '2026-09-01'
  },
  {
    _id: '4',
    invoiceNumber: 'INV-2026-6104',
    recipientName: 'Sales Leadership Achievers',
    recipientEmail: 'jessica.c@acmecorp.com + 39 others',
    giftName: 'ANC Wireless Headphones',
    giftImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60',
    quantity: 40,
    totalAmount: 5960.00,
    status: 'delivered',
    paymentStatus: 'paid',
    trackingNumber: 'FX-7740291048-US',
    courier: 'FedEx Priority',
    deliveryDate: '2026-08-28',
    createdDate: '2026-08-10'
  }
];

const statusStyles: Record<string, { bg: string; text: string; border: string; label: string }> = {
  pending: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', label: 'Pending Payment' },
  confirmed: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', label: 'Confirmed' },
  processing: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200', label: 'In Fulfillment' },
  shipped: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', label: 'In Transit' },
  delivered: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', label: 'Delivered' },
};

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter((o) => {
    const matchesSearch = o.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          o.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          o.giftName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalSpent = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  return (
    <div className="space-y-6">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-slate-500">Workspace</span>
            <span className="text-slate-300">/</span>
            <span className="text-xs font-bold text-slate-900">Orders & Invoices</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 font-heading">
            Corporate Orders & Official Invoices
          </h1>
          <p className="text-slate-500 text-xs mt-0.5">
            Track individual courier fulfillment, invoice PDF downloads, and Net30 corporate billing status.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button asChild className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-soft-sm flex items-center gap-2 px-4 py-2.5">
            <Link href="/campaigns/create">
              <Plus className="w-4 h-4" /> Place New Campaign Order
            </Link>
          </Button>
        </div>
      </div>

      {/* METRIC KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white border-slate-200 shadow-soft-sm rounded-2xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Orders</span>
            <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">{orders.length} Placed</div>
          <p className="text-[11px] text-slate-500 mt-1 font-medium">100% Net30 paid</p>
        </Card>

        <Card className="bg-white border-slate-200 shadow-soft-sm rounded-2xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Invoiced</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">${totalSpent.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
          <p className="text-[11px] text-slate-500 mt-1 font-medium">USD tax inclusive</p>
        </Card>

        <Card className="bg-white border-slate-200 shadow-soft-sm rounded-2xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">In Transit</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
              <Truck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">
            {orders.filter(o => o.status === 'shipped' || o.status === 'processing').length} Shipments
          </div>
          <p className="text-[11px] text-slate-500 mt-1 font-medium">Real-time GPS tracking</p>
        </Card>

        <Card className="bg-white border-slate-200 shadow-soft-sm rounded-2xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Delivered</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">
            {orders.filter(o => o.status === 'delivered').length} Completed
          </div>
          <p className="text-[11px] text-slate-500 mt-1 font-medium">Digital receipt signed</p>
        </Card>
      </div>

      {/* SEARCH AND STATUS FILTERS */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-soft-sm space-y-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by invoice #, recipient, or gift item..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 text-slate-900 text-xs font-medium placeholder-slate-400"
            />
          </div>

          {/* Status Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {['all', 'processing', 'confirmed', 'shipped', 'delivered'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all whitespace-nowrap ${
                  statusFilter === st
                    ? 'bg-slate-900 text-white shadow-soft-sm'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {st === 'all' ? 'All Orders' : st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ORDERS DATA TABLE */}
      <Card className="bg-white border-slate-200 shadow-soft-sm rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-5 py-3.5">Invoice #</th>
                <th className="px-5 py-3.5">Target Recipient Group</th>
                <th className="px-5 py-3.5">Selected Gift</th>
                <th className="px-5 py-3.5">Units</th>
                <th className="px-5 py-3.5">Total Amount</th>
                <th className="px-5 py-3.5">Fulfillment Status</th>
                <th className="px-5 py-3.5">Payment</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredOrders.map((order) => {
                const status = statusStyles[order.status] || statusStyles.pending;
                return (
                  <tr key={order._id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-5 py-4">
                      <div className="font-bold text-slate-900 text-sm font-mono">{order.invoiceNumber}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{order.createdDate}</div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="font-bold text-slate-900">{order.recipientName}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5 truncate max-w-[200px]">{order.recipientEmail}</div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2.5">
                        <img 
                          src={order.giftImage} 
                          alt={order.giftName} 
                          className="w-9 h-9 object-cover rounded-xl border border-slate-200 shrink-0" 
                        />
                        <span className="font-bold text-slate-900 truncate max-w-[160px]">{order.giftName}</span>
                      </div>
                    </td>

                    <td className="px-5 py-4 font-bold text-slate-900">
                      {order.quantity} units
                    </td>

                    <td className="px-5 py-4 font-black text-slate-900 text-sm">
                      ${order.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>

                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold border ${status.bg} ${status.text} ${status.border}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5"></span>
                        {status.label}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Paid (Net30)
                      </span>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900 font-bold text-xs flex items-center gap-1 transition-all"
                      >
                        <FileText className="w-3.5 h-3.5 text-indigo-600" /> Invoice PDF
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-sm font-bold text-slate-800">No orders found</h3>
              <p className="text-xs text-slate-500 mt-1">Try adjusting your search filter.</p>
            </div>
          )}
        </div>
      </Card>

      {/* INVOICE PREVIEW MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-soft-xl max-w-xl w-full p-6 space-y-6 relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Official Invoice Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <div className="w-10 h-10 bg-slate-900 rounded-xl text-white font-black text-sm flex items-center justify-center mb-1">
                  ACME
                </div>
                <h3 className="font-extrabold text-slate-900 text-base">Acme Corporate Gifting MVP</h3>
                <p className="text-[10px] text-slate-400">Tax ID: US-884920194 • Net30 Billing</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-extrabold text-indigo-600 font-mono">{selectedOrder.invoiceNumber}</span>
                <p className="text-xs font-bold text-slate-800 mt-0.5">Date: {selectedOrder.createdDate}</p>
                <span className="inline-block mt-1 px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                  PAYMENT COMPLETED
                </span>
              </div>
            </div>

            {/* Line Items */}
            <div className="space-y-3 text-xs">
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">{selectedOrder.giftName}</p>
                  <p className="text-[11px] text-slate-500">Custom Logo Engraving + Greeting Card Included</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900">{selectedOrder.quantity} units</p>
                  <p className="text-xs font-black text-slate-900">${selectedOrder.totalAmount.toFixed(2)}</p>
                </div>
              </div>

              {/* Courier info */}
              <div className="p-3.5 rounded-2xl bg-indigo-50/50 border border-indigo-200/60 flex items-center justify-between text-indigo-900">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-indigo-600" />
                  <div>
                    <p className="font-bold">{selectedOrder.courier}</p>
                    <p className="text-[10px] text-indigo-700">Tracking: {selectedOrder.trackingNumber}</p>
                  </div>
                </div>
                <span className="font-bold text-[11px] underline cursor-pointer">Track Courier</span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={() => setSelectedOrder(null)} className="rounded-xl text-xs font-bold border-slate-200">
                Close
              </Button>
              <Button onClick={() => alert(`Downloading official PDF for ${selectedOrder.invoiceNumber}...`)} className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-2">
                <Download className="w-3.5 h-3.5" /> Download Printable PDF
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

