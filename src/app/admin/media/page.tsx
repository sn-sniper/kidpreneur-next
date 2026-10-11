import React from 'react';
import { MediaLibrary } from '@/components/admin/MediaLibrary';
import { Image as ImageIcon } from 'lucide-react';

export const metadata = {
  title: 'Media & Gallery Hub - Kidpreneur Admin',
};

export default function AdminMediaPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center">
            <ImageIcon className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Media & Gallery Hub</h1>
            <p className="text-slate-500 text-sm">
              Upload and manage high-resolution workshop photos and assets stored in Cloudflare R2.
            </p>
          </div>
        </div>
      </header>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <MediaLibrary />
      </div>
    </div>
  );
}
