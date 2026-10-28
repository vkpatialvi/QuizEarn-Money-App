import { CategoryId, ExamTarget, LeaderboardUser, UserProfile, WalletTransaction } from '../types/quiz';

export interface CategoryInfo {
  id: CategoryId;
  titleEn: string;
  titleHi: string;
  taglineEn: string;
  taglineHi: string;
  image: string;
  color: string;
  accent: string;
  topicsCount: number;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'current_affairs',
    titleEn: 'Current Affairs',
    titleHi: 'समसामयिकी (Current Affairs)',
    taglineEn: 'PIB, The Hindu, MoEFCC & National Policies with verified dates',
    taglineHi: 'पीआईबी, द हिंदू, राष्ट्रीय नीतियां एवं सत्यापित प्रकाशन तिथियां',
    image: '/src/assets/images/category_current_affairs_1793182983706.jpg',
    color: 'from-amber-500/10 to-orange-500/10 border-amber-200 dark:border-amber-900/40',
    accent: 'text-amber-600 dark:text-amber-400',
    topicsCount: 120,
  },
  {
    id: 'gk',
    titleEn: 'General Knowledge',
    titleHi: 'सामान्य ज्ञान (General Knowledge)',
    taglineEn: 'Polity & Articles, Modern History, Indian Geography & NCERT Science',
    taglineHi: 'संविधान व अनुच्छेद, आधुनिक इतिहास, भारत का भूगोल व विज्ञान',
    image: '/src/assets/images/category_general_knowledge_1793182983278.jpg',
    color: 'from-blue-500/10 to-indigo-500/10 border-blue-200 dark:border-blue-900/40',
    accent: 'text-blue-600 dark:text-blue-400',
    topicsCount: 350,
  },
  {
    id: 'reasoning',
    titleEn: 'Reasoning & Aptitude',
    titleHi: 'तर्कशक्ति एवं अभिरुचि (Reasoning)',
    taglineEn: 'Syllogisms, Blood Relations, Number Series & Analytical Logic',
    taglineHi: 'न्याय निगमन, रक्त संबंध, संख्या श्रृंखला और विश्लेषणात्मक तर्क',
    image: '/src/assets/images/category_reasoning_aptitude_1793182983412.jpg',
    color: 'from-emerald-500/10 to-teal-500/10 border-emerald-200 dark:border-emerald-900/40',
    accent: 'text-emerald-600 dark:text-emerald-400',
    topicsCount: 180,
  },
  {
    id: 'previous_exams',
    titleEn: 'Previous Exam Papers',
    titleHi: 'पिछले वर्षों के प्रश्न (PYQs)',
    taglineEn: 'Real question papers from UPSC CSE, SSC CGL, RRB NTPC & State PSCs',
    taglineHi: 'यूपीएससी, एसएससी सीजीएल, रेलवे और राज्य लोक सेवा आयोग के वास्तविक प्रश्न',
    image: '/src/assets/images/hero_exam_aspirants_1793182982570.jpg',
    color: 'from-purple-500/10 to-pink-500/10 border-purple-200 dark:border-purple-900/40',
    accent: 'text-purple-600 dark:text-purple-400',
    topicsCount: 420,
  },
];

export const INDIAN_STATES = [
  'All India',
  'Uttar Pradesh',
  'Bihar',
  'Rajasthan',
  'Madhya Pradesh',
  'Maharashtra',
  'Delhi (NCR)',
  'Haryana',
  'West Bengal',
  'Jharkhand',
  'Uttarakhand',
  'Punjab',
  'Karnataka',
  'Tamil Nadu',
  'Telangana',
  'Andhra Pradesh',
  'Gujarat',
  'Odisha',
  'Assam',
  'Chhattisgarh',
];

export const EXAM_TARGETS: { id: ExamTarget; labelEn: string; labelHi: string }[] = [
  { id: 'UPSC', labelEn: 'UPSC Civil Services (IAS/IPS)', labelHi: 'यूपीएससी सिविल सेवा' },
  { id: 'SSC_CGL', labelEn: 'SSC CGL / CHSL', labelHi: 'एसएससी सीजीएल / सीएचएसएल' },
  { id: 'STATE_PSC', labelEn: 'State PSC (UPPSC, BPSC, RAS, MPPSC)', labelHi: 'राज्य लोक सेवा आयोग (PCS)' },
  { id: 'BANKING_IBPS', labelEn: 'Banking (IBPS PO, SBI Clerk)', labelHi: 'बैंकिंग (IBPS / SBI)' },
  { id: 'RAILWAYS_RRB', labelEn: 'Railways RRB NTPC / Group D', labelHi: 'रेलवे आरआरबी एनटीपीसी' },
  { id: 'DEFENCE', labelEn: 'Defence (CDS, NDA, AFCAT)', labelHi: 'रक्षा सेवाएं (CDS / NDA)' },
];

export const DEFAULT_USER: UserProfile = {
  id: 'user-default-01',
  name: 'Vikram Sharma',
  phone: '+91 98765 43210',
  email: 'vikram.aspirant@gmail.com',
  targetExam: 'UPSC',
  state: 'Uttar Pradesh',
  avatarSeed: 'aspirant-vikram',
  streakDays: 6,
  lastActiveDate: new Date().toISOString().split('T')[0],
  knowledgePoints: 1450, // Practice points earned by solving quizzes
  cashWalletBalance: 250.0, // Segregated cash pool - locked under legal compliance
  kycVerified: false,
  isAdmin: false,
  badges: ['7-Day Streak Warrior', 'Constitution Scholar', 'Current Affairs Hawk'],
};

