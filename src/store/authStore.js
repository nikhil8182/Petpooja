import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  login: (email, password) => {
    if (email === 'admin@petpooja.com' && password === 'demo123') {
      set({
        user: {
          id: 1,
          name: 'Admin User',
          email: 'admin@petpooja.com',
          role: 'Admin'
        },
        isAuthenticated: true
      });
      return true;
    }
    return false;
  },
  logout: () => set({ user: null, isAuthenticated: false }),
}));
