import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { useApp } from '../context/AppContext';
import { InstallModal } from './InstallModal';

export const PWAInstallButton: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { isInstallable, isInstalled, install } = usePWAInstall();
  const [showModal, setShowModal] = useState(false);
  const { language } = useApp();

  const handleClick = async () => {
    if (isInstallable) {
      const outcome = await install();
      if (!outcome) {
        setShowModal(true);
      }
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={`flex items-center gap-1.5 font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
          compact
            ? 'px-2.5 py-1.5 text-xs text-amber-700 dark:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20'
            : 'px-3 py-1.5 text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 shadow-sm'
        }`}
        title="Install / Download QuizEarn India App"
      >
        <Download className="w-3.5 h-3.5" />
        <span>{language === 'hi' ? 'ऐप इंस्टॉल करें' : 'Install / Download App'}</span>
      </button>

      <InstallModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};
