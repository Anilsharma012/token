
import React, { useState, useMemo } from 'react';
import { Talent } from '../types';
import { MOCK_TALENTS } from '../constants';

interface HireSearchProps {
  onSelectTalent: (talent: Talent) => void;
  onBack: () => void;
}

export const HireSearch: React.FC<HireSearchProps> = ({ onSelectTalent, onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState('Availability');
  const [selectedSkill, setSelectedSkill] = useState('Skills');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredTalents = MOCK_TALENTS.filter(t => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery || 
                          t.name.toLowerCase().includes(q) || 
                          t.role.toLowerCase().includes(q) ||
                          t.skills.some(s => s.toLowerCase().includes(q));
    const matchesAvailability = selectedAvailability === 'Availability' || t.availability === selectedAvailability;
    const matchesSkill = selectedSkill === 'Skills' || t.skills.includes(selectedSkill);
    return matchesSearch && matchesAvailability && matchesSkill;
  });

  return (
    <div className="animate-fade-in pb-32">
      <header className="glass p-4 sticky top-0 z-50 border-b border-gray-100/50 space-y-4">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center active:scale-90 transition-all bg-white shadow-sm">
            <span className="material-icons-round text-accent">arrow_back</span>
          </button>
          <div className="flex-1 relative">
            <span className="material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-primary text-xl">person_search</span>
            <input 
              type="text"
              value={searchQuery}
              onFocus={() => setShowSuggestions(true)}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search names, roles or skills..."
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-transparent focus:border-primary focus:ring-4 focus:ring-primary/5 rounded-[1.5rem] text-[15px] font-medium transition-all shadow-inner-soft"
            />
          </div>
        </div>
      </header>

      <div className="px-5 py-6 space-y-6">
        <div className="flex items-baseline gap-2">
          <h2 className="text-2xl font-display font-black text-accent tracking-tight">Talent Pool</h2>
          <span className="text-[10px] font-black text-primary px-2 py-0.5 bg-primary/5 rounded-md uppercase tracking-widest">{filteredTalents.length} FOUND</span>
        </div>

        <div className="space-y-5">
          {filteredTalents.map(talent => (
            <div 
              key={talent.id} 
              onClick={() => onSelectTalent(talent)}
              className="bg-white p-6 rounded-[2.75rem] shadow-card border border-gray-100/60 active:scale-[0.98] transition-all group relative overflow-hidden"
            >
              <div className="flex gap-5 mb-4">
                <img src={talent.imageUrl} alt={talent.name} className="w-16 h-16 rounded-2xl object-cover bg-gray-50 border-2 border-white shadow-md transition-transform group-hover:scale-105" />
                <div className="flex-1 min-w-0">
                  <h3 className="text-[19px] font-bold text-accent leading-tight truncate group-hover:text-primary transition-colors">{talent.name}</h3>
                  <p className="text-primary font-bold text-sm mt-1">{talent.role}</p>
                </div>
              </div>
              
              {/* Highlighted Expected Package Box */}
              <div className="mb-6 p-4 bg-accent/5 rounded-2xl border border-accent/10 flex items-center gap-3">
                <span className="material-icons-round text-accent text-xl">payments</span>
                <div className="flex flex-col">
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Expected Package</span>
                  <span className="text-[15px] font-black text-accent">{talent.expectedSalary}</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-5 border-t border-gray-50">
                <div className="flex items-center gap-2 text-gray-400">
                  <span className="material-icons-round text-lg text-primary/40">location_on</span>
                  <span className="text-[10px] font-black uppercase tracking-widest">{talent.location}</span>
                </div>
                <button className="bg-accent text-white text-[10px] font-black uppercase tracking-[0.2em] px-8 py-3 rounded-2xl shadow-xl active:bg-primary transition-all">
                  Full Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
