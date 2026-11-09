# Syud Signature F&B Business Management System (BMS)

> A modern, cloud-native Business Management System & Operating Architecture designed specifically for SME Food & Beverage (F&B) owners (cafés, casual dining, bistros, bakeries, and cloud kitchens).

---

## 🌟 Overview & Core Value Proposition

Most SME restaurant and café owners struggle with disconnected software: an expensive legacy POS that does not talk to inventory, recipe costs calculated on erratic spreadsheets, and zero real-time insight into true Cost of Goods Sold (COGS).

**Syud Signature BMS solves this with an integrated platform:**
1. **Recipe Bill of Materials (BOM)**: Real-time ingredient auto-depletion (grams, ml) upon sales with dynamic live COGS calculations.
2. **Offline-First Touch POS**: Continues taking orders and firing LAN thermal kitchen tickets even when the internet drops.
3. **Kitchen Display System (KDS)**: Sub-second WebSocket order routing with color-coded aging alerts.
4. **Blind Cash Register Closing**: Prevents cashier theft with automated variance audits and End-of-Day Z-Reports.
5. **Staff Rostering & Time Attendance**: 4-digit PIN clock-in with overtime and wage tracking.

---

## 📁 Repository Structure

```text
├── plan/                          # Full Project Plan & IEEE-830 Specifications
│   ├── SRS.md                     # Software Requirements Specification (IEEE Std 830-1998)
│   ├── PROJECT_PLAN.md            # 18-Week Implementation Roadmap, WBS, Team & Budget
│   ├── DATABASE_SCHEMA.md         # 22-Table PostgreSQL / Supabase Schema & DDL
│   ├── ARCHITECTURE.md            # System Topology, Offline Sync, KDS Protocol & RBAC
│   └── index.html                 # Standalone formatted HTML document viewer
├── src/                           # Interactive React Application & Prototype
│   ├── components/
│   │   ├── Header.jsx             # Top bar navigation & project metadata
│   │   ├── OverviewTab.jsx        # Executive summary, SME pain points & metrics
│   │   ├── ProjectPlanTab.jsx     # 6-phase roadmap, timeline, and risk matrix
│   │   ├── SRSTab.jsx             # Searchable & filterable functional requirements
│   │   ├── DatabaseTab.jsx        # Interactive schema and table attribute viewer
│   │   ├── ArchitectureTab.jsx    # Offline-first sync diagram & ESC/POS protocols
│   │   └── BMSPreviewTab.jsx      # Live prototype: POS, Recipe BOM, KDS & Z-Report
│   ├── data/
│   │   └── srsData.js             # Structured specification data models
│   ├── App.jsx                    # Root React dashboard
│   ├── index.css                  # Tailwind CSS styling
│   └── main.jsx                   # React 19 entry point
├── index.html                     # HTML entry point for Vite & Vercel
├── vite.config.js                 # Vite + Tailwind v4 configuration
└── package.json                   # Dependencies & scripts
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or 20+
- npm or pnpm

### Installation & Local Development

```bash
# Clone the repository
git clone https://github.com/aku18xy/syud-signature-bms.git
cd "Syud Signature BMS"

# Install dependencies
npm install

# Start local development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
npm run preview
```

---

## 🌐 Deploying to Vercel

### Option 1: Automatic Deploy via Git (Recommended)
1. Push this repository to GitHub:
   ```bash
   git remote add origin https://github.com/aku18xy/syud-signature-bms.git
   git push -u origin main
   ```
2. Log in to [Vercel Dashboard](https://vercel.com).
3. Click **"Add New..."** &rarr; **"Project"**.
4. Import your GitHub repository `syud-signature-bms`.
5. Framework Preset: **Vite** (auto-detected).
6. Click **Deploy**.

### Option 2: Deploy via Vercel CLI
```bash
npx vercel
```

---

## 🛠️ Transitioning from SRS Plan to Real Application

This repository was purposefully architected using modular React components in `src/components/`:
- `src/components/BMSPreviewTab.jsx` contains functional starter code for the **Touch POS**, **Recipe Costing Engine**, **KDS Screen**, and **Z-Report**.
- You can directly link these components to a live PostgreSQL or Supabase backend using the schema provided in `plan/DATABASE_SCHEMA.md`.

---

## 📄 License
Proprietary & Confidential - Built for Syud Signature F&B SME Operations.
