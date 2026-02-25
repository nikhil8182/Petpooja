export const categories = [
  { id: 1, name: 'Starters', icon: '🍢' },
  { id: 2, name: 'Main Course', icon: '🍛' },
  { id: 3, name: 'Beverages', icon: '🥤' },
  { id: 4, name: 'Desserts', icon: '🍰' },
  { id: 5, name: 'Breads', icon: '🫓' },
  { id: 6, name: 'Rice & Biryani', icon: '🍚' },
];

export const menuItems = [
  // Starters
  { id: 1, name: 'Chicken Tikka', price: 280, category: 1, description: 'Tender chicken pieces in creamy marinade', available: true, image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=200&h=150&fit=crop' },
  { id: 2, name: 'Paneer Tikka', price: 220, category: 1, description: 'Cottage cheese with spices', available: true, image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=200&h=150&fit=crop' },
  { id: 3, name: 'Fish Fry', price: 320, category: 1, description: 'Crispy fried fish', available: true, image: 'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?w=200&h=150&fit=crop' },
  { id: 4, name: 'Veggie Platter', price: 180, category: 1, description: 'Assorted fried vegetables', available: true, image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=200&h=150&fit=crop' },
  { id: 5, name: 'Chicken 65', price: 250, category: 1, description: 'Spicy chicken appetizer', available: true, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=200&h=150&fit=crop' },
  { id: 6, name: 'Spring Rolls', price: 150, category: 1, description: 'Crispy vegetable rolls', available: true, image: 'https://images.unsplash.com/photo-1548507200-39de1c66d15f?w=200&h=150&fit=crop' },
  
  // Main Course
  { id: 7, name: 'Chicken Butter Masala', price: 350, category: 2, description: 'Chicken in tomato cream sauce', available: true, image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=200&h=150&fit=crop' },
  { id: 8, name: 'Paneer Butter Masala', price: 280, category: 2, description: 'Paneer in rich gravy', available: true, image: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=200&h=150&fit=crop' },
  { id: 9, name: 'Dal Makhani', price: 220, category: 2, description: 'Black lentils in creamy sauce', available: true, image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=200&h=150&fit=crop' },
  { id: 10, name: 'Chicken Korma', price: 340, category: 2, description: 'Chicken in aromatic gravy', available: true, image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=200&h=150&fit=crop' },
  { id: 11, name: 'Palak Paneer', price: 250, category: 2, description: 'Spinach with cottage cheese', available: true, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=200&h=150&fit=crop' },
  { id: 12, name: 'Rogan Josh', price: 380, category: 2, description: 'Lamb in Kashmiri spices', available: true, image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=200&h=150&fit=crop' },
  
  // Beverages
  { id: 13, name: 'Masala Chai', price: 40, category: 3, description: 'Spiced Indian tea', available: true, image: 'https://images.unsplash.com/photo-1564890369478-c5c3563533e2?w=200&h=150&fit=crop' },
  { id: 14, name: 'Cold Coffee', price: 120, category: 3, description: 'Iced coffee with cream', available: true, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=200&h=150&fit=crop' },
  { id: 15, name: 'Mango Lassi', price: 100, category: 3, description: 'Sweet yogurt drink', available: true, image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=200&h=150&fit=crop' },
  { id: 16, name: 'Fresh Lime Soda', price: 60, category: 3, description: 'Citrus refresher', available: true, image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=200&h=150&fit=crop' },
  { id: 17, name: 'Buttermilk', price: 50, category: 3, description: 'Spiced buttermilk', available: true, image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200&h=150&fit=crop' },
  { id: 18, name: 'Orange Juice', price: 80, category: 3, description: 'Fresh squeezed', available: true, image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=200&h=150&fit=crop' },
  
  // Desserts
  { id: 19, name: 'Gulab Jamun', price: 80, category: 4, description: 'Sweet milk balls', available: true, image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=200&h=150&fit=crop' },
  { id: 20, name: 'Rasmalai', price: 120, category: 4, description: 'Cottage cheese in milk', available: true, image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=200&h=150&fit=crop' },
  { id: 21, name: 'Ice Cream', price: 100, category: 4, description: 'Vanilla or chocolate', available: true, image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=200&h=150&fit=crop' },
  { id: 22, name: 'Brownie', price: 150, category: 4, description: 'Chocolate fudge brownie', available: true, image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=200&h=150&fit=crop' },
  { id: 23, name: 'Kulfi', price: 90, category: 4, description: 'Indian ice cream', available: true, image: 'https://images.unsplash.com/photo-1560008511-11c63416e52d?w=200&h=150&fit=crop' },
  
  // Breads
  { id: 24, name: 'Butter Naan', price: 40, category: 5, description: 'Tandoor baked bread', available: true, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=200&h=150&fit=crop' },
  { id: 25, name: 'Garlic Naan', price: 50, category: 5, description: 'Naan with garlic', available: true, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=200&h=150&fit=crop' },
  { id: 26, name: 'Tandoori Roti', price: 30, category: 5, description: 'Whole wheat bread', available: true, image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=200&h=150&fit=crop' },
  { id: 27, name: 'Kulcha', price: 45, category: 5, description: 'Stuffed bread', available: true, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=200&h=150&fit=crop' },
  { id: 28, name: 'Paratha', price: 35, category: 5, description: 'Layered flatbread', available: true, image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=200&h=150&fit=crop' },
  
  // Rice & Biryani
  { id: 29, name: 'Chicken Biryani', price: 320, category: 6, description: 'Aromatic rice with chicken', available: true, image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=200&h=150&fit=crop' },
  { id: 30, name: 'Veg Biryani', price: 220, category: 6, description: 'Mixed vegetable biryani', available: true, image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=200&h=150&fit=crop' },
  { id: 31, name: 'Jeera Rice', price: 150, category: 6, description: 'Cumin flavored rice', available: true, image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=200&h=150&fit=crop' },
  { id: 32, name: 'Chicken Fried Rice', price: 200, category: 6, description: 'Stir fried rice', available: true, image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=200&h=150&fit=crop' },
  { id: 33, name: 'Mutton Biryani', price: 420, category: 6, description: 'Lamb biryani', available: true, image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=200&h=150&fit=crop' },
];

export const getMenuByCategory = (categoryId) => {
  return menuItems.filter(item => item.category === categoryId);
};

export const getMenuItem = (itemId) => {
  return menuItems.find(item => item.id === itemId);
};
