import { useOrderStore } from '../store/orderStore';
import { useTableStore } from '../store/tableStore';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { 
  DollarSign, 
  ShoppingCart, 
  Users, 
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { hourlySales, weeklyRevenue, topSellingItems, todayStats } from '../data/mockOrders';

export default function Dashboard() {
  const { orders } = useOrderStore();
  const { tables } = useTableStore();
  
  const activeOrders = orders.filter(o => o.status !== 'Completed' && o.status !== 'Cancelled');
  const completedOrders = orders.filter(o => o.status === 'Completed');
  const occupiedTables = tables.filter(t => t.status === 'occupied').length;
  const totalTables = tables.length;

  const stats = [
    { 
      label: "Today's Revenue", 
      value: `₹${todayStats.totalRevenue.toLocaleString()}`, 
      change: '+12.5%', 
      positive: true,
      icon: DollarSign,
      color: 'bg-green-500'
    },
    { 
      label: "Orders Today", 
      value: todayStats.totalOrders, 
      change: '+8.2%', 
      positive: true,
      icon: ShoppingCart,
      color: 'bg-blue-500'
    },
    { 
      label: "Active Orders", 
      value: activeOrders.length, 
      change: activeOrders.length > 0 ? 'Live' : 'None',
      positive: true,
      icon: Clock,
      color: 'bg-orange-500'
    },
    { 
      label: "Table Occupancy", 
      value: `${occupiedTables}/${totalTables}`, 
      change: `${Math.round((occupiedTables/totalTables)*100)}%`, 
      positive: occupiedTables > 0,
      icon: Users,
      color: 'bg-purple-500'
    },
  ];

  const recentOrders = orders.slice(0, 5);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-700';
      case 'Preparing': return 'bg-blue-100 text-blue-700';
      case 'Ready': return 'bg-green-100 text-green-700';
      case 'Completed': return 'bg-gray-100 text-gray-700';
      case 'Cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="font-display text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                <p className={`text-sm mt-2 ${stat.positive ? 'text-green-600' : 'text-gray-500'}`}>
                  {stat.change}
                </p>
              </div>
              <div className={`p-3 rounded-xl ${stat.color}`}>
                <stat.icon size={24} className="text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hourly Sales Chart */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-display font-semibold text-lg text-gray-800 mb-4">Today's Sales by Hour</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={hourlySales}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="hour" tick={{fontSize: 12}} stroke="#9ca3af" />
              <YAxis tick={{fontSize: 12}} stroke="#9ca3af" tickFormatter={(value) => `₹${value/1000}k`} />
              <Tooltip 
                formatter={(value) => [`₹${value.toLocaleString()}`, 'Sales']}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Bar dataKey="sales" fill="#FF6B35" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Revenue Chart */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-display font-semibold text-lg text-gray-800 mb-4">Weekly Revenue</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={weeklyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" tick={{fontSize: 12}} stroke="#9ca3af" />
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
                activeDot={{ r: 6, fill: '#FF6B35' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-lg text-gray-800">Recent Orders</h3>
            <span className="text-sm text-petpooja-orange font-medium cursor-pointer hover:underline">View All</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 border-b border-gray-100">
                  <th className="pb-3 font-medium">Order #</th>
                  <th className="pb-3 font-medium">Type</th>
                  <th className="pb-3 font-medium">Items</th>
                  <th className="pb-3 font-medium">Total</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Time</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-50 last:border-0">
                    <td className="py-3 text-sm font-medium text-gray-800">#{order.orderNumber}</td>
                    <td className="py-3 text-sm text-gray-600">{order.type}</td>
                    <td className="py-3 text-sm text-gray-600">{order.items.length} items</td>
                    <td className="py-3 text-sm font-medium text-gray-800">₹{order.total}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 text-sm text-gray-500">{order.createdTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Selling Items */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-display font-semibold text-lg text-gray-800 mb-4">Top Selling Items</h3>
          <div className="space-y-3">
            {topSellingItems.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-petpooja-orange rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {idx + 1}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.orders} orders</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-green-600">₹{item.revenue.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
