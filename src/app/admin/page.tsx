import React from 'react';
import { db } from '@/lib/db';
import { users, labRegistrations, portfolioItems } from '@/db/schema';
import { desc, eq, asc } from 'drizzle-orm';
import { AdminDashboardClient } from '@/components/admin/AdminDashboardClient';

export const dynamic = 'force-dynamic';

export default async function AdminHome() {
  // 1. Fetch registrations
  const allRegistrations = await db
    .select()
    .from(labRegistrations)
    .orderBy(desc(labRegistrations.createdAt));

  // 2. Fetch all portfolio items
  const allPortfolioItems = await db
    .select()
    .from(portfolioItems)
    .orderBy(asc(portfolioItems.orderIndex));

  // 3. Count total students in users table
  const allStudents = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.role, 'STUDENT'));

  // Calculate dynamic date status for portfolio items
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const processedPortfolioItems = allPortfolioItems.map((item) => {
    let isPast = false;
    if (item.eventDate && item.type === 'WORKSHOP') {
      const parsedDate = new Date(item.eventDate);
      if (!isNaN(parsedDate.getTime())) {
        const itemDate = new Date(parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDate());
        if (itemDate < startOfToday) {
          isPast = true;
        }
      }
    } else if (item.status === 'COMPLETED') {
      isPast = true;
    }

    return {
      id: item.id,
      title: item.title,
      slug: item.slug,
      type: item.type,
      status: item.status,
      category: item.category,
      eventDate: item.eventDate,
      eventTime: item.eventTime,
      coverImageUrl: item.coverImageUrl,
      instagramUrl: item.instagramUrl,
      isPublished: item.isPublished,
      isPast,
    };
  });

  const pendingPaymentsCount = allRegistrations.filter((r) => r.status === 'PENDING').length;
  const confirmedRegistrationsCount = allRegistrations.filter((r) => r.status === 'CONFIRMED').length;
  const upcomingWorkshopsCount = processedPortfolioItems.filter(
    (item) => item.type === 'WORKSHOP' && !item.isPast
  ).length;
  const instagramReelsCount = processedPortfolioItems.filter((item) => item.type === 'INSTAGRAM').length;

  const stats = {
    totalStudents: allStudents.length,
    pendingPaymentsCount,
    confirmedRegistrationsCount,
    upcomingWorkshopsCount,
    totalPortfolioCount: processedPortfolioItems.length,
    instagramReelsCount,
  };

  const formattedRegistrations = allRegistrations.map((r) => ({
    id: r.id,
    childFullName: r.childFullName,
    childAge: r.childAge,
    parentFullName: r.parentFullName,
    parentPhone: r.parentPhone,
    parentEmail: r.parentEmail,
    status: r.status,
    generatedEmail: r.generatedEmail,
    generatedPassword: r.generatedPassword,
    createdAt: r.createdAt
      ? typeof r.createdAt === 'object' && 'getTime' in (r.createdAt as Date)
        ? Math.floor((r.createdAt as Date).getTime() / 1000)
        : Number(r.createdAt)
      : null,
  }));

  return (
    <AdminDashboardClient
      stats={stats}
      initialRegistrations={formattedRegistrations}
      portfolioItems={processedPortfolioItems}
    />
  );
}
