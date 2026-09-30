'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  Gift, 
  Users, 
  ShoppingBag, 
  ShieldCheck, 
  BarChart3, 
  LogOut, 
  Search, 
  ChevronDown, 
  ChevronRight,
  Sparkles,
  Bell,
  Menu,
  X,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';

interface SidebarProps {
  children: React.ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedSubMenu, setExpandedSubMenu] = useState<string | null>('gifts');
  const [selectedCompany] = useState('Acme Corporation');

  const isAuthPage = pathname?.startsWith('/auth');

  const mainNav = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { 
      name: 'Gift Catalog', 
      href: '/gifts', 
      icon: Package, 
      badge: '9 Categories',
      subItems: [
        { name: 'All Gifts', href: '/gifts' },
        { name: 'Employee Kits', href: '/gifts?category=Employee+Kits' },
        { name: 'Electronics', href: '/gifts?category=Electronics' },
        { name: 'Bags & Apparel', href: '/gifts?category=Bags' },
        { name: 'Gift Hampers', href: '/gifts?category=Gift+Hampers' },
      ]
    },
    { 
      name: 'Campaigns', 
      href: '/campaigns', 
      icon: Gift,
      subItems: [
        { name: 'All Campaigns', href: '/campaigns' },
        { name: '+ Create Wizard', href: '/campaigns/create' },
      ]
    },
    { name: 'Recipients', href: '/recipients', icon: Users },
    { name: 'Orders & Invoices', href: '/orders', icon: ShoppingBag },
  ];

  const adminNav = [
    { 
      name: 'Admin Panel', 
      href: '/admin', 
      icon: ShieldCheck, 
      badge: 'Ops',
      subItems: [
        { name: 'Products Stock', href: '/admin' },
        { name: 'Categories Taxonomy', href: '/admin' },
        { name: 'Company Accounts', href: '/admin' },
        { name: 'Delivery Status', href: '/admin' },
      ]
    },
    { name: 'Reports & Analytics', href: '/reports', icon: BarChart3 },
  ];

  const handleSignOut = () => {
    router.push('/auth/login');
  };

  const isLandingPage = pathname === '/';
  const isProductsPage = pathname?.startsWith('/products');
  const isCheckoutPage = pathname?.startsWith('/checkout');
  const isWishlistPage = pathname?.startsWith('/wishlist');
  const isCartPage = pathname?.startsWith('/cart');

  if (isAuthPage || isLandingPage || isProductsPage || isCheckoutPage || isWishlistPage || isCartPage) {
    return <>{children}</>;
  }

  // Derive breadcrumbs from path
  const pathSegments = pathname.split('/').filter(Boolean);
  const pageTitle = pathSegments.length > 0 
    ? pathSegments[0].charAt(0).toUpperCase() + pathSegments[0].slice(1) 
    : 'Dashboard';

  const toggleSubMenu = (menuKey: string) => {
    if (isCollapsed) setIsCollapsed(false);
    setExpandedSubMenu(expandedSubMenu === menuKey ? null : menuKey);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex text-slate-900">
      
      {/* LEFT SIDEBAR (DESKTOP) */}
      <aside 
        className={`hidden lg:flex flex-col border-r border-slate-200/90 bg-white h-screen sticky top-0 z-40 select-none shadow-soft-sm transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        
        {/* Workspace Switcher & Collapse Toggle Header */}
        <div className="p-3 border-b border-slate-100 flex items-center justify-between min-h-[65px]">
          {!isCollapsed ? (
            <>
              <div className="flex-1 flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100/80 transition-colors cursor-pointer group min-w-0 mr-1">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 text-white font-extrabold flex items-center justify-center text-xs shadow-xs shrink-0">
                    AC
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">{selectedCompany}</p>
                    <span className="text-[10px] font-semibold text-slate-500 bg-slate-200/60 px-1.5 py-0.2 rounded">
                      Enterprise MVP
                    </span>
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
              </div>

              <button
                onClick={() => setIsCollapsed(true)}
                title="Collapse to Mini Rail"
                className="p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors shrink-0"
              >
                <PanelLeftClose className="w-4 h-4" />
              </button>
            </>
          ) : (
            <div className="w-full flex items-center justify-between px-1">
              <div className="w-9 h-9 rounded-xl bg-slate-900 text-white font-black flex items-center justify-center text-xs shadow-xs">
                AC
              </div>
              <button
                onClick={() => setIsCollapsed(false)}
                title="Expand Sidebar"
                className="p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                <PanelLeftOpen className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Quick Search Button */}
        {!isCollapsed && (
          <div className="px-3 pt-3">
            <button 
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl border border-slate-200/80 bg-slate-50/80 hover:bg-slate-100/80 text-slate-400 hover:text-slate-600 transition-colors text-xs font-medium"
            >
              <span className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5" /> Search app...
              </span>
              <kbd className="bg-white border border-slate-200 px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-500 shadow-xs">
                Ctrl K
              </kbd>
            </button>
          </div>
        )}

        {/* Navigation Links List */}
        <div className="flex-1 overflow-y-auto px-2.5 py-4 space-y-6 scrollbar-none">
          
          {/* Main Navigation */}
          <div>
            {!isCollapsed && (
              <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Workspace Nav
              </p>
            )}
            <nav className="space-y-1.5">
              {mainNav.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href || (link.href !== '/dashboard' && pathname.startsWith(link.href));
                const hasSubItems = link.subItems && link.subItems.length > 0;
                const menuKey = link.name.toLowerCase().replace(/\s+/g, '');
                const isSubOpen = expandedSubMenu === menuKey;

                return (
                  <div key={link.name} className="relative group">
                    <div className="flex items-center">
                      <Link
                        href={link.href}
                        className={`flex-1 flex items-center ${isCollapsed ? 'justify-center w-11 h-11 mx-auto p-0' : 'justify-between px-3 py-2.5'} rounded-xl text-xs font-semibold transition-all duration-150 ${
                          isActive
                            ? 'bg-slate-900 text-white shadow-soft-sm font-bold'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                          {!isCollapsed && <span>{link.name}</span>}
                        </div>
                        {!isCollapsed && link.badge && !hasSubItems && (
                          <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                            isActive ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 text-slate-500'
                          }`}>
                            {link.badge}
                          </span>
                        )}
                      </Link>

                      {!isCollapsed && hasSubItems && (
                        <button
                          onClick={() => toggleSubMenu(menuKey)}
                          className={`p-1.5 rounded-lg text-slate-400 hover:text-slate-700 ml-1 transition-transform ${isSubOpen ? 'rotate-90 text-slate-900' : ''}`}
                        >
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    {/* Collapsed Tooltip */}
                    {isCollapsed && (
                      <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2.5 py-1 rounded-lg bg-slate-900 text-white text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-soft-md">
                        {link.name}
                      </div>
                    )}

                    {/* Sub-menu accordion */}
                    {!isCollapsed && hasSubItems && isSubOpen && (
                      <div className="ml-7 mt-1 pl-2 border-l border-slate-200 space-y-1">
                        {link.subItems.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            className="block py-1 px-2 rounded-lg text-[11px] font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100/60 transition-colors"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>

          {/* Admin & Operations */}
          <div>
            {!isCollapsed && (
              <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Admin & Operations
              </p>
            )}
            <nav className="space-y-1.5">
              {adminNav.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                const hasSubItems = link.subItems && link.subItems.length > 0;
                const menuKey = link.name.toLowerCase().replace(/\s+/g, '');
                const isSubOpen = expandedSubMenu === menuKey;

                return (
                  <div key={link.name} className="relative group">
                    <div className="flex items-center">
                      <Link
                        href={link.href}
                        className={`flex-1 flex items-center ${isCollapsed ? 'justify-center w-11 h-11 mx-auto p-0' : 'justify-between px-3 py-2.5'} rounded-xl text-xs font-semibold transition-all duration-150 ${
                          isActive
                            ? 'bg-slate-900 text-white shadow-soft-sm font-bold'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                          {!isCollapsed && <span>{link.name}</span>}
                        </div>
                        {!isCollapsed && link.badge && !hasSubItems && (
                          <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                            isActive ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 text-slate-500'
                          }`}>
                            {link.badge}
                          </span>
                        )}
                      </Link>

                      {!isCollapsed && hasSubItems && (
                        <button
                          onClick={() => toggleSubMenu(menuKey)}
                          className={`p-1.5 rounded-lg text-slate-400 hover:text-slate-700 ml-1 transition-transform ${isSubOpen ? 'rotate-90 text-slate-900' : ''}`}
                        >
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    {/* Collapsed Tooltip */}
                    {isCollapsed && (
                      <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2.5 py-1 rounded-lg bg-slate-900 text-white text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-soft-md">
                        {link.name}
                      </div>
                    )}

                    {/* Sub-menu accordion */}
                    {!isCollapsed && hasSubItems && isSubOpen && (
                      <div className="ml-7 mt-1 pl-2 border-l border-slate-200 space-y-1">
                        {link.subItems.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            className="block py-1 px-2 rounded-lg text-[11px] font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100/60 transition-colors"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
        </div>

        {/* User Account & Footer */}
        <div className="p-3 border-t border-slate-100">
          {!isCollapsed ? (
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200/60">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                  AU
                </div>
                <div className="text-left leading-tight min-w-0">
                  <p className="text-xs font-bold text-slate-900 truncate">Admin User</p>
                  <p className="text-[10px] text-slate-500 font-medium truncate">admin@acmecorp.com</p>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                title="Sign Out"
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors shrink-0"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="relative group flex justify-center">
              <button
                onClick={handleSignOut}
                title="Sign Out"
                className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 flex items-center justify-center transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
              <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2.5 py-1 rounded-lg bg-slate-900 text-white text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-soft-md">
                Sign Out
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* TOP BREADCRUMB & HEADER BAR */}
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-6 h-16 flex items-center justify-between shadow-soft-sm">
          
          {/* Left: Mobile Trigger & Breadcrumbs */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <Link href="/dashboard" className="hover:text-slate-900">Workspace</Link>
              <span>/</span>
              <span className="font-bold text-slate-900">{pageTitle}</span>
            </div>
          </div>

          {/* Right: Actions & Live Status */}
          <div className="flex items-center gap-4">
            
            {/* Live DB Indicator */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>MongoDB Connected</span>
            </div>

            {/* Notification Icon */}
            <button 
              aria-label="View notifications" 
              className="relative p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-600 ring-2 ring-white" />
            </button>

            {/* Primary Action Button */}
            <Link
              href="/campaigns/create"
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-soft-sm transition-all hover:scale-[1.02]"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              New Campaign
            </Link>
          </div>
        </header>

        {/* Page Children */}
        <main className="flex-1 p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>

      {/* MOBILE DRAWER */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs" onClick={() => setIsMobileOpen(false)} />
          <div className="relative w-64 bg-white h-full flex flex-col p-4 shadow-xl z-10">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
              <span className="font-bold text-slate-900 text-sm">Acme Gifting</span>
              <button onClick={() => setIsMobileOpen(false)} className="p-1 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <nav className="flex-1 py-4 space-y-1">
              {[...mainNav, ...adminNav].map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold ${
                      isActive ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </nav>

            <button
              onClick={handleSignOut}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-bold text-rose-600 bg-rose-50 rounded-xl"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

