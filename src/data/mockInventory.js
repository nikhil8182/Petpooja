export const inventoryItems = [
  { id: 1, name: 'Chicken', unit: 'kg', quantity: 45, minStock: 20, rate: 180, category: 'Non-Veg' },
  { id: 2, name: 'Mutton', unit: 'kg', quantity: 15, minStock: 15, rate: 450, category: 'Non-Veg' },
  { id: 3, name: 'Fish', unit: 'kg', quantity: 12, minStock: 10, rate: 350, category: 'Non-Veg' },
  { id: 4, name: 'Paneer', unit: 'kg', quantity: 25, minStock: 15, rate: 280, category: 'Dairy' },
  { id: 5, name: 'Milk', unit: 'L', quantity: 60, minStock: 30, rate: 45, category: 'Dairy' },
  { id: 6, name: 'Butter', unit: 'kg', quantity: 8, minStock: 5, rate: 420, category: 'Dairy' },
  { id: 7, name: 'Cream', unit: 'L', quantity: 4, minStock: 5, rate: 250, category: 'Dairy' },
  { id: 8, name: 'Tomatoes', unit: 'kg', quantity: 35, minStock: 20, rate: 35, category: 'Vegetables' },
  { id: 9, name: 'Onions', unit: 'kg', quantity: 40, minStock: 25, rate: 28, category: 'Vegetables' },
  { id: 10, name: 'Potatoes', unit: 'kg', quantity: 50, minStock: 30, rate: 22, category: 'Vegetables' },
  { id: 11, name: 'Spinach', unit: 'kg', quantity: 8, minStock: 10, rate: 40, category: 'Vegetables' },
  { id: 12, name: 'Basmati Rice', unit: 'kg', quantity: 30, minStock: 20, rate: 120, category: 'Groceries' },
  { id: 13, name: 'Wheat Flour', unit: 'kg', quantity: 25, minStock: 15, rate: 35, category: 'Groceries' },
  { id: 14, name: 'Cooking Oil', unit: 'L', quantity: 20, minStock: 15, rate: 150, category: 'Groceries' },
  { id: 15, name: 'Ghee', unit: 'kg', quantity: 6, minStock: 8, rate: 520, category: 'Dairy' },
  { id: 16, name: 'Spices Mix', unit: 'kg', quantity: 5, minStock: 3, rate: 450, category: 'Spices' },
  { id: 17, name: 'Green Chilies', unit: 'kg', quantity: 4, minStock: 3, rate: 80, category: 'Vegetables' },
  { id: 18, name: 'Ginger', unit: 'kg', quantity: 3, minStock: 4, rate: 120, category: 'Vegetables' },
  { id: 19, name: 'Garlic', unit: 'kg', quantity: 5, minStock: 4, rate: 100, category: 'Vegetables' },
  { id: 20, name: 'Sugar', unit: 'kg', quantity: 15, minStock: 10, rate: 42, category: 'Groceries' },
];

export const categories = ['Non-Veg', 'Dairy', 'Vegetables', 'Groceries', 'Spices'];

export const getLowStockItems = () => inventoryItems.filter(item => item.quantity <= item.minStock);

export const getInventoryByCategory = (category) => inventoryItems.filter(item => item.category === category);

export const getInventoryItem = (id) => inventoryItems.find(item => item.id === id);

export const totalInventoryValue = inventoryItems.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
