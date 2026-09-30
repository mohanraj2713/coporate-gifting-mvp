'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Eye, EyeOff, Loader2, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    email: 'admin@testcorporation.com',
    password: 'password123',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
        callbackUrl: searchParams.get('callbackUrl') || '/dashboard',
      });

      if (result?.error) {
        setError('Invalid email or password. You can also click "Direct Access to Portal" below.');
        setIsLoading(false);
      } else {
        router.push(searchParams.get('callbackUrl') || '/dashboard');
        router.refresh();
      }
    } catch (err) {
      setError('An error occurred. Directing to dashboard...');
      setIsLoading(false);
      router.push('/dashboard');
    }
  };

  const handleDemoFill = () => {
    setFormData({
      email: 'admin@testcorporation.com',
      password: 'password123',
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white p-4 relative overflow-hidden font-sans">
      {/* Background glow effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-violet-600/30 to-indigo-600/30 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-fuchsia-600/20 to-rose-600/20 blur-[140px] pointer-events-none" />

      <div className="max-w-md w-full space-y-6 relative z-10 bg-slate-900/80 backdrop-blur-2xl p-8 rounded-3xl border border-slate-800 shadow-2xl">
        
        {/* Header Logo */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-fuchsia-600 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-indigo-500/25">
              G
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white font-heading">
              Acme Corporate Gifting
            </span>
          </Link>
          <h2 className="text-2xl font-black tracking-tight text-white pt-2">
            Sign in to Enterprise Account
          </h2>
          <p className="text-xs text-slate-400">
            Or <Link href="/auth/register" className="font-bold text-indigo-400 hover:text-indigo-300 underline">register a new corporate company account</Link>
          </p>
        </div>

        {/* Demo Credentials Helper Box */}
        <div className="bg-indigo-950/60 p-3.5 rounded-2xl border border-indigo-800/60 space-y-2 text-xs">
          <div className="flex items-center justify-between font-bold text-indigo-200">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" /> Default Enterprise Demo Credentials:
            </span>
            <button 
              type="button" 
              onClick={handleDemoFill}
              className="text-[10px] bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-2 py-0.5 rounded-md transition-all"
            >
              Autofill
            </button>
          </div>
          <div className="text-[11px] text-indigo-300 font-mono space-y-0.5">
            <p>Email: <span className="text-white font-bold">admin@testcorporation.com</span></p>
            <p>Password: <span className="text-white font-bold">password123</span></p>
          </div>
        </div>

        {/* Form */}
        <form className="space-y-4 text-xs" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="email" className="text-slate-300 font-bold block mb-1">Corporate Work Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-slate-950 border-slate-800 text-white rounded-xl py-2.5 px-3.5 focus:ring-2 focus:ring-indigo-500 text-xs font-medium"
              placeholder="admin@testcorporation.com"
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-slate-300 font-bold block mb-1">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="bg-slate-950 border-slate-800 text-white rounded-xl py-2.5 px-3.5 pr-10 focus:ring-2 focus:ring-indigo-500 text-xs font-medium"
                placeholder="••••••••••••"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="rounded-xl bg-rose-950/80 border border-rose-800 p-3 text-rose-300 text-xs font-semibold">
              {error}
            </div>
          )}

          <div className="space-y-2 pt-2">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-extrabold text-xs py-3 rounded-xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin h-4 w-4 text-white" />
                  Authenticating...
                </>
              ) : (
                <>
                  Sign In to Enterprise Workspace <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>

            <Link href="/dashboard" className="block">
              <Button
                type="button"
                variant="outline"
                className="w-full border-slate-800 bg-slate-950 hover:bg-slate-900 text-slate-300 font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Direct Access to Demo Dashboard
              </Button>
            </Link>
          </div>
        </form>

      </div>
    </div>
  );
}

