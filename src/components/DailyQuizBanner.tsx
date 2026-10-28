import React from 'react';
import { Flame, Trophy, Play, CheckCircle2, Calendar } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DailyQuizBanner: React.FC = () => {
  const { user, language, startMockTest } = useApp();

  const handleStartDaily = () => {
    startMockTest(
      'Daily 10-Question Knowledge Challenge',
      'दैनिक 10-प्रश्नों की ज्ञान चुनौती',
      10,
      10
    );
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-6 sm:p-8 border border-slate-800 shadow-lg">
      
      {/* Background Indian flag tricolor accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-white to-emerald-600 opacity-90" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        {/* Left Column: Streaks & Challenge Details */}
        <div className="space-y-3 max-w-xl">
          <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold tracking-wide">
            <Flame className="w-4 h-4 fill-current text-amber-500 animate-pulse" />
            <span>
              {language === 'hi'
                ? `${user.streakDays}-दिवसीय सतत अध्ययन स्ट्रीक`
                : `${user.streakDays}-Day Continuous Study Streak`}
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400 font-normal">Active Today</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
            {language === 'hi'
              ? 'दैनिक यूपीएससी, एसएससी एवं राज्य सेवा क्विज़'
              : 'Daily All-India Competitive Exam Quiz'}
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed">
            {language === 'hi'
              ? '10 सत्यापित प्रश्न · समसामयिकी (PIB), संविधान, भूगोल और तर्कशक्ति · वास्तविक नेगेटिव मार्किंग (-0.66) के साथ।'
              : '10 verified questions across Current Affairs (PIB), Indian Polity, Geography and Reasoning with standard negative marking.'}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>Earn +150 Practice KP</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Updated Today with Verified Sources</span>
            </span>
          </div>
        </div>

        {/* Right Action Button */}
        <div className="shrink-0 flex flex-col items-start md:items-end gap-2">
          <button
            onClick={handleStartDaily}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-md transition active:scale-[0.98] whitespace-nowrap"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{language === 'hi' ? 'दैनिक क्विज़ शुरू करें' : 'Start Daily Quiz'}</span>
          </button>
          <span className="text-[11px] text-slate-400">
            {language === 'hi' ? 'समय सीमा: 10 मिनट' : 'Duration: 10 Mins · Free for all aspirants'}
          </span>
        </div>

      </div>
    </div>
  );
};
