import React, { createContext, useContext, useState, useEffect } from 'react';
import { ViewName, SessionRecord, ToastMessage } from '../types';
import { StorageService } from '../services/storageService';
import { useRouter, useSearchParams } from 'next/navigation';

import type { CourseSession } from '@prisma/client';

interface JourneyContextType {
  activeView: ViewName;
  setActiveView: (view: ViewName) => void;
  currentSessionNum: number;
  setCurrentSessionNum: (n: number) => void;
  records: SessionRecord[];
  setRecords: (r: SessionRecord[]) => void;
  unlockedSessions: number[];
  toasts: ToastMessage[];
  showToast: (msg: string) => void;
  unlockModalOpen: boolean;
  unlockTargetSession: number | null;
  requestUnlock: (sessionNum: number) => void;
  closeUnlockModal: () => void;
  submitUnlockCode: (code: string) => Promise<boolean>;
  saveSessionRecord: (completed: boolean, notes: string, reflection: string) => Promise<boolean>;
  openSessionWorkspace: (sessionNum: number) => void;
  sessions: CourseSession[];
}

const JourneyContext = createContext<JourneyContextType | undefined>(undefined);

export const JourneyProvider: React.FC<{ children: React.ReactNode, initialSessions?: CourseSession[] }> = ({ children, initialSessions = [] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [activeView, setInternalActiveView] = useState<ViewName>('home');
  const [currentSessionNum, setInternalCurrentSessionNum] = useState<number>(1);
  const [records, setRecords] = useState<SessionRecord[]>([]);
  const sessionNumbers = initialSessions.map(s => s.sessionNumber);
  
  const [unlockedSessions, setUnlockedSessions] = useState<number[]>(sessionNumbers);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [unlockModalOpen, setUnlockModalOpen] = useState<boolean>(false);
  const [unlockTargetSession, setUnlockTargetSession] = useState<number | null>(null);

  // Sync URL params to internal state whenever URL changes
  useEffect(() => {
    const view = searchParams.get('view') as ViewName | null;
    const sessionStr = searchParams.get('session');
    
    const validViews: ViewName[] = [
      'home', 'programme', 'journey', 'sessions', 'session-workspace',
      'portfolio', 'resources', 'live', 'parents', 'help'
    ];
    
    if (view && validViews.includes(view)) {
      setInternalActiveView(view);
    } else if (!view) {
      setInternalActiveView('home'); // Default fallback if no view param
    }

    if (sessionStr) {
      setInternalCurrentSessionNum(Number(sessionStr));
    }
  }, [searchParams]);

  const setActiveView = (view: ViewName) => {
    setInternalActiveView(view);
    const params = new URLSearchParams(searchParams.toString());
    params.set('view', view);
    router.push(`?${params.toString()}`);
  };

  const setCurrentSessionNum = (n: number) => {
    setInternalCurrentSessionNum(n);
    const params = new URLSearchParams(searchParams.toString());
    params.set('session', n.toString());
    router.push(`?${params.toString()}`);
  };

  // Initialize data on mount
  useEffect(() => {
    const loadData = async () => {
      // We will override records and unlocked sessions to all available sessions for testing 100% completion
      const mockRecords = initialSessions.map(s => ({
        session_number: s.sessionNumber,
        status: 'Completed',
        notes: '',
        reflection: '',
        completed_at: new Date().toISOString()
      })) as SessionRecord[];
      setRecords(mockRecords);
    };
    loadData();
  }, []);

  const showToast = (text: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, text }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3800);
  };

  const requestUnlock = (sessionNum: number) => {
    setUnlockTargetSession(sessionNum);
    setUnlockModalOpen(true);
  };

  const closeUnlockModal = () => {
    setUnlockModalOpen(false);
    setUnlockTargetSession(null);
  };

  const submitUnlockCode = async (code: string): Promise<boolean> => {
    if (!unlockTargetSession) return false;
    
    // Call the backend to securely unlock with N-1 check
    const res = await StorageService.unlockSession(unlockTargetSession, code);
    
    if (res.isOk) {
      setUnlockedSessions(prev => Array.from(new Set([...prev, unlockTargetSession])));
      const target = unlockTargetSession;
      closeUnlockModal();
      openSessionWorkspace(target);
      showToast('Session unlocked! Ready to learn.');
      return true;
    } else {
      showToast(res.error || 'That code is not correct. Please try again.');
      return false;
    }
  };

  const openSessionWorkspace = (sessionNum: number) => {
    if (!unlockedSessions.includes(sessionNum)) {
      showToast(`Session ${sessionNum} is locked. You must complete the previous session first!`);
      const highestUnlocked = Math.max(...unlockedSessions);
      setInternalCurrentSessionNum(highestUnlocked);
      setInternalActiveView('sessions');
      
      const params = new URLSearchParams(searchParams.toString());
      params.set('session', highestUnlocked.toString());
      params.set('view', 'sessions');
      router.push(`?${params.toString()}`);
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setInternalCurrentSessionNum(sessionNum);
    setInternalActiveView('session-workspace');
    
    const params = new URLSearchParams(searchParams.toString());
    params.set('session', sessionNum.toString());
    params.set('view', 'session-workspace');
    router.push(`?${params.toString()}`);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const saveSessionRecord = async (
    completed: boolean,
    notes: string,
    reflection: string
  ): Promise<boolean> => {
    const existing = records.find(r => Number(r.session_number) === currentSessionNum);
    const status = completed ? 'Completed' : (existing?.status === 'Completed' ? 'Completed' : 'In Progress');
    const record: SessionRecord = {
      session_number: currentSessionNum,
      status,
      notes,
      reflection,
      completed_at: completed ? (existing?.completed_at || new Date().toISOString()) : (existing?.completed_at || '')
    };

    const res = await StorageService.saveRecord(record);
    if (res.isOk) {
      const updated = await StorageService.getRecords();
      setRecords(updated);
      showToast(completed ? 'Amazing work — session completed!' : 'Your work has been saved!');
      return true;
    } else {
      showToast('Your work could not be saved. Please try again.');
      return false;
    }
  };

  return (
    <JourneyContext.Provider
      value={{
        activeView,
        setActiveView,
        currentSessionNum,
        setCurrentSessionNum,
        records,
        setRecords,
        unlockedSessions,
        toasts,
        showToast,
        unlockModalOpen,
        unlockTargetSession,
        requestUnlock,
        closeUnlockModal,
        submitUnlockCode,
        saveSessionRecord,
        openSessionWorkspace,
        sessions: initialSessions
      }}
    >
      {children}
    </JourneyContext.Provider>
  );
};

export const useJourney = () => {
  const ctx = useContext(JourneyContext);
  if (!ctx) {
    throw new Error('useJourney must be used within a JourneyProvider');
  }
  return ctx;
};
