
import React, { useState, useEffect } from 'react';
import { Job } from '../types';
import { ApplyForm } from '../components/ApplyForm';
import { analyzeJobMatch } from '../services/geminiService';
import { MOCK_TALENTS } from '../constants';

interface JobDetailsProps {
  job: Job;
  onBack: () => void;
}

export const JobDetails: React.FC<JobDetailsProps> = ({ job, onBack }) => {
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [matchData, setMatchData] = useState<{ score: number; reasoning: string; strengths: string[]; gaps: string[] } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    const getMatch = async () => {
      setIsAnalyzing(true);
      try {
        const data = await analyzeJobMatch(job, MOCK_TALENTS[0]);
        setMatchData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsAnalyzing(false);
      }
    };
    getMatch();
  }, [job]);

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col animate-slide-in overflow-hidden">
      {/* Dynamic Header */}
      <header className="px-5 py-4 flex items-center justify-between bg-white/80 backdrop-blur-lg sticky top-0 z-20 border-b border-gray-100">
        <button onClick={onBack} className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-accent active:scale-90 transition-all">
          <span className="material-icons-round">arrow_back</span>
        </button>
        <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Listing Details</span>
        <button className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-accent active:scale-90 transition-all">
          <span className="material-icons-round">share</span>
        </button>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar pb-40">
        {/* Profile Card */}
        <div className="px-6 pt-10 pb-8 flex flex-col items-center text-center">
          <div className="w-24 h-24 bg-gray-50 rounded-[2rem] flex items-center justify-center border border-gray-100 shadow-card mb-6 animate-float">
            <span className="material-icons-round text-primary text-5xl">apartment</span>
          </div>
          <h2 className="text-3xl font-display font-extrabold text-accent leading-tight mb-2">
            {job.title}
          </h2>
          <p className="text-primary font-bold text-lg uppercase tracking-wide">{job.company}</p>
        </div>

        {/* Highlighted Package Module */}
        <div className="px-6 mb-10">
          <div className="p-8 bg-primary rounded-[2.5rem] shadow-premium shadow-primary/20 flex flex-col items-center text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
               <span className="material-icons-round text-6xl">payments</span>
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mb-2">Offered Salary Package</span>
            <span className="text-3xl font-display font-black">{job.salary}</span>
            <span className="text-[10px] font-bold opacity-40 mt-1">Per Month + Performance Bonus</span>
          </div>
        </div>

        {/* Info Grid */}
        <div className="px-6 grid grid-cols-2 gap-4 mb-10">
          <div className="p-5 bg-gray-50/50 rounded-3xl border border-gray-100">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Work Location</span>
            <div className="flex items-center gap-2">
              <span className="material-icons-round text-primary">location_on</span>
              <span className="text-sm font-extrabold text-accent truncate">{job.location.split(',')[0]}</span>
            </div>
          </div>
          <div className="p-5 bg-gray-50/50 rounded-3xl border border-gray-100">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Job Type</span>
            <div className="flex items-center gap-2">
              <span className="material-icons-round text-primary">schedule</span>
              <span className="text-sm font-extrabold text-accent">{job.type}</span>
            </div>
          </div>
        </div>

        {/* AI Match Score Module */}
        <div className="px-6 mb-10">
          <div className="bg-white p-8 rounded-[2.5rem] border border-primary/20 shadow-premium shadow-primary/5 relative overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-display font-black text-accent">AI Match Score</h3>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Powered by TokenAI</p>
              </div>
              <div className="w-16 h-16 bg-primary-soft rounded-2xl flex items-center justify-center relative">
                {isAnalyzing ? (
                  <span className="material-icons-round text-primary text-3xl animate-spin">refresh</span>
                ) : (
                  <span className="text-2xl font-display font-black text-primary">{matchData?.score || '--'}%</span>
                )}
              </div>
            </div>

            {isAnalyzing ? (
              <div className="space-y-3">
                <div className="h-4 bg-gray-100 rounded-full animate-pulse w-full"></div>
                <div className="h-4 bg-gray-100 rounded-full animate-pulse w-3/4"></div>
              </div>
            ) : matchData ? (
              <div className="space-y-6">
                <p className="text-sm text-gray-600 font-medium leading-relaxed">
                  {matchData.reasoning}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Strengths</p>
                    {matchData.strengths.slice(0, 2).map((s, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="material-icons-round text-emerald-500 text-xs">check_circle</span>
                        <span className="text-[11px] font-bold text-gray-700 truncate">{s}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <p className="text-[9px] font-black text-orange-600 uppercase tracking-widest">Growth Gaps</p>
                    {matchData.gaps.slice(0, 2).map((g, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="material-icons-round text-orange-500 text-xs">info</span>
                        <span className="text-[11px] font-bold text-gray-700 truncate">{g}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-400 italic">Unable to analyze match at this time.</p>
            )}
            
            <div className="absolute -right-4 -bottom-4 opacity-5">
              <span className="material-icons-round text-[100px]">psychology</span>
            </div>
          </div>
        </div>

        {/* Job Content */}
        <div className="px-6 space-y-10">
          <section>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-6 bg-primary rounded-full"></div>
              <h3 className="text-xl font-display font-bold text-accent">Description</h3>
            </div>
            <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-card">
              <p className="text-gray-600 leading-relaxed text-[15px] font-medium">
                {job.description}
              </p>
            </div>
          </section>

          <section className="pb-10">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-6 bg-primary rounded-full"></div>
              <h3 className="text-xl font-display font-bold text-accent">Expertise Needed</h3>
            </div>
            <div className="bg-accent p-6 rounded-[2rem] shadow-premium shadow-accent/20">
              <div className="space-y-4">
                {job.requirements.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                      <span className="material-icons-round text-primary text-[14px]">done_all</span>
                    </div>
                    <span className="text-[14px] text-white/90 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Action Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-100 px-6 py-6 safe-bottom z-30 flex items-center gap-4">
        <button 
          onClick={() => setShowApplyForm(true)}
          className="flex-1 bg-primary text-white font-display font-bold h-16 rounded-[1.5rem] text-lg shadow-premium shadow-primary/30 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
        >
          Apply Now
          <span className="material-icons-round">bolt</span>
        </button>
      </div>

      {showApplyForm && (
        <ApplyForm 
          job={job} 
          onClose={() => setShowApplyForm(false)} 
          onSubmit={() => {
            setShowApplyForm(false);
            alert('Your application has been fast-tracked!');
          }} 
        />
      )}
    </div>
  );
};
