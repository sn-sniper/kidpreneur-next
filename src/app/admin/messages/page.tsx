import { db } from '@/lib/db';
import { contactMessages } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { MessageSquare, Mail, Calendar } from 'lucide-react';
import { MessagesTable } from '@/components/admin/MessagesTable';

export default async function MessagesAdmin() {
  const messages = await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));

  return (
    <div className="max-w-4xl">
      <header className="flex justify-between items-center mb-8 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-3">
          <MessageSquare className="text-kidpreneur-teal w-8 h-8" />
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Contact Messages</h1>
            <p className="text-slate-500 text-sm">View messages submitted through the public website.</p>
          </div>
        </div>
      </header>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <MessagesTable messages={messages} />
      </div>
    </div>
  );
}
