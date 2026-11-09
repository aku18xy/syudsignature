# Database Schema Specification
## Syud Signature F&B Business Management System (BMS)
**Database Engine:** PostgreSQL 15+ / Supabase  
**Document Revision:** 1.0.0  

---

## 1. Entity-Relationship Overview

```
                      +---------------+
                      |    outlets    |
                      +-------+-------+
                              |
         +--------------------+--------------------+
         |                    |                    |
+--------v--------+  +--------v--------+  +--------v--------+
|  dining_tables  |  |  cash_registers |  |   staff_shifts  |
+--------+--------+  +--------+--------+  +-----------------+
         |                    |
         |         +----------+----------+
         |         |                     |
+--------v---------v-+             +-----v------+
|       orders       |             |  expenses  |
+--------+-----------+             +------------+
         |
    +----+----+--------------------+
    |         |                    |
+---v----+ +--v---------------+ +--v---------+
| payments | order_items       | | kds_tickets|
+--------+ +--+---------------+ +------------+
              |
              | (links to)
              v
       +---------------+           +-------------------+
       |  menu_items   |<--------->|   recipes_bom     |
       +-------+-------+           +---------+---------+
               |                             |
               |                             v
       +-------v-------+             +-----------------+
       | categories    |             |   ingredients   |
       +---------------+             +---------+-------+
                                               |
                                     +---------v---------+
                                     | inventory_batches |
                                     +---------+---------+
                                               |
                                     +---------v---------+
                                     |  stock_movements  |
                                     +-------------------+
```

---

## 2. PostgreSQL DDL Specification

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- 1. AUTH & TENANCY
-- ============================================================================

CREATE TYPE user_role AS ENUM ('superadmin', 'owner', 'branch_manager', 'cashier', 'chef', 'waiter', 'accountant');

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(30),
    role user_role NOT NULL DEFAULT 'waiter',
    pin_code VARCHAR(6), -- 4 or 6 digit PIN for quick POS switch
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE outlets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    code VARCHAR(20) UNIQUE NOT NULL, -- e.g., 'OUT-01'
    address TEXT,
    phone VARCHAR(30),
    tax_rate NUMERIC(5,2) NOT NULL DEFAULT 6.00, -- SST/GST rate
    service_charge_rate NUMERIC(5,2) NOT NULL DEFAULT 10.00,
    currency VARCHAR(10) NOT NULL DEFAULT 'MYR',
    is_central_kitchen BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 2. FLOOR PLAN & TABLES
-- ============================================================================

CREATE TYPE table_status AS ENUM ('available', 'occupied', 'billed', 'reserved', 'cleaning');

CREATE TABLE dining_tables (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    outlet_id UUID NOT NULL REFERENCES outlets(id) ON DELETE CASCADE,
    table_number VARCHAR(20) NOT NULL,
    zone VARCHAR(50) NOT NULL DEFAULT 'Main Dining', -- e.g. Indoor, Patio, Bar
    seating_capacity INT NOT NULL DEFAULT 4,
    pos_x INT NOT NULL DEFAULT 0, -- For graphical drag-drop floor plan
    pos_y INT NOT NULL DEFAULT 0,
    status table_status NOT NULL DEFAULT 'available',
    current_order_id UUID,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(outlet_id, table_number)
);

-- ============================================================================
-- 3. INVENTORY & INGREDIENT MASTER
-- ============================================================================

