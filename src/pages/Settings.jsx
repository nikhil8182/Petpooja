import { useState } from 'react';
import { Save, Store, Receipt, Percent, Clock, Bell, Shield, Palette } from 'lucide-react';

export default function Settings() {
  const [settings, setSettings] = useState({
    restaurantName: 'PetPooja Restaurant',
    address: '123 Food Street, Mumbai, Maharashtra',
    phone: '9876543210',
    email: 'contact@petpooja.com',
    taxRate: 12,
    discountMax: 20,
    orderTimeout: 30,
    printerName: 'Kitchen Printer',
    notifications: true,
    darkMode: false
  });

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-gray-800">Settings</h2>
          <p className="text-gray-500">Manage your restaurant preferences</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 bg-petpooja-orange text-white rounded-lg font-medium hover:bg-petpooja-orange-dark"
        >
          <Save size={18} />
          Save Changes
        </button>
      </div>

      {/* Restaurant Info */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Store size={20} className="text-petpooja-orange" />
          <h3 className="font-display font-semibold text-lg">Restaurant Information</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Restaurant Name</label>
            <input
              type="text"
              value={settings.restaurantName}
              onChange={(e) => setSettings({ ...settings, restaurantName: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              value={settings.phone}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input
              type="text"
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm"
            />
          </div>
        </div>
      </div>

      {/* Billing Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Receipt size={20} className="text-petpooja-orange" />
          <h3 className="font-display font-semibold text-lg">Billing & Tax</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">GST/Tax Rate (%)</label>
            <input
              type="number"
              value={settings.taxRate}
              onChange={(e) => setSettings({ ...settings, taxRate: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Discount (%)</label>
            <input
              type="number"
              value={settings.discountMax}
              onChange={(e) => setSettings({ ...settings, discountMax: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm"
            />
          </div>
        </div>
      </div>

      {/* Order Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Clock size={20} className="text-petpooja-orange" />
          <h3 className="font-display font-semibold text-lg">Order Settings</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Order Timeout (minutes)</label>
            <input
              type="number"
              value={settings.orderTimeout}
              onChange={(e) => setSettings({ ...settings, orderTimeout: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm"
            />
            <p className="text-xs text-gray-500 mt-1">Auto-cancel pending orders after this time</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kitchen Printer</label>
            <input
              type="text"
              value={settings.printerName}
              onChange={(e) => setSettings({ ...settings, printerName: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm"
            />
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Bell size={20} className="text-petpooja-orange" />
          <h3 className="font-display font-semibold text-lg">Notifications</h3>
        </div>
        
        <div className="space-y-3">
          <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer">
            <div>
              <p className="font-medium text-gray-800">Order Notifications</p>
              <p className="text-sm text-gray-500">Get notified for new orders</p>
            </div>
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={(e) => setSettings({ ...settings, notifications: e.target.checked })}
              className="w-5 h-5 text-petpooja-orange rounded"
            />
          </label>
        </div>
      </div>

      {/* About */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Shield size={20} className="text-petpooja-orange" />
          <h3 className="font-display font-semibold text-lg">About</h3>
        </div>
        
        <div className="space-y-2 text-sm text-gray-600">
          <p><strong>PetPooja POS</strong> v1.0.0</p>
          <p>Restaurant Management System</p>
          <p className="text-gray-400">Built with React + Tailwind CSS</p>
        </div>
      </div>
    </div>
  );
}
