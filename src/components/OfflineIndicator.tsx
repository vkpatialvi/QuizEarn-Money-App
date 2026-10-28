import React, { useEffect, useState } from 'react';
import { WifiOff } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const OfflineIndicator: React.FC = () => {
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const { language } = useApp();

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full bg-slate-900/95 dark:bg-slate-100/95 text-white dark:text-slate-900 px-4 py-2 text-xs font-medium shadow-xl border border-slate-700 dark:border-slate-300 backdrop-blur-md">
      <WifiOff className="w-3.5 h-3.5 text-amber-400" />
      <span>
        {language === 'hi'
          ? 'ऑफ़लाइन मोड — सहेजे गए अभ्यास प्रश्न उपलब्ध हैं'
          : 'Offline Mode — Cached practice questions available'}
      </span>
    </div>
  );
};
