---
name: PetPooja Replica
overview: Build a full-featured PetPooja restaurant POS replica using React + Vite + Tailwind CSS with demo login, mock data, and all core modules working end-to-end.
todos:
  - id: setup
    content: Initialize Vite + React project, install Tailwind CSS, Zustand, React Router, Recharts, Lucide React
    status: pending
  - id: mock-data
    content: "Create all mock data files: menu, orders, tables, staff, inventory, customers"
    status: pending
  - id: auth-store
    content: "Create Zustand stores: authStore, orderStore, cartStore"
    status: pending
  - id: layout
    content: Build Sidebar, Header, and main App layout with React Router routes
    status: pending
  - id: login
    content: Build Login page with demo credentials
    status: pending
  - id: dashboard
    content: Build Dashboard with revenue cards, charts, recent orders
    status: pending
  - id: pos
    content: "Build POS page: category tabs, item grid, cart panel, order types, invoice modal, KOT modal"
    status: pending
  - id: tables
    content: "Build Tables page: visual floor plan, table status, active order view"
    status: pending
  - id: orders
    content: "Build Orders page: order list, filters, status updates"
    status: pending
  - id: kot
    content: Build KOT (Kitchen Display) page
    status: pending
  - id: menu-mgmt
    content: Build Menu Management page with add/edit/delete
    status: pending
  - id: inventory
    content: Build Inventory page with stock levels and alerts
    status: pending
  - id: reports
    content: Build Reports page with charts
    status: pending
  - id: staff-customers
    content: Build Staff and Customers pages
    status: pending
  - id: settings
    content: Build Settings page
    status: pending
isProject: false
---

# PetPooja Replica - Full Restaurant POS

## Tech Stack

- **React + Vite** - fast dev setup
- **Tailwind CSS** - utility-first styling
- **React Router v6** - page navigation
- **Zustand** - lightweight global state (cart, orders, auth)
- **Recharts** - dashboard analytics charts
- **Lucide React** - icons
- All mock data as static JS files (no backend needed)

## App Structure

```
src/
  pages/
    Login.jsx
    Dashboard.jsx
    POS.jsx           ← billing/order-taking
    Tables.jsx        ← table management
    Menu.jsx          ← menu items CRUD
    Orders.jsx        ← order history
    KOT.jsx           ← kitchen order tickets
    Inventory.jsx
    Reports.jsx
    Staff.jsx
    Customers.jsx
    Settings.jsx
  components/
    Sidebar.jsx
    Header.jsx
    CartPanel.jsx
    InvoiceModal.jsx
    KOTModal.jsx
  store/
    authStore.js
    orderStore.js
    cartStore.js
  data/
    mockMenu.js
    mockOrders.js
    mockTables.js
    mockStaff.js
    mockInventory.js
    mockCustomers.js
```

## Key Features & Mock Data

### Login

- Demo credentials: `admin@petpooja.com` / `demo123`
- Role: Admin

### Dashboard

- Revenue cards (Today / Week / Month)
- Live orders count, table occupancy
- Bar chart: sales by hour
- Line chart: weekly revenue
- Top selling items list
- Recent orders feed

### POS (Point of Sale) - Core Module

- Category tabs (Starters, Main Course, Beverages, Desserts, etc.)
- Item grid with image, name, price
- Cart panel with qty controls
- Order type selector: Dine-in / Takeaway / Delivery
- Table selector for dine-in
- Apply discounts & taxes (GST 5%/12%)
- Print KOT button
- Generate Invoice (modal with bill breakdown)
- Payment: Cash / Card / UPI

### Table Management

- Visual floor plan grid (15+ tables)
- Status: Available (green) / Occupied (red) / Reserved (yellow)
- Click table → see active order
- Add/edit table layout

### Orders

- List of all orders with status: Pending / Preparing / Ready / Completed / Cancelled
- Filter by date, type, status
- Click to expand → order details + invoice reprint

### KOT (Kitchen Display)

- Cards per table showing ordered items
- Mark items as prepared
- Live "timer since order placed"

### Menu Management

- Category + item grid
- Add/Edit/Delete items (mock CRUD via state)
- Toggle item availability
- Set prices, descriptions

### Inventory

- Stock items with quantity & low-stock alerts
- Add stock entries

### Reports

- Daily sales summary
- Item-wise sales
- Staff performance
- Charts via Recharts

### Staff & Customers

- Staff list with roles (Waiter, Chef, Cashier)
- Customer list with visit history

## Design Direction

- **PetPooja's signature orange** (`#FF6B35`) as primary accent
- Clean, dense utility dashboard aesthetic (information-first)
- White/light gray backgrounds, card-based layout
- Sidebar navigation with icons + labels
- Mobile-responsive where possible

## Files to Create

- `package.json` with all dependencies
- `vite.config.js`
- `tailwind.config.js`
- `src/main.jsx`, `src/App.jsx`
- All pages, components, store, data files listed above

