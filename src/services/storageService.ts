import { SessionRecord } from '../types';

export class StorageService {
  /**
   * Fetch all saved session records from the backend API
   */
  static async getRecords(): Promise<SessionRecord[]> {
    try {
      const res = await fetch('/api/progress');
      if (!res.ok) return [];
      const data = await res.json();
      return data.records || [];
    } catch (e) {
      console.error('Failed to load records from backend', e);
      return [];
    }
  }

  /**
   * Save or update a session record via the backend API
   */
  static async saveRecord(record: SessionRecord): Promise<{ isOk: boolean }> {
    try {
      const res = await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record)
      });
      return { isOk: res.ok };
    } catch (e) {
      console.error('Failed to save record to backend', e);
      return { isOk: false };
    }
  }

  /**
   * Get list of unlocked session IDs from the backend API
   */
  static async getUnlockedSessions(): Promise<number[]> {
    try {
      const res = await fetch('/api/progress');
      if (!res.ok) return [1];
      const data = await res.json();
      return data.unlockedSessions || [1];
    } catch (e) {
      return [1];
    }
  }

  /**
   * Unlock a session by session number via the backend API securely
   */
  static async unlockSession(sessionNum: number, code: string): Promise<{ isOk: boolean; error?: string }> {
    try {
      const res = await fetch('/api/progress/unlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionNum, code })
      });
      
      const data = await res.json();
      if (!res.ok) {
        return { isOk: false, error: data.error };
      }
      return { isOk: true };
    } catch (e) {
      return { isOk: false, error: 'Network error' };
    }
  }
}
