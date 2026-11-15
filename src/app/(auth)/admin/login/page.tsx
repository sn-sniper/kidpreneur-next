'use client';

import React, { useState } from 'react';
import { ShieldCheck, Mail, KeyRound, Loader2, Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Authentication failed');
        setLoading(false);
        return;
      }

      window.location.href = '/admin';
    } catch {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-slate-950 flex items-center justify-center p-4 overflow-hidden">
      {/* Subtle grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgb(148 163 184) 1px, transparent 1px), linear-gradient(to bottom, rgb(148 163 184) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Single, focused ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[120px]"
      />

      <div className="relative z-10 w-full max-w-sm">
        {/* Heading */}
        <header className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-900 ring-1 ring-white/10 mb-5">
            <ShieldCheck aria-hidden="true" className="w-6 h-6 text-blue-400" />
          </div>
          <h1 className="text-2xl font-semibold text-white tracking-tight">
            Admin Portal
          </h1>
          <p className="mt-1.5 text-sm text-slate-400">
            Sign in to access the Kidpreneur CMS
          </p>
        </header>

        {/* Card */}
        <div className="relative overflow-hidden rounded-2xl bg-slate-900 p-7 shadow-2xl shadow-black/50 ring-1 ring-white/5">
          {/* Hairline top highlight — the polish flourish */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
          />

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-slate-400 mb-1.5"
              >
                Email address
              </label>
              <div className="relative group">
                <Mail
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-blue-400 transition-colors"
                />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  aria-invalid={!!error}
                  aria-describedby={error ? 'login-error' : undefined}
                  className="no-autofill appearance-none block w-full h-11 pl-9 pr-3 text-sm text-white placeholder-slate-600 bg-slate-950 border border-slate-800 rounded-lg focus:outline-none focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20 transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-medium text-slate-400 mb-1.5"
              >
                Password
              </label>
              <div className="relative group">
                <KeyRound
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-blue-400 transition-colors"
                />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  aria-invalid={!!error}
                  aria-describedby={error ? 'login-error' : undefined}
                  className="no-autofill appearance-none block w-full h-11 pl-9 pr-11 text-sm text-white placeholder-slate-600 bg-slate-950 border border-slate-800 rounded-lg focus:outline-none focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-slate-500 hover:text-slate-300 hover:bg-slate-800/60 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff aria-hidden="true" className="h-4 w-4" />
                  ) : (
                    <Eye aria-hidden="true" className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div
                id="login-error"
                role="alert"
                className="flex items-start gap-2 text-sm text-red-400 bg-red-500/5 border border-red-500/20 rounded-lg px-3 py-2.5"
              >
                <span
                  aria-hidden="true"
                  className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500 shrink-0"
                />
                <span>{error}</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              aria-busy={loading}
              className="w-full flex items-center justify-center gap-2 h-11 rounded-lg bg-blue-600 hover:bg-blue-500 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-colors disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
            >
              {loading ? (
                <>
                  <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
                  Signing in…
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          Restricted access · Authorized personnel only
        </p>
      </div>
    </main>
  );
}