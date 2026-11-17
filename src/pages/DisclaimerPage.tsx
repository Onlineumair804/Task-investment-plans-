import React from 'react';
import { useApp } from '../context/AppContext';
import { AlertTriangle, ArrowLeft } from 'lucide-react';

export const DisclaimerPage: React.FC = () => {
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
          <h1 className="text-3xl font-black text-white">Financial Disclaimer & Risks</h1>
          <p className="text-xs text-slate-400">Important legal terms and risk disclosures for platform participants.</p>
        </div>

        <div className="bg-[#111827] border border-slate-800 p-8 rounded-3xl space-y-6 text-xs text-slate-300 leading-relaxed">
          <div className="flex items-center gap-3 p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-amber-400">
            <AlertTriangle className="w-6 h-6 shrink-0" />
            <span>Participating in digital task platforms and commercial tiers involves evaluation of market conditions and verified business revenue performance.</span>
          </div>

          <h3 className="text-base font-bold text-white">1. No Guaranteed Fixed Returns</h3>
          <p>
            TASK INVEST PRO does not promise guaranteed fixed daily profits or investment returns funded by new member deposits. All rewards are contingent upon active task completion and verified business revenue allocations.
          </p>

          <h3 className="text-base font-bold text-white">2. Commercial Risk Acknowledgement</h3>
          <p>
            Participants acknowledge that digital task completion requires adherence to watch timing verification rules and KYC guidelines. Payouts are subject to administrative review and compliance checks.
          </p>
        </div>

      </div>
    </div>
  );
};
