import { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { 
  DollarSign, 
  TrendingUp, 
  ShoppingCart, 
  Users,
  Calendar,
  Download
} from 'lucide-react';
import { weeklyRevenue, hourlySales, topSellingItems } from '../data/mockOrders';

const orderTypeData = [
  { name: 'Dine-in', value: 45, color: '#FF6B35' },
  { name: 'Takeaway', value: 30, color: '#3B82F6' },
  { name: 'Delivery', value: 25, color: '#10B981' },
];

const paymentData = [
  { name: 'Cash', value: 40, color: '#FF6B35' },
  { name: 'Card', value: 35, color: '#3B82F6' },
  { name: 'UPI', value: 25, color: '#10B981' },
];

const monthlyData = [
  { month: 'Aug', revenue: 85000, orders: 420 },
  { month: 'Sep', revenue: 92000, orders: 480 },
  { month: 'Oct', revenue: 88000, orders: 450 },
  { month: 'Nov', revenue: 105000, orders: 520 },
  { month: 'Dec', revenue: 128000, orders: 640 },
  { month: 'Jan', revenue: 118000, orders: 590 },
  { month: 'Feb', revenue: 132000, orders: 680 },
];

const categoryData = [
  { name: 'Main Course', sales: 45000 },
  { name: 'Biryani', sales: 32000 },
  { name: 'Starters', sales: 28000 },
  { name: 'Beverages', sales: 18000 },
  { name: 'Desserts', sales: 12000 },
  { name: 'Breads', sales: 8000 },
];

export default function Reports() {
  const [dateRange, setDateRange] = useState('week');

  const stats = [
    { 
      label: "Total Revenue", 
      value: "₹1,32,000", 
      change: '+18.5%',
      positive: true,
      icon: DollarSign 
    },
    { 
      label: "Total Orders", 
      value: "680", 
      change: '+12.3%',
      positive: true,
      icon: ShoppingCart 
    },
    { 
      label: "Avg Order Value", 
      value: "₹194", 
      change: '+5.8%',
      positive: true,
      icon: TrendingUp 
    },
    { 
      label: "Customers", 
      value: "245", 
      change: '+8.2%',
      positive: true,
      icon: Users 
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-gray-800">Reports & Analytics</h2>
          <p className="text-gray-500">Track your restaurant performance</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm"
          >
            <option value="day">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg text-sm font-medium hover:bg-gray-900">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="font-display text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                <p className={`text-sm mt-2 ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change} vs last period
                </p>
              </div>
              <div className="p-3 bg-gray-100 rounded-xl">
                <stat.icon size={24} className="text-gray-600" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue Trend */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-display font-semibold text-lg text-gray-800 mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{fontSize: 12}} stroke="#9ca3af" />
              <YAxis tick={{fontSize: 12}} stroke="#9ca3af" tickFormatter={(value) => `₹${value/1000}k`} />
              <Tooltip 
                formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#FF6B35" 
                strokeWidth={3}
                dot={{ fill: '#FF6B35', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Orders by Type */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-display font-semibold text-lg text-gray-800 mb-4">Orders by Type</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={orderTypeData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {orderTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales by Category */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-display font-semibold text-lg text-gray-800 mb-4">Sales by Category</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={categoryData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" tick={{fontSize: 12}} stroke="#9ca3af" tickFormatter={(value) => `₹${value/1000}k`} />
              <YAxis type="category" dataKey="name" tick={{fontSize: 12}} stroke="#9ca3af" width={100} />
              <Tooltip 
                formatter={(value) => [`₹${value.toLocaleString()}`, 'Sales']}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Bar dataKey="sales" fill="#FF6B35" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-display font-semibold text-lg text-gray-800 mb-4">Payment Methods</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={paymentData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {paymentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Selling Items */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h3 className="font-display font-semibold text-lg text-gray-800 mb-4">Top Selling Items</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b border-gray-100">
                <th className="pb-3 font-medium">Item</th>
                <th className="pb-3 font-medium">Orders</th>
                <th className="pb-3 font-medium">Revenue</th>
                <th className="pb-3 font-medium">Trend</th>
              </tr>
            </thead>
            <tbody>
              {topSellingItems.map((item, idx) => (
                <tr key={idx} className="border-b border-gray-50 last:border-0">
                  <td className="py-3 font-medium text-gray-800">{item.name}</td>
                  <td className="py-3 text-gray-600">{item.orders}</td>
                  <td className="py-3 font-semibold text-gray-800">₹{item.revenue.toLocaleString()}</td>
                  <td className="py-3">
                    <span className="text-green-600 text-sm">+{Math.floor(Math.random() * 20 + 5)}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
