
import React from 'react';
import { Job } from '../types';
import { MOCK_JOBS } from '../constants';

interface FavoritesProps {
  onSelectJob: (job: Job) => void;
  onBack: () => void;
  favorites: string[];
}

export const Favorites: React.FC<FavoritesProps> = ({ onSelectJob, onBack, favorites }) => {
  const favoriteJobs = MOCK_JOBS.filter(job => favorites.includes(job.id));

  return (
    <div className="animate-fade-in pb-32 min-h-screen bg-background">
      <header className="glass px-6 pt-8 pb-5 sticky top-0 z-30 border-b border-gray-100/50">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-display font-black text-accent tracking-tight">Favorites</h1>
            <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mt-1">Your Career Shortlist</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
            <span className="material-icons-round text-primary text-2xl">stars</span>
          </div>
        </div>
      </header>

      {/* Favorites Summary Card - NEW */}
      <div className="px-6 py-8">
         <div className="bg-accent rounded-[3rem] p-8 text-white shadow-premium relative overflow-hidden group">
            <h3 className="text-lg font-display font-bold mb-2">Shortlist Status</h3>
            <p className="text-white/90 text-[11px] font-black uppercase tracking-widest mb-6">Real-time Tracker</p>
            <div className="grid grid-cols-2 gap-4">
               <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <p className="text-white/90 text-[9px] font-black uppercase mb-1">Items</p>
                  <p className="text-2xl font-display font-bold">{favoriteJobs.length}</p>
               </div>
               <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <p className="text-white/90 text-[9px] font-black uppercase mb-1">New Hits</p>
                  <p className="text-2xl font-display font-bold text-emerald-400">03</p>
               </div>
            </div>
            <span className="material-icons-round absolute -right-6 -bottom-6 text-white/5 text-[120px]">insights</span>
         </div>
      </div>

      {/* Main List */}
      <div className="px-6 space-y-6">
        <h2 className="text-lg font-display font-black text-accent mb-2">Saved Listings</h2>
        {favoriteJobs.length > 0 ? (
          favoriteJobs.map((job) => (
            <div key={job.id} onClick={() => onSelectJob(job)} className="bg-white rounded-[2.5rem] border border-gray-100 shadow-card overflow-hidden active:scale-[0.98] transition-all group">
              <div className="p-6 flex items-start gap-5">
                <div className="w-16 h-16 rounded-[1.25rem] bg-primary-soft flex items-center justify-center shrink-0 border border-primary/5 group-hover:scale-105 transition-transform">
                  <span className="material-icons-round text-primary text-4xl">apartment</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <h3 className="font-bold text-accent text-lg leading-tight truncate group-hover:text-primary transition-colors">{job.title}</h3>
                    <span className="material-icons-round text-primary">favorite</span>
                  </div>
                  <p className="text-gray-700 text-[11px] font-extrabold uppercase tracking-widest mt-1">{job.company}</p>
                </div>
              </div>

              <div className="mx-6 p-4 bg-gray-50 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-black text-gray-700 uppercase tracking-widest mb-1">Current Demand</p>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-[11px] font-bold text-accent">High Potential • 12 Applied</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-1">Location</p>
                  <span className="text-[11px] font-bold text-accent">{job.location.split(',')[0]}</span>
                </div>
              </div>

              <div className="p-6 flex gap-3">
                <button className="flex-1 py-4 bg-accent text-white rounded-2xl text-[12px] font-display font-bold uppercase tracking-[0.1em] shadow-lg active:bg-primary transition-all">
                  Instant Apply
                </button>
                <button className="px-5 py-4 bg-gray-50 text-gray-700 rounded-2xl active:bg-primary-soft active:text-primary transition-all">
                  <span className="material-icons-round">share</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[3rem] border border-dashed border-gray-200">
            <span className="material-icons-round text-8xl text-gray-100 mb-6">bookmark_outline</span>
            <p className="text-gray-700 font-bold uppercase text-xs tracking-widest">No saved jobs yet.</p>
          </div>
        )}
      </div>

      {/* Market Insights for Favorites - NEW */}
      <div className="px-6 py-10 mt-6 bg-white rounded-t-[4rem] shadow-premium">
         <h2 className="text-xl font-display font-black text-accent mb-6">Market Insights</h2>
         <div className="space-y-6">
            <div className="p-6 bg-emerald-50 rounded-[2rem] border border-emerald-100 flex items-center gap-5">
               <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm">
                  <span className="material-icons-round">trending_up</span>
               </div>
               <div>
                  <h4 className="text-sm font-bold text-emerald-900">High Salary Potential</h4>
                  <p className="text-[11px] text-emerald-600 font-medium">Roles in your shortlist have seen a 12% salary jump this month.</p>
               </div>
            </div>

            <div className="p-6 bg-blue-50 rounded-[2rem] border border-blue-100 flex items-center gap-5">
               <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm">
                  <span className="material-icons-round">bolt</span>
               </div>
               <div>
                  <h4 className="text-sm font-bold text-blue-900">Rapid Hiring Cycle</h4>
                  <p className="text-[11px] text-blue-600 font-medium">Recruiters for these roles respond within 24 hours on average.</p>
               </div>
            </div>
         </div>
      </div>

      {/* People also liked - NEW */}
      <div className="px-6 py-10">
         <h2 className="text-lg font-display font-black text-accent mb-6">You Might Also Like</h2>
         <div className="space-y-4">
            {MOCK_JOBS.slice(2, 4).map(job => (
               <div key={job.id} onClick={() => onSelectJob(job)} className="p-4 bg-white rounded-3xl border border-gray-100 flex items-center gap-4 group cursor-pointer active:scale-95 transition-all">
                  <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-primary-soft">
                     <span className="material-icons-round text-gray-700 group-hover:text-primary">business</span>
                  </div>
                  <div className="flex-1 min-w-0">
                     <h4 className="text-sm font-bold text-gray-900 truncate group-hover:text-primary transition-colors">{job.title}</h4>
                     <p className="text-[10px] text-gray-700 font-black uppercase tracking-wider">{job.company}</p>
                  </div>
                  <span className="material-icons-round text-gray-200">chevron_right</span>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
};
