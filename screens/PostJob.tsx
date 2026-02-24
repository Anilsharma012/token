
import React from 'react';

export const PostJob: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="animate-fade-in bg-white min-h-full pb-32 flex flex-col">
      <header className="px-6 py-6 border-b border-gray-50 flex items-center justify-between sticky top-0 bg-white z-10">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-accent">
            <span className="material-icons-round">arrow_back</span>
          </button>
          <h2 className="text-xl font-display font-black text-accent">Post Vacancy</h2>
        </div>
        <span className="text-[10px] font-black text-gray-300 uppercase">Step 1 of 2</span>
      </header>

      <div className="p-6 space-y-8 overflow-y-auto no-scrollbar">
         <div className="space-y-6">
            <div className="space-y-2">
               <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Job Title</label>
               <input type="text" placeholder="e.g. Senior Frontend Engineer" className="w-full h-14 px-6 bg-gray-50 border-transparent rounded-2xl focus:ring-primary focus:border-primary font-bold text-sm" />
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Salary Range</label>
                  <input type="text" placeholder="₹12L - 18L" className="w-full h-14 px-6 bg-gray-50 border-transparent rounded-2xl focus:ring-primary focus:border-primary font-bold text-sm" />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Experience</label>
                  <select className="w-full h-14 px-6 bg-gray-50 border-transparent rounded-2xl focus:ring-primary focus:border-primary font-bold text-sm appearance-none">
                     <option>2-5 Years</option>
                     <option>Freshers</option>
                     <option>5-10 Years</option>
                  </select>
               </div>
            </div>

            <div className="space-y-2">
               <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Job Description</label>
               <textarea rows={6} placeholder="Describe the role, responsibilities and ideal candidate..." className="w-full p-6 bg-gray-50 border-transparent rounded-[2rem] focus:ring-primary focus:border-primary font-bold text-sm leading-relaxed" />
            </div>

            <div className="space-y-2">
               <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Skills Required (Comma separated)</label>
               <input type="text" placeholder="React, Node.js, TypeScript" className="w-full h-14 px-6 bg-gray-50 border-transparent rounded-2xl focus:ring-primary focus:border-primary font-bold text-sm" />
            </div>
         </div>

         <div className="bg-primary/5 p-6 rounded-[2rem] border border-primary/10">
            <div className="flex items-center gap-3 mb-4">
               <span className="material-icons-round text-primary">rocket_launch</span>
               <h3 className="text-sm font-black text-primary uppercase">Boost this job?</h3>
            </div>
            <p className="text-[11px] text-gray-500 font-medium mb-6">Reach 10x more candidates by featuring this post at the top of search results for 7 days.</p>
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-gray-100">
               <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase">Premium Boost</p>
                  <p className="text-sm font-bold text-accent">₹1,499 / post</p>
               </div>
               <input type="checkbox" className="w-6 h-6 rounded-lg text-primary border-gray-200 focus:ring-primary" />
            </div>
         </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-100 p-6 flex gap-4 safe-bottom">
         <button className="flex-1 h-16 bg-primary text-white font-display font-black text-lg rounded-2xl shadow-premium shadow-primary/30 active:scale-95 transition-all">
            Post Vacancy
         </button>
      </div>
    </div>
  );
};
