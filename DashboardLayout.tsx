import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Building,
  BookOpen,
  Calendar,
  Award,
  CreditCard,
  Clock,
  Bell,
  BarChart3,
  User,
  Settings,
  LogOut,
  Sun,
  Moon,
  ChevronLeft,
  Menu,
  GraduationCap,
  Search,
  ShieldCheck,
  Home,
  Sparkles
} from 'lucide-react';
import { UserRole } from '../../types';

export type DashboardView =
  | 'overview'
  | 'students'
  | 'teachers'
  | 'classes'
  | 'subjects'
  | 'attendance'
  | 'exams'
  | 'fees'
  | 'timetable'
  | 'announcements'
  | 'reports'
  | 'profile'
  | 'settings';

interface DashboardLayoutProps {
  currentView: DashboardView;
  onSelectView: (view: DashboardView) => void;
  onNavigateHome: () => void;
  children: React.ReactNode;
}

export function DashboardLayout({
  currentView,
  onSelectView,
  onNavigateHome,
  children
}: DashboardLayoutProps) {
  const { currentUser, role, logout, loginWithDemoRole } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  // Sidebar item configuration with role restrictions
  const navigationItems: {
    id: DashboardView;
    label: string;
    icon: React.ElementType;
    allowedRoles: UserRole[];
    badge?: string;
  }[] = [
    {
      id: 'overview',
      label: 'Dashboard Overview',
      icon: LayoutDashboard,
      allowedRoles: ['admin', 'teacher', 'student', 'parent'],
    },
    {
      id: 'students',
      label: 'Student Directory',
      icon: Users,
      allowedRoles: ['admin', 'teacher'],
    },
    {
      id: 'teachers',
      label: 'Faculty & Teachers',
      icon: UserCheck,
      allowedRoles: ['admin'],
    },
    {
      id: 'classes',
      label: 'Classes & Sections',
      icon: Building,
      allowedRoles: ['admin', 'teacher'],
    },
    {
      id: 'subjects',
      label: 'Subjects & Syllabus',
      icon: BookOpen,
      allowedRoles: ['admin', 'teacher', 'student'],
    },
    {
      id: 'attendance',
      label: 'Attendance Register',
      icon: Calendar,
      allowedRoles: ['admin', 'teacher', 'student', 'parent'],
    },
    {
      id: 'exams',
      label: 'Exams & Gradebook',
      icon: Award,
      allowedRoles: ['admin', 'teacher', 'student', 'parent'],
    },
    {
      id: 'fees',
      label: 'Fees & Invoices',
      icon: CreditCard,
      allowedRoles: ['admin', 'student', 'parent'],
    },
    {
      id: 'timetable',
      label: 'Weekly Timetable',
      icon: Clock,
      allowedRoles: ['admin', 'teacher', 'student', 'parent'],
    },
    {
      id: 'announcements',
      label: 'Notice Bulletin',
      icon: Bell,
      allowedRoles: ['admin', 'teacher', 'student', 'parent'],
      badge: 'New',
    },
    {
      id: 'reports',
      label: 'Reports & Analytics',
      icon: BarChart3,
      allowedRoles: ['admin', 'teacher'],
    },
    {
      id: 'profile',
      label: 'My Account Profile',
      icon: User,
      allowedRoles: ['admin', 'teacher', 'student', 'parent'],
    },
    {
      id: 'settings',
      label: 'System Settings',
      icon: Settings,
      allowedRoles: ['admin'],
    },
  ];

  const filteredNav = navigationItems.filter((item) => item.allowedRoles.includes(role));

  const handleRoleSwitch = (newRole: UserRole) => {
    loginWithDemoRole(newRole);
    setRoleMenuOpen(false);
    onSelectView('overview');
  };

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors relative overflow-hidden">
      {/* Background Radial Glows */}
      <div className="fixed top-[-100px] left-[-100px] w-96 h-96 bg-indigo-500/15 dark:bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-100px] right-[-100px] w-96 h-96 bg-cyan-500/15 dark:bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none z-0" />
      
      {/* DESKTOP SIDEBAR */}
      <aside
        className={`hidden md:flex flex-col border-r border-white/40 dark:border-slate-800/60 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl transition-all duration-300 z-30 sticky top-0 h-screen ${
          sidebarCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Sidebar Header */}
        <div className="h-20 px-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          {!sidebarCollapsed && (
            <div
              onClick={onNavigateHome}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-md">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <span className="text-base font-black tracking-tight text-slate-900 dark:text-white">
                  EduFlow
                </span>
                <span className="ml-1 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                  SIS
                </span>
              </div>
            </div>
          )}

          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors mx-auto"
            title={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            <ChevronLeft className={`w-5 h-5 transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Sidebar Nav Items */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {filteredNav.map((item) => {
            const IconComp = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectView(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-xs transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25 font-bold'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                } ${sidebarCollapsed ? 'justify-center px-0' : ''}`}
                title={sidebarCollapsed ? item.label : undefined}
              >
                <IconComp className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} />
                {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
                {!sidebarCollapsed && item.badge && (
                  <span className="ml-auto px-1.5 py-0.5 rounded-full text-[9px] font-black bg-rose-500 text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Sidebar Footer - Active User Info */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div className={`flex items-center gap-3 ${sidebarCollapsed ? 'justify-center' : ''}`}>
            <img
              src={currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
              alt="Avatar"
              className="w-8 h-8 rounded-full object-cover border border-indigo-500/30 shrink-0"
            />
            {!sidebarCollapsed && (
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  {currentUser?.displayName || 'User Profile'}
                </p>
                <p className="text-[10px] uppercase font-bold text-indigo-600 dark:text-indigo-400 tracking-wider">
                  {role} Mode
                </p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT WRAPPER */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        
        {/* TOP DASHBOARD HEADER */}
        <header className="h-20 px-4 sm:px-6 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border-b border-white/50 dark:border-slate-800/60 flex items-center justify-between gap-4 sticky top-0 z-20 shadow-xs">
          
          {/* Mobile Sidebar Toggle & Page Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Menu className="w-6 h-6" />
            </button>

            <button
              onClick={onNavigateHome}
              className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-600 transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Website</span>
            </button>

            <span className="hidden sm:inline text-slate-300 dark:text-slate-700">/</span>

            <h1 className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white capitalize">
              {currentView.replace('-', ' ')}
            </h1>
          </div>

          {/* Center Search Input */}
          <div className="hidden lg:flex items-center gap-2 max-w-sm w-full relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3" />
            <input
              type="text"
              placeholder="Search students, roll numbers, exams..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-900 dark:text-white border border-transparent focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition-all"
            />
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Quick Persona Role Switcher */}
            <div className="relative">
              <button
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 transition-all shadow-xs"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="capitalize">{role} Persona</span>
              </button>

              {roleMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Switch Test Persona
                  </div>
                  {(['admin', 'teacher', 'student', 'parent'] as UserRole[]).map((r) => (
                    <button
                      key={r}
                      onClick={() => handleRoleSwitch(r)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold capitalize flex items-center justify-between ${
                        role === r ? 'bg-indigo-600 text-white' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span>{r}</span>
                      {role === r && <Sparkles className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>

            {/* Logout Button */}
            <button
              onClick={() => {
                logout();
                onNavigateHome();
              }}
              className="p-2 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* DASHBOARD PAGE CONTENT */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-8 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* MOBILE SIDEBAR DRAWER */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            onClick={() => setMobileSidebarOpen(false)}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
          />
          <div className="relative w-72 max-w-xs bg-white dark:bg-slate-900 h-full p-4 flex flex-col space-y-4 shadow-2xl z-10">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <span className="font-bold text-base">EduFlow SIS</span>
              </div>
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-1">
              {filteredNav.map((item) => {
                const IconComp = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectView(item.id);
                      setMobileSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold ${
                      isActive ? 'bg-indigo-600 text-white' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <IconComp className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
