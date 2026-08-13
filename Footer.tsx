import React, { useState } from 'react';
import { GraduationCap, Mail, Phone, MapPin, Send, Heart, ArrowUp } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export function Footer() {
  const [email, setEmail] = useState('');
  const { showToast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    showToast('Subscribed to EduFlow Academic Newsletter!', 'success');
    setEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & Description */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                EduFlow <span className="text-indigo-400">SIS</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed pr-4">
              Next-generation cloud Student Information System designed for modern schools, colleges, and university systems. Unified management for attendance, grading, examinations, timetables, and parents.
            </p>

            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>100 University Heights, CA 94107</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Platform Modules
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#features" className="hover:text-indigo-400 transition-colors">Student Management</a></li>
              <li><a href="#features" className="hover:text-indigo-400 transition-colors">Attendance Register</a></li>
              <li><a href="#features" className="hover:text-indigo-400 transition-colors">Examination & GPA</a></li>
              <li><a href="#features" className="hover:text-indigo-400 transition-colors">Fee & Invoicing</a></li>
              <li><a href="#features" className="hover:text-indigo-400 transition-colors">Timetable Generator</a></li>
              <li><a href="#features" className="hover:text-indigo-400 transition-colors">Parent & Teacher Portal</a></li>
            </ul>
          </div>

          {/* Institution Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Institution
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#about" className="hover:text-indigo-400 transition-colors">About Mission</a></li>
              <li><a href="#courses" className="hover:text-indigo-400 transition-colors">Academic Programs</a></li>
              <li><a href="#faculty" className="hover:text-indigo-400 transition-colors">Faculty Directory</a></li>
              <li><a href="#announcements" className="hover:text-indigo-400 transition-colors">Official Bulletins</a></li>
              <li><a href="#contact" className="hover:text-indigo-400 transition-colors">Campus Inquiries</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Stay Connected
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Subscribe to official academic announcements and monthly newsletter.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter institutional email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 text-xs text-white border border-slate-700 focus:outline-none focus:border-indigo-500 pr-10"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 p-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
            <div className="flex items-center gap-3 pt-2 text-xs text-slate-400">
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>+1 (800) 555-EDUSIS</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright & scroll top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} EduFlow SIS. Built for Higher Education & K-12 Institutions.</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Terms of Service</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white transition-all shadow-md"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
