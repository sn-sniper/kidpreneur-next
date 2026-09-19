'use client';

import React from 'react';
import { useActivityForm } from '@/hooks/useActivityForm';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface LabRegistrationFormProps {
  onSuccess: () => void;
}

export const LabRegistrationForm: React.FC<LabRegistrationFormProps> = ({ onSuccess }) => {
  const { form, isSubmitting, error, submitRegistration } = useActivityForm();

  const onSubmit = (data: any) => {
    submitRegistration(data, onSuccess);
  };

  const inputClassName = "appearance-none block w-full px-4 py-3 border border-slate-200 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent transition-shadow font-medium h-auto";
  const labelClassName = "block text-sm font-semibold text-slate-700";

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-100">
      <h2 className="text-2xl font-bold font-display text-ink mb-6">Register for The Kidpreneur Lab</h2>
      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-semibold border border-red-100">
          {error}
        </div>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="parentFullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelClassName}>Parent Full Name</FormLabel>
                  <FormControl>
                    <Input className={inputClassName} placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="parentEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelClassName}>Parent Email</FormLabel>
                  <FormControl>
                    <Input className={inputClassName} type="email" placeholder="john@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="parentPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelClassName}>Parent Phone</FormLabel>
                  <FormControl>
                    <Input className={inputClassName} placeholder="+1234567890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="childFullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelClassName}>Child Full Name</FormLabel>
                  <FormControl>
                    <Input className={inputClassName} placeholder="Alex Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="childAge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelClassName}>Child Age</FormLabel>
                  <FormControl>
                    <Input className={inputClassName} type="number" placeholder="10" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="termsAccepted"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Accept terms and conditions
                  </FormLabel>
                  <p className="text-sm text-slate-500">
                    You agree to our Terms of Service and Privacy Policy.
                  </p>
                </div>
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isSubmitting} className="w-full h-12 text-base font-bold rounded-xl">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              'Submit Registration'
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};
