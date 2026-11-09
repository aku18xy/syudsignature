# Software Requirements Specification (SRS)
## Syud Signature F&B Business Management System (BMS)
**Document Version:** 1.0.0  
**Standard:** IEEE Std 830-1998 Conforming  
**Prepared For:** F&B SME Business Owners & Operations Teams  
**Target Platform:** Modern Web Application (React / Next.js, Node.js/Go API, PostgreSQL / Supabase, Vercel)  
**Date:** November 2026

---

## Table of Contents
1. [Introduction](#1-introduction)
   - 1.1 Purpose
   - 1.2 Document Conventions
   - 1.3 Intended Audience & Reading Suggestions
   - 1.4 Project Scope
   - 1.5 References & Standards
2. [Overall Description](#2-overall-description)
   - 2.1 Product Perspective
   - 2.2 Product Features & Functional Hierarchy
   - 2.3 User Classes & Characteristics
   - 2.4 Operating Environment
   - 2.5 Design & Implementation Constraints
   - 2.6 User Documentation
   - 2.7 Assumptions & Dependencies
3. [System Features & Functional Requirements](#3-system-features--functional-requirements)
   - 3.1 Point of Sale (POS) & Multi-Channel Order Engine
   - 3.2 Kitchen Display System (KDS) & Order Routing
   - 3.3 Menu Engineering, Recipe Management & Bill of Materials (BOM)
   - 3.4 Inventory Management, Batch Tracking & Waste Control
   - 3.5 Purchasing & Supplier Management
   - 3.6 Staff Scheduling, Time Attendance & Shift Payroll
   - 3.7 Customer Relationship Management (CRM) & Loyalty Program
   - 3.8 Financial Accounting, Cash Control & Tax Management
   - 3.9 Multi-Outlet Central Kitchen & Warehouse Operations
   - 3.10 Business Intelligence, Analytics & Demand Forecasting
4. [External Interface Requirements](#4-external-interface-requirements)
   - 4.1 User Interfaces (UI/UX)
   - 4.2 Hardware Interfaces (ESC/POS Printers, Cash Drawers, Scanners)
   - 4.3 Software & API Interfaces (Payment Gateways, Aggregators, Accounting)
   - 4.4 Communications Interfaces (WebSockets, Webhooks)
5. [Non-Functional Requirements (NFR)](#5-non-functional-requirements-nfr)
   - 5.1 Performance Requirements
   - 5.2 Safety & Data Integrity Requirements
   - 5.3 Security & Role-Based Access Control (RBAC)
   - 5.4 Software Quality Attributes (Reliability, Availability, Maintainability)
   - 5.5 Offline Resiliency Requirements
6. [Appendix: Glossary & Acronyms](#6-appendix-glossary--acronyms)

---

## 1. Introduction

### 1.1 Purpose
This document specifies the software requirements for the **Syud Signature F&B Business Management System (BMS)**. The system is an end-to-end cloud-native enterprise resource planning (ERP) and operations execution platform tailored specifically for small-to-medium enterprise (SME) food & beverage businesses (cafés, casual dining restaurants, fast-casual chains, cloud kitchens, and bakery bistros).

### 1.2 Document Conventions
- **MUST / SHALL**: Mandatory requirement.
- **SHOULD**: High priority recommendation.
- **MAY**: Optional or nice-to-have extension.
- **Priority Ratings**:
  - `[P1] Critical / Core MVP`: Indispensable for day-to-day outlet operations.
  - `[P2] Major / High Value`: Crucial for profitability, cost control, and scaling.
  - `[P3] Enhancement`: Advanced automation, AI forecasting, and deep integrations.

### 1.3 Intended Audience & Reading Suggestions
- **Business Owners / General Managers**: Sections 1, 2, and 3.8 - 3.10.
- **Restaurant Managers & Kitchen Supervisors**: Sections 3.1 - 3.6.
- **Software Engineers & Solution Architects**: Sections 3, 4, and 5.
- **QA & Test Engineers**: Functional acceptance criteria throughout Section 3 and Section 5.

### 1.4 Project Scope
The Syud Signature BMS addresses the core friction points faced by F&B SMEs:
1. High food wastage due to untracked recipe consumption and unmonitored ingredient shelf lives.
2. Fragmented systems (isolated POS, spreadsheets for inventory, manual paper clock-in, detached delivery tablets).
3. Inaccurate Cost of Goods Sold (COGS) visibility that erodes profit margins.
4. Cash leakage during shift handovers and unrecorded complimentary/void meals.
5. Inability to seamlessly scale from a single outlet to multi-outlet or central kitchen model.

The platform provides a unified web portal accessible by owners and back-office staff via desktop/tablet, high-speed touch POS terminals for front-of-house staff, and real-time screen displays for kitchen personnel.

---

## 2. Overall Description

### 2.1 Product Perspective
Syud Signature BMS operates as a multi-tenant or single-tenant cloud SaaS deployment hosted on **Vercel** (Frontend / Edge Middleware) with backend services hosted on managed container/serverless compute, connecting to a high-availability **PostgreSQL** relational database.

```
       +-------------------------------------------------------------+
       |                     Syud Signature BMS                       |
       +-------------------------------------------------------------+
                                      |
         +----------------------------+----------------------------+
         |                            |                            |
  [Front of House]             [Back of House]             [Back Office]
  - Tablet/Desktop POS         - Kitchen Display (KDS)     - Recipe & BOM Costing
  - Table Floor Plan QR        - Bar Order Station         - Inventory & Procurement
  - Customer Loyalty Display   - Dispatch / Runner Station - Staff Roster & Shifts
  - Mobile Waiter Order App                                - P&L & Analytics
```

### 2.2 Product Features & Functional Hierarchy
The system comprises 10 interconnected operational pillars:
1. **Omnichannel Order & POS Engine**: Dine-in table management, takeaway, delivery aggregation.
2. **Kitchen Production Control (KDS)**: Ticket prioritization, course firing, bump bars.
3. **Recipe & BOM Engineering**: Live ingredient-level unit costing, allergen matrix.
4. **Perishable Inventory & Batch FIFO**: Real-time auto-deductions, wastage logs, transfer slips.
5. **Smart Procurement**: Automated reorder point warnings, Purchase Order generation.
6. **Workforce Management**: Visual roster scheduling, GPS/PIN clock-in, payroll preparation.
7. **CRM & Loyalty Engine**: Tiered points, birthday perks, RFM customer segmentation.
8. **Cash Management & Financial Audit**: Shift register balancing, petty cash, tax breakdowns.
9. **Central Kitchen & Multi-Branch Hub**: Inter-store requests, batch production tracking.
10. **Executive Analytics Dashboard**: Gross profit per dish, peak hour heatmaps, AI sales forecast.

### 2.3 User Classes & Characteristics
| User Role | Responsibilities | Technical Proficiency | Device Used |
|---|---|---|---|
| **Superadmin (Owner)** | Business strategy, financial audit, master catalog, branch creation | Moderate | Desktop, Laptop, Mobile |
| **Branch Manager** | Daily opening/closing, stock auditing, shift rosters, void approvals | Moderate | Desktop, POS Tablet |
| **Cashier / Floor Staff** | Order punching, bill splitting, cash handling, table assignments | Basic | Touch POS, Handheld Tablet |
| **Head Chef / Kitchen Staff** | Preparing dishes, bumping KDS tickets, logging kitchen wastage | Basic to Minimal | Touchscreen KDS, Bump Bar |
| **Central Kitchen Cook** | Mass production of prep ingredients, packaging, dispatching | Basic | Tablet / Wall Screen |
| **Accountant / Auditor** | P&L reconciliation, tax reports, vendor invoices | Advanced | Desktop / Excel Exporter |

### 2.4 Operating Environment
- **Client Browsers**: Google Chrome 110+, Safari 16+, Edge 110+, Firefox 115+.
- **Hardware Compatibility**: Standard iPad / Android Tablets (10.1" minimum recommended for POS/KDS), Windows / Ubuntu Touch terminals.
- **Peripherals**: EPSON / Star Micronics ESC/POS 80mm Network/USB Thermal Printers, RJ11 24V Cash Drawers, 2D Barcode/QR Scanners.

---

## 3. System Features & Functional Requirements

### 3.1 Point of Sale (POS) & Multi-Channel Order Engine [P1]
- **FR-POS-01 (Table Floor Plan)**: Graphical drag-and-drop table layout per outlet zone (Indoor, Outdoor, Bar, Private Room). Real-time visual status: Free (Green), Seated/Ordered (Yellow), Billed (Blue), Dirty/Needs Cleaning (Red).
- **FR-POS-02 (Order Processing)**: Touch-optimized catalog search, barcode scanning, category tabs, and favorites. Support for dish modifiers (e.g., No Onion, Extra Shot, Sugar 50%).
- **FR-POS-03 (Bill Operations)**: Split bill by item, split bill evenly by guest count, merge bills across multiple tables, transfer bill to another table.
- **FR-POS-04 (Discounts & Vouchers)**: Percentage discount, fixed amount discount, promotion code validation, and staff authorization for discounts exceeding defined thresholds.
- **FR-POS-05 (Payment Methods)**: Multi-tender support (Cash, Visa/Mastercard, DuitNow / QRIS / PromptPay QR, GrabPay, Gift Card, Room Charge).
- **FR-POS-06 (Offline Order Queue)**: Ability to take orders and print receipts when local internet fails, automatically syncing back to the cloud upon connection recovery.

### 3.2 Kitchen Display System (KDS) & Order Routing [P1]
- **FR-KDS-01 (Station Routing)**: Routing items automatically based on preparation department (e.g., Beverage items to Bar KDS, Grilled items to Hot Kitchen KDS, Salads to Cold Station KDS).
- **FR-KDS-02 (Color-Coded Aging Timer)**: Visual indicators for ticket age: Green (< 10 mins), Yellow (10–20 mins), Red Flashing (> 20 mins overdue).
- **FR-KDS-03 (Course Firing)**: Hold and Fire capabilities for appetizers, mains, and desserts.
- **FR-KDS-04 (Item-level & Ticket-level Bump)**: Mark individual items as prepared or complete the entire order with physical bump bar or touchscreen tap.

### 3.3 Menu Engineering, Recipe Management & Bill of Materials (BOM) [P1]
- **FR-REC-01 (Bill of Materials)**: Each menu item links to raw ingredients with specified standard quantities and units (e.g., 1 Cappuccino = 18g Espresso Beans, 220ml Fresh Milk, 1 Paper Cup, 1 Cup Lid).
- **FR-REC-02 (Dynamic COGS Calculation)**: Real-time unit cost calculation based on current weighted-average supplier purchase prices. Automatic gross margin % indicator.
- **FR-REC-03 (Prep Recipes / Sub-assemblies)**: Support multi-tiered sub-recipes (e.g., Signature Bolognese Sauce prepared in batches of 5kg used across 3 distinct pasta dishes).
- **FR-REC-04 (Allergen & Dietary Flags)**: Tagging of Halal, Vegetarian, Vegan, Gluten-Free, Nut Allergens, Dairy Allergens for staff reference and customer QR menus.

### 3.4 Inventory Management, Batch Tracking & Waste Control [P1]
- **FR-INV-01 (Real-Time Auto-Depletion)**: Automatic decrement of raw ingredients based on BOM whenever an order is marked as paid or fired.
- **FR-INV-02 (Batch & Expiry Date Tracking)**: Track perishable batches with FIFO (First-In, First-Out) logic, alerting staff 48 hours before ingredient expiry.
- **FR-INV-03 (Stock Counting & Variance Auditing)**: Mobile-friendly physical stock take workflow with variance reports showing theoretical vs actual stock and dollar discrepancy.
- **FR-INV-04 (Waste & Spoilage Logging)**: Structured logging of discarded food with mandatory categorization (Expired, Burnt/Kitchen Error, Customer Return, Tasting/R&D).

### 3.5 Purchasing & Supplier Management [P2]
- **FR-PUR-01 (Low Stock Threshold Alerts)**: Automatic dashboard notification and email/SMS alerts when ingredients fall below Minimum Par Levels.
- **FR-PUR-02 (Purchase Order Workflow)**: One-click generation of PO based on suggested reorder quantities. Direct PDF / WhatsApp export to suppliers.
- **FR-PUR-03 (Goods Received Note - GRN)**: Three-way matching between PO, Delivery Order (DO), and Vendor Invoice with price variance detection.

### 3.6 Staff Scheduling, Time Attendance & Shift Payroll [P2]
- **FR-STF-01 (Visual Roster Planner)**: Weekly drag-and-drop shift planner with labor cost budgeting vs projected sales forecast.
- **FR-STF-02 (Secure Clock-In/Out)**: Touch terminal 4-digit PIN clock-in with optional selfie photo capture or GPS geofence on mobile.
- **FR-STF-03 (Shift Payroll Preparation)**: Calculation of normal hours, overtime (OT), rest day penalties, and tips/service charge distribution pool.

### 3.7 Customer Relationship Management (CRM) & Loyalty [P2]
- **FR-CRM-01 (Member Identification)**: Quick customer lookup at POS via phone number, QR code, or Apple/Google Wallet pass.
- **FR-CRM-02 (Tiered Cashback / Points)**: Configurable earn/burn rules (e.g., 100 points = $10 discount). Automated tier upgrades (Bronze, Silver, Gold).
- **FR-CRM-03 (Customer Analytics)**: RFM (Recency, Frequency, Monetary) segmentation to identify VIPs, at-risk churned customers, and regular diners.

### 3.8 Financial Accounting, Cash Control & Tax Management [P1]
- **FR-FIN-01 (Register Shift Open/Close)**: Morning opening float input, mid-day cash drop logging, and blind cash count at closing with automatic over/short variance detection.
- **FR-FIN-02 (End-of-Day Z-Report)**: Automated reconciliation report summarizing gross sales, discounts, refunds, voids, tax collected, service charge, and net cash.
- **FR-FIN-03 (Tax & Surcharge Configuration)**: Customizable sales tax rates (e.g., 6% SST, 8% VAT/GST) and restaurant service charge (e.g., 10%) with compound or exclusive calculations.

### 3.9 Multi-Outlet Central Kitchen & Warehouse Operations [P3]
- **FR-CK-01 (Inter-Branch Transfer)**: Store-to-store or Central Kitchen-to-store stock requisition, dispatch note, and receipt confirmation.
- **FR-CK-02 (Production Batch Order)**: Work orders for central kitchen prep cooks to produce bulk sauces, marinated meats, and bakery doughs with batch lot numbers.

### 3.10 Business Intelligence, Analytics & Demand Forecasting [P3]
- **FR-BI-01 (Menu Engineering Matrix)**: Categorization of menu items into Stars (High Profit, High Popularity), Plowhorses (Low Profit, High Popularity), Puzzles (High Profit, Low Popularity), and Dogs (Low Profit, Low Popularity).
- **FR-BI-02 (Hourly Heatmaps)**: Sales and footfall distribution heatmaps to optimize opening hours and kitchen prep schedules.
- **FR-BI-03 (Predictive Ordering)**: Demand forecast suggesting next week's ingredient ordering quantities based on historical trends and calendar events.

---

## 4. External Interface Requirements

### 4.1 User Interfaces
- Responsive design tailored for 1080p POS terminals, 1200x800 kitchen tablets, and mobile smartphones.
- High-contrast Dark Mode optimized for low-light dining ambiance and hot kitchen environments.
- Max 3-touch order punch cycle for top 20 popular items to guarantee fast queue turnover.

### 4.2 Hardware Interfaces
- **Receipt Printers**: Raw text ESC/POS commands via TCP/IP Socket (Port 9100) or WebHID USB.
- **Cash Drawer**: Pulse signal via RJ11 connector connected through receipt printer.
- **Customer Facing Display (CFD)**: Secondary HDMI or WebSocket mirror display showing live itemized cart and payment QR codes.

### 4.3 Software & API Interfaces
- **Payment Gateways**: Stripe Terminal, Adyen, local QR payment switches.
- **Accounting Bridges**: Export to Xero, QuickBooks Online, AutoCount via automated webhook or CSV format.
- **Delivery Aggregators**: Open API endpoints for GrabFood, Foodpanda, and Deliveroo order ingestion.

---

## 5. Non-Functional Requirements (NFR)

### 5.1 Performance Requirements
- **NFR-PERF-01**: POS order submission response time shall not exceed 300ms under standard 4G/fiber connections.
- **NFR-PERF-02**: KDS new order arrival latency shall be under 500ms via WebSocket or SSE.
- **NFR-PERF-03**: End-of-Day Z-Report generation shall take under 3.0 seconds for an outlet with up to 2,000 daily orders.

### 5.2 Security & Role-Based Access Control (RBAC)
- **NFR-SEC-01**: Sensitive actions (Price Override, Order Void after preparation, Bill Discount > 20%, Cash Drawer Manual Open) require Manager PIN authorization.
- **NFR-SEC-02**: All network traffic encrypted with TLS 1.3. User passwords hashed with bcrypt (minimum cost factor 12) or Argon2id.
- **NFR-SEC-03**: Complete audit log recording timestamp, actor, IP address, and payload for every financial transaction and inventory adjustment.

### 5.3 Reliability & Availability
- **NFR-REL-01**: 99.9% uptime during operational outlet hours (06:00 to 02:00 local time).
- **NFR-REL-02**: Local IndexedDB cache on POS client enabling uninterrupted order taking for up to 6 hours during full cloud connection outage.

---

## 6. Appendix: Glossary & Acronyms
- **BMS**: Business Management System
- **BOM**: Bill of Materials (Recipe breakdown of raw ingredients)
- **COGS**: Cost of Goods Sold
- **ESC/POS**: Standard printer command language developed by Epson
- **FIFO**: First-In, First-Out inventory method
- **KDS**: Kitchen Display System
- **Par Level**: Minimum quantity of inventory required on hand to meet customer demand before next delivery
- **POS**: Point of Sale
- **Z-Report**: Final end-of-day financial reconciliation report that resets daily register counters
