
import React, { useState, useEffect } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { BottomNav } from './components/BottomNav';
import { Home } from './screens/Home';
import { Search } from './screens/Search';
import { HireSearch } from './screens/HireSearch';
import { JobDetails } from './screens/JobDetails';
import { TalentDetails } from './screens/TalentDetails';
import { Menu } from './screens/Menu';
import { Favorites } from './screens/Favorites';
import { Chats } from './screens/Chats';
import { AdminDashboard } from './screens/AdminDashboard';
import { AdminLogin } from './screens/AdminLogin';
import { IntentModal } from './components/IntentModal';
import { Login } from './screens/Login';
import { Profile } from './screens/Profile';
import { Tracker } from './screens/Tracker';
import { RecruiterDashboard } from './screens/RecruiterDashboard';
import { PostJob } from './screens/PostJob';
import { AICoach } from './screens/AICoach';
import { CompanyProfile } from './screens/CompanyProfile';
import { AppScreen, Job, Category, Talent } from './types';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(AppScreen.SPLASH);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedTalent, setSelectedTalent] = useState<Talent | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(undefined);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showIntentModal, setShowIntentModal] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  useEffect(() => {
    if (currentScreen === AppScreen.SPLASH) {
      const timer = setTimeout(() => {
        const savedScreen = localStorage.getItem('token_current_screen');
        setCurrentScreen(savedScreen ? (savedScreen as AppScreen) : AppScreen.LOGIN);
      }, 1500);
      return () => clearTimeout(timer);
    }
    localStorage.setItem('token_current_screen', currentScreen);
  }, [currentScreen]);

  const handleNavigate = (screen: AppScreen) => {
    setCurrentScreen(screen);
    window.scrollTo(0, 0);
  };

  const toggleFavorite = (jobId: string) => {
    setFavorites(prev => 
      prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId]
    );
  };

  const startDownload = () => {
    setIsDownloading(true);
    setDownloadProgress(0);
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsDownloading(false), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case AppScreen.LOGIN:
        return <Login onLogin={() => handleNavigate(AppScreen.HOME)} />;
      case AppScreen.HOME:
        return (
          <Home 
            onSelectCategory={(cat) => { setSelectedCategory(cat); handleNavigate(AppScreen.SEARCH); }} 
            onSelectJob={(job) => { setSelectedJob(job); handleNavigate(AppScreen.DETAILS); }}
            onSearch={() => handleNavigate(AppScreen.SEARCH)}
            onDownload={startDownload}
            onNavigate={handleNavigate}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        );
      case AppScreen.SEARCH:
        return <Search initialCategory={selectedCategory} onSelectJob={(job) => { setSelectedJob(job); handleNavigate(AppScreen.DETAILS); }} onBack={() => handleNavigate(AppScreen.HOME)} favorites={favorites} onToggleFavorite={toggleFavorite} />;
      case AppScreen.DETAILS:
        return selectedJob ? <JobDetails job={selectedJob} onBack={() => handleNavigate(AppScreen.SEARCH)} /> : null;
      case AppScreen.TRACKER:
        return <Tracker onBack={() => handleNavigate(AppScreen.HOME)} />;
      case AppScreen.PROFILE:
        return <Profile onBack={() => handleNavigate(AppScreen.HOME)} onNavigate={handleNavigate} />;
      case AppScreen.RECRUITER_DASHBOARD:
        return <RecruiterDashboard onBack={() => handleNavigate(AppScreen.HOME)} onPostJob={() => handleNavigate(AppScreen.POST_JOB)} onNavigate={handleNavigate} />;
      case AppScreen.POST_JOB:
        return <PostJob onBack={() => handleNavigate(AppScreen.RECRUITER_DASHBOARD)} />;
      case AppScreen.HIRE_SEARCH:
        return <HireSearch onSelectTalent={(t) => { setSelectedTalent(t); handleNavigate(AppScreen.TALENT_DETAILS); }} onBack={() => handleNavigate(AppScreen.HOME)} />;
      case AppScreen.TALENT_DETAILS:
        return selectedTalent ? <TalentDetails talent={selectedTalent} onBack={() => handleNavigate(AppScreen.HIRE_SEARCH)} /> : null;
      case AppScreen.FAVORITES:
        return <Favorites onSelectJob={(job) => { setSelectedJob(job); handleNavigate(AppScreen.DETAILS); }} onBack={() => handleNavigate(AppScreen.HOME)} favorites={favorites} />;
      case AppScreen.CHATS:
        return <Chats />;
      case AppScreen.MENU:
        return <Menu onBack={() => handleNavigate(AppScreen.HOME)} onDownload={startDownload} onNavigate={handleNavigate} />;
      case AppScreen.ADMIN_LOGIN:
        return <AdminLogin onLoginSuccess={() => handleNavigate(AppScreen.ADMIN)} onBack={() => handleNavigate(AppScreen.HOME)} />;
      case AppScreen.ADMIN:
        return <AdminDashboard onBack={() => handleNavigate(AppScreen.MENU)} />;
      case AppScreen.AI_COACH:
        return <AICoach onBack={() => handleNavigate(AppScreen.HOME)} />;
      case AppScreen.COMPANY_PROFILE:
        return <CompanyProfile onBack={() => handleNavigate(AppScreen.RECRUITER_DASHBOARD)} onNavigate={handleNavigate} />;
      default:
        return null;
    }
  };

  const hideNav = [AppScreen.SPLASH, AppScreen.LOGIN, AppScreen.ADMIN, AppScreen.ADMIN_LOGIN, AppScreen.DETAILS, AppScreen.TALENT_DETAILS, AppScreen.POST_JOB, AppScreen.AI_COACH, AppScreen.COMPANY_PROFILE].includes(currentScreen);

  return (
    <div className={`mx-auto bg-background h-screen relative flex flex-col overflow-hidden shadow-2xl transition-all duration-500 ${currentScreen === AppScreen.ADMIN ? 'w-full max-w-none' : 'max-w-md'}`}>
      {currentScreen === AppScreen.SPLASH && <SplashScreen />}
      
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {renderScreen()}
      </div>
      
      {!hideNav && (
        <BottomNav 
          currentScreen={currentScreen} 
          onNavigate={handleNavigate} 
          onPlaceAd={() => setShowIntentModal(true)}
        />
      )}

      {isDownloading && (
        <div className="fixed inset-0 z-[100] bg-accent/95 backdrop-blur-xl flex flex-col items-center justify-center p-8 animate-fade-in text-white text-center">
          <div className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center mb-6 animate-bounce shadow-premium">
            <span className="material-icons-round text-4xl">downloading</span>
          </div>
          <h2 className="text-2xl font-display font-bold mb-4">Downloading Token...</h2>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
             <div className="h-full bg-primary" style={{ width: `${downloadProgress}%` }}></div>
          </div>
          <span className="mt-4 font-black text-3xl">{downloadProgress}%</span>
        </div>
      )}

      {showIntentModal && (
        <IntentModal 
          onClose={() => setShowIntentModal(false)}
          onSelect={(intent) => {
            setShowIntentModal(false);
            if (intent === 'find') handleNavigate(AppScreen.SEARCH);
            else handleNavigate(AppScreen.RECRUITER_DASHBOARD);
          }}
        />
      )}
    </div>
  );
};

export default App;
