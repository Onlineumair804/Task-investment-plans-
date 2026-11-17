import React from 'react';
import { useApp } from '../context/AppContext';
import { Shield, CheckCircle, ArrowLeft } from 'lucide-react';

export const AboutUsPage: React.FC = () => {
  const { setActiveRoute, websiteSettings } = useApp();

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
          <h1 className="text-3xl font-black text-white">About Us & Business Model</h1>
          <p className="text-xs text-slate-400">Learn about TASK INVEST PRO's verified commercial revenue allocation model.</p>
        </div>

        <div className="bg-[#111827] border border-slate-800 p-8 rounded-3xl space-y-6 text-sm text-slate-300 leading-relaxed">
          <h3 className="text-xl font-bold text-white">Verified Commercial Revenue Backing</h3>
          <p>
            {websiteSettings.siteName} is a professional VIP task management and verified business revenue platform. Unlike speculative or unbacked platforms, all rewards distributed on TASK INVEST PRO are strictly derived from verified enterprise contracts, digital advertising impression validation, and software telemetry audit agreements.
          </p>

          <h3 className="text-xl font-bold text-white">Strict VIP Task Separation</h3>
          <p>
            We implement absolute architectural separation across our 9 VIP tiers (VIP 1 through VIP 9). Tasks assigned to a specific VIP plan are exclusively accessible to participants of that tier. This guarantees fair distribution and rigorous quality control for enterprise partners.
          </p>

          <h3 className="text-xl font-bold text-white">Sustainable 3-Level Referrals</h3>
          <p>
            Our referral system rewards active community building across 3 levels. Commissions are generated strictly from verified commercial task completion and genuine business revenue allocations, never from recruitment fees or deposit redistribution.
          </p>
        </div>

      </div>
    </div>
  );
};
