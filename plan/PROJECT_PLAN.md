# Project Implementation Plan
## Syud Signature F&B Business Management System (BMS)
**Project Code:** BMS-FNB-2026  
**Document Revision:** 1.0.0  
**Target Completion:** 18 Weeks (4.5 Months)  
**Primary Deployment:** Vercel (Web / Edge App) + PostgreSQL Database  

---

## 1. Executive Summary & Strategic Objectives
Syud Signature BMS is engineered to provide SME food & beverage owners with an enterprise-grade yet intuitive operating system. Most SMEs struggle with disjointed software: an expensive legacy POS that does not talk to inventory, inventory tracked on erratic spreadsheets, and zero real-time insight into true ingredient costs (COGS). 

This plan outlines the end-to-end execution path to develop, test, pilot, and deploy the system, structured into six sequential phases with clear gates and deliverables.

### Core Success Metrics (KPIs)
1. **COGS Reduction**: 4–7% decrease in food costs through automated BOM depletion and wastage tracking.
2. **Order Speed**: Front-of-house order ticket submission under 15 seconds.
3. **Inventory Accuracy**: Discrepancy between theoretical stock and actual stock under 2%.
4. **Shift Balancing Time**: Cashier end-of-day register closing time reduced from 45 minutes to under 8 minutes.
5. **Zero Outage Impact**: POS remains 100% operational during internet disconnection via local offline storage.

---

## 2. Technology Stack & Architectural Decision Records (ADR)

| Layer | Chosen Technology | Rationale |
|---|---|---|
| **Frontend Framework** | React 19 + Vite | Fast compilation, instant HMR, vast component ecosystem, seamless migration to Next.js if SSR is required. |
| **Styling & UI Kit** | Tailwind CSS v4 + Lucide Icons | Ultra-fast styling, highly responsive design for both POS touchscreens and back-office desktops. |
| **Hosting & CI/CD** | Vercel | Instant global edge CDN, zero-config branch previews, automatic SSL, and seamless serverless function deployment. |
| **Database** | PostgreSQL (Supabase / Neon / AWS RDS) | Relational integrity for financial ledgers, ACID transactions for stock decrements, JSONB for flexible recipe modifiers. |
| **ORM / Query Engine** | Prisma / Drizzle ORM | Type-safe queries, automated schema migrations, zero SQL injection vulnerability. |
| **Realtime Transport** | WebSockets / Supabase Realtime / Server-Sent Events | Sub-second order push from POS to Kitchen Display System (KDS). |
| **Client Storage** | IndexedDB (via Dexie.js / TanStack Query) | Offline cache allowing uninterrupted order-taking and local receipt printing when internet drops. |
| **Hardware Driver** | WebHID / WebUSB & TCP/IP Socket | Direct browser-to-thermal printer communication without requiring proprietary third-party print spoolers. |

---

## 3. Work Breakdown Structure (WBS) & 6-Phase Roadmap

```
+---------------------------------------------------------------------------------+
|                                 18-WEEK ROADMAP                                 |
+---------------------------------------------------------------------------------+
| Weeks 1-3   : Phase 1 - Architecture, Database Schema & Core Auth               |
| Weeks 4-6   : Phase 2 - Menu Engineering, Recipe BOM & Dynamic COGS             |
| Weeks 7-10  : Phase 3 - Point of Sale (POS) & Kitchen Display System (KDS)      |
| Weeks 11-13 : Phase 4 - Real-Time Inventory, Batch Tracking & Waste Control     |
| Weeks 14-16 : Phase 5 - Staff Rostering, Cash Shifts & Financial Accounting     |
| Weeks 17-18 : Phase 6 - Pilot Testing in Live Outlet, UAT & Production Launch    |
+---------------------------------------------------------------------------------+
```

### Phase 1: Foundation, Multi-Tenant Database & Core Auth (Weeks 1 – 3)
- **Deliverables**:
  - Setup repository, Vercel CI/CD pipeline, and preview environments.
  - PostgreSQL schema initialization (22 tables) with relational foreign keys.
  - Role-Based Access Control (RBAC): Superadmin, Branch Manager, Cashier, Kitchen Crew.
  - Multi-outlet data partitioning (support single-outlet SME up to 20 branches).
- **Milestone Gate M1**: Successful automated test of user authentication and tenant isolation.

### Phase 2: Menu Engineering, Recipe BOM & Dynamic Costing (Weeks 4 – 6)
- **Deliverables**:
  - Menu catalog management: categories, items, combo sets, variants, and modifiers.
  - Ingredient master catalog with purchase units (kg, litre, bag) and recipe units (g, ml, pc).
  - Bill of Materials (BOM) engine calculating raw food cost per menu item.
  - Real-time gross margin and recommended retail price calculator.
  - Allergen matrix and dietary tag configuration.
- **Milestone Gate M2**: Owner can input a complex dish recipe (e.g. Wagyu Burger) and see instantaneous unit cost and gross margin breakdown.

### Phase 3: Touch POS Engine & Kitchen Display System (Weeks 7 – 10)
- **Deliverables**:
  - Interactive table floor plan with visual seat status (Free, Seated, Billed, Dirty).
  - High-speed touch POS screen with category filtering, search, and modifier popups.
  - Split billing (by item or even split), discount codes, and manager PIN overrides.
  - Dual-station Kitchen Display System (KDS) with color-coded aging timers and audio buzzer.
  - ESC/POS network thermal printer driver integration for 80mm kitchen tickets and customer receipts.
  - Offline-first cache in IndexedDB with automated background synchronization.
