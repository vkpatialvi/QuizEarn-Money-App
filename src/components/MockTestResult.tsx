import React, { useState } from 'react';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  Clock,
  Award,
  Bookmark,
  ExternalLink,
  ChevronRight,
  RotateCcw,
  Languages,
} from 'lucide-react';
import { MockTestSession, Question } from '../types/quiz';
import { useApp } from '../context/AppContext';

export const MockTestResult: React.FC<{
  session: MockTestSession;
  questions: Question[];
}> = ({ session, questions }) => {
  const { language, toggleBookmark, isBookmarked, setActiveTab } = useApp();
  const [selectedReviewIdx, setSelectedReviewIdx] = useState(0);
  const [reviewLang, setReviewLang] = useState<'match_global' | 'en' | 'hi'>('match_global');

  const curLang = reviewLang === 'match_global' ? language : reviewLang;

  const totalPossible = questions.length * 2;
  const attemptedAnswers = Object.values(session.answers).filter((a) => a.selectedOption !== null);
  const correctCount = attemptedAnswers.filter((a) => a.isCorrect).length;
  const incorrectCount = attemptedAnswers.length - correctCount;
  const unattemptedCount = questions.length - attemptedAnswers.length;

  const activeQ = questions[selectedReviewIdx] || questions[0];
  const activeAns = session.answers[activeQ.id];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Score Summary Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span>Exam Analysis</span>
              <span aria-hidden="true">·</span>
              <span>{session.completedAt?.replace('T', ' ').substring(0, 16)}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {session.title[language] || 'All-India Mock Test Result'}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('mock-test')}
              className="px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            >
              <RotateCcw className="w-3.5 h-3.5 inline mr-1" />
              {language === 'hi' ? 'अन्य टेस्ट दें' : 'Take Another Test'}
            </button>
            <button
              onClick={() => setActiveTab('leaderboard')}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 transition"
            >
              <Trophy className="w-3.5 h-3.5 inline mr-1 text-amber-400 dark:text-amber-600" />
              {language === 'hi' ? 'लीडरबोर्ड देखें' : 'View Leaderboard'}
            </button>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-200 dark:border-amber-900/40">
            <p className="text-xs text-amber-700 dark:text-amber-400 font-medium">All-India Rank (AIR)</p>
            <p className="text-2xl font-bold font-mono text-slate-900 dark:text-white mt-1">
              #{session.airRank || 24}
            </p>
            <p className="text-[11px] text-amber-800 dark:text-amber-300 mt-1">
              Top {Math.min(99, Math.round((1 - (session.airRank || 24) / 500) * 100))}% Percentile
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
            <p className="text-xs text-slate-500 font-medium">Net Score</p>
            <p className="text-2xl font-bold font-mono text-slate-900 dark:text-white mt-1">
              {session.score?.toFixed(1)}{' '}
              <span className="text-xs text-slate-400 font-normal">/ {totalPossible}</span>
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              +{(correctCount * 2).toFixed(1)} correct · -{(incorrectCount * 0.66).toFixed(1)} neg
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
            <p className="text-xs text-slate-500 font-medium">Accuracy</p>
            <p className="text-2xl font-bold font-mono text-slate-900 dark:text-white mt-1">
              {session.accuracy?.toFixed(1)}%
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              {correctCount} right of {attemptedAnswers.length} attempted
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
            <p className="text-xs text-slate-500 font-medium">Questions Summary</p>
            <div className="flex items-center gap-2 mt-2 text-xs font-mono font-semibold">
              <span className="text-emerald-600">✓ {correctCount}</span>
              <span className="text-rose-600">✗ {incorrectCount}</span>
              <span className="text-slate-400">○ {unattemptedCount}</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Total {questions.length} questions
            </p>
          </div>

        </div>
      </div>

      {/* Solutions & In-Depth Review Section */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
        
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {language === 'hi' ? 'उत्तर कुंजी व विस्तृत व्याख्या' : 'Solutions & Explanations'}
            </h3>
            <p className="text-xs text-slate-500">
              Click any question number to inspect verified sources and your answer status
            </p>
          </div>

          <button
            onClick={() => setReviewLang(curLang === 'en' ? 'hi' : 'en')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
          >
            <Languages className="w-3.5 h-3.5" />
            <span>{curLang === 'en' ? 'हिंदी व्याख्या देखें' : 'View in English'}</span>
          </button>
        </div>

        {/* Question Pills Navigator */}
        <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-none">
          {questions.map((q, idx) => {
            const ans = session.answers[q.id];
            const isAttempted = ans && ans.selectedOption !== null;
            const isCorrect = isAttempted && ans.isCorrect;
            const isCurrent = idx === selectedReviewIdx;

            let badgeColor = 'bg-slate-100 dark:bg-slate-800 text-slate-400';
            if (isAttempted) {
              badgeColor = isCorrect
                ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                : 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800';
            }

            return (
              <button
                key={q.id}
                onClick={() => setSelectedReviewIdx(idx)}
                className={`min-w-[42px] h-9 rounded-xl text-xs font-semibold shrink-0 transition-all ${badgeColor} ${
                  isCurrent ? 'ring-2 ring-slate-900 dark:ring-white scale-105' : ''
                }`}
              >
                Q{idx + 1}
              </button>
            );
          })}
        </div>

        {/* Active Question Review View */}
        <div className="mt-4 p-5 sm:p-6 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60">
          
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700 text-xs text-slate-500">
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              Q{selectedReviewIdx + 1} · {activeQ.subtopic}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleBookmark(activeQ.id)}
                className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-md transition ${
                  isBookmarked(activeQ.id)
                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isBookmarked(activeQ.id) ? 'fill-current' : ''}`} />
                <span>{isBookmarked(activeQ.id) ? 'Saved' : 'Save for Revision'}</span>
              </button>
            </div>
          </div>

          <p className="text-base font-semibold text-slate-900 dark:text-slate-100 mt-4 leading-relaxed">
            {activeQ.question[curLang] || activeQ.question.en}
          </p>

          {/* Options Breakdown */}
          <div className="mt-4 space-y-2">
            {(activeQ.options[curLang] || activeQ.options.en).map((opt, optIdx) => {
              const letter = String.fromCharCode(65 + optIdx);
              const isCorrectOpt = optIdx === activeQ.correctIndex;
              const isUserChoice = activeAns && activeAns.selectedOption === optIdx;

              let style = 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300';
              if (isCorrectOpt) {
                style = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-medium';
              } else if (isUserChoice && !isCorrectOpt) {
                style = 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-900 dark:text-rose-200 line-through';
              }

              return (
                <div key={optIdx} className={`p-3 rounded-xl border flex items-center gap-3 text-sm ${style}`}>
                  <span className="font-bold text-xs w-6">{letter}.</span>
                  <span className="flex-1">{opt}</span>
                  {isCorrectOpt && (
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Correct Answer
                    </span>
                  )}
                  {isUserChoice && !isCorrectOpt && (
                    <span className="text-xs font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5" /> Your Choice
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Detailed Verified Explanation */}
          <div className="mt-5 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-1">
              {language === 'hi' ? 'सत्यापित व्याख्या एवं स्रोत' : 'Official Explanation & Verification'}
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {activeQ.explanation[curLang] || activeQ.explanation.en}
            </p>
            <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
              <span>Source: {activeQ.sourceTitle}</span>
              {activeQ.sourceUrl && (
                <a
                  href={activeQ.sourceUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-1 text-amber-600 hover:underline"
                >
                  <span>Verify at official site</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
