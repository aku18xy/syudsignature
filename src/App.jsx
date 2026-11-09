import React, { useState } from 'react';
import Header from './components/Header';
import OverviewTab from './components/OverviewTab';
import ProjectPlanTab from './components/ProjectPlanTab';
import SRSTab from './components/SRSTab';
import DatabaseTab from './components/DatabaseTab';
import ArchitectureTab from './components/ArchitectureTab';
import BMSPreviewTab from './components/BMSPreviewTab';
import { FileText, Printer } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Top Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && <OverviewTab setActiveTab={setActiveTab} />}
        {activeTab === 'plan' && <ProjectPlanTab />}
        {activeTab === 'srs' && <SRSTab />}
        {activeTab === 'database' && <DatabaseTab />}
        {activeTab === 'architecture' && <ArchitectureTab />}
        {activeTab === 'preview' && <BMSPreviewTab />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/60 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            <span className="font-semibold text-slate-300">Syud Signature BMS</span> • Software Requirements Specification & Implementation Plan
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-slate-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>Vercel & PostgreSQL Ready</span>
            </span>
            <button
              onClick={() => window.print()}
              className="text-amber-400 hover:text-amber-300 transition flex items-center gap-1"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print / Save PDF</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
