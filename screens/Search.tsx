
import React, { useState, useMemo } from 'react';
import { Job, Category } from '../types';
import { MOCK_JOBS } from '../constants';

interface SearchProps {
  initialCategory?: Category;
  onSelectJob: (job: Job) => void;
  onBack: () => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export const Search: React.FC<SearchProps> = ({ initialCategory, onSelectJob, onBack, favorites, onToggleFavorite }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJobType, setSelectedJobType] = useState('Job Type');
  const [selectedExperience, setSelectedExperience] = useState('Experience');
  const [selectedSalary, setSelectedSalary] = useState('Salary Range');
  const [selectedLocation, setSelectedLocation] = useState('Location');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [sortBy, setSortBy] = useState<'relevance' | 'date' | 'salary'>('relevance');

  // Auto-suggest logic
  const suggestions = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return [];
    
    const matches: { label: string; type: 'title' | 'company' }[] = [];
    MOCK_JOBS.forEach(job => {
      if (job.title.toLowerCase().includes(q)) matches.push({ label: job.title, type: 'title' });
      if (job.company.toLowerCase().includes(q)) matches.push({ label: job.company, type: 'company' });
    });
    
    // De-duplicate and limit
    return Array.from(new Map(matches.map(m => [m.label, m])).values()).slice(0, 6);
  }, [searchQuery]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedJobType('Job Type');
    setSelectedExperience('Experience');
    setSelectedSalary('Salary Range');
    setSelectedLocation('Location');
    setShowSuggestions(false);
  };

  const filteredJobs = React.useMemo(() => {
    const filtered = MOCK_JOBS.filter(job => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = !searchQuery || 
                            job.title.toLowerCase().includes(q) || 
                            job.company.toLowerCase().includes(q);
      
      const matchesCategory = initialCategory ? job.category === initialCategory.id : true;
      const matchesJobType = selectedJobType === 'Job Type' || job.type === selectedJobType;
      const matchesExperience = selectedExperience === 'Experience' || job.experience.includes(selectedExperience.split(' ')[0]);
      // Simplified salary/location matching for mock
      const matchesSalary = selectedSalary === 'Salary Range' || true; 
      const matchesLocation = selectedLocation === 'Location' || job.location.includes(selectedLocation);

      return matchesSearch && matchesCategory && matchesJobType && matchesExperience && matchesSalary && matchesLocation;
    });

    if (sortBy === 'date') return filtered.sort((a, b) => a.postedAt.localeCompare(b.postedAt));
    if (sortBy === 'salary') return filtered.sort((a, b) => b.salary.localeCompare(a.salary));
    return filtered;
  }, [searchQuery, initialCategory, selectedJobType, selectedExperience, selectedSalary, selectedLocation, sortBy]);

  const hasActiveFilters = searchQuery !== '' || 
                           selectedJobType !== 'Job Type' || 
                           selectedExperience !== 'Experience' || 
                           selectedSalary !== 'Salary Range' || 
                           selectedLocation !== 'Location';

  return (
    <div className="animate-fade-in pb-32">
      <header className="glass p-4 sticky top-0 z-50 border-b border-gray-100/50 space-y-4">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center active:scale-90 transition-all bg-white shadow-sm">
            <span className="material-icons-round text-accent">arrow_back</span>
          </button>
          <div className="flex-1 relative">
            <span className="material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-primary text-xl">search</span>
            <input 
              type="text"
              value={searchQuery}
              onFocus={() => setShowSuggestions(true)}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              placeholder="Search careers, companies..."
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-transparent focus:border-primary focus:ring-4 focus:ring-primary/5 rounded-[1.5rem] text-[15px] font-medium transition-all shadow-inner-soft"
            />

            {/* Auto-Suggest Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-[2rem] shadow-premium border border-gray-100 overflow-hidden z-50 animate-slide-up">
                <div className="p-3">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest px-4 py-2">Quick Matches</p>
                  {suggestions.map((item, idx) => (
                    <button
                      key={`${item.label}-${idx}`}
                      onClick={() => {
                        setSearchQuery(item.label);
                        setShowSuggestions(false);
                      }}
                      className="w-full flex items-center gap-4 px-4 py-3 hover:bg-primary/5 rounded-2xl transition-all text-left group"
                    >
                      <span className={`material-icons-round text-lg ${item.type === 'title' ? 'text-primary' : 'text-blue-500'}`}>
                        {item.type === 'title' ? 'work' : 'apartment'}
                      </span>
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-bold text-accent group-hover:text-primary transition-colors block truncate">{item.label}</span>
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{item.type}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {showSuggestions && <div className="fixed inset-0 z-[-1]" onClick={() => setShowSuggestions(false)}></div>}
          </div>
        </div>
        
        {/* Expanded Horizontal Filter Modules */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 px-1">
          {/* Job Type Filter */}
          <div className="relative shrink-0">
            <select 
              value={selectedJobType}
              onChange={(e) => setSelectedJobType(e.target.value)}
              className={`appearance-none pl-11 pr-11 py-3.5 rounded-2xl border text-[11px] font-black uppercase tracking-wider focus:ring-4 focus:ring-primary/10 cursor-pointer shadow-sm transition-all ${selectedJobType !== 'Job Type' ? 'bg-primary text-white border-primary' : 'bg-white text-accent border-gray-100'}`}
            >
              <option>Job Type</option>
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Contract">Contract</option>
              <option value="Remote">Remote</option>
            </select>
            <span className={`material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-xl pointer-events-none ${selectedJobType !== 'Job Type' ? 'text-white' : 'text-primary'}`}>work_outline</span>
            <span className={`material-icons-round absolute right-3 top-1/2 -translate-y-1/2 text-xl pointer-events-none ${selectedJobType !== 'Job Type' ? 'text-white/50' : 'text-gray-300'}`}>expand_more</span>
          </div>

          {/* Salary Range Filter */}
          <div className="relative shrink-0">
            <select 
              value={selectedSalary}
              onChange={(e) => setSelectedSalary(e.target.value)}
              className={`appearance-none pl-11 pr-11 py-3.5 rounded-2xl border text-[11px] font-black uppercase tracking-wider focus:ring-4 focus:ring-primary/10 cursor-pointer shadow-sm transition-all ${selectedSalary !== 'Salary Range' ? 'bg-primary text-white border-primary' : 'bg-white text-accent border-gray-100'}`}
            >
              <option>Salary Range</option>
              <option value="0-20k">₹0 - ₹20k</option>
              <option value="20k-50k">₹20k - ₹50k</option>
              <option value="50k-1L">₹50k - ₹1L</option>
              <option value="1L+">₹1L+</option>
            </select>
            <span className={`material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-xl pointer-events-none ${selectedSalary !== 'Salary Range' ? 'text-white' : 'text-primary'}`}>payments</span>
            <span className={`material-icons-round absolute right-3 top-1/2 -translate-y-1/2 text-xl pointer-events-none ${selectedSalary !== 'Salary Range' ? 'text-white/50' : 'text-gray-300'}`}>expand_more</span>
          </div>

          {/* Experience Filter */}
          <div className="relative shrink-0">
            <select 
              value={selectedExperience}
              onChange={(e) => setSelectedExperience(e.target.value)}
              className={`appearance-none pl-11 pr-11 py-3.5 rounded-2xl border text-[11px] font-black uppercase tracking-wider focus:ring-4 focus:ring-primary/10 cursor-pointer shadow-sm transition-all ${selectedExperience !== 'Experience' ? 'bg-primary text-white border-primary' : 'bg-white text-accent border-gray-100'}`}
            >
              <option>Experience</option>
              <option value="Freshers">Freshers</option>
              <option value="1-3 Years">1-3 Years</option>
              <option value="3-5 Years">3-5 Years</option>
              <option value="5+ Years">5+ Years</option>
            </select>
            <span className={`material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-xl pointer-events-none ${selectedExperience !== 'Experience' ? 'text-white' : 'text-primary'}`}>history_edu</span>
            <span className={`material-icons-round absolute right-3 top-1/2 -translate-y-1/2 text-xl pointer-events-none ${selectedExperience !== 'Experience' ? 'text-white/50' : 'text-gray-300'}`}>expand_more</span>
          </div>

          {/* Location Filter */}
          <div className="relative shrink-0">
            <select 
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className={`appearance-none pl-11 pr-11 py-3.5 rounded-2xl border text-[11px] font-black uppercase tracking-wider focus:ring-4 focus:ring-primary/10 cursor-pointer shadow-sm transition-all ${selectedLocation !== 'Location' ? 'bg-primary text-white border-primary' : 'bg-white text-accent border-gray-100'}`}
            >
              <option>Location</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Delhi NCR">Delhi NCR</option>
              <option value="Remote">Remote</option>
            </select>
            <span className={`material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-xl pointer-events-none ${selectedLocation !== 'Location' ? 'text-white' : 'text-primary'}`}>location_on</span>
            <span className={`material-icons-round absolute right-3 top-1/2 -translate-y-1/2 text-xl pointer-events-none ${selectedLocation !== 'Location' ? 'text-white/50' : 'text-gray-300'}`}>expand_more</span>
          </div>
        </div>
      </header>

      <div className="px-5 py-6 space-y-6">
        <div className="flex items-center justify-between px-1">
           <div className="flex items-baseline gap-2">
              <h2 className="text-2xl font-display font-black text-accent tracking-tight">Career Openings</h2>
              <span className="text-[10px] font-black text-primary px-2 py-0.5 bg-primary/5 rounded-md uppercase tracking-widest">{filteredJobs.length} RESULTS</span>
           </div>
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

        <div className="space-y-5">
          {filteredJobs.length > 0 ? (
            filteredJobs.map(job => (
              <div 
                key={job.id} 
                className="bg-white p-6 rounded-[2.75rem] shadow-card border border-gray-100/60 active:scale-[0.98] transition-all group overflow-hidden relative"
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
                <div onClick={() => onSelectJob(job)}>
                  <div className="absolute top-0 right-16 p-4">
                     <span className="px-3 py-1 bg-green-50 text-green-600 text-[9px] font-black uppercase rounded-lg border border-green-100">Verified</span>
                  </div>
                  <div className="flex items-start gap-5 mb-6">
                  <div className="w-16 h-16 bg-gray-50 rounded-[1.5rem] flex items-center justify-center shrink-0 border border-gray-100 group-hover:bg-primary-soft transition-colors shadow-sm">
                    <span className="material-icons-round text-gray-400 group-hover:text-primary text-3xl transition-colors">business_center</span>
                  </div>
                  <div className="pr-12">
                    <h3 className="text-[19px] font-bold text-accent leading-tight group-hover:text-primary transition-colors">{job.title}</h3>
                    <p className="text-gray-400 text-[11px] font-black uppercase tracking-[0.15em] mt-1.5">{job.company}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="flex items-center gap-3 p-3.5 bg-gray-50/70 rounded-2xl border border-gray-100/50">
                    <span className="material-icons-round text-primary text-lg">payments</span>
                    <span className="text-[11px] font-black text-accent">{job.salary}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3.5 bg-gray-50/70 rounded-2xl border border-gray-100/50">
                    <span className="material-icons-round text-primary text-lg">work</span>
                    <span className="text-[11px] font-black text-accent">{job.experience}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-5 border-t border-gray-50">
                  <div className="flex items-center gap-2 text-gray-400">
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
                      <span className="material-icons-round text-lg text-primary/40">location_on</span>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest truncate max-w-[140px]">{job.location}</span>
                  </div>
                  <button className="px-8 py-3 bg-accent text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-accent/10 active:bg-primary transition-all">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center animate-fade-in bg-white rounded-[3rem] border border-dashed border-gray-200 shadow-inner-soft">
              <div className="w-24 h-24 bg-gray-50 rounded-[2.5rem] flex items-center justify-center mb-6 shadow-card border border-gray-100">
                <span className="material-icons-round text-gray-200 text-6xl">search_off</span>
              </div>
              <h3 className="text-xl font-display font-bold text-accent">No Careers Found</h3>
              <p className="text-sm text-gray-400 max-w-[260px] mt-3 font-medium leading-relaxed">
                We couldn't find any roles matching these filters. Try resetting or adjusting your search.
              </p>
              <button 
                onClick={clearAllFilters}
                className="mt-10 px-10 py-4 bg-primary text-white rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] shadow-premium shadow-primary/30 active:scale-95 transition-all flex items-center gap-3"
              >
                <span className="material-icons-round">refresh</span>
                Clear All
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
