import { useState, useEffect, useCallback } from 'react';

export const useAdminConfirm = () => {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmingId, setConfirmingId] = useState<string | null>(null);

  const fetchRegistrations = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/learners/lab');
      if (res.ok) {
        const data = await res.json();
        setRegistrations(data.registrations);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRegistrations();
  }, [fetchRegistrations]);

  const confirmRegistration = async (registrationId: string) => {
    setConfirmingId(registrationId);
    try {
      const res = await fetch('/api/admin/learners/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ registrationId })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      // Refresh data to show confirmed status
      await fetchRegistrations();
      return data.credentials; // The raw email/password
    } catch (err: any) {
      alert(err.message || 'Failed to confirm');
      return null;
    } finally {
      setConfirmingId(null);
    }
  };

  return {
    registrations,
    loading,
    confirmingId,
    confirmRegistration,
    refresh: fetchRegistrations
  };
};
