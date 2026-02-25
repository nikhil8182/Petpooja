import { create } from 'zustand';
import { initialOrders } from '../data/mockOrders';

export const useOrderStore = create((set, get) => ({
  orders: [...initialOrders],
  
  addOrder: (order) => set((state) => ({
    orders: [
      {
        ...order,
        id: state.orders.length + 1,
        orderNumber: 1000 + state.orders.length + 1,
        createdAt: new Date().toISOString(),
        createdTime: new Date().toTimeString().slice(0, 5),
      },
      ...state.orders
    ]
  })),
  
  updateOrderStatus: (orderId, status) => set((state) => ({
    orders: state.orders.map(order =>
      order.id === orderId ? { ...order, status } : order
    )
  })),
  
  updateItemPrepared: (orderId, itemIndex) => set((state) => ({
    orders: state.orders.map(order =>
      order.id === orderId
        ? {
            ...order,
            items: order.items.map((item, idx) =>
              idx === itemIndex ? { ...item, prepared: true } : item
            )
          }
        : order
    )
  })),
  
  getOrderById: (id) => get().orders.find(order => order.id === id),
  
  getActiveOrders: () => get().orders.filter(order => 
    order.status !== 'Completed' && order.status !== 'Cancelled'
  ),
  
  getOrdersByTable: (tableId) => get().orders.filter(order => 
    order.tableId === tableId && order.status !== 'Completed' && order.status !== 'Cancelled'
  ),
  
  getPendingKOTOrders: () => get().orders.filter(order =>
    order.status === 'Pending' || order.status === 'Preparing'
  ),
  
  filterOrders: (filters) => {
    const { status, type, date } = filters;
    return get().orders.filter(order => {
      if (status && order.status !== status) return false;
      if (type && order.type !== type) return false;
      if (date && order.createdAt?.startsWith(date)) return false;
      return true;
    });
  }
}));
