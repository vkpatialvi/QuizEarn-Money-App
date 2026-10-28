import React, { useState } from 'react';
import {
  Download,
  Smartphone,
  Laptop,
  Apple,
  Share,
  CheckCircle2,
  Copy,
  Check,
  X,
  ExternalLink,
  Shield,
  Layers,
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { useApp } from '../context/AppContext';

export const InstallModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const { language, setPackagingModalOpen } = useApp();
  const [selectedDevice, setSelectedDevice] = useState<'android' | 'ios' | 'desktop' | 'source'>('android');
  const [copiedText, setCopiedText] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://ais-pre-s3jgbbrtbrcnhtuku2w4no-987789189516.asia-east1.run.app';

  const copyUrl = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-2xl rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-black text-sm">
              QE
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                {language === 'hi' ? 'QuizEarn India — डाउनलोड व इंस्टॉलेशन' : 'Install & Download QuizEarn India'}
              </h2>
              <p className="text-xs text-slate-500">
                {language === 'hi' ? 'मोबाइल, डेस्कटॉप और ऑफ़लाइन उपयोग के लिए' : 'For Mobile, Desktop, and Offline Practice'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick One-Click PWA Trigger if browser supports direct prompt */}
        {isInstallable && (
          <div className="px-6 py-3 bg-amber-500/10 border-b border-amber-200 dark:border-amber-900/40 flex items-center justify-between gap-3">
            <div className="text-xs text-amber-900 dark:text-amber-200">
              <span className="font-bold">Instant Installation Ready:</span> Click below to add directly to your home screen or desktop.
            </div>
            <button
              onClick={() => {
                install();
                onClose();
              }}
              className="px-4 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-xs shadow-xs whitespace-nowrap transition"
            >
              One-Click Install
            </button>
          </div>
        )}

        {/* Device selector tabs */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-x-auto">
          {[
            { id: 'android', label: 'Android Phone / Tablet', icon: Smartphone },
            { id: 'ios', label: 'iPhone / iPad (iOS)', icon: Apple },
            { id: 'desktop', label: 'PC / Mac / Chrome', icon: Laptop },
            { id: 'source', label: 'Full Source Code & APK', icon: Download },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = selectedDevice === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedDevice(tab.id as any)}
                className={`pb-3 px-3 text-xs font-semibold border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-colors ${
                  isActive
                    ? 'border-slate-900 dark:border-white text-slate-900 dark:text-white'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-600 dark:text-slate-300">
          
          {/* ANDROID INSTRUCTIONS */}
          {selectedDevice === 'android' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-3">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-emerald-500" />
                  <span>How to install on Android (No App Store required):</span>
                </h3>

                <div className="space-y-2.5">
                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      1
                    </span>
                    <p>
                      Open this application in <strong>Google Chrome</strong> or your default mobile browser on your Android device.
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      2
                    </span>
                    <p>
                      Tap the <strong>three dots menu (⋮)</strong> in the top-right corner of Chrome.
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      3
                    </span>
                    <p>
                      Tap <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      4
                    </span>
                    <p>
                      QuizEarn India will appear on your app launcher with full offline exam caching and full-screen experience just like a native Google Play app!
                    </p>
                  </div>
                </div>
              </div>

              {/* Share link box */}
              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
                <span className="truncate text-slate-500 font-mono text-[11px]">{currentUrl}</span>
                <button
                  onClick={copyUrl}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-[11px] flex items-center gap-1 shrink-0"
                >
                  {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedText ? 'Copied' : 'Copy Link'}</span>
                </button>
              </div>
            </div>
          )}

          {/* IOS INSTRUCTIONS */}
          {selectedDevice === 'ios' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-3">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                  <Apple className="w-4 h-4 text-slate-800 dark:text-slate-200" />
                  <span>How to install on iPhone & iPad:</span>
                </h3>

                <div className="space-y-2.5">
                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      1
                    </span>
                    <p>
                      Open this URL in <strong>Apple Safari</strong> on your iPhone or iPad.
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      2
                    </span>
                    <p>
                      Tap the <Share className="inline w-3.5 h-3.5 mx-1" /> <strong>Share</strong> button at the bottom navigation bar of Safari.
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      3
                    </span>
                    <p>
                      Scroll down in the share sheet and tap <strong>"Add to Home Screen"</strong>.
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      4
                    </span>
                    <p>
                      Tap <strong>"Add"</strong> in the top-right corner. The app will launch with a standalone native iOS frame.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* DESKTOP INSTRUCTIONS */}
          {selectedDevice === 'desktop' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-3">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                  <Laptop className="w-4 h-4 text-blue-500" />
                  <span>Desktop App (Chrome, Edge, or Brave on Windows/Mac/Linux):</span>
                </h3>

                <div className="space-y-2.5">
                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      1
                    </span>
                    <p>
                      Look at the right side of the browser's address bar (URL bar).
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      2
                    </span>
                    <p>
                      Click the <Download className="inline w-3.5 h-3.5 mx-1" /> <strong>"Install QuizEarn India"</strong> computer icon.
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      3
                    </span>
                    <p>
                      Click <strong>"Install"</strong> in the popup prompt. QuizEarn will launch in its own standalone window with desktop shortcuts.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SOURCE & LOCAL DEV INSTRUCTIONS */}
          {selectedDevice === 'source' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/40 space-y-2">
                <h3 className="font-bold text-purple-900 dark:text-purple-200 text-sm">
                  Run Locally & Build Standalone Android APK (.apk / .aab)
                </h3>
                <p>
                  Clone or download the project files and run on your local machine using Node.js:
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
                  1. Local Development Setup:
                </h4>
                <div className="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px]">
                  <code>
                    git clone &lt;repo-url&gt; quizearn-india<br />
                    cd quizearn-india<br />
                    npm install<br />
                    npm run dev
                  </code>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
                  2. Build Native Android APK with Capacitor:
                </h4>
                <div className="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px]">
                  <code>
                    npm run build<br />
                    npx cap add android<br />
                    npx cap copy android<br />
                    cd android &amp;&amp; ./gradlew assembleDebug<br />
                    # Generated APK: android/app/build/outputs/apk/debug/app-debug.apk
                  </code>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  setPackagingModalOpen(true);
                }}
                className="w-full py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition text-slate-800 dark:text-slate-200"
              >
                View Full Production Google Play & App Store Guide →
              </button>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>PWA & Standalone Compliant</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold hover:bg-slate-800 transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
