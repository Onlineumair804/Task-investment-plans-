import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Users, Copy, Check, Shield, Share2 } from 'lucide-react';

export const InviteReferralPage: React.FC = () => {
  const { currentUser, referrals, referralSettings } = useApp();
  const [copied, setCopied] = useState(false);

  const referralLink = `https://taskinvestpro.com/register?ref=${currentUser?.referralCode || 'TIPPRO'}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const userReferrals = referrals;
  const level1Count = userReferrals.filter(r => r.level === 1).length;
  const level2Count = userReferrals.filter(r => r.level === 2).length;
  const level3Count = userReferrals.filter(r => r.level === 3).length;

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 py-12 px-4 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-3xl font-black text-white">Invite & Referral (3 Levels)</h1>
          <p className="text-xs text-slate-400">Build your referral team across 3 levels and earn verified revenue commissions.</p>
        </div>

        {/* Referral Link Card */}
        <div className="bg-[#111827] border border-slate-800 p-8 rounded-3xl space-y-4">
          <h3 className="text-lg font-bold text-white">Your Unique Referral Link</h3>
          <p className="text-xs text-slate-400">Share your link with colleagues and partners to invite them to your referral network.</p>
          
          <div className="flex items-center gap-3 bg-[#070A12] border border-slate-700 p-3 rounded-2xl">
            <input 
              type="text" 
              readOnly 
              value={referralLink}
              className="bg-transparent text-xs text-amber-400 font-mono w-full focus:outline-none"
            />
            <button 
              onClick={handleCopy}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-[#0B0F19] font-bold text-xs rounded-xl flex items-center gap-1.5 shrink-0 transition-all"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy Link'}</span>
            </button>
          </div>
        </div>

        {/* 3-Level Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#111827] border border-slate-800 p-6 rounded-3xl space-y-2">
            <span className="text-xs text-amber-400 font-bold uppercase tracking-widest">Level 1 ({referralSettings.level1Percent}%)</span>
            <div className="text-3xl font-black font-mono text-white">{level1Count} Users</div>
            <p className="text-[11px] text-slate-400">Direct invitations</p>
          </div>
          <div className="bg-[#111827] border border-slate-800 p-6 rounded-3xl space-y-2">
            <span className="text-xs text-amber-400 font-bold uppercase tracking-widest">Level 2 ({referralSettings.level2Percent}%)</span>
            <div className="text-3xl font-black font-mono text-white">{level2Count} Users</div>
            <p className="text-[11px] text-slate-400">Team tier invitations</p>
          </div>
          <div className="bg-[#111827] border border-slate-800 p-6 rounded-3xl space-y-2">
            <span className="text-xs text-amber-400 font-bold uppercase tracking-widest">Level 3 ({referralSettings.level3Percent}%)</span>
            <div className="text-3xl font-black font-mono text-white">{level3Count} Users</div>
            <p className="text-[11px] text-slate-400">Extended network</p>
          </div>
        </div>

        {/* Referral Network List */}
        <div className="bg-[#111827] border border-slate-800 rounded-3xl overflow-hidden">
          <div className="p-6 border-b border-slate-800 font-bold text-base text-white">Invited Members Network</div>
          <div className="divide-y divide-slate-800">
            {userReferrals.length === 0 ? (
              <div className="p-12 text-center text-slate-400 text-sm">No referrals recorded yet. Share your link to start building your team.</div>
            ) : (
              userReferrals.map(ref => (
                <div key={ref.id} className="p-6 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-amber-400" />
                      <span className="text-sm font-bold text-white">{ref.referredName}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-400">
                        Level {ref.level}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">Joined: {ref.joinedDate}</p>
                  </div>
                  <span className="font-mono font-bold text-emerald-400 text-sm">+${ref.commissionEarned.toFixed(2)} Commission</span>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
