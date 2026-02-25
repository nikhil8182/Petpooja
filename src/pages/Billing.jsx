import { useState } from 'react'
import { Printer, Download } from 'lucide-react'
import { orders } from '../data/sampleData'

export default function Billing() {
  const [selectedOrder, setSelectedOrder] = useState(orders[0])

  const subtotal = selectedOrder.items.reduce((s, i) => s + i.price * i.qty, 0)
  const gst = Math.round(subtotal * 0.05)
  const serviceCharge = Math.round(subtotal * 0.1)
  const total = subtotal + gst + serviceCharge

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Billing</h2>
        <p className="text-sm text-gray-500 mt-1">Generate bills for completed orders</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Selector */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="font-semibold text-gray-700 mb-3">Select Order</h3>
          <div className="space-y-2">
            {orders.map((order) => (
              <button
                key={order.id}
                onClick={() => setSelectedOrder(order)}
                className={`w-full text-left p-3 rounded-lg border transition-colors ${
                  selectedOrder.id === order.id
                    ? 'border-orange-400 bg-orange-50'
                    : 'border-gray-100 hover:bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-sm">{order.id}</span>
                  <span className="text-xs text-gray-500">Table {order.table}</span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">{order.items.length} items · {order.time}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Invoice */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="text-center border-b border-dashed border-gray-300 pb-4 mb-4">
            <h3 className="text-lg font-bold text-gray-800">Petpooja Restaurant</h3>
            <p className="text-xs text-gray-500">123 Food Street, Mumbai · +91 98765 43210</p>
            <p className="text-xs text-gray-500">GSTIN: 27XXXXX1234X1Z5</p>
          </div>

          <div className="flex justify-between text-sm text-gray-600 mb-4">
            <span>Invoice: {selectedOrder.id}</span>
            <span>Table: {selectedOrder.table}</span>
          </div>

          {/* Items */}
          <table className="w-full text-sm mb-4">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 text-gray-500 font-medium">Item</th>
                <th className="text-center py-2 text-gray-500 font-medium">Qty</th>
                <th className="text-right py-2 text-gray-500 font-medium">Price</th>
                <th className="text-right py-2 text-gray-500 font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              {selectedOrder.items.map((item, idx) => (
                <tr key={idx} className="border-b border-gray-100">
                  <td className="py-2">{item.name}</td>
                  <td className="py-2 text-center">{item.qty}</td>
                  <td className="py-2 text-right">₹{item.price}</td>
                  <td className="py-2 text-right font-medium">₹{item.price * item.qty}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="border-t border-dashed border-gray-300 pt-3 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">GST (5%)</span>
              <span>₹{gst}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Service Charge (10%)</span>
              <span>₹{serviceCharge}</span>
            </div>
            <div className="flex justify-between text-base font-bold pt-2 border-t border-gray-200">
              <span>Grand Total</span>
              <span className="text-orange-600">₹{total}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6">
            <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors">
              <Printer size={16} />
              Print Bill
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
              <Download size={16} />
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
