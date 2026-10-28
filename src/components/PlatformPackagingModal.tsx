import React, { useState } from 'react';
import { X, Smartphone, Globe, Terminal, Shield, CheckCircle2, Copy, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PlatformPackagingModal: React.FC = () => {
  const { packagingModalOpen, setPackagingModalOpen, language } = useApp();
  const [activePlatformTab, setActivePlatformTab] = useState<'pwa' | 'android' | 'ios' | 'backend'>('android');
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  if (!packagingModalOpen) return null;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="w-full max-w-4xl max-h-[90vh] rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-amber-500" />
              <span>QuizEarn India — Cross-Platform Packaging & Architecture</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Complete production build, deployment, Android Google Play, and iOS App Store specifications
            </p>
          </div>
          <button
            onClick={() => setPackagingModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 shrink-0 overflow-x-auto">
          {[
            { id: 'android', label: 'Android (Google Play)' },
            { id: 'ios', label: 'iOS (Apple App Store)' },
            { id: 'pwa', label: 'Progressive Web App (PWA)' },
            { id: 'backend', label: 'FastAPI / NestJS Backend' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActivePlatformTab(tab.id as any)}
              className={`pb-3 px-3 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors ${
                activePlatformTab === tab.id
                  ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700 dark:text-slate-300">
          
          {/* ANDROID TAB */}
          {activePlatformTab === 'android' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40">
                <h3 className="font-bold text-emerald-900 dark:text-emerald-200 text-sm">
                  Android APK & AAB Packaging (Capacitor or Expo)
                </h3>
                <p className="mt-1 text-slate-600 dark:text-slate-300">
                  Build native Android application bundle targeting Android 14/15 (API 34/35) compliant with Google Play Store policies for educational and quiz applications.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
                  Step 1: Initialize Capacitor in this project
                </h4>
                <div className="relative p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto">
                  <code>
                    npm install @capacitor/core @capacitor/cli @capacitor/android<br />
                    npx cap init "QuizEarn India" "com.quizearn.india" --web-dir dist<br />
                    npm run build<br />
                    npx cap add android<br />
                    npx cap copy android
                  </code>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        'npm install @capacitor/core @capacitor/cli @capacitor/android\nnpx cap init "QuizEarn India" "com.quizearn.india" --web-dir dist\nnpm run build\nnpx cap add android\nnpx cap copy android',
                        'cap_android'
                      )
                    }
                    className="absolute top-2 right-2 p-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300"
                  >
                    {copiedSnippet === 'cap_android' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
                  Step 2: AndroidManifest.xml Configuration
                </h4>
                <p>Ensure network state, vibration (for haptic test feedback), and internet permissions are defined:</p>
                <div className="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto">
                  <pre>{`<manifest xmlns:android="http://schemas.android.com/apk/res/android" package="com.quizearn.india">
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.VIBRATE" />
    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="QuizEarn India"
        android:theme="@style/AppTheme"
        android:usesCleartextTraffic="false">
        <activity android:name=".MainActivity" android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>`}</pre>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
                  Step 3: Generate Signed Production Android App Bundle (.aab)
                </h4>
                <div className="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px]">
                  <code>
                    cd android<br />
                    ./gradlew bundleRelease<br />
                    # Output: android/app/build/outputs/bundle/release/app-release.aab
                  </code>
                </div>
              </div>
            </div>
          )}

          {/* IOS TAB */}
          {activePlatformTab === 'ios' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/40">
                <h3 className="font-bold text-blue-900 dark:text-blue-200 text-sm">
                  iOS Workspace & Apple App Store Packaging
                </h3>
                <p className="mt-1 text-slate-600 dark:text-slate-300">
                  Compliant with Apple Human Interface Guidelines and App Store Review Guidelines (Section 4.2 Minimum Functionality, Section 5.3 Gaming & Contests).
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
                  Step 1: Add iOS Platform & CocoaPods
                </h4>
                <div className="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px]">
                  <code>
                    npm install @capacitor/ios<br />
                    npx cap add ios<br />
                    npx cap open ios
                  </code>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
                  Step 2: Xcode Configuration & Info.plist
                </h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Set Deployment Target to <strong>iOS 16.0+</strong>.</li>
                  <li>Enable <strong>Automatic Signing</strong> with your Apple Developer Team ID.</li>
                  <li>In <code>App/Info.plist</code>, specify standard privacy explanations and status bar style.</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
                  Step 3: Archive and Upload to TestFlight / App Store Connect
                </h4>
                <p>In Xcode: <code>Product &gt; Archive &gt; Distribute App &gt; App Store Connect &gt; Upload</code>.</p>
              </div>
            </div>
          )}

          {/* PWA TAB */}
          {activePlatformTab === 'pwa' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40">
                <h3 className="font-bold text-amber-900 dark:text-amber-200 text-sm">
                  Progressive Web App (PWA) Verification
                </h3>
                <p className="mt-1 text-slate-600 dark:text-slate-300">
                  Installed directly on desktop Chrome, Edge, and mobile Chrome/Safari with offline caching.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
                  Live PWA Features Configured in this Applet:
                </h4>
                <ul className="space-y-1.5">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span><code>/manifest.webmanifest</code> with standalone display mode, safe colors, and icons.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span><code>vite-plugin-pwa</code> active in <code>vite.config.ts</code> with automatic service worker registration.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>In-app install button (<code>PWAInstallButton</code>) mounted in header with guided iOS Safari flow.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Offline indicator banner (<code>OfflineIndicator</code>) listening to network status changes.</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* BACKEND TAB */}
          {activePlatformTab === 'backend' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/40">
                <h3 className="font-bold text-purple-900 dark:text-purple-200 text-sm">
                  Production Full-Stack Architecture (FastAPI/NestJS + PostgreSQL + Redis)
                </h3>
                <p className="mt-1 text-slate-600 dark:text-slate-300">
                  Server-side scoring, anti-bot validation, rate limiting, and auditable financial double-entry ledger.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
                  PostgreSQL Database Schema (Relational DDL)
                </h4>
                <div className="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto">
                  <pre>{`-- Users & Authentication
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone_number VARCHAR(15) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    target_exam VARCHAR(50) NOT NULL,
    state VARCHAR(50) NOT NULL,
    kyc_status VARCHAR(20) DEFAULT 'UNVERIFIED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Questions Repository with Verified Sources
CREATE TABLE questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id VARCHAR(50) NOT NULL,
    subtopic_en TEXT NOT NULL,
    subtopic_hi TEXT,
    question_en TEXT NOT NULL,
    question_hi TEXT NOT NULL,
    options_en JSONB NOT NULL,
    options_hi JSONB NOT NULL,
    correct_index INT NOT NULL,
    explanation_en TEXT NOT NULL,
    explanation_hi TEXT NOT NULL,
    source_title TEXT NOT NULL,
    source_url TEXT,
    publication_date DATE,
    verified BOOLEAN DEFAULT TRUE
);

-- Auditable Financial & Points Ledger
CREATE TABLE wallet_ledger (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    currency VARCHAR(10) NOT NULL, -- 'KP' or 'INR'
    amount DECIMAL(10,2) NOT NULL,
    transaction_type VARCHAR(50) NOT NULL,
    status VARCHAR(30) NOT NULL, -- 'COMPLETED', 'COMPLIANCE_HOLD'
    reference_id VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`}</pre>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
                  Redis Anti-Bot & Speed Check Configuration
                </h4>
                <p>
                  Server compares submitted answer timestamps against minimum human reading speed (e.g. at least 6 seconds per question) to prevent automated scrapers and headless bots.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-slate-400">
            QuizEarn India System Build Specification
          </span>
          <button
            onClick={() => setPackagingModalOpen(false)}
            className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 transition"
          >
            Close Documentation
          </button>
        </div>

      </div>
    </div>
  );
};
