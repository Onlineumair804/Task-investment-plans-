import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mail, Phone, ArrowLeft, Send, CheckCircle } from 'lucide-react';

export const ContactUsPage: React.FC = () => {
  const { setActiveRoute, websiteSettings } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
          <h1 className="text-3xl font-black text-white">Contact Customer Support</h1>
          <p className="text-xs text-slate-400">Our support desk is available 24/7 to assist with VIP plans and wallet inquiries.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-[#111827] border border-slate-800 p-8 rounded-3xl space-y-6 md:col-span-1">
            <h3 className="text-lg font-bold text-white">Support Channels</h3>
            
            <div className="space-y-4 text-xs text-slate-300">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Email Support</span>
                  <span className="font-semibold text-white">{websiteSettings.supportEmail}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Phone Support</span>
                  <span className="font-semibold text-white">{websiteSettings.supportPhone}</span>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-[#111827] border border-slate-800 p-8 rounded-3xl space-y-6 md:col-span-2">
            <h3 className="text-lg font-bold text-white">Send a Support Ticket</h3>

            {submitted ? (
              <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-center space-y-2">
                <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-emerald-400">Ticket Submitted Successfully</h4>
                <p className="text-xs text-slate-300">Our support team will review your inquiry and respond within 24 hours.</p>
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name</label>
                  <input 
                    type="text" 
                    required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-[#070A12] border border-slate-700 rounded-xl px-4 py-3 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-[#070A12] border border-slate-700 rounded-xl px-4 py-3 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Message</label>
                  <textarea 
                    rows={4}
                    required
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-[#070A12] border border-slate-700 rounded-xl p-4 text-xs text-white"
                  />
                </div>

                <button 
                  type="submit"
                  className="px-6 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 text-[#0B0F19] font-bold text-xs rounded-xl shadow flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Support Ticket</span>
                </button>
              </>
            )}
          </form>

        </div>

      </div>
    </div>
  );
};
