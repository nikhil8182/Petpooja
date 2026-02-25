import { useState } from 'react'
import { ClipboardList } from 'lucide-react'
import { useApp } from '../data/AppContext'
import { useToast } from '../components/Toast'

const statusColors = {
  new: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-800',
  preparing: 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-800',
  served: 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-800',
}

const statusFlow = { new: 'preparing', preparing: 'served' }

export default function Orders() {
  const { orders, updateOrderStatus } = useApp()
  const toast = useToast()
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' ? orders : orders.filter((o) => o.status === filter)

  function handleAdvance(order) {
    const next = statusFlow[order.status]
    updateOrderStatus(order.id, next)
    toast(
      next === 'preparing'
        ? `${order.id} is now being prepared`
        : `${order.id} marked as served`,
      'success'
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Orders</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Track and manage live orders</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {['all', 'new', 'preparing', 'served'].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${
              filter === s
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {s} {s !== 'all' && `(${orders.filter((o) => o.status === s).length})`}
          </button>
        ))}
      </div>

      {/* Order Cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <ClipboardList size={40} className="mx-auto text-gray-300 dark:text-gray-600 mb-3" />
          <p className="text-gray-500 dark:text-gray-400 font-medium">
            {filter === 'all' ? 'No orders yet' : `No ${filter} orders`}
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Orders will appear here as they come in</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((order) => {
            const total = order.items.reduce((s, i) => s + i.price * i.qty, 0)
            return (
              <div key={order.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-gray-800 dark:text-gray-100">{order.id}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Table {order.table} · {order.time}</p>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium border ${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-300">
                        {item.name} <span className="text-gray-400 dark:text-gray-500">x{item.qty}</span>
                      </span>
                      <span className="font-medium dark:text-gray-200">₹{item.price * item.qty}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                  <span className="font-bold text-gray-800 dark:text-gray-100">₹{total}</span>
                  {order.status !== 'served' && (
                    <button
                      onClick={() => handleAdvance(order)}
                      className="px-3 py-1.5 bg-orange-500 text-white text-xs font-medium rounded-lg hover:bg-orange-600 transition-colors"
                    >
                      {order.status === 'new' ? 'Start Preparing' : 'Mark Served'}
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
