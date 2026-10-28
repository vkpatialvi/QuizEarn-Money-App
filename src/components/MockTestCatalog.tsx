import React from 'react';
import { Clock, Trophy, Play, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MockTestCatalog: React.FC = () => {
  const { startMockTest, completedMocks, language, setActiveTab } = useApp();

  const mockTests = [
    {
      id: 'mock-01',
      titleEn: 'All-India General Studies Speed Mock #1',
      titleHi: 'अखिल भारतीय सामान्य अध्ययन स्पीड मॉक #1',
      questionsCount: 10,
      timeMinutes: 10,
      marks: 20,
      negative: 0.66,
      target: 'UPSC CSE & State PSCs',
      badge: 'National Rank Eligible',
      descEn: 'Comprehensive test covering Indian Polity, Modern History, Current Affairs, and Geography with standard negative marking.',
      descHi: 'भारतीय राजव्यवस्था, आधुनिक इतिहास, समसामयिकी और भूगोल का व्यापक टेस्ट वास्तविक नेगेटिव मार्किंग के साथ।',
    },
    {
      id: 'mock-02',
      titleEn: 'SSC CGL 2024 Tier-1 Mini-Mock (General Awareness & Reasoning)',
      titleHi: 'एसएससी सीजीएल 2024 टियर-1 मिनी-मॉक (सामान्य ज्ञान एवं तर्कशक्ति)',
      questionsCount: 10,
      timeMinutes: 8,
      marks: 20,
      negative: 0.5,
      target: 'SSC CGL / CHSL',
      badge: 'Speed Drill',
      descEn: 'High-speed reasoning sequences, syllogisms, and general awareness questions mirroring the official SSC CGL examination pattern.',
      descHi: 'एसएससी सीजीएल परीक्षा पैटर्न पर आधारित त्वरित तर्कशक्ति और सामान्य जागरूकता प्रश्न।',
    },
    {
      id: 'mock-03',
      titleEn: 'Current Affairs 2024 PIB & National Policy Capsule',
      titleHi: 'समसामयिकी 2024 पीआईबी एवं राष्ट्रीय नीतियां कैप्सूल',
      questionsCount: 8,
      timeMinutes: 8,
      marks: 16,
      negative: 0.66,
      target: 'UPSC / Banking / PSC',
      badge: 'Verified Sources',
      descEn: 'Questions drafted from verified Government of India PIB press releases, The Hindu, and national summits with exact citation links.',
      descHi: 'पीआईबी, द हिंदू और राष्ट्रीय सम्मेलनों से तैयार किए गए प्रामाणिक समसामयिकी प्रश्न।',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Clock className="w-6 h-6 text-amber-500" />
          <span>{language === 'hi' ? 'समयबद्ध अखिल भारतीय मॉक टेस्ट' : 'Timed All-India Mock Tests'}</span>
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Simulate official computer-based exam conditions with countdown timer, negative marking, question palette, and All-India percentile.
        </p>
      </div>

      {/* Tests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {mockTests.map((test) => (
          <div
            key={test.id}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                  {test.target}
                </span>
                <span className="text-[11px] font-mono text-amber-600 dark:text-amber-400 font-semibold">
                  {test.badge}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                {language === 'hi' ? test.titleHi : test.titleEn}
              </h3>

              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                {language === 'hi' ? test.descHi : test.descEn}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 grid grid-cols-3 gap-2 text-center text-xs">
                <div>
                  <p className="text-slate-400 text-[10px]">Questions</p>
                  <p className="font-bold text-slate-800 dark:text-slate-200 font-mono">
                    {test.questionsCount}
                  </p>
                </div>
                <div>
                  <p className="text-slate-400 text-[10px]">Duration</p>
                  <p className="font-bold text-slate-800 dark:text-slate-200 font-mono">
                    {test.timeMinutes}m
                  </p>
                </div>
                <div>
                  <p className="text-slate-400 text-[10px]">Marking</p>
                  <p className="font-bold text-slate-800 dark:text-slate-200 font-mono">
                    +2 / -{test.negative}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() =>
                startMockTest(test.titleEn, test.titleHi, test.questionsCount, test.timeMinutes)
              }
              className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold hover:bg-slate-800 transition flex items-center justify-center gap-2 shadow-xs"
            >
              <Play className="w-3.5 h-3.5 fill-current text-amber-400 dark:text-amber-600" />
              <span>{language === 'hi' ? 'मॉक टेस्ट शुरू करें' : 'Start Mock Test'}</span>
            </button>
          </div>
        ))}
      </div>

      {/* Completed Tests History */}
      {completedMocks.length > 0 && (
        <div className="mt-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
            {language === 'hi' ? 'पिछले मॉक टेस्ट परिणाम' : 'Your Completed Mock Test Attempts'}
          </h3>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {completedMocks.map((mock) => (
              <div key={mock.id} className="py-3 flex items-center justify-between gap-4 text-xs">
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {mock.title[language] || mock.title.en}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {mock.completedAt?.replace('T', ' ').substring(0, 16)} · AIR Rank #{mock.airRank}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-mono font-bold text-sm text-slate-900 dark:text-white">
                    {mock.score?.toFixed(1)} <span className="text-slate-400 text-xs">/ 20</span>
                  </p>
                  <p className="text-[11px] text-emerald-600 font-mono">
                    {mock.accuracy?.toFixed(1)}% Accuracy
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