- **Milestone Gate M3**: Complete simulation of 100 simultaneous orders punched from 3 POS terminals and routed to KDS under 500ms latency.

### Phase 4: Perishable Inventory, Batch Tracking & Waste Management (Weeks 11 – 13)
- **Deliverables**:
  - Automatic inventory deduction on order completion according to recipe BOM.
  - Batch tracking with FIFO rotation and expiry date threshold alerts.
  - Digital physical stock-take tool with barcode scanning and dollar variance calculation.
  - Kitchen waste logging tool with categorization (spoilage, burnt, test meal, dropped).
  - Reorder point calculation and automated draft Purchase Order (PO) creation.
- **Milestone Gate M4**: Theoretical stock matches physical count within 1% tolerance across 50 simulated ingredient items.

### Phase 5: Workforce Shifts, Cash Control & Financial Reports (Weeks 14 – 16)
- **Deliverables**:
  - Daily cash register management: opening float, petty cash payouts, and blind closing count.
  - Automated End-of-Day Z-Report with tax breakdown, payment gateway reconciliation, and variance audit.
  - Staff drag-and-drop weekly roster planner with labor cost budgeting.
  - 4-digit PIN clock-in/out attendance tracking.
  - Customer loyalty engine: phone-number based points earning, redemption, and membership tiers.
  - Executive analytics dashboard: hourly sales heatmap, best-seller Pareto analysis (80/20), and P&L estimate.
- **Milestone Gate M5**: Production-ready end-of-day financial reconciliation verified with mock accounting ledger.

### Phase 6: Live Pilot Outlet Deployment, UAT & Launch (Weeks 17 – 18)
- **Deliverables**:
  - Pilot testing in 1 partner restaurant outlet during live lunch & dinner rushes.
  - Stress testing of printer failure, network disconnection, and simultaneous split payments.
  - On-site staff training manual and quick-reference laminated cheat sheets.
  - Production deployment on Vercel with automated daily database backups.
- **Milestone Gate M6**: Final sign-off from SME owner and formal cut-over to Syud Signature BMS.

---

## 4. Resource Allocation & Team Composition

| Role | Headcount | Primary Focus |
|---|---|---|
| **Tech Lead / Full-Stack Architect** | 1 | Architecture, Database Schema, Realtime WebSocket sync, Vercel deployments |
| **Frontend Engineer (React / UI)** | 1 | POS touch interface, KDS responsive screens, Executive Analytics Dashboard |
| **Backend & Integration Specialist** | 1 | ESC/POS printer protocols, Payment gateway webhooks, Offline sync engine |
| **F&B Domain Consultant / SME Owner** | 1 | Menu engineering validation, kitchen workflow design, operational audits |
| **QA / Automation Engineer** | 1 | End-to-end testing, offline simulation, load testing on POS order queues |

---

## 5. Risk Assessment & Mitigation Matrix

| Identified Risk | Severity | Likelihood | Mitigation Strategy |
|---|---|---|---|
| **Restaurant Internet Outage** | Critical | High | Implement offline-first IndexedDB storage; POS stores orders locally and continues printing to LAN thermal printers. Auto-syncs upon reconnect. |
| **Staff Hardware Resistance / High Staff Turnover** | High | High | Minimalistic UI with zero training required; max 3 clicks to punch popular items. 4-digit PIN quick switch between servers. |
| **Kitchen Ticket Printing Failures (Jammed paper / Loose cable)** | High | Medium | Dual redundancy: KDS digital screen acts as backup source of truth if thermal printer runs out of paper or disconnects. |
| **Ingredient Unit Confusion (e.g. Gram vs Kilogram input)** | Medium | High | Hardcoded validation with conversion engine (1 kg = 1000 g). Warn user if recipe ingredient unit cost exceeds menu price. |
| **Cash Drawer Shortage / Theft** | High | Medium | Blind cash counting at closing (cashier inputs actual cash without seeing expected total); manager override log for all drawer opens. |

---

## 6. Budget & Operating Cost Estimate (SME Friendly)

| Category | Initial Setup | Monthly Ongoing (Per Outlet) | Notes |
|---|---|---|---|
| **Hosting (Vercel Pro)** | $0 | $20 / month | Global Edge CDN, automated deployments, preview environments. |
| **Database (PostgreSQL / Supabase Pro)** | $0 | $25 / month | Automated daily backups, realtime subscriptions, 8GB storage. |
| **Hardware (1x 10" POS Tablet + 1x 10" KDS Tablet)** | $400 | $0 (One-off) | Standard Android/iPad tablets. |
| **Thermal Printers (2x 80mm LAN/USB ESC/POS)** | $220 | $0 (One-off) | 1 for front counter, 1 for hot kitchen. |
| **Cash Drawer (Heavy Duty RJ11)** | $60 | $0 (One-off) | Triggered via receipt printer. |
| **Total Hardware Cost** | **~$680 (One-off)** | - | Extremely competitive vs legacy POS vendors ($3,000+). |
| **Total Cloud Software Cost** | - | **~$45 / month** | Covers full system operations for 1 outlet. |

---

## 7. Definition of Done (DoD)
For any module to be certified production-ready, it MUST fulfill:
1. Full TypeScript/JavaScript unit and integration test coverage.
2. Verified responsive operation on both touch tablet (iPad/Android) and desktop Chrome.
3. Offline recovery verified: Network disabled -> 5 orders entered -> Network re-enabled -> 100% data reconciled in PostgreSQL.
4. Security audit passed: No unauthorized user can view financial reports or bypass manager PIN overrides.
5. Code committed, reviewed, and deployed via Vercel CI/CD pipeline.
