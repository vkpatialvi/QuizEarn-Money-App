import React, { useState, useEffect } from 'react';
import { Clock, AlertTriangle, CheckCircle, Flag, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MockTestSession, UserAnswer } from '../types/quiz';
import { MockTestResult } from './MockTestResult';

export const MockTestPlayer: React.FC = () => {
  const { activeMockTest, finishMockTest, questions, language, showToast, setActiveTab } = useApp();

  // If no active mock test is running, pick sample test questions
  const testQuestions = questions.slice(0, 10);
  const totalSeconds = (activeMockTest?.timeLimitMinutes || 10) * 60;

  const [timeLeft, setTimeLeft] = useState(totalSeconds);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, UserAnswer>>({});
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [completedSession, setCompletedSession] = useState<MockTestSession | null>(null);
  const [showPaletteMobile, setShowPaletteMobile] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (completedSession) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [completedSession]);

  const currentQ = testQuestions[currentIndex];
  const currentAnswer = answers[currentQ?.id] || {
    questionId: currentQ?.id,
    selectedOption: null,
    isCorrect: false,
    timeSpentSeconds: 0,
    markedForReview: false,
  };

  const handleSelectOption = (idx: number) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: {
        questionId: currentQ.id,
        selectedOption: idx,
        isCorrect: idx === currentQ.correctIndex,
        timeSpentSeconds: (prev[currentQ.id]?.timeSpentSeconds || 0) + 5,
        markedForReview: prev[currentQ.id]?.markedForReview || false,
      },
    }));
  };

  const handleClearResponse = () => {
    setAnswers((prev) => {
      const copy = { ...prev };
      delete copy[currentQ.id];
      return copy;
    });
  };

  const handleToggleMarkForReview = () => {
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: {
        questionId: currentQ.id,
        selectedOption: prev[currentQ.id]?.selectedOption ?? null,
        isCorrect: prev[currentQ.id]?.selectedOption === currentQ.correctIndex,
        timeSpentSeconds: prev[currentQ.id]?.timeSpentSeconds || 0,
        markedForReview: !prev[currentQ.id]?.markedForReview,
      },
    }));
  };

  const handleNext = () => {
    if (currentIndex < testQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSubmitTest = () => {
    let rawScore = 0;
    let correctCount = 0;
    let attemptedCount = 0;

    testQuestions.forEach((q) => {
      const ans = answers[q.id];
      if (ans && ans.selectedOption !== null) {
        attemptedCount++;
        if (ans.selectedOption === q.correctIndex) {
          correctCount++;
          rawScore += 2; // +2 for correct
        } else {
          rawScore -= 0.66; // -0.66 negative marking
        }
      }
    });

    const accuracy = attemptedCount > 0 ? (correctCount / attemptedCount) * 100 : 0;
    const finalScore = Math.max(0, Math.round(rawScore * 10) / 10);

    // Simulated All-India Rank based on score percentile
    const simulatedAIR = Math.max(1, Math.round((1 - finalScore / (testQuestions.length * 2)) * 450 + 12));

    const finalSession: MockTestSession = {
      id: activeMockTest?.id || `mock-${Date.now()}`,
      title: activeMockTest?.title || {
        en: 'All-India General Studies Speed Mock #1',
        hi: 'अखिल भारतीय सामान्य अध्ययन स्पीड मॉक #1',
      },
      totalQuestions: testQuestions.length,
      timeLimitMinutes: activeMockTest?.timeLimitMinutes || 10,
      correctMarks: 2,
      negativeMarks: 0.66,
      startedAt: activeMockTest?.startedAt || new Date().toISOString(),
      completedAt: new Date().toISOString(),
      answers,
      score: finalScore,
      accuracy,
      airRank: simulatedAIR,
    };

    setCompletedSession(finalSession);
    finishMockTest(finalSession);
    setShowSubmitConfirm(false);
    showToast(language === 'hi' ? 'मॉक टेस्ट सफलतापूर्वक जमा हुआ!' : 'Mock test submitted!', 'success');
  };

  if (completedSession) {
    return <MockTestResult session={completedSession} questions={testQuestions} />;
  }

  // Formatting clock mm:ss
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeFormatted = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  const isUrgent = timeLeft < 120; // less than 2 mins

  const qText = currentQ.question[language] || currentQ.question.en;
  const qOptions = currentQ.options[language] || currentQ.options.en;

  // Counts for summary
  const attemptedCount = Object.values(answers).filter((a) => a.selectedOption !== null).length;
  const markedCount = Object.values(answers).filter((a) => a.markedForReview).length;
  const unattemptedCount = testQuestions.length - attemptedCount;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Mock Test Exam Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 flex items-center justify-between shadow-xs">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            {activeMockTest?.title[language] ||
              (language === 'hi'
                ? 'अखिल भारतीय स्पीड मॉक टेस्ट #1'
                : 'All-India General Studies Speed Mock #1')}
          </h2>
          <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
            <span>{testQuestions.length} Questions</span>
            <span aria-hidden="true">·</span>
            <span>+2.0 / -0.66 Marking</span>
            <span aria-hidden="true">·</span>
            <span>All-India Rank Eligible</span>
          </div>
        </div>

        {/* Live Countdown & Palette Trigger on Mobile */}
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-mono text-sm font-bold border ${
              isUrgent
                ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-600 dark:text-rose-400 animate-pulse'
                : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white'
            }`}
          >
            <Clock className="w-4 h-4 text-amber-500" />
            <span>{timeFormatted}</span>
          </div>

          <button
            onClick={() => setShowPaletteMobile(true)}
            className="lg:hidden px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
          >
            Palette ({attemptedCount}/{testQuestions.length})
          </button>

          <button
            onClick={() => setShowSubmitConfirm(true)}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition shadow-xs"
          >
            {language === 'hi' ? 'टेस्ट सबमिट करें' : 'Submit Test'}
          </button>
        </div>
      </div>

      {/* Grid: 2-Column Desktop layout (Question on left, Question Palette on right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Active Question Canvas */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
          
          {/* Question Subheader */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 text-xs text-slate-500">
            <span className="font-semibold text-slate-900 dark:text-slate-200">
              {language === 'hi' ? 'प्रश्न संख्या' : 'Question'} {currentIndex + 1} of{' '}
              {testQuestions.length}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-emerald-600 font-semibold">+2.0</span>
              <span className="text-rose-600 font-semibold">-0.66</span>
            </div>
          </div>

          {/* Question Text */}
          <div className="mt-5">
            <p className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100 leading-relaxed whitespace-pre-line">
              {qText}
            </p>
          </div>

          {/* Options */}
          <div className="mt-6 space-y-3">
            {qOptions.map((opt, idx) => {
              const letter = String.fromCharCode(65 + idx);
              const isSelected = currentAnswer.selectedOption === idx;

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 min-h-[52px] ${
                    isSelected
                      ? 'border-amber-500 bg-amber-50/70 dark:bg-amber-950/30 text-amber-950 dark:text-amber-100 font-medium ring-1 ring-amber-500'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-800/30 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                      isSelected
                        ? 'bg-amber-500 text-slate-900 font-black'
                        : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {letter}
                  </span>
                  <span className="flex-1 text-sm pt-0.5 leading-snug">{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Action Row */}
          <div className="mt-8 pt-5 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleMarkForReview}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border transition ${
                  currentAnswer.markedForReview
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <Flag className="w-3.5 h-3.5" />
                <span>
                  {currentAnswer.markedForReview
                    ? language === 'hi'
                      ? 'रिव्यू से हटाएं'
                      : 'Unmark Review'
                    : language === 'hi'
                    ? 'रिव्यू के लिए मार्क करें'
                    : 'Mark for Review'}
                </span>
              </button>

              {currentAnswer.selectedOption !== null && (
                <button
                  onClick={handleClearResponse}
                  className="px-3 py-2 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-white transition"
                >
                  {language === 'hi' ? 'उत्तर साफ़ करें' : 'Clear Response'}
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="px-3.5 py-2 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 transition"
              >
                <ChevronLeft className="w-4 h-4 inline" /> {language === 'hi' ? 'पिछला' : 'Prev'}
              </button>

              <button
                onClick={handleNext}
                disabled={currentIndex === testQuestions.length - 1}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 transition"
              >
                {language === 'hi' ? 'सहेजें व अगला' : 'Save & Next'}{' '}
                <ChevronRight className="w-4 h-4 inline" />
              </button>
            </div>
          </div>

        </div>

        {/* Right: Question Palette (Desktop view) */}
        <div className="hidden lg:block lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
            {language === 'hi' ? 'प्रश्न स्थिति पैलेट' : 'Question Palette'}
          </h3>

          {/* Palette Legend */}
          <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400 mb-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded bg-emerald-500 shrink-0" />
              <span>Answered ({attemptedCount})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded bg-purple-500 shrink-0" />
              <span>Marked ({markedCount})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded bg-slate-200 dark:bg-slate-700 shrink-0" />
              <span>Unattempted ({unattemptedCount})</span>
            </div>
          </div>

          {/* Question Grid Buttons */}
          <div className="grid grid-cols-5 gap-2.5">
            {testQuestions.map((q, idx) => {
              const ans = answers[q.id];
              const isAnswered = ans && ans.selectedOption !== null;
              const isMarked = ans && ans.markedForReview;
              const isCurrent = idx === currentIndex;

              let btnBg = 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300';
              if (isMarked) {
                btnBg = 'bg-purple-600 text-white font-bold';
              } else if (isAnswered) {
                btnBg = 'bg-emerald-600 text-white font-bold';
              }

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-10 rounded-xl text-xs font-semibold flex items-center justify-center transition-all ${btnBg} ${
                    isCurrent ? 'ring-2 ring-slate-900 dark:ring-white scale-105 shadow-sm' : ''
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setShowSubmitConfirm(true)}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition shadow-xs"
            >
              {language === 'hi' ? 'मॉक टेस्ट समाप्त करें' : 'Finish & Submit Mock'}
            </button>
          </div>
        </div>

      </div>

      {/* Mobile Question Palette Modal */}
      {showPaletteMobile && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-sm rounded-t-3xl sm:rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in slide-in-from-bottom">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {language === 'hi' ? 'प्रश्न पैलेट' : 'Question Palette'}
              </h3>
              <button
                onClick={() => setShowPaletteMobile(false)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-5 gap-2.5 my-4">
              {testQuestions.map((q, idx) => {
                const ans = answers[q.id];
                const isAnswered = ans && ans.selectedOption !== null;
                const isMarked = ans && ans.markedForReview;
                const isCurrent = idx === currentIndex;

                let btnBg = 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300';
                if (isMarked) {
                  btnBg = 'bg-purple-600 text-white font-bold';
                } else if (isAnswered) {
                  btnBg = 'bg-emerald-600 text-white font-bold';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setShowPaletteMobile(false);
                    }}
                    className={`h-10 rounded-xl text-xs font-semibold flex items-center justify-center ${btnBg} ${
                      isCurrent ? 'ring-2 ring-slate-900 dark:ring-white scale-105' : ''
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => {
                setShowPaletteMobile(false);
                setShowSubmitConfirm(true);
              }}
              className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-xs"
            >
              Submit Mock Test
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              {language === 'hi' ? 'मॉक टेस्ट सबमिट करें?' : 'Ready to Submit Mock Test?'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              {language === 'hi'
                ? 'जमा करने के बाद आपका अखिल भारतीय स्कोर और विस्तृत विश्लेषण तैयार किया जाएगा।'
                : 'Your answers will be evaluated with standard negative marking (-0.66) to generate your All-India Rank.'}
            </p>

            <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-center text-xs mb-5">
              <div>
                <p className="text-slate-400">Attempted</p>
                <p className="font-bold text-emerald-600 text-base">{attemptedCount}</p>
              </div>
              <div>
                <p className="text-slate-400">Marked Review</p>
                <p className="font-bold text-purple-600 text-base">{markedCount}</p>
              </div>
              <div>
                <p className="text-slate-400">Left Blank</p>
                <p className="font-bold text-slate-700 dark:text-slate-300 text-base">{unattemptedCount}</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowSubmitConfirm(false)}
                className="px-4 py-2 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
              >
                {language === 'hi' ? 'वापस जाएं' : 'Resume Test'}
              </button>
              <button
                onClick={handleSubmitTest}
                className="px-5 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition"
              >
                {language === 'hi' ? 'हाँ, जमा करें' : 'Confirm & Submit'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
