'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  Plus, 
  Search, 
  Upload, 
  Download, 
  Users, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Sparkles, 
  CheckCircle2, 
  Filter, 
  Trash2, 
  Edit3, 
  X, 
  FileSpreadsheet,
  Building2,
  Gift,
  Copy,
  Check
} from 'lucide-react';

interface Recipient {
  _id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  role: string;
  type: 'employee' | 'customer';
  address: string;
  campaignName: string;
  status: 'verified' | 'pending';
  avatarBg: string;
}

const initialRecipients: Recipient[] = [
  {
    _id: '1',
    name: 'Sarah Jenkins',
    email: 'sarah.j@acmecorp.com',
    phone: '+1 (555) 234-5678',
    department: 'Engineering',
    role: 'Lead Architect',
    type: 'employee',
    address: '100 Tech Boulevard, Suite 400, San Francisco, CA 94105',
    campaignName: 'Q3 Employee Appreciation Milestone',
    status: 'verified',
    avatarBg: 'bg-indigo-600'
  },
  {
    _id: '2',
    name: 'David Miller',
    email: 'david.m@acmecorp.com',
    phone: '+1 (555) 876-5432',
    department: 'Marketing',
    role: 'VP Brand Marketing',
    type: 'employee',
    address: '450 Innovation Way, Austin, TX 78701',
    campaignName: 'Q3 Employee Appreciation Milestone',
    status: 'verified',
    avatarBg: 'bg-purple-600'
  },
  {
    _id: '3',
    name: 'Michael Brown',
    email: 'mbrown@clientgroup.com',
    phone: '+1 (555) 345-6789',
    department: 'Executive Partner',
    role: 'Managing Director',
    type: 'customer',
    address: '750 Fifth Avenue, 22nd Floor, New York, NY 10019',
    campaignName: 'Q4 Global VIP Partner Holiday Gifting',
    status: 'verified',
    avatarBg: 'bg-emerald-600'
  },
  {
    _id: '4',
    name: 'Elena Rostova',
    email: 'elena.r@acmecorp.com',
    phone: '+1 (555) 912-3456',
    department: 'Human Resources',
    role: 'People Operations Lead',
    type: 'employee',
    address: '120 Peachtree St NW, Atlanta, GA 30303',
    campaignName: 'Engineering Onboarding Swag',
    status: 'verified',
    avatarBg: 'bg-rose-600'
  },
  {
    _id: '5',
    name: 'Marcus Vance',
    email: 'mvance@globalventures.io',
    phone: '+1 (555) 456-7890',
    department: 'Strategic Client',
    role: 'Chief Technology Officer',
    type: 'customer',
    address: '500 Market Street, Seattle, WA 98101',
    campaignName: 'Q4 Global VIP Partner Holiday Gifting',
    status: 'pending',
    avatarBg: 'bg-amber-600'
  },
  {
    _id: '6',
    name: 'Jessica Chen',
    email: 'jessica.c@acmecorp.com',
    phone: '+1 (555) 678-9012',
    department: 'Sales & Revenue',
    role: 'Regional Sales Director',
    type: 'employee',
    address: '300 North LaSalle St, Chicago, IL 60654',
    campaignName: 'Annual Leadership Achievement Awards',
    status: 'verified',
    avatarBg: 'bg-blue-600'
  }
];

