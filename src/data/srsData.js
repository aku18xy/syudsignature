export const projectOverview = {
  title: "Syud Signature F&B Business Management System (BMS)",
  shortName: "Syud BMS",
  version: "1.0.0",
  standard: "IEEE Std 830-1998 Conforming",
  industry: "Food & Beverage (F&B) SME - Cafés, Casual Dining, Cloud Kitchens & Bakeries",
  targetDeployment: "Vercel (Frontend & Edge Functions) + PostgreSQL / Supabase",
  lastUpdated: "November 2026",
  objectives: [
    {
      metric: "COGS Reduction",
      target: "4% - 7%",
      desc: "Direct reduction in food waste through automated Recipe BOM deductions and batch expiry tracking."
    },
    {
      metric: "POS Order Speed",
      target: "< 15s",
      desc: "Fast table ordering with max 3 touches for high-frequency items, reducing customer queue time."
    },
    {
      metric: "Shift Balancing",
      target: "< 8 mins",
      desc: "Automated blind cash counting and daily Z-Report audit replacing error-prone manual spreadsheets."
    },
    {
      metric: "Offline Resilience",
      target: "100% Uptime",
      desc: "Uninterrupted POS order-taking and local LAN kitchen printing even during total internet dropouts."
    }
  ]
};

export const implementationPhases = [
  {
    phase: 1,
    name: "Foundation, Multi-Tenant Database & Core Auth",
    duration: "Weeks 1 – 3",
    status: "In Progress",
    progress: 100,
    deliverables: [
      "Repository setup & Vercel automated CI/CD deployment pipelines",
      "PostgreSQL 22-table relational schema with ACID integrity & indexes",
      "Role-Based Access Control (Superadmin, Branch Manager, Cashier, Chef, Waiter)",
      "Multi-outlet tenancy data isolation architecture"
    ],
    gate: "M1: Multi-tenant auth verified with automated unit tests & security audits."
  },
  {
    phase: 2,
    name: "Menu Engineering, Recipe BOM & Dynamic Costing",
    duration: "Weeks 4 – 6",
    status: "Planned",
    progress: 35,
    deliverables: [
      "Menu catalog builder: categories, items, combo sets, and modifiers",
      "Ingredient master with dual units (purchase unit vs recipe unit)",
      "Bill of Materials (BOM) engine calculating exact ingredient cost per plate",
      "Dynamic gross profit margin & recommended selling price calculator",
      "Allergen matrix & Halal/Dietary compliance tagging"
    ],
    gate: "M2: Real-time COGS calculation verified against 50 multi-ingredient recipes."
  },
  {
    phase: 3,
    name: "Touch POS Engine & Kitchen Display System (KDS)",
    duration: "Weeks 7 – 10",
    status: "Planned",
    progress: 15,
    deliverables: [
      "Interactive table floor plan with real-time dining status (Free, Seated, Billed)",
      "Touchscreen POS interface optimized for speed with split billing & discounts",
      "Dual-station KDS (Hot Kitchen & Bar) with color aging timers and audio alerts",
      "Direct LAN ESC/POS 80mm thermal receipt & kitchen ticket printer drivers",
      "IndexedDB offline cache enabling order taking with zero internet connection"
    ],
    gate: "M3: Sub-500ms ticket arrival latency on KDS under 100 concurrent simulated orders."
  },
  {
    phase: 4,
    name: "Perishable Inventory, Batch Tracking & Waste Management",
    duration: "Weeks 11 – 13",
    status: "Planned",
    progress: 0,
    deliverables: [
      "Real-time ingredient auto-depletion upon completed order sales",
      "Perishable batch tracking with FIFO rotation and 48-hour expiry warnings",
      "Digital stock-take audit with barcode scanning and dollar variance reports",
      "Structured waste & spoilage logging (expired, kitchen burn, customer return)",
      "Low-stock par level notifications and automated draft Purchase Orders"
    ],
    gate: "M4: Physical stock count matches system theoretical inventory within 1% variance."
  },
  {
    phase: 5,
    name: "Workforce Shifts, Cash Control & Financial Reports",
    duration: "Weeks 14 – 16",
    status: "Planned",
    progress: 0,
    deliverables: [
      "Daily cash register shift open/close with blind closing count and discrepancy flags",
      "Automated End-of-Day Z-Report with tax breakdown (SST/GST) and tender breakdown",
      "Drag-and-drop staff roster planner with labor budget vs projected revenue",
      "4-digit PIN clock-in/out attendance with overtime calculation",
      "Customer loyalty engine with points earning, tiered cashback, and SMS/WhatsApp promos",
      "Executive Analytics: Menu Engineering Matrix (Stars, Plowhorses, Puzzles, Dogs)"
    ],
    gate: "M5: Complete financial ledger reconciliation and export to accounting standards."
  },
  {
    phase: 6,
    name: "Live Pilot Outlet Deployment, UAT & Launch",
    duration: "Weeks 17 – 18",
    status: "Planned",
    progress: 0,
    deliverables: [
      "Pilot deployment in live restaurant during peak lunch and dinner rushes",
      "Stress testing on printer disconnects, cash drawer pulses, and network drops",
      "On-site staff training manuals, video walkthroughs, and laminated cheat sheets",
      "Final cut-over to Syud Signature BMS with production monitoring and alerts"
    ],
    gate: "M6: Owner sign-off and 100% stable uninterrupted operations across 14 consecutive days."
  }
];

