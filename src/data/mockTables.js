export const tables = [
  // Ground Floor
  { id: 1, name: 'T1', capacity: 2, floor: 'Ground', status: 'available', x: 1, y: 1 },
  { id: 2, name: 'T2', capacity: 2, floor: 'Ground', status: 'occupied', x: 1, y: 2, orderId: 7 },
  { id: 3, name: 'T3', capacity: 4, floor: 'Ground', status: 'occupied', x: 1, y: 3, orderId: 6 },
  { id: 4, name: 'T4', capacity: 4, floor: 'Ground', status: 'available', x: 1, y: 4 },
  { id: 5, name: 'T5', capacity: 6, floor: 'Ground', status: 'occupied', x: 2, y: 1, orderId: 1 },
  { id: 6, name: 'T6', capacity: 6, floor: 'Ground', status: 'available', x: 2, y: 2 },
  { id: 7, name: 'T7', capacity: 4, floor: 'Ground', status: 'occupied', x: 2, y: 3, orderId: 9 },
  { id: 8, name: 'T8', capacity: 4, floor: 'Ground', status: 'occupied', x: 2, y: 4, orderId: 2 },
  { id: 9, name: 'T9', capacity: 8, floor: 'Ground', status: 'reserved', x: 3, y: 1 },
  { id: 10, name: 'T10', capacity: 2, floor: 'Ground', status: 'available', x: 3, y: 2 },
  
  // First Floor
  { id: 11, name: 'F1', capacity: 2, floor: 'First', status: 'available', x: 1, y: 1 },
  { id: 12, name: 'F2', capacity: 4, floor: 'First', status: 'occupied', x: 1, y: 2, orderId: 5 },
  { id: 13, name: 'F3', capacity: 4, floor: 'First', status: 'available', x: 1, y: 3 },
  { id: 14, name: 'F4', capacity: 6, floor: 'First', status: 'available', x: 2, y: 1 },
  { id: 15, name: 'F5', capacity: 6, floor: 'First', status: 'occupied', x: 2, y: 2, orderId: 8 },
  { id: 16, name: 'F6', capacity: 8, floor: 'First', status: 'reserved', x: 2, y: 3 },
  { id: 17, name: 'F7', capacity: 10, floor: 'First', status: 'available', x: 3, y: 1 },
  { id: 18, name: 'F8', capacity: 2, floor: 'First', status: 'available', x: 3, y: 2 },
];

export const floors = ['Ground', 'First'];

export const getTablesByFloor = (floor) => tables.filter(t => t.floor === floor);

export const getTableById = (id) => tables.find(t => t.id === id);

export const getOccupiedTables = () => tables.filter(t => t.status === 'occupied');

export const getAvailableTables = () => tables.filter(t => t.status === 'available');
