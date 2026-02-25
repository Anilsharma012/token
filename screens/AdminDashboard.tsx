
import React, { useState, useEffect, useRef } from 'react';
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

// default navigation structure (used as fallback)
const defaultSitemap = [
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
  const [menuSections, setMenuSections] = useState<typeof defaultSitemap>(defaultSitemap);
  const contentRef = useRef<HTMLDivElement>(null);

  // scroll to top when activeMenu changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [activeMenu]);

  // --- MOCK DATA FOR BUSINESS MODULES ---
  // empty arrays initially; we'll populate from server
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [subscriptions, setSubscriptions] = useState<UserSubscription[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);

  // fetch data when component mounts
  useEffect(() => {
    const load = async () => {
      try {
        const [plansRes, subsRes, txRes, cpRes, logsRes, menuRes] = await Promise.all([
          fetch('/api/plans'),
          fetch('/api/subscriptions'),
          fetch('/api/transactions'),
          fetch('/api/coupons'),
          fetch('/api/auditlogs'),
          fetch('/api/admin/menu')
        ]);
        if (plansRes.ok) setPlans(await plansRes.json());
        if (subsRes.ok) setSubscriptions(await subsRes.json());
        if (txRes.ok) setTransactions(await txRes.json());
        if (cpRes.ok) setCoupons(await cpRes.json());
        if (logsRes.ok) setAuditLogs(await logsRes.json());
        if (menuRes.ok) {
          const menuData = await menuRes.json();
          if (Array.isArray(menuData) && menuData.length > 0) {
            setMenuSections(menuData);
          }
        }
      } catch (err) {
        console.error('Failed to load admin data', err);
      }
    };
    load();
  }, []);

  // --- RENDERS ---

  const renderPlansMaster = () => (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-2xl font-display font-black text-gray-900">Plans Master</h2>
          <p className="text-[11px] font-black text-gray-700 uppercase tracking-widest mt-1">Manage Pricing & Packages</p>
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
                <button className="w-8 h-8 rounded-lg bg-gray-50 text-gray-700 flex items-center justify-center hover:bg-primary-soft hover:text-primary transition-colors"><span className="material-icons-round text-sm">edit</span></button>
                <button className="w-8 h-8 rounded-lg bg-gray-50 text-gray-700 flex items-center justify-center hover:bg-red-50 hover:text-primary transition-colors"><span className="material-icons-round text-sm">delete</span></button>
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

  const renderCoupons = () => (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-2xl font-display font-black text-gray-900">Discount Coupons</h2>
          <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mt-1">Manage Promotional Codes</p>
        </div>
        <button className="px-8 py-4 bg-primary text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-premium shadow-primary/20 flex items-center gap-3 active:scale-95 transition-all">
          <span className="material-icons-round">add</span> New Coupon
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.map(coupon => (
          <div key={coupon.id} className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-display font-black text-gray-900">{coupon.code}</h3>
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1">{coupon.discountType === 'PERCENT' ? 'Percentage' : 'Flat Rate'}</p>
              </div>
              <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase border ${
                coupon.role === 'BOTH' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                coupon.role === 'EMPLOYER' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' :
                'bg-primary-soft text-primary border-primary/10'
              }`}>{coupon.role}</span>
            </div>
            <div className="text-3xl font-display font-black text-primary mb-6">{coupon.value}{coupon.discountType === 'PERCENT' ? '%' : '₹'}</div>
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-xs font-bold text-gray-500"><span>Usage</span><span>{coupon.usageCount}/{coupon.usageLimit}</span></div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-accent" style={{width: `${(coupon.usageCount/coupon.usageLimit)*100}%`}}></div></div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 py-2 bg-gray-50 text-gray-700 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-gray-100 transition-colors">Edit</button>
              <button className="flex-1 py-2 bg-red-50 text-primary rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-red-100 transition-colors">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCompanies = () => (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-2xl font-display font-black text-gray-900">Registered Companies</h2>
          <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mt-1">Employer Organization Profiles</p>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-card overflow-hidden">
        <table className="w-full text-left">
           <thead className="bg-gray-50/50 border-b border-gray-100">
              <tr>
                {['Company Name', 'Industry', 'Location', 'Status', 'Active Jobs', 'Actions'].map(h => (
                  <th key={h} className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">{h}</th>
                ))}
              </tr>
           </thead>
           <tbody className="divide-y divide-gray-50">
              {[
                { id: 'c1', name: 'TechNova Solutions', industry: 'Software', location: 'Bangalore', status: 'Active', jobs: 5 },
                { id: 'c2', name: 'Innovate Labs', industry: 'IT Services', location: 'Delhi', status: 'Active', jobs: 8 },
                { id: 'c3', name: 'Future Enterprises', industry: 'Consulting', location: 'Mumbai', status: 'Pending', jobs: 0 }
              ].map(c => (
                <tr key={c.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-6 text-sm font-bold text-gray-900">{c.name}</td>
                  <td className="px-8 py-6 text-xs font-bold text-gray-500">{c.industry}</td>
                  <td className="px-8 py-6 text-xs font-bold text-gray-500">{c.location}</td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase border ${
                      c.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-yellow-50 text-yellow-600 border-yellow-100'
                    }`}>{c.status}</span>
                  </td>
                  <td className="px-8 py-6 text-sm font-black text-gray-900">{c.jobs}</td>
                  <td className="px-8 py-6"><button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-[9px] font-black uppercase">View</button></td>
                </tr>
              ))}
           </tbody>
        </table>
      </div>
    </div>
  );

  const renderCandidates = () => (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-2xl font-display font-black text-gray-900">Job Candidates</h2>
          <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mt-1">Talent Pool & Jobseeker Profiles</p>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-card overflow-hidden">
        <table className="w-full text-left">
           <thead className="bg-gray-50/50 border-b border-gray-100">
              <tr>
                {['Name', 'Role', 'Location', 'Experience', 'Status', 'Actions'].map(h => (
                  <th key={h} className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">{h}</th>
                ))}
              </tr>
           </thead>
           <tbody className="divide-y divide-gray-50">
              {[
                { id: 'u1', name: 'Rahul Sharma', role: 'Full Stack Developer', location: 'Pune', exp: '3 years', status: 'Verified' },
                { id: 'u2', name: 'Priya Verma', role: 'UI/UX Designer', location: 'Bangalore', exp: '2 years', status: 'Verified' },
                { id: 'u3', name: 'Amit Patel', role: 'Data Scientist', location: 'Delhi', exp: '1 year', status: 'Pending' }
              ].map(c => (
                <tr key={c.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-6 text-sm font-bold text-gray-900">{c.name}</td>
                  <td className="px-8 py-6 text-xs font-bold text-gray-500">{c.role}</td>
                  <td className="px-8 py-6 text-xs font-bold text-gray-500">{c.location}</td>
                  <td className="px-8 py-6 text-xs font-bold text-gray-500">{c.exp}</td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase border ${
                      c.status === 'Verified' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-yellow-50 text-yellow-600 border-yellow-100'
                    }`}>{c.status}</span>
                  </td>
                  <td className="px-8 py-6"><button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-[9px] font-black uppercase">View</button></td>
                </tr>
              ))}
           </tbody>
        </table>
      </div>
    </div>
  );

  const renderModeration = () => (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-display font-black text-gray-900">Content Moderation</h2>
            <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mt-1">Flagged Content & Review Queue</p>
          </div>
          <div className="px-4 py-2 bg-red-50 text-primary rounded-full font-black text-sm">4 Pending</div>
        </div>
      </div>

      <div className="space-y-4">
        {[
          { id: 'f1', type: 'Job Post', content: 'Senior Developer Role', reason: 'Inappropriate Language', priority: 'High', date: '2025-02-20 10:15 AM' },
          { id: 'f2', type: 'Profile', content: 'John Doe Profile', reason: 'Suspicious Activity', priority: 'Medium', date: '2025-02-20 09:45 AM' },
          { id: 'f3', type: 'Comment', content: 'Review Comment', reason: 'Spam/Advertising', priority: 'Low', date: '2025-02-20 08:30 AM' },
          { id: 'f4', type: 'Job Post', content: 'Marketing Manager', reason: 'Policy Violation', priority: 'High', date: '2025-02-19 05:20 PM' }
        ].map(flag => (
          <div key={flag.id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white text-sm font-black ${
                  flag.priority === 'High' ? 'bg-red-500' : flag.priority === 'Medium' ? 'bg-yellow-500' : 'bg-blue-500'
                }`}>{flag.priority.charAt(0)}</div>
                <div>
                  <h4 className="font-bold text-gray-900">{flag.type}: {flag.content}</h4>
                  <p className="text-[10px] text-gray-400 uppercase font-bold mt-1">Reason: {flag.reason}</p>
                </div>
              </div>
              <span className="text-[10px] font-black text-gray-300 uppercase">{flag.date}</span>
            </div>
            <div className="flex gap-3">
              <button className="flex-1 py-2 bg-emerald-50 text-emerald-600 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-emerald-100 transition-colors">Approve</button>
              <button className="flex-1 py-2 bg-red-50 text-primary rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-red-100 transition-colors">Reject</button>
              <button className="flex-1 py-2 bg-gray-50 text-gray-600 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-gray-100 transition-colors">Review</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-display font-black text-gray-900">System Settings</h2>
        <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mt-1">Configure Platform Behavior & Policies</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Platform Settings */}
        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
          <h3 className="text-lg font-display font-black text-gray-900 mb-6">Platform Configuration</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-bold text-gray-600 mb-2 block">Platform Name</label>
              <input type="text" value="TokenJobs" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
            </div>
            <div>
              <label className="text-sm font-bold text-gray-600 mb-2 block">Support Email</label>
              <input type="email" value="support@tokenjobs.com" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
            </div>
            <div>
              <label className="text-sm font-bold text-gray-600 mb-2 block">Maintenance Mode</label>
              <div className="flex items-center gap-3">
                <button className="w-14 h-8 rounded-full bg-gray-300 relative flex items-center"><div className="w-6 h-6 bg-white rounded-full shadow-md"></div></button>
                <span className="text-sm text-gray-500">Disabled</span>
              </div>
            </div>
          </div>
        </div>

        {/* Commission Settings */}
        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
          <h3 className="text-lg font-display font-black text-gray-900 mb-6">Commission Rules</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-bold text-gray-600 mb-2 block">Employer Commission (%)</label>
              <input type="number" value="15" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
            </div>
            <div>
              <label className="text-sm font-bold text-gray-600 mb-2 block">Job Post Fee (₹)</label>
              <input type="number" value="0" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
            </div>
            <div>
              <label className="text-sm font-bold text-gray-600 mb-2 block">Min Payout Amount (₹)</label>
              <input type="number" value="1000" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Security */}
        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
          <h3 className="text-lg font-display font-black text-gray-900 mb-6">Security & Compliance</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="font-bold text-gray-900">Two-Factor Auth Required</p>
                <p className="text-[10px] text-gray-500 uppercase">For all admins</p>
              </div>
              <button className="w-12 h-7 rounded-full bg-primary relative flex items-center justify-end pr-1"><div className="w-5 h-5 bg-white rounded-full shadow-md"></div></button>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="font-bold text-gray-900">IP Whitelist</p>
                <p className="text-[10px] text-gray-500 uppercase">Restrict admin access</p>
              </div>
              <button className="w-12 h-7 rounded-full bg-gray-300 relative flex items-center justify-start pl-1"><div className="w-5 h-5 bg-white rounded-full shadow-md"></div></button>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
          <h3 className="text-lg font-display font-black text-gray-900 mb-6">Notification Preferences</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="font-bold text-gray-900">Daily Report Email</p>
                <p className="text-[10px] text-gray-500 uppercase">Platform statistics</p>
              </div>
              <button className="w-12 h-7 rounded-full bg-primary relative flex items-center justify-end pr-1"><div className="w-5 h-5 bg-white rounded-full shadow-md"></div></button>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="font-bold text-gray-900">Fraud Alerts</p>
                <p className="text-[10px] text-gray-500 uppercase">Real-time notifications</p>
              </div>
              <button className="w-12 h-7 rounded-full bg-primary relative flex items-center justify-end pr-1"><div className="w-5 h-5 bg-white rounded-full shadow-md"></div></button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button className="flex-1 py-4 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg active:scale-95 transition-all">Save Changes</button>
        <button className="flex-1 py-4 bg-gray-100 text-gray-600 rounded-2xl font-black text-sm uppercase tracking-widest active:scale-95 transition-all">Reset to Default</button>
      </div>
    </div>
  );

  const renderActiveView = () => {
    switch(activeMenu) {
      case 'Dashboard': return renderDashboardOverview();
      case 'Plans Master': return renderPlansMaster();
      case 'Subscriptions': return renderSubscriptions();
      case 'Billing': return renderBilling();
      case 'Coupons': return renderCoupons();
      case 'Companies': return renderCompanies();
      case 'Candidates': return renderCandidates();
      case 'Moderation': return renderModeration();
      case 'Audit Logs': return renderAuditLogs();
      case 'Settings': return renderSettings();
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
            {menuSections.map((section) => (
              <div key={section.group}>
                <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.25em] px-5 mb-4">{section.group}</p>
                <div className="space-y-1.5">
                  {section.items.map((item: any) => (
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
          <div ref={contentRef} className="flex-1 overflow-y-auto p-12 space-y-12 no-scrollbar bg-[#F8FAFC]">
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
              <button onClick={() => setShowLogoutModal(false)} className="py-5 bg-gray-100 text-gray-700 rounded-[2rem] text-xs font-black uppercase tracking-widest">Cancel</button>
              <button onClick={onBack} className="py-5 bg-primary text-white rounded-[2rem] text-xs font-black uppercase tracking-widest shadow-xl shadow-red-500/20">Sign Out</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