export const functionalRequirements = [
  {
    id: "FR-POS-01",
    module: "POS & Ordering",
    priority: "P1 (Critical)",
    title: "Table Floor Plan & Table Management",
    description: "Interactive floor plan layout customizable per outlet zone (Indoor, Patio, Bar). Displays real-time status: Available (Green), Occupied (Amber), Billed (Blue), Cleaning (Red). Supports table merging and bill transferring.",
    acceptance: "Floor plan updates in < 200ms across all waiter devices when a table status changes."
  },
  {
    id: "FR-POS-02",
    module: "POS & Ordering",
    priority: "P1 (Critical)",
    title: "High-Speed Touch Order Punching",
    description: "Fast touch order entry with category tabs, search, and dynamic modifier popups (e.g., Less Sweet, Extra Cheese, No Onion). Maximum 3 touches to punch high-volume items.",
    acceptance: "Waiter can punch an order of 3 dishes with modifiers in under 12 seconds."
  },
  {
    id: "FR-POS-03",
    module: "POS & Ordering",
    priority: "P1 (Critical)",
    title: "Split Billing & Multi-Tender Payments",
    description: "Support splitting bills evenly by guest count or by specific item selection. Accept cash, credit/debit card, DuitNow QR, e-wallets, and gift vouchers in a single transaction.",
    acceptance: "System prevents order closure until total tendered payments exactly equal the bill total."
  },
  {
    id: "FR-POS-04",
    module: "POS & Ordering",
    priority: "P1 (Critical)",
    title: "Offline Order Taking & Local LAN Printing",
    description: "When internet connectivity is lost, POS stores all orders locally in IndexedDB and sends raw ESC/POS print jobs directly to thermal printers over local Wi-Fi. Syncs back to PostgreSQL when online.",
    acceptance: "Zero orders or print jobs lost during 6 hours of simulated internet disconnection."
  },
  {
    id: "FR-KDS-01",
    module: "Kitchen Display (KDS)",
    priority: "P1 (Critical)",
    title: "Intelligent Ticket Routing to Kitchen Stations",
    description: "Automatically routes order items to designated stations: Hot Kitchen (Steaks, Pastas), Bar (Coffees, Juices), and Cold Prep (Salads, Desserts).",
    acceptance: "Drink items appear instantly on Bar KDS without appearing on Hot Kitchen screen."
  },
  {
    id: "FR-KDS-02",
    module: "Kitchen Display (KDS)",
    priority: "P1 (Critical)",
    title: "Color-Coded Aging Timers & Bump Audio",
    description: "Tickets are color-coded: Green (<10 min), Amber (10-20 min), Flashing Red (>20 min overdue). Audio chime on new incoming tickets and item bump actions.",
    acceptance: "Visual alert pulses and sound triggers reliably when orders exceed par prep times."
  },
  {
    id: "FR-REC-01",
    module: "Recipe & BOM",
    priority: "P1 (Critical)",
    title: "Ingredient Bill of Materials (BOM)",
    description: "Every menu item links to exact quantities of raw ingredients (e.g. Wagyu Burger = 1 Brioche Bun, 180g Wagyu Patty, 20g Truffle Mayo, 1 Burger Box).",
    acceptance: "Ingredient depletion triggers automatically upon order completion."
  },
  {
    id: "FR-REC-02",
    module: "Recipe & BOM",
    priority: "P1 (Critical)",
    title: "Dynamic COGS & Real-Time Margin Analysis",
    description: "Calculates live plate cost using latest weighted-average ingredient purchase prices. Computes gross margin % and alerts owner if margin dips below 65%.",
    acceptance: "Updating an ingredient's cost immediately updates the calculated COGS for all linked menu dishes."
  },
  {
    id: "FR-INV-01",
    module: "Inventory & Waste",
    priority: "P1 (Critical)",
    title: "Real-Time Auto-Depletion & Batch FIFO",
    description: "Decrements stock in real-time as dishes are prepared. Tracks perishable batches using FIFO (First-In, First-Out) with 48-hour expiration alerts.",
    acceptance: "Ingredient stock levels update within 500ms of order settlement."
  },
  {
    id: "FR-INV-02",
    module: "Inventory & Waste",
    priority: "P2 (High)",
    title: "Structured Waste & Spoilage Logging",
    description: "Enables chefs to log discarded ingredients with mandatory reason codes: Expired, Burnt/Kitchen Error, Dropped/Damaged, or Customer Return.",
    acceptance: "Generates weekly food waste dollar loss summary broken down by reason."
  },
  {
    id: "FR-FIN-01",
    module: "Cash & Financials",
    priority: "P1 (Critical)",
    title: "Blind Cash Register Shift Closing",
    description: "Cashier inputs counted cash without seeing expected system totals. System calculates overage or shortage and flags variances exceeding $5.00 for manager review.",
    acceptance: "Register shift cannot be closed without mandatory blind count entry."
  },
  {
    id: "FR-FIN-02",
    module: "Cash & Financials",
    priority: "P1 (Critical)",
    title: "Automated End-of-Day Z-Report",
    description: "Compiles gross revenue, tax collected (SST 6%), service charge (10%), discounts, refunds, payment method breakdown, and net profit estimate.",
    acceptance: "Z-Report generates in < 3 seconds with PDF export and print formatting."
  },
  {
    id: "FR-STF-01",
    module: "Staff & Attendance",
    priority: "P2 (High)",
    title: "4-Digit PIN Attendance & Overtime Tracker",
    description: "Staff clock-in and out on the POS touch terminal using secure PIN codes. Tracks shift hours, breaks, and overtime automatically.",
    acceptance: "Managers can export weekly timesheets formatted for payroll in one click."
  },
  {
    id: "FR-CRM-01",
    module: "CRM & Loyalty",
    priority: "P2 (High)",
    title: "Phone-Number Member Lookup & Loyalty Points",
    description: "Instant customer lookup at POS via mobile phone number. Points awarded automatically per dollar spent with tier progression (Bronze, Silver, Gold).",
    acceptance: "Member profile, point balance, and favorite items display within 1 second of phone lookup."
  },
  {
    id: "FR-BI-01",
    module: "Analytics & BI",
    priority: "P2 (High)",
    title: "Menu Engineering Matrix (BCG / Kasavana-Smith)",
    description: "Categorizes all menu items into Stars (High Profit, High Sales), Plowhorses (Low Profit, High Sales), Puzzles (High Profit, Low Sales), and Dogs (Low Profit, Low Sales).",
    acceptance: "Interactive scatter plot matrix visually updates based on selected date range."
  }
];

