import Link from 'next/link';
import { LayoutDashboard, BookOpen, Layers, LogOut, User as UserIcon, MessageSquare } from 'lucide-react';
import React from 'react';
import prisma from '@/lib/db';
import { AdminSidebar } from '@/components/admin/AdminSidebar';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const activities = await prisma.portfolioActivity.findMany({
    orderBy: { orderIndex: 'asc' }
  });
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar activities={activities} />

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
