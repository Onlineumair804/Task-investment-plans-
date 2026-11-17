import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Trophy, Award, Users, ArrowUpRight, ArrowDownLeft, Shield, Star, Medal } from 'lucide-react';

export const LeaderboardsPage: React.FC = () => {
  const { users, transactions, referrals } = useApp();
  const [activeTab, setActiveTab] = useState<'referral' | 'deposit' | 'withdraw'>('referral');

  // Compute mock / dynamic leaderboards based on users and transactions
  const referralRankings = users.map(u => {
    const refCount = referrals.filter(r => r.referrerId === u.id).length + Math.floor(Math.random() * 15);
    const commEarned = refCount * 25.50 + u.balance.totalEarned * 0.15;
    return {
      name: u.fullName,
      username: u.username,
      vip: u.activeVipPlanId ? u.activeVipPlanId.toUpperCase() : 'VIP 1',
      metric: `${refCount} Referrals`,
      amount: commEarned
    };
  }).sort((a, b) => b.amount - a.amount);

  const depositRankings = users.map(u => {
    const userTxs = transactions.filter(t => t.userId === u.id && t.type === 'deposit');
    const totalDep = userTxs.reduce((acc, t) => acc + t.amount, 0) + (u.balance.available > 500 ? u.balance.available * 1.5 : 500);
    return {
      name: u.fullName,
      username: u.username,
      vip: u.activeVipPlanId ? u.activeVipPlanId.toUpperCase() : 'VIP 3',
      metric: 'Verified Deposit',
      amount: totalDep
    };
  }).sort((a, b) => b.amount - a.amount);

  const withdrawRankings = users.map(u => {
    const userTxs = transactions.filter(t => t.userId === u.id && t.type === 'withdrawal');
    const totalWd = userTxs.reduce((acc, t) => acc + Math.abs(t.amount), 0) + u.balance.withdrawn + (u.balance.totalEarned > 1000 ? 1250 : 350);
    return {
      name: u.fullName,
      username: u.username,
      vip: u.activeVipPlanId ? u.activeVipPlanId.toUpperCase() : 'VIP 5',
      metric: 'Total Payout',
      amount: totalWd
    };
  }).sort((a, b) => b.amount - a.amount);

  const getRankBadge = (index: number) => {
    if (index === 0) return <span className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-300 to-amber-500 text-[#120720] font-black flex items-center justify-center shadow-lg shadow-amber-500/30">1</span>;
    if (index === 1) return <span className="w-8 h-8 rounded-full bg-slate-300 text-slate-900 font-black flex items-center justify-center shadow">2</span>;
    if (index === 2) return <span className="w-8 h-8 rounded-full bg-amber-700 text-white font-black flex items-center justify-center shadow">3</span>;
    return <span className="w-8 h-8 rounded-full bg-purple-900/60 text-purple-200 font-bold flex items-center justify-center">{index + 1}</span>;
  };

  return (
    <div className="min-h-screen bg-[#120720] text-purple-100 py-12 px-4 sm:px-6 lg:px-8 selection:bg-amber-400 selection:text-[#120720]">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-purple-900/60 border border-purple-500/40 px-4 py-1.5 rounded-full text-xs font-bold text-amber-300">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>GLOBAL PLATFORM RANKINGS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white">VIP Performance & Financial Leaderboards</h1>
          <p className="text-xs sm:text-sm text-purple-300 max-w-xl mx-auto">
            Recognizing top-performing partners across referral recruitment, verified deposits, and payout withdrawals.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-2 sm:gap-4">
          <button
            onClick={() => setActiveTab('referral')}
            className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${activeTab === 'referral' ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-[#120720] shadow-lg shadow-amber-500/20' : 'bg-[#1a0b36] text-purple-300 border border-purple-500/30 hover:bg-purple-900/50'}`}
          >
            <Users className="w-4 h-4" />
            <span>Refrel Leaderboard</span>
          </button>
          
          <button
            onClick={() => setActiveTab('deposit')}
            className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${activeTab === 'deposit' ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-[#120720] shadow-lg shadow-amber-500/20' : 'bg-[#1a0b36] text-purple-300 border border-purple-500/30 hover:bg-purple-900/50'}`}
          >
            <ArrowDownLeft className="w-4 h-4" />
            <span>Deposit Leaderboard</span>
          </button>

          <button
            onClick={() => setActiveTab('withdraw')}
            className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${activeTab === 'withdraw' ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-[#120720] shadow-lg shadow-amber-500/20' : 'bg-[#1a0b36] text-purple-300 border border-purple-500/30 hover:bg-purple-900/50'}`}
          >
            <ArrowUpRight className="w-4 h-4" />
            <span>Withdraw Leaderboard</span>
          </button>
        </div>

        {/* Leaderboard Table / List */}
        <div className="bg-[#1a0b36] border-2 border-purple-500/30 rounded-3xl overflow-hidden shadow-2xl purple-glow">
          <div className="p-6 border-b border-purple-900 flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Medal className="w-5 h-5 text-amber-400" />
              <span>
                {activeTab === 'referral' && 'Top Referral Team Leaders'}
                {activeTab === 'deposit' && 'Top Verified Depositors'}
                {activeTab === 'withdraw' && 'Top Payout Recipients'}
              </span>
            </h3>
            <span className="text-xs font-mono text-purple-300">Updated Real-Time</span>
          </div>

          <div className="divide-y divide-purple-950">
            {(activeTab === 'referral' ? referralRankings : activeTab === 'deposit' ? depositRankings : withdrawRankings).map((item, idx) => (
              <div key={idx} className="p-5 sm:p-6 flex items-center justify-between gap-4 hover:bg-purple-900/20 transition-colors">
                <div className="flex items-center gap-4">
                  {getRankBadge(idx)}
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-white">{item.name}</h4>
                    <p className="text-xs text-purple-300">@{item.username} · <span className="text-amber-400 font-semibold">{item.vip}</span></p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs text-purple-300 block">{item.metric}</span>
                  <span className="text-base sm:text-lg font-mono font-black text-emerald-400">
                    {activeTab === 'referral' ? `${Math.floor(item.amount / 25)} Referrals` : `$${item.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
