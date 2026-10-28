import React from 'react';
import { Home, BookOpen, Clock, Trophy, Wallet } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, language } = useApp();

  const tabs = [
    { id: 'home', labelEn: 'Home', labelHi: 'होम', icon: Home },
    { id: 'practice', labelEn: 'Practice', labelHi: 'अभ्यास', icon: BookOpen },
    { id: 'mock-test', labelEn: 'Mock Test', labelHi: 'मॉक टेस्ट', icon: Clock },
    { id: 'leaderboard', labelEn: 'Ranks', labelHi: 'रैंकिंग', icon: Trophy },
    { id: 'wallet', labelEn: 'Wallet', labelHi: 'वॉलेट', icon: Wallet },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 pb-safe">
      <nav className="grid grid-cols-5 items-center h-16 px-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center min-h-[48px] py-1 transition-colors ${
                isActive
                  ? 'text-amber-600 dark:text-amber-400 font-semibold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
              <span className="text-[10px] tracking-tight mt-1 whitespace-nowrap truncate max-w-[64px]">
                {language === 'hi' ? tab.labelHi : tab.labelEn}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
