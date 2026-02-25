import { create } from 'zustand';
import { menuItems as initialMenuItems, categories } from '../data/mockMenu';

export const useMenuStore = create((set, get) => ({
  menuItems: [...initialMenuItems],
  categories: [...categories],
  
  addItem: (item) => set((state) => ({
    menuItems: [...state.menuItems, {
      ...item,
      id: Math.max(...state.menuItems.map(i => i.id)) + 1
    }]
  })),
  
  updateItem: (id, updates) => set((state) => ({
    menuItems: state.menuItems.map(item =>
      item.id === id ? { ...item, ...updates } : item
    )
  })),
  
  deleteItem: (id) => set((state) => ({
    menuItems: state.menuItems.filter(item => item.id !== id)
  })),
  
  toggleAvailability: (id) => set((state) => ({
    menuItems: state.menuItems.map(item =>
      item.id === id ? { ...item, available: !item.available } : item
    )
  })),
  
  getItemById: (id) => get().menuItems.find(item => item.id === id),
  
  getItemsByCategory: (categoryId) => get().menuItems.filter(item => item.category === categoryId),
  
  addCategory: (category) => set((state) => ({
    categories: [...state.categories, {
      ...category,
      id: Math.max(...state.categories.map(c => c.id)) + 1
    }]
  })),
}));
