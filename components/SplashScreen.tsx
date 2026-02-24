
import React from 'react';

export const SplashScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-[#FF0000] flex flex-col items-center justify-center z-[100] animate-fade-in">
      <div className="flex flex-col items-center">
        <div className="mb-4">
          <span className="material-icons-round text-white text-8xl drop-shadow-lg">
            local_fire_department
          </span>
        </div>
        <h1 className="text-white font-display text-5xl font-bold tracking-tight mb-8">
          Token
        </h1>
        <div className="flex space-x-2">
          <div className="w-1.5 h-1.5 bg-white rounded-full opacity-60 animate-pulse"></div>
          <div className="w-1.5 h-1.5 bg-white rounded-full opacity-100 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-1.5 h-1.5 bg-white rounded-full opacity-60 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};