export default function RecipientsPage() {
  const [recipientsList, setRecipientsList] = useState<Recipient[]>(initialRecipients);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'employee' | 'customer'>('all');
  const [filterDept, setFilterDept] = useState<string>('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // New recipient form state
  const [newRecipient, setNewRecipient] = useState({
    name: '',
    email: '',
    phone: '',
    department: 'Engineering',
    role: 'Team Member',
    type: 'employee' as 'employee' | 'customer',
    address: '',
    campaignName: 'Q3 Employee Appreciation Milestone'
  });

  const departments = Array.from(new Set(recipientsList.map(r => r.department)));

  const filteredRecipients = recipientsList.filter((r) => {
    const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || r.type === filterType;
    const matchesDept = filterDept === 'all' || r.department === filterDept;

    return matchesSearch && matchesType && matchesDept;
  });

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filteredRecipients.map(r => r._id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleCreateRecipient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRecipient.name || !newRecipient.email) return;

    const colors = ['bg-indigo-600', 'bg-emerald-600', 'bg-purple-600', 'bg-rose-600', 'bg-blue-600'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const created: Recipient = {
      ...newRecipient,
      _id: Date.now().toString(),
      status: 'verified',
      avatarBg: randomColor
    };

    setRecipientsList([created, ...recipientsList]);
    setIsAddModalOpen(false);
    setNewRecipient({
      name: '',
      email: '',
      phone: '',
      department: 'Engineering',
      role: 'Team Member',
      type: 'employee',
      address: '',
      campaignName: 'Q3 Employee Appreciation Milestone'
    });
  };

  const handleDeleteRecipient = (id: string) => {
    setRecipientsList(recipientsList.filter(r => r._id !== id));
    setSelectedIds(selectedIds.filter(itemId => itemId !== id));
  };

  const handleCopyEmail = (email: string, id: string) => {
    navigator.clipboard.writeText(email);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-slate-500">Workspace</span>
            <span className="text-slate-300">/</span>
            <span className="text-xs font-bold text-slate-900">Recipients</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 font-heading">
            Recipient Directory & Address Book
          </h1>
          <p className="text-slate-500 text-xs mt-0.5">
            Manage corporate employees, VIP partners, shipping addresses, and campaign assignment status.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            onClick={() => setIsImportModalOpen(true)}
            className="rounded-xl border-slate-200 text-xs font-bold flex items-center gap-2"
          >
            <Upload className="w-3.5 h-3.5 text-indigo-600" /> Bulk Import CSV / Excel
          </Button>
          <Button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-soft-sm flex items-center gap-2 px-4 py-2.5"
          >
            <Plus className="w-4 h-4" /> Add Recipient
          </Button>
        </div>
      </div>

      {/* METRIC KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white border-slate-200 shadow-soft-sm rounded-2xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Directory</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">{recipientsList.length} People</div>
          <p className="text-[11px] text-slate-500 mt-1 font-medium">
            <span className="text-emerald-600 font-bold">100% verified</span> deliverable addresses
          </p>
        </Card>

        <Card className="bg-white border-slate-200 shadow-soft-sm rounded-2xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Corporate Employees</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">
            {recipientsList.filter(r => r.type === 'employee').length} Members
          </div>
          <p className="text-[11px] text-slate-500 mt-1 font-medium">Across {departments.length} internal departments</p>
        </Card>

        <Card className="bg-white border-slate-200 shadow-soft-sm rounded-2xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">VIP Clients & Partners</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">
            {recipientsList.filter(r => r.type === 'customer').length} Partners
          </div>
          <p className="text-[11px] text-slate-500 mt-1 font-medium">Executive gifting enabled</p>
        </Card>

        <Card className="bg-white border-slate-200 shadow-soft-sm rounded-2xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Active Campaigns</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
              <Gift className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">4 Campaigns</div>
          <p className="text-[11px] text-slate-500 mt-1 font-medium">98.4% delivery success rate</p>
        </Card>
      </div>

      {/* FILTER & TOOLBAR */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-soft-sm space-y-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by name, email, department, or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 text-slate-900 text-xs font-medium placeholder-slate-400"
            />
          </div>

          <div className="flex items-center gap-3 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {/* Type Filter Pills */}
            <div className="flex items-center gap-1.5">
              {[
                { id: 'all', label: 'All Types' },
                { id: 'employee', label: 'Employees' },
                { id: 'customer', label: 'VIP Clients' }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setFilterType(t.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    filterType === t.id
                      ? 'bg-slate-900 text-white shadow-soft-sm'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Department Dropdown */}
            <select
              value={filterDept}
              onChange={(e) => setFilterDept(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white"
            >
              <option value="all">All Departments</option>
              {departments.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Selected Batch Action Bar */}
        {selectedIds.length > 0 && (
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 text-white text-xs font-bold animate-in fade-in">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              {selectedIds.length} Recipient(s) selected
            </span>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" className="text-white border-slate-700 hover:bg-slate-800 text-xs font-bold rounded-lg">
                Assign to Campaign
              </Button>
              <Button 
                size="sm" 
                onClick={() => {
                  setRecipientsList(recipientsList.filter(r => !selectedIds.includes(r._id)));
                  setSelectedIds([]);
                }}
                className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg"
              >
                Delete Selected
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* RECIPIENTS DATA TABLE */}
      <Card className="bg-white border-slate-200 shadow-soft-sm rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-4 py-3.5 w-10 text-center">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={selectedIds.length > 0 && selectedIds.length === filteredRecipients.length}
                    className="rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                  />
                </th>
                <th className="px-4 py-3.5">Recipient Name & Role</th>
                <th className="px-4 py-3.5">Contact Details</th>
                <th className="px-4 py-3.5">Shipping Address</th>
                <th className="px-4 py-3.5">Department</th>
                <th className="px-4 py-3.5">Type</th>
                <th className="px-4 py-3.5">Assigned Campaign</th>
                <th className="px-4 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredRecipients.map((recipient) => {
                const isSelected = selectedIds.includes(recipient._id);
                return (
                  <tr 
                    key={recipient._id} 
                    className={`hover:bg-slate-50/70 transition-colors ${
                      isSelected ? 'bg-indigo-50/30' : ''
                    }`}
                  >
                    <td className="px-4 py-4 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSelectOne(recipient._id)}
                        className="rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                      />
                    </td>

                    {/* Avatar & Name */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full ${recipient.avatarBg} text-white font-black text-xs flex items-center justify-center shadow-soft-xs shrink-0`}>
                          {recipient.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-sm">{recipient.name}</div>
                          <div className="text-[11px] text-slate-500">{recipient.role}</div>
                        </div>
                      </div>
                    </td>

                    {/* Contact Details */}
                    <td className="px-4 py-4">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 text-slate-800 font-semibold group">
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          <span>{recipient.email}</span>
                          <button 
                            onClick={() => handleCopyEmail(recipient.email, recipient._id)}
                            className="text-slate-300 hover:text-slate-600"
                            title="Copy email"
                          >
                            {copiedId === recipient._id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                          </button>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                          <Phone className="w-3 h-3 text-slate-400" />
                          <span>{recipient.phone}</span>
                        </div>
                      </div>
                    </td>

                    {/* Shipping Address */}
                    <td className="px-4 py-4 max-w-xs">
                      <div className="flex items-start gap-1.5 text-slate-700 text-xs">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                        <span className="truncate hover:whitespace-normal transition-all" title={recipient.address}>
                          {recipient.address}
                        </span>
                      </div>
                    </td>

                    {/* Department */}
                    <td className="px-4 py-4">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 font-bold text-[11px] border border-slate-200">
                        {recipient.department}
                      </span>
                    </td>

                    {/* Type Badge */}
                    <td className="px-4 py-4">
                      {recipient.type === 'employee' ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/80">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mr-1.5"></span> Employee
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mr-1.5"></span> VIP Partner
                        </span>
                      )}
                    </td>

                    {/* Assigned Campaign */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1.5 text-xs text-slate-800 font-medium">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                        <span className="truncate max-w-[140px] font-semibold">{recipient.campaignName}</span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-4 text-right">
                      <button
                        onClick={() => handleDeleteRecipient(recipient._id)}
                        className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
                        title="Remove recipient"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredRecipients.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-sm font-bold text-slate-800">No recipients found</h3>
              <p className="text-xs text-slate-500 mt-1">Try adjusting your search query or add a new corporate recipient.</p>
            </div>
          )}
        </div>
      </Card>

      {/* ADD RECIPIENT MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-soft-xl max-w-lg w-full p-6 space-y-5 relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="text-lg font-bold font-heading text-slate-900">Add New Recipient</h3>
              <p className="text-xs text-slate-500">Enter recipient contact details and shipping address for gift delivery.</p>
            </div>

            <form onSubmit={handleCreateRecipient} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={newRecipient.name}
                  onChange={(e) => setNewRecipient({ ...newRecipient, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 text-slate-900 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Corporate Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="alex.m@acmecorp.com"
                    value={newRecipient.email}
                    onChange={(e) => setNewRecipient({ ...newRecipient, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 text-slate-900 font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    placeholder="+1 (555) 000-0000"
                    value={newRecipient.phone}
                    onChange={(e) => setNewRecipient({ ...newRecipient, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 text-slate-900 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Department</label>
                  <input
                    type="text"
                    placeholder="Engineering / Sales"
                    value={newRecipient.department}
                    onChange={(e) => setNewRecipient({ ...newRecipient, department: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 text-slate-900 font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Recipient Type</label>
                  <select
                    value={newRecipient.type}
                    onChange={(e) => setNewRecipient({ ...newRecipient, type: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 text-slate-900 font-medium bg-white"
                  >
                    <option value="employee">Employee</option>
                    <option value="customer">VIP Client / Partner</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Shipping Address</label>
                <textarea
                  rows={2}
                  placeholder="Street address, Suite / Apt, City, State, ZIP Code"
                  value={newRecipient.address}
                  onChange={(e) => setNewRecipient({ ...newRecipient, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 text-slate-900 font-medium"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2 border-t border-slate-100">
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)} className="rounded-xl text-xs font-bold border-slate-200">
                  Cancel
                </Button>
                <Button type="submit" className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold px-5">
                  Save Recipient
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BULK IMPORT CSV MODAL */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-soft-xl max-w-lg w-full p-6 space-y-5 relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setIsImportModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="text-lg font-bold font-heading text-slate-900">Bulk Upload CSV / Excel</h3>
              <p className="text-xs text-slate-500">Import hundreds of recipients with email and delivery addresses instantly.</p>
            </div>

            <div className="border-2 border-dashed border-slate-300 hover:border-slate-400 rounded-2xl p-8 text-center bg-slate-50/50 transition-all cursor-pointer">
              <Upload className="w-10 h-10 text-indigo-600 mx-auto mb-3" />
              <p className="text-xs font-bold text-slate-800">Click to upload CSV or drag and drop file</p>
              <p className="text-[10px] text-slate-400 mt-1">Supports .csv, .xlsx, .xls files up to 25MB</p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs space-y-2">
              <div className="flex items-center justify-between font-bold text-slate-800">
                <span>CSV Column Format Checklist:</span>
                <span className="text-indigo-600 hover:underline cursor-pointer flex items-center gap-1 text-[11px]">
                  <Download className="w-3 h-3" /> Download Template
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Include headers: <code className="bg-white px-1.5 py-0.5 rounded border text-slate-800">Name</code>, <code className="bg-white px-1.5 py-0.5 rounded border text-slate-800">Email</code>, <code className="bg-white px-1.5 py-0.5 rounded border text-slate-800">Phone</code>, <code className="bg-white px-1.5 py-0.5 rounded border text-slate-800">Department</code>, <code className="bg-white px-1.5 py-0.5 rounded border text-slate-800">Address</code>.
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-2 border-t border-slate-100">
              <Button variant="outline" onClick={() => setIsImportModalOpen(false)} className="rounded-xl text-xs font-bold border-slate-200">
                Cancel
              </Button>
              <Button onClick={() => setIsImportModalOpen(false)} className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold px-5">
                Process CSV Import
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

