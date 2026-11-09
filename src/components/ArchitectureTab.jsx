import React from 'react';
import { Wifi, WifiOff, Printer, ShieldCheck, Cpu, ArrowRight, Zap, RefreshCw } from 'lucide-react';

export default function ArchitectureTab() {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Intro Banner */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="text-xs font-semibold uppercase tracking-wider text-amber-400">Technical Blueprint</div>
        <h2 className="text-2xl font-bold text-white mt-1">High-Reliability Architecture & Offline Resilience</h2>
        <p className="text-xs text-slate-400 mt-1">
          Designed specifically to survive unstable restaurant Wi-Fi connections, ensuring continuous service during peak dinner rushes.
        </p>
      </div>

      {/* Offline First Architecture Diagram Flow */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <WifiOff className="h-5 w-5 text-amber-400" />
          <span>Offline-First Order Synchronization Architecture</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          {/* Step 1 */}
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-amber-400 font-mono text-xs font-bold">STAGE 01</div>
            <div className="font-bold text-white text-sm">Order Punched on POS</div>
            <p className="text-xs text-slate-400">Waiter taps table and items. Order immediately stored in client-side IndexedDB.</p>
          </div>

          {/* Step 2 */}
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-amber-400 font-mono text-xs font-bold">STAGE 02</div>
            <div className="font-bold text-white text-sm">Direct LAN Thermal Print</div>
            <p className="text-xs text-slate-400">Bypasses cloud. Raw ESC/POS bytes fired directly over local Wi-Fi to kitchen 80mm printer.</p>
          </div>

          {/* Step 3 */}
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-amber-400 font-mono text-xs font-bold">STAGE 03</div>
            <div className="font-bold text-white text-sm">Online / Offline Branch</div>
            <p className="text-xs text-slate-400">If internet is UP, pushes to Vercel API. If DOWN, marks order as 'pending_sync' locally.</p>
          </div>

          {/* Step 4 */}
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-emerald-400 font-mono text-xs font-bold">STAGE 04</div>
            <div className="font-bold text-white text-sm">Background Cloud Flush</div>
            <p className="text-xs text-slate-400">Once internet recovers, background worker reconciles queue into PostgreSQL with zero data loss.</p>
          </div>
        </div>
      </div>

      {/* Hardware & Peripheral Protocols */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            <Printer className="h-5 w-5 text-amber-400" />
            <span>ESC/POS Hardware Integration Layer</span>
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Standard POS systems rely on complex third-party print spooler apps. Syud BMS utilizes direct WebUSB and TCP/IP Raw Sockets (Port 9100) to format ESC/POS command buffers directly in the browser.
          </p>
          <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-amber-300 space-y-1">
            <div>// Open Cash Drawer via RJ11 Solenoid Kick</div>
            <div>const CMD_KICK = new Uint8Array([0x1B, 0x70, 0x00, 0x19, 0xFA]);</div>
            <div>// Full Cut Paper Command</div>
            <div>const CMD_CUT = new Uint8Array([0x1D, 0x56, 0x42, 0x00]);</div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-400" />
            <span>Sub-Second KDS WebSocket Bus</span>
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Kitchen orders arrive on the head chef's screen under 500ms using persistent WebSocket channels scoped by outlet ID.
          </p>
          <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-400 space-y-1">
            <div>channel: `outlet:{outlet_id}:kds`</div>
            <div>event: `ticket.created` &rarr; triggers chime & column render</div>
            <div>event: `item.status_changed` &rarr; updates item color</div>
            <div>event: `ticket.bumped` &rarr; archives ticket</div>
          </div>
        </div>
      </div>

      {/* Role-Based Access Control Matrix */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h4 className="text-base font-bold text-white flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-amber-400" />
          <span>Security & Role-Based Access Control (RBAC)</span>
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase">
                <th className="py-2.5 px-3">System Action</th>
                <th className="py-2.5 px-3 text-center">Owner</th>
                <th className="py-2.5 px-3 text-center">Manager</th>
                <th className="py-2.5 px-3 text-center">Cashier</th>
                <th className="py-2.5 px-3 text-center">Chef</th>
                <th className="py-2.5 px-3 text-center">Waiter</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              <tr className="hover:bg-slate-800/30">
                <td className="py-2.5 px-3 font-sans text-slate-200">View Profit & Loss / Margin Report</td>
                <td className="py-2.5 px-3 text-center text-emerald-400">YES</td>
                <td className="py-2.5 px-3 text-center text-rose-500">NO</td>
                <td className="py-2.5 px-3 text-center text-rose-500">NO</td>
                <td className="py-2.5 px-3 text-center text-rose-500">NO</td>
                <td className="py-2.5 px-3 text-center text-rose-500">NO</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-2.5 px-3 font-sans text-slate-200">Void Order After Firing to Kitchen</td>
                <td className="py-2.5 px-3 text-center text-emerald-400">YES</td>
                <td className="py-2.5 px-3 text-center text-amber-400">PIN Req</td>
                <td className="py-2.5 px-3 text-center text-rose-500">NO</td>
                <td className="py-2.5 px-3 text-center text-rose-500">NO</td>
                <td className="py-2.5 px-3 text-center text-rose-500">NO</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-2.5 px-3 font-sans text-slate-200">Punch Customer Order / Split Bill</td>
                <td className="py-2.5 px-3 text-center text-emerald-400">YES</td>
                <td className="py-2.5 px-3 text-center text-emerald-400">YES</td>
                <td className="py-2.5 px-3 text-center text-emerald-400">YES</td>
                <td className="py-2.5 px-3 text-center text-rose-500">NO</td>
                <td className="py-2.5 px-3 text-center text-emerald-400">YES</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-2.5 px-3 font-sans text-slate-200">Bump Tickets on Kitchen Display</td>
                <td className="py-2.5 px-3 text-center text-emerald-400">YES</td>
                <td className="py-2.5 px-3 text-center text-emerald-400">YES</td>
                <td className="py-2.5 px-3 text-center text-rose-500">NO</td>
                <td className="py-2.5 px-3 text-center text-emerald-400">YES</td>
                <td className="py-2.5 px-3 text-center text-rose-500">NO</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
