
import React, { useState } from 'react';
import { AppScreen } from '../types';

interface RecruiterDashboardProps {
  onBack: () => void;
  onPostJob: () => void;
  onNavigate: (s: AppScreen) => void;
}

export const RecruiterDashboard: React.FC<RecruiterDashboardProps> = ({ onBack, onPostJob, onNavigate }) => {
  const [candidates, setCandidates] = useState([
    { id: '1', name: 'Rahul Varma', role: 'Full Stack Developer', status: 'Applied', score: 94 },
    { id: '2', name: 'Simran Kaur', role: 'UI Designer', status: 'Shortlisted', score: 88 },
    { id: '3', name: 'Amit Jha', role: 'Marketing Lead', status: 'Technical', score: 91 },
  ]);

  const updateStatus = (id: string, newStatus: string) => {
    setCandidates(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
  };

  const statusOptions = ['Applied', 'Shortlisted', 'Interview', 'Offered', 'Rejected'];

  return (
    <div className="animate-fade-in bg-background min-h-full pb-32">
      <header className="bg-white px-6 py-6 border-b border-gray-100 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-accent">
            <span className="material-icons-round">arrow_back</span>
          </button>
          <div>
            <h2 className="text-xl font-display font-black text-accent leading-tight">Recruiter Hub</h2>
            <p className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">ATS Lite v2.0</p>
          </div>
        </div>
        <button 
          onClick={() => onNavigate(AppScreen.COMPANY_PROFILE)}
          className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center active:scale-90 transition-all"
        >
          <span className="material-icons-round">business</span>
        </button>
      </header>

      <div className="p-6 space-y-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           <div className="bg-accent p-8 rounded-[2.5rem] text-white shadow-premium relative overflow-hidden group">
              <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Active Jobs</p>
              <h4 className="text-3xl font-display font-black">08</h4>
              <span className="material-icons-round absolute -right-4 -bottom-4 text-white/5 text-[100px]">work</span>
           </div>
           <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">New Applicants</p>
              <div className="flex items-center gap-3">
                 <h4 className="text-3xl font-display font-black text-accent">45</h4>
                 <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-black rounded-lg">+12 Today</span>
              </div>
           </div>
        </div>

        {/* Action Button */}
        <button 
          onClick={onPostJob}
          className="w-full py-6 bg-primary text-white rounded-[2rem] font-display font-black text-lg shadow-premium shadow-primary/30 flex items-center justify-center gap-4 active:scale-[0.98] transition-all"
        >
          <span className="material-icons-round">add_circle</span>
          Post New Vacancy
        </button>

        {/* Candidate Pipeline */}
        <div className="space-y-4">
           <div className="flex justify-between items-center">
              <h3 className="text-sm font-black text-accent uppercase tracking-widest">Candidate Pipeline</h3>
              <button className="text-[10px] font-black text-primary uppercase">View All</button>
           </div>
           {candidates.map((c) => (
             <div key={c.id} className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-card flex flex-col gap-4 group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                     <span className="material-icons-round text-gray-400">person</span>
                  </div>
                  <div className="flex-1 min-w-0">
                     <h4 className="font-bold text-accent truncate">{c.name}</h4>
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{c.role}</p>
                  </div>
                  <div className="text-right">
                     <span className="text-[11px] font-black text-primary block mb-1">{c.score}% Match</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                  {statusOptions.map(status => (
                    <button 
                      key={status}
                      onClick={() => updateStatus(c.id, status)}
                      className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all shrink-0 ${
                        c.status === status ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-gray-50 text-gray-400 border border-gray-100'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
             </div>
           ))}
        </div>

        {/* Subscription / Boost Credits */}
        <div className="bg-gradient-to-br from-indigo-600 to-indigo-900 rounded-[3rem] p-10 text-white shadow-xl relative overflow-hidden">
           <div className="relative z-10">
              <h3 className="text-2xl font-display font-black mb-2">Recruiter Pro</h3>
              <p className="text-white/60 text-[11px] font-bold uppercase tracking-widest mb-8">Unlock Premium Talent</p>
              <div className="flex items-center justify-between mb-8">
                 <div>
                    <p className="text-white/40 text-[9px] font-black uppercase mb-1">Post Credits</p>
                    <p className="text-2xl font-display font-bold">12 Left</p>
                 </div>
                 <div>
                    <p className="text-white/40 text-[9px] font-black uppercase mb-1">Resume Access</p>
                    <p className="text-2xl font-display font-bold text-emerald-400">450</p>
                 </div>
              </div>
              <button className="w-full py-4 bg-white text-indigo-900 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl">Upgrade Plan</button>
           </div>
           <span className="material-icons-round absolute -right-6 -bottom-6 text-white/5 text-[150px]">workspace_premium</span>
        </div>
      </div>
    </div>
  );
};
