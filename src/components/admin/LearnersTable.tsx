'use client';

import React, { useState } from 'react';
import { useAdminConfirm } from '@/hooks/useAdminConfirm';
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Loader2, Key } from 'lucide-react';

export const LearnersTable = () => {
  const { registrations, loading, confirmingId, confirmRegistration } = useAdminConfirm();
  const [credsDialog, setCredsDialog] = useState<{ isOpen: boolean; creds: { email: string; password: string } | null }>({
    isOpen: false,
    creds: null
  });

  const handleConfirm = async (id: string) => {
    const creds = await confirmRegistration(id);
    if (creds) {
      setCredsDialog({ isOpen: true, creds });
    }
  };

  if (loading) {
    return <div className="p-8 text-center"><Loader2 className="h-6 w-6 animate-spin mx-auto text-slate-400" /></div>;
  }

  return (
    <div className="w-full">
      <div className="relative w-full max-h-[calc(100vh-220px)] overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
        <table className="w-full caption-bottom text-sm">
          <TableHeader className="bg-slate-50 sticky top-0 z-10 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
            <TableRow className="border-slate-100 border-b">
              <TableHead className="bg-slate-50">Parent Name</TableHead>
              <TableHead className="bg-slate-50">Child Name</TableHead>
              <TableHead className="bg-slate-50">Child Age</TableHead>
              <TableHead className="bg-slate-50">Phone</TableHead>
              <TableHead className="bg-slate-50">Email</TableHead>
              <TableHead className="bg-slate-50">Status</TableHead>
              <TableHead className="text-right bg-slate-50">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {registrations.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-slate-500">
                  No registrations found.
                </TableCell>
              </TableRow>
            )}
            {registrations.map((reg) => (
              <TableRow key={reg.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                <TableCell className="font-medium">{reg.parentFullName}</TableCell>
                <TableCell>{reg.childFullName}</TableCell>
                <TableCell>{reg.childAge}</TableCell>
                <TableCell>{reg.parentPhone}</TableCell>
                <TableCell>{reg.parentEmail}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                    reg.status === 'CONFIRMED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {reg.status.toLowerCase()}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  {reg.status === 'PENDING' ? (
                    <Button 
                      size="sm" 
                      onClick={() => handleConfirm(reg.id)}
                      disabled={confirmingId === reg.id}
                    >
                      {confirmingId === reg.id ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Confirm Payment'}
                    </Button>
                  ) : (
                    <Button 
                      size="sm" 
                      variant="secondary"
                      onClick={() => {
                        if (reg.generatedEmail && reg.generatedPassword) {
                          setCredsDialog({ 
                            isOpen: true, 
                            creds: { email: reg.generatedEmail, password: reg.generatedPassword } 
                          });
                        } else {
                          alert("Credentials missing or not generated.");
                        }
                      }}
                    >
                      <Key className="h-4 w-4 mr-2" />
                      Show User Creds
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </table>
      </div>

      <Dialog open={credsDialog.isOpen} onOpenChange={(open) => !open && setCredsDialog({ isOpen: false, creds: null })}>
        <DialogContent 
          style={{ backgroundColor: '#ffffff' }}
          className="!bg-white bg-white max-w-md w-full p-6 rounded-3xl shadow-2xl border border-slate-100"
        >
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-900">Child Account Generated Successfully!</DialogTitle>
            <DialogDescription className="text-sm text-slate-500 mt-1">
              The account has been created and the parent has been notified via email. 
              Here are the generated credentials:
            </DialogDescription>
          </DialogHeader>
          {credsDialog.creds && (
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 mt-4 space-y-3">
              <div>
                <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Email Username</span>
                <span className="font-mono text-ink text-base select-all font-semibold block bg-white px-3 py-2 rounded-lg border border-slate-200">
                  {credsDialog.creds.email}
                </span>
              </div>
              <div>
                <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Password</span>
                <span className="font-mono text-ink text-base select-all font-semibold block bg-white px-3 py-2 rounded-lg border border-slate-200">
                  {credsDialog.creds.password}
                </span>
              </div>
            </div>
          )}
          <div className="mt-6 flex justify-end">
            <Button 
              onClick={() => setCredsDialog({ isOpen: false, creds: null })}
              className="px-6 py-2 rounded-xl"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
