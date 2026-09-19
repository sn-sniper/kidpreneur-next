'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { initialActivities } from './activityData';

export async function updateSession(id: string, formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const objective = formData.get('objective') as string;
  const activityPayload = formData.get('activityPayload') as string;

  await prisma.courseSession.update({
    where: { id },
    data: {
      title,
      description,
      objective,
      activityPayload
    }
  });

  revalidatePath('/admin');
  revalidatePath('/journey');
}

export async function createSession() {
  const lastSession = await prisma.courseSession.findFirst({
    orderBy: { sessionNumber: 'desc' }
  });
  
  const nextNum = lastSession ? lastSession.sessionNumber + 1 : 1;

  const newSession = await prisma.courseSession.create({
    data: {
      sessionNumber: nextNum,
      title: `New Session ${nextNum}`,
      description: 'Enter a short description here.',
      objective: 'What is the goal of this session?',
      icon: '✨',
      activityType: 'dynamic_form',
      activityPayload: JSON.stringify({ fields: [] })
    }
  });

  revalidatePath('/admin/sessions');
  revalidatePath('/journey');
  redirect(`/admin/sessions?edit=${newSession.id}`);
}

export async function deleteSession(id: string) {
  const sessionToDelete = await prisma.courseSession.findUnique({ where: { id } });
  if (!sessionToDelete) return;

  await prisma.courseSession.delete({
    where: { id }
  });

  // Reorder remaining sessions
  const remaining = await prisma.courseSession.findMany({
    orderBy: { sessionNumber: 'asc' }
  });

  for (let i = 0; i < remaining.length; i++) {
    if (remaining[i].sessionNumber !== i + 1) {
      await prisma.courseSession.update({
        where: { id: remaining[i].id },
        data: { sessionNumber: i + 1 }
      });
    }
  }

  revalidatePath('/admin/sessions');
  revalidatePath('/journey');
}

export async function publishInitialSessions() {
  // Clear any existing sessions so we can re-seed cleanly
  await prisma.courseSession.deleteMany({});
  
  // Seed the 15 activities from the PDF specification
  for (const activity of initialActivities) {
    await prisma.courseSession.create({
      data: activity
    });
  }

  revalidatePath('/admin');
  revalidatePath('/journey');
}

// --- PORTFOLIO ACTIVITIES (FRONTEND) ---

export async function createPortfolioActivity(formData: FormData) {
  const name = formData.get('name') as string;
  const href = formData.get('href') as string;
  const orderIndex = parseInt(formData.get('orderIndex') as string) || 0;

  await prisma.portfolioActivity.create({
    data: { name, href, orderIndex }
  });

  revalidatePath('/admin/portfolio');
}

export async function updatePortfolioActivity(id: string, formData: FormData) {
  const name = formData.get('name') as string;
  const href = formData.get('href') as string;
  const orderIndex = parseInt(formData.get('orderIndex') as string) || 0;

  await prisma.portfolioActivity.update({
    where: { id },
    data: { name, href, orderIndex }
  });

  revalidatePath('/admin/portfolio');
}

export async function deletePortfolioActivity(id: string) {
  await prisma.portfolioActivity.delete({
    where: { id }
  });

  revalidatePath('/admin/portfolio');
}

