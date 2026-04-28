/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Leaf } from 'lucide-react';
import LandingPage from './components/LandingPage';
import CustomerPortal from './components/CustomerPortal';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  const [activeView, setActiveView] = useState<'landing' | 'customer' | 'admin'>('landing');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans flex flex-col selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Navigation */}
      <nav className="h-20 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-md px-6 md:px-8 flex items-center justify-between shrink-0 sticky top-0 z-50">
        <button 
          onClick={() => setActiveView('landing')}
          className="flex items-center gap-3 shrink-0"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.4)]">
            <div className="w-5 h-5 border-2 border-white rotate-45"></div>
          </div>
          <div className="text-left hidden sm:block">
            <h1 className="text-xl font-bold tracking-tight text-white leading-none">ReviveChain AI</h1>
            <p className="text-[10px] text-slate-400 font-medium tracking-[0.2em] uppercase mt-1">Smart Logistics</p>
          </div>
        </button>
        
        <div className="hidden md:flex items-center gap-8 bg-slate-900 border border-slate-800 rounded-full px-6 py-2 shadow-inner">
          <button 
            onClick={() => setActiveView('customer')}
            className={`transition-colors text-sm font-bold tracking-wide ${activeView === 'customer' ? 'text-emerald-400' : 'text-slate-400 hover:text-white'}`}
          >
            Customer Portal
          </button>
          <div className="w-px h-4 bg-slate-800"></div>
          <button 
            onClick={() => setActiveView('admin')}
            className={`transition-colors text-sm font-bold tracking-wide ${activeView === 'admin' ? 'text-emerald-400' : 'text-slate-400 hover:text-white'}`}
          >
            Admin Dashboard
          </button>
        </div>
        
        <div className="flex items-center gap-4">
            <div className="hidden lg:flex flex-col items-end">
              <span className="text-xs font-semibold text-slate-300">System Ready</span>
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Secure Connection
              </span>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700"></div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-start">
        {activeView === 'landing' && <LandingPage onGetStarted={() => setActiveView('customer')} onViewAdmin={() => setActiveView('admin')} />}
        {activeView === 'customer' && <CustomerPortal />}
        {activeView === 'admin' && <AdminDashboard />}
      </main>

      {/* Bottom Impact Bar */}
      {activeView !== 'landing' && (
        <footer className="h-12 shrink-0 bg-black border-t border-slate-800/50 px-8 flex items-center justify-between text-slate-400 text-[10px] font-bold tracking-[0.2em] uppercase max-md:hidden">
          <div className="flex items-center gap-8">
            <span>Network Status: Optimal</span>
            <span>Latency: 45ms</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-500" style={{ textShadow: '0 0 10px rgba(16,185,129,0.5)' }}>System Integrity Verified</span>
          </div>
        </footer>
      )}
    </div>
  );
}
