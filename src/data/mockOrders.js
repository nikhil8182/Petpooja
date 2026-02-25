const today = new Date();
const formatDate = (date) => date.toISOString().split('T')[0];
const formatTime = (date) => date.toTimeString().slice(0, 5);

const createOrder = (id, items, total, type, status, tableId, hoursAgo) => {
  const orderDate = new Date(today);
  orderDate.setHours(today.getHours() - hoursAgo);
  return {
    id,
    orderNumber: 1000 + id,
    items: items.map(item => ({
      ...item,
      prepared: status === 'Completed' || status === 'Ready' || (status === 'Preparing' && Math.random() > 0.5)
    })),
    subtotal: total,
    tax: Math.round(total * 0.12),
    discount: Math.random() > 0.7 ? Math.round(total * 0.1) : 0,
    total: 0,
    type,
    status,
    tableId: tableId || null,
    customerName: type === 'Delivery' ? 'Rahul Sharma' : type === 'Takeaway' ? 'Priya Patel' : null,
    createdAt: orderDate.toISOString(),
    createdTime: formatTime(orderDate),
    paymentMethod: ['Cash', 'Card', 'UPI'][Math.floor(Math.random() * 3)],
    staffId: Math.floor(Math.random() * 5) + 1
  };
};

export const initialOrders = [
  createOrder(1, [
    { itemId: 1, name: 'Chicken Tikka', qty: 2, price: 280 },
    { itemId: 7, name: 'Chicken Butter Masala', qty: 1, price: 350 },
    { itemId: 24, name: 'Butter Naan', qty: 3, price: 40 }
  ], 1130, 'Dine-in', 'Preparing', 5, 0.5),
  createOrder(2, [
    { itemId: 29, name: 'Chicken Biryani', qty: 2, price: 320 },
    { itemId: 19, name: 'Gulab Jamun', qty: 2, price: 80 }
  ], 800, 'Dine-in', 'Ready', 8, 1),
  createOrder(3, [
    { itemId: 13, name: 'Masala Chai', qty: 4, price: 40 },
    { itemId: 24, name: 'Butter Naan', qty: 2, price: 40 }
  ], 240, 'Takeaway', 'Completed', null, 2),
  createOrder(4, [
    { itemId: 30, name: 'Veg Biryani', qty: 1, price: 220 },
    { itemId: 9, name: 'Dal Makhani', qty: 1, price: 220 },
    { itemId: 15, name: 'Mango Lassi', qty: 2, price: 100 }
  ], 640, 'Delivery', 'Pending', null, 3),
  createOrder(5, [
    { itemId: 2, name: 'Paneer Tikka', qty: 1, price: 220 },
    { itemId: 8, name: 'Paneer Butter Masala', qty: 1, price: 280 },
    { itemId: 25, name: 'Garlic Naan', qty: 2, price: 50 }
  ], 600, 'Dine-in', 'Completed', 12, 4),
  createOrder(6, [
    { itemId: 33, name: 'Mutton Biryani', qty: 1, price: 420 },
    { itemId: 16, name: 'Fresh Lime Soda', qty: 2, price: 60 }
  ], 540, 'Dine-in', 'Completed', 3, 5),
  createOrder(7, [
    { itemId: 7, name: 'Chicken Butter Masala', qty: 2, price: 350 },
    { itemId: 29, name: 'Chicken Biryani', qty: 1, price: 320 },
    { itemId: 31, name: 'Jeera Rice', qty: 1, price: 150 }
  ], 1170, 'Takeaway', 'Preparing', null, 1),
  createOrder(8, [
    { itemId: 21, name: 'Ice Cream', qty: 3, price: 100 },
    { itemId: 22, name: 'Brownie', qty: 2, price: 150 }
  ], 600, 'Dine-in', 'Completed', 15, 6),
  createOrder(9, [
    { itemId: 3, name: 'Fish Fry', qty: 2, price: 320 },
    { itemId: 12, name: 'Rogan Josh', qty: 1, price: 380 },
    { itemId: 26, name: 'Tandoori Roti', qty: 4, price: 30 }
  ], 1180, 'Dine-in', 'Ready', 7, 0.2),
  createOrder(10, [
    { itemId: 5, name: 'Chicken 65', qty: 1, price: 250 },
    { itemId: 14, name: 'Cold Coffee', qty: 2, price: 120 }
  ], 490, 'Takeaway', 'Cancelled', null, 8),
].map(order => ({
  ...order,
  total: order.subtotal + order.tax - order.discount
}));

// Generate hourly sales data for today
export const hourlySales = [
  { hour: '10AM', sales: 1200 },
  { hour: '11AM', sales: 2100 },
  { hour: '12PM', sales: 4500 },
  { hour: '1PM', sales: 5200 },
  { hour: '2PM', sales: 3800 },
  { hour: '3PM', sales: 2400 },
  { hour: '4PM', sales: 1800 },
  { hour: '5PM', sales: 2200 },
  { hour: '6PM', sales: 3600 },
  { hour: '7PM', sales: 4800 },
  { hour: '8PM', sales: 5500 },
  { hour: '9PM', sales: 4200 },
];

// Weekly revenue data
export const weeklyRevenue = [
  { day: 'Mon', revenue: 12500 },
  { day: 'Tue', revenue: 15200 },
  { day: 'Wed', revenue: 14800 },
  { day: 'Thu', revenue: 18200 },
  { day: 'Fri', revenue: 22400 },
  { day: 'Sat', revenue: 25600 },
  { day: 'Sun', revenue: 21800 },
];

// Top selling items
export const topSellingItems = [
  { name: 'Chicken Biryani', orders: 145, revenue: 46400 },
  { name: 'Chicken Butter Masala', orders: 128, revenue: 44800 },
  { name: 'Butter Naan', orders: 312, revenue: 12480 },
  { name: 'Paneer Butter Masala', orders: 98, revenue: 27440 },
  { name: 'Veg Biryani', orders: 87, revenue: 19140 },
];

// Calculate totals
export const todayStats = {
  totalOrders: initialOrders.filter(o => o.status !== 'Cancelled').length,
  totalRevenue: initialOrders.filter(o => o.status !== 'Cancelled').reduce((sum, o) => sum + o.total, 0),
  avgOrderValue: Math.round(initialOrders.filter(o => o.status !== 'Cancelled').reduce((sum, o) => sum + o.total, 0) / initialOrders.filter(o => o.status !== 'Cancelled').length),
};
