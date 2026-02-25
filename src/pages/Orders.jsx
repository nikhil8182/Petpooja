import { useState } from 'react';
import { useOrderStore } from '../store/orderStore';
import { 
  Search, 
  Filter, 
  X, 
  CheckCircle, 
  XCircle, 
  Clock, 
  ChefHat,
  Receipt,
  Truck
} from 'lucide-react';

export default function Orders() {
  const { orders, updateOrderStatus } = useOrderStore();
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = orders.filter(order => {
    if (filterStatus !== 'all' && order.status !== filterStatus) return false;
    if (filterType !== 'all' && order.type !== filterType) return false;
    if (searchTerm && !order.orderNumber.toString().includes(searchTerm)) return false;
    return true;
  });

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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending': return <Clock size={16} />;
      case 'Preparing': return <ChefHat size={16} />;
      case 'Ready': return <CheckCircle size={16} />;
      case 'Completed': return <CheckCircle size={16} />;
      case 'Cancelled': return <XCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Dine-in': return <Receipt size={14} />;
      case 'Takeaway': return <Package size={14} />;
      case 'Delivery': return <Truck size={14} />;
      default: return <Receipt size={14} />;
    }
  };

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
  };

  return (
    <div className="flex gap-6 h-[calc(100vh-140px)]">
      {/* Orders List */}
      <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
        {/* Filters */}
        <div className="p-4 border-b border-gray-100 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by order number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-petpooja-orange/50"
            />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-petpooja-orange/50"
          >
            <option value="all">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Preparing">Preparing</option>
            <option value="Ready">Ready</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-petpooja-orange/50"
          >
            <option value="all">All Types</option>
            <option value="Dine-in">Dine-in</option>
            <option value="Takeaway">Takeaway</option>
            <option value="Delivery">Delivery</option>
          </select>
        </div>

        {/* Orders List */}
        <div className="flex-1 overflow-y-auto">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <Receipt size={48} className="mx-auto mb-3 opacity-50" />
              <p>No orders found</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedOrder?.id === order.id ? 'bg-orange-50' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="font-medium text-gray-800">#{order.orderNumber}</p>
                        <p className="text-sm text-gray-500">{order.createdTime}</p>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        {getTypeIcon(order.type)}
                        <span>{order.type}</span>
                      </div>
                      {order.tableId && (
                        <span className="text-sm text-gray-500">Table {order.tableId}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-semibold text-gray-800">₹{order.total}</p>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Order Details */}
      <div className="w-96 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        {selectedOrder ? (
          <>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-display font-semibold text-xl text-gray-800">
                  Order #{selectedOrder.orderNumber}
                </h3>
                <p className="text-sm text-gray-500">{selectedOrder.createdTime}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex gap-2 mb-4">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>
                {selectedOrder.status}
              </span>
              <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
                {selectedOrder.type}
              </span>
            </div>

            {selectedOrder.customerName && (
              <p className="text-sm text-gray-600 mb-4">Customer: {selectedOrder.customerName}</p>
            )}

            {/* Items */}
            <div className="border-t border-b border-gray-200 py-4 mb-4">
              <h4 className="font-medium text-gray-700 mb-3">Items</h4>
              <div className="space-y-2">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.qty}x {item.name}
                    </span>
                    <span className="font-medium">₹{item.total || item.price * item.qty}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Totals */}
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>₹{selectedOrder.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (12%)</span>
                <span>₹{selectedOrder.tax}</span>
              </div>
              {selectedOrder.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-₹{selectedOrder.discount}</span>
                </div>
              )}
              <div className="flex justify-between font-semibold text-lg pt-2 border-t border-gray-200">
                <span>Total</span>
                <span className="text-petpooja-orange">₹{selectedOrder.total}</span>
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <p className="text-sm text-gray-600">
                Payment: <span className="font-medium">{selectedOrder.paymentMethod}</span>
              </p>
            </div>

            {/* Status Actions */}
            <div className="space-y-2">
              {selectedOrder.status === 'Pending' && (
                <button
                  onClick={() => handleStatusChange(selectedOrder.id, 'Preparing')}
                  className="w-full py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600"
                >
                  Start Preparing
                </button>
              )}
              {selectedOrder.status === 'Preparing' && (
                <button
                  onClick={() => handleStatusChange(selectedOrder.id, 'Ready')}
                  className="w-full py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600"
                >
                  Mark as Ready
                </button>
              )}
              {selectedOrder.status === 'Ready' && (
                <button
                  onClick={() => handleStatusChange(selectedOrder.id, 'Completed')}
                  className="w-full py-2 bg-petpooja-orange text-white rounded-lg font-medium hover:bg-petpooja-orange-dark"
                >
                  Complete Order
                </button>
              )}
              {['Pending', 'Preparing'].includes(selectedOrder.status) && (
                <button
                  onClick={() => handleStatusChange(selectedOrder.id, 'Cancelled')}
                  className="w-full py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600"
                >
                  Cancel Order
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-12 text-gray-400">
            <Receipt size={48} className="mx-auto mb-3 opacity-50" />
            <p>Select an order to view details</p>
          </div>
        )}
      </div>
    </div>
  );
}
