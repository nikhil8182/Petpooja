import { useState } from 'react';
import { useTableStore } from '../store/tableStore';
import { useOrderStore } from '../store/orderStore';
import { floors } from '../data/mockTables';
import { Users, Clock, X, Receipt } from 'lucide-react';

export default function Tables() {
  const [activeFloor, setActiveFloor] = useState('Ground');
  const [selectedTable, setSelectedTable] = useState(null);
  const { tables, updateTableStatus } = useTableStore();
  const { getOrderById, getOrdersByTable } = useOrderStore();

  const floorTables = tables.filter(t => t.floor === activeFloor);

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-100 border-green-300 text-green-700';
      case 'occupied': return 'bg-red-100 border-red-300 text-red-700';
      case 'reserved': return 'bg-yellow-100 border-yellow-300 text-yellow-700';
      default: return 'bg-gray-100 border-gray-300 text-gray-700';
    }
  };

  const handleTableClick = (table) => {
    setSelectedTable(table);
  };

  const handleClearTable = (tableId) => {
    updateTableStatus(tableId, 'available', null);
    setSelectedTable(null);
  };

  const tableOrders = selectedTable ? getOrdersByTable(selectedTable.id) : [];

  return (
    <div className="flex gap-6 h-[calc(100vh-140px)]">
      {/* Floor Plan */}
      <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        {/* Floor Selector */}
        <div className="flex gap-2 mb-6">
          {floors.map((floor) => (
            <button
              key={floor}
              onClick={() => setActiveFloor(floor)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                activeFloor === floor
                  ? 'bg-petpooja-orange text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {floor} Floor
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-green-600">
              {tables.filter(t => t.status === 'available').length}
            </p>
            <p className="text-sm text-green-700">Available</p>
          </div>
          <div className="bg-red-50 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-red-600">
              {tables.filter(t => t.status === 'occupied').length}
            </p>
            <p className="text-sm text-red-700">Occupied</p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-yellow-600">
              {tables.filter(t => t.status === 'reserved').length}
            </p>
            <p className="text-sm text-yellow-700">Reserved</p>
          </div>
        </div>

        {/* Table Grid */}
        <div className="grid grid-cols-4 gap-4">
          {floorTables.map((table) => (
            <button
              key={table.id}
              onClick={() => handleTableClick(table)}
              className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                selectedTable?.id === table.id
                  ? 'border-petpooja-orange ring-2 ring-petpooja-orange/30'
                  : getStatusColor(table.status)
              }`}
            >
              <p className="font-display font-bold text-lg">{table.name}</p>
              <div className="flex items-center gap-1 mt-2 text-sm">
                <Users size={14} />
                <span>{table.capacity}</span>
              </div>
              <p className="text-xs mt-1 opacity-75 capitalize">{table.status}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Table Details */}
      <div className="w-80 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        {selectedTable ? (
          <>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-display font-semibold text-xl text-gray-800">{selectedTable.name}</h3>
                <p className="text-sm text-gray-500">{selectedTable.floor} Floor • {selectedTable.capacity} seats</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(selectedTable.status)}`}>
                {selectedTable.status}
              </span>
            </div>

            {tableOrders.length > 0 ? (
              <div className="space-y-3">
                <h4 className="font-medium text-gray-700">Active Orders</h4>
                {tableOrders.map((order) => (
                  <div key={order.id} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">#{order.orderNumber}</span>
                      <span className="text-xs text-gray-500">{order.createdTime}</span>
                    </div>
                    <div className="space-y-1">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span className="text-gray-600">{item.name}</span>
                          <span className="font-medium">x{item.qty}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 pt-2 border-t border-gray-200 flex justify-between items-center">
                      <span className="font-semibold">₹{order.total}</span>
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <Receipt size={48} className="mx-auto mb-3 opacity-50" />
                <p>No active orders</p>
              </div>
            )}

            {selectedTable.status === 'occupied' && (
              <button
                onClick={() => handleClearTable(selectedTable.id)}
                className="w-full mt-4 py-2 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-900"
              >
                Clear Table
              </button>
            )}

            {selectedTable.status === 'available' && (
              <a
                href="/pos"
                className="block w-full mt-4 py-2 bg-petpooja-orange text-white rounded-lg font-medium text-center hover:bg-petpooja-orange-dark"
              >
                New Order
              </a>
            )}
          </>
        ) : (
          <div className="text-center py-8 text-gray-400">
            <Users size={48} className="mx-auto mb-3 opacity-50" />
            <p>Select a table to view details</p>
          </div>
        )}
      </div>
    </div>
  );
}
