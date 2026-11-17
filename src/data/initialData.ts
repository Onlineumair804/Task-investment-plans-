import { VipPlan, Task, User, ReferralSettings, RevenueRecord, Transaction, ReferralRelationship } from '../types';

export const INITIAL_VIP_PLANS: VipPlan[] = [
  {
    id: 'vip-1',
    level: 1,
    name: 'VIP 1 - Starter Partner',
    price: 50,
    durationDays: 30,
    dailyTaskLimit: 3,
    perTaskReward: 0.80,
    dailyEarnings: 2.40,
    monthlyEarnings: 72.00,
    description: 'Entry-level verified digital ad-viewing and market data contribution tier for individual participants.',
    eligibilityRules: 'Account KYC verified & active mobile number.',
    enabled: true,
    participantsCount: 1420
  },
  {
    id: 'vip-2',
    level: 2,
    name: 'VIP 2 - Growth Affiliate',
    price: 150,
    durationDays: 30,
    dailyTaskLimit: 5,
    perTaskReward: 1.20,
    dailyEarnings: 6.00,
    monthlyEarnings: 180.00,
    description: 'Enhanced media engagement tier with priority processing and verified brand campaign metrics.',
    eligibilityRules: 'Completed VIP 1 or direct enrollment with verified identity.',
    enabled: true,
    participantsCount: 890
  },
  {
    id: 'vip-3',
    level: 3,
    name: 'VIP 3 - Professional Partner',
    price: 350,
    durationDays: 30,
    dailyTaskLimit: 8,
    perTaskReward: 1.75,
    dailyEarnings: 14.00,
    monthlyEarnings: 420.00,
    description: 'Mid-tier professional analytics review and corporate video content validation task stream.',
    eligibilityRules: 'Minimum 10 active operational days on platform.',
    enabled: true,
    participantsCount: 650
  },
  {
    id: 'vip-4',
    level: 4,
    name: 'VIP 4 - Executive Associate',
    price: 800,
    durationDays: 30,
    dailyTaskLimit: 12,
    perTaskReward: 2.50,
    dailyEarnings: 30.00,
    monthlyEarnings: 900.00,
    description: 'Executive market research validation tier with dedicated revenue share allocations.',
    eligibilityRules: 'Verified commercial participation agreement.',
    enabled: true,
    participantsCount: 410
  },
  {
    id: 'vip-5',
    level: 5,
    name: 'VIP 5 - Elite Strategist',
    price: 1500,
    durationDays: 30,
    dailyTaskLimit: 16,
    perTaskReward: 3.75,
    dailyEarnings: 60.00,
    monthlyEarnings: 1800.00,
    description: 'Elite media audit and cross-platform campaign testing tier for advanced participants.',
    eligibilityRules: 'Active status & prior VIP tier completion.',
    enabled: true,
    participantsCount: 280
  },
  {
    id: 'vip-6',
    level: 6,
    name: 'VIP 6 - Senior Director',
    price: 3000,
    durationDays: 30,
    dailyTaskLimit: 20,
    perTaskReward: 5.50,
    dailyEarnings: 110.00,
    monthlyEarnings: 3300.00,
    description: 'Senior digital infrastructure validation and global brand impression verification tier.',
    eligibilityRules: 'Senior tier approval and verified business revenue alignment.',
    enabled: true,
    participantsCount: 155
  },
  {
    id: 'vip-7',
    level: 7,
    name: 'VIP 7 - Managing Partner',
    price: 5500,
    durationDays: 30,
    dailyTaskLimit: 25,
    perTaskReward: 8.00,
    dailyEarnings: 200.00,
    monthlyEarnings: 6000.00,
    description: 'High-yield commercial validation tier tied directly to audited enterprise client contracts.',
    eligibilityRules: 'Managing partner verification & compliance screening.',
    enabled: true,
    participantsCount: 92
  },
  {
    id: 'vip-8',
    level: 8,
    name: 'VIP 8 - Vice President',
    price: 10000,
    durationDays: 30,
    dailyTaskLimit: 30,
    perTaskReward: 13.33,
    dailyEarnings: 400.00,
    monthlyEarnings: 12000.00,
    description: 'Executive leadership tier with priority task allocation and maximum daily reward limits.',
    eligibilityRules: 'Executive compliance clearance.',
    enabled: true,
    participantsCount: 45
  },
  {
    id: 'vip-9',
    level: 9,
    name: 'VIP 9 - Global Chairman',
    price: 20000,
    durationDays: 30,
    dailyTaskLimit: 40,
    perTaskReward: 22.50,
    dailyEarnings: 900.00,
    monthlyEarnings: 27000.00,
    description: 'Ultimate premier tier with elite corporate governance rights and maximum verified revenue shares.',
    eligibilityRules: 'Direct board authorization & elite verification.',
    enabled: true,
    participantsCount: 18
  }
];

