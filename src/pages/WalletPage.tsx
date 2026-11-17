import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Wallet, ArrowUpRight, ArrowDownLeft, Shield, Clock, CheckCircle } from 'lucide-react';

export const WalletPage: React.FC = () => {
  const { currentUser, transactions, requestDeposit, requestWithdrawal, setActiveRoute } = useApp();
  
  const [depositModal, setDepositModal] = useState(false);
  const [depositAmt, setDepositAmt] = useState(100);

  const [withdrawModal, setWithdrawModal] = useState(false);
  const [withdrawAmt, setWithdrawAmt] = useState(50);
  const [withdrawDetails, setWithdrawDetails] = useState('');
  const [msg, setMsg] = useState('');

  if (!currentUser) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-[#0B0F19] text-white px-4">
        <div className="bg-[#111827] border border-slate-800 p-8 rounded-2xl max-w-md text-center space-y-4">
          <Wallet className="w-12 h-12 text-amber-400 mx-auto" />
          <h2 className="text-xl font-bold">Authentication Required</h2>
          <p className="text-sm text-slate-400">Please sign in to view your wallet balance and transactions.</p>
          <button onClick={() => setActiveRoute('login')} className="px-6 py-2.5 bg-amber-500 text-[#0B0F19] font-bold text-xs rounded-xl">
            Sign In Now
          </button>
        </div>
      </div>
    );
  }

  const userTxs = transactions.filter(t => t.userId === currentUser.id);

  const handleDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = requestDeposit(Number(depositAmt));
    setMsg(res.message);
    setDepositModal(false);
  };

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = requestWithdrawal(Number(withdrawAmt), withdrawDetails || 'USDT TRC20 Wallet');
    setMsg(res.message);
    setWithdrawModal(false);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 py-12 px-4 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-3xl font-black text-white">Wallet & Financial Balance</h1>
            <p className="text-xs text-slate-400">Secure record of available funds, pending rewards, and transaction logs.</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setDepositModal(true)}
              className="px-4 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-[#0B0F19] font-bold text-xs rounded-xl shadow transition-all flex items-center gap-1.5"
            >
              <ArrowDownLeft className="w-4 h-4" />
              <span>Deposit Funds</span>
            </button>
            <button 
              onClick={() => setWithdrawModal(true)}
              className="px-4 py-2.5 bg-[#1E293B] hover:bg-slate-800 text-white font-semibold text-xs rounded-xl border border-slate-700 transition-all flex items-center gap-1.5"
            >
              <ArrowUpRight className="w-4 h-4 text-amber-400" />
              <span>Withdraw Payout</span>
            </button>
          </div>
        </div>

        {msg && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-xs text-emerald-400 text-center font-semibold">
            {msg}
          </div>
        )}

        {/* Balance KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#111827] border border-slate-800 p-6 rounded-3xl space-y-2">
            <span className="text-xs text-slate-400">Available Balance</span>
            <div className="text-3xl font-black font-mono text-emerald-400">${currentUser.balance.available.toFixed(2)}</div>
          </div>
          <div className="bg-[#111827] border border-slate-800 p-6 rounded-3xl space-y-2">
            <span className="text-xs text-slate-400">Pending Rewards</span>
            <div className="text-3xl font-black font-mono text-amber-400">${currentUser.balance.pendingRewards.toFixed(2)}</div>
          </div>
          <div className="bg-[#111827] border border-slate-800 p-6 rounded-3xl space-y-2">
            <span className="text-xs text-slate-400">Total Earned</span>
            <div className="text-3xl font-black font-mono text-white">${currentUser.balance.totalEarned.toFixed(2)}</div>
          </div>
          <div className="bg-[#111827] border border-slate-800 p-6 rounded-3xl space-y-2">
            <span className="text-xs text-slate-400">Withdrawn Amount</span>
            <div className="text-3xl font-black font-mono text-slate-300">${currentUser.balance.withdrawn.toFixed(2)}</div>
          </div>
        </div>

        {/* Transaction History Table */}
        <div className="bg-[#111827] border border-slate-800 rounded-3xl overflow-hidden space-y-4">
          <div className="p-6 border-b border-slate-800 font-bold text-base text-white">Transaction History</div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#070A12] text-slate-400 uppercase font-semibold">
                <tr>
                  <th className="p-4">Transaction ID</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Description</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {userTxs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-400">No transactions recorded yet.</td>
                  </tr>
                ) : (
                  userTxs.map(tx => (
                    <tr key={tx.id} className="hover:bg-slate-800/30">
                      <td className="p-4 font-mono text-slate-300">{tx.id}</td>
                      <td className="p-4 uppercase font-semibold text-amber-400">{tx.type}</td>
                      <td className="p-4 text-slate-300">{tx.description}</td>
                      <td className={`p-4 font-mono font-bold ${tx.amount >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {tx.amount >= 0 ? `+$${tx.amount.toFixed(2)}` : `-$${Math.abs(tx.amount).toFixed(2)}`}
                      </td>
                      <td className="p-4 uppercase font-bold text-[10px] text-slate-300">{tx.status}</td>
                      <td className="p-4 text-slate-400">{tx.timestamp}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Deposit Modal */}
      {depositModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleDepositSubmit} className="bg-[#111827] border border-slate-800 p-8 rounded-3xl max-w-md w-full space-y-4">
            <h3 className="text-xl font-bold text-white">Deposit Funds</h3>
            <p className="text-xs text-slate-400">Securely deposit funds to activate VIP plans and participate in verified task streams.</p>
            
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Amount ($)</label>
              <input 
                type="number" 
                required
                min="10"
                value={depositAmt}
                onChange={e => setDepositAmt(Number(e.target.value))}
                className="w-full bg-[#070A12] border border-slate-700 rounded-xl px-4 py-3 text-xs text-white font-mono"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button type="submit" className="flex-1 py-3 bg-amber-500 text-[#0B0F19] text-xs font-bold rounded-xl">Confirm Deposit</button>
              <button type="button" onClick={() => setDepositModal(false)} className="flex-1 py-3 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl border border-slate-700">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Withdrawal Modal */}
      {withdrawModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleWithdrawSubmit} className="bg-[#111827] border border-slate-800 p-8 rounded-3xl max-w-md w-full space-y-4">
            <h3 className="text-xl font-bold text-white">Request Payout Withdrawal</h3>
            <p className="text-xs text-slate-400">Available balance: <span className="font-mono text-emerald-400">${currentUser.balance.available.toFixed(2)}</span></p>
            
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Withdrawal Amount ($)</label>
              <input 
                type="number" 
                required
                max={currentUser.balance.available}
                value={withdrawAmt}
                onChange={e => setWithdrawAmt(Number(e.target.value))}
                className="w-full bg-[#070A12] border border-slate-700 rounded-xl px-4 py-3 text-xs text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Wallet Address / Bank Details</label>
              <input 
                type="text" 
                required
                value={withdrawDetails}
                onChange={e => setWithdrawDetails(e.target.value)}
                placeholder="USDT TRC20 or Bank IBAN..."
                className="w-full bg-[#070A12] border border-slate-700 rounded-xl px-4 py-3 text-xs text-white"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button type="submit" className="flex-1 py-3 bg-amber-500 text-[#0B0F19] text-xs font-bold rounded-xl">Submit Request</button>
              <button type="button" onClick={() => setWithdrawModal(false)} className="flex-1 py-3 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl border border-slate-700">Cancel</button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
