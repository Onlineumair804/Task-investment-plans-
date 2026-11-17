import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, CheckSquare, Gift, HelpCircle, User } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeRoute, setActiveRoute } = useApp();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'my-tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'invite-referral', label: 'Invite', icon: Gift },
    { id: 'contact-us', label: 'Help', icon: HelpCircle },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#120720]/95 backdrop-blur-lg border-t border-purple-900/60 px-4 py-2">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeRoute === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveRoute(item.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${isActive ? 'text-amber-400 font-bold scale-105' : 'text-purple-300 hover:text-white'}`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-amber-400' : 'text-purple-300'}`} />
              <span className="text-[10px] tracking-wide">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
