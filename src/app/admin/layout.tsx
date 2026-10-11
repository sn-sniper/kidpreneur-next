import Link from 'next/link';
import { LayoutDashboard, BookOpen, Layers, LogOut, User as UserIcon, MessageSquare } from 'lucide-react';
import React from 'react';
import { db } from '@/lib/db';
import { portfolioActivities } from '@/db/schema';
import { asc } from 'drizzle-orm';
import { AdminSidebar } from '@/components/admin/AdminSidebar';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const activities = await db.select().from(portfolioActivities).orderBy(asc(portfolioActivities.orderIndex));
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
