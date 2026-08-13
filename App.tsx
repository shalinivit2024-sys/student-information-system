import React, { useState } from 'react';
import { AuthProvider, useAuth } from './AuthContext'
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './components/landing/LandingPage';
import { LoginModal } from './components/auth/LoginModal';
import { DashboardLayout, DashboardView } from './components/dashboard/DashboardLayout';
import { OverviewView } from './components/dashboard/views/OverviewView';

function AppContent() {
  const { isAuthenticated, loginWithDemoRole } = useAuth();
  const [currentView, setCurrentView] = useState<'landing' | DashboardView>('landing');
  const [activeSection, setActiveSection] = useState('hero');
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleQuickDemo = (role: 'admin' | 'teacher' | 'student' | 'parent') => {
    loginWithDemoRole(role);
    setCurrentView('overview');
  };

  if (currentView !== 'landing' && isAuthenticated) {
    return (
      <DashboardLayout
        currentView={currentView as DashboardView}
        onSelectView={(view) => setCurrentView(view)}
        onNavigateHome={() => setCurrentView('landing')}
      >
        {currentView === 'overview' && (
          <OverviewView onNavigateView={(view) => setCurrentView(view)} />
        )}
        {currentView !== 'overview' && (
          <div className="p-8 rounded-3xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/60 dark:border-slate-800/60 shadow-sm space-y-4">
            <h2 className="text-xl font-bold capitalize text-slate-900 dark:text-white">
              {currentView.replace('-', ' ')} View
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Interactive management panel for {currentView}. All records synced with real-time cloud Firestore.
            </p>
            <OverviewView onNavigateView={(view) => setCurrentView(view)} />
          </div>
        )}
      </DashboardLayout>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 relative overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      {/* Radial Glass Background Lights */}
      <div className="fixed top-[-100px] left-[-100px] w-[500px] h-[500px] bg-indigo-400/15 dark:bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-cyan-400/15 dark:bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none z-0" />

      <Navbar
        onOpenLogin={() => setIsLoginOpen(true)}
        onNavigateToDashboard={() => setCurrentView('overview')}
        activeSection={activeSection}
        onSelectSection={(sec) => setActiveSection(sec)}
      />

      <main className="flex-1 relative z-10">
        <LandingPage
          onOpenLogin={() => setIsLoginOpen(true)}
          onNavigateToDashboard={() => setCurrentView('overview')}
          onQuickDemo={handleQuickDemo}
        />
      </main>

      <Footer />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSuccess={() => setCurrentView('overview')}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <AppContent />
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
