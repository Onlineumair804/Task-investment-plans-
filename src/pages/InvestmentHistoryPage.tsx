import React from 'react';
import { useApp } from '../context/AppContext';
import { Layers, ArrowLeft, Shield } from 'lucide-react';

export const InvestmentHistoryPage: React.FC = () => {
  const { transactions, setActiveRoute } = useApp();
  const vipPurchases = transactions.filter(t => t.type === 'vip_purchase');

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 py-12 px-4 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <button 
          onClick={() => setActiveRoute('wallet')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-amber-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Wallet</span>
        </button>

        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-3xl font-black text-white">Investment History</h1>
          <p className="text-xs text-slate-400">Record of verified VIP plan activations and business revenue allocations.</p>
        </div>

        <div className="bg-[#111827] border border-slate-800 rounded-3xl overflow-hidden">
          <div className="divide-y divide-slate-800">
            {vipPurchases.length === 0 ? (
              <div className="p-12 text-center text-slate-400 text-sm">No VIP plan activations recorded.</div>
            ) : (
              vipPurchases.map(tx => (
                <div key={tx.id} className="p-6 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-amber-400" />
                      <span className="text-sm font-bold text-white">{tx.description}</span>
                    </div>
                    <p className="text-xs text-slate-400">{tx.timestamp}</p>
                  </div>
                  <span className="font-mono font-bold text-amber-400 text-sm">-${Math.abs(tx.amount).toFixed(2)}</span>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
