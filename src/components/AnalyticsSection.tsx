import React from 'react';
import { Target, Zap, Clock, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AnalyticsSection: React.FC = () => {
  const { user, completedMocks, language } = useApp();

  const topicStats = [
    { name: 'Current Affairs (PIB & National)', accuracy: 88, questions: 42, status: 'Strong' },
    { name: 'Indian Polity & Constitution', accuracy: 92, questions: 65, status: 'Mastered' },
    { name: 'Modern Indian History', accuracy: 78, questions: 38, status: 'Moderate' },
    { name: 'Logical Reasoning & Syllogism', accuracy: 84, questions: 50, status: 'Strong' },
    { name: 'Physical & Indian Geography', accuracy: 68, questions: 25, status: 'Needs Focus' },
    { name: 'Quantitative Aptitude (Averages & CI)', accuracy: 72, questions: 30, status: 'Moderate' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          <span>{language === 'hi' ? 'अभ्यर्थी प्रदर्शन एवं सटीकता विश्लेषण' : 'Performance & Accuracy Analytics'}</span>
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Deep diagnostic insights into subject speed, negative marking losses, and high-yield focus areas
        </p>
      </div>

      {/* Top 3 KPI Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Overall Accuracy</span>
            <Target className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-3xl font-extrabold font-mono text-slate-900 dark:text-white mt-2">
            82.5%
          </p>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-medium">
            +4.2% higher than state cutoff average
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Avg. Time Per Question</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-3xl font-extrabold font-mono text-slate-900 dark:text-white mt-2">
            44.2s
          </p>
          <p className="text-[11px] text-slate-500 mt-1">
            Target: &lt; 50s for UPSC Prelims / SSC
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Mock Tests Completed</span>
            <Zap className="w-4 h-4 text-indigo-500" />
          </div>
          <p className="text-3xl font-extrabold font-mono text-slate-900 dark:text-white mt-2">
            {completedMocks.length + 4}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">
            Last test: {completedMocks[0]?.score?.toFixed(1) || '14.0'} / 20.0 Marks
          </p>
        </div>

      </div>

      {/* Topic-wise Diagnostic Breakdown */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
          {language === 'hi' ? 'विषयवार सटीकता एवं सुदृढ़ता रिपोर्ट' : 'Subject-wise Accuracy Diagnostics'}
        </h3>

        <div className="space-y-4">
          {topicStats.map((topic, i) => (
            <div key={i} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {topic.name}
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-slate-400 font-mono">{topic.questions} Qs</span>
                  <span
                    className={`font-mono font-bold ${
                      topic.accuracy >= 80
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : topic.accuracy >= 70
                        ? 'text-amber-600 dark:text-amber-400'
                        : 'text-rose-600 dark:text-rose-400'
                    }`}
                  >
                    {topic.accuracy}%
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    topic.accuracy >= 80
                      ? 'bg-emerald-500'
                      : topic.accuracy >= 70
                      ? 'bg-amber-500'
                      : 'bg-rose-500'
                  }`}
                  style={{ width: `${topic.accuracy}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Actionable Recommendation */}
        <div className="mt-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            <strong>Editorial Prep Tip:</strong> Your accuracy in Indian Polity is exceptional (92%), but Physical Geography and River Systems (68%) shows vulnerability to negative marks. Focus on the Indian Geography PYQ capsule before attempting Mock Test #2.
          </p>
        </div>
      </div>

    </div>
  );
};
