'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Menu, 
  X, 
  LayoutDashboard, 
  Package, 
  Users, 
  ShoppingBag, 
  ShieldAlert, 
  BarChart3, 
  LogOut, 
  Gift, 
  Bell, 
  Sparkles,
  ChevronDown
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const [user] = useState({
    name: 'Admin User',
    email: 'admin@acmecorp.com',
    role: 'admin',
    company: 'Acme Enterprise'
  });

  const navLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Gift Catalog', href: '/gifts', icon: Package },
    { name: 'Campaigns', href: '/campaigns', icon: Gift },
    { name: 'Recipients', href: '/recipients', icon: Users },
    { name: 'Orders', href: '/orders', icon: ShoppingBag },
  ];

  const adminLinks = [
    { name: 'Admin Panel', href: '/admin', icon: ShieldAlert },
    { name: 'Reports', href: '/reports', icon: BarChart3 },
  ];

  const isAuthPage = pathname?.startsWith('/auth');

  const handleSignOut = () => {
    router.push('/auth/login');
  };

  if (isAuthPage) return null;

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-200/80 shadow-soft-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-8">
            <Link href="/dashboard" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
                <Gift className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-900 bg-clip-text text-transparent font-heading">
                    GiftFlow
                  </span>
                  <span className="text-[10px] font-extrabold tracking-widest uppercase px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                    MVP
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-medium leading-none">Corporate Gifting Suite</p>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1.5 ml-4">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-indigo-50/90 text-indigo-600 border border-indigo-100 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                    {link.name}
                  </Link>
                );
              })}

              {user.role === 'admin' && (
                <div className="flex items-center gap-1.5 pl-2 ml-2 border-l border-slate-200/80">
                  {adminLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                          isActive
                            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                            : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/50'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                        {link.name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </nav>
          </div>

          {/* Right Header Controls */}
          <div className="hidden lg:flex items-center gap-4">
            
            {/* Quick Action Button */}
            <Link
              href="/campaigns/create"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200/80 transition-all duration-200 shadow-xs hover:scale-[1.02]"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              New Campaign
            </Link>

            {/* Notification Bell */}
            <button 
              aria-label="View notifications" 
              className="relative p-2.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-indigo-600 ring-2 ring-white animate-pulse" />
            </button>

            {/* User Profile Capsule */}
            <div className="flex items-center gap-3 pl-3 border-l border-slate-200/80">
              <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200/80 rounded-full py-1 pl-1.5 pr-3">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-slate-900 to-indigo-900 text-white text-xs font-bold flex items-center justify-center shadow-xs">
                  AU
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-slate-900 leading-tight">{user.name}</p>
                  <p className="text-[10px] text-slate-500 font-medium capitalize">{user.role} • {user.company}</p>
                </div>
              </div>

              <button
                onClick={handleSignOut}
                title="Sign Out"
                className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 px-4 pt-3 pb-6 space-y-2">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="w-5 h-5 text-indigo-600" />
                  {link.name}
                </Link>
              );
            })}
            
            {adminLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold ${
                    isActive
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
            <div>
              <p className="text-sm font-bold text-slate-900">{user.name}</p>
              <p className="text-xs text-slate-500">{user.email}</p>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 text-xs font-bold text-rose-600 bg-rose-50 px-3 py-2 rounded-xl"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
