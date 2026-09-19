import React from 'react';
import { ShieldCheck, HelpCircle, Lock, Mail } from 'lucide-react';
import { useJourney } from '../../context/JourneyContext';

export const HelpView: React.FC = () => {
  const { showToast } = useJourney();

  return (
    <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 space-y-8 animate-fadeIn">
      <div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink">
          Help & Safe Sharing
        </h1>
        <p className="mt-2 text-slate-600">
          Everything you need to know about getting help and keeping your information safe.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl bg-[#e7f7ff] p-8 border border-sky-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sky/20 text-ink mb-4">
              <HelpCircle className="h-6 w-6" />
            </div>
            <h2 className="font-display text-2xl font-bold text-ink">Need Technical Help?</h2>
            <p className="mt-3 text-sm text-slate-700 leading-relaxed">
              Ask a parent, guardian, or your course facilitator for help opening a link, resetting passcodes, or downloading a worksheet.
            </p>
          </div>

          <button
            type="button"
            onClick={() => showToast('Technical support: Contact your course facilitator or email support@kidpreneur.org')}
            className="mt-6 rounded-xl bg-ink px-5 py-3.5 font-bold text-white shadow hover:bg-navy transition text-sm flex items-center justify-center gap-2"
          >
            <Mail className="h-4 w-4" /> Get Support
          </button>
        </div>

        <div className="rounded-3xl bg-[#fff0ee] p-8 border border-rose-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-200/50 text-rose-700 mb-4">
              <Lock className="h-6 w-6" />
            </div>
            <h2 className="font-display text-2xl font-bold text-ink">Keep Your Information Private</h2>
            <p className="mt-3 text-sm font-semibold text-rose-900 leading-relaxed">
              Never share your password, home address, school details, or personal contact information on any project worksheets or presentations.
            </p>
            <p className="mt-3 text-xs text-slate-600">
              Great entrepreneurs are also smart digital citizens!
            </p>
          </div>

          <div className="mt-6 rounded-xl bg-white p-4 border border-rose-200 text-xs font-semibold text-rose-800 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
            Safe Space Guarantee: No personal data is stored publicly.
          </div>
        </div>
      </div>
    </div>
  );
};
