import React from 'react';
import { useApp } from '../context/AppContext';
import { Shield, Lock, Award, FileText, HelpCircle, Mail, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveRoute, websiteSettings } = useApp();

  const navigateTo = (route: string) => {
    setActiveRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#070A12] border-t border-slate-800 text-slate-400 text-sm py-12 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        
        {/* Column 1: Brand & Compliance */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-[#0B0F19] font-black text-lg">
              <Shield className="w-5 h-5 fill-[#0B0F19]" />
            </div>
            <span className="text-base font-black tracking-wider text-slate-100">
              {websiteSettings.siteName}
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            A verified commercial revenue allocation and VIP task management platform. All rewards are backed by verified enterprise business contracts and genuine media services.
          </p>
          <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-lg w-fit">
            <Lock className="w-3.5 h-3.5" />
            <span>Secure 256-Bit SSL Encryption</span>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="space-y-3">
          <h4 className="text-slate-200 font-bold text-xs uppercase tracking-wider">Navigation</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => navigateTo('home')} className="hover:text-amber-400 transition-colors">Home Dashboard</button>
            </li>
            <li>
              <button onClick={() => navigateTo('vip-plans')} className="hover:text-amber-400 transition-colors">VIP Plans (VIP 1 - VIP 9)</button>
            </li>
            <li>
              <button onClick={() => navigateTo('about-us')} className="hover:text-amber-400 transition-colors">About Our Business Model</button>
            </li>
            <li>
              <button onClick={() => navigateTo('contact-us')} className="hover:text-amber-400 transition-colors">Customer Support</button>
            </li>
          </ul>
        </div>

        {/* Column 3: Legal & Safeguards */}
        <div className="space-y-3">
          <h4 className="text-slate-200 font-bold text-xs uppercase tracking-wider">Legal & Compliance</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => navigateTo('disclaimer')} className="hover:text-amber-400 transition-colors">Financial Disclaimer & Risks</button>
            </li>
            <li>
              <button onClick={() => navigateTo('privacy-policy')} className="hover:text-amber-400 transition-colors">Privacy Policy & GDPR</button>
            </li>
            <li>
              <span className="text-slate-500">Verified Revenue Audits</span>
            </li>
            <li>
              <span className="text-slate-500">Terms of Commercial Participation</span>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact Info */}
        <div className="space-y-3">
          <h4 className="text-slate-200 font-bold text-xs uppercase tracking-wider">Operations & Contact</h4>
          <div className="space-y-2 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{websiteSettings.supportEmail}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{websiteSettings.supportPhone}</span>
            </div>
            <p className="text-[11px] text-slate-500 pt-2">
              Audited Business Revenue: <span className="text-amber-400 font-mono font-semibold">${websiteSettings.verifiedRevenueTotal.toLocaleString()}</span>
            </p>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p>© 2026 {websiteSettings.siteName}. All rights reserved. Powered by Verified Enterprise Business Revenue.</p>
        <div className="flex items-center gap-4">
          <button onClick={() => navigateTo('disclaimer')} className="hover:text-slate-300">Disclaimer</button>
          <span>·</span>
          <button onClick={() => navigateTo('privacy-policy')} className="hover:text-slate-300">Privacy</button>
          <span>·</span>
          <button onClick={() => navigateTo('contact-us')} className="hover:text-slate-300">Support</button>
        </div>
      </div>
    </footer>
  );
};
