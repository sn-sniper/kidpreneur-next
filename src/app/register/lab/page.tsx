'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LabRegistrationForm } from '@/components/forms/LabRegistrationForm';
import { AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function LabRegistrationPage() {
  const router = useRouter();
  const [status, setStatus] = useState<'NONE' | 'PENDING' | 'CONFIRMED'>('NONE');

  if (status === 'CONFIRMED') {
    router.push('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <Link href="http://localhost:5173" className="text-navy font-bold hover:underline">
            &larr; Back to Home
          </Link>
        </div>

        {status === 'PENDING' ? (
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 text-center space-y-6">
            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-display font-bold text-ink">Payment Pending</h2>
            <p className="text-lg text-slate-600 max-w-lg mx-auto leading-relaxed">
              Your registration has been received! To complete the enrollment and unlock your Kidpreneur Lab dashboard, please send your payment via Whish Money to the following number:
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 my-8">
              <span className="block text-sm text-slate-500 font-bold uppercase tracking-wider mb-2">Whish Money Number</span>
              <span className="text-4xl font-black text-navy tracking-tight">+961 71 123 456</span>
            </div>
            <p className="text-sm text-slate-500">
              Once we receive and verify your payment, your child's secure login credentials will be generated and emailed to you.
            </p>
          </div>
        ) : (
          <LabRegistrationForm onSuccess={() => setStatus('PENDING')} />
        )}
      </div>
    </div>
  );
}