CREATE TABLE suppliers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(150) NOT NULL,
    contact_person VARCHAR(100),
    phone VARCHAR(50),
    email VARCHAR(100),
    payment_terms_days INT DEFAULT 30,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE ingredients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    outlet_id UUID REFERENCES outlets(id), -- Nullable for global items
    name VARCHAR(150) NOT NULL,
    sku VARCHAR(50) UNIQUE,
    category VARCHAR(50) NOT NULL, -- e.g., Dairy, Meat, Produce, Packaging
    storage_type VARCHAR(30) DEFAULT 'dry', -- dry, chilled, frozen
    purchase_unit VARCHAR(20) NOT NULL, -- e.g., 'kg', 'box', 'litre'
    recipe_unit VARCHAR(20) NOT NULL, -- e.g., 'g', 'ml', 'piece'
    conversion_factor NUMERIC(12,4) NOT NULL DEFAULT 1000.00, -- e.g., 1 kg = 1000 g
    cost_per_recipe_unit NUMERIC(10,4) NOT NULL DEFAULT 0.00, -- dynamic COGS
    min_par_level NUMERIC(10,2) NOT NULL DEFAULT 5.00, -- Low stock trigger
    current_stock NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    default_supplier_id UUID REFERENCES suppliers(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE inventory_batches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ingredient_id UUID NOT NULL REFERENCES ingredients(id) ON DELETE CASCADE,
    outlet_id UUID NOT NULL REFERENCES outlets(id) ON DELETE CASCADE,
    batch_number VARCHAR(50) NOT NULL,
    initial_quantity NUMERIC(10,2) NOT NULL,
    remaining_quantity NUMERIC(10,2) NOT NULL,
    unit_cost NUMERIC(10,4) NOT NULL,
    expiry_date DATE NOT NULL,
    received_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TYPE movement_type AS ENUM ('order_depletion', 'purchase_received', 'waste_loss', 'stock_adjustment', 'transfer_in', 'transfer_out');

CREATE TABLE stock_movements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ingredient_id UUID NOT NULL REFERENCES ingredients(id),
    outlet_id UUID NOT NULL REFERENCES outlets(id),
    type movement_type NOT NULL,
    quantity NUMERIC(10,2) NOT NULL, -- Negative for depletion, positive for replenishment
    cost_impact NUMERIC(10,2) NOT NULL,
    reference_id VARCHAR(100), -- order_id or po_id
    reason TEXT,
    logged_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE wastage_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    outlet_id UUID NOT NULL REFERENCES outlets(id),
    ingredient_id UUID REFERENCES ingredients(id),
    quantity NUMERIC(10,2) NOT NULL,
    unit VARCHAR(20) NOT NULL,
    total_cost NUMERIC(10,2) NOT NULL,
    reason_code VARCHAR(50) NOT NULL, -- 'expired', 'burnt_mistake', 'customer_return', 'spoilage'
    notes TEXT,
    logged_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 4. MENU & RECIPE BILL OF MATERIALS (BOM)
-- ============================================================================

CREATE TABLE menu_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    outlet_id UUID REFERENCES outlets(id),
    name VARCHAR(100) NOT NULL,
    display_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE menu_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID NOT NULL REFERENCES menu_categories(id),
    name VARCHAR(150) NOT NULL,
    code VARCHAR(50) UNIQUE,
    description TEXT,
    selling_price NUMERIC(10,2) NOT NULL,
    calculated_cogs NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    gross_margin_pct NUMERIC(5,2) GENERATED ALWAYS AS (
        CASE WHEN selling_price > 0 THEN ((selling_price - calculated_cogs) / selling_price) * 100 ELSE 0 END
    ) STORED,
    kitchen_station VARCHAR(50) DEFAULT 'Hot Kitchen', -- 'Hot Kitchen', 'Bar', 'Bakery', 'Cold'
    image_url TEXT,
    is_available BOOLEAN NOT NULL DEFAULT true,
    is_taxable BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE recipes_bom (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    menu_item_id UUID NOT NULL REFERENCES menu_items(id) ON DELETE CASCADE,
    ingredient_id UUID NOT NULL REFERENCES ingredients(id) ON DELETE RESTRICT,
    quantity_required NUMERIC(10,4) NOT NULL, -- in recipe_unit (e.g., 180 grams)
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(menu_item_id, ingredient_id)
);

-- ============================================================================
-- 5. ORDERS, POS & PAYMENTS
-- ============================================================================

CREATE TYPE order_type AS ENUM ('dine_in', 'takeaway', 'delivery_grab', 'delivery_foodpanda', 'catering');
CREATE TYPE order_status AS ENUM ('draft', 'sent_to_kitchen', 'completed', 'cancelled', 'refunded');

CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number VARCHAR(50) NOT NULL, -- e.g., 'ORD-20261109-001'
    outlet_id UUID NOT NULL REFERENCES outlets(id),
    table_id UUID REFERENCES dining_tables(id),
    order_type order_type NOT NULL DEFAULT 'dine_in',
    status order_status NOT NULL DEFAULT 'draft',
    guest_count INT NOT NULL DEFAULT 1,
    subtotal NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    discount_amount NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    discount_reason VARCHAR(100),
    service_charge NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    tax_amount NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    total_amount NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    total_cogs NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    customer_id UUID,
    waiter_id UUID REFERENCES users(id),
    cashier_id UUID REFERENCES users(id),
    opened_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    closed_at TIMESTAMPTZ
);

CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    menu_item_id UUID NOT NULL REFERENCES menu_items(id),
    item_name VARCHAR(150) NOT NULL,
    unit_price NUMERIC(10,2) NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    subtotal NUMERIC(10,2) NOT NULL,
    item_cogs NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    special_notes TEXT, -- e.g., "Less spicy, extra ice"
    is_fired_to_kitchen BOOLEAN NOT NULL DEFAULT false,
    kitchen_status VARCHAR(30) DEFAULT 'pending', -- pending, cooking, ready, served
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TYPE payment_method AS ENUM ('cash', 'credit_card', 'debit_card', 'qr_duitnow', 'e_wallet', 'voucher', 'split');

CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES orders(id),
    method payment_method NOT NULL,
    amount NUMERIC(10,2) NOT NULL,
    tendered_amount NUMERIC(10,2), -- for cash change calculation
    change_given NUMERIC(10,2) DEFAULT 0.00,
    transaction_reference VARCHAR(100),
    processed_by UUID NOT NULL REFERENCES users(id),
    paid_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 6. CASH REGISTER SHIFTS & FINANCIALS
-- ============================================================================

CREATE TABLE cash_registers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    outlet_id UUID NOT NULL REFERENCES outlets(id),
    opened_by UUID NOT NULL REFERENCES users(id),
    closed_by UUID REFERENCES users(id),
    opening_float NUMERIC(10,2) NOT NULL DEFAULT 200.00,
    expected_cash NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    actual_cash_counted NUMERIC(10,2),
    cash_variance NUMERIC(10,2) GENERATED ALWAYS AS (actual_cash_counted - expected_cash) STORED,
    total_sales_amount NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    notes TEXT,
    opened_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    closed_at TIMESTAMPTZ
);

CREATE TABLE expenses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    outlet_id UUID NOT NULL REFERENCES outlets(id),
    category VARCHAR(50) NOT NULL, -- Petty Cash, Utilities, Repairs, Daily Ingredients
    amount NUMERIC(10,2) NOT NULL,
    payment_method VARCHAR(30) DEFAULT 'petty_cash',
    receipt_image_url TEXT,
    authorized_by UUID NOT NULL REFERENCES users(id),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 7. CUSTOMERS & LOYALTY
-- ============================================================================

CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    phone_number VARCHAR(30) UNIQUE NOT NULL,
    name VARCHAR(100),
    email VARCHAR(100),
    points_balance INT NOT NULL DEFAULT 0,
    membership_tier VARCHAR(30) NOT NULL DEFAULT 'Bronze', -- Bronze, Silver, Gold, VIP
    total_lifetime_spend NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    visit_count INT NOT NULL DEFAULT 0,
    birth_date DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for lightning fast POS lookups
CREATE INDEX idx_orders_outlet_status ON orders(outlet_id, status);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_recipes_menu_item ON recipes_bom(menu_item_id);
CREATE INDEX idx_ingredients_outlet ON ingredients(outlet_id);
CREATE INDEX idx_stock_movements_ingredient ON stock_movements(ingredient_id);
CREATE INDEX idx_customers_phone ON customers(phone_number);
```