export const databaseTables = [
  {
    name: "users",
    category: "Auth & Tenancy",
    purpose: "Staff accounts with role-based access control and 4-digit POS PINs.",
    columns: ["id (UUID PK)", "email", "password_hash", "full_name", "role (ENUM)", "pin_code", "is_active", "created_at"]
  },
  {
    name: "outlets",
    category: "Auth & Tenancy",
    purpose: "Store branches, tax rates, service charge rates, and currency config.",
    columns: ["id (UUID PK)", "name", "code (UNIQUE)", "address", "tax_rate", "service_charge_rate", "currency", "is_central_kitchen"]
  },
  {
    name: "dining_tables",
    category: "Floor Plan",
    purpose: "Physical tables with 2D coordinate positions and real-time occupancy status.",
    columns: ["id (UUID PK)", "outlet_id (FK)", "table_number", "zone", "seating_capacity", "pos_x", "pos_y", "status (ENUM)"]
  },
  {
    name: "menu_items",
    category: "Menu & BOM",
    purpose: "Dishes and drinks sold to customers with calculated COGS and target margins.",
    columns: ["id (UUID PK)", "category_id (FK)", "name", "code", "selling_price", "calculated_cogs", "gross_margin_pct", "kitchen_station"]
  },
  {
    name: "ingredients",
    category: "Inventory",
    purpose: "Raw materials and packaging items with stock levels, par limits, and costs.",
    columns: ["id (UUID PK)", "name", "sku", "category", "purchase_unit", "recipe_unit", "conversion_factor", "cost_per_recipe_unit", "current_stock", "min_par_level"]
  },
  {
    name: "recipes_bom",
    category: "Menu & BOM",
    purpose: "Bill of Materials linking menu items to exact required ingredient quantities.",
    columns: ["id (UUID PK)", "menu_item_id (FK)", "ingredient_id (FK)", "quantity_required", "created_at"]
  },
  {
    name: "inventory_batches",
    category: "Inventory",
    purpose: "Perishable stock lot tracking with FIFO rotation and expiry dates.",
    columns: ["id (UUID PK)", "ingredient_id (FK)", "outlet_id (FK)", "batch_number", "initial_quantity", "remaining_quantity", "expiry_date"]
  },
  {
    name: "orders",
    category: "POS & Sales",
    purpose: "Customer transaction headers with totals, taxes, discounts, and timestamps.",
    columns: ["id (UUID PK)", "order_number", "outlet_id (FK)", "table_id (FK)", "order_type", "status", "subtotal", "tax_amount", "service_charge", "total_amount", "total_cogs"]
  },
  {
    name: "order_items",
    category: "POS & Sales",
    purpose: "Itemized lines for each dish ordered including modifiers and kitchen status.",
    columns: ["id (UUID PK)", "order_id (FK)", "menu_item_id (FK)", "item_name", "unit_price", "quantity", "subtotal", "kitchen_status"]
  },
  {
    name: "payments",
    category: "POS & Sales",
    purpose: "Financial tenders covering orders (cash, cards, e-wallets, split tenders).",
    columns: ["id (UUID PK)", "order_id (FK)", "method (ENUM)", "amount", "tendered_amount", "change_given", "transaction_reference", "paid_at"]
  },
  {
    name: "cash_registers",
    category: "Financials",
    purpose: "Shift cash balances, blind count inputs, and variance reconciliation.",
    columns: ["id (UUID PK)", "outlet_id (FK)", "opened_by (FK)", "closed_by (FK)", "opening_float", "expected_cash", "actual_cash_counted", "cash_variance"]
  },
  {
    name: "wastage_logs",
    category: "Inventory",
    purpose: "Audit logs of discarded ingredients with reason codes and dollar cost impact.",
    columns: ["id (UUID PK)", "outlet_id (FK)", "ingredient_id (FK)", "quantity", "unit", "total_cost", "reason_code", "logged_by (FK)"]
  }
];

