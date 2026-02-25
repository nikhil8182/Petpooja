import { create } from 'zustand';
import { tables as initialTables } from '../data/mockTables';

export const useTableStore = create((set, get) => ({
  tables: [...initialTables],
  
  updateTableStatus: (tableId, status, orderId = null) => set((state) => ({
    tables: state.tables.map(table =>
      table.id === tableId
        ? { ...table, status, orderId }
        : table
    )
  })),
  
  getTableById: (id) => get().tables.find(table => table.id === id),
  
  getTablesByFloor: (floor) => get().tables.filter(table => table.floor === floor),
  
  getOccupiedTables: () => get().tables.filter(table => table.status === 'occupied'),
  
  getAvailableTables: () => get().tables.filter(table => table.status === 'available'),
}));
