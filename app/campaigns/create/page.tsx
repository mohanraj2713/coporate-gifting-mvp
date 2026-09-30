'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  CheckCircle2, 
  Gift as GiftIcon, 
  Users, 
  Sparkles, 
  CreditCard, 
  ArrowRight, 
  ArrowLeft, 
  Upload, 
  Plus, 
  Trash2, 
  Check, 
  FileText, 
  Truck,
  Image as ImageIcon
} from 'lucide-react';

interface GiftItem {
  id: string;
  name: string;
  category: string;
  price: number;
  minOrderQuantity: number;
  customizable: boolean;
  image: string;
  description: string;
}



interface Recipient {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  department: string;
  type: 'employee' | 'customer';
}

export default function CreateCampaignPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [giftCatalog, setGiftCatalog] = useState<GiftItem[]>([]);
  const [isLoadingCatalog, setIsLoadingCatalog] = useState(true);

  useEffect(() => {
    async function fetchCatalog() {
      try {
        const response = await fetch('/api/gifts');
        if (response.ok) {
          const data = await response.json();
          const mappedData = data.map((item: any) => ({
            ...item,
            id: item._id,
            image: item.imageUrl || item.image
          }));
          setGiftCatalog(mappedData);
          if (mappedData.length > 0) {
            setSelectedGifts(prev => prev.length === 0 ? [mappedData[0]] : prev);
          }
        }
      } catch (error) {
        console.error('Failed to fetch gifts:', error);
      } finally {
        setIsLoadingCatalog(false);
      }
    }
    fetchCatalog();
  }, []);

  // Step 1: Details
  const [campaignName, setCampaignName] = useState('Q3 Employee Milestone Celebration');
  const [occasion, setOccasion] = useState('Employee Appreciation');
  const [deliveryDate, setDeliveryDate] = useState('2026-10-30');
  const [targetBudget, setTargetBudget] = useState(5000);

  // Step 2: Gift Selection
  const [selectedGifts, setSelectedGifts] = useState<GiftItem[]>([]);

  // Step 3: Recipients
  const [recipients, setRecipients] = useState<Recipient[]>([
    {
      id: '1',
      name: 'Sarah Jenkins',
      email: 'sarah.j@acmecorp.com',
      phone: '+1 (555) 234-5678',
      address: '100 Tech Boulevard, Suite 400, San Francisco, CA 94105',
      department: 'Engineering',
      type: 'employee'
    },
    {
      id: '2',
      name: 'David Miller',
      email: 'david.m@acmecorp.com',
      phone: '+1 (555) 876-5432',
      address: '450 Innovation Way, Austin, TX 78701',
      department: 'Marketing',
      type: 'employee'
    }
  ]);
  const [newRecipient, setNewRecipient] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    department: 'General',
    type: 'employee' as 'employee' | 'customer'
  });

  // Step 4: Customization
  const [personalizedMessage, setPersonalizedMessage] = useState(
    'Thank you for your incredible dedication and work toward our team milestones! We truly appreciate you.'
  );
  const [greetingCardStyle, setGreetingCardStyle] = useState('Gold Foil Elegant');
  const [logoUploaded, setLogoUploaded] = useState(true);

  // Step 6: Order status state after submission
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const steps = [
    { number: 1, title: 'Details', icon: Sparkles },
    { number: 2, title: 'Select Gift', icon: GiftIcon },
    { number: 3, title: 'Recipients', icon: Users },
    { number: 4, title: 'Customization', icon: ImageIcon },
    { number: 5, title: 'Review & Pay', icon: CreditCard }
  ];

  const handleAddRecipient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRecipient.name || !newRecipient.email) return;
    setRecipients([
      ...recipients,
      { ...newRecipient, id: Date.now().toString() }
    ]);
    setNewRecipient({
      name: '',
      email: '',
      phone: '',
      address: '',
      department: 'General',
      type: 'employee'
    });
  };

  const handleRemoveRecipient = (id: string) => {
    setRecipients(recipients.filter(r => r.id !== id));
  };

  const subtotal = selectedGifts.reduce((sum, g) => sum + g.price, 0) * recipients.length;
  const shipping = recipients.length > 0 ? 15 * recipients.length : 0;
  const tax = subtotal * 0.08;
  const totalCost = subtotal + shipping + tax;

  const handlePlaceOrder = () => {
    setIsOrderPlaced(true);
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link href="/campaigns" className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Campaigns
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-xs font-bold text-slate-900">Campaign Creation Wizard</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 font-heading">
            Create Corporate Campaign
          </h1>
          <p className="text-slate-500 text-xs mt-0.5">
            Configure product selection, recipient addresses, corporate logo branding, and place your campaign order.
          </p>
        </div>
      </div>

      {/* LINEAR-STYLE CLEAN GRID STEPPER BAR (NO OVERLAPS!) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {steps.map((step) => {
          const Icon = step.icon;
          const isActive = currentStep === step.number;
          const isCompleted = currentStep > step.number;

          return (
            <button
              key={step.number}
              onClick={() => setCurrentStep(step.number)}
              className={`p-3 rounded-2xl border text-left transition-all duration-200 ${
                isActive
                  ? 'bg-slate-900 text-white border-slate-900 shadow-soft-sm font-bold'
                  : isCompleted
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200/90 hover:bg-emerald-100/60'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-extrabold shrink-0 ${
                    isActive
                      ? 'bg-white text-slate-900 shadow-xs'
                      : isCompleted
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-600 border border-slate-200'
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : step.number}
                </div>
                <div className="min-w-0 flex-1">
                  <p className={`text-[10px] uppercase font-bold tracking-wider ${
                    isActive ? 'text-slate-300' : isCompleted ? 'text-emerald-700' : 'text-slate-400'
                  }`}>
                    Step 0{step.number}
                  </p>
                  <p className="text-xs font-bold truncate leading-tight mt-0.5">
                    {step.title}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* STEPPER CONTENT */}
      {!isOrderPlaced ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            
            {/* Step 1: Details */}
            {currentStep === 1 && (
              <Card className="bg-white border-slate-200 shadow-soft-sm rounded-2xl p-6">
                <CardHeader className="p-0 pb-6 border-b border-slate-100 mb-6">
                  <CardTitle className="text-lg font-bold font-heading text-slate-900">
                    1. Campaign Basic Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                      Campaign Name
                    </label>
                    <input
                      type="text"
                      value={campaignName}
                      onChange={(e) => setCampaignName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 text-slate-900 text-xs font-medium"
                      placeholder="e.g. Annual Partner Appreciation 2026"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                        Occasion / Event
                      </label>
                      <select
                        value={occasion}
                        onChange={(e) => setOccasion(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 text-slate-900 text-xs font-medium bg-white"
                      >
                        <option value="Employee Appreciation">Employee Appreciation</option>
                        <option value="Holiday & New Year">Holiday & New Year</option>
                        <option value="Client Onboarding">Client Onboarding</option>
                        <option value="Work Anniversary">Work Anniversary</option>
                        <option value="Sales Goal Achievement">Sales Goal Achievement</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                        Expected Delivery Date
                      </label>
                      <input
                        type="date"
                        value={deliveryDate}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 text-slate-900 text-xs font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                      Target Budget ($ USD)
                    </label>
                    <input
                      type="number"
                      value={targetBudget}
                      onChange={(e) => setTargetBudget(Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 text-slate-900 text-xs font-medium"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Select Gift */}
            {currentStep === 2 && (
              <Card className="bg-white border-slate-200 shadow-soft-sm rounded-2xl p-6">
                <CardHeader className="p-0 pb-6 border-b border-slate-100 mb-6">
                  <CardTitle className="text-lg font-bold font-heading text-slate-900">
                    2. Select Product from Gift Catalog
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {giftCatalog.map((gift) => {
                      const isSelected = selectedGifts.some(g => g.id === gift.id);
                      return (
                        <div
                          key={gift.id}
                          onClick={() => {
                            if (isSelected) {
                              setSelectedGifts(selectedGifts.filter(g => g.id !== gift.id));
                            } else {
                              setSelectedGifts([...selectedGifts, gift]);
                            }
                          }}
                          className={`cursor-pointer rounded-2xl border p-4 transition-all duration-200 ${
                            isSelected
                              ? 'border-indigo-600 bg-indigo-50/40 ring-2 ring-indigo-500/20 shadow-soft-md'
                              : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-soft-sm'
                          }`}
                        >
                          <img
                            src={gift.image}
                            alt={gift.name}
                            className="w-full h-36 object-cover rounded-xl mb-3"
                          />
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                              {gift.category}
                            </span>
                            <span className="text-base font-black text-slate-900">${gift.price.toFixed(2)}</span>
                          </div>
                          <h3 className="font-bold text-slate-900 text-sm mb-1">{gift.name}</h3>
                          <p className="text-xs text-slate-500 line-clamp-2 mb-3">{gift.description}</p>
                          <div className="flex items-center justify-between text-xs text-slate-600 pt-2 border-t border-slate-100">
                            <span className="text-[10px] font-semibold text-slate-400">MOQ: {gift.minOrderQuantity} units</span>
                            {gift.customizable && (
                              <span className="text-emerald-700 font-bold text-[10px] flex items-center gap-1">
                                <Sparkles className="w-3 h-3 text-emerald-600" /> Logo Ready
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Add Recipients */}
            {currentStep === 3 && (
              <Card className="bg-white border-slate-200 shadow-soft-sm rounded-2xl p-6">
                <CardHeader className="p-0 pb-6 border-b border-slate-100 mb-6 flex flex-row items-center justify-between">
                  <CardTitle className="text-lg font-bold font-heading text-slate-900">
                    3. Recipient Management
                  </CardTitle>
                  <Button variant="outline" size="sm" className="rounded-xl border-slate-200 text-xs font-bold flex items-center gap-2">
                    <Upload className="w-3.5 h-3.5" /> Bulk Upload CSV/Excel
                  </Button>
                </CardHeader>
                <CardContent className="p-0 space-y-6">
                  {/* Add Recipient Form */}
                  <form onSubmit={handleAddRecipient} className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80 space-y-4">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Add Recipient Manually</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Full Name *"
                        value={newRecipient.name}
                        onChange={(e) => setNewRecipient({ ...newRecipient, name: e.target.value })}
                        className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                        required
                      />
                      <input
                        type="email"
                        placeholder="Corporate Email *"
                        value={newRecipient.email}
                        onChange={(e) => setNewRecipient({ ...newRecipient, email: e.target.value })}
                        className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Phone Number"
                        value={newRecipient.phone}
                        onChange={(e) => setNewRecipient({ ...newRecipient, phone: e.target.value })}
                        className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                      />
                      <input
                        type="text"
                        placeholder="Department (e.g. Engineering)"
                        value={newRecipient.department}
                        onChange={(e) => setNewRecipient({ ...newRecipient, department: e.target.value })}
                        className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Shipping Address (Street, City, State, ZIP)"
                      value={newRecipient.address}
                      onChange={(e) => setNewRecipient({ ...newRecipient, address: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                    />
                    <Button type="submit" size="sm" className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl">
                      <Plus className="w-3.5 h-3.5 mr-1" /> Add Recipient to List
                    </Button>
                  </form>

                  {/* Recipient Table */}
                  <div className="overflow-x-auto rounded-xl border border-slate-200">
                    <table className="w-full text-left text-xs text-slate-700">
                      <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider">
                        <tr>
                          <th className="px-4 py-3">Recipient Name</th>
                          <th className="px-4 py-3">Email & Phone</th>
                          <th className="px-4 py-3">Shipping Address</th>
                          <th className="px-4 py-3">Department</th>
                          <th className="px-4 py-3 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {recipients.map((r) => (
                          <tr key={r.id} className="hover:bg-slate-50">
                            <td className="px-4 py-3 font-bold text-slate-900">{r.name}</td>
                            <td className="px-4 py-3 text-xs">
                              <div>{r.email}</div>
                              <div className="text-slate-400">{r.phone}</div>
                            </td>
                            <td className="px-4 py-3 text-xs max-w-xs truncate">{r.address}</td>
                            <td className="px-4 py-3 text-xs">
                              <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded font-bold">
                                {r.department}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right">
                              <button
                                onClick={() => handleRemoveRecipient(r.id)}
                                className="text-rose-500 hover:text-rose-700 p-1"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 4: Customization */}
            {currentStep === 4 && (
              <Card className="bg-white border-slate-200 shadow-soft-sm rounded-2xl p-6">
                <CardHeader className="p-0 pb-6 border-b border-slate-100 mb-6">
                  <CardTitle className="text-lg font-bold font-heading text-slate-900">
                    4. Branding & Customization Options
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">
                      Company Logo Branding
                    </label>
                    <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center bg-slate-50/50">
                      {logoUploaded ? (
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-16 bg-slate-900 rounded-2xl text-white font-black text-xl flex items-center justify-center mb-2 shadow-soft-sm">
                            ACME
                          </div>
                          <p className="text-xs font-bold text-slate-800">Acme_Corp_Logo_HD.svg</p>
                          <p className="text-[10px] text-emerald-600 font-bold mt-0.5">Vector Logo Verified</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <Upload className="w-8 h-8 text-slate-400 mb-2" />
                          <p className="text-xs text-slate-600 font-bold">Click to upload corporate logo (PNG, SVG, AI)</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                      Personalized Greeting Message
                    </label>
                    <textarea
                      rows={4}
                      value={personalizedMessage}
                      onChange={(e) => setPersonalizedMessage(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-xs font-medium focus:ring-2 focus:ring-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">
                      Custom Greeting Card Style
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {['Gold Foil Elegant', 'Minimalist Modern', 'Festive Celebration'].map((style) => (
                        <div
                          key={style}
                          onClick={() => setGreetingCardStyle(style)}
                          className={`cursor-pointer rounded-xl border p-3.5 text-center text-xs font-bold transition-all ${
                            greetingCardStyle === style
                              ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-soft-sm'
                              : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {style}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 5: Review */}
            {currentStep === 5 && (
              <Card className="bg-white border-slate-200 shadow-soft-sm rounded-2xl p-6">
                <CardHeader className="p-0 pb-6 border-b border-slate-100 mb-6">
                  <CardTitle className="text-lg font-bold font-heading text-slate-900">
                    5. Review Campaign & Confirm Order
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-6">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
                    <h4 className="font-bold text-slate-900 text-sm">{campaignName}</h4>
                    <p className="text-xs text-slate-500">Occasion: {occasion} | Delivery: {deliveryDate}</p>
                  </div>

                  {selectedGifts.map((gift) => (
                    <div key={gift.id} className="flex items-start gap-4 p-4 rounded-xl border border-slate-200">
                      <img src={gift.image} alt={gift.name} className="w-16 h-16 object-cover rounded-lg" />
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{gift.name}</h4>
                        <p className="text-xs text-slate-600">${gift.price.toFixed(2)} × {recipients.length} recipients</p>
                        <p className="text-[10px] text-emerald-600 font-bold mt-1">Includes Custom Logo & {greetingCardStyle} Card</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Stepper Navigation Buttons */}
            <div className="flex justify-between items-center pt-2">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                className="rounded-xl border-slate-200 text-xs font-bold flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Previous Step
              </Button>

              {currentStep < 5 ? (
                <Button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center gap-2 px-6"
                >
                  Next Step <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={handlePlaceOrder}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 px-8"
                >
                  <CheckCircle2 className="w-4 h-4" /> Place Order & Generate Invoice
                </Button>
              )}
            </div>
          </div>

          {/* Sidebar Cost Calculation Summary */}
          <div className="lg:col-span-1">
            <Card className="bg-white border-slate-200 shadow-soft-sm rounded-2xl p-5 sticky top-24">
              <CardHeader className="p-0 pb-4 border-b border-slate-100 mb-4">
                <CardTitle className="text-base font-bold font-heading text-slate-900">
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-3.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Selected Products</span>
                  <span className="font-bold text-slate-900 text-right max-w-[150px] truncate">{selectedGifts.map(g => g.name).join(', ')}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Total Unit Price</span>
                  <span className="font-bold text-slate-900">${selectedGifts.reduce((sum, g) => sum + g.price, 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Recipients Count</span>
                  <span className="font-bold text-slate-900">{recipients.length} people</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Courier Shipping</span>
                  <span className="font-bold text-slate-900">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Estimated Tax (8%)</span>
                  <span className="font-bold text-slate-900">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-slate-200 pt-3 flex justify-between text-sm font-extrabold text-slate-900">
                  <span>Total Investment</span>
                  <span className="text-indigo-600">${totalCost.toFixed(2)}</span>
                </div>

                <div className="bg-slate-50 rounded-xl p-3 text-[11px] text-slate-500 space-y-1 border border-slate-200">
                  <p className="flex items-center gap-1 font-bold text-slate-800">
                    <Truck className="w-3.5 h-3.5 text-indigo-600" /> Courier Delivery Included
                  </p>
                  <p>Tracking codes will be generated for each address.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        /* Order Confirmation Page */
        <Card className="bg-white border-slate-200 shadow-soft-md text-center p-8 max-w-xl mx-auto rounded-3xl space-y-4">
          <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto text-emerald-600">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-extrabold font-heading text-slate-900">Order Placed Successfully!</h2>
          <p className="text-slate-600 text-xs">
            Campaign Order #ORD-2026-8841 submitted. Official invoice #INV-9932 generated.
          </p>

          <div className="flex justify-center gap-3 pt-4">
            <Button asChild className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl">
              <Link href="/orders">View Orders & Tracking</Link>
            </Button>
            <Button asChild variant="outline" className="border-slate-200 text-xs font-semibold rounded-xl">
              <Link href="/campaigns">Back to Campaigns</Link>
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
