'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  Plus, 
  Search, 
  Calendar, 
  Box, 
  DollarSign, 
  MoreVertical, 
  Filter, 
  Sparkles, 
  Users, 
  Truck, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight,
  ChevronRight,
  Eye,
  FileSpreadsheet,
  X
} from 'lucide-react';
import Link from 'next/link';

interface Campaign {
  _id: string;
  name: string;
  occasion: string;
  status: 'draft' | 'pending' | 'approved' | 'processing' | 'shipped' | 'delivered';
  quantity: number;
  budget: number;
  spent: number;
  deliveryDate: string;
  giftName: string;
  giftImage: string;
  department: string;
  createdDate: string;
}

const campaigns: Campaign[] = [
  {
    _id: '1',
    name: 'Q3 Employee Appreciation Milestone',
    occasion: 'Employee Appreciation',
    status: 'processing',
    quantity: 50,
    budget: 7500,
    spent: 7499.50,
    deliveryDate: '2026-10-30',
    giftName: 'Executive Tech & Wellness Kit',
    giftImage: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&auto=format&fit=crop&q=60',
    department: 'Engineering & Product',
    createdDate: '2026-09-15'
  },
  {
    _id: '2',
    name: 'Q4 Global VIP Partner Holiday Gifting',
    occasion: 'Holiday & New Year',
    status: 'approved',
    quantity: 120,
    budget: 18000,
    spent: 14280.00,
    deliveryDate: '2026-12-15',
    giftName: 'Artisanal Gourmet Celebration Hamper',
    giftImage: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=500&auto=format&fit=crop&q=60',
    department: 'Executive Office & Partners',
    createdDate: '2026-09-20'
  },
  {
    _id: '3',
    name: 'Engineering Onboarding Welcome Swag',
    occasion: 'Client Onboarding',
    status: 'shipped',
    quantity: 25,
    budget: 3750,
    spent: 3125.00,
    deliveryDate: '2026-10-05',
    giftName: 'Premium Leather Work Tote',
    giftImage: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&auto=format&fit=crop&q=60',
    department: 'Human Resources',
    createdDate: '2026-09-01'
  },
  {
    _id: '4',
    name: 'Annual Leadership Achievement Awards',
    occasion: 'Sales Goal Achievement',
    status: 'delivered',
    quantity: 40,
    budget: 6000,
    spent: 5960.00,
    deliveryDate: '2026-08-28',
    giftName: 'ANC Wireless Headphones',
    giftImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60',
    department: 'Sales & Revenue',
    createdDate: '2026-08-10'
  },
  {
    _id: '5',
    name: 'Customer Renewal Loyalty Kit (Draft)',
    occasion: 'Work Anniversary',
    status: 'draft',
    quantity: 15,
    budget: 2000,
    spent: 0,
    deliveryDate: '2026-11-01',
    giftName: 'Smart Insulated Hydration Flask',
    giftImage: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&auto=format&fit=crop&q=60',
    department: 'Customer Success',
    createdDate: '2026-09-25'
  }
];

