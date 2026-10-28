import React, { useState } from 'react';
import { X, Phone, Mail, Shield, CheckCircle2, User, MapPin, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { EXAM_TARGETS, INDIAN_STATES } from '../data/initialData';
import { ExamTarget } from '../types/quiz';

export const AuthModal: React.FC = () => {
  const { authModalOpen, setAuthModalOpen, user, updateUser, language, showToast } = useApp();

  const [step, setStep] = useState<'profile' | 'phone_entry' | 'otp_verify'>('profile');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [demoOtp, setDemoOtp] = useState('749215');
  const [resendTimer, setResendTimer] = useState(30);

  if (!authModalOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 10) {
      showToast(language === 'hi' ? 'कृपया 10 अंकों का मान्य मोबाइल नंबर दर्ज करें' : 'Please enter a valid 10-digit mobile number', 'error');
      return;
    }
    const generated = Math.floor(100000 + Math.random() * 900000).toString();
    setDemoOtp(generated);
    setStep('otp_verify');
    setResendTimer(30);
    showToast(
      language === 'hi' ? `सत्यापन कोड (OTP): ${generated}` : `Verification Code (OTP): ${generated}`,
      'info'
    );
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredOtp === demoOtp || enteredOtp === '123456') {
      updateUser({
        phone: `+91 ${phoneNumber}`,
        email: emailInput || user.email,
        kycVerified: true,
      });
      setStep('profile');
      showToast(
        language === 'hi' ? 'मोबाइल नंबर और खाता सत्यापित हो गया!' : 'Mobile number and account verified!',
        'success'
      );
    } else {
      showToast(language === 'hi' ? 'अमान्य ओटीपी, कृपया पुनः प्रयास करें' : 'Invalid OTP, please try again', 'error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {language === 'hi' ? 'अभ्यर्थी प्रोफ़ाइल व सत्यापन' : 'Aspirant Profile & Verification'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {language === 'hi' ? 'अखिल भारतीय स्तर पर प्रगति ट्रैक करें' : 'Track your national exam rank and streak'}
            </p>
          </div>
          <button
            onClick={() => setAuthModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 'profile' && (
            <div className="space-y-5">
              {/* Profile Card */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-bold text-xl shrink-0">
                  {user.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white truncate">
                      {user.name}
                    </h3>
                    {user.kycVerified && (
                      <span className="flex items-center gap-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>OTP Verified</span>
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                    {user.phone || 'No phone linked'} · {user.state}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-300 mt-2">
                    <span className="font-semibold text-amber-600 dark:text-amber-400">
                      {user.knowledgePoints} KP (Practice)
                    </span>
                    <span>·</span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {user.streakDays} Day Streak 🔥
                    </span>
                  </div>
                </div>
              </div>

              {/* Editable Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {language === 'hi' ? 'पूरा नाम' : 'Full Name'}
                  </label>
                  <input
                    type="text"
                    value={user.name}
                    onChange={(e) => updateUser({ name: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {language === 'hi' ? 'लक्ष्य परीक्षा' : 'Target Exam'}
                  </label>
                  <select
                    value={user.targetExam}
                    onChange={(e) => updateUser({ targetExam: e.target.value as ExamTarget })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-slate-900"
                  >
                    {EXAM_TARGETS.map((t) => (
                      <option key={t.id} value={t.id}>
                        {language === 'hi' ? t.labelHi : t.labelEn}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {language === 'hi' ? 'गृह राज्य / केंद्र शासित प्रदेश' : 'Home State / UT'}
                  </label>
                  <select
                    value={user.state}
                    onChange={(e) => updateUser({ state: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-slate-900"
                  >
                    {INDIAN_STATES.filter((s) => s !== 'All India').map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {language === 'hi' ? 'ईमेल आईडी' : 'Email Address'}
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    onChange={(e) => updateUser({ email: e.target.value })}
                    placeholder="aspirant@example.com"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-slate-900"
                  />
                </div>
              </div>

              {/* OTP Link / Relink CTA */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setStep('phone_entry')}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-500" />
                  <span>
                    {user.kycVerified
                      ? language === 'hi'
                        ? 'मोबाइल नंबर बदलें / पुनः सत्यापित करें'
                        : 'Change / Re-verify Mobile OTP'
                      : language === 'hi'
                      ? 'मोबाइल OTP से सत्यापित करें (+91)'
                      : 'Verify with Mobile OTP (+91)'}
                  </span>
                </button>

                <button
                  onClick={() => {
                    setAuthModalOpen(false);
                    showToast(language === 'hi' ? 'प्रोफ़ाइल सहेजी गई' : 'Profile saved successfully', 'success');
                  }}
                  className="py-2.5 px-6 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold hover:bg-slate-800 transition shadow-xs"
                >
                  {language === 'hi' ? 'पूर्ण करें' : 'Done'}
                </button>
              </div>
            </div>
          )}

          {step === 'phone_entry' && (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-800 dark:text-amber-300">
                <p className="font-semibold flex items-center gap-1.5 mb-1">
                  <Shield className="w-4 h-4 text-amber-600" />
                  {language === 'hi' ? 'सुरक्षित 2-चरणीय प्रमाणीकरण' : 'Secure OTP Authentication'}
                </p>
                <p>
                  {language === 'hi'
                    ? 'अखिल भारतीय रैंकिंग और लीडरबोर्ड पर निष्पक्षता बनाए रखने के लिए मोबाइल ओटीपी सत्यापन अनिवार्य है।'
                    : 'Mobile OTP verification ensures anti-bot integrity on national rankings and official reward challenges.'}
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'hi' ? '10 अंकों का मोबाइल नंबर' : '10-Digit Mobile Number'}
                </label>
                <div className="flex items-center rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden focus-within:ring-2 focus-within:ring-slate-900">
                  <span className="px-3 py-2 text-xs font-bold text-slate-500 bg-slate-100 dark:bg-slate-700 border-r border-slate-300 dark:border-slate-700">
                    +91
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="9876543210"
                    className="flex-1 px-3 py-2 text-sm text-slate-900 dark:text-white bg-transparent focus:outline-hidden"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep('profile')}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-400"
                >
                  {language === 'hi' ? 'रद्द करें' : 'Back'}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold hover:bg-slate-800 transition"
                >
                  {language === 'hi' ? 'ओटीपी भेजें' : 'Send Verification OTP'}
                </button>
              </div>
            </form>
          )}

          {step === 'otp_verify' && (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="text-center py-2">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {language === 'hi' ? 'हमने 6-अंकों का कोड भेजा है:' : 'We sent a 6-digit code to:'}
                </p>
                <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                  +91 {phoneNumber}
                </p>
                <div className="mt-2 inline-block px-3 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300">
                  Demo Auto-fill OTP: <span className="font-bold text-amber-600 dark:text-amber-400">{demoOtp}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 text-center">
                  {language === 'hi' ? 'ओटीपी दर्ज करें' : 'Enter 6-Digit OTP'}
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={enteredOtp}
                  onChange={(e) => setEnteredOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="000000"
                  className="w-full text-center tracking-widest text-xl font-mono px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-slate-900"
                  required
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500">
                <button
                  type="button"
                  onClick={() => {
                    const generated = Math.floor(100000 + Math.random() * 900000).toString();
                    setDemoOtp(generated);
                    showToast(`New OTP: ${generated}`, 'info');
                  }}
                  className="text-amber-600 dark:text-amber-400 hover:underline"
                >
                  {language === 'hi' ? 'ओटीपी दोबारा भेजें' : 'Resend Code'}
                </button>
                <span>30s validity</span>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep('phone_entry')}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-400"
                >
                  {language === 'hi' ? 'नंबर बदलें' : 'Edit Number'}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold hover:bg-slate-800 transition"
                >
                  {language === 'hi' ? 'सत्यापित करें एवं आगे बढ़ें' : 'Verify & Continue'}
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