export const INITIAL_TASKS: Task[] = [
  // VIP 1 Tasks
  {
    id: 't-101',
    vipPlanId: 'vip-1',
    title: 'Brand Ad Impression Verification - TechFlow',
    description: 'Watch the 60-second official product demonstration video and confirm key feature highlights.',
    mediaType: 'video',
    mediaUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smartphone-with-green-screen-42861-large.mp4',
    instructions: '1. Watch the video for at least 45 seconds.\n2. Do not close or switch tab during playback.\n3. Click Submit Task upon timer completion.',
    rewardAmount: 0.80,
    availability: 'Daily',
    deadline: '23:59 Today',
    maxParticipants: 500,
    currentParticipants: 142,
    active: true
  },
  {
    id: 't-102',
    vipPlanId: 'vip-1',
    title: 'E-Commerce Marketplace Banner Quality Audit',
    description: 'Review high-resolution retail promotional layout and verify image contrast compliance.',
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    instructions: 'Examine the product promotional banner for visual clarity and alignment.',
    rewardAmount: 0.80,
    availability: 'Daily',
    deadline: '23:59 Today',
    maxParticipants: 500,
    currentParticipants: 198,
    active: true
  },
  {
    id: 't-103',
    vipPlanId: 'vip-1',
    title: 'Mobile App Usability Feedback Survey Stream',
    description: 'Watch interface walkthrough and verify navigation flow efficiency.',
    mediaType: 'video',
    mediaUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-using-a-mobile-phone-in-a-cafe-41584-large.mp4',
    instructions: 'Watch complete video segment and verify UI responsiveness.',
    rewardAmount: 0.80,
    availability: 'Daily',
    deadline: '23:59 Today',
    maxParticipants: 500,
    currentParticipants: 110,
    active: true
  },

  // VIP 2 Tasks
  {
    id: 't-201',
    vipPlanId: 'vip-2',
    title: 'FinTech Platform Security Walkthrough Audit',
    description: 'Review secure banking protocol demonstration and verify encryption highlights.',
    mediaType: 'video',
    mediaUrl: 'https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-with-financial-data-31910-large.mp4',
    instructions: 'Watch 60s security overview and verify compliance indicators.',
    rewardAmount: 1.20,
    availability: 'Daily',
    deadline: '23:59 Today',
    maxParticipants: 300,
    currentParticipants: 84,
    active: true
  },
  {
    id: 't-202',
    vipPlanId: 'vip-2',
    title: 'Global Logistics Tracking Dashboard Verification',
    description: 'Examine live supply chain telemetry feed and confirm data refresh accuracy.',
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    instructions: 'Review charts and verify metric continuity.',
    rewardAmount: 1.20,
    availability: 'Daily',
    deadline: '23:59 Today',
    maxParticipants: 300,
    currentParticipants: 120,
    active: true
  },

  // VIP 3 Tasks
  {
    id: 't-301',
    vipPlanId: 'vip-3',
    title: 'Enterprise Cloud Architecture Video Review',
    description: 'Inspect distributed server node topology presentation and verify redundancy metrics.',
    mediaType: 'video',
    mediaUrl: 'https://assets.mixkit.co/videos/preview/mixkit-server-room-with-blue-lights-32490-large.mp4',
    instructions: 'Watch architectural presentation for 60 seconds.',
    rewardAmount: 1.75,
    availability: 'Daily',
    deadline: '23:59 Today',
    maxParticipants: 200,
    currentParticipants: 65,
    active: true
  },

  // VIP 4 Tasks
  {
    id: 't-401',
    vipPlanId: 'vip-4',
    title: 'Executive Strategic Growth Presentation Audit',
    description: 'Validate quarterly revenue expansion projection models and data integrity.',
    mediaType: 'video',
    mediaUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-business-man-working-with-financial-graphs-43093-large.mp4',
    instructions: 'Verify quarterly revenue chart projections.',
    rewardAmount: 2.50,
    availability: 'Daily',
    deadline: '23:59 Today',
    maxParticipants: 150,
    currentParticipants: 42,
    active: true
  },

  // VIP 5 Tasks
  {
    id: 't-501',
    vipPlanId: 'vip-5',
    title: 'Elite Market Liquidity Flow Analysis',
    description: 'Analyze cross-border asset liquidity distribution and verification feeds.',
    mediaType: 'video',
    mediaUrl: 'https://assets.mixkit.co/videos/preview/mixkit-stock-market-data-graphs-and-numbers-on-a-screen-41270-large.mp4',
    instructions: 'Review high-frequency liquidity indicators.',
    rewardAmount: 3.75,
    availability: 'Daily',
    deadline: '23:59 Today',
    maxParticipants: 100,
    currentParticipants: 28,
    active: true
  },

  // VIP 6 Tasks
  {
    id: 't-601',
    vipPlanId: 'vip-6',
    title: 'Senior Infrastructure Expansion Assessment',
    description: 'Senior tier audit of regional server cluster load balancing performance.',
    mediaType: 'video',
    mediaUrl: 'https://assets.mixkit.co/videos/preview/mixkit-futuristic-city-with-flying-vehicles-42358-large.mp4',
    instructions: 'Examine cluster telemetry and latency benchmarks.',
    rewardAmount: 5.50,
    availability: 'Daily',
    deadline: '23:59 Today',
    maxParticipants: 80,
    currentParticipants: 19,
    active: true
  },

  // VIP 7 Tasks
  {
    id: 't-701',
    vipPlanId: 'vip-7',
    title: 'Managing Partner Enterprise Contract Validation',
    description: 'High-yield enterprise contract verification and compliance audit.',
    mediaType: 'video',
    mediaUrl: 'https://assets.mixkit.co/videos/preview/mixkit-business-partners-shaking-hands-in-an-office-41655-large.mp4',
    instructions: 'Verify contract terms and revenue allocation schedules.',
    rewardAmount: 8.00,
    availability: 'Daily',
    deadline: '23:59 Today',
    maxParticipants: 50,
    currentParticipants: 14,
    active: true
  },

  // VIP 8 Tasks
  {
    id: 't-801',
    vipPlanId: 'vip-8',
    title: 'Executive Leadership Portfolio Audit',
    description: 'Vice President tier validation of global asset allocation strategies.',
    mediaType: 'video',
    mediaUrl: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-modern-city-at-sunset-41662-large.mp4',
    instructions: 'Confirm portfolio distribution models.',
    rewardAmount: 13.33,
    availability: 'Daily',
    deadline: '23:59 Today',
    maxParticipants: 30,
    currentParticipants: 8,
    active: true
  },

  // VIP 9 Tasks
  {
    id: 't-901',
    vipPlanId: 'vip-9',
    title: 'Global Chairman Strategic Governance Review',
    description: 'Premier elite governance task evaluating multinational expansion milestones.',
    mediaType: 'video',
    mediaUrl: 'https://assets.mixkit.co/videos/preview/mixkit-clouds-and-blue-sky-41566-large.mp4',
    instructions: 'Review global operational milestones and verify revenue distribution.',
    rewardAmount: 22.50,
    availability: 'Daily',
    deadline: '23:59 Today',
    maxParticipants: 20,
    currentParticipants: 5,
    active: true
  }
];

