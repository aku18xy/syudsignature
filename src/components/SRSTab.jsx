import React, { useState } from 'react';
import { Search, Filter, CheckCircle, Tag, Sparkles } from 'lucide-react';
import { functionalRequirements } from '../data/srsData';

export default function SRSTab() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedModule, setSelectedModule] = useState('All');
  const [selectedPriority, setSelectedPriority] = useState('All');

  const modules = ['All', ...new Set(functionalRequirements.map((r) => r.module))];
  const priorities = ['All', 'P1 (Critical)', 'P2 (High)'];

  const filtered = functionalRequirements.filter((req) => {
    const matchesSearch =
      req.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesModule = selectedModule === 'All' || req.module === selectedModule;
    const matchesPriority = selectedPriority === 'All' || req.priority.includes(selectedPriority.replace(' (Critical)', '').replace(' (High)', ''));
    return matchesSearch && matchesModule && matchesPriority;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Search and Filters Bar */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>Software Requirements Specification (SRS) Catalog</span>
            <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-semibold">
              {filtered.length} Requirements Found
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">Conforming to IEEE Std 830-1998 for Food & Beverage Enterprise Applications.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          {/* Search Input */}
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-3 text-slate-500" />
            <input
              type="text"
              placeholder="Search by ID, keyword, or module..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-800/80 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Module Filter */}
          <div className="relative">
            <select
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-800/80 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
            >
              {modules.map((m) => (
                <option key={m} value={m}>Module: {m}</option>
              ))}
            </select>
          </div>

          {/* Priority Filter */}
          <div className="relative">
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-800/80 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
            >
              {priorities.map((p) => (
                <option key={p} value={p}>Priority: {p}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Requirements List */}
      <div className="grid grid-cols-1 gap-4">
        {filtered.map((req) => (
          <div
            key={req.id}
            className="p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 transition duration-150 space-y-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  {req.id}
                </span>
                <span className="text-base font-bold text-white">{req.title}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium border border-slate-700">
                  {req.module}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded font-semibold ${
                  req.priority.includes('Critical')
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                }`}>
                  {req.priority}
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">{req.description}</p>

            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-emerald-400">Acceptance Criteria: </span>
                <span>{req.acceptance}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
