import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Shield, Lock, LogIn, ArrowRight } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, setActiveRoute } = useApp();
  const [identifier, setIdentifier] = useState('admin');
  const [error, setError] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(identifier);
    if (success) {
      setActiveRoute('home');
    } else {
      setError('User not found. Try "admin" or "alexwright".');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-[#0B0F19] px-4 py-12">
      <div className="bg-[#111827] border border-slate-800 p-8 rounded-3xl max-w-md w-full space-y-6 shadow-2xl relative">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-[#0B0F19] font-bold text-[10px] uppercase tracking-widest px-4 py-1 rounded-full shadow">
          SECURE LOGIN
        </div>

        <div className="text-center space-y-2 pt-2">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto">
            <Shield className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-white">Welcome Back</h2>
          <p className="text-xs text-slate-400">Sign in to TASK INVEST PRO to access your VIP dashboard.</p>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-400 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Username or Email</label>
            <input 
              type="text" 
              required
              value={identifier}
              onChange={e => setIdentifier(e.target.value)}
              placeholder="e.g. admin or alexwright"
              className="w-full bg-[#070A12] border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="p-3 bg-slate-800/40 border border-slate-800 rounded-xl text-[11px] text-slate-400 space-y-1">
            <p className="font-semibold text-slate-300">Demo Accounts for Quick Access:</p>
            <p>· Admin account: <span className="font-mono text-amber-400">admin</span></p>
            <p>· User account: <span className="font-mono text-amber-400">alexwright</span></p>
          </div>

          <button 
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-[#0B0F19] font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In to Dashboard</span>
          </button>
        </form>

        <div className="text-center pt-2">
          <p className="text-xs text-slate-400">
            Don't have an account?{' '}
            <button onClick={() => setActiveRoute('register')} className="text-amber-400 font-semibold hover:underline">
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
