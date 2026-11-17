import React from 'react';
import { useApp } from '../context/AppContext';
import { Shield, Layers, CheckCircle, ArrowLeft, Zap, Lock } from 'lucide-react';

export const VipDetailPage: React.FC = () => {
  const { selectedVipDetailId, vipPlans, tasks, currentUser, purchaseVipPlan, setActiveRoute } = useApp();

  const planId = selectedVipDetailId || 'vip-1';
  const plan = vipPlans.find(p => p.id === planId) || vipPlans[0];
  const planTasks = tasks.filter(t => t.vipPlanId === plan.id);

  const handleActivate = () => {
    if (!currentUser) {
      alert('Please login first to activate a VIP plan.');
      setActiveRoute('login');
      return;
    }
    const res = purchaseVipPlan(plan.id);
    alert(res.message);
    if (res.success) {
      setActiveRoute('my-tasks');
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 py-12 px-4 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Back Button */}
        <button 
          onClick={() => setActiveRoute('vip-plans')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-amber-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All VIP Plans</span>
        </button>

        {/* Plan Header Card */}
        <div className="bg-[#111827] border border-slate-800 p-8 rounded-3xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500/20 to-transparent w-96 h-full pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">{plan.id.toUpperCase()} Tier</span>
              <h1 className="text-3xl font-black text-white">{plan.name}</h1>
              <p className="text-xs text-slate-300 max-w-xl">{plan.description}</p>
            </div>

            <div className="bg-[#070A12] border border-slate-800 p-6 rounded-2xl text-center space-y-2 shrink-0">
              <span className="text-xs text-slate-400 uppercase tracking-widest">Activation Price</span>
              <div className="text-3xl font-black font-mono text-white">${plan.price}</div>
              <button 
                onClick={handleActivate}
                className="w-full mt-2 py-2.5 px-6 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-[#0B0F19] font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20 transition-all"
              >
                {currentUser?.activeVipPlanId === plan.id ? 'Active Plan' : 'Activate Plan Now'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800 text-xs">
            <div>
              <span className="text-slate-400 block">Daily Task Limit</span>
              <span className="font-mono font-bold text-white text-base">{plan.dailyTaskLimit} Tasks</span>
            </div>
            <div>
              <span className="text-slate-400 block">Per Task Reward</span>
              <span className="font-mono font-bold text-emerald-400 text-base">${plan.perTaskReward.toFixed(2)}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Estimated Daily</span>
              <span className="font-mono font-bold text-amber-400 text-base">${plan.dailyEarnings.toFixed(2)}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Plan Duration</span>
              <span className="font-mono font-bold text-white text-base">{plan.durationDays} Days</span>
            </div>
          </div>
        </div>

        {/* Strict VIP Task Isolation Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Assigned Tasks for {plan.name}</h2>
              <p className="text-xs text-slate-400">Strict VIP task isolation: These tasks appear ONLY in {plan.id.toUpperCase()}.</p>
            </div>
            <div className="text-xs text-amber-400 font-semibold bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-lg">
              {planTasks.length} Tasks Available
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {planTasks.length === 0 ? (
              <div className="bg-[#111827] border border-slate-800 p-8 rounded-2xl text-center text-slate-400 text-xs">
                No custom tasks currently published for this VIP tier. Admin can add tasks from the Admin Panel.
              </div>
            ) : (
              planTasks.map(task => (
                <div key={task.id} className="bg-[#111827] border border-slate-800 p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-400 uppercase">
                        {task.vipPlanId} Only
                      </span>
                      <h3 className="text-sm font-bold text-white">{task.title}</h3>
                    </div>
                    <p className="text-xs text-slate-400">{task.description}</p>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <span className="font-mono font-bold text-emerald-400 text-sm">+${task.rewardAmount.toFixed(2)}</span>
                    <button 
                      onClick={() => setActiveRoute('task-watch')}
                      className="px-4 py-2 bg-amber-500 text-[#0B0F19] text-xs font-bold rounded-xl shadow"
                    >
                      Watch & Earn
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
