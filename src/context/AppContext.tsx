import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Bookmark,
  CategoryId,
  Language,
  LeaderboardUser,
  MockTestSession,
  Question,
  QuestionReport,
  UserProfile,
  WalletTransaction,
} from '../types/quiz';
import { INITIAL_QUESTIONS } from '../data/questionsData';
import { DEFAULT_USER, INITIAL_LEADERBOARD, INITIAL_TRANSACTIONS } from '../data/initialData';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  user: UserProfile;
  updateUser: (fields: Partial<UserProfile>) => void;
  questions: Question[];
  addQuestion: (q: Question) => void;
  updateQuestion: (id: string, q: Partial<Question>) => void;
  deleteQuestion: (id: string) => void;
  bookmarks: Bookmark[];
  toggleBookmark: (questionId: string) => void;
  isBookmarked: (questionId: string) => boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedCategory: CategoryId | null;
  setSelectedCategory: (cat: CategoryId | null) => void;
  activeMockTest: MockTestSession | null;
  startMockTest: (titleEn: string, titleHi: string, questionCount?: number, timeMinutes?: number) => void;
  finishMockTest: (session: MockTestSession) => void;
  completedMocks: MockTestSession[];
  leaderboard: LeaderboardUser[];
  walletTransactions: WalletTransaction[];
  addWalletTransaction: (tx: Omit<WalletTransaction, 'id' | 'timestamp'>) => void;
  reports: QuestionReport[];
  submitReport: (qId: string, qText: string, reason: QuestionReport['reason'], details: string) => void;
  resolveReport: (reportId: string, newStatus: 'RESOLVED' | 'REJECTED') => void;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  packagingModalOpen: boolean;
  setPackagingModalOpen: (open: boolean) => void;
  installModalOpen: boolean;
  setInstallModalOpen: (open: boolean) => void;
  toast: { message: string; type: 'success' | 'info' | 'error' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Language (English / Hindi)
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('quizearn_lang') as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('quizearn_lang', lang);
  };

  // Theme
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('quizearn_theme') as 'light' | 'dark') || 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('quizearn_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // User Profile
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('quizearn_user');
    return saved ? JSON.parse(saved) : DEFAULT_USER;
  });

  const updateUser = (fields: Partial<UserProfile>) => {
    setUser((prev) => {
      const updated = { ...prev, ...fields };
      localStorage.setItem('quizearn_user', JSON.stringify(updated));
      return updated;
    });
  };

  // Questions Bank
  const [questions, setQuestions] = useState<Question[]>(() => {
    const saved = localStorage.getItem('quizearn_questions');
    return saved ? JSON.parse(saved) : INITIAL_QUESTIONS;
  });

  const addQuestion = (q: Question) => {
    setQuestions((prev) => {
      const updated = [q, ...prev];
      localStorage.setItem('quizearn_questions', JSON.stringify(updated));
      return updated;
    });
    showToast(language === 'hi' ? 'नया प्रश्न सफलतापूर्वक जोड़ा गया!' : 'New question added successfully!', 'success');
  };

  const updateQuestion = (id: string, qUpdates: Partial<Question>) => {
    setQuestions((prev) => {
      const updated = prev.map((q) => (q.id === id ? { ...q, ...qUpdates } : q));
      localStorage.setItem('quizearn_questions', JSON.stringify(updated));
      return updated;
    });
    showToast(language === 'hi' ? 'प्रश्न अपडेट कर दिया गया' : 'Question updated', 'success');
  };

  const deleteQuestion = (id: string) => {
    setQuestions((prev) => {
      const updated = prev.filter((q) => q.id !== id);
      localStorage.setItem('quizearn_questions', JSON.stringify(updated));
      return updated;
    });
    showToast(language === 'hi' ? 'प्रश्न हटा दिया गया' : 'Question deleted', 'info');
  };

  // Bookmarks
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
    const saved = localStorage.getItem('quizearn_bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  const toggleBookmark = (questionId: string) => {
    setBookmarks((prev) => {
      const exists = prev.some((b) => b.questionId === questionId);
      let updated: Bookmark[];
      if (exists) {
        updated = prev.filter((b) => b.questionId !== questionId);
        showToast(language === 'hi' ? 'बुकमार्क से हटाया गया' : 'Removed from bookmarks', 'info');
      } else {
        updated = [{ questionId, savedAt: new Date().toISOString() }, ...prev];
        showToast(language === 'hi' ? 'रिवीजन सूची में सहेजा गया' : 'Saved to revision list', 'success');
      }
      localStorage.setItem('quizearn_bookmarks', JSON.stringify(updated));
      return updated;
    });
  };

  const isBookmarked = (questionId: string) => {
    return bookmarks.some((b) => b.questionId === questionId);
  };

  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | null>(null);

  // Mock Tests
  const [activeMockTest, setActiveMockTest] = useState<MockTestSession | null>(null);
  const [completedMocks, setCompletedMocks] = useState<MockTestSession[]>(() => {
    const saved = localStorage.getItem('quizearn_mock_history');
    return saved ? JSON.parse(saved) : [];
  });

  const startMockTest = (titleEn: string, titleHi: string, questionCount: number = 8, timeMinutes: number = 10) => {
    const newSession: MockTestSession = {
      id: `mock-${Date.now()}`,
      title: { en: titleEn, hi: titleHi },
      totalQuestions: questionCount,
      timeLimitMinutes: timeMinutes,
      correctMarks: 2,
      negativeMarks: 0.66,
      startedAt: new Date().toISOString(),
      answers: {},
    };
    setActiveMockTest(newSession);
    setActiveTab('mock-test-running');
  };

  const finishMockTest = (session: MockTestSession) => {
    setCompletedMocks((prev) => {
      const updated = [session, ...prev];
      localStorage.setItem('quizearn_mock_history', JSON.stringify(updated));
      return updated;
    });
    setActiveMockTest(null);

    // Award Knowledge Points
    const earnedKP = Math.max(20, Math.round((session.score || 0) * 15));
    updateUser({
      knowledgePoints: user.knowledgePoints + earnedKP,
    });

    addWalletTransaction({
      type: 'CREDIT_KP',
      amount: earnedKP,
      currency: 'KP',
      description: {
        en: `Completed Mock Test: ${session.title.en} (Score: ${session.score?.toFixed(1)})`,
        hi: `मॉक टेस्ट पूरा किया: ${session.title.hi} (अंक: ${session.score?.toFixed(1)})`,
      },
      status: 'COMPLETED',
      referenceId: session.id,
    });
  };

  // Leaderboard
  const [leaderboard] = useState<LeaderboardUser[]>(INITIAL_LEADERBOARD);

  // Wallet
  const [walletTransactions, setWalletTransactions] = useState<WalletTransaction[]>(() => {
    const saved = localStorage.getItem('quizearn_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const addWalletTransaction = (tx: Omit<WalletTransaction, 'id' | 'timestamp'>) => {
    const newTx: WalletTransaction = {
      ...tx,
      id: `tx-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
    };
    setWalletTransactions((prev) => {
      const updated = [newTx, ...prev];
      localStorage.setItem('quizearn_transactions', JSON.stringify(updated));
      return updated;
    });
  };

  // Question Reports (for QA / Reporting errors)
  const [reports, setReports] = useState<QuestionReport[]>(() => {
    const saved = localStorage.getItem('quizearn_reports');
    return saved ? JSON.parse(saved) : [];
  });

  const submitReport = (qId: string, qText: string, reason: QuestionReport['reason'], details: string) => {
    const newReport: QuestionReport = {
      id: `rep-${Date.now()}`,
      questionId: qId,
      questionText: qText,
      reason,
      details,
      reportedBy: user.phone || user.email || 'Aspirant',
      reportedAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
      status: 'PENDING',
    };
    setReports((prev) => {
      const updated = [newReport, ...prev];
      localStorage.setItem('quizearn_reports', JSON.stringify(updated));
      return updated;
    });
    showToast(
      language === 'hi' ? 'आपकी रिपोर्ट दर्ज हो गई है। हमारी संपादकीय टीम इसकी समीक्षा करेगी।' : 'Report submitted. Our editorial team will review this question.',
      'success'
    );
  };

  const resolveReport = (reportId: string, newStatus: 'RESOLVED' | 'REJECTED') => {
    setReports((prev) => {
      const updated = prev.map((r) => (r.id === reportId ? { ...r, status: newStatus } : r));
      localStorage.setItem('quizearn_reports', JSON.stringify(updated));
      return updated;
    });
    showToast(language === 'hi' ? `रिपोर्ट ${newStatus === 'RESOLVED' ? 'स्वीकृत' : 'खारिज'} की गई` : `Report ${newStatus.toLowerCase()}`, 'info');
  };

  // Modals & UI states
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [packagingModalOpen, setPackagingModalOpen] = useState(false);
  const [installModalOpen, setInstallModalOpen] = useState(false);

  // Toast
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        theme,
        toggleTheme,
        user,
        updateUser,
        questions,
        addQuestion,
        updateQuestion,
        deleteQuestion,
        bookmarks,
        toggleBookmark,
        isBookmarked,
        activeTab,
        setActiveTab,
        selectedCategory,
        setSelectedCategory,
        activeMockTest,
        startMockTest,
        finishMockTest,
        completedMocks,
        leaderboard,
        walletTransactions,
        addWalletTransaction,
        reports,
        submitReport,
        resolveReport,
        authModalOpen,
        setAuthModalOpen,
        packagingModalOpen,
        setPackagingModalOpen,
        installModalOpen,
        setInstallModalOpen,
        toast,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