export const INITIAL_USERS: User[] = [
  {
    id: 'u-admin',
    fullName: 'System Administrator',
    username: 'admin',
    email: 'admin@taskinvestpro.com',
    phone: '+1 (555) 019-2834',
    registrationDate: '2025-01-10',
    activeVipPlanId: 'vip-9',
    activeVipExpiry: '2027-01-10',
    accountStatus: 'active',
    referralCode: 'TIPADMIN',
    role: 'admin',
    balance: {
      available: 48500.00,
      pendingRewards: 1200.00,
      totalEarned: 95400.00,
      withdrawn: 45700.00
    }
  },
  {
    id: 'u-user1',
    fullName: 'Alexander Wright',
    username: 'alexwright',
    email: 'alex@example.com',
    phone: '+1 (555) 432-8765',
    registrationDate: '2026-02-01',
    activeVipPlanId: 'vip-3',
    activeVipExpiry: '2026-03-01',
    accountStatus: 'active',
    referralCode: 'TIP8821',
    referredBy: 'TIPADMIN',
    role: 'user',
    balance: {
      available: 342.50,
      pendingRewards: 14.00,
      totalEarned: 1250.00,
      withdrawn: 900.00
    }
  }
];

export const INITIAL_REFERRAL_SETTINGS: ReferralSettings = {
  level1Percent: 8.0,
  level2Percent: 4.0,
  level3Percent: 2.0,
  level1Enabled: true,
  level2Enabled: true,
  level3Enabled: true,
  eligibilityRules: 'Referral commissions are generated exclusively from verified business revenue allocations when referred users complete valid commercial tasks. No commissions for mere deposits.'
};

