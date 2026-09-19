'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const body = isLogin 
        ? { email, password }
        : { email, password, fullName };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong');
        setLoading(false);
        return;
      }

      // Successfully authenticated
      // Handle secure redirect
      const urlParams = new URLSearchParams(window.location.search);
      const redirectParam = urlParams.get('redirect');
      
      const validViews = [
        'home', 'programme', 'journey', 'sessions', 'session-workspace',
        'portfolio', 'resources', 'live', 'parents', 'help'
      ];
      
      if (redirectParam && validViews.includes(redirectParam)) {
        window.location.href = `/?view=${redirectParam}`;
      } else {
        window.location.href = '/';
      }
      
    } catch (err) {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex justify-center items-center gap-2 mb-6 cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-sun flex items-center justify-center font-bold text-xl shadow-inner text-white">
            K
          </div>
          <h1 className="font-display font-bold text-2xl text-ink">
            Kidpreneur
          </h1>
        </Link>
        <h2 className="text-center text-3xl font-display font-bold text-ink">
          {isLogin ? 'Welcome back' : 'Start your journey'}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border border-slate-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold text-slate-700">
                  Full Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    required={!isLogin}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="appearance-none block w-full px-4 py-3 border border-slate-200 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent transition-shadow font-medium"
                    placeholder="Alex Junior"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-slate-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-slate-200 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent transition-shadow font-medium"
                  placeholder="alex@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-slate-200 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent transition-shadow font-medium"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm font-semibold bg-red-50 p-3 rounded-xl border border-red-100">
                {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="cursor-pointer w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-navy hover:bg-ink focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md"
              >
                {loading ? 'Processing...' : (isLogin ? 'Sign in' : 'Create account')}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500 font-medium">
                  {isLogin ? 'New to Kidpreneur?' : 'Already have an account?'}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                }}
                className="cursor-pointer w-full flex justify-center py-3 px-4 border-2 border-slate-200 rounded-xl shadow-sm text-sm font-bold text-ink bg-white hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 hover:shadow-md"
              >
                {isLogin ? 'Create a new account' : 'Sign in to your account'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
