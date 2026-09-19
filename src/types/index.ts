export type ViewName = 
  | 'home'
  | 'programme'
  | 'journey'
  | 'sessions'
  | 'session-workspace'
  | 'portfolio'
  | 'resources'
  | 'live'
  | 'parents'
  | 'help';

export interface Session {
  n: number;
  icon: string;
  title: string;
  desc: string;
  objective: string;
  intro: string;
  challenge: string;
  reflection: string;
  action: string;
  portfolioTagline?: string;
}

export type SessionStatus = 'Not Started' | 'In Progress' | 'Completed';

export interface SessionRecord {
  session_number: number;
  status: SessionStatus;
  notes: string;
  reflection: string;
  completed_at?: string;
  activityData?: Record<string, unknown>;
}

export interface ToastMessage {
  id: string;
  text: string;
}
