import React, { useState } from 'react';
import {
  Wallet,
  ShieldCheck,
  AlertTriangle,
  FileText,
  Clock,
  ArrowUpRight,
  Info,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const WalletSection: React.FC = () => {
  const { user, walletTransactions, addWalletTransaction, language, showToast } = useApp();

  const [payoutAmount, setPayoutAmount] = useState('100');
  const [payoutMethod, setPayoutMethod] = useState<'upi' | 'bank'>('upi');
  const [upiId, setUpiId] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [beneficiaryName, setBeneficiaryName] = useState('');
  const [showPayoutModal, setShowPayoutModal] = useState(false);

  const handleRequestPayout = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(payoutAmount);

    if (isNaN(amt) || amt < 100) {
      showToast(
        language === 'hi'
          ? 'न्यूनतम निकासी सीमा ₹100 है'
          : 'Minimum payout withdrawal threshold is ₹100',
        'error'
      );
      return;
    }

    if (amt > user.cashWalletBalance) {
      showToast(
        language === 'hi' ? 'अपर्याप्त नकद शेष' : 'Insufficient cash wallet balance',
        'error'
      );
      return;
    }

    // Per prompt instructions: Real-money rewards and withdrawals must stay disabled/locked
    // pending Indian legal requirements & provider approvals. We record an auditable COMPLIANCE_HOLD entry.
    addWalletTransaction({
      type: 'REWARD_PENDING',
      amount: amt,
      currency: 'INR',
      description: {
        en: `Withdrawal Request to ${payoutMethod === 'upi' ? `UPI (${upiId})` : `Bank (${ifscCode})`} [Regulatory Compliance Hold]`,
        hi: `${payoutMethod === 'upi' ? `UPI (${upiId})` : `Bank (${ifscCode})`} पर निकासी अनुरोध [नियामक अनुपालन समीक्षाधीन]`,
      },
      status: 'COMPLIANCE_HOLD',
      referenceId: `REQ-${Date.now().toString().slice(-6)}`,
    });

    setShowPayoutModal(false);
    showToast(
      language === 'hi'
        ? 'निकासी अनुरोध दर्ज हुआ। भारतीय नियामक अनुपालन समीक्षा के कारण यह लंबित है।'
        : 'Request logged in auditable ledger. Status: Compliance Review Hold.',
      'info'
    );
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Strict Legal Compliance Banner */}
      <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-300 dark:border-amber-800/60 text-slate-800 dark:text-slate-200">
        <div className="flex items-start gap-3.5">
          <ShieldCheck className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs leading-relaxed">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              {language === 'hi'
                ? 'भारतीय विधिक एवं नियामक अनुपालन प्रकटीकरण (Skill Gaming Compliance)'
                : 'Indian Legal & Regulatory Compliance Transparency Notice'}
            </h4>
            <p>
              {language === 'hi'
                ? 'क्विज़अर्न इंडिया एक विशुद्ध शैक्षणिक एवं ज्ञान मूल्यांकन मंच है। अभ्यास ज्ञान बिंदु (Knowledge Points - KP) पूरी तरह से निःशुल्क हैं और इनका कोई मौद्रिक रूपांतरण नहीं है। भारतीय सूचना प्रौद्योगिकी नियम, कौशल आधारित खेल दिशानिर्देशों तथा धारा 194BA (TDS) के तहत वास्तविक मौद्रिक पुरस्कार एवं निकासी वर्तमान में नियामक समीक्षा एवं बैंकिंग गेटवे अनुमोदन के अधीन हैं। किसी भी समय कोई जीत या आय की गारंटी नहीं दी जाती है।'
                : 'QuizEarn India is an educational exam preparation platform. Practice Knowledge Points (KP) are educational badges with zero monetary value. Per Indian Skill Gaming regulations and Section 194BA of the Income Tax Act (TDS on net winnings), real-money cash withdrawals remain disabled until formal state-wise regulatory approvals and scheduled commercial bank partner integrations are finalized.'}
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] font-semibold text-amber-800 dark:text-amber-400">
              <span>• Zero Hidden Charges</span>
              <span>• No UPI PINs or CVVs Ever Stored</span>
              <span>• Auditable Server Ledger</span>
            </div>
          </div>
        </div>
      </div>

      {/* Two Wallet Cards (Practice KP vs Cash Wallet) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card 1: Practice Knowledge Points (KP) */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                Practice Currency
              </span>
              <span className="text-xs text-slate-400">Non-monetary</span>
            </div>
            
            <div className="mt-4">
              <p className="text-xs text-slate-500">Knowledge Points (KP)</p>
              <p className="text-3xl font-extrabold font-mono text-slate-900 dark:text-white mt-1">
                {user.knowledgePoints}{' '}
                <span className="text-sm font-semibold text-amber-500">KP</span>
              </p>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
              Earned by solving daily quizzes, maintaining study streaks, and attempting mock tests. Used to unlock advanced question sets and climb the All-India Leaderboard.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-500">Daily Quiz: +10 KP/Q</span>
            <span className="text-slate-500">Mock Test: +150 KP</span>
          </div>
        </div>

        {/* Card 2: Cash Wallet Balance (₹) */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                Cash Wallet (Segregated)
              </span>
              <span className="flex items-center gap-1 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                <Lock className="w-3 h-3" /> Compliance Locked
              </span>
            </div>
            
            <div className="mt-4">
              <p className="text-xs text-slate-500">Available Reward Balance</p>
              <p className="text-3xl font-extrabold font-mono text-slate-900 dark:text-white mt-1">
                ₹{user.cashWalletBalance.toFixed(2)}
              </p>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
              Legally segregated reward pool for verified merit challenges. Real withdrawals are locked until final regulatory compliance verification.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
            <div className="text-xs text-slate-500">
              Min. Payout: <strong className="text-slate-700 dark:text-slate-300">₹100</strong>
            </div>

            <button
              onClick={() => setShowPayoutModal(true)}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 transition"
            >
              <ArrowUpRight className="w-3.5 h-3.5 inline mr-1" />
              {language === 'hi' ? 'निकासी अनुरोध (समीक्षा)' : 'Request Payout (Review)'}
            </button>
          </div>
        </div>

      </div>

      {/* Transaction History & Auditable Ledger */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
        
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {language === 'hi' ? 'ऑडिटेबल लेन-देन बहीखाता' : 'Auditable Transaction Ledger'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Immutable log of practice points, merit allocations, and compliance verification requests
            </p>
          </div>
        </div>

        <div className="mt-4 divide-y divide-slate-100 dark:divide-slate-800">
          {walletTransactions.map((tx) => {
            const isCredit = tx.amount > 0;
            const desc = tx.description[language] || tx.description.en;

            return (
              <div key={tx.id} className="py-4 flex items-center justify-between gap-4">
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                      {desc}
                    </span>
                    {tx.status === 'COMPLIANCE_HOLD' && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-semibold shrink-0">
                        Hold: Legal Review
                      </span>
                    )}
                    {tx.status === 'COMPLETED' && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-semibold shrink-0">
                        Verified
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                    <span>{tx.timestamp}</span>
                    <span aria-hidden="true">·</span>
                    <span>Ref: {tx.referenceId}</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span
                    className={`font-mono text-sm font-bold ${
                      tx.currency === 'INR'
                        ? 'text-indigo-600 dark:text-indigo-400'
                        : 'text-amber-600 dark:text-amber-400'
                    }`}
                  >
                    {isCredit ? '+' : '-'}
                    {tx.currency === 'INR' ? `₹${tx.amount.toFixed(2)}` : `${tx.amount} KP`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Payout Request Modal with Strict Rules */}
      {showPayoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 p-6 sm:p-7 shadow-2xl border border-slate-200 dark:border-slate-800">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {language === 'hi' ? 'रिवॉर्ड निकासी अनुरोध' : 'Reward Payout Request'}
              </h3>
              <button
                onClick={() => setShowPayoutModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm"
              >
                ✕
              </button>
            </div>

            <div className="my-4 p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-1">
              <p className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                {language === 'hi' ? 'अनुपालन नियम एवं दिशानिर्देश' : 'Payout Rules & Verification Policy'}
              </p>
              <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-500 dark:text-slate-400">
                <li>Minimum withdrawal threshold: <strong>₹100</strong>.</li>
                <li>Processing Time: 24 to 48 banking hours after compliance signoff.</li>
                <li>Section 194BA TDS: 30% tax deducted on net winnings where applicable.</li>
                <li><strong>Security Guarantee:</strong> We never request UPI PIN or banking passwords.</li>
              </ul>
            </div>

            <form onSubmit={handleRequestPayout} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'hi' ? 'निकासी राशि (₹)' : 'Withdrawal Amount (₹)'}
                </label>
                <input
                  type="number"
                  min="100"
                  max={user.cashWalletBalance}
                  value={payoutAmount}
                  onChange={(e) => setPayoutAmount(e.target.value)}
                  className="w-full px-3 py-2 text-sm font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Payout Method
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPayoutMethod('upi')}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center transition ${
                      payoutMethod === 'upi'
                        ? 'border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-900'
                        : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    UPI ID (VPA)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPayoutMethod('bank')}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center transition ${
                      payoutMethod === 'bank'
                        ? 'border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-900'
                        : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    Direct Bank Transfer (NEFT/IMPS)
                  </button>
                </div>
              </div>

              {payoutMethod === 'upi' ? (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Virtual Payment Address (UPI ID)
                  </label>
                  <input
                    type="text"
                    placeholder="aspirant@okhdfcbank"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    required
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Enter valid UPI ID. Do NOT share your UPI PIN with anyone.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Account Holder Name
                    </label>
                    <input
                      type="text"
                      placeholder="Vikram Sharma"
                      value={beneficiaryName}
                      onChange={(e) => setBeneficiaryName(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Bank Account Number
                      </label>
                      <input
                        type="text"
                        placeholder="123456789012"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        IFSC Code
                      </label>
                      <input
                        type="text"
                        placeholder="HDFC0001234"
                        value={ifscCode}
                        onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
                        className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowPayoutModal(false)}
                  className="px-4 py-2 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 transition"
                >
                  Submit for Compliance Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
