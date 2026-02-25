import { IndianRupee, ShoppingBag, Users, UtensilsCrossed, TrendingUp, Clock } from 'lucide-react'
import StatCard from '../components/StatCard'
import { orders } from '../data/sampleData'

export default function Dashboard() {
  const totalRevenue = orders.reduce(
    (sum, o) => sum + o.items.reduce((s, i) => s + i.price * i.qty, 0),
    0
  )

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        <p className="text-sm text-gray-500 mt-1">Overview of your restaurant today</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={IndianRupee} label="Today's Revenue" value={`₹${totalRevenue.toLocaleString()}`} sub="+12% from yesterday" />
        <StatCard icon={ShoppingBag} label="Total Orders" value={orders.length} sub="3 active" color="text-blue-600" />
        <StatCard icon={Users} label="Guests Served" value="24" sub="Avg 2.4 per table" color="text-green-600" />
        <StatCard icon={UtensilsCrossed} label="Menu Items" value="12" sub="2 unavailable" color="text-purple-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Clock size={18} className="text-gray-400" />
            <h3 className="font-semibold text-gray-700">Recent Orders</h3>
          </div>
          <div className="space-y-3">
            {orders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">{order.id}</p>
                  <p className="text-xs text-gray-500">Table {order.table} · {order.time}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold">
                    ₹{order.items.reduce((s, i) => s + i.price * i.qty, 0)}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    order.status === 'new' ? 'bg-blue-100 text-blue-700' :
                    order.status === 'preparing' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={18} className="text-gray-400" />
            <h3 className="font-semibold text-gray-700">Popular Items Today</h3>
          </div>
          <div className="space-y-3">
            {[
              { name: 'Butter Chicken', orders: 8, revenue: 2560 },
              { name: 'Chicken Biryani', orders: 6, revenue: 1680 },
              { name: 'Paneer Tikka', orders: 5, revenue: 1100 },
              { name: 'Masala Dosa', orders: 4, revenue: 480 },
              { name: 'Mango Lassi', orders: 4, revenue: 360 },
            ].map((item, i) => (
              <div key={item.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.orders} orders</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-gray-700">₹{item.revenue}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
