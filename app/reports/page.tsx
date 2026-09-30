'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  Download, 
  Filter, 
  Calendar, 
  DollarSign, 
  Users, 
  Package, 
  TrendingUp, 
  Sparkles,
  Truck,
  Building2,
  PieChart as PieChartIcon,
  ArrowUpRight,
  ArrowDownRight,
  FileSpreadsheet,
  Layers,
  BarChart3
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Analytical Mock Data
const monthlyPerformance = [
  { month: 'Jan', spend: 28400, campaigns: 18, recipients: 185, deliverySla: 98.2 },
  { month: 'Feb', spend: 34200, campaigns: 24, recipients: 240, deliverySla: 99.0 },
  { month: 'Mar', spend: 41800, campaigns: 31, recipients: 310, deliverySla: 97.5 },
  { month: 'Apr', spend: 38500, campaigns: 28, recipients: 275, deliverySla: 98.8 },
  { month: 'May', spend: 52000, campaigns: 42, recipients: 430, deliverySla: 99.4 },
  { month: 'Jun', spend: 61000, campaigns: 49, recipients: 520, deliverySla: 98.6 },
];

const categoryDistribution = [
  { name: 'Employee Kits', value: 85400, color: '#4f46e5' },
  { name: 'Electronics', value: 62100, color: '#06b6d4' },
  { name: 'Gourmet Hampers', value: 45200, color: '#10b981' },
  { name: 'Apparel & Wearables', value: 32800, color: '#f59e0b' },
  { name: 'Drinkware & Accessories', value: 20390, color: '#8b5cf6' },
];

