import { useState } from 'react'
import { orders as initialOrders } from '../data/sampleData'

const statusColors = {
  new: 'bg-blue-100 text-blue-700 border-blue-200',
  preparing: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  served: 'bg-green-100 text-green-700 border-green-200',
}

const statusFlow = { new: 'preparing', preparing: 'served', served: 'served' }

export default function Orders() {
  const [orderList, setOrderList] = useState(initialOrders)
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' ? orderList : orderList.filter((o) => o.status === filter)

  function advanceStatus(orderId) {
    setOrderList((prev) =>
      prev.map((o) =>
        o.id === orderId ? { ...o, status: statusFlow[o.status] } : o
      )
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Orders</h2>
        <p className="text-sm text-gray-500 mt-1">Track and manage live orders</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {['all', 'new', 'preparing', 'served'].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${
              filter === s
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {s} {s !== 'all' && `(${orderList.filter((o) => o.status === s).length})`}
          </button>
        ))}
      </div>

      {/* Order Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((order) => {
          const total = order.items.reduce((s, i) => s + i.price * i.qty, 0)
          return (
            <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-bold text-gray-800">{order.id}</h3>
                  <p className="text-xs text-gray-500">Table {order.table} · {order.time}</p>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium border ${statusColors[order.status]}`}>
                  {order.status}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.name} <span className="text-gray-400">x{item.qty}</span>
                    </span>
                    <span className="font-medium">₹{item.price * item.qty}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <span className="font-bold text-gray-800">₹{total}</span>
                {order.status !== 'served' && (
                  <button
                    onClick={() => advanceStatus(order.id)}
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
    </div>
  )
}
