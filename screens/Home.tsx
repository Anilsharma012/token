
import React from 'react';
import { MOCK_JOBS, MOCK_CATEGORIES } from '../constants';
import { Job, Category, AppScreen } from '../types';

interface HomeProps {
  onSelectCategory: (cat: Category) => void;
  onSelectJob: (job: Job) => void;
  onSearch: () => void;
  onDownload: () => void;
  onNavigate: (s: AppScreen) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export const Home: React.FC<HomeProps> = ({ 
  onSelectCategory, 
  onSelectJob, 
  onSearch, 
  onDownload, 
  onNavigate,
  favorites,
  onToggleFavorite
}) => {
  const [sortBy, setSortBy] = React.useState<'relevance' | 'date' | 'salary'>('relevance');

  const sortedJobs = React.useMemo(() => {
    const jobs = [...MOCK_JOBS];
    if (sortBy === 'date') {
      // Mock sorting by date (postedAt)
      return jobs.sort((a, b) => a.postedAt.localeCompare(b.postedAt));
    }
    if (sortBy === 'salary') {
      // Mock sorting by salary
      return jobs.sort((a, b) => b.salary.localeCompare(a.salary));
    }
    return jobs;
  }, [sortBy]);

  return (
    <div className="animate-fade-in pb-32">
      {/* Premium Header */}
      <header className="glass px-5 pt-6 pb-4 sticky top-0 z-30 border-b border-gray-100/50">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="material-icons-round text-white text-xl">local_fire_department</span>
            </div>
            <span className="text-xl font-display font-extrabold tracking-tight text-accent">Token</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-accent border border-gray-100 active:scale-90 transition-all">
              <span className="material-icons-round text-xl">search</span>
            </button>
            <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-accent border border-gray-100 active:scale-90 transition-all relative">
              <span className="material-icons-round text-xl">notifications</span>
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full border-2 border-white"></span>
            </button>
          </div>
        </div>
        
        <div className="relative group" onClick={onSearch}>
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="material-icons-round text-primary text-xl">explore</span>
          </div>
          <input 
            readOnly
            type="text" 
            placeholder="Search your dream career..."
            className="w-full h-14 pl-12 pr-4 bg-gray-50 border-gray-200/50 rounded-2xl text-[15px] font-medium placeholder:text-gray-400 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer shadow-inner-soft"
          />
        </div>
      </header>

      {/* Hero / Ad Banner */}
      <div className="px-5 py-6">
         <div className="relative overflow-hidden bg-gradient-to-br from-accent to-gray-800 rounded-[2.5rem] p-8 shadow-premium shadow-accent/20 group">
            <div className="relative z-10">
               <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-[9px] font-black uppercase rounded-lg mb-4 tracking-widest">Featured Boost</span>
               <h3 className="text-white text-2xl font-display font-bold leading-tight">Master Python <br/><span className="text-white/40">In 30 Days</span></h3>
               <p className="text-white/40 text-[11px] font-bold uppercase mt-3 tracking-widest">Sponsored Career Guide</p>
               <button className="mt-6 px-8 py-3 bg-primary text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 active:scale-95 transition-all">View Course</button>
            </div>
            <span className="material-icons-round absolute -right-4 -bottom-4 text-white/5 text-[150px]">auto_stories</span>
         </div>
      </div>

      {/* AI Coach Banner */}
      <div className="px-5 mb-10">
        <div 
          onClick={() => onNavigate(AppScreen.AI_COACH)}
          className="bg-white p-6 rounded-[2.5rem] border border-primary/20 shadow-premium shadow-primary/5 flex items-center gap-6 cursor-pointer active:scale-[0.98] transition-all group"
        >
          <div className="w-16 h-16 bg-primary rounded-3xl flex items-center justify-center shadow-lg shadow-primary/20 shrink-0 group-hover:rotate-12 transition-transform">
            <span className="material-icons-round text-white text-3xl">psychology</span>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-display font-black text-accent leading-tight">AI Career Coach</h3>
            <p className="text-[11px] font-bold text-gray-400 mt-1 uppercase tracking-wide">Get expert advice instantly</p>
            <div className="flex items-center gap-2 mt-3">
              <span className="text-[10px] font-black text-primary uppercase tracking-widest">Try Now</span>
              <span className="material-icons-round text-primary text-sm">arrow_forward</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Categories */}
      <div className="px-5 mt-4 mb-10">
        <h2 className="text-xl font-display font-bold text-accent mb-6">Career Sectors</h2>
        <div className="grid grid-cols-2 gap-4">
          {MOCK_CATEGORIES.map((cat) => (
            <button 
              key={cat.id}
              onClick={() => onSelectCategory(cat)}
              className="flex flex-col items-start gap-4 p-5 bg-white rounded-3xl border border-gray-100/50 shadow-card active:scale-[0.97] transition-all hover:border-primary/20 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary-soft flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="material-icons-round text-primary text-2xl">{cat.icon}</span>
              </div>
              <div className="text-left">
                <span className="text-[15px] font-bold text-accent block leading-tight group-hover:text-primary transition-colors">{cat.name.split(' / ')[0]}</span>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wide mt-1.5 block">{cat.jobsCount} Openings</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <section className="px-5 mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-display font-bold text-accent">For Your Skills</h2>
          <div className="flex gap-2">
            {['relevance', 'date', 'salary'].map((s) => (
              <button
                key={s}
                onClick={() => setSortBy(s as any)}
                className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${
                  sortBy === s ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-white text-gray-400 border-gray-100'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          {sortedJobs.map(job => (
            <div 
              key={job.id}
              className="bg-white p-6 rounded-[2rem] shadow-card border border-gray-100/60 active:scale-[0.99] transition-all hover:shadow-premium group relative"
            >
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(job.id);
                }}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-accent border border-gray-100 z-10 active:scale-90 transition-all"
              >
                <span className={`material-icons-round text-xl ${favorites.includes(job.id) ? 'text-primary' : 'text-gray-300'}`}>
                  {favorites.includes(job.id) ? 'favorite' : 'favorite_border'}
                </span>
              </button>
              <div className="flex items-start gap-4" onClick={() => onSelectJob(job)}>
                <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center border border-gray-100/50 shrink-0 group-hover:bg-primary-soft transition-colors">
                  <span className="material-icons-round text-gray-400 group-hover:text-primary text-3xl transition-colors">corporate_fare</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-accent text-[17px] leading-tight truncate group-hover:text-primary transition-colors">{job.title}</h3>
                  <p className="text-gray-400 text-[11px] font-extrabold mt-1 uppercase tracking-[0.1em]">{job.company}</p>
                  
                  <div className="mt-5 p-4 bg-primary/5 rounded-2xl border border-primary/10 flex items-center gap-3">
                    <span className="material-icons-round text-primary text-xl">payments</span>
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Monthly Package</span>
                      <span className="text-[15px] font-black text-primary">{job.salary}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Career Guidance / Tips Section */}
      <section className="px-5 mb-12">
         <h2 className="text-xl font-display font-bold text-accent mb-6">Career Mastery</h2>
         <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
            {[
              { title: 'Resume Checklist', icon: 'assignment', color: 'bg-orange-500' },
              { title: 'Interview FAQ', icon: 'forum', color: 'bg-blue-500' },
              { title: 'Skill Roadmap', icon: 'map', color: 'bg-emerald-500' }
            ].map((tip, i) => (
              <div key={i} className="min-w-[160px] bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col items-center text-center">
                 <div className={`w-12 h-12 rounded-2xl ${tip.color} text-white flex items-center justify-center mb-4`}>
                    <span className="material-icons-round">{tip.icon}</span>
                 </div>
                 <h4 className="text-xs font-black text-gray-700 leading-tight">{tip.title}</h4>
              </div>
            ))}
         </div>
      </section>
    </div>
  );
};
