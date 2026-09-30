'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type StoreContextType = {
  isSignedIn: boolean;
  user: any;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => void;
  wishlist: string[];
  toggleWishlist: (id: string) => void;
  cart: string[];
  toggleCart: (id: string) => void;
  clearCart: () => void;
  recentlyViewed: string[];
  addRecentlyViewed: (id: string) => void;
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cart, setCart] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('printo_user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsSignedIn(true);
        // Fetch from MongoDB
        fetch(`/api/wishlist?userId=${parsedUser._id}`)
          .then(res => res.json())
          .then(data => setWishlist(data.items || []));
        fetch(`/api/cart?userId=${parsedUser._id}`)
          .then(res => res.json())
          .then(data => setCart(data.items || []));
        fetch(`/api/recently-viewed?userId=${parsedUser._id}`)
          .then(res => res.json())
          .then(data => setRecentlyViewed(data.items || []));
      } catch (e) {}
    } else {
      // Load from local storage for anonymous users
      const savedWishlist = localStorage.getItem('printo_wishlist');
      if (savedWishlist) {
        try { setWishlist(JSON.parse(savedWishlist)); } catch (e) {}
      }
      const savedCart = localStorage.getItem('printo_cart');
      if (savedCart) {
        try { setCart(JSON.parse(savedCart)); } catch (e) {}
      }
      const savedRecent = localStorage.getItem('printo_recent');
      if (savedRecent) {
        try { setRecentlyViewed(JSON.parse(savedRecent)); } catch (e) {}
      }
    }
    setIsInitialized(true);
  }, []);

  // Save anonymous state to localStorage
  useEffect(() => {
    if (!isInitialized || isSignedIn) return; // DB handles signed-in state
    localStorage.setItem('printo_wishlist', JSON.stringify(wishlist));
    localStorage.setItem('printo_cart', JSON.stringify(cart));
    localStorage.setItem('printo_recent', JSON.stringify(recentlyViewed));
  }, [wishlist, cart, recentlyViewed, isSignedIn, isInitialized]);

  const signIn = async (email: string, password: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setIsSignedIn(true);
        localStorage.setItem('printo_user', JSON.stringify(data.user));
        
        // Fetch their lists
        fetch(`/api/wishlist?userId=${data.user._id}`)
          .then(r => r.json())
          .then(d => setWishlist(d.items || []));
        fetch(`/api/cart?userId=${data.user._id}`)
          .then(r => r.json())
          .then(d => setCart(d.items || []));
        fetch(`/api/recently-viewed?userId=${data.user._id}`)
          .then(r => r.json())
          .then(d => setRecentlyViewed(d.items || []));
        return true;
      }
      return false;
    } catch(e) {
      return false;
    }
  };

  const signOut = () => {
    setIsSignedIn(false);
    setUser(null);
    localStorage.removeItem('printo_user');
    setWishlist([]);
    setCart([]);
    setRecentlyViewed([]);
  };

  const toggleWishlist = (id: string) => {
    const isAdding = !wishlist.includes(id);
    setWishlist(prev => 
      isAdding ? [...prev, id] : prev.filter(item => item !== id)
    );

    if (isSignedIn && user) {
      fetch('/api/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user._id, itemId: id, action: isAdding ? 'add' : 'remove' })
      }).catch(console.error);
    }
  };

  const addRecentlyViewed = (id: string) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(item => item !== id);
      const updated = [id, ...filtered].slice(0, 5);
      return updated;
    });

    if (isSignedIn && user) {
      fetch('/api/recently-viewed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user._id, itemId: id })
      }).catch(console.error);
    }
  };

  const toggleCart = (id: string) => {
    const isAdding = !cart.includes(id);
    setCart(prev => 
      isAdding ? [...prev, id] : prev.filter(item => item !== id)
    );

    if (isSignedIn && user) {
      fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user._id, itemId: id, action: isAdding ? 'add' : 'remove' })
      }).catch(console.error);
    }
  };

  const clearCart = () => {
    setCart([]);
    if (isSignedIn && user) {
      fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user._id, itemId: 'all', action: 'clear' })
      }).catch(console.error);
    }
  };

  return (
    <StoreContext.Provider value={{ isSignedIn, user, signIn, signOut, wishlist, toggleWishlist, cart, toggleCart, clearCart, recentlyViewed, addRecentlyViewed }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
