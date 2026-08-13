import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  Users,
  UserCheck,
  Building,
  Award,
  CreditCard,
  Calendar,
  Bell,
  ArrowUpRight,
  TrendingUp,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  Clock,
  ChevronRight
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { useAuth } from '../../../context/AuthContext';
import { fetchStudents, fetchTeachers, fetchClasses, fetchFees, fetchAnnouncements, fetchExams } from '../../../lib/db';
import { Student, Teacher, ClassRoom, FeeInvoice, Announcement, Exam } from '../../../types';

interface OverviewViewProps {
  onNavigateView: (view: any) => void;
}

export function OverviewView({ onNavigateView }: OverviewViewProps) {
  const { currentUser, role } = useAuth();

  const [students, setStudents] = useState<Student[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [classes, setClasses] = useState<ClassRoom[]>([]);
  const [fees, setFees] = useState<FeeInvoice[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      const [stData, tchData, clsData, feeData, annData, exData] = await Promise.all([
        fetchStudents(),
        fetchTeachers(),
        fetchClasses(),
        fetchFees(),
        fetchAnnouncements(),
        fetchExams(),
      ]);
      setStudents(stData);
      setTeachers(tchData);
      setClasses(clsData);
      setFees(feeData);
      setAnnouncements(annData);
      setExams(exData);
      setLoading(false);
    }
    loadStats();
  }, []);

  const totalRevenue = fees.reduce((acc, f) => acc + (f.paidAmount || 0), 0);
  const pendingRevenue = fees.reduce((acc, f) => acc + (f.amount - (f.paidAmount || 0)), 0);

  // Chart sample data
  const attendanceTrendData = [
    { month: 'Sep', percentage: 94 },
    { month: 'Oct', percentage: 96 },
    { month: 'Nov', percentage: 92 },
    { month: 'Dec', percentage: 95 },
    { month: 'Jan', percentage: 97 },
    { month: 'Feb', percentage: 96.4 },
  ];

  const feeRevenueData = [
    { month: 'Sep', collected: 12000, pending: 2000 },
    { month: 'Oct', collected: 18000, pending: 3500 },
    { month: 'Nov', collected: 15000, pending: 1800 },
    { month: 'Dec', collected: 22000, pending: 4000 },
    { month: 'Jan', collected: 31000, pending: 5000 },
    { month: 'Feb', collected: 28000, pending: 2400 },
  ];

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-28 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      
      {/* WELCOME BANNER */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-900 via-blue-900 to-slate-900 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/30 border border-indigo-400/30 text-indigo-200 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span>{role.toUpperCase()} Academic Dashboard</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Welcome back, {currentUser?.displayName || 'User'}!
            </h2>
            <p className="text-xs sm:text-sm text-indigo-200 leading-relaxed">
              Academic term 2025-2026 is active. You have {announcements.length} unread notices and {exams.length} upcoming scheduled examinations.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigateView('attendance')}
              className="px-4 py-2.5 rounded-xl bg-white text-indigo-900 font-bold text-xs shadow-md hover:bg-indigo-50 transition-colors"
            >
              Attendance Register
            </button>
            <button
              onClick={() => onNavigateView('exams')}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors"
            >
              Exams & Grades
            </button>
          </div>
        </div>
      </div>

      {/* METRIC STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <motion.div
          whileHover={{ y: -3 }}
          onClick={() => onNavigateView('students')}
          className="p-5 rounded-3xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/60 dark:border-slate-800/60 shadow-xs cursor-pointer space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Total Students
            </span>
            <div className="w-10 h-10 rounded-xl bg-blue-50/80 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-200/50 dark:border-blue-800/50">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 dark:text-white">
              {students.length}
            </span>
            <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +12% YoY
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">Across 5 academic departments</p>
        </motion.div>

        <motion.div
          whileHover={{ y: -3 }}
          onClick={() => onNavigateView('teachers')}
          className="p-5 rounded-3xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/60 dark:border-slate-800/60 shadow-xs cursor-pointer space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Active Faculty
            </span>
            <div className="w-10 h-10 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-200/50 dark:border-indigo-800/50">
              <UserCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 dark:text-white">
              {teachers.length}
            </span>
            <span className="text-[11px] font-semibold text-indigo-600">Ph.D & Masters</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">100% active status</p>
        </motion.div>

        <motion.div
          whileHover={{ y: -3 }}
          onClick={() => onNavigateView('fees')}
          className="p-5 rounded-3xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/60 dark:border-slate-800/60 shadow-xs cursor-pointer space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Fee Collections
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-200/50 dark:border-emerald-800/50">
              <CreditCard className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 dark:text-white">
              ${totalRevenue.toLocaleString()}
            </span>
            <span className="text-[11px] font-semibold text-emerald-600">Cleared</span>
          </div>
          <p className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold">
            ${pendingRevenue.toLocaleString()} pending dues
          </p>
        </motion.div>

        <motion.div
          whileHover={{ y: -3 }}
          onClick={() => onNavigateView('attendance')}
          className="p-5 rounded-3xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/60 dark:border-slate-800/60 shadow-xs cursor-pointer space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Average Attendance
            </span>
            <div className="w-10 h-10 rounded-xl bg-cyan-50/80 dark:bg-cyan-950/80 text-cyan-600 dark:text-cyan-400 flex items-center justify-center border border-cyan-200/50 dark:border-cyan-800/50">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 dark:text-white">
              96.4%
            </span>
            <span className="text-[11px] font-semibold text-emerald-600">Excellent</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">+1.2% above benchmark</p>
        </motion.div>

      </div>

      {/* CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Attendance Trend Chart */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Monthly Student Attendance Trend
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Average attendance percentage per month
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
              96.4% Overall
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={attendanceTrendData}>
                <defs>
                  <linearGradient id="attColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis domain={[80, 100]} tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="percentage" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#attColor)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fee Revenue Bar Chart */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Fee Collection & Dues ($)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Collected vs pending tuition revenue
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold">
              Spring 2026
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={feeRevenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="collected" fill="#0284c7" radius={[6, 6, 0, 0]} name="Collected" />
                <Bar dataKey="pending" fill="#f59e0b" radius={[6, 6, 0, 0]} name="Pending" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* LOWER GRID: EXAMS & ANNOUNCEMENTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Upcoming Examinations */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Upcoming Term Examinations
              </h3>
            </div>
            <button
              onClick={() => onNavigateView('exams')}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {exams.map((ex) => (
              <div
                key={ex.id}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    {ex.title}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    {ex.className} • {ex.subjectName}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    {ex.examDate}
                  </div>
                  <div className="text-[10px] text-slate-400">{ex.startTime}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notices Feed */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-rose-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Official Notices Bulletin
              </h3>
            </div>
            <button
              onClick={() => onNavigateView('announcements')}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <span>Bulletin</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {announcements.slice(0, 3).map((ann) => (
              <div
                key={ann.id}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/60 space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase">
                    {ann.category}
                  </span>
                  <span className="text-[10px] text-slate-400">{ann.date}</span>
                </div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">
                  {ann.title}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                  {ann.content}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
