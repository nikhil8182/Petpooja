import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  items: [],
  orderType: 'Dine-in',
  selectedTable: null,
  customerName: '',
  discount: 0,
  
  addItem: (item) => {
    const { items } = get();
    const existingItem = items.find(i => i.itemId === item.id);
    
    if (existingItem) {
      set({
        items: items.map(i =>
          i.itemId === item.id
            ? { ...i, qty: i.qty + 1, total: (i.qty + 1) * item.price }
            : i
        )
      });
    } else {
      set({
        items: [...items, {
          itemId: item.id,
          name: item.name,
          price: item.price,
          qty: 1,
          total: item.price
        }]
      });
    }
  },
  
  removeItem: (itemId) => set((state) => ({
    items: state.items.filter(i => i.itemId !== itemId)
  })),
  
  updateQuantity: (itemId, qty) => {
    if (qty <= 0) {
      get().removeItem(itemId);
      return;
    }
    set((state) => ({
      items: state.items.map(i =>
        i.itemId === itemId
          ? { ...i, qty, total: qty * i.price }
          : i
      )
    }));
  },
  
  clearCart: () => set({
    items: [],
    selectedTable: null,
    customerName: '',
    discount: 0
  }),
  
  setOrderType: (type) => set({ orderType: type, selectedTable: type === 'Dine-in' ? get().selectedTable : null }),
  
  setSelectedTable: (table) => set({ selectedTable: table }),
  
  setCustomerName: (name) => set({ customerName: name }),
  
  setDiscount: (discount) => set({ discount }),
  
  getSubtotal: () => get().items.reduce((sum, item) => sum + item.total, 0),
  
  getTax: () => Math.round(get().getSubtotal() * 0.12),
  
  getTotal: () => get().getSubtotal() + get().getTax() - get().discount,
}));