export const riskMatrix = [
  {
    risk: "Outlet Internet Disconnection",
    impact: "Critical",
    likelihood: "High",
    mitigation: "Offline-first IndexedDB architecture. POS queues orders locally, prints tickets over local LAN Wi-Fi to ESC/POS printers, and syncs to PostgreSQL once reconnected."
  },
  {
    risk: "High Kitchen Staff Turnover",
    impact: "High",
    likelihood: "High",
    mitigation: "Large touch buttons, visual picture icons, color-coded KDS timers, and minimal training requirement (under 15 minutes onboarding)."
  },
  {
    risk: "Kitchen Thermal Printer Jam",
    impact: "High",
    likelihood: "Medium",
    mitigation: "Digital KDS screens act as failover source of truth. Dual-route capability allows re-printing to bar printer if kitchen printer fails."
  },
  {
    risk: "Cashier Theft & Drawer Discrepancy",
    impact: "High",
    likelihood: "Medium",
    mitigation: "Blind shift counting at closing (cashier cannot see expected drawer amount) plus manager PIN required for all voids and drawer manual open commands."
  },
  {
    risk: "Ingredient Recipe Unit Mismatch",
    impact: "Medium",
    likelihood: "Medium",
    mitigation: "Automated conversion engine (e.g. 1 kg = 1000 g). Built-in sanity check flags warning if dish ingredient cost exceeds retail price."
  }
];
