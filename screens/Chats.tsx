
import React from 'react';

export const Chats: React.FC = () => {
  const conversations = [
    {
      id: 1,
      name: 'Elena Gilbert',
      role: 'Talent Lead @ Google',
      jobContext: {
        title: 'Senior Software Architect',
        salary: '₹80L - 1.2Cr',
        status: 'Interview Scheduled'
      },
      lastMsg: 'Hello! Your portfolio looks impressive. Can we discuss your availability?',
      time: '10:45 AM',
      unread: true,
      online: true,
      avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=200'
    },
    {
      id: 2,
      name: 'Marcus Chen',
      role: 'HR Manager @ Amazon',
      jobContext: {
        title: 'Logistics Supervisor',
        salary: '₹12L - 18L',
        status: 'Offer Sent'
      },
      lastMsg: 'The offer letter has been sent to your primary email address.',
      time: 'Yesterday',
      unread: false,
      online: false,
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200'
    }
  ];

  return (
    <div className="animate-fade-in pb-32 min-h-screen bg-background">
      <header className="glass px-6 pt-8 pb-5 sticky top-0 z-30 border-b border-gray-100/50">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-display font-black text-accent tracking-tight">Messages</h1>
            <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mt-1">Direct Recruiter Access</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center border border-gray-100 shadow-sm">
            <span className="material-icons-round text-primary">forum</span>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-4">
        {conversations.map((chat) => (
          <div key={chat.id} className="bg-white rounded-[2.5rem] border border-gray-100 shadow-card overflow-hidden">
            {/* User Info Module */}
            <div className="p-5 flex items-center gap-4">
              <div className="relative shrink-0">
                <img src={chat.avatar} alt="" className="w-14 h-14 rounded-2xl object-cover border border-gray-100" />
                {chat.online && <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-accent truncate">{chat.name}</h3>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">{chat.time}</span>
                </div>
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wide">{chat.role}</p>
              </div>
            </div>

            {/* Work Context Module (Job Related) */}
            <div className="mx-5 p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[9px] font-black text-primary uppercase tracking-widest mb-1">Applying for</p>
                <h4 className="text-sm font-bold text-accent truncate">{chat.jobContext.title}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-bold text-gray-500">{chat.jobContext.salary}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span className="text-[10px] font-bold text-green-600">{chat.jobContext.status}</span>
                </div>
              </div>
              <button className="px-4 py-2 bg-white rounded-xl border border-gray-200 text-[10px] font-bold text-accent shadow-sm active:scale-95 transition-all">
                View Job
              </button>
            </div>

            {/* Message Preview */}
            <div className="p-5">
              <p className={`text-[13px] line-clamp-2 ${chat.unread ? 'text-accent font-semibold' : 'text-gray-500 font-medium'}`}>
                {chat.lastMsg}
              </p>
              <div className="flex gap-2 mt-4">
                <button className="flex-1 py-4 bg-primary text-white rounded-xl text-[12px] font-bold uppercase tracking-widest shadow-lg active:scale-95 transition-all">
                  Reply Now
                </button>
                <button className="flex-1 py-4 bg-accent text-white rounded-xl text-[12px] font-bold uppercase tracking-widest active:scale-95 transition-all">
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
