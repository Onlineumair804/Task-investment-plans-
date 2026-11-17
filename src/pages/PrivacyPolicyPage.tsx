import React from 'react';
import { useApp } from '../context/AppContext';
import { Shield, ArrowLeft } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  const { setActiveRoute } = useApp();

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 py-12 px-4 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <button 
          onClick={() => setActiveRoute('home')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-amber-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-3xl font-black text-white">Privacy Policy</h1>
          <p className="text-xs text-slate-400">How TASK INVEST PRO protects and manages user data security.</p>
        </div>

        <div className="bg-[#111827] border border-slate-800 p-8 rounded-3xl space-y-6 text-xs text-slate-300 leading-relaxed">
          <h3 className="text-base font-bold text-white">Data Protection & Encryption</h3>
          <p>
            TASK INVEST PRO employs robust 256-bit SSL encryption and strict data privacy standards to safeguard your personal information, wallet balances, and transaction history.
          </p>

          <h3 className="text-base font-bold text-white">Information Collection</h3>
          <p>
            We collect only essential account information (username, email, phone number) required for secure authentication and verified VIP task participation. We never share user data with unauthorized third parties.
          </p>
        </div>

      </div>
    </div>
  );
};
