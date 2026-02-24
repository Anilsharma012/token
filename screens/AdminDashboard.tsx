
import React, { useState, useEffect } from 'react';
import { 
  PricingPlan, UserSubscription, Transaction, Coupon, AuditLogEntry, PlanRole, PlanStatus 
} from '../types';

interface AdminDashboardProps {
  onBack: () => void;
}

type MenuSection = 
  | 'Dashboard' | 'Plans Master' | 'Subscriptions' | 'Billing' 
  | 'Coupons' | 'Companies' | 'Candidates' | 'Moderation' 
  | 'Audit Logs' | 'Settings';

const sitemap = [
  { group: 'Overview', items: [{ label: 'Dashboard', icon: 'grid_view' }] },
  { group: 'Monetization', items: [
      { label: 'Plans Master', icon: 'inventory_2' }, 
      { label: 'Subscriptions', icon: 'card_membership' }, 
      { label: 'Billing', icon: 'receipt_long' },
      { label: 'Coupons', icon: 'confirmation_number' }
    ] 
  },
  { group: 'Users & Content', items: [
      { label: 'Companies', icon: 'business_center' }, 
      { label: 'Candidates', icon: 'person_search' }, 
      { label: 'Moderation', icon: 'gavel', alert: '4' }
    ] 
  },
  { group: 'System', items: [
      { label: 'Audit Logs', icon: 'history_edu' }, 
      { label: 'Settings', icon: 'settings_suggest' }
    ] 
  }
];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBack }) => {
  const [activeMenu, setActiveMenu] = useState<MenuSection>('Dashboard');
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // --- MOCK DATA FOR BUSINESS MODULES ---
  const [plans, setPlans] = useState<PricingPlan[]>([
    { id: 'p1', role: 'EMPLOYER', name: 'Elite Recruiter', durationDays: 30, price: 4999, status: 'Active', isRecommended: true, features: ['Unlimited Posts', 'AI Shortlisting'], credits: { jobPosts: 50, resumeUnlocks: 200 } },
    { id: 'p2', role: 'EMPLOYEE', name: 'Profile Boost Pro', durationDays: 15, price: 999, status: 'Active', isRecommended: false, features: ['Top Search Result', 'Premium Badge'], credits: { profileBoostDays: 15, premiumAlerts: 10 } }
  ]);

  const [subscriptions, setSubscriptions] = useState<UserSubscription[]>([
    { id: 's1', userId: 'u101', userName: 'TechNova Solutions', role: 'EMPLOYER', planId: 'p1', planName: 'Elite Recruiter', startDate: '2024-10-01', expiryDate: '2024-10-31', status: 'Active', creditsRemaining: { jobPosts: 12, unlocks: 45 } },
    { id: 's2', userId: 'u202', userName: 'Rahul Sharma', role: 'EMPLOYEE', planId: 'p2', planName: 'Profile Boost Pro', startDate: '2024-10-12', expiryDate: '2024-10-27', status: 'Active', creditsRemaining: { boosts: 15 } }
  ]);

  const [transactions] = useState<Transaction[]>([
    { id: 'TXN_9011', userId: 'u101', userName: 'TechNova Solutions', planName: 'Elite Recruiter', amount: 4999, status: 'Success', method: 'UPI', date: '2024-10-01 10:30 AM' },
    { id: 'TXN_9012', userId: 'u202', userName: 'Rahul Sharma', planName: 'Profile Boost Pro', amount: 999, status: 'Success', method: 'Card', date: '2024-10-12 02:15 PM' },
    { id: 'TXN_9013', userId: 'u303', userName: 'Simran Kaur', planName: 'Basic', amount: 499, status: 'Failed', method: 'Wallet', date: '2024-10-13 11:00 AM' }
  ]);

  const [coupons] = useState<Coupon[]>([
    { id: 'c1', code: 'TOKEN50', role: 'BOTH', discountType: 'PERCENT', value: 50, validUntil: '2024-12-31', usageLimit: 100, usageCount: 42 }
  ]);

  const [auditLogs] = useState<AuditLogEntry[]>([
    { id: 'L1', adminName: 'Admin_Master', action: 'PLAN_UPDATE', target: 'Elite Recruiter', timestamp: '2024-10-13 10:00 AM', details: 'Price changed from 4500 to 4999' },
    { id: 'L2', adminName: 'Support_1', action: 'SUB_OVERRIDE', target: 'TechNova Solutions', timestamp: '2024-10-13 11:30 AM', details: 'Added 5 Job Post credits via manual request' }
  ]);

  // --- RENDERS ---

  const renderPlansMaster = () => (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-2xl font-display font-black text-gray-900">Plans Master</h2>
          <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mt-1">Manage Pricing & Packages</p>
        </div>
        <button className="px-8 py-4 bg-primary text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-premium shadow-primary/20 flex items-center gap-3 active:scale-95 transition-all">
          <span className="material-icons-round">add</span> Create New Plan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map(plan => (
          <div key={plan.id} className="bg-white rounded-[3rem] p-8 border border-gray-100 shadow-card relative group">
            {plan.isRecommended && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg">Recommended</div>
            )}
            <div className="flex justify-between items-start mb-6">
              <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase border ${plan.role === 'EMPLOYER' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-primary-soft text-primary border-primary/10'}`}>
                {plan.role}
              </span>
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-lg bg-gray-50 text-gray-400 flex items-center justify-center hover:bg-primary-soft hover:text-primary transition-colors"><span className="material-icons-round text-sm">edit</span></button>
                <button className="w-8 h-8 rounded-lg bg-gray-50 text-gray-400 flex items-center justify-center hover:bg-red-50 hover:text-primary transition-colors"><span className="material-icons-round text-sm">delete</span></button>
              </div>
            </div>
            <h3 className="text-xl font-display font-black text-gray-900 mb-1">{plan.name}</h3>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">{plan.durationDays} Days Duration</p>
            
            <div className="text-3xl font-display font-black text-primary mb-8">₹{plan.price}</div>
            
            <div className="space-y-3 mb-8">
               {plan.features.map((f, i) => (
                 <div key={i} className="flex items-center gap-3">
                   <span className="material-icons-round text-emerald-500 text-sm">check_circle</span>
                   <span className="text-xs font-bold text-gray-600">{f}</span>
                 </div>
               ))}
            </div>

            <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
               <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Status: {plan.status}</span>
               <div className="w-10 h-5 bg-emerald-500 rounded-full relative"><div className="absolute top-1 right-1 w-3 h-3 bg-white rounded-full"></div></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSubscriptions = () => (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-2xl font-display font-black text-gray-900">Subscriptions</h2>
          <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mt-1">Manage & Override Active Plans</p>
        </div>
      </div>
      
      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-card overflow-hidden">
        <table className="w-full text-left">
           <thead className="bg-gray-50/50 border-b border-gray-100">
              <tr>
                {['User/Entity', 'Current Plan', 'Expiry Date', 'Status', 'Actions'].map(h => (
                  <th key={h} className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">{h}</th>
                ))}
              </tr>
           </thead>
           <tbody className="divide-y divide-gray-50">
              {subscriptions.map(s => (
                <tr key={s.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-6">
                    <p className="text-sm font-bold text-gray-900">{s.userName}</p>
                    <p className="text-[9px] font-black text-primary uppercase tracking-widest">{s.role}</p>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-accent text-white rounded-lg text-[9px] font-black uppercase">{s.planName}</span>
                  </td>
                  <td className="px-8 py-6 text-xs font-bold text-gray-500">{s.expiryDate}</td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase border ${s.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-primary border-red-100'}`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                     <button className="px-6 py-2 bg-gray-900 text-white rounded-xl text-[9px] font-black uppercase tracking-widest active:scale-95 transition-all">Override</button>
                  </td>
                </tr>
              ))}
           </tbody>
        </table>
      </div>
    </div>
  );

  const renderBilling = () => (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-display font-black text-gray-900">Billing Ledger</h2>
        <div className="flex gap-4">
           <div className="bg-emerald-50 px-6 py-3 rounded-2xl border border-emerald-100">
             <p className="text-[9px] font-black text-emerald-600 uppercase">Revenue (Life)</p>
             <p className="text-xl font-display font-black text-emerald-900">₹8.24Cr</p>
           </div>
        </div>
      </div>
      
      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-card overflow-hidden">
        <table className="w-full text-left">
           <thead className="bg-gray-50/50 border-b border-gray-100">
              <tr>
                {['Transaction ID', 'User', 'Amount', 'Method', 'Date', 'Status'].map(h => (
                  <th key={h} className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">{h}</th>
                ))}
              </tr>
           </thead>
           <tbody className="divide-y divide-gray-50">
              {transactions.map(t => (
                <tr key={t.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-6 font-mono text-xs font-black text-primary">{t.id}</td>
                  <td className="px-8 py-6 text-sm font-bold text-gray-900">{t.userName}</td>
                  <td className="px-8 py-6 text-sm font-black text-gray-900">₹{t.amount}</td>
                  <td className="px-8 py-6 text-xs font-bold text-gray-500">{t.method}</td>
                  <td className="px-8 py-6 text-[10px] font-bold text-gray-400 uppercase">{t.date}</td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase border ${t.status === 'Success' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-primary'}`}>
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
           </tbody>
        </table>
      </div>
    </div>
  );

  const renderAuditLogs = () => (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-display font-black text-gray-900">Audit Logs</h2>
        <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mt-1">Immutable Security Timeline</p>
      </div>

      <div className="space-y-4">
        {auditLogs.map(log => (
          <div key={log.id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-start gap-6 group">
             <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-primary group-hover:bg-primary-soft transition-colors">
                <span className="material-icons-round">history_edu</span>
             </div>
             <div className="flex-1">
                <div className="flex justify-between items-start">
                   <h4 className="font-bold text-accent">{log.action}: <span className="text-primary">{log.target}</span></h4>
                   <span className="text-[10px] font-black text-gray-300 uppercase">{log.timestamp}</span>
                </div>
                <p className="text-xs text-gray-500 font-medium mt-1">{log.details}</p>
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-2">Admin: {log.adminName}</p>
             </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderActiveView = () => {
    switch(activeMenu) {
      case 'Dashboard': return renderDashboardOverview();
      case 'Plans Master': return renderPlansMaster();
      case 'Subscriptions': return renderSubscriptions();
      case 'Billing': return renderBilling();
      case 'Audit Logs': return renderAuditLogs();
      default: return <div className="p-20 text-center"><h2 className="text-xl font-display font-black text-gray-300">Module Under Construction</h2></div>;
    }
  };

  const renderDashboardOverview = () => (
    <div className="space-y-10 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue', val: '₹8.24Cr', trend: '+12%', icon: 'payments', color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Active Subs', val: '2,450', trend: '+5%', icon: 'card_membership', color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Pending Verifications', val: '45', trend: 'High', icon: 'verified', color: 'text-orange-600', bg: 'bg-orange-50' },
          { label: 'Platform Health', val: 'Optimal', trend: 'STABLE', icon: 'shutter_speed', color: 'text-primary', bg: 'bg-primary-soft' },
        ].map((kpi, idx) => (
          <div key={idx} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-lg transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 rounded-2xl ${kpi.bg} ${kpi.color} flex items-center justify-center`}>
                <span className="material-icons-round">{kpi.icon}</span>
              </div>
              <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${kpi.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-primary'}`}>
                {kpi.trend}
              </span>
            </div>
            <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">{kpi.label}</p>
            <h4 className="text-3xl font-display font-black text-gray-900 mt-1">{kpi.val}</h4>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-card">
            <h3 className="text-xl font-display font-black text-gray-900 mb-8">Recent Revenue Stream</h3>
            <div className="space-y-6">
               {transactions.slice(0, 4).map(txn => (
                 <div key={txn.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-500 border border-gray-100">
                          <span className="material-icons-round text-lg">arrow_upward</span>
                       </div>
                       <div>
                          <p className="text-sm font-bold text-gray-900">{txn.userName}</p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase">{txn.planName}</p>
                       </div>
                    </div>
                    <p className="text-sm font-black text-emerald-600">+₹{txn.amount}</p>
                 </div>
               ))}
            </div>
         </div>
         <div className="bg-accent rounded-[3rem] p-10 text-white shadow-premium relative overflow-hidden">
            <h3 className="text-xl font-display font-black mb-6">Subscription Distribution</h3>
            <div className="space-y-6">
               <div>
                  <div className="flex justify-between text-[10px] font-black uppercase text-white/40 mb-2"><span>Recruiter Elite (Employers)</span><span>65%</span></div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-primary w-[65%]"></div></div>
               </div>
               <div>
                  <div className="flex justify-between text-[10px] font-black uppercase text-white/40 mb-2"><span>Profile Boost (Job Seekers)</span><span>35%</span></div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-blue-400 w-[35%]"></div></div>
               </div>
            </div>
            <span className="material-icons-round absolute -right-6 -bottom-6 text-white/5 text-[150px]">analytics</span>
         </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex overflow-x-auto no-scrollbar">
      <div className="flex min-w-[1440px] w-full animate-fade-in">
        <aside className="w-72 bg-[#0F172A] flex flex-col shrink-0 h-screen sticky top-0 z-50 shadow-2xl overflow-y-auto no-scrollbar">
          <div className="p-8 flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg">
              <span className="material-icons-round text-white text-2xl">local_fire_department</span>
            </div>
            <div>
              <span className="text-white font-display font-black text-xl tracking-tight block">Token.admin</span>
              <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em]">Management Console</span>
            </div>
          </div>
          <nav className="flex-1 px-4 space-y-8 pb-12">
            {sitemap.map((section) => (
              <div key={section.group}>
                <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.25em] px-5 mb-4">{section.group}</p>
                <div className="space-y-1.5">
                  {section.items.map((item) => (
                    <button 
                      key={item.label} 
                      onClick={() => setActiveMenu(item.label as MenuSection)} 
                      className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-[12px] font-bold transition-all relative group ${
                        activeMenu === item.label ? 'bg-primary text-white shadow-2xl shadow-primary/30' : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span className="material-icons-round text-xl">{item.icon}</span>
                      <span className="flex-1 text-left">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </nav>
          <div className="p-6 border-t border-white/5 mt-auto">
            <button onClick={() => setShowLogoutModal(true)} className="w-full flex items-center justify-center gap-3 py-4 text-red-400 hover:bg-red-400/5 rounded-2xl transition-all text-[11px] font-black uppercase border border-red-500/10">
              Terminiate Session
            </button>
          </div>
        </aside>

        <main className="flex-1 flex flex-col h-screen overflow-hidden">
          <header className="bg-white border-b border-gray-100 h-24 flex items-center justify-between px-12 shrink-0 z-40 shadow-sm">
            <div>
              <h1 className="text-3xl font-display font-black text-gray-900 tracking-tight">{activeMenu}</h1>
            </div>
            <div className="flex items-center gap-4">
                 <div className="text-right"><p className="text-sm font-black text-gray-900">Platform Admin</p><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Auth Level: SUPER</p></div>
                 <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center text-white font-black text-sm">SA</div>
            </div>
          </header>
          <div className="flex-1 overflow-y-auto p-12 space-y-12 no-scrollbar bg-[#F8FAFC]">
            {renderActiveView()}
          </div>
        </main>
      </div>

      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-accent/80 backdrop-blur-md animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-[3.5rem] p-12 shadow-2xl animate-slide-up text-center">
            <h3 className="text-2xl font-display font-black text-gray-900 mb-4">Logout?</h3>
            <p className="text-gray-500 font-medium mb-10 text-sm">Terminate administrative access now?</p>
            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => setShowLogoutModal(false)} className="py-5 bg-gray-100 text-gray-400 rounded-[2rem] text-xs font-black uppercase tracking-widest">Cancel</button>
              <button onClick={onBack} className="py-5 bg-primary text-white rounded-[2rem] text-xs font-black uppercase tracking-widest shadow-xl shadow-red-500/20">Sign Out</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
