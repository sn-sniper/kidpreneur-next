'use server';

import { db } from '@/lib/db';
import { courseSessions, portfolioActivities } from '@/db/schema';
import { eq, desc, asc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import { initialActivities } from './activityData';

async function assertAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  if (!token) {
    throw new Error('Unauthorized: Admin session required');
  }
  const payload = await verifyToken(token);
  if (!payload || payload.role !== 'ADMIN') {
    throw new Error('Unauthorized: Admin privileges required');
  }
  return payload;
}

export async function updateSession(id: string, formData: FormData) {
  await assertAdmin();

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const objective = formData.get('objective') as string;
  const activityPayload = formData.get('activityPayload') as string;

  await db.update(courseSessions).set({
      title,
      description,
      objective,
      activityPayload
  }).where(eq(courseSessions.id, id));

  revalidatePath('/admin');
  revalidatePath('/journey');
}

export async function createSession() {
  await assertAdmin();

  const lastSessionResult = await db.select().from(courseSessions).orderBy(desc(courseSessions.sessionNumber)).limit(1);
  const lastSession = lastSessionResult[0];
  
  const nextNum = lastSession ? lastSession.sessionNumber + 1 : 1;

  const newSessionResult = await db.insert(courseSessions).values({
      sessionNumber: nextNum,
      title: `New Session ${nextNum}`,
      description: 'Enter a short description here.',
      objective: 'What is the goal of this session?',
      icon: '✨',
      activityType: 'dynamic_form',
      activityPayload: JSON.stringify({ fields: [] })
  }).returning();
  const newSession = newSessionResult[0];

  revalidatePath('/admin/sessions');
  revalidatePath('/journey');
  redirect(`/admin/sessions?edit=${newSession.id}`);
}

export async function deleteSession(id: string) {
  await assertAdmin();

  const sessionToDeleteResult = await db.select().from(courseSessions).where(eq(courseSessions.id, id));
  const sessionToDelete = sessionToDeleteResult[0];
  if (!sessionToDelete) return;

  await db.delete(courseSessions).where(eq(courseSessions.id, id));

  // Reorder remaining sessions
  const remaining = await db.select().from(courseSessions).orderBy(asc(courseSessions.sessionNumber));

  for (let i = 0; i < remaining.length; i++) {
    if (remaining[i].sessionNumber !== i + 1) {
      await db.update(courseSessions)
        .set({ sessionNumber: i + 1 })
        .where(eq(courseSessions.id, remaining[i].id));
    }
  }

  revalidatePath('/admin/sessions');
  revalidatePath('/journey');
}

export async function publishInitialSessions() {
  await assertAdmin();

  // Clear any existing sessions so we can re-seed cleanly
  await db.delete(courseSessions);
  
  // Seed the 15 activities from the PDF specification
  for (const activity of initialActivities) {
    await db.insert(courseSessions).values(activity);
  }

  revalidatePath('/admin');
  revalidatePath('/journey');
}

// --- PORTFOLIO ACTIVITIES (FRONTEND) ---

export async function createPortfolioActivity(formData: FormData) {
  await assertAdmin();

  const name = formData.get('name') as string;
  const href = formData.get('href') as string;
  const orderIndex = parseInt(formData.get('orderIndex') as string) || 0;

  await db.insert(portfolioActivities).values({ name, href, orderIndex });

  revalidatePath('/admin/portfolio');
}

export async function updatePortfolioActivity(id: string, formData: FormData) {
  await assertAdmin();

  const name = formData.get('name') as string;
  const href = formData.get('href') as string;
  const orderIndex = parseInt(formData.get('orderIndex') as string) || 0;

  await db.update(portfolioActivities).set({ name, href, orderIndex }).where(eq(portfolioActivities.id, id));

  revalidatePath('/admin/portfolio');
}

export async function deletePortfolioActivity(id: string) {
  await assertAdmin();

  await db.delete(portfolioActivities).where(eq(portfolioActivities.id, id));

  revalidatePath('/admin/portfolio');
}

