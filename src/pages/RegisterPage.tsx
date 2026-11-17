import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Shield, UserPlus, ArrowRight } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const { register, setActiveRoute } = useApp();
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [error, setError] = useState('');

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = register(fullName, username, email, phone, referralCode);
    if (res.success) {
      setActiveRoute('home');
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-[#0B0F19] px-4 py-12">
      <div className="bg-[#111827] border border-slate-800 p-8 rounded-3xl max-w-lg w-full space-y-6 shadow-2xl relative">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-[#0B0F19] font-bold text-[10px] uppercase tracking-widest px-4 py-1 rounded-full shadow">
          NEW MEMBER REGISTRATION
        </div>

        <div className="text-center space-y-2 pt-2">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto">
            <Shield className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-white">Create Account</h2>
          <p className="text-xs text-slate-400">Join TASK INVEST PRO and access verified VIP task tiers.</p>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-400 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleRegisterSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
              <input 
                type="text" 
                required
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="John Doe"
                className="w-full bg-[#070A12] border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Username</label>
              <input 
                type="text" 
                required
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="johndoe"
                className="w-full bg-[#070A12] border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="john@example.com"
                className="w-full bg-[#070A12] border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number</label>
              <input 
                type="text" 
                required
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full bg-[#070A12] border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Referral Code (Optional)</label>
            <input 
              type="text" 
              value={referralCode}
              onChange={e => setReferralCode(e.target.value)}
              placeholder="e.g. TIPADMIN"
              className="w-full bg-[#070A12] border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
            />
          </div>

          <button 
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-[#0B0F19] font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all"
          >
            <UserPlus className="w-4 h-4" />
            <span>Complete Registration</span>
          </button>
        </form>

        <div className="text-center pt-2">
          <p className="text-xs text-slate-400">
            Already have an account?{' '}
            <button onClick={() => setActiveRoute('login')} className="text-amber-400 font-semibold hover:underline">
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
