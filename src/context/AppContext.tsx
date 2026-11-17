import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, VipPlan, Task, TaskSubmission, Transaction, 
  ReferralRelationship, ReferralSettings, RevenueRecord, AdminAuditLog, WebsiteSettings 
} from '../types';
import { 
  INITIAL_VIP_PLANS, INITIAL_TASKS, INITIAL_USERS, 
  INITIAL_REFERRAL_SETTINGS, INITIAL_REVENUE_RECORDS, INITIAL_TRANSACTIONS, INITIAL_REFERRALS 
} from '../data/initialData';

interface AppContextType {
  currentUser: User | null;
  users: User[];
  vipPlans: VipPlan[];
  tasks: Task[];
  taskSubmissions: TaskSubmission[];
  transactions: Transaction[];
  referrals: ReferralRelationship[];
  referralSettings: ReferralSettings;
  revenueRecords: RevenueRecord[];
  auditLogs: AdminAuditLog[];
  websiteSettings: WebsiteSettings;
  activeRoute: string;
  setActiveRoute: (route: string) => void;
  selectedVipDetailId: string | null;
  setSelectedVipDetailId: (id: string | null) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  login: (usernameOrEmail: string) => boolean;
  logout: () => void;
  register: (fullName: string, username: string, email: string, phone: string, referralCode?: string) => { success: boolean; message: string };
  updateProfile: (updatedData: Partial<User>) => void;
  purchaseVipPlan: (planId: string) => { success: boolean; message: string };
  submitTask: (taskId: string, watchTimeSeconds: number) => { success: boolean; message: string };
  requestWithdrawal: (amount: number, details: string) => { success: boolean; message: string };
  requestDeposit: (amount: number) => { success: boolean; message: string };
  // Admin actions
  adminUpdateVipPlan: (planId: string, updatedFields: Partial<VipPlan>) => void;
  adminCreateTask: (task: Omit<Task, 'id' | 'currentParticipants'>) => void;
  adminUpdateTask: (taskId: string, updatedFields: Partial<Task>) => void;
  adminDeleteTask: (taskId: string) => void;
  adminApproveTaskSubmission: (submissionId: string, approved: boolean, feedback?: string) => void;
  adminUpdateReferralSettings: (settings: Partial<ReferralSettings>) => void;
  adminAddRevenueRecord: (source: string, amount: number, description: string) => void;
  adminUpdateWebsiteSettings: (settings: Partial<WebsiteSettings>) => void;
  adminAdjustUserBalance: (userId: string, newAvailable: number, reason: string) => void;
  adminProcessWithdrawalTx: (txId: string, approved: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('tip_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('tip_current_user');
    return saved ? JSON.parse(saved) : INITIAL_USERS[0]; // Default to admin or demo user
  });

