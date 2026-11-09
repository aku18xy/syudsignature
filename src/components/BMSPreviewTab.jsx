import React, { useState } from 'react';
import { ShoppingCart, UtensilsCrossed, MonitorPlay, Receipt, Plus, Minus, Trash2, Check, Clock, AlertCircle } from 'lucide-react';

const INITIAL_MENU = [
  {
    id: 'm1',
    name: 'Signature Wagyu Burger',
    category: 'Mains',
    price: 36.00,
    cogs: 13.50,
    ingredients: [
      { name: 'Brioche Bun', qty: 1, unit: 'pc', cost: 1.50 },
      { name: 'Wagyu Patty (180g)', qty: 180, unit: 'g', cost: 9.00 },
      { name: 'Cheddar Cheese', qty: 1, unit: 'slice', cost: 0.80 },
      { name: 'Truffle Aioli', qty: 25, unit: 'g', cost: 1.20 },
      { name: 'Eco Burger Box', qty: 1, unit: 'pc', cost: 1.00 },
    ]
  },
  {
    id: 'm2',
    name: 'Truffle Parmesan Fries',
    category: 'Sides',
    price: 18.00,
    cogs: 4.80,
    ingredients: [
      { name: 'Shoestring Fries', qty: 200, unit: 'g', cost: 2.20 },
      { name: 'White Truffle Oil', qty: 10, unit: 'ml', cost: 1.60 },
      { name: 'Parmigiano-Reggiano', qty: 15, unit: 'g', cost: 1.00 },
    ]
  },
  {
    id: 'm3',
    name: 'Iced Spanish Latte',
    category: 'Beverages',
    price: 15.00,
    cogs: 3.60,
    ingredients: [
      { name: 'Specialty Espresso Beans', qty: 18, unit: 'g', cost: 1.60 },
      { name: 'Fresh Whole Milk', qty: 180, unit: 'ml', cost: 0.90 },
      { name: 'Condensed Milk', qty: 30, unit: 'ml', cost: 0.50 },
      { name: 'PET Cup & Bio Straw', qty: 1, unit: 'set', cost: 0.60 },
    ]
  },
  {
    id: 'm4',
    name: 'Creamy Carbonara Pasta',
    category: 'Mains',
    price: 32.00,
    cogs: 9.20,
    ingredients: [
      { name: 'Spaghetti Pasta', qty: 120, unit: 'g', cost: 1.20 },
      { name: 'Smoked Beef Bacon', qty: 60, unit: 'g', cost: 3.80 },
      { name: 'Egg Yolk & Cream', qty: 80, unit: 'ml', cost: 2.20 },
      { name: 'Pecorino Romano', qty: 20, unit: 'g', cost: 2.00 },
    ]
  }
];

