import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserRole, UserProfile } from '../types';
import { seedFirestoreIfEmpty } from '../lib/db';

interface AuthContextType {
  currentUser: UserProfile | null;
  role: UserRole;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginWithDemoRole: (role: UserRole) => void;
  loginWithEmail: (email: string, role: UserRole) => void;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
}

const DEMO_USERS: Record<UserRole, UserProfile> = {
  admin: {
    uid: 'demo-admin-01',
    email: 'admin@eduflow.edu',
    displayName: 'Dr. Arthur Pendelton',
    role: 'admin',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    phone: '+1 (555) 019-2831',
  },
  teacher: {
    uid: 'demo-teacher-01',
    email: 'elena.rostova@faculty.eduflow.edu',
    displayName: 'Dr. Elena Rostova',
    role: 'teacher',
    linkedTeacherId: 'tch-201',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
    phone: '+1 (555) 111-2233',
  },
  student: {
    uid: 'demo-student-01',
    email: 'alex.wright@student.eduflow.edu',
    displayName: 'Alexander Wright',
    role: 'student',
    linkedStudentId: 'std-101',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    phone: '+1 (555) 234-5678',
  },
  parent: {
    uid: 'demo-parent-01',
    email: 'marcus.wright@gmail.com',
    displayName: 'Marcus Wright',
    role: 'parent',
    linkedStudentId: 'std-101',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
    phone: '+1 (555) 333-8899',
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('eduflow_active_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Seed database on first mount if empty
    seedFirestoreIfEmpty().finally(() => {
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('eduflow_active_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('eduflow_active_user');
    }
  }, [currentUser]);

  const loginWithDemoRole = (selectedRole: UserRole) => {
    const user = DEMO_USERS[selectedRole];
    setCurrentUser(user);
  };

  const loginWithEmail = (email: string, selectedRole: UserRole) => {
    const nameFromEmail = email.split('@')[0].replace('.', ' ');
    const formattedName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);

    const newUser: UserProfile = {
      uid: 'usr-' + Math.random().toString(36).substring(2, 9),
      email,
      displayName: formattedName,
      role: selectedRole,
      avatarUrl: DEMO_USERS[selectedRole].avatarUrl,
    };
    setCurrentUser(newUser);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    if (currentUser) {
      setCurrentUser({ ...currentUser, ...data });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        role: currentUser?.role || 'admin',
        isAuthenticated: !!currentUser,
        isLoading,
        loginWithDemoRole,
        loginWithEmail,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