export const INITIAL_REVENUE_RECORDS: RevenueRecord[] = [
  {
    id: 'rev-1',
    source: 'TechFlow Enterprise Ad Campaign Q1',
    verifiedAmount: 250000.00,
    date: '2026-03-01',
    description: 'Audited digital ad impression distribution contract.'
  },
  {
    id: 'rev-2',
    source: 'Global Logistics Data Analytics License',
    verifiedAmount: 420000.00,
    date: '2026-03-10',
    description: 'Supply chain telemetry research license agreement.'
  },
  {
    id: 'rev-3',
    source: 'FinTech Security Protocol Audit Fee',
    verifiedAmount: 180000.00,
    date: '2026-03-14',
    description: 'Enterprise software security validation contract.'
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-1',
    userId: 'u-user1',
    type: 'vip_purchase',
    amount: -350.00,
    status: 'completed',
    timestamp: '2026-02-01 10:30:00',
    description: 'Activated VIP 3 - Professional Partner'
  },
  {
    id: 'tx-2',
    userId: 'u-user1',
    type: 'task_reward',
    amount: 1.75,
    status: 'completed',
    timestamp: '2026-03-15 09:15:00',
    description: 'Completed Task: Enterprise Cloud Architecture Video Review'
  },
  {
    id: 'tx-3',
    userId: 'u-user1',
    type: 'referral_commission',
    amount: 12.50,
    status: 'completed',
    timestamp: '2026-03-14 16:20:00',
    description: 'Level 1 Referral Revenue Share'
  }
];

export const INITIAL_REFERRALS: ReferralRelationship[] = [
  {
    id: 'ref-1',
    referrerId: 'u-user1',
    referredId: 'u-sub1',
    referredName: 'Sarah Jenkins',
    level: 1,
    joinedDate: '2026-02-05',
    commissionEarned: 48.50
  },
  {
    id: 'ref-2',
    referrerId: 'u-user1',
    referredId: 'u-sub2',
    referredName: 'David Miller',
    level: 2,
    joinedDate: '2026-02-12',
    commissionEarned: 22.10
  },
  {
    id: 'ref-3',
    referrerId: 'u-user1',
    referredId: 'u-sub3',
    referredName: 'Elena Rostova',
    level: 3,
    joinedDate: '2026-02-20',
    commissionEarned: 9.40
  }
];
