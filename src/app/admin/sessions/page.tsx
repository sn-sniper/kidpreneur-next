import prisma from '@/lib/db';
import { Suspense } from 'react';
import { SessionsPageClient } from '@/components/admin/SessionsPageClient';

export default async function AdminDashboard() {
  const sessions = await prisma.courseSession.findMany({
    orderBy: { sessionNumber: 'asc' }
  });

  return (
    <Suspense fallback={<div className="p-8 text-slate-500">Loading sessions...</div>}>
      <SessionsPageClient sessions={sessions} />
    </Suspense>
  );
}