  const [vipPlans, setVipPlans] = useState<VipPlan[]>(() => {
    const saved = localStorage.getItem('tip_vip_plans');
    return saved ? JSON.parse(saved) : INITIAL_VIP_PLANS;
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('tip_tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [taskSubmissions, setTaskSubmissions] = useState<TaskSubmission[]>(() => {
    const saved = localStorage.getItem('tip_submissions');
    return saved ? JSON.parse(saved) : [
      {
        id: 'sub-1',
        taskId: 't-301',
        userId: 'u-user1',
        userName: 'Alexander Wright',
        vipPlanId: 'vip-3',
        submittedAt: '2026-03-15 08:30:00',
        status: 'approved',
        rewardAmount: 1.75,
        watchTimeSeconds: 60
      }
    ];
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('tip_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [referrals, setReferrals] = useState<ReferralRelationship[]>(() => {
    const saved = localStorage.getItem('tip_referrals');
    return saved ? JSON.parse(saved) : INITIAL_REFERRALS;
  });

  const [referralSettings, setReferralSettings] = useState<ReferralSettings>(() => {
    const saved = localStorage.getItem('tip_ref_settings');
    return saved ? JSON.parse(saved) : INITIAL_REFERRAL_SETTINGS;
  });

  const [revenueRecords, setRevenueRecords] = useState<RevenueRecord[]>(() => {
    const saved = localStorage.getItem('tip_revenue');
    return saved ? JSON.parse(saved) : INITIAL_REVENUE_RECORDS;
  });

  const [auditLogs, setAuditLogs] = useState<AdminAuditLog[]>(() => {
    const saved = localStorage.getItem('tip_audit_logs');
    return saved ? JSON.parse(saved) : [
      {
        id: 'log-1',
        adminId: 'u-admin',
        adminName: 'System Administrator',
        action: 'UPDATE_VIP_PRICE',
        targetType: 'VipPlan',
        targetId: 'vip-3',
        previousValue: '300',
        newValue: '350',
        timestamp: '2026-02-01 09:00:00'
      }
    ];
  });

  const [websiteSettings, setWebsiteSettings] = useState<WebsiteSettings>(() => {
    const saved = localStorage.getItem('tip_web_settings');
    return saved ? JSON.parse(saved) : {
      siteName: 'TASK INVEST PRO',
      tagline: 'Premium VIP Task Management and Verified Business Investment Platform',
      maintenanceMode: false,
      supportEmail: 'support@taskinvestpro.com',
      supportPhone: '+1 (800) 555-TASK',
      verifiedRevenueTotal: 850000.00
    };
  });

  const [activeRoute, setActiveRoute] = useState<string>('home');
  const [selectedVipDetailId, setSelectedVipDetailId] = useState<string | null>(null);

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('tip_theme') as 'dark' | 'light') || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('tip_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Persistence effects
  useEffect(() => { localStorage.setItem('tip_users', JSON.stringify(users)); }, [users]);
  useEffect(() => { localStorage.setItem('tip_current_user', JSON.stringify(currentUser)); }, [currentUser]);
  useEffect(() => { localStorage.setItem('tip_vip_plans', JSON.stringify(vipPlans)); }, [vipPlans]);
  useEffect(() => { localStorage.setItem('tip_tasks', JSON.stringify(tasks)); }, [tasks]);
  useEffect(() => { localStorage.setItem('tip_submissions', JSON.stringify(taskSubmissions)); }, [taskSubmissions]);
  useEffect(() => { localStorage.setItem('tip_transactions', JSON.stringify(transactions)); }, [transactions]);
  useEffect(() => { localStorage.setItem('tip_referrals', JSON.stringify(referrals)); }, [referrals]);
  useEffect(() => { localStorage.setItem('tip_ref_settings', JSON.stringify(referralSettings)); }, [referralSettings]);
  useEffect(() => { localStorage.setItem('tip_revenue', JSON.stringify(revenueRecords)); }, [revenueRecords]);
  useEffect(() => { localStorage.setItem('tip_audit_logs', JSON.stringify(auditLogs)); }, [auditLogs]);
  useEffect(() => { localStorage.setItem('tip_web_settings', JSON.stringify(websiteSettings)); }, [websiteSettings]);

  // Log admin actions helper
  const logAdminAction = (action: string, targetType: string, targetId: string, prev: string, next: string) => {
    if (!currentUser || currentUser.role !== 'admin') return;
    const newLog: AdminAuditLog = {
      id: 'log-' + Date.now(),
      adminId: currentUser.id,
      adminName: currentUser.fullName,
      action,
      targetType,
      targetId,
      previousValue: prev,
      newValue: next,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };
    setAuditLogs(prevLogs => [newLog, ...prevLogs]);
  };

  const login = (usernameOrEmail: string): boolean => {
    const found = users.find(u => u.username.toLowerCase() === usernameOrEmail.toLowerCase() || u.email.toLowerCase() === usernameOrEmail.toLowerCase());
    if (found) {
      setCurrentUser(found);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    setActiveRoute('home');
  };

  const register = (fullName: string, username: string, email: string, phone: string, referralCode?: string) => {
    if (users.some(u => u.username === username || u.email === email)) {
      return { success: false, message: 'Username or email already exists.' };
    }

    let referredBy: string | undefined = undefined;
    if (referralCode) {
      const refUser = users.find(u => u.referralCode === referralCode);
      if (refUser) {
        referredBy = refUser.id;
      }
    }

    const newUser: User = {
      id: 'u-' + Date.now(),
      fullName,
      username,
      email,
      phone,
      registrationDate: new Date().toISOString().split('T')[0],
      activeVipPlanId: null,
      activeVipExpiry: null,
      accountStatus: 'active',
      referralCode: 'TIP' + Math.floor(1000 + Math.random() * 9000),
      referredBy,
      role: 'user',
      balance: {
        available: 0,
        pendingRewards: 0,
        totalEarned: 0,
        withdrawn: 0
      }
    };

    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);

    if (referredBy) {
      const newRef: ReferralRelationship = {
        id: 'ref-' + Date.now(),
        referrerId: referredBy,
        referredId: newUser.id,
        referredName: fullName,
        level: 1,
        joinedDate: new Date().toISOString().split('T')[0],
        commissionEarned: 0
      };
      setReferrals(prev => [newRef, ...prev]);
    }

    return { success: true, message: 'Registration successful!' };
  };

  const updateProfile = (updatedData: Partial<User>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updatedData };
    setCurrentUser(updated);
    setUsers(prev => prev.map(u => u.id === updated.id ? updated : u));
  };

  const purchaseVipPlan = (planId: string) => {
    if (!currentUser) return { success: false, message: 'Please login first.' };
    const plan = vipPlans.find(p => p.id === planId);
    if (!plan) return { success: false, message: 'VIP Plan not found.' };

    if (currentUser.balance.available < plan.price) {
      return { success: false, message: `Insufficient available balance ($${currentUser.balance.available.toFixed(2)}). Please deposit funds.` };
    }

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + plan.durationDays);
    const expiryStr = expiryDate.toISOString().split('T')[0];

    const updatedUser: User = {
      ...currentUser,
      activeVipPlanId: plan.id,
      activeVipExpiry: expiryStr,
      balance: {
        ...currentUser.balance,
        available: currentUser.balance.available - plan.price
      }
    };

    setCurrentUser(updatedUser);
    setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));

    // Update plan participants count
    setVipPlans(prev => prev.map(p => p.id === planId ? { ...p, participantsCount: p.participantsCount + 1 } : p));

    // Record transaction
    const newTx: Transaction = {
      id: 'tx-' + Date.now(),
      userId: currentUser.id,
      type: 'vip_purchase',
      amount: -plan.price,
      status: 'completed',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      description: `Activated ${plan.name}`
    };
    setTransactions(prev => [newTx, ...prev]);

    return { success: true, message: `Successfully activated ${plan.name}!` };
  };

  const submitTask = (taskId: string, watchTimeSeconds: number) => {
    if (!currentUser || !currentUser.activeVipPlanId) {
      return { success: false, message: 'You must have an active VIP plan to complete tasks.' };
    }

    const task = tasks.find(t => t.id === taskId);
    if (!task) return { success: false, message: 'Task not found.' };

    if (task.vipPlanId !== currentUser.activeVipPlanId) {
      return { success: false, message: `This task belongs to ${task.vipPlanId.toUpperCase()}, but your active plan is ${currentUser.activeVipPlanId.toUpperCase()}. Strict VIP task isolation enforced.` };
    }

    // Check if already submitted today
    const alreadySubmittedToday = taskSubmissions.some(s => s.taskId === taskId && s.userId === currentUser.id);
    if (alreadySubmittedToday) {
      return { success: false, message: 'You have already submitted this task today.' };
    }

    const newSub: TaskSubmission = {
      id: 'sub-' + Date.now(),
      taskId: task.id,
      userId: currentUser.id,
      userName: currentUser.fullName,
      vipPlanId: task.vipPlanId,
      submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
      status: 'approved', // Instant verified approval for demo fluidity
      rewardAmount: task.rewardAmount,
      watchTimeSeconds
    };

    setTaskSubmissions(prev => [newSub, ...prev]);

    // Update user balance
    const updatedUser: User = {
      ...currentUser,
      balance: {
        ...currentUser.balance,
        available: currentUser.balance.available + task.rewardAmount,
        totalEarned: currentUser.balance.totalEarned + task.rewardAmount
      }
    };
    setCurrentUser(updatedUser);
    setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));

    // Record transaction
    const newTx: Transaction = {
      id: 'tx-' + Date.now(),
      userId: currentUser.id,
      type: 'task_reward',
      amount: task.rewardAmount,
      status: 'completed',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      description: `Task Reward: ${task.title}`
    };
    setTransactions(prev => [newTx, ...prev]);

    return { success: true, message: `Task completed successfully! $${task.rewardAmount.toFixed(2)} added to your wallet.` };
  };

  const requestWithdrawal = (amount: number, details: string) => {
    if (!currentUser) return { success: false, message: 'Please login.' };
    if (amount <= 0 || amount > currentUser.balance.available) {
      return { success: false, message: 'Invalid withdrawal amount or exceeds available balance.' };
    }

    const updatedUser: User = {
      ...currentUser,
      balance: {
        ...currentUser.balance,
        available: currentUser.balance.available - amount
      }
    };
    setCurrentUser(updatedUser);
    setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));

    const newTx: Transaction = {
      id: 'tx-' + Date.now(),
      userId: currentUser.id,
      type: 'withdrawal',
      amount: -amount,
      status: 'pending',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      description: `Withdrawal Request to ${details}`
    };
    setTransactions(prev => [newTx, ...prev]);

    return { success: true, message: 'Withdrawal request submitted successfully. Pending admin verification.' };
  };

  const requestDeposit = (amount: number) => {
    if (!currentUser) return { success: false, message: 'Please login.' };
    if (amount <= 0) return { success: false, message: 'Invalid amount.' };

    const updatedUser: User = {
      ...currentUser,
      balance: {
        ...currentUser.balance,
        available: currentUser.balance.available + amount
      }
    };
    setCurrentUser(updatedUser);
    setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));

    const newTx: Transaction = {
      id: 'tx-' + Date.now(),
      userId: currentUser.id,
      type: 'deposit',
      amount: amount,
      status: 'completed',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      description: 'Secure Bank / Crypto Deposit'
    };
    setTransactions(prev => [newTx, ...prev]);

    return { success: true, message: `Successfully deposited $${amount.toFixed(2)} into your wallet.` };
  };

  // Admin Management Methods
  const adminUpdateVipPlan = (planId: string, updatedFields: Partial<VipPlan>) => {
    const prevPlan = vipPlans.find(p => p.id === planId);
    setVipPlans(prev => prev.map(p => p.id === planId ? { ...p, ...updatedFields } : p));
    logAdminAction('UPDATE_VIP_PLAN', 'VipPlan', planId, JSON.stringify(prevPlan), JSON.stringify(updatedFields));
  };

  const adminCreateTask = (taskData: Omit<Task, 'id' | 'currentParticipants'>) => {
    const newTask: Task = {
      ...taskData,
      id: 't-' + Date.now(),
      currentParticipants: 0
    };
    setTasks(prev => [newTask, ...prev]);
    logAdminAction('CREATE_TASK', 'Task', newTask.id, 'None', newTask.title);
  };

  const adminUpdateTask = (taskId: string, updatedFields: Partial<Task>) => {
    const prev = tasks.find(t => t.id === taskId);
    setTasks(prevList => prevList.map(t => t.id === taskId ? { ...t, ...updatedFields } : t));
    logAdminAction('UPDATE_TASK', 'Task', taskId, JSON.stringify(prev), JSON.stringify(updatedFields));
  };

  const adminDeleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
    logAdminAction('DELETE_TASK', 'Task', taskId, taskId, 'DELETED');
  };

  const adminApproveTaskSubmission = (submissionId: string, approved: boolean, feedback?: string) => {
    setTaskSubmissions(prev => prev.map(sub => sub.id === submissionId ? {
      ...sub,
      status: approved ? 'approved' : 'rejected',
      adminFeedback: feedback
    } : sub));
  };

  const adminUpdateReferralSettings = (settings: Partial<ReferralSettings>) => {
    setReferralSettings(prev => {
      const next = { ...prev, ...settings };
      logAdminAction('UPDATE_REFERRAL_SETTINGS', 'ReferralSettings', 'global', JSON.stringify(prev), JSON.stringify(next));
      return next;
    });
  };

  const adminAddRevenueRecord = (source: string, amount: number, description: string) => {
    const newRec: RevenueRecord = {
      id: 'rev-' + Date.now(),
      source,
      verifiedAmount: amount,
      date: new Date().toISOString().split('T')[0],
      description
    };
    setRevenueRecords(prev => [newRec, ...prev]);
    setWebsiteSettings(prev => ({ ...prev, verifiedRevenueTotal: prev.verifiedRevenueTotal + amount }));
    logAdminAction('ADD_REVENUE', 'RevenueRecord', newRec.id, '0', String(amount));
  };

  const adminUpdateWebsiteSettings = (settings: Partial<WebsiteSettings>) => {
    setWebsiteSettings(prev => {
      const next = { ...prev, ...settings };
      logAdminAction('UPDATE_WEB_SETTINGS', 'WebsiteSettings', 'global', JSON.stringify(prev), JSON.stringify(next));
      return next;
    });
  };

  const adminAdjustUserBalance = (userId: string, newAvailable: number, reason: string) => {
    const targetUser = users.find(u => u.id === userId);
    if (!targetUser) return;
    const oldBal = targetUser.balance.available;
    const diff = newAvailable - oldBal;

    const updatedUser = {
      ...targetUser,
      balance: {
        ...targetUser.balance,
        available: newAvailable,
        totalEarned: diff > 0 ? targetUser.balance.totalEarned + diff : targetUser.balance.totalEarned
      }
    };

    setUsers(prev => prev.map(u => u.id === userId ? updatedUser : u));
    if (currentUser && currentUser.id === userId) {
      setCurrentUser(updatedUser);
    }

    const newTx: Transaction = {
      id: 'tx-' + Date.now(),
      userId,
      type: diff >= 0 ? 'task_reward' : 'vip_purchase',
      amount: diff,
      status: 'completed',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      description: `Admin Adjustment: ${reason}`
    };
    setTransactions(prev => [newTx, ...prev]);
    logAdminAction('ADJUST_BALANCE', 'User', userId, String(oldBal), String(newAvailable));
  };

  const adminProcessWithdrawalTx = (txId: string, approved: boolean) => {
    setTransactions(prev => prev.map(tx => {
      if (tx.id === txId) {
        return { ...tx, status: approved ? 'completed' : 'rejected' };
      }
      return tx;
    }));
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      users,
      vipPlans,
      tasks,
      taskSubmissions,
      transactions,
      referrals,
      referralSettings,
      revenueRecords,
      auditLogs,
      websiteSettings,
      activeRoute,
      setActiveRoute,
      selectedVipDetailId,
      setSelectedVipDetailId,
      theme,
      toggleTheme,
      login,
      logout,
      register,
      updateProfile,
      purchaseVipPlan,
      submitTask,
      requestWithdrawal,
      requestDeposit,
      adminUpdateVipPlan,
      adminCreateTask,
      adminUpdateTask,
      adminDeleteTask,
      adminApproveTaskSubmission,
      adminUpdateReferralSettings,
      adminAddRevenueRecord,
      adminUpdateWebsiteSettings,
      adminAdjustUserBalance,
      adminProcessWithdrawalTx
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
