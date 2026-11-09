import React from 'react';
import { ChefHat, FileText, CheckCircle2, GitBranch, ExternalLink } from 'lucide-react';
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
    <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20">
              <ChefHat className="h-6 w-6 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-lg text-white tracking-tight">{projectOverview.title}</h1>
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
              <span>IEEE-830 Compliant</span>
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex space-x-1 overflow-x-auto pb-2 scrollbar-none">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-all duration-150 ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-semibold shadow-md shadow-amber-500/25'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
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
