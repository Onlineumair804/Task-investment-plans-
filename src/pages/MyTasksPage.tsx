import React from 'react';
import { useApp } from '../context/AppContext';
import { Shield, CheckSquare, ArrowRight, AlertTriangle, Lock } from 'lucide-react';

export const MyTasksPage: React.FC = () => {
  const { currentUser, tasks, vipPlans, setActiveRoute } = useApp();

  if (!currentUser) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-[#0B0F19] text-white px-4">
        <div className="bg-[#111827] border border-slate-800 p-8 rounded-2xl max-w-md text-center space-y-4">
          <AlertTriangle className="w-12 h-12 text-amber-400 mx-auto" />
          <h2 className="text-xl font-bold">Authentication Required</h2>
          <p className="text-sm text-slate-400">Please sign in to view your assigned VIP tasks.</p>
          <button onClick={() => setActiveRoute('login')} className="px-6 py-2.5 bg-amber-500 text-[#0B0F19] font-bold text-xs rounded-xl">
            Sign In Now
          </button>
        </div>
      </div>
    );
  }

  const activePlanId = currentUser.activeVipPlanId;
  const activePlan = vipPlans.find(p => p.id === activePlanId);
  const assignedTasks = activePlanId ? tasks.filter(t => t.vipPlanId === activePlanId) : [];

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 py-12 px-4 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-3xl font-black text-white">My Tasks</h1>
            <p className="text-xs text-slate-400">Strict VIP task isolation: Showing tasks exclusively for your active plan.</p>
          </div>

          <div className="bg-[#111827] border border-slate-800 px-4 py-2.5 rounded-xl flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block uppercase">Active VIP Plan</span>
              <span className="text-xs font-bold font-mono text-amber-400">{activePlan ? activePlan.name : 'No Active Plan'}</span>
            </div>
          </div>
        </div>

        {!activePlan ? (
          <div className="bg-[#111827] border border-slate-800 p-12 rounded-3xl text-center space-y-4 max-w-lg mx-auto">
            <Lock className="w-12 h-12 text-amber-400 mx-auto" />
            <h3 className="text-xl font-bold text-white">No Active VIP Plan</h3>
            <p className="text-xs text-slate-400">You must activate a VIP plan (VIP 1 through VIP 9) to unlock daily tasks and verified rewards.</p>
            <button 
              onClick={() => setActiveRoute('vip-plans')}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-[#0B0F19] font-bold text-xs rounded-xl shadow"
            >
              Explore VIP Plans Catalog
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Assigned Tier: <strong className="text-amber-400 uppercase font-mono">{activePlan.id}</strong></span>
              <span>Available Tasks: <strong className="text-white font-mono">{assignedTasks.length}</strong></span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {assignedTasks.map(task => (
                <div key={task.id} className="bg-[#111827] border border-slate-800 p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-amber-500/50 transition-all">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-400 uppercase">
                        {task.vipPlanId} Task
                      </span>
                      <h3 className="text-sm font-bold text-white">{task.title}</h3>
                    </div>
                    <p className="text-xs text-slate-400">{task.description}</p>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block">Reward</span>
                      <span className="font-mono font-bold text-emerald-400 text-sm">+${task.rewardAmount.toFixed(2)}</span>
                    </div>
                    <button 
                      onClick={() => setActiveRoute('task-watch')}
                      className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-[#0B0F19] font-bold text-xs rounded-xl shadow transition-all flex items-center gap-1.5"
                    >
                      <span>Start Watch</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
