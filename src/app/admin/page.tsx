import Link from 'next/link';
import { BookOpen, Layers } from 'lucide-react';

export default function AdminHome() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold text-slate-800 mb-2">Welcome to Kidpreneur Admin</h1>
      <p className="text-slate-500 mb-8">Select a module from the sidebar to manage your applications.</p>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Link href="/admin/sessions" className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
            <BookOpen className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Course Sessions (LMS)</h2>
          <p className="text-slate-500 text-sm">Manage the interactive modules, progress locks, and activities for the Kidpreneur Lab backend.</p>
        </Link>
        
        <Link href="/admin/portfolio" className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
          <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600 mb-4 group-hover:scale-110 transition-transform">
            <Layers className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Frontend Activities (Portfolio)</h2>
          <p className="text-slate-500 text-sm">Edit the dropdown links and static activities displayed on the public Kidpreneur Journey website.</p>
        </Link>
      </div>
    </div>
  );
}
