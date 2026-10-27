import React from 'react';
import { db } from '@/lib/db';
import { portfolioActivities } from '@/db/schema';
import { asc } from 'drizzle-orm';
import { AdminLayoutClient } from '@/components/admin/AdminLayoutClient';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const activities = await db.select().from(portfolioActivities).orderBy(asc(portfolioActivities.orderIndex));
  return (
    <AdminLayoutClient activities={activities}>
      {children}
    </AdminLayoutClient>
  );
}