const statusStyles: Record<string, { bg: string; text: string; border: string; label: string }> = {
  draft: { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-200', label: 'Draft' },
  pending: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200/80', label: 'Pending Approval' },
  approved: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200/80', label: 'Approved' },
  processing: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200/80', label: 'Processing' },
  shipped: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200/80', label: 'Shipped' },
  delivered: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200/80', label: 'Delivered' },
};

export default function CampaignsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [activeModalCampaign, setActiveModalCampaign] = useState<Campaign | null>(null);

  const filteredCampaigns = campaigns.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.occasion.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.giftName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || c.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const totalBudget = campaigns.reduce((acc, c) => acc + c.budget, 0);
  const totalSpent = campaigns.reduce((acc, c) => acc + c.spent, 0);
  const totalGifts = campaigns.reduce((acc, c) => acc + c.quantity, 0);

  return (
    <div className="space-y-6">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-slate-500">Workspace</span>
            <span className="text-slate-300">/</span>
            <span className="text-xs font-bold text-slate-900">Campaigns</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 font-heading">
            Corporate Campaigns Management
          </h1>
          <p className="text-slate-500 text-xs mt-0.5">
            Monitor active gifting initiatives, recipient distribution, budgets, and automated courier dispatches.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="rounded-xl border-slate-200 text-xs font-bold flex items-center gap-2">
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" /> Export CSV Report
          </Button>
          <Button asChild className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-soft-sm flex items-center gap-2 px-4 py-2.5">
            <Link href="/campaigns/create">
              <Plus className="w-4 h-4" /> Create New Campaign
            </Link>
          </Button>
        </div>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white border-slate-200 shadow-soft-sm rounded-2xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Campaigns</span>
            <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">{campaigns.length}</div>
          <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1 font-medium">
            <span className="text-emerald-600 font-bold flex items-center">+2 this month</span> across 4 departments
          </p>
        </Card>

        <Card className="bg-white border-slate-200 shadow-soft-sm rounded-2xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Recipients</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">{totalGifts} People</div>
          <p className="text-[11px] text-slate-500 mt-1 font-medium">
            100% verified shipping addresses
          </p>
        </Card>

        <Card className="bg-white border-slate-200 shadow-soft-sm rounded-2xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Allocated Budget</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">${totalBudget.toLocaleString()}</div>
          <p className="text-[11px] text-slate-500 mt-1 font-medium">
            Spent: <span className="font-bold text-slate-800">${totalSpent.toLocaleString()}</span> (84.1%)
          </p>
        </Card>

        <Card className="bg-white border-slate-200 shadow-soft-sm rounded-2xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Courier Dispatches</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
              <Truck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">
            {campaigns.filter(c => c.status === 'shipped' || c.status === 'delivered').length} Active
          </div>
          <p className="text-[11px] text-slate-500 mt-1 font-medium">
            FedEx & DHL Express integrated
          </p>
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
              placeholder="Search by campaign name, gift product, or occasion..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 text-slate-900 text-xs font-medium placeholder-slate-400"
            />
          </div>

          {/* Status Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {['all', 'processing', 'approved', 'shipped', 'delivered', 'draft'].map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all whitespace-nowrap ${
                  selectedStatus === st
                    ? 'bg-slate-900 text-white shadow-soft-sm'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {st === 'all' ? 'All Campaigns' : st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CAMPAIGN TABLE */}
      <Card className="bg-white border-slate-200 shadow-soft-sm rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-5 py-3.5">Campaign & Department</th>
                <th className="px-5 py-3.5">Selected Product</th>
                <th className="px-5 py-3.5">Recipients</th>
                <th className="px-5 py-3.5">Budget & Spent</th>
                <th className="px-5 py-3.5">Target Delivery</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredCampaigns.map((campaign) => {
                const status = statusStyles[campaign.status] || statusStyles.draft;
                return (
                  <tr key={campaign._id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-5 py-4">
                      <div className="font-bold text-slate-900 text-sm">{campaign.name}</div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold">{campaign.occasion}</span>
                        <span>•</span>
                        <span>{campaign.department}</span>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={campaign.giftImage} 
                          alt={campaign.giftName} 
                          className="w-10 h-10 object-cover rounded-xl border border-slate-200 shrink-0" 
                        />
                        <div className="min-w-0">
                          <p className="font-bold text-slate-900 truncate max-w-[180px]">{campaign.giftName}</p>
                          <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                            <Sparkles className="w-3 h-3" /> Logo Customized
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5 font-bold text-slate-900">
                        <Users className="w-3.5 h-3.5 text-slate-400" /> {campaign.quantity} Recipients
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5">Addresses Verified</p>
                    </td>

                    <td className="px-5 py-4">
                      <div className="font-bold text-slate-900">${campaign.budget.toLocaleString()}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        Spent: <span className="font-semibold text-slate-700">${campaign.spent.toLocaleString()}</span>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5 text-slate-800 font-semibold">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" /> {campaign.deliveryDate}
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5">Created {campaign.createdDate}</p>
                    </td>

                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold border ${status.bg} ${status.text} ${status.border}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5"></span>
                        {status.label}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setActiveModalCampaign(campaign)}
                          className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900 font-bold text-xs flex items-center gap-1 transition-all"
                        >
                          <Eye className="w-3.5 h-3.5" /> Details
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredCampaigns.length === 0 && (
            <div className="text-center py-12">
              <Box className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-sm font-bold text-slate-800">No campaigns found matching criteria</h3>
              <p className="text-xs text-slate-500 mt-1">Try clearing your filters or create a new corporate campaign.</p>
            </div>
          )}
        </div>
      </Card>

      {/* CAMPAIGN DETAILS MODAL */}
      {activeModalCampaign && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-soft-xl max-w-xl w-full p-6 space-y-6 relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setActiveModalCampaign(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-start gap-4">
              <img 
                src={activeModalCampaign.giftImage} 
                alt={activeModalCampaign.giftName} 
                className="w-20 h-20 object-cover rounded-2xl border border-slate-200"
              />
              <div>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border mb-1 ${statusStyles[activeModalCampaign.status].bg} ${statusStyles[activeModalCampaign.status].text} ${statusStyles[activeModalCampaign.status].border}`}>
                  {statusStyles[activeModalCampaign.status].label}
                </span>
                <h3 className="text-lg font-bold font-heading text-slate-900">{activeModalCampaign.name}</h3>
                <p className="text-xs text-slate-500">{activeModalCampaign.occasion} | {activeModalCampaign.department}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Gift Product</p>
                <p className="font-bold text-slate-900 mt-0.5">{activeModalCampaign.giftName}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Recipients Count</p>
                <p className="font-bold text-slate-900 mt-0.5">{activeModalCampaign.quantity} Employees / Clients</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Total Budget</p>
                <p className="font-bold text-slate-900 mt-0.5">${activeModalCampaign.budget.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Target Delivery</p>
                <p className="font-bold text-slate-900 mt-0.5">{activeModalCampaign.deliveryDate}</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Fulfillment & Tracking Timeline</h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200/60 text-emerald-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <p className="font-bold">Campaign Order Approved & Payment Processed</p>
                    <p className="text-[10px] text-emerald-700">Invoice #INV-9932 paid via Corporate Net30 account</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-indigo-50 border border-indigo-200/60 text-indigo-900">
                  <Box className="w-4 h-4 text-indigo-600 shrink-0" />
                  <div>
                    <p className="font-bold">Logo Branding & Laser Engraving in Warehouse</p>
                    <p className="text-[10px] text-indigo-700">Custom logo vector verified and applied to products</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-600">
                  <Truck className="w-4 h-4 text-slate-400 shrink-0" />
                  <div>
                    <p className="font-semibold">FedEx Express Individual Courier Dispatch</p>
                    <p className="text-[10px] text-slate-400">Estimated dispatch date: {activeModalCampaign.deliveryDate}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={() => setActiveModalCampaign(null)} className="rounded-xl text-xs font-bold border-slate-200">
                Close
              </Button>
              <Button asChild className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold">
                <Link href="/orders">View Live Courier Tracking</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

