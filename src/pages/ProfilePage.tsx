import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User as UserIcon, Shield, CheckCircle, Save } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { currentUser, updateProfile, setActiveRoute } = useApp();

  if (!currentUser) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-[#0B0F19] text-white px-4">
        <div className="bg-[#111827] border border-slate-800 p-8 rounded-2xl max-w-md text-center space-y-4">
          <UserIcon className="w-12 h-12 text-amber-400 mx-auto" />
          <h2 className="text-xl font-bold">Authentication Required</h2>
          <p className="text-sm text-slate-400">Please sign in to view your profile settings.</p>
          <button onClick={() => setActiveRoute('login')} className="px-6 py-2.5 bg-amber-500 text-[#0B0F19] font-bold text-xs rounded-xl">
            Sign In Now
          </button>
        </div>
      </div>
    );
  }

  const [fullName, setFullName] = useState(currentUser.fullName);
  const [phone, setPhone] = useState(currentUser.phone);
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ fullName, phone });
    setSuccessMsg('Profile updated successfully!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 py-12 px-4 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-3xl font-black text-white">Profile Settings</h1>
          <p className="text-xs text-slate-400">Manage your personal account details and review active VIP status.</p>
        </div>

        {successMsg && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-xs text-emerald-400 text-center font-semibold">
            {successMsg}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Summary Card */}
          <div className="bg-[#111827] border border-slate-800 p-8 rounded-3xl space-y-6 md:col-span-1 text-center">
            <div className="w-20 h-20 rounded-full bg-amber-500/20 border-2 border-amber-500/50 flex items-center justify-center text-amber-400 text-2xl font-black mx-auto">
              {currentUser.fullName.charAt(0)}
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{currentUser.fullName}</h3>
              <p className="text-xs text-slate-400">@{currentUser.username}</p>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-3 text-xs text-left">
              <div className="flex justify-between">
                <span className="text-slate-400">Active VIP:</span>
                <span className="font-mono font-bold text-amber-400 uppercase">{currentUser.activeVipPlanId || 'None'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Account Status:</span>
                <span className="font-bold text-emerald-400 uppercase">{currentUser.accountStatus}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Referral Code:</span>
                <span className="font-mono text-white">{currentUser.referralCode}</span>
              </div>
            </div>
          </div>

          {/* Edit Form */}
          <form onSubmit={handleSubmit} className="bg-[#111827] border border-slate-800 p-8 rounded-3xl space-y-6 md:col-span-2">
            <h3 className="text-lg font-bold text-white">Update Personal Information</h3>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
              <input 
                type="text" 
                required
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                className="w-full bg-[#070A12] border border-slate-700 rounded-xl px-4 py-3 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address (Read-Only)</label>
              <input 
                type="email" 
                disabled
                value={currentUser.email}
                className="w-full bg-[#070A12]/50 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-500 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number</label>
              <input 
                type="text" 
                required
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full bg-[#070A12] border border-slate-700 rounded-xl px-4 py-3 text-xs text-white"
              />
            </div>

            <button 
              type="submit"
              className="px-6 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-[#0B0F19] font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </form>

        </div>

      </div>
    </div>
  );
};
