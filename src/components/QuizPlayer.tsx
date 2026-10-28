import React, { useState } from 'react';
import {
  Bookmark,
  CheckCircle2,
  XCircle,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Flag,
  Languages,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CategoryId, QuestionReport } from '../types/quiz';
import { CATEGORIES } from '../data/initialData';

export const QuizPlayer: React.FC<{ categoryOverride?: CategoryId | null }> = ({
  categoryOverride,
}) => {
  const {
    questions,
    language,
    toggleBookmark,
    isBookmarked,
    user,
    updateUser,
    addWalletTransaction,
    submitReport,
    showToast,
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<CategoryId | 'all'>(
    categoryOverride || 'all'
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState<QuestionReport['reason']>('incorrect_answer');
  const [reportDetails, setReportDetails] = useState('');

  // Local question language toggle (aspirants often check both Hindi and English for technical terms)
  const [localLang, setLocalLang] = useState<'match_global' | 'en' | 'hi'>('match_global');
  const currentLang = localLang === 'match_global' ? language : localLang;

  const filteredQuestions =
    activeCategory === 'all'
      ? questions
      : questions.filter((q) => q.categoryId === activeCategory);

  const currentQ = filteredQuestions[currentIndex] || filteredQuestions[0];

  if (!currentQ) {
    return (
      <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
        <p className="text-slate-600 dark:text-slate-400">
          {language === 'hi' ? 'कोई प्रश्न उपलब्ध नहीं है।' : 'No questions found for this topic.'}
        </p>
      </div>
    );
  }

  const handleSelectOption = (idx: number) => {
    if (hasSubmitted) return;
    setSelectedOption(idx);
    setHasSubmitted(true);

    const isCorrect = idx === currentQ.correctIndex;
    if (isCorrect) {
      const earned = 10;
      updateUser({ knowledgePoints: user.knowledgePoints + earned });
      addWalletTransaction({
        type: 'CREDIT_KP',
        amount: earned,
        currency: 'KP',
        description: {
          en: `Correct practice answer: ${currentQ.subtopic}`,
          hi: `सही अभ्यास उत्तर: ${currentQ.subtopicHi || currentQ.subtopic}`,
        },
        status: 'COMPLETED',
        referenceId: currentQ.id,
      });
      showToast(language === 'hi' ? '+10 KP अर्जित किए!' : '+10 Knowledge Points Earned!', 'success');
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setHasSubmitted(false);
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
      showToast(
        language === 'hi' ? 'आपने इस सेट के सभी प्रश्न हल कर लिए!' : 'Completed all questions in this set!',
        'info'
      );
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setSelectedOption(null);
      setHasSubmitted(false);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleResetCurrent = () => {
    setSelectedOption(null);
    setHasSubmitted(false);
  };

  const handleSendReport = (e: React.FormEvent) => {
    e.preventDefault();
    submitReport(
      currentQ.id,
      currentQ.question[currentLang],
      reportReason,
      reportDetails || 'Question flagged by user in practice mode'
    );
    setShowReportModal(false);
    setReportDetails('');
  };

  const qText = currentQ.question[currentLang] || currentQ.question.en;
  const qOptions = currentQ.options[currentLang] || currentQ.options.en;
  const qExplanation = currentQ.explanation[currentLang] || currentQ.explanation.en;
  const subtopicName =
    currentLang === 'hi' && currentQ.subtopicHi ? currentQ.subtopicHi : currentQ.subtopic;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Category Filter Bar */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl overflow-x-auto scrollbar-none border border-slate-200 dark:border-slate-700/60">
        <button
          onClick={() => {
            setActiveCategory('all');
            setCurrentIndex(0);
            setSelectedOption(null);
            setHasSubmitted(false);
          }}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
            activeCategory === 'all'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          {language === 'hi' ? 'सभी विषय (All)' : 'All Subjects'}
        </button>

        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              setCurrentIndex(0);
              setSelectedOption(null);
              setHasSubmitted(false);
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeCategory === cat.id
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {language === 'hi' ? cat.titleHi.split(' ')[0] : cat.titleEn}
          </button>
        ))}
      </div>

      {/* Main Question Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8">
        
        {/* Card Header & Unboxed Metadata */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-slate-800 dark:text-slate-200">{subtopicName}</span>
            <span aria-hidden="true">·</span>
            <span>{currentQ.targetExam || 'Competitive Exam'}</span>
            {currentQ.examYear && (
              <>
                <span aria-hidden="true">·</span>
                <span>{currentQ.examYear}</span>
              </>
            )}
            <span aria-hidden="true">·</span>
            <span className="capitalize">{currentQ.difficulty}</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Quick Bilingual Switcher for this Question */}
            <button
              onClick={() => setLocalLang(currentLang === 'en' ? 'hi' : 'en')}
              className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition"
              title="Toggle question language"
            >
              <Languages className="w-3.5 h-3.5 text-slate-400" />
              <span>{currentLang === 'en' ? 'हिंदी में पढ़ें' : 'Read in EN'}</span>
            </button>

            {/* Bookmark button */}
            <button
              onClick={() => toggleBookmark(currentQ.id)}
              className={`p-1.5 rounded-lg transition-colors ${
                isBookmarked(currentQ.id)
                  ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40'
                  : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title={isBookmarked(currentQ.id) ? 'Bookmarked' : 'Bookmark question'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked(currentQ.id) ? 'fill-current' : ''}`} />
            </button>

            {/* Report flag */}
            <button
              onClick={() => setShowReportModal(true)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title="Report question error"
            >
              <Flag className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Question Counter Progress */}
        <div className="pt-4 flex items-center justify-between text-xs text-slate-500">
          <span>
            {language === 'hi' ? 'प्रश्न क्रमांक' : 'Question'} {currentIndex + 1}{' '}
            <span className="text-slate-400">/ {filteredQuestions.length}</span>
          </span>
          <span className="font-mono text-amber-600 dark:text-amber-400 font-semibold">
            +10 KP
          </span>
        </div>

        {/* Question Text */}
        <div className="mt-4">
          <p className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100 leading-relaxed whitespace-pre-line">
            {qText}
          </p>
        </div>

        {/* Options List */}
        <div className="mt-6 space-y-3">
          {qOptions.map((opt, idx) => {
            const letter = String.fromCharCode(65 + idx);
            const isSelected = selectedOption === idx;
            const isCorrectOption = idx === currentQ.correctIndex;

            let optionStyle =
              'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-800 dark:text-slate-200';

            if (hasSubmitted) {
              if (isCorrectOption) {
                optionStyle =
                  'border-emerald-500 dark:border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-medium';
              } else if (isSelected && !isCorrectOption) {
                optionStyle =
                  'border-rose-500 dark:border-rose-600 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200';
              } else {
                optionStyle =
                  'border-slate-200 dark:border-slate-800 bg-transparent opacity-60 text-slate-600 dark:text-slate-400';
              }
            }

            return (
              <button
                key={idx}
                disabled={hasSubmitted}
                onClick={() => handleSelectOption(idx)}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 min-h-[52px] ${optionStyle}`}
              >
                <span
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                    hasSubmitted && isCorrectOption
                      ? 'bg-emerald-600 text-white'
                      : hasSubmitted && isSelected && !isCorrectOption
                      ? 'bg-rose-600 text-white'
                      : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {letter}
                </span>

                <div className="flex-1 text-sm pt-0.5 leading-snug">{opt}</div>

                {hasSubmitted && isCorrectOption && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                )}
                {hasSubmitted && isSelected && !isCorrectOption && (
                  <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation & Source Reference */}
        {hasSubmitted && (
          <div className="mt-6 p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{language === 'hi' ? 'विस्तृत व्याख्या' : 'Detailed Explanation'}</span>
            </div>

            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {qExplanation}
            </p>

            {/* Source Reference & Date */}
            <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700/60 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  {language === 'hi' ? 'सत्यापित स्रोत:' : 'Verified Source:'}
                </span>
                <span>{currentQ.sourceTitle}</span>
                {currentQ.publicationDate && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{currentQ.publicationDate}</span>
                  </>
                )}
              </div>

              {currentQ.sourceUrl && (
                <a
                  href={currentQ.sourceUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-1 text-amber-600 dark:text-amber-400 hover:underline font-medium"
                >
                  <span>{language === 'hi' ? 'मूल स्रोत देखें' : 'View Source'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        )}

        {/* Bottom Navigation Controls */}
        <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">{language === 'hi' ? 'पिछला' : 'Previous'}</span>
          </button>

          {hasSubmitted && (
            <button
              onClick={handleResetCurrent}
              className="flex items-center gap-1 px-3 py-2 text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white transition"
              title="Reset question attempt"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'पुनः हल करें' : 'Retry'}</span>
            </button>
          )}

          <button
            onClick={handleNext}
            className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 transition shadow-xs"
          >
            <span>{language === 'hi' ? 'अगला प्रश्न' : 'Next Question'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              {language === 'hi' ? 'प्रश्न की रिपोर्ट करें' : 'Report Question Issue'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              {language === 'hi'
                ? 'हमारी संपादकीय टीम 24 घंटे के भीतर स्रोत के साथ समीक्षा करेगी।'
                : 'Our editorial team will verify with official government sources within 24 hours.'}
            </p>

            <form onSubmit={handleSendReport} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'hi' ? 'समस्या का कारण' : 'Issue Category'}
                </label>
                <select
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value as QuestionReport['reason'])}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="incorrect_answer">Incorrect Answer / Option</option>
                  <option value="translation_issue">Translation / Hindi Meaning Issue</option>
                  <option value="outdated_info">Outdated Current Affairs / Fact Changed</option>
                  <option value="typo">Spelling or Grammatical Typo</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'hi' ? 'विवरण (वैकल्पिक)' : 'Specific Details (Optional)'}
                </label>
                <textarea
                  value={reportDetails}
                  onChange={(e) => setReportDetails(e.target.value)}
                  placeholder="Explain why this question or answer needs review..."
                  rows={3}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowReportModal(false)}
                  className="px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition"
                >
                  Submit Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
