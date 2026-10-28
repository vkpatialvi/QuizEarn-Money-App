import React from 'react';
import { Moon, Sun, User, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PWAInstallButton } from './PWAInstallButton';

export const Header: React.FC = () => {
  const {
    language,
    setLanguage,
    theme,
    toggleTheme,
    user,
    activeTab,
    setActiveTab,
    setAuthModalOpen,
  } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 md:gap-8">
        
        {/* Zone 1: Single Text Element Wordmark */}
        <button
          onClick={() => setActiveTab('home')}
          className="text-lg md:text-xl font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 flex items-center gap-2 text-left"
        >
          <span className="w-8 h-8 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-black text-sm tracking-tighter">
            QE
          </span>
          <span>QuizEarn India</span>
        </button>

        {/* Zone 2: 4-5 Concise Single-line Nav Links (Hidden on small mobile, visible on md+) */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
          <button
            onClick={() => setActiveTab('practice')}
            className={`transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'practice'
                ? 'text-slate-900 dark:text-white font-semibold'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {language === 'hi' ? 'अभ्यास' : 'Practice'}
          </button>

          <button
            onClick={() => setActiveTab('mock-test')}
            className={`transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'mock-test'
                ? 'text-slate-900 dark:text-white font-semibold'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {language === 'hi' ? 'मॉक टेस्ट' : 'Mock Tests'}
          </button>

          <button
            onClick={() => setActiveTab('revision')}
            className={`transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'revision'
                ? 'text-slate-900 dark:text-white font-semibold'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {language === 'hi' ? 'रिवीजन' : 'Revision'}
          </button>

          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'leaderboard'
                ? 'text-slate-900 dark:text-white font-semibold'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {language === 'hi' ? 'रैंकिंग' : 'Leaderboard'}
          </button>

          <button
            onClick={() => setActiveTab('wallet')}
            className={`transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'wallet'
                ? 'text-slate-900 dark:text-white font-semibold'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {language === 'hi' ? 'रिवॉर्ड्स व वॉलेट' : 'Rewards & Wallet'}
          </button>

          <button
            onClick={() => setActiveTab('admin')}
            className={`transition-colors whitespace-nowrap shrink-0 text-xs flex items-center gap-1 ${
              activeTab === 'admin'
                ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'hover:text-indigo-600 dark:hover:text-indigo-400'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'एडमिन' : 'Admin'}</span>
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action + Utility Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* PWA Install Button */}
          <div className="hidden sm:block">
            <PWAInstallButton compact />
          </div>

          {/* Bilingual Toggle (English / हिंदी) */}
          <div className="flex items-center rounded-lg bg-slate-100 dark:bg-slate-800 p-0.5 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                language === 'en'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-2 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                language === 'hi'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              हिं
            </button>
          </div>

          {/* Dark / Light Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Primary User Action */}
          <button
            onClick={() => setAuthModalOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 dark:bg-slate-100 dark:text-slate-900 rounded-lg hover:bg-slate-800 dark:hover:bg-white transition-colors whitespace-nowrap shrink-0 shadow-xs"
          >
            <User className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{user.name ? user.name.split(' ')[0] : 'Sign In'}</span>
            <span className="sm:hidden">{language === 'hi' ? 'प्रोफ़ाइल' : 'Profile'}</span>
          </button>
        </div>

      </div>
    </header>
  );
};
