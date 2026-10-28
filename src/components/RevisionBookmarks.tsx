import React, { useState } from 'react';
import { Bookmark, Trash2, Play, Sparkles, ExternalLink, Languages, BookOpen } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const RevisionBookmarks: React.FC = () => {
  const { bookmarks, toggleBookmark, questions, language, setActiveTab, setSelectedCategory } = useApp();
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null);

  // Match bookmarked questions
  const bookmarkedQuestions = questions.filter((q) =>
    bookmarks.some((b) => b.questionId === q.id)
  );

  const filtered =
    filterCategory === 'all'
      ? bookmarkedQuestions
      : bookmarkedQuestions.filter((q) => q.categoryId === filterCategory);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-amber-500 fill-current" />
            <span>{language === 'hi' ? 'रिवीजन सूची एवं बुकमार्क्स' : 'Revision List & Bookmarks'}</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {language === 'hi'
              ? 'कठिन एवं महत्वपूर्ण प्रश्नों को परीक्षा से पूर्व त्वरित पुनरावृत्ति के लिए सहेजें'
              : 'Save complex and high-yield questions for rapid pre-exam revision'}
          </p>
        </div>

        {bookmarkedQuestions.length > 0 && (
          <button
            onClick={() => setActiveTab('practice')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold hover:bg-slate-800 transition"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{language === 'hi' ? 'रिवीजन टेस्ट दें' : 'Practice Revision'}</span>
          </button>
        )}
      </div>

      {/* Empty State */}
      {bookmarkedQuestions.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 space-y-3">
          <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {language === 'hi' ? 'कोई बुकमार्क नहीं मिला' : 'No Bookmarked Questions Yet'}
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {language === 'hi'
              ? 'अभ्यास या मॉक टेस्ट के दौरान बुकमार्क आइकन पर क्लिक करके महत्वपूर्ण प्रश्न यहाँ जोड़ें।'
              : 'Click the bookmark icon on any question during practice or mock tests to save it for quick revision.'}
          </p>
          <button
            onClick={() => setActiveTab('practice')}
            className="mt-2 px-4 py-2 text-xs font-semibold rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-900 transition"
          >
            {language === 'hi' ? 'अभ्यास प्रश्न देखें' : 'Explore Practice Questions'}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((q, idx) => {
            const qText = q.question[language] || q.question.en;
            const qExpl = q.explanation[language] || q.explanation.en;
            const correctOpt = (q.options[language] || q.options.en)[q.correctIndex];
            const isExpanded = activeQuestionId === q.id;

            return (
              <div
                key={q.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs transition hover:border-slate-300 dark:hover:border-slate-700"
              >
                <div className="flex items-center justify-between pb-2 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {q.subtopic}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{q.targetExam}</span>
                  </div>

                  <button
                    onClick={() => toggleBookmark(q.id)}
                    className="p-1 rounded-md text-slate-400 hover:text-rose-500 transition"
                    title="Remove from bookmarks"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100 mt-2 leading-relaxed">
                  {qText}
                </p>

                <div className="mt-3 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 text-xs">
                  <span className="font-bold text-emerald-800 dark:text-emerald-300">
                    Correct Option ({String.fromCharCode(65 + q.correctIndex)}):
                  </span>{' '}
                  <span className="text-slate-800 dark:text-slate-200">{correctOpt}</span>
                </div>

                {isExpanded ? (
                  <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-300">
                    <p className="leading-relaxed">{qExpl}</p>
                    <div className="flex items-center justify-between pt-2 text-[11px] text-slate-400">
                      <span>Source: {q.sourceTitle}</span>
                      {q.sourceUrl && (
                        <a
                          href={q.sourceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-amber-600 hover:underline flex items-center gap-1"
                        >
                          Official link <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setActiveQuestionId(q.id)}
                    className="mt-2 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline"
                  >
                    {language === 'hi' ? 'व्याख्या देखें' : 'View Full Explanation'}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
