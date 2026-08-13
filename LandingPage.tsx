import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Users,
  Calendar,
  Award,
  CreditCard,
  Clock,
  UserCheck,
  ShieldCheck,
  Bell,
  BarChart3,
  BookOpen,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Building,
  HelpCircle,
  Mail,
  Phone,
  Send,
  Star,
  ChevronDown,
  Cpu,
  Layers,
  Globe
} from 'lucide-react';
import { SAMPLE_COURSES, SAMPLE_TEACHERS, SAMPLE_TESTIMONIALS, SAMPLE_ANNOUNCEMENTS } from '../../lib/mockData';
import { useToast } from '../../context/ToastContext';

interface LandingPageProps {
  onOpenLogin: () => void;
  onNavigateToDashboard: () => void;
  onQuickDemo: (role: 'admin' | 'teacher' | 'student' | 'parent') => void;
}

export function LandingPage({ onOpenLogin, onNavigateToDashboard, onQuickDemo }: LandingPageProps) {
  const { showToast } = useToast();
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactRole, setContactRole] = useState('Administrator');
  const [contactMsg, setContactMsg] = useState('');

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMsg) return;
    showToast('Inquiry submitted! Our admissions counselor will respond shortly.', 'success');
    setContactName('');
    setContactEmail('');
    setContactMsg('');
  };

  const featuresList = [
    {
      icon: Users,
      color: 'from-blue-500 to-indigo-600',
      title: 'Student Information Management',
      desc: 'Centralized 360° student records, roll numbers, guardian profiles, document archives, and academic history.',
    },
    {
      icon: Calendar,
      color: 'from-emerald-500 to-teal-600',
      title: 'Real-Time Attendance Register',
      desc: 'One-click bulk attendance marking, automated SMS/Email absence alerts, and monthly attendance percentage tracking.',
    },
    {
      icon: Award,
      color: 'from-purple-500 to-indigo-600',
      title: 'Examinations & Auto GPA',
      desc: 'Term exam creation, automated mark entry calculation, grade boundaries, and printable official report cards.',
    },
    {
      icon: CreditCard,
      color: 'from-amber-500 to-orange-600',
      title: 'Fees & Invoicing Portal',
      desc: 'Automated fee breakdown, payment gateway tracking, fee receipt PDF generation, and pending dues analytics.',
    },
    {
      icon: Clock,
      color: 'from-cyan-500 to-blue-600',
      title: 'Dynamic Timetable Generator',
      desc: 'Conflict-free weekly matrix schedule for classes, room assignments, teacher workloads, and period timings.',
    },
    {
      icon: UserCheck,
      color: 'from-pink-500 to-rose-600',
      title: 'Faculty Workload Management',
      desc: 'Teacher subject mapping, department heads, workload distribution hours, and performance evaluation.',
    },
    {
      icon: ShieldCheck,
      color: 'from-indigo-500 to-violet-600',
      title: 'Parent Portal & Notifications',
      desc: 'Direct parent portal with real-time child grade sheets, attendance warnings, and teacher messaging.',
    },
    {
      icon: Bell,
      color: 'from-red-500 to-orange-600',
      title: 'Announcements & Noticeboard',
      desc: 'Targeted broadcast notices with audience filtering (All, Teachers, Students, Parents) and priority tags.',
    },
    {
      icon: BarChart3,
      color: 'from-violet-500 to-fuchsia-600',
      title: 'Executive Reports & Analytics',
      desc: 'Visual chart analytics for revenue trends, pass/fail ratios, department stats, and exportable PDF/Excel logs.',
    },
  ];

  const faqs = [
    {
      q: 'How does EduFlow handle multi-role permissions for Admin, Teacher, Student, and Parent?',
      a: 'EduFlow incorporates role-based access control (RBAC) backed by Firebase Auth & Firestore. Admins possess full system governance, Teachers can record attendance & grades, Students view their personal timetables & results, while Parents monitor child progress.',
    },
    {
      q: 'Can EduFlow SIS scale for both K-12 schools and multi-department universities?',
      a: 'Yes! EduFlow is built with a flexible schema supporting custom grade levels, semester credits, departmental courses, and multi-section classes tailored for high schools, colleges, and university systems.',
    },
    {
      q: 'Are reports and fee receipts printable directly from the web dashboard?',
      a: 'Absolutely. Every module includes formatted print-optimized modal layouts with institutional headers, stamp seals, and clean PDF print styling.',
    },
    {
      q: 'Can parents receive alerts regarding student absence or fee due dates?',
      a: 'Yes, the parent portal instantly highlights attendance warnings under 85% and provides direct visibility into itemized fee invoices.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      
      {/* HERO SECTION */}
      <section id="hero" className="relative pt-12 pb-24 lg:pt-20 lg:pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none">
          <div className="absolute top-10 left-10 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl" />
          <div className="absolute top-20 right-10 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl" />
          <div className="absolute top-40 left-1/3 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Hero Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100/80 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold tracking-wide">
                <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Next-Gen Institutional Software 2.0</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-slate-900 dark:text-white">
                Intelligent Student <br />
                <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Information System
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Unify academic governance, student enrollment, real-time attendance, auto-GPA grading, fee invoicing, and parent communication in one modern, cloud-native SaaS platform.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={onNavigateToDashboard}
                  className="flex items-center gap-3 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white font-bold text-sm shadow-xl shadow-indigo-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Explore Live Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onOpenLogin}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-sm border border-slate-200 dark:border-slate-800 shadow-sm transition-all"
                >
                  <span>Sign In / Demo</span>
                </button>
              </div>

              {/* Persona Quick Chips */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs">
                <span className="text-slate-400 font-medium">Quick Persona Switch:</span>
                <button
                  onClick={() => onQuickDemo('admin')}
                  className="px-3 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-semibold hover:bg-indigo-100 transition-colors"
                >
                  Admin
                </button>
                <button
                  onClick={() => onQuickDemo('teacher')}
                  className="px-3 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold hover:bg-blue-100 transition-colors"
                >
                  Teacher
                </button>
                <button
                  onClick={() => onQuickDemo('student')}
                  className="px-3 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-semibold hover:bg-emerald-100 transition-colors"
                >
                  Student
                </button>
                <button
                  onClick={() => onQuickDemo('parent')}
                  className="px-3 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 font-semibold hover:bg-amber-100 transition-colors"
                >
                  Parent
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-200 dark:border-slate-800">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">99.4%</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Academic Pass Rate</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400">5,200+</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Active Students</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-cyan-600 dark:text-cyan-400">100%</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Cloud Real-Time Sync</div>
                </div>
              </div>
            </motion.div>

            {/* Hero Right Visual Mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-3xl p-3 bg-gradient-to-tr from-slate-200 via-indigo-200 to-cyan-200 dark:from-slate-800 dark:via-indigo-900/50 dark:to-cyan-900/50 shadow-2xl">
                <div className="rounded-2xl overflow-hidden bg-slate-900 text-white p-5 space-y-4 shadow-inner">
                  
                  {/* Top Bar Mockup */}
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500" />
                      <div className="w-3 h-3 rounded-full bg-amber-500" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">eduflow.edu/sis-portal</span>
                  </div>

                  {/* Dashboard Hero Mini Preview */}
                  <div className="bg-slate-800/80 rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-sm">
                          AW
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">Alexander Wright</div>
                          <div className="text-[10px] text-indigo-300">B.Tech CS - Year 2 • Roll #001</div>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-400 text-[10px] font-bold border border-emerald-800">
                        GPA: 3.88
                      </span>
                    </div>

                    {/* Progress Rings */}
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-700/50">
                        <div className="text-[10px] text-slate-400 font-semibold">Attendance Record</div>
                        <div className="text-lg font-black text-emerald-400 mt-1">96.4%</div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full mt-1 overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: '96%' }} />
                        </div>
                      </div>

                      <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-700/50">
                        <div className="text-[10px] text-slate-400 font-semibold">Tuition Status</div>
                        <div className="text-lg font-black text-indigo-400 mt-1">Cleared</div>
                        <div className="text-[9px] text-slate-400">Spring 2026 Invoice</div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Badges */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="bg-indigo-950/80 border border-indigo-700/50 rounded-xl p-3 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shrink-0">
                        <Award className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-indigo-200">Exam Results</div>
                        <div className="text-[10px] text-slate-400">Auto GPA calculation</div>
                      </div>
                    </div>

                    <div className="bg-cyan-950/80 border border-cyan-700/50 rounded-xl p-3 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-cyan-600 flex items-center justify-center text-white shrink-0">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-cyan-200">Timetable</div>
                        <div className="text-[10px] text-slate-400">Class & room slots</div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              Institutional Capabilities
            </h2>
            <p className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              All-In-One Institutional Operating System
            </p>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Designed from the ground up to replace fragmented legacy tools with a unified, role-based cloud platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuresList.map((feat, idx) => {
              const IconComp = feat.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4 }}
                  className="p-6 rounded-3xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/60 dark:border-slate-800/60 shadow-xs hover:shadow-xl transition-all space-y-4 group"
                >
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${feat.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {feat.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ABOUT INSTITUTION SECTION */}
      <section id="about" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              About EduFlow Academy
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              Pioneering Academic Excellence & Technology
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              EduFlow Academy is an accredited premier institution serving over 5,000 scholars across STEM, Business, and Humanities faculties. Our mission is to foster academic mastery through rigorous curriculum standards and real-time digital transparency.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Accredited Excellence</div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Recognized globally by Higher Education Boards & ISO 9001 Standards.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Full Parent & Teacher Transparency</div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Instant notification logs for attendance, term grades, and fee receipts.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
            <img
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80"
              alt="University Campus"
              className="w-full h-80 sm:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent p-6 flex flex-col justify-end text-white">
              <div className="text-xl font-bold">State-of-the-Art Campus Infrastructure</div>
              <p className="text-xs text-slate-300">Tech Annex • Innovation Labs • Digital Learning Center</p>
            </div>
          </div>

        </div>
      </section>

      {/* ACADEMIC PROGRAMS & COURSES */}
      <section id="courses" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              Degree & Certification Tracks
            </h2>
            <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Featured Academic Programs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SAMPLE_COURSES.map((crs) => (
              <div
                key={crs.id}
                className="p-6 rounded-3xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/60 dark:border-slate-800/60 shadow-xs hover:shadow-md transition-shadow space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full bg-indigo-50/80 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold border border-indigo-200/50 dark:border-indigo-800/50">
                      {crs.code}
                    </span>
                    <span className="text-[10px] font-medium text-slate-400">
                      {crs.duration}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                    {crs.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {crs.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-semibold">
                  <span>Enrolled: {crs.totalStudents}</span>
                  <span className="text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer">Syllabus →</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FACULTY SPOTLIGHT */}
      <section id="faculty" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            Distinguished Mentors
          </h2>
          <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Faculty Directory & Leadership
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SAMPLE_TEACHERS.map((tch) => (
            <div
              key={tch.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center space-y-3 shadow-xs hover:shadow-md transition-shadow"
            >
              <img
                src={tch.avatarUrl}
                alt={`${tch.firstName} ${tch.lastName}`}
                className="w-20 h-20 rounded-2xl mx-auto object-cover border-2 border-indigo-500/20 shadow-md"
              />
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {tch.firstName} {tch.lastName}
                </h3>
                <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold mt-0.5">
                  {tch.department}
                </p>
              </div>

              <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                {tch.qualification}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* NOTICES BULLETIN PREVIEW */}
      <section id="announcements" className="py-16 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                Institutional Bulletins
              </h2>
              <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Latest Announcements
              </p>
            </div>
            <button
              onClick={onNavigateToDashboard}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <span>View All Portal Notices</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SAMPLE_ANNOUNCEMENTS.map((ann) => (
              <div
                key={ann.id}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    ann.priority === 'High' ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300' : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                  }`}>
                    {ann.category} • {ann.priority} Priority
                  </span>
                  <span className="text-[10px] text-slate-400">{ann.date}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {ann.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {ann.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            Community Feedback
          </h2>
          <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Trusted by Educators & Parents
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SAMPLE_TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover shrink-0"
                />
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">{t.name}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 bg-slate-100/70 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              Frequently Asked Questions
            </h2>
            <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Got Questions? We Have Answers.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left font-bold text-sm text-slate-900 dark:text-white"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {activeFaq === idx && (
                  <div className="px-6 pb-5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-700/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              Campus Inquiries
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Get in Touch with Admissions & IT Support
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Have questions regarding student admissions, platform deployment, or parent account access? Send a message to our support desk.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Email Us</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">admissions@eduflow.edu</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Call Hotline</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">+1 (800) 555-EDUSIS</div>
                </div>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleContactSubmit}
            className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl space-y-4"
          >
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Institutional Inquiry Form
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 text-xs border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="jdoe@school.edu"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 text-xs border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Inquirer Persona</label>
              <select
                value={contactRole}
                onChange={(e) => setContactRole(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 text-xs border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-indigo-500"
              >
                <option value="Administrator">School/College Administrator</option>
                <option value="Teacher">Faculty / Teacher</option>
                <option value="Student">Prospective Student</option>
                <option value="Parent">Parent / Guardian</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Message</label>
              <textarea
                rows={4}
                required
                placeholder="How can our admissions or IT team assist you?"
                value={contactMsg}
                onChange={(e) => setContactMsg(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 text-xs border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit Inquiry</span>
            </button>
          </form>

        </div>
      </section>

    </div>
  );
}
