import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { OfflineIndicator } from './components/OfflineIndicator';
import { DailyQuizBanner } from './components/DailyQuizBanner';
import { CategoryCards } from './components/CategoryCards';
import { QuizPlayer } from './components/QuizPlayer';
import { MockTestCatalog } from './components/MockTestCatalog';
import { MockTestPlayer } from './components/MockTestPlayer';
import { RevisionBookmarks } from './components/RevisionBookmarks';
import { LeaderboardSection } from './components/LeaderboardSection';
import { AnalyticsSection } from './components/AnalyticsSection';
import { WalletSection } from './components/WalletSection';
import { AdminDashboard } from './components/AdminDashboard';
import { AuthModal } from './components/AuthModal';
import { PlatformPackagingModal } from './components/PlatformPackagingModal';
import { InstallModal } from './components/InstallModal';
import {
  Flame,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Clock,
  Smartphone,
  Shield,
  Download,
} from 'lucide-react';

const AppContent: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    selectedCategory,
    user,
    language,
    toast,
    setPackagingModalOpen,
    installModalOpen,
    setInstallModalOpen,
  } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      
      {/* 3-Zone Top Navigation Bar */}
      <Header />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-12">
        
        {/* Toast Notification */}
        {toast && (
          <div
            className={`fixed top-20 right-4 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl shadow-xl border text-xs font-semibold backdrop-blur-md animate-in slide-in-from-top-2 ${
              toast.type === 'success'
                ? 'bg-emerald-900/90 border-emerald-700 text-white'
                : toast.type === 'error'
                ? 'bg-rose-900/90 border-rose-700 text-white'
                : 'bg-slate-900/90 border-slate-700 text-white'
            }`}
          >
            {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
            {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400" />}
            <span>{toast.message}</span>
          </div>
        )}

        {/* HOME VIEW */}
        {activeTab === 'home' && (
          <div className="space-y-8">
            {/* Daily Streak Banner & Challenge Prompt */}
            <DailyQuizBanner />

            {/* Quick Aspirant Status Strip */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-700 dark:text-slate-200 text-sm">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{user.name}</span>
                    <span className="text-xs text-slate-400">·</span>
                    <span className="text-xs text-slate-500 font-medium">{user.targetExam}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                    <span>State: <strong className="text-slate-700 dark:text-slate-300">{user.state}</strong></span>
                    <span aria-hidden="true">·</span>
                    <span>Knowledge Points: <strong className="text-amber-600 dark:text-amber-400 font-mono">{user.knowledgePoints} KP</strong></span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('analytics')}
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition flex items-center gap-1.5"
                >
                  <TrendingUp className="w-3.5 h-3.5 text-indigo-500" />
                  <span>{language === 'hi' ? 'सटीकता रिपोर्ट' : 'Accuracy Report'}</span>
                </button>

                <button
                  onClick={() => setActiveTab('practice')}
                  className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 transition flex items-center gap-1.5"
                >
                  <span>{language === 'hi' ? 'अभ्यास शुरू करें' : 'Start Practice'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Core Categories with Visual Cards */}
            <CategoryCards />

            {/* Quick Mock Tests Feature Strip */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                  Real Exam Simulation
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {language === 'hi'
                    ? 'अखिल भारतीय स्पीड मॉक टेस्ट #1 (नेगेटिव मार्किंग सहित)'
                    : 'All-India General Studies Speed Mock #1 (With Negative Marking)'}
                </h3>
                <p className="text-xs text-slate-500">
                  10 Questions · 10 Minutes · Negative Marking (-0.66) · Instant All-India Rank
                </p>
              </div>

              <button
                onClick={() => setActiveTab('mock-test')}
                className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold hover:bg-slate-800 transition whitespace-nowrap self-start md:self-auto shadow-xs"
              >
                {language === 'hi' ? 'मॉक टेस्ट कैटलॉग देखें' : 'View Mock Test Catalog'}
              </button>
            </div>

            {/* Install & Download App Banner */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-slate-800 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
                  <Smartphone className="w-4 h-4" />
                  <span>Progressive Web App (PWA) & Android</span>
                </div>
                <h3 className="text-base font-bold text-white">
                  {language === 'hi'
                    ? 'QuizEarn India ऐप डाउनलोड करें'
                    : 'Download & Install QuizEarn India'}
                </h3>
                <p className="text-xs text-slate-300">
                  {language === 'hi'
                    ? 'अपने फ़ोन या डेस्कटॉप पर सीधे इंस्टॉल करें — ऑफ़लाइन मोड एवं पूर्ण स्क्रीन अनुभव'
                    : 'Install directly on Android, iPhone, or Desktop with full offline caching and full-screen exam mode'}
                </p>
              </div>

              <button
                onClick={() => setInstallModalOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition flex items-center justify-center gap-2 shadow-xs whitespace-nowrap shrink-0"
              >
                <Download className="w-4 h-4" />
                <span>{language === 'hi' ? 'इंस्टॉल / डाउनलोड करें' : 'Download / Install'}</span>
              </button>
            </div>
          </div>
        )}

        {/* PRACTICE VIEW */}
        {activeTab === 'practice' && (
          <QuizPlayer categoryOverride={selectedCategory} />
        )}

        {/* MOCK TESTS CATALOG VIEW */}
        {activeTab === 'mock-test' && (
          <MockTestCatalog />
        )}

        {/* MOCK TEST ACTIVE RUNNING */}
        {activeTab === 'mock-test-running' && (
          <MockTestPlayer />
        )}

        {/* REVISION & BOOKMARKS VIEW */}
        {activeTab === 'revision' && (
          <RevisionBookmarks />
        )}

        {/* LEADERBOARD VIEW */}
        {activeTab === 'leaderboard' && (
          <LeaderboardSection />
        )}

        {/* ANALYTICS VIEW */}
        {activeTab === 'analytics' && (
          <AnalyticsSection />
        )}

        {/* WALLET & REWARDS VIEW */}
        {activeTab === 'wallet' && (
          <WalletSection />
        )}

        {/* ADMIN DASHBOARD VIEW */}
        {activeTab === 'admin' && (
          <AdminDashboard />
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-8 text-xs text-slate-500 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900 dark:text-white">QuizEarn India</span>
            <span>·</span>
            <span>Educational Competitive Exam Preparation Platform</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-medium">
            <button
              onClick={() => setActiveTab('wallet')}
              className="hover:text-slate-900 dark:hover:text-white transition"
            >
              Legal & Payout Policy
            </button>
            <span>·</span>
            <button
              onClick={() => setPackagingModalOpen(true)}
              className="text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 font-semibold"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Android & iOS Packaging Guide</span>
            </button>
            <span>·</span>
            <button
              onClick={() => setActiveTab('admin')}
              className="hover:text-slate-900 dark:hover:text-white transition flex items-center gap-1"
            >
              <Shield className="w-3.5 h-3.5 text-indigo-500" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Floating Offline Status Indicator */}
      <OfflineIndicator />

      {/* Mobile Touch Bottom Nav */}
      <BottomNav />

      {/* Interactive Modals */}
      <AuthModal />
      <PlatformPackagingModal />
      <InstallModal isOpen={installModalOpen} onClose={() => setInstallModalOpen(false)} />

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