const departmentBreakdown = [
  { department: 'Engineering & Product', percentage: 38, count: 745, spend: '$93,400' },
  { department: 'Sales & Revenue', percentage: 26, count: 510, spend: '$63,900' },
  { department: 'Human Resources', percentage: 21, count: 412, spend: '$51,600' },
  { department: 'Executive & Partners', percentage: 15, count: 293, spend: '$36,990' },
];

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState<'spending' | 'campaigns' | 'categories' | 'fulfillment'>('spending');
  const [timeRange, setTimeRange] = useState('6M');

  const [summary, setSummary] = useState({
    totalExpenditure: 0,
    totalGiftsDelivered: 0,
    slaRate: 0,
    avgCost: 0
  });
  const [monthlyPerf, setMonthlyPerf] = useState(monthlyPerformance);
  const [catDist, setCatDist] = useState(categoryDistribution);
  const [deptBreakdown, setDeptBreakdown] = useState(departmentBreakdown);

    useEffect(() => {
    fetch('/api/reports')
      .then(res => res.json())
      .then(data => {
        if (data.summary) setSummary(data.summary);
        if (data.categoryDistribution) setCatDist(data.categoryDistribution);
        if (data.monthlyPerformance) setMonthlyPerf(data.monthlyPerformance);
        if (data.departmentBreakdown) setDeptBreakdown(data.departmentBreakdown);
      })
      .catch(console.error);
  }, []);


  return (
    <div className="space-y-6">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-slate-500">Workspace</span>
            <span className="text-slate-300">/</span>
            <span className="text-xs font-bold text-slate-900">Reports & Analytics</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 font-heading flex items-center gap-2">
            Executive Analytics & Intelligence <Sparkles className="w-5 h-5 text-amber-500 fill-amber-400" />
          </h1>
          <p className="text-slate-500 text-xs mt-0.5">
            Real-time analytics on corporate gifting expenditures, category distribution, recipient engagement, and courier fulfillment SLAs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Time Range Pills */}
          <div className="bg-slate-100 p-1 rounded-xl flex items-center border border-slate-200">
            {['30D', '6M', '1Y', 'YTD'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                  timeRange === range
                    ? 'bg-white text-slate-900 shadow-soft-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          <Button className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-soft-sm flex items-center gap-2 px-4 py-2.5">
            <Download className="w-4 h-4" /> Export Report (PDF/CSV)
          </Button>
        </div>
      </div>

      {/* METRIC CARDS WITH TREND INDICATORS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white border-slate-200 shadow-soft-sm rounded-2xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Expenditure</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">${summary.totalExpenditure.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          <p className="text-[11px] text-emerald-600 font-bold mt-1 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +15.4% growth vs previous period
          </p>
        </Card>

        <Card className="bg-white border-slate-200 shadow-soft-sm rounded-2xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Gifts Delivered</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">{summary.totalGiftsDelivered} Units</div>
          <p className="text-[11px] text-emerald-600 font-bold mt-1 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +12.3% active volume
          </p>
        </Card>

        <Card className="bg-white border-slate-200 shadow-soft-sm rounded-2xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Fulfillment SLA Rate</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
              <Truck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">{summary.slaRate}% On-Time</div>
          <p className="text-[11px] text-slate-500 font-medium mt-1">
            FedEx & DHL priority integrated
          </p>
        </Card>

        <Card className="bg-white border-slate-200 shadow-soft-sm rounded-2xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Avg Cost per Recipient</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">${summary.avgCost} / Person</div>
          <p className="text-[11px] text-emerald-600 font-bold mt-1 flex items-center gap-1">
            <ArrowDownRight className="w-3.5 h-3.5" /> -4.2% budget optimization
          </p>
        </Card>
      </div>

      {/* ANALYTICS TABS TOOLBAR */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-soft-sm flex items-center gap-2 overflow-x-auto">
        {[
          { id: 'spending', label: 'Expenditure & Spend Velocity', icon: DollarSign },
          { id: 'campaigns', label: 'Campaign Creation Volume', icon: BarChart3 },
          { id: 'categories', label: 'Product Category Share', icon: PieChartIcon },
          { id: 'fulfillment', label: 'Department Breakdown', icon: Building2 }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-slate-900 text-white shadow-soft-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* MAIN CHART CARD */}
      <Card className="bg-white border-slate-200 shadow-soft-sm rounded-2xl p-6">
        <CardHeader className="p-0 pb-6 border-b border-slate-100 mb-6 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg font-bold font-heading text-slate-900">
              {activeTab === 'spending' && 'Monthly Corporate Expenditure ($ USD)'}
              {activeTab === 'campaigns' && 'Gifting Campaign Volume over Time'}
              {activeTab === 'categories' && 'Budget Spend by Gift Product Category'}
              {activeTab === 'fulfillment' && 'Department Gifting Distribution'}
            </CardTitle>
            <p className="text-slate-500 text-xs mt-0.5">
              Data aggregated across verified company campaigns and courier tracking endpoints.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
            <Calendar className="w-3.5 h-3.5 text-indigo-600" /> Jan 2026 – Jun 2026
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="h-[380px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              {activeTab === 'spending' ? (
                <AreaChart data={monthlyPerf}>
                  <defs>
                    <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickFormatter={(val) => `$${val / 1000}k`} tickLine={false} />
                  <Tooltip 
                    formatter={(val: number) => [`$${val.toLocaleString()}`, 'Total Spend']}
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                  />
                  <Area type="monotone" dataKey="spend" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorSpend)" />
                </AreaChart>
              ) : activeTab === 'campaigns' ? (
                <BarChart data={monthlyPerf}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} />
                  <Tooltip 
                    formatter={(val: number) => [val, 'Campaigns Launched']}
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                  />
                  <Bar dataKey="campaigns" fill="#0f172a" radius={[6, 6, 0, 0]} />
                </BarChart>
              ) : activeTab === 'categories' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center h-full">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={catDist}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={110}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {categoryDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(val: number) => `$${val.toLocaleString()}`} />
                    </PieChart>
                  </ResponsiveContainer>

                  <div className="space-y-3 pr-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Top Categories by Spend</h4>
                    {categoryDistribution.map((cat) => (
                      <div key={cat.name} className="flex items-center justify-between text-xs p-2.5 rounded-xl border border-slate-100 bg-slate-50/50">
                        <div className="flex items-center gap-2.5">
                          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }}></span>
                          <span className="font-bold text-slate-900">{cat.name}</span>
                        </div>
                        <span className="font-black text-slate-900">${cat.value.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4 pt-4">
                  {departmentBreakdown.map((dept) => (
                    <div key={dept.department} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold text-slate-900">
                        <span>{dept.department} ({dept.count} Recipients)</span>
                        <span className="text-indigo-600">{dept.spend} ({dept.percentage}%)</span>
                      </div>
                      <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-slate-900 rounded-full transition-all duration-500" 
                          style={{ width: `${dept.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* DETAILED MONTHLY BREAKDOWN TABLE */}
      <Card className="bg-white border-slate-200 shadow-soft-sm rounded-2xl overflow-hidden">
        <CardHeader className="p-5 border-b border-slate-100 flex flex-row items-center justify-between">
          <CardTitle className="text-base font-bold font-heading text-slate-900">
            Monthly Performance & SLA Metrics
          </CardTitle>
          <Button variant="outline" size="sm" className="rounded-xl border-slate-200 text-xs font-bold flex items-center gap-2">
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" /> Export Excel Audit
          </Button>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-5 py-3.5">Month</th>
                <th className="px-5 py-3.5">Campaigns Executed</th>
                <th className="px-5 py-3.5">Recipients Reached</th>
                <th className="px-5 py-3.5">Total Spend ($ USD)</th>
                <th className="px-5 py-3.5">Courier Delivery SLA</th>
                <th className="px-5 py-3.5 text-right">Growth Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {monthlyPerformance.map((row) => (
                <tr key={row.month} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-5 py-4 font-bold text-slate-900">{row.month} 2026</td>
                  <td className="px-5 py-4 text-slate-800 font-semibold">{row.campaigns} Campaigns</td>
                  <td className="px-5 py-4 text-slate-800 font-semibold">{row.recipients} Recipients</td>
                  <td className="px-5 py-4 font-black text-slate-900 text-sm">${row.spend.toLocaleString()}</td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mr-1.5"></span> {row.deliverySla}% On-Time
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <span className="text-emerald-600 font-bold flex items-center justify-end gap-0.5">
                      <ArrowUpRight className="w-3.5 h-3.5" /> +{(Math.random() * 8 + 4).toFixed(1)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

