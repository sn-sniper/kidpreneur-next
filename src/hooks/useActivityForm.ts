import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const formSchema = z.object({
  parentFullName: z.string().min(2, "Name is too short").max(100).regex(/^[a-zA-Z\s]+$/, "No special characters allowed"),
  parentEmail: z.string().email("Invalid email address"),
  parentPhone: z.string().regex(/^\+?[0-9\s\-]{8,15}$/, "Invalid phone number"),
  childFullName: z.string().min(2, "Name is too short").max(100).regex(/^[a-zA-Z\s]+$/, "No special characters allowed"),
  childAge: z.coerce.number().min(5, "Must be at least 5 years old").max(18, "Must be under 18"),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions"
  }),
});

export type ActivityFormValues = z.infer<typeof formSchema>;

export const useActivityForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const form = useForm<ActivityFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      parentFullName: '',
      parentPhone: '',
      parentEmail: '',
      childFullName: '',
      childAge: undefined,
      termsAccepted: false,
    }
  });

  const submitRegistration = async (data: ActivityFormValues, onSuccess: () => void) => {
    setIsSubmitting(true);
    setError('');
    try {
      const response = await fetch('/api/register/lab', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || 'Failed to submit registration');
      }

      onSuccess();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    isSubmitting,
    error,
    submitRegistration
  };
};
