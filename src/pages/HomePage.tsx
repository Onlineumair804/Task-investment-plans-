import React from 'react';
import { useApp } from '../context/AppContext';
import { Shield, CheckCircle, ArrowRight, Layers, Award, Users, Lock, TrendingUp, Zap, Star, Rocket, Check } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { setActiveRoute, vipPlans, websiteSettings, setSelectedVipDetailId, currentUser } = useApp();

  const navigateTo = (route: string, vipId?: string) => {
    if (vipId) setSelectedVipDetailId(vipId);
    setActiveRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#120720] text-purple-100 flex flex-col selection:bg-amber-400 selection:text-[#120720]">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 px-4 sm:px-6 lg:px-8 border-b border-purple-900/50 bg-gradient-to-b from-[#1a0b36] via-[#120720] to-[#120720]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-600/20 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-purple-900/60 border border-purple-500/40 px-4 py-2 rounded-full text-xs font-bold text-amber-300 shadow-lg shadow-purple-900/40">
              <Shield className="w-4 h-4 text-amber-400" />
              <span>GUARANTEED EARNINGS & PROVEN RESULTS · VIP PLATFORM</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08]">
              MONETIZED <span className="bg-gradient-to-r from-purple-300 via-purple-200 to-white bg-clip-text text-transparent">VIP WEBSITE</span> <br />
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">FOR SALE & ACTIVE!</span>
            </h1>

            <p className="text-base sm:text-lg text-purple-200 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Start earning immediately with verified enterprise business revenue contracts. Complete VIP tasks, earn daily passive income, and build sustainable long-term value across 9 professional VIP tiers.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <button 
                onClick={() => navigateTo('vip-plans')}
                className="px-8 py-4 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-[#120720] font-black text-sm uppercase tracking-wider rounded-2xl shadow-xl shadow-amber-500/30 flex items-center gap-2.5 transition-all transform hover:-translate-y-0.5"
              >
                <span>Explore VIP Plans (1 - 9)</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              {!currentUser && (
                <button 
                  onClick={() => navigateTo('register')}
                  className="px-8 py-4 bg-purple-900/80 hover:bg-purple-800 text-white font-bold text-sm uppercase tracking-wider rounded-2xl border border-purple-500/40 shadow-lg transition-all"
                >
                  Create Free Account
                </button>
              )}
            </div>

            {/* Stats row for Mobile, Tablet & PC */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-purple-900/60 max-w-lg mx-auto lg:mx-0">
              <div className="bg-[#1a0b36]/80 border border-purple-500/20 p-4 rounded-2xl">
                <div className="text-2xl sm:text-3xl font-black font-mono text-amber-400">9 Tiers</div>
                <div className="text-[11px] text-purple-300 mt-1 uppercase font-semibold">VIP Levels</div>
              </div>
              <div className="bg-[#1a0b36]/80 border border-purple-500/20 p-4 rounded-2xl">
                <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400">${(websiteSettings.verifiedRevenueTotal / 1000).toFixed(0)}k+</div>
                <div className="text-[11px] text-purple-300 mt-1 uppercase font-semibold">Verified Revenue</div>
              </div>
              <div className="bg-[#1a0b36]/80 border border-purple-500/20 p-4 rounded-2xl">
                <div className="text-2xl sm:text-3xl font-black font-mono text-purple-200">3 Level</div>
                <div className="text-[11px] text-purple-300 mt-1 uppercase font-semibold">Referral System</div>
              </div>
            </div>
          </div>

          {/* Right Shield Badge Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="bg-gradient-to-b from-[#1f0d3d] to-[#140726] border-2 border-amber-500/40 p-8 rounded-3xl shadow-2xl purple-glow relative max-w-md w-full text-center space-y-6">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-[#120720] font-black text-xs uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                ★ CERTIFIED SYSTEM ★
              </div>

              <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-[#120720] shadow-xl shadow-amber-500/20">
                <Shield className="w-14 h-14 fill-[#120720]" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black text-white">TASK INVEST PRO</h3>
                <p className="text-xs text-purple-300">Fully Automated VIP Task Execution & Revenue Sharing Platform</p>
              </div>

              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3 p-3 bg-[#120720] rounded-xl border border-purple-500/20 text-xs">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-purple-200">Strict VIP-Based Task Isolation</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-[#120720] rounded-xl border border-purple-500/20 text-xs">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-purple-200">Real-Time Secure Wallet & Payouts</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-[#120720] rounded-xl border border-purple-500/20 text-xs">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-purple-200">3-Level Commission Dashboard</span>
                </div>
              </div>

              <button 
                onClick={() => navigateTo('vip-plans')}
                className="w-full py-3.5 bg-purple-800 hover:bg-purple-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl border border-purple-500/40 transition-colors flex items-center justify-center gap-2"
              >
                <span>View All VIP Tiers</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 5 Feature Icons Row (Like Reference Image) */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#160928] border-b border-purple-900/50">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          {[
            { title: 'PROVEN TRAFFIC METHOD', desc: 'Step-by-step included' },
            { title: 'FULLY SET UP & OPTIMIZED', desc: 'Instant monetization' },
            { title: 'BEGINNER FRIENDLY', desc: 'No prior experience needed' },
            { title: 'PASSIVE INCOME', desc: 'Earnings from day one' },
            { title: 'SAFE & SECURE', desc: 'Long term business asset' }
          ].map((feat, idx) => (
            <div key={idx} className="bg-[#1f0d3d]/60 border border-purple-500/20 p-5 rounded-2xl flex flex-col items-center space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-600/30 border border-purple-400/30 flex items-center justify-center text-amber-400 font-bold">
                ✓
              </div>
              <h4 className="text-xs font-bold text-white tracking-wider">{feat.title}</h4>
              <p className="text-[11px] text-purple-300">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Real Earnings Proof Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-block bg-purple-900/60 border border-purple-500/40 px-4 py-1.5 rounded-full text-xs font-bold text-amber-400 uppercase tracking-widest">
            REAL EARNINGS PROOF
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white">See Actual Balance Growth From The Platform</h2>
          <p className="text-xs sm:text-sm text-purple-300">Audited dashboard metrics showing daily task completions and verified reward allocations.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Proof Card 1 */}
          <div className="bg-[#1a0b36] border-2 border-purple-500/30 p-6 rounded-3xl space-y-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-purple-900 pb-4">
              <span className="text-xs font-mono font-bold text-purple-300">Statistics · Active Account</span>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-mono font-bold">
                BALANCE: $234.83
              </span>
            </div>
            <div className="bg-[#120720] p-4 rounded-2xl border border-purple-500/20 space-y-3">
              <div className="flex justify-between text-xs text-purple-300">
                <span>Date Range: 2026/04/20 - 2026/04/27</span>
                <span className="text-emerald-400 font-bold">Verified</span>
              </div>
              <div className="h-2 bg-purple-900/60 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-purple-500 to-amber-400 w-3/4 h-full" />
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-xs text-white font-bold">Daily Task Reward Stream</span>
                <span className="text-xs font-mono font-bold text-amber-400">+$14.00 / day</span>
              </div>
            </div>
          </div>

          {/* Proof Card 2 */}
          <div className="bg-[#1a0b36] border-2 border-amber-500/40 p-6 rounded-3xl space-y-6 shadow-xl gold-glow">
            <div className="flex items-center justify-between border-b border-purple-900 pb-4">
              <span className="text-xs font-mono font-bold text-purple-300">Statistics · Advanced Tier</span>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-mono font-bold">
                BALANCE: $348.19
              </span>
            </div>
            <div className="bg-[#120720] p-4 rounded-2xl border border-purple-500/20 space-y-3">
              <div className="flex justify-between text-xs text-purple-300">
                <span>Date Range: 2026/04/01 - 2026/04/30</span>
                <span className="text-emerald-400 font-bold">Verified</span>
              </div>
              <div className="h-2 bg-purple-900/60 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-purple-500 to-amber-400 w-full h-full" />
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-xs text-white font-bold">Advanced VIP Task + Referral Share</span>
                <span className="text-xs font-mono font-bold text-amber-400">+$25.50 / day</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Why This Is Different & Perfect For */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#1a0b36] border border-purple-500/30 p-8 rounded-3xl space-y-4">
          <h3 className="text-xl font-black text-white uppercase tracking-wider">Why This Is Different?</h3>
          <p className="text-xs sm:text-sm text-purple-200 leading-relaxed">
            Most people struggle for months to make their first dollar online... With this, you're starting with a system that's already working, backed by audited enterprise contracts and strict VIP task isolation.
          </p>
        </div>

        <div className="bg-[#1a0b36] border border-purple-500/30 p-8 rounded-3xl space-y-4">
          <h3 className="text-xl font-black text-white uppercase tracking-wider">Perfect For:</h3>
          <ul className="space-y-3 text-xs sm:text-sm text-purple-200">
            <li className="flex items-center gap-3">
              <Check className="w-5 h-5 text-amber-400 shrink-0" />
              <span>Beginners who want a shortcut to verified digital earnings</span>
            </li>
            <li className="flex items-center gap-3">
              <Check className="w-5 h-5 text-amber-400 shrink-0" />
              <span>Anyone tired of trial & error without financial backing</span>
            </li>
            <li className="flex items-center gap-3">
              <Check className="w-5 h-5 text-amber-400 shrink-0" />
              <span>People looking for an extra income stream from day one</span>
            </li>
          </ul>
        </div>
      </section>

    </div>
  );
};
