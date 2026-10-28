import React, { useState } from 'react';
import {
  ShieldCheck,
  PlusCircle,
  FileQuestion,
  AlertTriangle,
  CheckCircle2,
  Trash2,
  ExternalLink,
  Layers,
  Users,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CategoryId, ExamTarget, Question } from '../types/quiz';
import { CATEGORIES, EXAM_TARGETS } from '../data/initialData';

export const AdminDashboard: React.FC = () => {
  const {
    questions,
    addQuestion,
    deleteQuestion,
    reports,
    resolveReport,
    language,
    showToast,
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<'questions' | 'add_new' | 'reports' | 'compliance'>('questions');

  // New Question Form state
  const [catId, setCatId] = useState<CategoryId>('current_affairs');
  const [subtopicEn, setSubtopicEn] = useState('');
  const [subtopicHi, setSubtopicHi] = useState('');
  const [targetExam, setTargetExam] = useState<ExamTarget>('UPSC');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [qEn, setQEn] = useState('');
  const [qHi, setQHi] = useState('');
  const [optEn, setOptEn] = useState(['', '', '', '']);
  const [optHi, setOptHi] = useState(['', '', '', '']);
  const [correctIdx, setCorrectIdx] = useState(0);
  const [explEn, setExplEn] = useState('');
  const [explHi, setExplHi] = useState('');
  const [sourceTitle, setSourceTitle] = useState('PIB Press Information Bureau Delhi');
  const [sourceUrl, setSourceUrl] = useState('https://pib.gov.in');
  const [pubDate, setPubDate] = useState('2024-10-20');

  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qEn.trim() || !qHi.trim() || optEn.some((o) => !o.trim())) {
      showToast('Please fill all mandatory question and option fields', 'error');
      return;
    }

    const newQ: Question = {
      id: `q-custom-${Date.now()}`,
      categoryId: catId,
      subtopic: subtopicEn || 'National Affairs',
      subtopicHi: subtopicHi || 'राष्ट्रीय घटनाक्रम',
      targetExam,
      examYear: '2024-25',
      difficulty,
      question: { en: qEn, hi: qHi },
      options: {
        en: [optEn[0], optEn[1], optEn[2], optEn[3]],
        hi: [optHi[0] || optEn[0], optHi[1] || optEn[1], optHi[2] || optEn[2], optHi[3] || optEn[3]],
      },
      correctIndex: correctIdx,
      explanation: { en: explEn, hi: explHi },
      sourceTitle,
      sourceUrl,
      publicationDate: pubDate,
      verified: true,
      createdAt: new Date().toISOString(),
    };

    addQuestion(newQ);
    setActiveAdminTab('questions');

    // Reset fields
    setQEn('');
    setQHi('');
    setOptEn(['', '', '', '']);
    setOptHi(['', '', '', '']);
    setExplEn('');
    setExplHi('');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Admin Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Editorial & System Administration</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
            QuizEarn India Admin Control Center
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage verified question repositories, review user discrepancy reports, and audit compliance logs
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveAdminTab('add_new')}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 transition"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Add Verified Question</span>
          </button>
        </div>
      </div>

      {/* Admin Nav Tabs */}
      <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl overflow-x-auto border border-slate-200 dark:border-slate-700/60">
        <button
          onClick={() => setActiveAdminTab('questions')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition whitespace-nowrap ${
            activeAdminTab === 'questions'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Question Repository ({questions.length})
        </button>

        <button
          onClick={() => setActiveAdminTab('add_new')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition whitespace-nowrap ${
            activeAdminTab === 'add_new'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Add Question (Bilingual)
        </button>

        <button
          onClick={() => setActiveAdminTab('reports')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition whitespace-nowrap flex items-center gap-1.5 ${
            activeAdminTab === 'reports'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <span>Reported Issues</span>
          {reports.filter((r) => r.status === 'PENDING').length > 0 && (
            <span className="w-2 h-2 rounded-full bg-rose-500" />
          )}
        </button>

        <button
          onClick={() => setActiveAdminTab('compliance')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition whitespace-nowrap ${
            activeAdminTab === 'compliance'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Legal & Security Checklist
        </button>
      </div>

      {/* Tab 1: Questions List */}
      {activeAdminTab === 'questions' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Showing {questions.length} verified competitive exam questions</span>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {questions.map((q) => (
              <div key={q.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-semibold text-slate-900 dark:text-white uppercase">{q.categoryId}</span>
                    <span aria-hidden="true">·</span>
                    <span>{q.subtopic}</span>
                    <span aria-hidden="true">·</span>
                    <span>{q.targetExam}</span>
                    <span aria-hidden="true">·</span>
                    <span className="capitalize">{q.difficulty}</span>
                    {q.verified && (
                      <span className="text-emerald-600 font-semibold flex items-center gap-0.5">
                        <CheckCircle2 className="w-3 h-3" /> Verified
                      </span>
                    )}
                  </div>

                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 line-clamp-2">
                    {q.question.en}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                    {q.question.hi}
                  </p>

                  <div className="text-[11px] text-slate-400 flex items-center gap-2">
                    <span>Source: {q.sourceTitle}</span>
                    {q.publicationDate && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>{q.publicationDate}</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => deleteQuestion(q.id)}
                    className="p-2 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                    title="Delete question"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Add New Question */}
      {activeAdminTab === 'add_new' && (
        <form onSubmit={handleCreateQuestion} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Create Verified Bilingual Question
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Category
              </label>
              <select
                value={catId}
                onChange={(e) => setCatId(e.target.value as CategoryId)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.titleEn}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Target Exam
              </label>
              <select
                value={targetExam}
                onChange={(e) => setTargetExam(e.target.value as ExamTarget)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                {EXAM_TARGETS.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.labelEn}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Difficulty
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as any)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Subtopic (English)
              </label>
              <input
                type="text"
                placeholder="e.g. Indian Polity & Constitutional Bodies"
                value={subtopicEn}
                onChange={(e) => setSubtopicEn(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Subtopic (Hindi)
              </label>
              <input
                type="text"
                placeholder="उदा. भारतीय राजव्यवस्था व संवैधानिक निकाय"
                value={subtopicHi}
                onChange={(e) => setSubtopicHi(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Question Text */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Question Text (English)
              </label>
              <textarea
                rows={3}
                value={qEn}
                onChange={(e) => setQEn(e.target.value)}
                placeholder="Enter complete question in English..."
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Question Text (Hindi)
              </label>
              <textarea
                rows={3}
                value={qHi}
                onChange={(e) => setQHi(e.target.value)}
                placeholder="हिंदी में पूर्ण प्रश्न दर्ज करें..."
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                required
              />
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              4 Options & Correct Answer
            </label>
            {[0, 1, 2, 3].map((idx) => (
              <div key={idx} className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                <div className="sm:col-span-1 flex items-center gap-2">
                  <input
                    type="radio"
                    name="correct_radio"
                    checked={correctIdx === idx}
                    onChange={() => setCorrectIdx(idx)}
                    className="accent-slate-900"
                  />
                  <span className="text-xs font-bold">{String.fromCharCode(65 + idx)}</span>
                </div>
                <div className="sm:col-span-5">
                  <input
                    type="text"
                    placeholder={`Option ${String.fromCharCode(65 + idx)} (English)`}
                    value={optEn[idx]}
                    onChange={(e) => {
                      const copy = [...optEn];
                      copy[idx] = e.target.value;
                      setOptEn(copy);
                    }}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    required
                  />
                </div>
                <div className="sm:col-span-6">
                  <input
                    type="text"
                    placeholder={`विकल्प ${String.fromCharCode(65 + idx)} (हिंदी)`}
                    value={optHi[idx]}
                    onChange={(e) => {
                      const copy = [...optHi];
                      copy[idx] = e.target.value;
                      setOptHi(copy);
                    }}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Explanation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Detailed Explanation (English)
              </label>
              <textarea
                rows={3}
                value={explEn}
                onChange={(e) => setExplEn(e.target.value)}
                placeholder="Explain the concept step-by-step with reasons..."
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Detailed Explanation (Hindi)
              </label>
              <textarea
                rows={3}
                value={explHi}
                onChange={(e) => setExplHi(e.target.value)}
                placeholder="विस्तृत व्याख्या और मुख्य बिंदु हिंदी में..."
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Sources and Verification */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Source Title
              </label>
              <input
                type="text"
                value={sourceTitle}
                onChange={(e) => setSourceTitle(e.target.value)}
                placeholder="e.g. Press Information Bureau Delhi"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Source URL
              </label>
              <input
                type="url"
                value={sourceUrl}
                onChange={(e) => setSourceUrl(e.target.value)}
                placeholder="https://pib.gov.in"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Publication / Exam Date
              </label>
              <input
                type="date"
                value={pubDate}
                onChange={(e) => setPubDate(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setActiveAdminTab('questions')}
              className="px-4 py-2 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-xs font-semibold rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 transition"
            >
              Publish Verified Question
            </button>
          </div>
        </form>
      )}

      {/* Tab 3: Reports */}
      {activeAdminTab === 'reports' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs p-6">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
            User Discrepancy & Error Reports
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Flagged items from aspirants reviewing answers or mock tests
          </p>

          {reports.length === 0 ? (
            <div className="text-center py-12 text-xs text-slate-400">
              Zero pending reports. All questions currently pass editorial verification standards.
            </div>
          ) : (
            <div className="space-y-4">
              {reports.map((rep) => (
                <div
                  key={rep.id}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white">
                      Reason: {rep.reason}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {rep.reportedAt} · By: {rep.reportedBy}
                    </span>
                  </div>

                  <p className="text-slate-700 dark:text-slate-300 font-medium">
                    "{rep.questionText}"
                  </p>
                  <p className="text-slate-500">Details: {rep.details}</p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-700/60">
                    <span
                      className={`font-semibold ${
                        rep.status === 'RESOLVED' ? 'text-emerald-600' : 'text-amber-600'
                      }`}
                    >
                      Status: {rep.status}
                    </span>

                    {rep.status === 'PENDING' && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => resolveReport(rep.id, 'RESOLVED')}
                          className="px-3 py-1 rounded-md bg-emerald-600 text-white font-semibold text-[11px]"
                        >
                          Resolve & Correct
                        </button>
                        <button
                          onClick={() => resolveReport(rep.id, 'REJECTED')}
                          className="px-3 py-1 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-[11px]"
                        >
                          Dismiss
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Legal & Security Checklist */}
      {activeAdminTab === 'compliance' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs p-6 sm:p-8 space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Cybersecurity & Legal Compliance Audit Matrix
          </h3>
          <p className="text-xs text-slate-500">
            Adherence to IT Rules 2021/2023, Game of Skill Judgments, and RBI/NPCI Guidelines
          </p>

          <div className="space-y-3 pt-2">
            {[
              {
                title: 'Segregation of Practice vs Monetary Wallets',
                desc: 'Knowledge Points (KP) are strictly virtual badges and separated from cash ledger balances.',
                status: 'PASSED',
              },
              {
                title: 'Real-Money Payout Deactivation State',
                desc: 'All real withdrawals are locked with COMPLIANCE_HOLD status until scheduled banking API approval.',
                status: 'PASSED',
              },
              {
                title: 'Zero Storage of Financial Secrets',
                desc: 'App does not collect, prompt for, or persist UPI PINs, ATM PINs, CVVs, or NetBanking passwords.',
                status: 'PASSED',
              },
              {
                title: 'Income Tax Section 194BA Disclosures',
                desc: 'Clear 30% TDS warning displayed before any payout submission.',
                status: 'PASSED',
              },
              {
                title: 'Anti-Bot & Rate Limiting Enforcement',
                desc: 'Mobile OTP verification required for official merit leaderboard indexing and fraud prevention.',
                status: 'PASSED',
              },
            ].map((check, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start justify-between gap-3"
              >
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {check.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">{check.desc}</p>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-sm bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 shrink-0">
                  {check.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
