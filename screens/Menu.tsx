
import React, { useState } from 'react';
import { AppScreen } from '../types';

interface MenuProps {
  onBack: () => void;
  onDownload: () => void;
  onNavigate: (screen: AppScreen) => void;
}

export const Menu: React.FC<MenuProps> = ({ onBack, onDownload, onNavigate }) => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  
  const modules = [
    { title: 'AI Career Coach', desc: 'Get expert advice from TokenAI', icon: 'psychology', color: 'bg-primary-soft text-primary', shadow: 'shadow-primary/5', screen: AppScreen.AI_COACH },
    { title: 'Post Visibility Boost', desc: 'Reach 10x more recruiters instantly', icon: 'rocket_launch', color: 'bg-indigo-50 text-indigo-600', shadow: 'shadow-indigo-100' },
    { title: 'Gold Verification', desc: 'Build instant authority & trust', icon: 'verified', color: 'bg-green-50 text-green-600', shadow: 'shadow-green-100' },
    { title: 'Top-of-Search Ad', desc: 'Stay at the absolute peak for 7 days', icon: 'visibility', color: 'bg-orange-50 text-orange-600', shadow: 'shadow-orange-100' },
  ];

  return (
    <div className="animate-fade-in pb-32 min-h-full bg-[#F8FAFC]">
      <header className="bg-white/80 backdrop-blur-lg px-6 py-5 sticky top-0 z-30 flex items-center gap-5 border-b border-gray-100/50">
        <button onClick={onBack} className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-accent active:scale-90 transition-all">
          <span className="material-icons-round">arrow_back</span>
        </button>
        <div className="text-xl font-display font-extrabold text-accent">Wallet & Tokens</div>
      </header>

      <div className="p-6">
        {/* Modern Wallet Card */}
        <div className="relative bg-gradient-to-tr from-accent to-gray-800 p-8 rounded-[3rem] shadow-premium shadow-accent/40 flex flex-col items-center overflow-hidden mb-10 group">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl opacity-50"></div>
          
          <div className="w-20 h-20 bg-white/5 backdrop-blur-xl rounded-3xl flex items-center justify-center mb-6 border border-white/10 group-hover:rotate-6 transition-transform">
            <span className="material-icons-round text-primary text-5xl">auto_fix_high</span>
          </div>
          
          <h2 className="text-white/60 text-[10px] font-extrabold uppercase tracking-[0.3em] mb-3">Your Digital Balance</h2>
          <div className="flex items-baseline gap-2">
            <span className="text-white text-6xl font-display font-bold">2,450</span>
            <span className="text-primary font-black text-xl">PTS</span>
          </div>
          
          <button className="mt-10 bg-primary text-white w-full py-5 rounded-[2rem] font-display font-bold shadow-xl shadow-primary/20 active:scale-[0.97] transition-all flex items-center justify-center gap-3">
            Top Up Balance
            <span className="material-icons-round">add_circle</span>
          </button>
        </div>

        {/* Admin Dashboard Quick Access */}
        <div className="mb-6">
          <button 
            onClick={() => onNavigate(AppScreen.ADMIN_LOGIN)}
            className="w-full bg-accent p-6 rounded-[2.5rem] border border-white/10 shadow-premium shadow-accent/10 flex items-center justify-between group active:scale-[0.98] transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="material-icons-round text-white">admin_panel_settings</span>
              </div>
              <div className="text-left">
                <h3 className="text-white font-bold text-sm">Secure Admin Panel</h3>
                <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mt-0.5">Authentication Required</p>
              </div>
            </div>
            <span className="material-icons-round text-white/20 group-hover:text-primary transition-colors">lock_outline</span>
          </button>
        </div>

        <div className="space-y-4">
          {modules.map((m, idx) => (
            <div 
              key={idx}
              onClick={() => m.screen && onNavigate(m.screen as AppScreen)}
              className="bg-white p-6 rounded-[2rem] border border-gray-100/50 shadow-card flex items-center justify-between group active:scale-[0.98] transition-all hover:border-primary/20 cursor-pointer"
            >
              <div className="flex items-center gap-5">
                <div className={`w-14 h-14 ${m.color} rounded-2xl flex items-center justify-center ${m.shadow} shadow-lg transition-transform group-hover:scale-110`}>
                  <span className="material-icons-round text-2xl">{m.icon}</span>
                </div>
                <div className="pr-4">
                  <h4 className="font-bold text-accent text-[15px] group-hover:text-primary transition-colors">{m.title}</h4>
                  <p className="text-[11px] text-gray-400 font-semibold mt-1 leading-snug">{m.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 mt-6 mb-10">
        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-card overflow-hidden">
          <button 
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full flex items-center justify-between p-6 hover:bg-red-50 transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-primary">
                <span className="material-icons-round text-xl">logout</span>
              </div>
              <span className="text-sm font-bold text-primary">Logout</span>
            </div>
          </button>
        </div>
      </div>

      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl animate-slide-up text-center">
            <div className="w-16 h-16 bg-red-50 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="material-icons-round text-3xl">power_settings_new</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Sign Out?</h3>
            <p className="text-sm text-gray-500 font-medium mb-8">Are you sure you want to logout from Token?</p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => {
                   setShowLogoutConfirm(false);
                   onBack();
                }}
                className="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-lg active:scale-95 transition-all"
              >
                Logout Now
              </button>
              <button 
                onClick={() => setShowLogoutConfirm(false)}
                className="w-full py-4 bg-gray-50 text-gray-400 font-bold rounded-2xl active:bg-gray-100 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
