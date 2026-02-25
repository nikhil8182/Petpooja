import { createContext, useContext, useState } from 'react'
import { menuItems as initialMenu, tables as initialTables, orders as initialOrders } from '../data/sampleData'

const AppContext = createContext()

export function AppProvider({ children }) {
  const [menu] = useState(initialMenu)
  const [tables, setTables] = useState(initialTables)
  const [orders, setOrders] = useState(initialOrders)
  const [orderCounter, setOrderCounter] = useState(4) // ORD-001 to 003 already exist

  function placeOrder({ tableId, items }) {
    const table = tables.find((t) => t.id === tableId)
    const orderId = `ORD-${String(orderCounter).padStart(3, '0')}`
    const now = new Date()
    const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })

    const newOrder = {
      id: orderId,
      table: table.name,
      status: 'new',
      time,
      items: items.map((i) => ({ name: i.name, qty: i.qty, price: i.price })),
    }

    setOrders((prev) => [newOrder, ...prev])
    setOrderCounter((c) => c + 1)

    // Mark table as occupied
    setTables((prev) =>
      prev.map((t) => (t.id === tableId ? { ...t, status: 'occupied' } : t))
    )

    return orderId
  }

  function updateOrderStatus(orderId, newStatus) {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    )
  }

  function updateTableStatus(tableId, newStatus) {
    setTables((prev) =>
      prev.map((t) => (t.id === tableId ? { ...t, status: newStatus } : t))
    )
  }

  return (
    <AppContext.Provider value={{ menu, tables, orders, placeOrder, updateOrderStatus, updateTableStatus }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}
