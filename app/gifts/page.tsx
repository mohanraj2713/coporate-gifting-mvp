'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  Package, 
  Plus, 
  Search, 
  Sparkles, 
  SlidersHorizontal, 
  ArrowRight, 
  CheckCircle2, 
  Tag,
  Star,
  Eye
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface Gift {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  minOrderQuantity: number;
  customizationAvailable: boolean;
  rating: number;
  bestseller?: boolean;
}



const categories = [
  'All', 
  'Employee Kits', 
  'Electronics', 
  'Bags', 
  'Apparel', 
  'Drinkware', 
  'Gift Hampers', 
  'Stationery', 
  'Gift Cards', 
  'Awards & Recognition'
];

export default function GiftsPage() {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [customizationOnly, setCustomizationOnly] = useState(false);

  useEffect(() => {
    async function fetchGifts() {
      try {
        const response = await fetch('/api/gifts');
        if (response.ok) {
          const data = await response.json();
          setGifts(data);
        }
      } catch (error) {
        console.error('Failed to fetch gifts:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchGifts();
  }, []);

  const filteredGifts = gifts.filter((gift) => {
    const matchesSearch = 
      gift.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gift.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || gift.category === selectedCategory;
    const matchesCustomization = !customizationOnly || gift.customizationAvailable;

    return matchesSearch && matchesCategory && matchesCustomization;
  });

  return (
    <div className="space-y-6">
      
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-600 text-white">
              Catalog
            </span>
            <span className="text-xs font-semibold text-slate-500">Curated Corporate Gifts</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 font-heading">
            Corporate Gift Catalog
          </h1>
          <p className="text-slate-500 text-xs mt-0.5">
            Browse premium products available for logo customization, bulk ordering, and direct recipient shipping.
          </p>
        </div>

        <Link
          href="/campaigns/create"
          className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs h-9 px-4 rounded-xl flex items-center gap-2 shadow-soft-sm self-start sm:self-auto transition-all hover:scale-[1.02]"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Start Gift Campaign
        </Link>
      </div>

      {/* CATEGORY FILTER TABS (LINEAR PILL STYLE) */}
      <div className="border-b border-slate-200 flex overflow-x-auto gap-2 pb-2 scrollbar-none">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-slate-900 text-white shadow-soft-sm'
                  : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* SEARCH AND FILTER BAR */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-soft-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search catalog by name, description, tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs font-medium rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-slate-900 text-slate-900 placeholder-slate-400"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <button
            onClick={() => setCustomizationOnly(!customizationOnly)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1.5 ${
              customizationOnly
                ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            Logo Ready Only
          </button>
        </div>
      </div>

      {/* GIFTS CATALOG GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGifts.map((gift) => (
          <Card key={gift._id} className="bg-white border-slate-200/90 shadow-soft-sm rounded-2xl overflow-hidden group hover:shadow-soft-md transition-all duration-300 flex flex-col justify-between">
            <div>
              {/* Product Image Box */}
              <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                <img
                  src={gift.imageUrl}
                  alt={gift.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Floating Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="bg-white/90 backdrop-blur-md text-slate-900 font-bold px-2.5 py-0.5 rounded-full text-[10px] shadow-xs border border-slate-200">
                    {gift.category}
                  </span>
                  {gift.bestseller && (
                    <span className="bg-amber-500 text-white font-extrabold px-2.5 py-0.5 rounded-full text-[10px] shadow-xs flex items-center gap-1">
                      <Star className="w-3 h-3 fill-white" /> Bestseller
                    </span>
                  )}
                </div>

                {gift.customizationAvailable && (
                  <div className="absolute top-3 right-3">
                    <span className="bg-emerald-500 text-white font-bold px-2 py-0.5 rounded-full text-[10px] shadow-xs flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Logo Ready
                    </span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-5 space-y-2">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-indigo-600 transition-colors">
                    {gift.name}
                  </h3>
                  <div className="flex items-center gap-1 text-xs font-bold text-slate-800 shrink-0">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{gift.rating}</span>
                  </div>
                </div>

                <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">
                  {gift.description}
                </p>
              </div>
            </div>

            {/* Bottom Card Footer */}
            <div className="p-5 pt-0 border-t border-slate-100 mt-3 pt-3 flex items-center justify-between">
              <div>
                <p className="text-xl font-black text-slate-900 font-heading">
                  ${gift.price.toFixed(2)}
                </p>
                <p className="text-[10px] text-slate-400 font-semibold">
                  MOQ: {gift.minOrderQuantity} units
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button asChild size="sm" className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl h-8 px-3">
                  <Link href={`/campaigns/create?giftId=${gift._id}`}>
                    Select Gift
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredGifts.length === 0 && (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
          <Package className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-900">No gifts found</h3>
          <p className="text-slate-500 text-xs max-w-sm mx-auto">
            Try adjusting your search terms or select another category filter.
          </p>
        </div>
      )}
    </div>
  );
}
