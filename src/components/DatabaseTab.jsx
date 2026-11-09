import React, { useState } from 'react';
import { Database, Table, Key, Code, Check, Copy } from 'lucide-react';
import { databaseTables } from '../data/srsData';

export default function DatabaseTab() {
  const [selectedTable, setSelectedTable] = useState(databaseTables[3]); // menu_items by default
  const [copied, setCopied] = useState(false);

  const copySQL = () => {
    navigator.clipboard.writeText(`SELECT * FROM ${selectedTable.name};`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Intro */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-400">Database Relational Schema</div>
          <h2 className="text-2xl font-bold text-white mt-1">PostgreSQL 15+ & Supabase Data Model</h2>
          <p className="text-xs text-slate-400 mt-1">
            Engineered with strict foreign key constraints, ACID compliance, and high-frequency POS indexing.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-medium text-slate-300 border border-slate-700">
            22 Tables Total
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-amber-500/10 text-xs font-medium text-amber-400 border border-amber-500/20">
            PostgreSQL 15+
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Table Selector Sidebar */}
        <div className="rounded-xl bg-slate-900 border border-slate-800 p-4 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3 py-1">Schema Entities</div>
          <div className="space-y-1 max-h-[500px] overflow-y-auto pr-1">
            {databaseTables.map((t) => {
              const isSelected = selectedTable.name === t.name;
              return (
                <button
                  key={t.name}
                  onClick={() => setSelectedTable(t)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm transition flex items-center justify-between ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                      : 'text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <Table className="h-3.5 w-3.5" />
                    <span>{t.name}</span>
                  </div>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                    isSelected ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {t.category}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Table Inspector */}
        <div className="lg:col-span-2 rounded-xl bg-slate-900 border border-slate-800 p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-lg font-bold text-amber-400">{selectedTable.name}</span>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {selectedTable.category}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">{selectedTable.purpose}</p>
            </div>

            <button
              onClick={copySQL}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 flex items-center gap-1.5 transition"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Query'}</span>
            </button>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Key className="h-3.5 w-3.5 text-amber-400" />
              <span>Table Attributes & Constraints</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {selectedTable.columns.map((col, idx) => (
                <div
                  key={idx}
                  className="px-3 py-2 rounded-lg bg-slate-950/60 border border-slate-800 font-mono text-xs text-slate-300 flex items-center justify-between"
                >
                  <span>{col}</span>
                  {col.includes('PK') && (
                    <span className="text-[10px] px-1 rounded bg-amber-500/20 text-amber-400 font-bold">PRIMARY KEY</span>
                  )}
                  {col.includes('FK') && (
                    <span className="text-[10px] px-1 rounded bg-sky-500/20 text-sky-400 font-bold">FOREIGN KEY</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Code Preview */}
          <div className="pt-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <Code className="h-3.5 w-3.5 text-amber-400" />
              <span>Full SQL DDL Available</span>
            </div>
            <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-400 font-mono overflow-x-auto">
              <p className="text-slate-500">-- See full file in plan/DATABASE_SCHEMA.md</p>
              <p className="text-emerald-400">CREATE TABLE {selectedTable.name} (</p>
              {selectedTable.columns.map((c, i) => (
                <p key={i} className="pl-4 text-slate-300">
                  {c.split(' ')[0]} {c.includes('UUID') ? 'UUID' : c.includes('NUMERIC') ? 'NUMERIC(10,2)' : 'VARCHAR(150)'},
                </p>
              ))}
              <p className="text-emerald-400">);</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
