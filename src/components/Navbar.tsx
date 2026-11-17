import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Shield, Wallet, User as UserIcon, Menu, X, 
  Layers, CheckSquare, Award, Users, Settings, LogOut, LogIn, UserPlus,
  Sun, Moon
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentUser, activeRoute, setActiveRoute, logout, setSelectedVipDetailId, theme, toggleTheme } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigateTo = (route: string, vipId?: string) => {
    if (vipId) {
      setSelectedVipDetailId(vipId);
    }
    setActiveRoute(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#120720]/95 backdrop-blur-md border-b border-purple-900/60 text-purple-100 px-4 lg:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        
        {/* Zone 1: Brand Wordmark */}
        <button 
          onClick={() => navigateTo('home')} 
          className="flex items-center gap-2.5 text-left group shrink-0 focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-[#0B0F19] font-black text-xl shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <Shield className="w-6 h-6 fill-[#0B0F19]" />
          </div>
          <div>
            <span className="text-lg font-black tracking-wider bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
              TASK INVEST PRO
            </span>
            <span className="block text-[10px] tracking-widest text-amber-400/70 font-semibold uppercase">
              Verified Revenue Platform
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links (4-5 primary concise links) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button 
            onClick={() => navigateTo('home')} 
            className={`hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 ${activeRoute === 'home' ? 'text-amber-400 font-semibold' : ''}`}
          >
            Home
          </button>
          <button 
            onClick={() => navigateTo('vip-plans')} 
            className={`hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 ${activeRoute === 'vip-plans' || activeRoute.startsWith('vip-detail') ? 'text-amber-400 font-semibold' : ''}`}
          >
            VIP Plans
          </button>
          {currentUser && (
            <>
              <button 
                onClick={() => navigateTo('my-tasks')} 
                className={`hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 ${activeRoute === 'my-tasks' ? 'text-amber-400 font-semibold' : ''}`}
              >
                My Tasks
              </button>
              <button 
                onClick={() => navigateTo('task-watch')} 
                className={`hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 ${activeRoute === 'task-watch' ? 'text-amber-400 font-semibold' : ''}`}
              >
                Task Watch
              </button>
              <button 
                onClick={() => navigateTo('wallet')} 
                className={`hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 ${activeRoute === 'wallet' ? 'text-amber-400 font-semibold' : ''}`}
              >
                Wallet
              </button>
              <button 
                onClick={() => navigateTo('invite-referral')} 
                className={`hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 ${activeRoute === 'invite-referral' ? 'text-amber-400 font-semibold' : ''}`}
              >
                Invite & Referral
              </button>
            </>
          )}
          <button 
            onClick={() => navigateTo('leaderboards')} 
            className={`hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 ${activeRoute === 'leaderboards' ? 'text-amber-400 font-semibold' : ''}`}
          >
            Leaderboards
          </button>
          <button 
            onClick={() => navigateTo('about-us')} 
            className={`hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 ${activeRoute === 'about-us' ? 'text-amber-400 font-semibold' : ''}`}
          >
            About Us
          </button>
          <button 
            onClick={() => navigateTo('contact-us')} 
            className={`hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 ${activeRoute === 'contact-us' ? 'text-amber-400 font-semibold' : ''}`}
          >
            Contact
          </button>
        </nav>

        {/* Zone 3: Primary Actions & User Session */}
        <div className="flex items-center gap-3 shrink-0">
          {currentUser ? (
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigateTo('wallet')}
                className="hidden sm:flex items-center gap-2 bg-[#1E293B] border border-slate-700 hover:border-amber-500/50 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-200 transition-all"
              >
                <Wallet className="w-4 h-4 text-amber-400" />
                <span className="font-mono tabular-nums">${currentUser.balance.available.toFixed(2)}</span>
              </button>

              <button 
                onClick={() => navigateTo('profile')}
                className="flex items-center gap-2 bg-slate-800/80 hover:bg-slate-800 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-200 border border-slate-700 transition-all"
              >
                <UserIcon className="w-4 h-4 text-amber-400" />
                <span className="max-w-[100px] truncate">{currentUser.username}</span>
              </button>

              {currentUser.role === 'admin' && (
                <button 
                  onClick={() => navigateTo('admin')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeRoute === 'admin' ? 'bg-amber-500 text-[#0B0F19]' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30 hover:bg-amber-500/30'}`}
                >
                  <Settings className="w-4 h-4" />
                  <span className="hidden sm:inline">Admin Panel</span>
                </button>
              )}

              <button 
                onClick={logout}
                title="Logout"
                className="p-1.5 text-slate-400 hover:text-red-400 transition-colors rounded-lg hover:bg-red-500/10"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <button 
                onClick={() => navigateTo('login')}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-200 hover:text-white bg-[#1E293B] border border-slate-700 hover:border-slate-600 rounded-lg transition-all whitespace-nowrap"
              >
                <LogIn className="w-4 h-4 text-amber-400" />
                Login
              </button>
              <button 
                onClick={() => navigateTo('register')}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-[#0B0F19] bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-lg shadow-lg shadow-amber-500/20 transition-all whitespace-nowrap"
              >
                <UserPlus className="w-4 h-4" />
                Register
              </button>
            </div>
          )}

          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            className="p-2 text-slate-300 hover:text-amber-400 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-lg transition-all"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-300" />}
          </button>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-[#120720] border-b border-purple-900/60 px-6 py-5 flex flex-col gap-4 shadow-2xl animate-in slide-in-from-top duration-200">
          <button 
            onClick={() => navigateTo('home')} 
            className="text-left text-sm font-medium text-slate-200 hover:text-amber-400 py-2 border-b border-slate-800/60"
          >
            Home
          </button>
          <button 
            onClick={() => navigateTo('vip-plans')} 
            className="text-left text-sm font-medium text-slate-200 hover:text-amber-400 py-2 border-b border-slate-800/60"
          >
            VIP Plans (VIP 1 - VIP 9)
          </button>
          {currentUser && (
            <>
              <button 
                onClick={() => navigateTo('my-tasks')} 
                className="text-left text-sm font-medium text-slate-200 hover:text-amber-400 py-2 border-b border-slate-800/60"
              >
                My Tasks
              </button>
              <button 
                onClick={() => navigateTo('task-watch')} 
                className="text-left text-sm font-medium text-slate-200 hover:text-amber-400 py-2 border-b border-slate-800/60"
              >
                Task Watch System
              </button>
              <button 
                onClick={() => navigateTo('wallet')} 
                className="text-left text-sm font-medium text-slate-200 hover:text-amber-400 py-2 border-b border-slate-800/60"
              >
                Wallet Balance & History
              </button>
              <button 
                onClick={() => navigateTo('invite-referral')} 
                className="text-left text-sm font-medium text-slate-200 hover:text-amber-400 py-2 border-b border-slate-800/60"
              >
                Invite & Referral (3 Levels)
              </button>
              <button 
                onClick={() => navigateTo('profile')} 
                className="text-left text-sm font-medium text-slate-200 hover:text-amber-400 py-2 border-b border-slate-800/60"
              >
                Profile Settings
              </button>
            </>
          )}
          <button 
            onClick={() => navigateTo('about-us')} 
            className="text-left text-sm font-medium text-slate-200 hover:text-amber-400 py-2 border-b border-slate-800/60"
          >
            About Us
          </button>
          <button 
            onClick={() => navigateTo('disclaimer')} 
            className="text-left text-sm font-medium text-slate-200 hover:text-amber-400 py-2 border-b border-slate-800/60"
          >
            Disclaimer & Compliance
          </button>
          <button 
            onClick={() => navigateTo('privacy-policy')} 
            className="text-left text-sm font-medium text-slate-200 hover:text-amber-400 py-2 border-b border-slate-800/60"
          >
            Privacy Policy
          </button>
          <button 
            onClick={() => navigateTo('contact-us')} 
            className="text-left text-sm font-medium text-slate-200 hover:text-amber-400 py-2"
          >
            Contact Us
          </button>
        </div>
      )}
    </header>
  );
};
