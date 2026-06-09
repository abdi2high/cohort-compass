import { useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  avatar: string;
  points: number;
  streak: number;
  level: number;
  goals: {
    daily: number; // minutes
    weekly: number; // minutes
  };
  badges: string[];
}

export interface Group {
  id: string;
  name: string;
  subject: string;
  description: string;
  members: number;
  image: string;
}

export interface StudySession {
  id: string;
  startTime: string;
  duration: number; // minutes
  groupId?: string;
  notes?: string;
}

export interface Quiz {
  id: string;
  title: string;
  subject: string;
  questions: {
    question: string;
    options: string[];
    correctAnswer: number;
  }[];
}

const DEFAULT_USER: User = {
  id: '1',
  name: 'Guest Student',
  avatar: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/023fbf4f-9cdf-45c8-bcf0-75197d2238f0/avatar-1-dda0c656-1780919488283.webp',
  points: 150,
  streak: 5,
  level: 3,
  goals: {
    daily: 60,
    weekly: 300,
  },
  badges: ['Early Bird', 'Consistency King'],
};

const DEFAULT_GROUPS: Group[] = [
  { id: '1', name: 'Advanced Calculus', subject: 'Math', description: 'Deep dive into derivatives and integrals.', members: 12, image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=60' },
  { id: '2', name: 'Organic Chemistry', subject: 'Science', description: 'Studying for the upcoming midterms.', members: 8, image: 'https://images.unsplash.com/photo-1532187875605-1ef6c237a1e0?w=800&auto=format&fit=crop&q=60' },
  { id: '3', name: 'English Literature', subject: 'English', description: 'Analyzing Shakespearean tragedies.', members: 15, image: 'https://images.unsplash.com/photo-1544648151-1823ed3c27e2?w=800&auto=format&fit=crop&q=60' },
];

export function useStudyData() {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('study_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [groups, setGroups] = useState<Group[]>(() => {
    const saved = localStorage.getItem('study_groups');
    return saved ? JSON.parse(saved) : DEFAULT_GROUPS;
  });

  const [sessions, setSessions] = useState<StudySession[]>(() => {
    const saved = localStorage.getItem('study_sessions');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (user) localStorage.setItem('study_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('study_groups', JSON.stringify(groups));
  }, [groups]);

  useEffect(() => {
    localStorage.setItem('study_sessions', JSON.stringify(sessions));
  }, [sessions]);

  const login = (name: string) => {
    const newUser = { ...DEFAULT_USER, name };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('study_user');
  };

  const addSession = (session: Omit<StudySession, 'id'>) => {
    const newSession = { ...session, id: Math.random().toString(36).substr(2, 9) };
    setSessions(prev => [newSession, ...prev]);
    
    // Update user points and streak
    if (user) {
      setUser({
        ...user,
        points: user.points + Math.floor(session.duration / 10) * 5,
      });
    }
  };

  const createGroup = (group: Omit<Group, 'id' | 'members'>) => {
    const newGroup = { ...group, id: Math.random().toString(36).substr(2, 9), members: 1 };
    setGroups(prev => [newGroup, ...prev]);
  };

  const joinGroup = (groupId: string) => {
    setGroups(prev => prev.map(g => g.id === groupId ? { ...g, members: g.members + 1 } : g));
  };

  return {
    user,
    groups,
    sessions,
    login,
    logout,
    addSession,
    createGroup,
    joinGroup,
  };
}
