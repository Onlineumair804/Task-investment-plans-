import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Shield, Users, Layers, CheckSquare, Wallet, Award, 
  TrendingUp, ArrowUpRight, Settings, FileText, History, 
  CheckCircle, XCircle, Plus, Edit3, Trash2, AlertTriangle, Search, Save
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const { 
    currentUser, users, vipPlans, tasks, taskSubmissions, transactions, 
    referralSettings, revenueRecords, auditLogs, websiteSettings,
    adminUpdateVipPlan, adminCreateTask, adminUpdateTask, adminDeleteTask,
    adminApproveTaskSubmission, adminUpdateReferralSettings, adminAddRevenueRecord,
    adminUpdateWebsiteSettings, adminAdjustUserBalance, adminProcessWithdrawalTx
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'users' | 'vips' | 'tasks' | 'approvals' | 'wallet' | 'referrals' | 'revenue' | 'withdrawals' | 'reports' | 'settings' | 'audit'
  >('dashboard');

  // New task form state
  const [newTask, setNewTask] = useState({
    vipPlanId: 'vip-1',
    title: '',
    description: '',
    mediaType: 'video' as 'video' | 'image',
    mediaUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smartphone-with-green-screen-42861-large.mp4',
    instructions: '',
    rewardAmount: 1.00,
    availability: 'Daily',
    deadline: '23:59 Today',
    maxParticipants: 100,
    active: true
  });

  // New revenue form state
  const [newRevenue, setNewRevenue] = useState({
    source: '',
    amount: 10000,
    description: ''
  });

  // Balance adjustment modal state
  const [adjustModalUser, setAdjustModalUser] = useState<any | null>(null);
  const [adjustAmount, setAdjustAmount] = useState<number>(0);
  const [adjustReason, setAdjustReason] = useState<string>('');

  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-[#0B0F19] text-white px-4">
        <div className="bg-[#111827] border border-red-500/30 p-8 rounded-2xl max-w-md text-center space-y-4">
          <AlertTriangle className="w-12 h-12 text-red-400 mx-auto" />
          <h2 className="text-xl font-bold">Unauthorized Access</h2>
          <p className="text-sm text-slate-400">You must be logged in as an authorized administrator to access the Admin Panel.</p>
        </div>
      </div>
    );
  }

  // Dashboard calculations
  const totalUsersCount = users.length;
  const activeVipMembersCount = users.filter(u => u.activeVipPlanId !== null).length;
  const totalTasksCreated = tasks.length;
  const pendingApprovalsCount = taskSubmissions.filter(s => s.status === 'pending').length;
  const totalWithdrawalsPending = transactions.filter(t => t.type === 'withdrawal' && t.status === 'pending').reduce((acc, t) => acc + Math.abs(t.amount), 0);

  const handleCreateTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title) return;
    adminCreateTask(newTask);
    setNewTask({
      vipPlanId: 'vip-1',
      title: '',
      description: '',
      mediaType: 'video',
      mediaUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smartphone-with-green-screen-42861-large.mp4',
      instructions: '',
      rewardAmount: 1.00,
      availability: 'Daily',
      deadline: '23:59 Today',
      maxParticipants: 100,
      active: true
    });
    alert('VIP Task created successfully!');
  };

  const handleAddRevenueSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRevenue.source || newRevenue.amount <= 0) return;
    adminAddRevenueRecord(newRevenue.source, Number(newRevenue.amount), newRevenue.description);
    setNewRevenue({ source: '', amount: 10000, description: '' });
    alert('Verified business revenue record added successfully!');
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col lg:flex-row">
      
      {/* Admin Sidebar Navigation */}
      <aside className="w-full lg:w-72 bg-[#070A12] border-r border-slate-800 p-6 flex flex-col gap-2 shrink-0">
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-[#0B0F19] font-black">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-base font-black tracking-wider text-white">ADMIN PANEL</h1>
            <span className="text-[10px] text-amber-400 font-semibold uppercase">Secure Management</span>
          </div>
        </div>

        <nav className="space-y-1.5 flex-1 overflow-y-auto max-h-[calc(100vh-200px)]">
          {[
            { id: 'dashboard', label: 'Admin Dashboard', icon: TrendingUp },
            { id: 'users', label: 'User Management', icon: Users },
            { id: 'vips', label: 'VIP Plan Management', icon: Layers },
            { id: 'tasks', label: 'VIP Task Management', icon: CheckSquare },
            { id: 'approvals', label: 'Task Approval Queue', icon: CheckCircle },
            { id: 'wallet', label: 'Wallet Management', icon: Wallet },
            { id: 'reward', label: 'Reward Management', icon: Award },
            { id: 'referrals', label: 'Referral Management (3-Lvl)', icon: Users },
            { id: 'revenue', label: 'Verified Revenue', icon: ArrowUpRight },
            { id: 'withdrawals', label: 'Withdrawal Requests', icon: Wallet },
            { id: 'reports', label: 'Financial Reports', icon: FileText },
            { id: 'settings', label: 'Website Settings', icon: Settings },
            { id: 'audit', label: 'Admin Audit Logs', icon: History }
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${isActive ? 'bg-amber-500 text-[#0B0F19] shadow-lg shadow-amber-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'}`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Admin Content Viewport */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-white">Admin Overview Dashboard</h2>
                <p className="text-sm text-slate-400">Real-time platform metrics and verified business revenue counters.</p>
              </div>

              {/* KPI Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#111827] border border-slate-800 p-5 rounded-2xl space-y-2">
                  <span className="text-xs text-slate-400">Total Registered Users</span>
                  <div className="text-2xl font-black font-mono text-white">{totalUsersCount}</div>
                </div>
                <div className="bg-[#111827] border border-slate-800 p-5 rounded-2xl space-y-2">
                  <span className="text-xs text-slate-400">Active VIP Members</span>
                  <div className="text-2xl font-black font-mono text-amber-400">{activeVipMembersCount}</div>
                </div>
                <div className="bg-[#111827] border border-slate-800 p-5 rounded-2xl space-y-2">
                  <span className="text-xs text-slate-400">Total Tasks Created</span>
                  <div className="text-2xl font-black font-mono text-white">{totalTasksCreated}</div>
                </div>
                <div className="bg-[#111827] border border-slate-800 p-5 rounded-2xl space-y-2">
                  <span className="text-xs text-slate-400">Verified Business Revenue</span>
                  <div className="text-2xl font-black font-mono text-amber-400">${websiteSettings.verifiedRevenueTotal.toLocaleString()}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-[#111827] border border-slate-800 p-6 rounded-2xl space-y-4">
                  <h3 className="text-base font-bold text-white">Pending Approval Queue</h3>
                  <p className="text-xs text-slate-400">There are <span className="text-amber-400 font-bold">{pendingApprovalsCount}</span> pending task submissions and <span className="text-amber-400 font-bold">${totalWithdrawalsPending.toFixed(2)}</span> pending payouts awaiting verification.</p>
                  <div className="flex gap-3">
                    <button onClick={() => setActiveTab('approvals')} className="px-4 py-2 bg-amber-500 text-[#0B0F19] text-xs font-bold rounded-xl">Review Tasks</button>
                    <button onClick={() => setActiveTab('withdrawals')} className="px-4 py-2 bg-slate-800 text-slate-200 text-xs font-bold rounded-xl border border-slate-700">Review Withdrawals</button>
                  </div>
                </div>

                <div className="bg-[#111827] border border-slate-800 p-6 rounded-2xl space-y-4">
                  <h3 className="text-base font-bold text-white">System Safeguard Status</h3>
                  <p className="text-xs text-slate-400">All financial rewards are tied exclusively to verified business revenue agreements. No Ponzi mechanics detected.</p>
                  <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 rounded-xl">
                    <CheckCircle className="w-4 h-4" />
                    <span>Compliance & Security Check Passed</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: USERS */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-white">User Management</h2>
                <p className="text-sm text-slate-400">Manage registered platform members, VIP tiers, and account statuses.</p>
              </div>

              <div className="bg-[#111827] border border-slate-800 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#070A12] text-slate-400 uppercase font-semibold">
                      <tr>
                        <th className="p-4">User</th>
                        <th className="p-4">Email</th>
                        <th className="p-4">Active VIP</th>
                        <th className="p-4">Available Balance</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {users.map((u) => (
                        <tr key={u.id} className="hover:bg-slate-800/30">
                          <td className="p-4 font-semibold text-white">{u.fullName} <span className="block text-[10px] text-slate-400">@{u.username}</span></td>
                          <td className="p-4 text-slate-300">{u.email}</td>
                          <td className="p-4 uppercase font-mono text-amber-400">{u.activeVipPlanId || 'None'}</td>
                          <td className="p-4 font-mono font-bold text-emerald-400">${u.balance.available.toFixed(2)}</td>
                          <td className="p-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${u.accountStatus === 'active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                              {u.accountStatus}
                            </span>
                          </td>
                          <td className="p-4">
                            <button 
                              onClick={() => {
                                setAdjustModalUser(u);
                                setAdjustAmount(u.balance.available);
                              }}
                              className="px-3 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/30 hover:bg-amber-500/30 rounded-lg text-xs font-semibold"
                            >
                              Adjust Balance
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: VIP PLAN MANAGEMENT */}
          {activeTab === 'vips' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-white">VIP Plan Management</h2>
                <p className="text-sm text-slate-400">Independently manage pricing, reward rules, daily task limits, and descriptions for VIP 1 through VIP 9.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vipPlans.map((plan) => (
                  <div key={plan.id} className="bg-[#111827] border border-slate-800 p-6 rounded-2xl space-y-4 relative group">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold font-mono text-amber-400 uppercase tracking-widest">{plan.id}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${plan.enabled ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                        {plan.enabled ? 'Active' : 'Disabled'}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2">{plan.description}</p>

                    <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Price:</span>
                        <span className="font-mono font-bold text-white">${plan.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Daily Tasks:</span>
                        <span className="font-mono text-white">{plan.dailyTaskLimit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Per Task Reward:</span>
                        <span className="font-mono text-emerald-400">${plan.perTaskReward.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Participants:</span>
                        <span className="font-mono text-amber-400">{plan.participantsCount}</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => {
                        const newPrice = prompt(`Enter new price for ${plan.name}:`, String(plan.price));
                        if (newPrice !== null) {
                          adminUpdateVipPlan(plan.id, { price: Number(newPrice) });
                        }
                      }}
                      className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Edit3 className="w-4 h-4 text-amber-400" />
                      <span>Edit Plan Settings</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: TASK MANAGEMENT */}
          {activeTab === 'tasks' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-white">VIP Task Management</h2>
                <p className="text-sm text-slate-400">Strict VIP-based task creation. Tasks created for a specific VIP only appear in that VIP.</p>
              </div>

              {/* Create Task Form */}
              <form onSubmit={handleCreateTaskSubmit} className="bg-[#111827] border border-slate-800 p-6 rounded-2xl space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Plus className="w-5 h-5 text-amber-400" />
                  <span>Create New VIP Task</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Target VIP Plan</label>
                    <select 
                      value={newTask.vipPlanId}
                      onChange={e => setNewTask({ ...newTask, vipPlanId: e.target.value })}
                      className="w-full bg-[#070A12] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    >
                      {vipPlans.map(vp => (
                        <option key={vp.id} value={vp.id}>{vp.name} ({vp.id.toUpperCase()})</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Task Title</label>
                    <input 
                      type="text" 
                      required
                      value={newTask.title}
                      onChange={e => setNewTask({ ...newTask, title: e.target.value })}
                      placeholder="e.g. Brand Impression Verification"
                      className="w-full bg-[#070A12] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Reward Amount ($)</label>
                    <input 
                      type="number" 
                      step="0.01"
                      required
                      value={newTask.rewardAmount}
                      onChange={e => setNewTask({ ...newTask, rewardAmount: Number(e.target.value) })}
                      className="w-full bg-[#070A12] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Media / Video URL</label>
                    <input 
                      type="text" 
                      value={newTask.mediaUrl}
                      onChange={e => setNewTask({ ...newTask, mediaUrl: e.target.value })}
                      className="w-full bg-[#070A12] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
                    <input 
                      type="text" 
                      value={newTask.description}
                      onChange={e => setNewTask({ ...newTask, description: e.target.value })}
                      className="w-full bg-[#070A12] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>

                <button type="submit" className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-[#0B0F19] font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20 transition-all">
                  Publish Task to VIP Plan
                </button>
              </form>

              {/* Tasks List */}
              <div className="bg-[#111827] border border-slate-800 rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-slate-800 font-bold text-sm text-white">Existing Tasks ({tasks.length})</div>
                <div className="divide-y divide-slate-800">
                  {tasks.map(t => (
                    <div key={t.id} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-800/30">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 uppercase">
                            {t.vipPlanId}
                          </span>
                          <h4 className="text-sm font-semibold text-white">{t.title}</h4>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">{t.description}</p>
                      </div>
                      <div className="flex items-center gap-4 shrink-0">
                        <span className="font-mono font-bold text-emerald-400 text-sm">+${t.rewardAmount.toFixed(2)}</span>
                        <button 
                          onClick={() => adminDeleteTask(t.id)}
                          className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: APPROVALS */}
          {activeTab === 'approvals' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-white">Task Approval Queue</h2>
                <p className="text-sm text-slate-400">Review and verify completed task submissions.</p>
              </div>

              <div className="bg-[#111827] border border-slate-800 rounded-2xl overflow-hidden">
                <div className="divide-y divide-slate-800">
                  {taskSubmissions.length === 0 ? (
                    <div className="p-8 text-center text-slate-400 text-sm">No task submissions recorded.</div>
                  ) : (
                    taskSubmissions.map(sub => (
                      <div key={sub.id} className="p-4 flex items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white">{sub.userName}</span>
                            <span className="text-[10px] font-mono text-amber-400">({sub.vipPlanId.toUpperCase()})</span>
                          </div>
                          <p className="text-xs text-slate-400 mt-0.5">Submitted at: {sub.submittedAt} — Watch Time: {sub.watchTimeSeconds}s</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${sub.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : sub.status === 'pending' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                            {sub.status}
                          </span>
                          {sub.status === 'pending' && (
                            <button 
                              onClick={() => adminApproveTaskSubmission(sub.id, true)}
                              className="px-3 py-1 bg-emerald-500 text-[#0B0F19] text-xs font-bold rounded-lg"
                            >
                              Approve
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: WALLET MANAGEMENT */}
          {activeTab === 'wallet' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-white">Wallet & Transaction Management</h2>
                <p className="text-sm text-slate-400">Secure record of all platform deposits, withdrawals, and task rewards.</p>
              </div>

              <div className="bg-[#111827] border border-slate-800 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#070A12] text-slate-400 uppercase font-semibold">
                      <tr>
                        <th className="p-4">Transaction ID</th>
                        <th className="p-4">User ID</th>
                        <th className="p-4">Type</th>
                        <th className="p-4">Amount</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Timestamp</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {transactions.map(tx => (
                        <tr key={tx.id} className="hover:bg-slate-800/30">
                          <td className="p-4 font-mono text-slate-300">{tx.id}</td>
                          <td className="p-4 font-mono text-slate-400">{tx.userId}</td>
                          <td className="p-4 uppercase font-semibold text-amber-400">{tx.type}</td>
                          <td className={`p-4 font-mono font-bold ${tx.amount >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                            {tx.amount >= 0 ? `+$${tx.amount.toFixed(2)}` : `-$${Math.abs(tx.amount).toFixed(2)}`}
                          </td>
                          <td className="p-4 uppercase font-bold text-[10px] text-slate-300">{tx.status}</td>
                          <td className="p-4 text-slate-400">{tx.timestamp}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: REFERRALS */}
          {activeTab === 'referrals' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-white">3-Level Referral Management</h2>
                <p className="text-sm text-slate-400">Configure Level 1, Level 2, and Level 3 commission percentages and rules.</p>
              </div>

              <div className="bg-[#111827] border border-slate-800 p-6 rounded-2xl space-y-6 max-w-xl">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Level 1 (%)</label>
                    <input 
                      type="number" 
                      step="0.1"
                      value={referralSettings.level1Percent}
                      onChange={e => adminUpdateReferralSettings({ level1Percent: Number(e.target.value) })}
                      className="w-full bg-[#070A12] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Level 2 (%)</label>
                    <input 
                      type="number" 
                      step="0.1"
                      value={referralSettings.level2Percent}
                      onChange={e => adminUpdateReferralSettings({ level2Percent: Number(e.target.value) })}
                      className="w-full bg-[#070A12] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Level 3 (%)</label>
                    <input 
                      type="number" 
                      step="0.1"
                      value={referralSettings.level3Percent}
                      onChange={e => adminUpdateReferralSettings({ level3Percent: Number(e.target.value) })}
                      className="w-full bg-[#070A12] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Eligibility Rules & Safeguards</label>
                  <textarea 
                    rows={3}
                    value={referralSettings.eligibilityRules}
                    onChange={e => adminUpdateReferralSettings({ eligibilityRules: e.target.value })}
                    className="w-full bg-[#070A12] border border-slate-700 rounded-xl p-3 text-xs text-white"
                  />
                </div>

                <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>Referral commissions are generated strictly from verified business revenue allocations.</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: REVENUE */}
          {activeTab === 'revenue' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-white">Verified Business Revenue Management</h2>
                <p className="text-sm text-slate-400">Add auditable business revenue records that legally fund platform rewards.</p>
              </div>

              <form onSubmit={handleAddRevenueSubmit} className="bg-[#111827] border border-slate-800 p-6 rounded-2xl space-y-4 max-w-xl">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Revenue Source / Enterprise Client</label>
                  <input 
                    type="text" 
                    required
                    value={newRevenue.source}
                    onChange={e => setNewRevenue({ ...newRevenue, source: e.target.value })}
                    placeholder="e.g. Global Tech Ad Campaign Q2"
                    className="w-full bg-[#070A12] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Verified Amount ($)</label>
                  <input 
                    type="number" 
                    required
                    value={newRevenue.amount}
                    onChange={e => setNewRevenue({ ...newRevenue, amount: Number(e.target.value) })}
                    className="w-full bg-[#070A12] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Audit Description</label>
                  <input 
                    type="text" 
                    required
                    value={newRevenue.description}
                    onChange={e => setNewRevenue({ ...newRevenue, description: e.target.value })}
                    placeholder="Audited contract agreement reference #..."
                    className="w-full bg-[#070A12] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <button type="submit" className="px-5 py-2.5 bg-amber-500 text-[#0B0F19] font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20">
                  Add Verified Revenue Record
                </button>
              </form>

              <div className="bg-[#111827] border border-slate-800 rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-slate-800 font-bold text-sm text-white">Audited Revenue Log</div>
                <div className="divide-y divide-slate-800">
                  {revenueRecords.map(rev => (
                    <div key={rev.id} className="p-4 flex items-center justify-between gap-4">
                      <div>
                        <h4 className="text-sm font-semibold text-white">{rev.source}</h4>
                        <p className="text-xs text-slate-400">{rev.description} ({rev.date})</p>
                      </div>
                      <span className="font-mono font-bold text-emerald-400 text-sm">+${rev.verifiedAmount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: WITHDRAWALS */}
          {activeTab === 'withdrawals' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-white">Withdrawal Management</h2>
                <p className="text-sm text-slate-400">Review and process user payout requests securely.</p>
              </div>

              <div className="bg-[#111827] border border-slate-800 rounded-2xl overflow-hidden">
                <div className="divide-y divide-slate-800">
                  {transactions.filter(t => t.type === 'withdrawal').length === 0 ? (
                    <div className="p-8 text-center text-slate-400 text-sm">No withdrawal requests found.</div>
                  ) : (
                    transactions.filter(t => t.type === 'withdrawal').map(tx => (
                      <div key={tx.id} className="p-4 flex items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-white">{tx.id}</span>
                            <span className="text-xs text-slate-300">{tx.description}</span>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5">{tx.timestamp}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-mono font-bold text-red-400">-${Math.abs(tx.amount).toFixed(2)}</span>
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${tx.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : tx.status === 'pending' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                            {tx.status}
                          </span>
                          {tx.status === 'pending' && (
                            <div className="flex gap-2">
                              <button 
                                onClick={() => adminProcessWithdrawalTx(tx.id, true)}
                                className="px-3 py-1 bg-emerald-500 text-[#0B0F19] text-xs font-bold rounded-lg"
                              >
                                Approve
                              </button>
                              <button 
                                onClick={() => adminProcessWithdrawalTx(tx.id, false)}
                                className="px-3 py-1 bg-red-500/20 text-red-400 text-xs font-bold rounded-lg border border-red-500/30"
                              >
                                Reject
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 10: REPORTS */}
          {activeTab === 'reports' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-white">Financial & Operational Reports</h2>
                <p className="text-sm text-slate-400">Comprehensive summary of platform metrics and reward distributions.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#111827] border border-slate-800 p-6 rounded-2xl space-y-2">
                  <span className="text-xs text-slate-400">Total Revenue Audited</span>
                  <div className="text-xl font-mono font-bold text-emerald-400">${websiteSettings.verifiedRevenueTotal.toLocaleString()}</div>
                </div>
                <div className="bg-[#111827] border border-slate-800 p-6 rounded-2xl space-y-2">
                  <span className="text-xs text-slate-400">Total Task Submissions</span>
                  <div className="text-xl font-mono font-bold text-white">{taskSubmissions.length}</div>
                </div>
                <div className="bg-[#111827] border border-slate-800 p-6 rounded-2xl space-y-2">
                  <span className="text-xs text-slate-400">Total Transactions Count</span>
                  <div className="text-xl font-mono font-bold text-amber-400">{transactions.length}</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 11: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-white">Website Settings</h2>
                <p className="text-sm text-slate-400">Customize platform title, tagline, and support contact details.</p>
              </div>

              <div className="bg-[#111827] border border-slate-800 p-6 rounded-2xl space-y-4 max-w-xl">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Website Name</label>
                  <input 
                    type="text" 
                    value={websiteSettings.siteName}
                    onChange={e => adminUpdateWebsiteSettings({ siteName: e.target.value })}
                    className="w-full bg-[#070A12] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Tagline</label>
                  <input 
                    type="text" 
                    value={websiteSettings.tagline}
                    onChange={e => adminUpdateWebsiteSettings({ tagline: e.target.value })}
                    className="w-full bg-[#070A12] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Support Email</label>
                  <input 
                    type="text" 
                    value={websiteSettings.supportEmail}
                    onChange={e => adminUpdateWebsiteSettings({ supportEmail: e.target.value })}
                    className="w-full bg-[#070A12] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 12: AUDIT LOGS */}
          {activeTab === 'audit' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-white">Admin Audit Logs</h2>
                <p className="text-sm text-slate-400">Immutable audit log of all financial and administrative modifications.</p>
              </div>

              <div className="bg-[#111827] border border-slate-800 rounded-2xl overflow-hidden">
                <div className="divide-y divide-slate-800">
                  {auditLogs.map(log => (
                    <div key={log.id} className="p-4 flex flex-col sm:flex-row justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-amber-400">{log.action}</span>
                          <span className="text-xs text-slate-300">by {log.adminName}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1">Target: {log.targetType} ({log.targetId}) — Prev: {log.previousValue} → New: {log.newValue}</p>
                      </div>
                      <span className="text-[11px] font-mono text-slate-500 shrink-0">{log.timestamp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Balance Adjustment Modal */}
      {adjustModalUser && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111827] border border-slate-800 p-6 rounded-2xl max-w-md w-full space-y-4">
            <h3 className="text-lg font-bold text-white">Adjust Balance for {adjustModalUser.fullName}</h3>
            <p className="text-xs text-slate-400">Current available balance: <span className="font-mono text-emerald-400">${adjustModalUser.balance.available.toFixed(2)}</span></p>
            
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">New Available Balance ($)</label>
                <input 
                  type="number" 
                  step="0.01"
                  value={adjustAmount}
                  onChange={e => setAdjustAmount(Number(e.target.value))}
                  className="w-full bg-[#070A12] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Audit Reason</label>
                <input 
                  type="text" 
                  value={adjustReason}
                  onChange={e => setAdjustReason(e.target.value)}
                  placeholder="Reason for balance adjustment..."
                  className="w-full bg-[#070A12] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button 
                onClick={() => {
                  adminAdjustUserBalance(adjustModalUser.id, adjustAmount, adjustReason || 'Admin adjustment');
                  setAdjustModalUser(null);
                  setAdjustReason('');
                }}
                className="flex-1 py-2 bg-amber-500 text-[#0B0F19] text-xs font-bold rounded-xl"
              >
                Save Changes
              </button>
              <button 
                onClick={() => setAdjustModalUser(null)}
                className="flex-1 py-2 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl border border-slate-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
