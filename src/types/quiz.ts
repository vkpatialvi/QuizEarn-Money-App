export type Language = 'en' | 'hi';

export type CategoryId = 'gk' | 'current_affairs' | 'reasoning' | 'previous_exams';

export type ExamTarget = 'UPSC' | 'SSC_CGL' | 'BANKING_IBPS' | 'RAILWAYS_RRB' | 'STATE_PSC' | 'DEFENCE';

export interface BilingualText {
  en: string;
  hi: string;
}

export interface Question {
  id: string;
  categoryId: CategoryId;
  subtopic: string;
  subtopicHi?: string;
  targetExam?: ExamTarget;
  examYear?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: BilingualText;
  options: {
    en: [string, string, string, string];
    hi: [string, string, string, string];
  };
  correctIndex: number; // 0, 1, 2, or 3
  explanation: BilingualText;
  sourceTitle: string;
  sourceUrl?: string;
  publicationDate?: string;
  verified: boolean;
  createdAt: string;
}

export interface UserAnswer {
  questionId: string;
  selectedOption: number | null; // null if unattempted
  isCorrect: boolean;
  timeSpentSeconds: number;
  markedForReview: boolean;
}

export interface MockTestSession {
  id: string;
  title: BilingualText;
  totalQuestions: number;
  timeLimitMinutes: number;
  correctMarks: number;
  negativeMarks: number;
  startedAt: string;
  completedAt?: string;
  answers: Record<string, UserAnswer>;
  score?: number;
  accuracy?: number;
  airRank?: number;
}

export interface Bookmark {
  questionId: string;
  savedAt: string;
  note?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  targetExam: ExamTarget;
  state: string;
  avatarSeed: string;
  streakDays: number;
  lastActiveDate: string;
  knowledgePoints: number; // Practice currency
  cashWalletBalance: number; // Strictly segregated cash points (frozen per legal guidelines)
  kycVerified: boolean;
  isAdmin: boolean;
  badges: string[];
}

export interface LeaderboardUser {
  id: string;
  name: string;
  state: string;
  airRank: number;
  stateRank: number;
  score: number;
  targetExam: string;
  accuracy: number;
  streak: number;
  avatarSeed: string;
}

export interface WalletTransaction {
  id: string;
  timestamp: string;
  type: 'CREDIT_KP' | 'BONUS_KP' | 'STREAK_BONUS' | 'REWARD_PENDING';
  amount: number;
  currency: 'KP' | 'INR';
  description: BilingualText;
  status: 'COMPLETED' | 'COMPLIANCE_HOLD' | 'SYSTEM_LOCKED';
  referenceId: string;
}

export interface QuestionReport {
  id: string;
  questionId: string;
  questionText: string;
  reason: 'incorrect_answer' | 'typo' | 'outdated_info' | 'translation_issue';
  details: string;
  reportedBy: string;
  reportedAt: string;
  status: 'PENDING' | 'RESOLVED' | 'REJECTED';
}
