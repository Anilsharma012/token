
import React from 'react';
import { AppScreen } from '../types';

interface ProfileProps {
  onBack: () => void;
  onNavigate: (s: AppScreen) => void;
}

export const Profile: React.FC<ProfileProps> = ({ onBack, onNavigate }) => {
  const completion = 75;
  const pending = ['Upload Resume (PDF)', 'Add Experience Details', 'Verify Email'];

  return (
    <div className="animate-fade-in bg-white min-h-full pb-32">
      <header className="px-6 py-6 flex items-center justify-between border-b border-gray-50 sticky top-0 bg-white z-10">
        <button onClick={onBack} className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-accent">
          <span className="material-icons-round">arrow_back</span>
        </button>
        <h2 className="text-xl font-display font-black text-accent">My Profile</h2>
        <button className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-primary">
          <span className="material-icons-round">edit</span>
        </button>
      </header>

      <div className="p-6">
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
             <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200" className="w-32 h-32 rounded-[2.5rem] object-cover border-4 border-white shadow-xl" alt="Profile" />
             <div className="absolute -bottom-2 -right-2 bg-primary w-10 h-10 rounded-2xl border-4 border-white flex items-center justify-center text-white shadow-lg">
                <span className="material-icons-round text-xl">camera_alt</span>
             </div>
          </div>
          <h3 className="text-2xl font-display font-black text-accent">Rahul Sharma</h3>
          <p className="text-primary font-bold">Senior Sales Executive</p>
        </div>

        {/* Completion Meter */}
        <div className="bg-gray-50 rounded-[2.5rem] p-8 mb-8 border border-gray-100/50">
           <div className="flex justify-between items-end mb-6">
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Profile Strength</p>
                <h4 className="text-2xl font-display font-black text-accent">{completion}% Complete</h4>
              </div>
              <span className="material-icons-round text-emerald-500 text-4xl">verified_user</span>
           </div>
           <div className="h-3 bg-white rounded-full overflow-hidden border border-gray-100 mb-6">
              <div className="h-full bg-primary" style={{ width: `${completion}%` }}></div>
           </div>
           <div className="space-y-3">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Pending Steps:</p>
              {pending.map((step, i) => (
                <div key={i} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-100">
                   <span className="material-icons-round text-primary text-sm">add_circle_outline</span>
                   <span className="text-xs font-bold text-gray-600">{step}</span>
                </div>
              ))}
           </div>
        </div>

        <div className="space-y-4">
           {[
             { label: 'My Applications', icon: 'assignment', screen: AppScreen.TRACKER },
             { label: 'Resume Builder', icon: 'description', screen: AppScreen.PROFILE },
             { label: 'Job Alerts', icon: 'notifications_active', screen: AppScreen.PROFILE },
             { label: 'Wallet & Tokens', icon: 'payments', screen: AppScreen.MENU },
             { label: 'Admin Login', icon: 'admin_panel_settings', screen: AppScreen.ADMIN_LOGIN },
           ].map((item, i) => (
             <button 
               key={i} 
               onClick={() => onNavigate(item.screen)}
               className="w-full flex items-center justify-between p-5 bg-white rounded-2xl border border-gray-100 hover:bg-gray-50 transition-all group"
             >
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-xl bg-primary-soft flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <span className="material-icons-round text-xl">{item.icon}</span>
                   </div>
                   <span className="text-sm font-bold text-gray-700">{item.label}</span>
                </div>
                <span className="material-icons-round text-gray-300">chevron_right</span>
             </button>
           ))}
        </div>
      </div>
    </div>
  );
};
