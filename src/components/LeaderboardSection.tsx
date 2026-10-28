import React, { useState } from 'react';
import { Trophy, Medal, Flame, Target, Award, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BADGE_DEFINITIONS, INDIAN_STATES } from '../data/initialData';

export const LeaderboardSection: React.FC = () => {
  const { leaderboard, user, language } = useApp();
  const [selectedState, setSelectedState] = useState('All India');

  const filteredLeaderboard =
    selectedState === 'All India'
      ? leaderboard
      : leaderboard.filter((u) => u.state === selectedState || u.id === user.id);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-500 fill-current" />
            <span>{language === 'hi' ? 'अखिल भारतीय रैंकिंग व लीडरबोर्ड' : 'All-India Aspirant Leaderboard'}</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real-time simulated ranking across 50,000+ national civil services & competitive aspirants
          </p>
        </div>

        {/* State Filter dropdown */}
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
          >
            {INDIAN_STATES.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Badges Earned Ribbon */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
        <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <Award className="w-4 h-4 text-amber-500" />
          <span>{language === 'hi' ? 'अर्जित उपाधियाँ एवं पदक (Badges)' : 'Earned Merit Badges'}</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {BADGE_DEFINITIONS.map((badge) => {
            const isUnlocked = user.badges.includes(badge.name);
            return (
              <div
                key={badge.id}
                className={`p-3 rounded-xl border text-center transition ${
                  isUnlocked
                    ? 'bg-amber-500/10 border-amber-300 dark:border-amber-900/40 text-amber-900 dark:text-amber-200'
                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-50 text-slate-500'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 mx-auto flex items-center justify-center shadow-xs mb-1.5">
                  <Medal className={`w-4 h-4 ${isUnlocked ? 'text-amber-500' : 'text-slate-400'}`} />
                </div>
                <p className="text-xs font-bold truncate">
                  {language === 'hi' ? badge.nameHi : badge.name}
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                  {badge.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
              <tr>
                <th className="py-3 px-4 font-semibold">Rank</th>
                <th className="py-3 px-4 font-semibold">Aspirant</th>
                <th className="py-3 px-4 font-semibold hidden sm:table-cell">Target Exam</th>
                <th className="py-3 px-4 font-semibold">State</th>
                <th className="py-3 px-4 font-semibold text-right">Accuracy</th>
                <th className="py-3 px-4 font-semibold text-right">Score (KP)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredLeaderboard.map((item) => {
                const isUser = item.id === user.id || item.name.includes('(You)');
                return (
                  <tr
                    key={item.id}
                    className={`transition-colors ${
                      isUser
                        ? 'bg-amber-50/70 dark:bg-amber-950/30 font-semibold'
                        : 'hover:bg-slate-50/50 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    <td className="py-3 px-4 font-mono font-bold">
                      {item.airRank === 1 && <span className="text-amber-500">🥇 #1</span>}
                      {item.airRank === 2 && <span className="text-slate-400">🥈 #2</span>}
                      {item.airRank === 3 && <span className="text-amber-700">🥉 #3</span>}
                      {item.airRank > 3 && <span>#{item.airRank}</span>}
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-bold flex items-center justify-center shrink-0">
                          {item.name.charAt(0)}
                        </div>
                        <span className="truncate max-w-[140px] sm:max-w-none text-slate-900 dark:text-slate-100">
                          {item.name}
                        </span>
                      </div>
                    </td>

                    <td className="py-3 px-4 hidden sm:table-cell text-slate-500">
                      {item.targetExam}
                    </td>

                    <td className="py-3 px-4 text-slate-500">
                      {item.state}
                    </td>

                    <td className="py-3 px-4 text-right font-mono text-slate-700 dark:text-slate-300">
                      {item.accuracy.toFixed(1)}%
                    </td>

                    <td className="py-3 px-4 text-right font-mono font-bold text-amber-600 dark:text-amber-400">
                      {item.score} KP
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
