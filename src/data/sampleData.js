export const menuItems = [
  { id: 1, name: 'Butter Chicken', category: 'Main Course', price: 320, veg: false, available: true },
  { id: 2, name: 'Paneer Tikka', category: 'Starters', price: 220, veg: true, available: true },
  { id: 3, name: 'Dal Makhani', category: 'Main Course', price: 180, veg: true, available: true },
  { id: 4, name: 'Chicken Biryani', category: 'Biryani', price: 280, veg: false, available: true },
  { id: 5, name: 'Veg Biryani', category: 'Biryani', price: 200, veg: true, available: false },
  { id: 6, name: 'Gulab Jamun', category: 'Desserts', price: 80, veg: true, available: true },
  { id: 7, name: 'Masala Dosa', category: 'South Indian', price: 120, veg: true, available: true },
  { id: 8, name: 'Fish Fry', category: 'Starters', price: 260, veg: false, available: true },
  { id: 9, name: 'Naan', category: 'Breads', price: 40, veg: true, available: true },
  { id: 10, name: 'Garlic Naan', category: 'Breads', price: 60, veg: true, available: true },
  { id: 11, name: 'Raita', category: 'Sides', price: 50, veg: true, available: true },
  { id: 12, name: 'Mango Lassi', category: 'Beverages', price: 90, veg: true, available: true },
]

export const tables = [
  { id: 1, name: 'T1', seats: 2, status: 'available' },
  { id: 2, name: 'T2', seats: 4, status: 'occupied' },
  { id: 3, name: 'T3', seats: 4, status: 'occupied' },
  { id: 4, name: 'T4', seats: 6, status: 'available' },
  { id: 5, name: 'T5', seats: 2, status: 'reserved' },
  { id: 6, name: 'T6', seats: 8, status: 'available' },
  { id: 7, name: 'T7', seats: 4, status: 'occupied' },
  { id: 8, name: 'T8', seats: 2, status: 'available' },
  { id: 9, name: 'T9', seats: 6, status: 'reserved' },
  { id: 10, name: 'T10', seats: 4, status: 'available' },
]

export const orders = [
  {
    id: 'ORD-001', table: 'T2', status: 'preparing', time: '12:30 PM',
    items: [
      { name: 'Butter Chicken', qty: 1, price: 320 },
      { name: 'Naan', qty: 2, price: 40 },
      { name: 'Mango Lassi', qty: 2, price: 90 },
    ],
  },
  {
    id: 'ORD-002', table: 'T3', status: 'served', time: '12:45 PM',
    items: [
      { name: 'Paneer Tikka', qty: 1, price: 220 },
      { name: 'Dal Makhani', qty: 1, price: 180 },
      { name: 'Garlic Naan', qty: 3, price: 60 },
    ],
  },
  {
    id: 'ORD-003', table: 'T7', status: 'new', time: '1:10 PM',
    items: [
      { name: 'Chicken Biryani', qty: 2, price: 280 },
      { name: 'Raita', qty: 2, price: 50 },
    ],
  },
]

export const categories = ['All', 'Starters', 'Main Course', 'Biryani', 'South Indian', 'Breads', 'Sides', 'Desserts', 'Beverages']
