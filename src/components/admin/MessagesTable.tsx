'use client';

import React from 'react';
import type { contactMessages } from '@/db/schema';
type ContactMessage = typeof contactMessages.$inferSelect;
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export const MessagesTable = ({ messages }: { messages: ContactMessage[] }) => {
  return (
    <div className="w-full">
      <div className="relative w-full max-h-[calc(100vh-220px)] overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
        <table className="w-full caption-bottom text-sm border-collapse">
          <TableHeader className="bg-slate-50 sticky top-0 z-10 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
            <TableRow className="border-slate-100 border-b">
              <TableHead className="w-1/4 bg-slate-50 font-bold text-slate-700">Sender</TableHead>
              <TableHead className="w-1/4 bg-slate-50 font-bold text-slate-700">Email</TableHead>
              <TableHead className="bg-slate-50 font-bold text-slate-700">Message</TableHead>
              <TableHead className="w-32 text-right bg-slate-50 font-bold text-slate-700">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white">
            {messages.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-slate-500">
                  No messages have been received yet.
                </TableCell>
              </TableRow>
            )}
            {messages.map((msg) => (
              <TableRow key={msg.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                <TableCell className="font-medium align-top">
                  {msg.name}
                </TableCell>
                <TableCell className="align-top">
                  <a href={`mailto:${msg.email}`} className="text-blue-600 hover:underline">
                    {msg.email}
                  </a>
                </TableCell>
                <TableCell className="text-slate-600 whitespace-pre-wrap leading-relaxed align-top">
                  {msg.message}
                </TableCell>
                <TableCell className="text-right text-slate-400 text-xs align-top">
                  {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString() : ''}
                  <br />
                  {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </table>
      </div>
    </div>
  );
};
