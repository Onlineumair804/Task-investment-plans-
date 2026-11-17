/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BottomNav } from './components/BottomNav';
import { AdminPanel } from './components/AdminPanel';

import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { VipPlansPage } from './pages/VipPlansPage';
import { VipDetailPage } from './pages/VipDetailPage';
import { MyTasksPage } from './pages/MyTasksPage';
import { TaskWatchPage } from './pages/TaskWatchPage';
import { WalletPage } from './pages/WalletPage';
import { InvestmentHistoryPage } from './pages/InvestmentHistoryPage';
import { RewardHistoryPage } from './pages/RewardHistoryPage';
import { InviteReferralPage } from './pages/InviteReferralPage';
import { ProfilePage } from './pages/ProfilePage';
import { AboutUsPage } from './pages/AboutUsPage';
import { DisclaimerPage } from './pages/DisclaimerPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { ContactUsPage } from './pages/ContactUsPage';
import { LeaderboardsPage } from './pages/LeaderboardsPage';

const AppContent: React.FC = () => {
  const { activeRoute } = useApp();

  const renderRoute = () => {
    switch (activeRoute) {
      case 'home':
        return <HomePage />;
      case 'login':
        return <LoginPage />;
      case 'register':
        return <RegisterPage />;
      case 'vip-plans':
        return <VipPlansPage />;
      case 'vip-detail':
        return <VipDetailPage />;
      case 'my-tasks':
        return <MyTasksPage />;
      case 'task-watch':
        return <TaskWatchPage />;
      case 'wallet':
        return <WalletPage />;
      case 'investment-history':
        return <InvestmentHistoryPage />;
      case 'reward-history':
        return <RewardHistoryPage />;
      case 'invite-referral':
        return <InviteReferralPage />;
      case 'profile':
        return <ProfilePage />;
      case 'about-us':
        return <AboutUsPage />;
      case 'disclaimer':
        return <DisclaimerPage />;
      case 'privacy-policy':
        return <PrivacyPolicyPage />;
      case 'contact-us':
        return <ContactUsPage />;
      case 'leaderboards':
        return <LeaderboardsPage />;
      case 'admin':
        return <AdminPanel />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#120720] text-purple-100 flex flex-col font-sans pb-16 lg:pb-0 selection:bg-amber-400 selection:text-[#120720]">
      <Navbar />
      <div className="flex-1">
        {renderRoute()}
      </div>
      {activeRoute !== 'admin' && <Footer />}
      <BottomNav />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
