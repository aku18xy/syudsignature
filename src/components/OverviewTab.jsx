import React from 'react';
import { TrendingUp, Clock, ShieldCheck, WifiOff, Store, DollarSign, Database, Server, Cpu, Check, AlertTriangle } from 'lucide-react';
import { projectOverview } from '../data/srsData';

export default function OverviewTab({ setActiveTab }) {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Section */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/30 border border-slate-800 p-8 sm:p-10">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <span>Specialized F&B Operations Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Comprehensive Management System for Food & Beverage SMEs
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Designed specifically for restaurant and café operators who need to eliminate food waste, stop cash leakage, speed up kitchen orders, and maintain real-time visibility over true Cost of Goods Sold (COGS).
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('preview')}
              className="px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-sm transition shadow-lg shadow-amber-500/20 flex items-center gap-2"
            >
              <span>Explore Live BMS Prototype</span>
              <span>&rarr;</span>
            </button>
            <button
              onClick={() => setActiveTab('srs')}
              className="px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm transition border border-slate-700"
            >
              Read Software Requirements (SRS)
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {projectOverview.objectives.map((obj, i) => (
          <div key={i} className="p-6 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 transition">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">{obj.metric}</span>
              <span className="h-8 w-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-xs">
                {i === 0 ? <TrendingUp className="h-4 w-4" /> : i === 1 ? <Clock className="h-4 w-4" /> : i === 2 ? <ShieldCheck className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />}
              </span>
            </div>
            <div className="text-2xl font-extrabold text-amber-400">{obj.target}</div>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">{obj.desc}</p>
          </div>
        ))}
      </div>

      {/* SME F&B Pain Points vs Syud BMS Solutions */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <span>Why F&B SMEs Fail vs How Syud BMS Solves It</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-xl bg-rose-950/20 border border-rose-900/30 space-y-4">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm uppercase tracking-wide">
              <AlertTriangle className="h-4 w-4" />
              <span>Current SME Industry Pain Points</span>
            </div>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">•</span>
                <span><strong>Hidden Ingredient Spoilage:</strong> Food waste eats 6-12% of margins because chefs don't have batch expiration FIFO tracking.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">•</span>
                <span><strong>Disconnected POS & Inventory:</strong> POS records dish sales, but doesn't automatically decrement raw meat, milk, or sauces.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">•</span>
                <span><strong>Cashier Shift Discrepancies:</strong> Open cash registers allow theft and unaccounted voids during busy weekend rushes.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">•</span>
                <span><strong>Internet Downtime Paralysis:</strong> Cloud POS freezes when restaurant Wi-Fi stutters, halting kitchen tickets and payments.</span>
              </li>
            </ul>
          </div>

          <div className="p-5 rounded-xl bg-emerald-950/20 border border-emerald-900/30 space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm uppercase tracking-wide">
              <Check className="h-4 w-4" />
              <span>The Syud Signature BMS Solution</span>
            </div>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Recipe Bill of Materials (BOM):</strong> Every menu item links to exact grams of ingredients. Selling 1 burger instantly auto-deducts 1 bun, 180g patty, and 20g sauce.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Dynamic Live COGS:</strong> Live calculation of plate cost based on weighted-average ingredient purchase prices.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Blind Shift Closing:</strong> Cashiers enter physical counted cash blind. System flags exact variance for manager audit.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Offline-First Resilience:</strong> Client-side IndexedDB caching allows uninterrupted ordering & direct LAN thermal printing during internet drops.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Target Roles & Architecture Stack */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4">
          <h4 className="text-lg font-bold text-white flex items-center gap-2">
            <Store className="h-5 w-5 text-amber-400" />
            <span>Built for Every Role in the Outlet</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-lg bg-slate-800/60 border border-slate-700/60">
              <div className="font-semibold text-amber-400 text-sm">Business Owner / Partner</div>
              <p className="text-xs text-slate-400 mt-1">Multi-branch consolidated P&L, real-time gross margin alerts, menu engineering BCG matrix.</p>
            </div>
            <div className="p-4 rounded-lg bg-slate-800/60 border border-slate-700/60">
              <div className="font-semibold text-amber-400 text-sm">Outlet Manager & Supervisor</div>
              <p className="text-xs text-slate-400 mt-1">Shift rosters, blind cash audits, manager PIN overrides for voids, physical stock takes.</p>
            </div>
            <div className="p-4 rounded-lg bg-slate-800/60 border border-slate-700/60">
              <div className="font-semibold text-amber-400 text-sm">Cashier & Floor Waiters</div>
              <p className="text-xs text-slate-400 mt-1">Lightning fast table ordering, split bills, multi-tender payments, offline fallback queue.</p>
            </div>
            <div className="p-4 rounded-lg bg-slate-800/60 border border-slate-700/60">
              <div className="font-semibold text-amber-400 text-sm">Head Chef & Kitchen Crew</div>
              <p className="text-xs text-slate-400 mt-1">Digital KDS station routing, bump bars, color-coded aging timers, kitchen wastage logs.</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4">
          <h4 className="text-lg font-bold text-white flex items-center gap-2">
            <Server className="h-5 w-5 text-amber-400" />
            <span>Modern Cloud Stack</span>
          </h4>
          <div className="space-y-3 pt-2 text-xs text-slate-300">
            <div className="flex items-center justify-between p-2.5 rounded bg-slate-800/50">
              <span className="text-slate-400">Frontend UI</span>
              <span className="font-semibold text-white">React 19 + Tailwind v4</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded bg-slate-800/50">
              <span className="text-slate-400">Edge & Hosting</span>
              <span className="font-semibold text-white">Vercel Edge Platform</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded bg-slate-800/50">
              <span className="text-slate-400">Relational DB</span>
              <span className="font-semibold text-white">PostgreSQL / Supabase</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded bg-slate-800/50">
              <span className="text-slate-400">Client Offline DB</span>
              <span className="font-semibold text-white">IndexedDB (Dexie)</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded bg-slate-800/50">
              <span className="text-slate-400">Hardware Printing</span>
              <span className="font-semibold text-white">ESC/POS LAN / WebUSB</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
