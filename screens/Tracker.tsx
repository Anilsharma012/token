
import React from 'react';

export const Tracker: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const applications = [
    { id: '1', title: 'Senior Sales Executive', company: 'TechNova', status: 'Shortlisted', date: 'Oct 10', color: 'bg-emerald-500' },
    { id: '2', title: 'Account Manager', company: 'Apex FinTech', status: 'Applied', date: 'Oct 12', color: 'bg-blue-500' },
    { id: '3', title: 'Sales Specialist', company: 'Global Log', status: 'Interview', date: 'Oct 08', color: 'bg-orange-500' },
  ];

  return (
    <div className="animate-fade-in bg-background min-h-full pb-32">
      <header className="px-6 py-6 border-b border-gray-100 flex items-center gap-4 sticky top-0 bg-white z-10">
        <button onClick={onBack} className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-accent">
          <span className="material-icons-round">arrow_back</span>
        </button>
        <h2 className="text-xl font-display font-black text-accent">Application Tracker</h2>
      </header>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
           <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm text-center">
              <p className="text-[10px] font-black text-gray-700 uppercase tracking-widest mb-1">Applied</p>
              <h4 className="text-2xl font-display font-black text-accent">12</h4>
           </div>
           <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm text-center">
              <p className="text-[10px] font-black text-gray-700 uppercase tracking-widest mb-1">Interview</p>
              <h4 className="text-2xl font-display font-black text-primary">02</h4>
           </div>
        </div>

        <div className="space-y-4">
           <h3 className="text-sm font-black text-accent uppercase tracking-widest">Active Status</h3>
           {applications.map(app => (
             <div key={app.id} className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-card flex items-center justify-between">
                <div className="flex-1">
                   <h4 className="font-bold text-accent leading-tight">{app.title}</h4>
                   <p className="text-[10px] font-black text-gray-700 uppercase tracking-widest mt-1">{app.company} • {app.date}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                   <span className={`px-4 py-1.5 rounded-full text-[9px] font-black text-white uppercase tracking-widest ${app.color}`}>
                      {app.status}
                   </span>
                   <button className="text-[10px] font-bold text-primary">View Details</button>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};
