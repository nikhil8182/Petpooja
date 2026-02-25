import { useState, useEffect } from 'react';
import { useOrderStore } from '../store/orderStore';
import { useTableStore } from '../store/tableStore';
import { ChefHat, Check, Clock, Timer } from 'lucide-react';

export default function KOT() {
  const { orders, updateOrderStatus, updateItemPrepared } = useOrderStore();
  const { tables } = useTableStore();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const pendingOrders = orders.filter(order => 
    order.status === 'Pending' || order.status === 'Preparing'
  );

  const getOrderTime = (createdAt) => {
    const orderTime = new Date(createdAt);
    const diff = Math.floor((currentTime - orderTime) / 1000);
    const minutes = Math.floor(diff / 60);
    const seconds = diff % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getTableName = (tableId) => {
    if (!tableId) return 'Takeaway';
    const table = tables.find(t => t.name === tableId);
    return table ? table.name : tableId;
  };

  const handleItemPrepared = (orderId, itemIndex) => {
    updateItemPrepared(orderId, itemIndex);
  };

  const handleOrderReady = (orderId) => {
    updateOrderStatus(orderId, 'Ready');
  };

  const handleStartPreparing = (orderId) => {
    updateOrderStatus(orderId, 'Preparing');
  };

  const allItemsPrepared = (order) => {
    return order.items.every(item => item.prepared);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-gray-800">Kitchen Display</h2>
          <p className="text-gray-500">{pendingOrders.length} active orders</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg">
          <Clock size={20} />
          <span className="font-mono text-xl">{currentTime.toLocaleTimeString()}</span>
        </div>
      </div>

      {pendingOrders.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center">
          <ChefHat size={64} className="mx-auto mb-4 text-gray-300" />
          <h3 className="font-display text-xl font-semibold text-gray-600">No pending orders</h3>
          <p className="text-gray-400">All orders have been completed</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {pendingOrders.map((order) => (
            <div 
              key={order.id} 
              className={`bg-white rounded-xl shadow-sm border-2 overflow-hidden ${
                order.status === 'Pending' ? 'border-yellow-300' : 'border-blue-300'
              }`}
            >
              {/* Header */}
              <div className={`px-4 py-3 flex justify-between items-center ${
                order.status === 'Pending' ? 'bg-yellow-50' : 'bg-blue-50'
              }`}>
                <div>
                  <p className="font-display font-bold text-lg text-gray-800">
                    #{order.orderNumber}
                  </p>
                  <p className="text-sm text-gray-500">{getTableName(order.tableId)}</p>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <Timer size={16} />
                  <span className="font-mono font-medium">{getOrderTime(order.createdAt)}</span>
                </div>
              </div>

              {/* Items */}
              <div className="p-4">
                <div className="space-y-2">
                  {order.items.map((item, idx) => (
                    <div 
                      key={idx}
                      className={`flex items-center justify-between p-2 rounded-lg ${
                        item.prepared ? 'bg-green-50' : 'bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {item.prepared ? (
                          <Check size={16} className="text-green-600" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border-2 border-gray-300"></div>
                        )}
                        <span className={item.prepared ? 'text-gray-500 line-through' : 'font-medium text-gray-800'}>
                          {item.name}
                        </span>
                      </div>
                      <span className="font-bold text-gray-800">x{item.qty}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="px-4 pb-4">
                {order.status === 'Pending' ? (
                  <button
                    onClick={() => handleStartPreparing(order.id)}
                    className="w-full py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600"
                  >
                    Start Preparing
                  </button>
                ) : allItemsPrepared(order) ? (
                  <button
                    onClick={() => handleOrderReady(order.id)}
                    className="w-full py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600"
                  >
                    Mark Ready
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      order.items.forEach((_, idx) => {
                        if (!order.items[idx].prepared) {
                          handleItemPrepared(order.id, idx);
                        }
                      });
                    }}
                    className="w-full py-2 bg-petpooja-orange text-white rounded-lg font-medium hover:bg-petpooja-orange-dark"
                  >
                    Prepare All
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
