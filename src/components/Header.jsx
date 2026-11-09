import React from 'react';
import { ChefHat, CheckCircle2 } from 'lucide-react';
import { projectOverview } from '../data/srsData';

export default function Header({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'overview', label: 'Executive Overview', icon: '📋' },
    { id: 'plan', label: 'Project Plan & Roadmap', icon: '🚀' },
    { id: 'srs', label: 'SRS Requirements', icon: '📑' },
    { id: 'database', label: 'Database & Schema', icon: '🗄️' },
    { id: 'architecture', label: 'Architecture & Offline', icon: '⚡' },
    { id: 'preview', label: 'Live BMS Prototype', icon: '🍽️' },
  ];

  return (
    <header className="border-b border-slate-800 bg-slate-900/95 backdrop-blur sticky top-0 z-50 shadow-md shadow-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3.5 border-b border-slate-800/60">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20">
              <ChefHat className="h-6 w-6 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-base sm:text-lg text-white tracking-tight">{projectOverview.title}</h1>
                <span className="px-2 py-0.5 text-xs font-semibold rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  SRS v{projectOverview.version}
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Tailored for F&B SME Owners • Built for React HTML & Vercel
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">IEEE-830 Compliant</span>
              <span className="sm:hidden">IEEE-830</span>
            </span>
          </div>
        </div>

        {/* Mobile Dropdown for small screens */}
        <div className="sm:hidden py-2.5">
          <label htmlFor="tab-select" className="sr-only">Select View</label>
          <select
            id="tab-select"
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
            className="w-full bg-slate-800 text-amber-400 text-sm font-semibold rounded-lg px-3 py-2 border border-slate-700 focus:outline-none focus:border-amber-500"
          >
            {tabs.map((tab) => (
              <option key={tab.id} value={tab.id}>
                {tab.icon} {tab.label}
              </option>
            ))}
          </select>
        </div>

        {/* Tab Navigation (Always wrapped so all tabs are visible on all screens) */}
        <nav className="hidden sm:flex flex-wrap items-center gap-1.5 py-2.5">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs md:text-sm font-medium rounded-lg transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/25 ring-2 ring-amber-400'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80 bg-slate-900/60 border border-slate-800/80'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
