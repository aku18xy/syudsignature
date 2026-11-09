import React, { useState } from 'react';
import { Calendar, CheckCircle2, AlertOctagon, DollarSign, Layers, ChevronDown, ChevronRight, ShieldAlert } from 'lucide-react';
import { implementationPhases, riskMatrix } from '../data/srsData';

export default function ProjectPlanTab() {
  const [expandedPhase, setExpandedPhase] = useState(1);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-400">Implementation Plan</div>
          <h2 className="text-2xl font-bold text-white mt-1">18-Week Strategic Delivery Roadmap</h2>
          <p className="text-sm text-slate-400 mt-1">Structured across 6 agile milestone phases from database core to live restaurant pilot cut-over.</p>
        </div>
        <div className="flex items-center gap-6 border-t sm:border-t-0 sm:border-l border-slate-800 pt-4 sm:pt-0 sm:pl-6">
          <div>
            <div className="text-xs text-slate-400">Total Duration</div>
            <div className="text-xl font-extrabold text-white">18 Weeks</div>
          </div>
          <div>
            <div className="text-xs text-slate-400">Phases</div>
            <div className="text-xl font-extrabold text-amber-400">6 Milestones</div>
          </div>
        </div>
      </div>

      {/* 6 Phases Accordion / Timeline */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Layers className="h-5 w-5 text-amber-400" />
          <span>Implementation Phases & Deliverables</span>
        </h3>

        <div className="space-y-3">
          {implementationPhases.map((phase) => {
            const isExpanded = expandedPhase === phase.phase;
            return (
              <div
                key={phase.phase}
                className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                  isExpanded ? 'bg-slate-900/90 border-amber-500/50 shadow-lg shadow-amber-500/10' : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                }`}
              >
                <button
                  onClick={() => setExpandedPhase(isExpanded ? null : phase.phase)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
                >
                  <div className="flex items-center gap-4">
                    <span className={`h-8 w-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                      phase.status === 'In Progress' ? 'bg-amber-500 text-slate-950 animate-pulse' : 'bg-slate-800 text-slate-300'
                    }`}>
                      P{phase.phase}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-base">{phase.name}</span>
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                          phase.status === 'In Progress' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {phase.status}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                        <Calendar className="h-3 w-3" />
                        <span>{phase.duration}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                      <div className="text-xs font-semibold text-slate-300">{phase.progress}% Ready</div>
                      <div className="w-24 h-1.5 bg-slate-800 rounded-full mt-1 overflow-hidden">
                        <div
                          className="h-full bg-amber-500 rounded-full transition-all duration-500"
                          style={{ width: `${phase.progress}%` }}
                        />
                      </div>
                    </div>
                    {isExpanded ? <ChevronDown className="h-5 w-5 text-slate-400" /> : <ChevronRight className="h-5 w-5 text-slate-400" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 border-t border-slate-800/80 space-y-4 text-sm animate-fadeIn">
                    <div>
                      <div className="font-semibold text-slate-300 mb-2 text-xs uppercase tracking-wider">Key Engineering Deliverables:</div>
                      <ul className="space-y-2">
                        {phase.deliverables.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-slate-300 text-xs sm:text-sm">
                            <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3.5 rounded-lg bg-amber-950/20 border border-amber-900/30 text-amber-300 text-xs flex items-start gap-2.5">
                      <span className="font-bold shrink-0">Quality Milestone Gate:</span>
                      <span>{phase.gate}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Risk Management Matrix */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <ShieldAlert className="h-5 w-5 text-amber-400" />
          <span>F&B Operational Risk Assessment & Mitigation</span>
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300 border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase">
                <th className="py-3 px-4">Identified Operational Risk</th>
                <th className="py-3 px-3">Impact</th>
                <th className="py-3 px-3">Likelihood</th>
                <th className="py-3 px-4">Engineering Mitigation Strategy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {riskMatrix.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition">
                  <td className="py-3.5 px-4 font-semibold text-white">{item.risk}</td>
                  <td className="py-3.5 px-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                      item.impact === 'Critical' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}>
                      {item.impact}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-xs text-slate-400">{item.likelihood}</td>
                  <td className="py-3.5 px-4 text-xs text-slate-300 leading-relaxed">{item.mitigation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SME Friendly Cost Architecture */}
      <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800/70 border border-slate-800 p-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
          <DollarSign className="h-5 w-5 text-amber-400" />
          <span>Estimated SME Hardware & Cloud Cost Comparison</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="text-amber-400 font-bold text-sm">Syud Signature BMS (Cloud-Native Modern Stack)</div>
            <div className="text-3xl font-black text-white">~$45 <span className="text-sm font-normal text-slate-400">/ month + $680 hardware</span></div>
            <p className="text-xs text-slate-400">Runs on standard Android/iPads with zero vendor lock-in, free automatic Vercel continuous deployments, and low-cost Supabase PostgreSQL.</p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800 space-y-3 opacity-75">
            <div className="text-slate-400 font-bold text-sm">Legacy Proprietary F&B POS Systems</div>
            <div className="text-3xl font-black text-slate-400">~$150+ <span className="text-sm font-normal text-slate-500">/ month + $3,500 hardware</span></div>
            <p className="text-xs text-slate-400">Locked into bulky proprietary terminals, expensive software license keys, paid support visits, and poor integration with cloud inventory.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
