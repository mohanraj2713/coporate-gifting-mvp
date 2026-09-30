import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  Gift, 
  Users, 
  Package, 
  TrendingUp, 
  ArrowUpRight, 
  DollarSign, 
  Sparkles, 
  Plus, 
  CheckCircle2, 
  Truck, 
  Clock,
  ArrowRight,
  ShieldCheck,
  Building2
} from 'lucide-react';

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect('/auth/login');
  }

  const stats = {
    totalCampaigns: 12,
    totalOrders: 48,
    totalRecipients: 156,
    totalSpending: 24500,
    pendingOrders: 8,
    deliveredGifts: 36,
  };

  return (
    <div className="min-h-screen py-8 text-slate-900 space-y-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* HERO WELCOME BANNER */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-8 shadow-soft-lg border border-slate-800">
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 -mb-12 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
                EXECUTIVE DASHBOARD
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-heading text-white">
                Welcome Back, {session.user.name || 'Corporate Manager'}
              </h1>
              <p className="text-slate-300 text-sm mt-2 max-w-xl">
                Track your active corporate gifting campaigns, recipient delivery milestones, and budget allocation in real-time.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button asChild className="bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-md shadow-indigo-500/20 flex items-center gap-2">
                <Link href="/campaigns/create">
                  <Plus className="w-4 h-4" /> Create New Campaign
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* METRIC STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          
          {/* Stat 1 */}
          <Card className="glass-panel glass-panel-hover rounded-2xl border-slate-200/80 p-5 shadow-soft-sm">
            <CardContent className="p-0 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Campaigns</span>
                <p className="text-3xl font-black font-heading text-slate-900">{stats.totalCampaigns}</p>
                <div className="flex items-center gap-1.5 text-xs text-indigo-600 font-bold">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +2 new this month
                </div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100 text-indigo-600 border border-indigo-200/80 flex items-center justify-center shadow-xs">
                <Gift className="w-6 h-6" />
              </div>
            </CardContent>
          </Card>

          {/* Stat 2 */}
          <Card className="glass-panel glass-panel-hover rounded-2xl border-slate-200/80 p-5 shadow-soft-sm">
            <CardContent className="p-0 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Orders Placed</span>
                <p className="text-3xl font-black font-heading text-slate-900">{stats.totalOrders}</p>
                <div className="flex items-center gap-1.5 text-xs text-amber-600 font-bold">
                  <Clock className="w-3.5 h-3.5" /> {stats.pendingOrders} awaiting fulfillment
                </div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-50 to-violet-100 text-violet-600 border border-violet-200/80 flex items-center justify-center shadow-xs">
                <Package className="w-6 h-6" />
              </div>
            </CardContent>
          </Card>

          {/* Stat 3 */}
          <Card className="glass-panel glass-panel-hover rounded-2xl border-slate-200/80 p-5 shadow-soft-sm">
            <CardContent className="p-0 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Recipients</span>
                <p className="text-3xl font-black font-heading text-slate-900">{stats.totalRecipients}</p>
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {stats.deliveredGifts} gifts delivered
                </div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-600 border border-emerald-200/80 flex items-center justify-center shadow-xs">
                <Users className="w-6 h-6" />
              </div>
            </CardContent>
          </Card>

          {/* Stat 4 */}
          <Card className="glass-panel glass-panel-hover rounded-2xl border-slate-200/80 p-5 shadow-soft-sm">
            <CardContent className="p-0 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Budget Invested</span>
                <p className="text-3xl font-black font-heading text-slate-900">${stats.totalSpending.toLocaleString()}</p>
                <div className="flex items-center gap-1.5 text-xs text-indigo-600 font-bold">
                  <TrendingUp className="w-3.5 h-3.5" /> Average ROI 4.8x
                </div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 border border-blue-200/80 flex items-center justify-center shadow-xs">
                <DollarSign className="w-6 h-6" />
              </div>
            </CardContent>
          </Card>

          {/* Stat 5 */}
          <Card className="glass-panel glass-panel-hover rounded-2xl border-slate-200/80 p-5 shadow-soft-sm">
            <CardContent className="p-0 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pending Orders</span>
                <p className="text-3xl font-black font-heading text-amber-600">{stats.pendingOrders}</p>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                  Processing & Invoice confirmation
                </div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 text-amber-600 border border-amber-200/80 flex items-center justify-center shadow-xs">
                <Clock className="w-6 h-6" />
              </div>
            </CardContent>
          </Card>

          {/* Stat 6 */}
          <Card className="glass-panel glass-panel-hover rounded-2xl border-slate-200/80 p-5 shadow-soft-sm">
            <CardContent className="p-0 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Delivered Gifts</span>
                <p className="text-3xl font-black font-heading text-emerald-600">{stats.deliveredGifts}</p>
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold">
                  <Truck className="w-3.5 h-3.5" /> 100% Tracking Verified
                </div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-50 to-teal-100 text-teal-600 border border-teal-200/80 flex items-center justify-center shadow-xs">
                <Truck className="w-6 h-6" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* QUICK ACTIONS SECTION */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold font-heading text-slate-900">Platform Shortcuts</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/campaigns/create" className="group">
              <Card className="glass-panel glass-panel-hover rounded-2xl border-slate-200/80 p-6 shadow-soft-sm h-full flex flex-col justify-between">
                <div>
                  <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-1">Create Campaign</h3>
                  <p className="text-xs text-slate-500">Launch a multi-step gift order wizard</p>
                </div>
                <div className="mt-4 text-xs font-bold text-indigo-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Start Wizard <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Card>
            </Link>

            <Link href="/gifts" className="group">
              <Card className="glass-panel glass-panel-hover rounded-2xl border-slate-200/80 p-6 shadow-soft-sm h-full flex flex-col justify-between">
                <div>
                  <div className="w-11 h-11 rounded-xl bg-violet-50 text-violet-600 border border-violet-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Package className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-1">Browse Catalog</h3>
                  <p className="text-xs text-slate-500">Explore 9 categories of premium corporate items</p>
                </div>
                <div className="mt-4 text-xs font-bold text-violet-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  View Catalog <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Card>
            </Link>

            <Link href="/recipients" className="group">
              <Card className="glass-panel glass-panel-hover rounded-2xl border-slate-200/80 p-6 shadow-soft-sm h-full flex flex-col justify-between">
                <div>
                  <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-1">Manage Recipients</h3>
                  <p className="text-xs text-slate-500">Bulk import CSV employee & client addresses</p>
                </div>
                <div className="mt-4 text-xs font-bold text-emerald-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Import CSV <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Card>
            </Link>

            <Link href="/orders" className="group">
              <Card className="glass-panel glass-panel-hover rounded-2xl border-slate-200/80 p-6 shadow-soft-sm h-full flex flex-col justify-between">
                <div>
                  <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Truck className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-1">Track Delivery</h3>
                  <p className="text-xs text-slate-500">Real-time FedEx, DHL, and UPS courier tracking</p>
                </div>
                <div className="mt-4 text-xs font-bold text-amber-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Track Orders <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Card>
            </Link>
          </div>
        </div>

        {/* RECENT ACTIVITY LOG */}
        <Card className="glass-panel rounded-2xl border border-slate-200/80 shadow-soft-md overflow-hidden">
          <CardHeader className="bg-slate-100/60 border-b border-slate-200/80 px-6 py-4 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-bold font-heading text-slate-900">Recent Activity Timeline</CardTitle>
              <p className="text-xs text-slate-500">Live operational events and order fulfillment log</p>
            </div>
            <span className="badge-indigo font-bold px-3 py-1 rounded-full text-xs">
              Live Stream
            </span>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200/80">
                  <tr>
                    <th className="px-6 py-3.5">Activity Event</th>
                    <th className="px-6 py-3.5">Timestamp</th>
                    <th className="px-6 py-3.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/60 bg-white/70">
                  {[
                    { activity: 'Campaign "Employee Milestone Q3" created with 50 Executive Kits', date: '2 hours ago', status: 'Pending Approval', badge: 'badge-amber' },
                    { activity: 'Order #ORD-2026-8840 dispatched via DHL Express with tracking #DHL-9921', date: 'Yesterday', status: 'Shipped', badge: 'badge-indigo' },
                    { activity: 'Bulk CSV Recipient upload: 120 employees imported to Marketing Dept', date: '3 days ago', status: 'Completed', badge: 'badge-emerald' },
                    { activity: 'Invoice #INV-2026-9930 approved by Acme Finance Dept', date: '4 days ago', status: 'Paid', badge: 'badge-emerald' },
                  ].map((item, i) => (
                    <tr key={i} className="hover:bg-indigo-50/20 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-900 text-sm">{item.activity}</td>
                      <td className="px-6 py-4 text-slate-500 font-medium">{item.date}</td>
                      <td className="px-6 py-4">
                        <span className={`${item.badge} font-bold px-3 py-1 rounded-full text-xs inline-flex items-center gap-1.5`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current" />
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