export const INITIAL_LEADERBOARD: LeaderboardUser[] = [
  {
    id: 'lead-01',
    name: 'Ananya Verma',
    state: 'Uttar Pradesh',
    airRank: 1,
    stateRank: 1,
    score: 3840,
    targetExam: 'UPSC',
    accuracy: 94.2,
    streak: 28,
    avatarSeed: 'ananya-v',
  },
  {
    id: 'lead-02',
    name: 'Rohit Kumar Meena',
    state: 'Rajasthan',
    airRank: 2,
    stateRank: 1,
    score: 3620,
    targetExam: 'SSC_CGL',
    accuracy: 91.8,
    streak: 22,
    avatarSeed: 'rohit-km',
  },
  {
    id: 'lead-03',
    name: 'Pooja Pandey',
    state: 'Bihar',
    airRank: 3,
    stateRank: 1,
    score: 3510,
    targetExam: 'STATE_PSC',
    accuracy: 89.5,
    streak: 19,
    avatarSeed: 'pooja-p',
  },
  {
    id: 'lead-04',
    name: 'Aditya Patil',
    state: 'Maharashtra',
    airRank: 4,
    stateRank: 1,
    score: 3420,
    targetExam: 'BANKING_IBPS',
    accuracy: 88.0,
    streak: 15,
    avatarSeed: 'aditya-pt',
  },
  {
    id: 'lead-05',
    name: 'Siddharth Mukherjee',
    state: 'West Bengal',
    airRank: 5,
    stateRank: 1,
    score: 3290,
    targetExam: 'UPSC',
    accuracy: 86.4,
    streak: 14,
    avatarSeed: 'siddharth-m',
  },
  {
    id: 'lead-06',
    name: 'Priyanka Sharma',
    state: 'Madhya Pradesh',
    airRank: 6,
    stateRank: 1,
    score: 3180,
    targetExam: 'STATE_PSC',
    accuracy: 85.1,
    streak: 12,
    avatarSeed: 'priyanka-s',
  },
  {
    id: 'lead-07',
    name: 'Harpreet Singh',
    state: 'Punjab',
    airRank: 7,
    stateRank: 1,
    score: 3050,
    targetExam: 'SSC_CGL',
    accuracy: 84.6,
    streak: 9,
    avatarSeed: 'harpreet-s',
  },
  {
    id: 'lead-08',
    name: 'Vikram Sharma (You)',
    state: 'Uttar Pradesh',
    airRank: 24,
    stateRank: 6,
    score: 1450,
    targetExam: 'UPSC',
    accuracy: 82.5,
    streak: 6,
    avatarSeed: 'aspirant-vikram',
  },
];

export const INITIAL_TRANSACTIONS: WalletTransaction[] = [
  {
    id: 'tx-001',
    timestamp: '2026-10-27 19:40:22',
    type: 'CREDIT_KP',
    amount: 100,
    currency: 'KP',
    description: {
      en: 'Completed Daily UPSC GS Challenge (Score: 5/5)',
      hi: 'दैनिक यूपीएससी जीएस चुनौती पूरी की (अंक: 5/5)',
    },
    status: 'COMPLETED',
    referenceId: 'QUIZ-DAILY-20261027',
  },
  {
    id: 'tx-002',
    timestamp: '2026-10-27 19:42:15',
    type: 'STREAK_BONUS',
    amount: 50,
    currency: 'KP',
    description: {
      en: '6-Day Continuous Study Streak Bonus',
      hi: 'लगातार 6-दिवसीय अध्ययन स्ट्रीक बोनस',
    },
    status: 'COMPLETED',
    referenceId: 'STREAK-6D',
  },
  {
    id: 'tx-003',
    timestamp: '2026-10-26 14:10:00',
    type: 'CREDIT_KP',
    amount: 250,
    currency: 'KP',
    description: {
      en: 'All-India Speed Mock Test #1 Participation',
      hi: 'अखिल भारतीय स्पीड मॉक टेस्ट #1 में सहभागिता',
    },
    status: 'COMPLETED',
    referenceId: 'MOCK-01-SUBMIT',
  },
  {
    id: 'tx-004',
    timestamp: '2026-10-25 11:00:00',
    type: 'REWARD_PENDING',
    amount: 250,
    currency: 'INR',
    description: {
      en: 'Monthly Topper Scholarship Allocation [Regulatory Compliance Hold]',
      hi: 'मासिक टॉपर छात्रवृत्ति आवंटन [नियामक अनुपालन समीक्षाधीन]',
    },
    status: 'COMPLIANCE_HOLD',
    referenceId: 'SCHOLARSHIP-ALLOC-OCT',
  },
];

export const BADGE_DEFINITIONS = [
  {
    id: 'badge-streak',
    name: '7-Day Streak Warrior',
    nameHi: '7-दिवसीय अध्ययन योद्धा',
    desc: 'Practiced quizzes for 7 consecutive days',
    icon: 'flame',
  },
  {
    id: 'badge-constitution',
    name: 'Constitution Scholar',
    nameHi: 'संविधान विशेषज्ञ',
    desc: 'Answered 10+ Indian Polity questions with 90%+ accuracy',
    icon: 'book',
  },
  {
    id: 'badge-hawk',
    name: 'Current Affairs Hawk',
    nameHi: 'समसामयिकी दृष्टि',
    desc: 'Mastered recent PIB & National Policy updates',
    icon: 'zap',
  },
  {
    id: 'badge-speed',
    name: 'Speed Demon',
    nameHi: 'गतिशील मेधावी',
    desc: 'Completed timed mock test under 45s per question',
    icon: 'clock',
  },
  {
    id: 'badge-centurion',
    name: 'Centurion Aspirant',
    nameHi: 'शतकवीर अभ्यर्थी',
    desc: 'Solved 100+ questions across all competitive categories',
    icon: 'award',
  },
];
