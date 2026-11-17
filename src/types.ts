export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  fullName: string;
  username: string;
  email: string;
  phone: string;
  registrationDate: string;
  activeVipPlanId: string | null; // e.g. 'vip-1' to 'vip-9'
  activeVipExpiry: string | null;
  accountStatus: 'active' | 'suspended' | 'pending';
  referralCode: string;
  referredBy?: string;
  role: UserRole;
  balance: {
    available: number;
    pendingRewards: number;
    totalEarned: number;
    withdrawn: number;
  };
}

export interface VipPlan {
  id: string; // 'vip-1' to 'vip-9'
  level: number; // 1 to 9
  name: string;
  price: number;
  durationDays: number;
  dailyTaskLimit: number;
  perTaskReward: number;
  dailyEarnings: number;
  monthlyEarnings: number;
  description: string;
  eligibilityRules: string;
  enabled: boolean;
  participantsCount: number;
}

export interface Task {
  id: string;
  vipPlanId: string; // e.g. 'vip-1' -> strictly for VIP 1
  title: string;
  description: string;
  mediaType: 'video' | 'image';
  mediaUrl: string;
  instructions: string;
  rewardAmount: number;
  availability: string;
  deadline: string;
  maxParticipants: number;
  currentParticipants: number;
  active: boolean;
}

export type TaskSubmissionStatus = 'pending' | 'approved' | 'rejected';

export interface TaskSubmission {
  id: string;
  taskId: string;
  userId: string;
  userName: string;
  vipPlanId: string;
  submittedAt: string;
  status: TaskSubmissionStatus;
  rewardAmount: number;
  watchTimeSeconds: number;
  adminFeedback?: string;
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'deposit' | 'withdrawal' | 'task_reward' | 'referral_commission' | 'vip_purchase';
  amount: number;
  status: 'completed' | 'pending' | 'rejected';
  timestamp: string;
  referenceId?: string;
  description: string;
}

export interface ReferralRelationship {
  id: string;
  referrerId: string;
  referredId: string;
  referredName: string;
  level: 1 | 2 | 3;
  joinedDate: string;
  commissionEarned: number;
}

export interface ReferralSettings {
  level1Percent: number;
  level2Percent: number;
  level3Percent: number;
  level1Enabled: boolean;
  level2Enabled: boolean;
  level3Enabled: boolean;
  eligibilityRules: string;
}

export interface RevenueRecord {
  id: string;
  source: string;
  verifiedAmount: number;
  date: string;
  description: string;
}

export interface AdminAuditLog {
  id: string;
  adminId: string;
  adminName: string;
  action: string;
  targetType: string;
  targetId: string;
  previousValue: string;
  newValue: string;
  timestamp: string;
}

export interface WebsiteSettings {
  siteName: string;
  tagline: string;
  maintenanceMode: boolean;
  supportEmail: string;
  supportPhone: string;
  verifiedRevenueTotal: number;
}
