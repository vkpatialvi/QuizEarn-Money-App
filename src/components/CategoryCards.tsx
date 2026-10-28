import React from 'react';
import { ArrowRight, BookOpen, Newspaper, Brain, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/initialData';
import { CategoryId } from '../types/quiz';

export const CategoryCards: React.FC = () => {
  const { language, setSelectedCategory, setActiveTab } = useApp();

  const handleSelectCategory = (catId: CategoryId) => {
    setSelectedCategory(catId);
    setActiveTab('practice');
  };

  const icons = {
    current_affairs: Newspaper,
    gk: BookOpen,
    reasoning: Brain,
    previous_exams: Award,
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            {language === 'hi' ? 'परीक्षा विषय एवं श्रेणियां' : 'Exam Categories & Subjects'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {language === 'hi'
              ? 'प्रत्येक प्रश्न में विस्तृत हिंदी/अंग्रेजी व्याख्या और आधिकारिक स्रोत संलग्न हैं'
              : 'Each question includes verified sources, publication dates, and bilingual explanations'}
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedCategory(null);
            setActiveTab('practice');
          }}
          className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
        >
          <span>{language === 'hi' ? 'सभी देखें' : 'View All'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {CATEGORIES.map((cat) => {
          const Icon = icons[cat.id];
          return (
            <div
              key={cat.id}
              onClick={() => handleSelectCategory(cat.id)}
              className="group cursor-pointer rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all overflow-hidden flex flex-col"
            >
              {/* Category Image with zero-broken-image fallback */}
              <div className="relative aspect-4/3 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.titleEn}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    // Fallback to stylized SVG background if image fails
                    (e.currentTarget as HTMLElement).style.display = 'none';
                  }}
                />
                
                {/* Fallback container with icon if image hidden */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent flex items-end p-4">
                  <div className="flex items-center gap-2 text-white">
                    <Icon className="w-5 h-5 text-amber-400" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {cat.topicsCount}+ Questions
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {language === 'hi' ? cat.titleHi : cat.titleEn}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {language === 'hi' ? cat.taglineHi : cat.taglineEn}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span>{language === 'hi' ? 'अभ्यास शुरू करें' : 'Practice Now'}</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:text-slate-900 dark:group-hover:text-white transition-all" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
