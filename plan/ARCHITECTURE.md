# System Architecture & Technical Specifications
## Syud Signature F&B Business Management System (BMS)
**Document Revision:** 1.0.0  

---

## 1. High-Level System Topology

```
+-----------------------------------------------------------------------------------------+
|                                    CLIENT TIER                                          |
|                                                                                         |
|  +--------------------+   +--------------------+   +-------------------+                |
|  | Tablet/Desktop POS |   | Kitchen KDS Tablet |   | Back-Office Admin |                |
|  | (React / Dexie DB) |   | (React WebSockets) |   | (React Analytics) |                |
|  +---------+----------+   +---------+----------+   +---------+---------+                |
|            |                        |                        |                          |
+------------|------------------------|------------------------|--------------------------+
             |                        |                        |
             | HTTPS (REST / GraphQL) | WSS (Live Tickets)     | HTTPS (Admin API)
             v                        v                        v
+-----------------------------------------------------------------------------------------+
|                                    VERCEL EDGE & CLOUD                                  |
|                                                                                         |
|  +-----------------------------------------------------------------------------------+  |
|  | Vercel Edge Network / Global CDN (Fast UI Delivery & Dynamic Edge Routing)        |  |
|  +-----------------------------------------------------------------------------------+  |
|  | Serverless API Functions / Microservices                                          |  |
|  |  - Auth & Role-Based Access Control (RBAC Middleware)                             |  |
|  |  - Orders, Payments & Split Billing Engine                                        |  |
|  |  - Real-time Recipe Depletion & Dynamic COGS Engine                               |  |
|  |  - End-of-Day Z-Report Reconciliation Service                                     |  |
|  +-----------------------------------------------------------------------------------+  |
+-----------------------------------------------------------------------------------------+
             |                                                 |
             v                                                 v
+------------------------------------+   +-----------------------------------------------+
|      POSTGRESQL RELATIONAL DB      |   |            THIRD-PARTY INTEGRATIONS           |
|  - Multi-tenant Outlets Ledger     |   |  - Stripe / DuitNow Payment Switch            |
|  - ACID Transactions (Stock FIFO)  |   |  - GrabFood / Foodpanda Webhook Ingestion     |
|  - JSONB for Custom Dish Modifiers |   |  - Xero / QuickBooks Accounting Sync          |
+------------------------------------+   +-----------------------------------------------+
```

---

## 2. Front-of-House Offline Resilience Engine

One of the greatest operational hazards in restaurants is internet instability during peak lunch/dinner rushes. If a cloud-only POS goes down, waiters cannot take orders, kitchen tickets are not printed, and payments stall.

Syud Signature BMS incorporates an **Offline-First Synchronization Architecture**:

```
                       [Order Punched on POS]
                                 |
                                 v
                     [Local IndexedDB Storage]
                                 |
                 +---------------+---------------+
                 |                               |
                 v                               v
    (Internet is Online?)               (Print Thermal Ticket)
     /                 \                 Direct LAN TCP/IP Socket
   YES                  NO               to Kitchen & Bar Printers
    |                    |
    v                    v
[POST to Vercel API]   [Mark as 'pending_sync' in Queue]
[Update PostgreSQL]      |
                         v (Listens for `window.online` event)
                       [Background Sync Worker flushes queue]
```

### Key Technical Mechanisms:
1. **IndexedDB (via Dexie.js)**: All active tables, open tickets, and menu catalogs are replicated locally in the browser's persistent storage.
2. **Local LAN Direct Printing**: Thermal receipt printers receive ESC/POS raw bytes directly over local IP (port 9100) or WebUSB, bypassing the external internet entirely.
3. **Optimistic Locking & Conflict Resolution**: Orders created offline are stamped with deterministic UUIDs and client vector timestamps. The server reconciles sequential orders using order numbers generated per cash register.

---

## 3. Real-Time Kitchen Display System (KDS) Event Protocol

The KDS relies on low-latency bidirectional communication (WebSocket or Supabase Realtime channel per outlet):

- **Channel Topic**: `outlet:{outlet_id}:kds`
- **Events**:
  - `ticket.created`: When cashier/waiter fires an order. Emits audio chime and adds ticket to the rightmost column.
  - `item.status_changed`: When chef toggles an item (e.g., `pending` -> `cooking` -> `ready`).
  - `ticket.bumped`: When the entire ticket is cleared from the display.
  - `ticket.recalled`: Allows kitchen supervisor to restore accidentally bumped tickets.

---

## 4. Hardware Integration Layer

1. **ESC/POS Thermal Printing**:
   - Generates raw ESC/POS byte buffers directly in JavaScript.
   - Supports bolding, double-height headers, QR codes for digital receipts, and cut commands (`GS V 66 0`).
2. **Cash Drawer Kick**:
   - Sends standard pulse command (`ESC p 0 25 250`) to the receipt printer, which triggers the RJ11 solenoid coil to open the cash drawer on cash payments.
3. **Barcode / QR Scanner**:
   - Intercepts rapid keyboard emulation keystrokes (inter-key delay < 50ms) to scan customer loyalty cards and ingredient inventory barcodes.

---

## 5. Security & RBAC Model

The system enforces strict multi-role permission boundaries:

| Permission | Superadmin | Branch Manager | Cashier | Chef | Waiter |
|---|:---:|:---:|:---:|:---:|:---:|
| View Profit & Loss / Margins | YES | NO | NO | NO | NO |
| Edit Menu Selling Price | YES | NO | NO | NO | NO |
| Apply Custom Bill Discount | YES | YES (>20%) | Max 10% | NO | NO |
| Void Fired Order | YES | YES (PIN Req) | NO | NO | NO |
| Open Cash Drawer Manually | YES | YES | With Reason | NO | NO |
| Bump Kitchen Display Ticket | YES | YES | NO | YES | NO |
| View Recipe Ingredients & BOM | YES | YES | NO | YES | NO |
| Perform Physical Stock Count | YES | YES | NO | YES | NO |