export default function BMSPreviewTab() {
  const [subTab, setSubTab] = useState('pos'); // pos, recipe, kds, zreport
  const [selectedTable, setSelectedTable] = useState('Table 04');
  const [cart, setCart] = useState([
    { ...INITIAL_MENU[0], qty: 2 },
    { ...INITIAL_MENU[2], qty: 2 },
  ]);
  const [kdsTickets, setKdsTickets] = useState([
    {
      id: 'TICK-101',
      table: 'Table 02',
      time: '6m ago',
      urgent: false,
      items: ['1x Signature Wagyu Burger (Medium Rare)', '1x Truffle Parmesan Fries']
    },
    {
      id: 'TICK-102',
      table: 'Table 07',
      time: '18m ago',
      urgent: true,
      items: ['2x Creamy Carbonara Pasta', '1x Iced Spanish Latte']
    }
  ]);
  const [orderSent, setOrderSent] = useState(false);

  // Cart calculations
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const totalCogs = cart.reduce((acc, item) => acc + item.cogs * item.qty, 0);
  const taxSST = subtotal * 0.06;
  const serviceCharge = subtotal * 0.10;
  const grandTotal = subtotal + taxSST + serviceCharge;
  const grossProfit = subtotal - totalCogs;
  const marginPct = subtotal > 0 ? ((grossProfit / subtotal) * 100).toFixed(1) : '0';

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) => (p.id === item.id ? { ...p, qty: p.qty + 1 } : p));
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, qty: p.qty + delta } : p))
        .filter((p) => p.qty > 0)
    );
  };

  const handleSendToKitchen = () => {
    if (cart.length === 0) return;
    const newTicket = {
      id: `TICK-${Math.floor(100 + Math.random() * 900)}`,
      table: selectedTable,
      time: 'Just now',
      urgent: false,
      items: cart.map((c) => `${c.qty}x ${c.name}`)
    };
    setKdsTickets([newTicket, ...kdsTickets]);
    setOrderSent(true);
    setTimeout(() => setOrderSent(false), 3000);
  };

  const bumpTicket = (ticketId) => {
    setKdsTickets((prev) => prev.filter((t) => t.id !== ticketId));
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-400">Interactive Blueprint & Codebase Foundation</div>
          <h2 className="text-2xl font-bold text-white mt-1">Live BMS Functional Prototype</h2>
          <p className="text-xs text-slate-400 mt-1">
            Test the live user experience below. This module is written in modular React and can be edited into your production application.
          </p>
        </div>

        {/* Sub-nav pills */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSubTab('pos')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              subTab === 'pos' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Touch POS Terminal
          </button>
          <button
            onClick={() => setSubTab('recipe')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              subTab === 'recipe' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Recipe BOM & COGS
          </button>
          <button
            onClick={() => setSubTab('kds')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              subTab === 'kds' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Kitchen KDS Screen
          </button>
          <button
            onClick={() => setSubTab('zreport')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              subTab === 'zreport' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Daily Z-Report
          </button>
        </div>
      </div>

      {/* 1. TOUCH POS TERMINAL */}
      {subTab === 'pos' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
          {/* Menu Catalog (8 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase text-slate-400">Select Table:</span>
                {['Table 01', 'Table 02', 'Table 04', 'Bar 01'].map((tbl) => (
                  <button
                    key={tbl}
                    onClick={() => setSelectedTable(tbl)}
                    className={`px-2.5 py-1 rounded text-xs font-semibold transition ${
                      selectedTable === tbl ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {tbl}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {INITIAL_MENU.map((item) => (
                <div
                  key={item.id}
                  onClick={() => addToCart(item)}
                  className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/60 transition cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-medium">{item.category}</span>
                      <span className="text-xs text-emerald-400 font-mono font-bold">COGS: ${item.cogs.toFixed(2)}</span>
                    </div>
                    <div className="font-bold text-white text-base mt-2 group-hover:text-amber-400 transition">{item.name}</div>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                      {item.ingredients.map((i) => i.name).join(', ')}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-800/80">
                    <span className="font-extrabold text-amber-400 text-base font-mono">${item.price.toFixed(2)}</span>
                    <button className="px-2.5 py-1 rounded bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1 group-hover:bg-amber-400 transition">
                      <Plus className="h-3 w-3" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Live BOM Auto-Depletion Box */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="text-xs font-bold uppercase text-amber-400 flex items-center gap-1.5">
                <UtensilsCrossed className="h-3.5 w-3.5" />
                <span>Live Real-Time Inventory Auto-Depletion Calculator</span>
              </div>
              <p className="text-xs text-slate-400">
                Ingredients that will be immediately decremented from inventory batches once this order is fired:
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {cart.flatMap((c) => c.ingredients.map((ing) => (
                  <span key={ing.name + c.id} className="text-[11px] px-2 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300 font-mono">
                    -{ing.qty * c.qty} {ing.unit} {ing.name}
                  </span>
                )))}
              </div>
            </div>
          </div>

          {/* Active Cart & Checkout (5 Cols) */}
          <div className="lg:col-span-5 p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-amber-400" />
                  <span className="font-bold text-white text-base">Current Bill: {selectedTable}</span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-mono font-bold">
                  {cart.reduce((a, b) => a + b.qty, 0)} Items
                </span>
              </div>

              {/* Cart Items */}
              <div className="divide-y divide-slate-800/80 my-3 max-h-60 overflow-y-auto pr-1">
                {cart.length === 0 ? (
                  <div className="py-8 text-center text-xs text-slate-500">Cart is empty. Select items from the left.</div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="py-2.5 flex items-center justify-between text-xs">
                      <div className="max-w-[170px]">
                        <div className="font-semibold text-white truncate">{item.name}</div>
                        <div className="text-[11px] text-slate-400 font-mono">${item.price.toFixed(2)} each</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center border border-slate-700 rounded-lg bg-slate-950">
                          <button onClick={() => updateQty(item.id, -1)} className="p-1 text-slate-400 hover:text-white">
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="px-2 font-mono font-bold text-white text-xs">{item.qty}</span>
                          <button onClick={() => updateQty(item.id, 1)} className="p-1 text-slate-400 hover:text-white">
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="font-mono font-bold text-amber-400 w-14 text-right">
                          ${(item.price * item.qty).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Bill Summary */}
            <div className="space-y-2 pt-3 border-t border-slate-800 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span className="font-mono text-slate-200">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>SST Tax (6%)</span>
                <span className="font-mono text-slate-200">${taxSST.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Service Charge (10%)</span>
                <span className="font-mono text-slate-200">${serviceCharge.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-white pt-2 border-t border-slate-800">
                <span>Total Amount Due</span>
                <span className="font-mono text-amber-400 text-base">${grandTotal.toFixed(2)}</span>
              </div>

              {/* Owner Profit Insight Bar */}
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 mt-2 flex justify-between items-center text-[11px]">
                <span className="text-slate-400">Live Dish Margin:</span>
                <span className="font-bold text-emerald-400 font-mono">{marginPct}% (${grossProfit.toFixed(2)} profit)</span>
              </div>

              {orderSent && (
                <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs text-center flex items-center justify-center gap-2">
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span>Order sent to Kitchen Display System (KDS)!</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={handleSendToKitchen}
                  disabled={cart.length === 0}
                  className="w-full py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-xs transition shadow-md shadow-amber-500/20"
                >
                  Send to Kitchen
                </button>
                <button
                  onClick={() => alert(`Simulating Cash Payment receipt for $${grandTotal.toFixed(2)}... Kick cash drawer via RJ11 pulse.`)}
                  disabled={cart.length === 0}
                  className="w-full py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition border border-slate-700"
                >
                  Collect Cash & Print
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. RECIPE BOM & COGS MARGIN CALCULATOR */}
      {subTab === 'recipe' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 animate-fadeIn">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <UtensilsCrossed className="h-5 w-5 text-amber-400" />
              <span>Menu Item Recipe & Bill of Materials (BOM) Engineer</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Select a dish to inspect exact raw ingredient breakdown, weighted-average purchase cost, and live gross margins.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="text-xs font-bold uppercase text-amber-400">Selected Recipe</div>
              <div className="text-xl font-bold text-white">Signature Wagyu Burger</div>
              <div className="space-y-2 pt-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Retail Menu Price:</span>
                  <span className="font-mono font-bold text-white">$36.00</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Raw Ingredient Cost (COGS):</span>
                  <span className="font-mono font-bold text-rose-400">$13.50</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Gross Profit per Plate:</span>
                  <span className="font-mono font-bold text-emerald-400">$22.50</span>
                </div>
                <div className="flex justify-between text-slate-400 border-t border-slate-800 pt-2">
                  <span>Gross Margin %:</span>
                  <span className="font-mono font-extrabold text-amber-400 text-sm">62.5%</span>
                </div>
              </div>
              <div className="p-3 rounded bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300">
                ⭐ <strong>Menu Engineering Status:</strong> STAR item (High Sales Volume, High Margin). Recommended: Protect ingredient portion consistency.
              </div>
            </div>

            <div className="lg:col-span-2 overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase">
                    <th className="py-2 px-3">Ingredient</th>
                    <th className="py-2 px-3">Portion / Unit</th>
                    <th className="py-2 px-3">Unit Cost</th>
                    <th className="py-2 px-3">Total Cost</th>
                    <th className="py-2 px-3">% of Total COGS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {INITIAL_MENU[0].ingredients.map((ing, idx) => {
                    const pct = ((ing.cost / 13.50) * 100).toFixed(1);
                    return (
                      <tr key={idx} className="hover:bg-slate-800/40">
                        <td className="py-2.5 px-3 font-sans font-semibold text-white">{ing.name}</td>
                        <td className="py-2.5 px-3 text-slate-300">{ing.qty} {ing.unit}</td>
                        <td className="py-2.5 px-3 text-slate-400">${ing.cost.toFixed(2)}</td>
                        <td className="py-2.5 px-3 text-amber-400 font-bold">${ing.cost.toFixed(2)}</td>
                        <td className="py-2.5 px-3 text-slate-400">{pct}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 3. KITCHEN DISPLAY SYSTEM (KDS) */}
      {subTab === 'kds' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <MonitorPlay className="h-5 w-5 text-amber-400" />
                <span>Real-Time Kitchen Display System (KDS) Station</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">Live order tickets with color-coded aging timers and tap-to-bump action.</p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Station: Hot Kitchen</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {kdsTickets.map((ticket) => (
              <div
                key={ticket.id}
                className={`p-4 rounded-xl border space-y-3 flex flex-col justify-between transition ${
                  ticket.urgent
                    ? 'bg-rose-950/20 border-rose-500/60 shadow-lg shadow-rose-500/10'
                    : 'bg-slate-950 border-slate-800'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="font-bold text-white text-base">{ticket.table}</span>
                    <span className={`text-xs px-2 py-0.5 rounded font-mono font-bold flex items-center gap-1 ${
                      ticket.urgent ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-300'
                    }`}>
                      <Clock className="h-3 w-3" />
                      <span>{ticket.time}</span>
                    </span>
                  </div>
                  <div className="font-mono text-xs text-slate-500 mt-1">{ticket.id}</div>

                  <ul className="space-y-2 mt-3 text-sm">
                    {ticket.items.map((item, idx) => (
                      <li key={idx} className="text-slate-200 font-medium flex items-start gap-2">
                        <span className="text-amber-400 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => bumpTicket(ticket.id)}
                  className="w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-md"
                >
                  <Check className="h-4 w-4" />
                  <span>Bump / Complete Ticket</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. DAILY END-OF-DAY Z-REPORT */}
      {subTab === 'zreport' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <div className="text-xs font-semibold uppercase text-amber-400">Financial Audit</div>
              <h3 className="text-xl font-bold text-white mt-0.5 flex items-center gap-2">
                <Receipt className="h-5 w-5 text-amber-400" />
                <span>Daily End-of-Day Z-Report Reconciliation</span>
              </h3>
            </div>
            <span className="text-xs px-3 py-1 rounded bg-slate-800 text-slate-300 font-mono">
              Register #01 • Shift 01
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-xs text-slate-400">Gross Sales Revenue</span>
              <div className="text-2xl font-black text-white mt-1">$1,842.50</div>
              <span className="text-[10px] text-emerald-400 font-semibold">+14% vs yesterday</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-xs text-slate-400">Total Ingredient Cost (COGS)</span>
              <div className="text-2xl font-black text-rose-400 mt-1">$589.60</div>
              <span className="text-[10px] text-slate-400 font-semibold">32.0% Food Cost Ratio</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-xs text-slate-400">Estimated Gross Margin</span>
              <div className="text-2xl font-black text-emerald-400 mt-1">$1,252.90</div>
              <span className="text-[10px] text-amber-400 font-semibold">68.0% Profit Margin</span>
            </div>
          </div>

          {/* Payment Method Breakdown */}
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="text-xs font-bold uppercase text-slate-400">Tender Reconciliation</div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded bg-slate-900 border border-slate-800">
                <div className="text-slate-400">Cash in Drawer</div>
                <div className="text-base font-bold text-white font-mono mt-0.5">$650.00</div>
              </div>
              <div className="p-3 rounded bg-slate-900 border border-slate-800">
                <div className="text-slate-400">Visa / Mastercard</div>
                <div className="text-base font-bold text-white font-mono mt-0.5">$820.00</div>
              </div>
              <div className="p-3 rounded bg-slate-900 border border-slate-800">
                <div className="text-slate-400">DuitNow / QR Payments</div>
                <div className="text-base font-bold text-white font-mono mt-0.5">$372.50</div>
              </div>
              <div className="p-3 rounded bg-slate-900 border border-slate-800">
                <div className="text-slate-400">Cash Variance (Blind)</div>
                <div className="text-base font-bold text-emerald-400 font-mono mt-0.5">$0.00 (Balanced)</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
