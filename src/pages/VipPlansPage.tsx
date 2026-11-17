import React from 'react';
import { useApp } from '../context/AppContext';
import { Shield, Layers, ArrowRight, CheckCircle } from 'lucide-react';

export const VipPlansPage: React.FC = () => {
  const { vipPlans, setActiveRoute, setSelectedVipDetailId } = useApp();

  const handleSelectPlan = (planId: string) => {
    setSelectedVipDetailId(planId);
    setActiveRoute('vip-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 py-12 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full text-xs font-semibold text-amber-400">
            <Layers className="w-4 h-4" />
            <span>9 Professional VIP Tiers</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">VIP Plans Catalog (VIP 1 - VIP 9)</h1>
          <p className="text-sm text-slate-400">Choose your verified partnership tier. Every VIP tier operates with strict independent task separation and verified revenue backing.</p>
        </div>

        {/* 9 VIP Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vipPlans.map((plan) => (
            <div key={plan.id} className="bg-[#111827] border border-slate-800 p-6 rounded-3xl space-y-6 hover:border-amber-500/50 transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">{plan.id}</span>
                  <span className="text-xs font-mono text-slate-400">{plan.durationDays} Days</span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  <p className="text-xs text-slate-400 mt-1">{plan.description}</p>
                </div>

                <div className="py-4 border-y border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Daily Task Limit:</span>
                    <span className="font-mono text-white font-bold">{plan.dailyTaskLimit} Tasks</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Per Task Reward:</span>
                    <span className="font-mono text-emerald-400 font-bold">${plan.perTaskReward.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Estimated Daily Return:</span>
                    <span className="font-mono text-amber-400 font-bold">${plan.dailyEarnings.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Active Participants:</span>
                    <span className="font-mono text-slate-300">{plan.participantsCount}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-slate-400">Activation Price</span>
                  <span className="text-2xl font-black font-mono text-white">${plan.price}</span>
                </div>

                <button 
                  onClick={() => handleSelectPlan(plan.id)}
                  className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-[#0B0F19] font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all"
                >
                  <span>View Details & Activate</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
