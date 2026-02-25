import { useState } from 'react'
import { Printer, Download, Receipt } from 'lucide-react'
import { useApp } from '../data/AppContext'
import { useToast } from '../components/Toast'

export default function Billing() {
  const { orders } = useApp()
  const toast = useToast()
  const [selectedOrder, setSelectedOrder] = useState(orders[0])

  if (!selectedOrder || orders.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Billing</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Generate bills for completed orders</p>
        </div>
        <div className="text-center py-16">
          <Receipt size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-3" />
          <p className="text-gray-500 dark:text-gray-400 font-medium">No orders to bill yet</p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Place an order first to generate a bill</p>
        </div>
      </div>
    )
  }

  const subtotal = selectedOrder.items.reduce((s, i) => s + i.price * i.qty, 0)
  const gst = Math.round(subtotal * 0.05)
  const serviceCharge = Math.round(subtotal * 0.1)
  const total = subtotal + gst + serviceCharge

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Billing</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Generate bills for completed orders</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Selector */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5">
          <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-3">Select Order</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {orders.map((order) => (
              <button
                key={order.id}
                onClick={() => setSelectedOrder(order)}
                className={`w-full text-left p-3 rounded-lg border transition-colors ${
                  selectedOrder.id === order.id
                    ? 'border-orange-400 bg-orange-50 dark:bg-orange-900/20'
                    : 'border-gray-100 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-sm dark:text-gray-200">{order.id}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Table {order.table}</span>
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{order.items.length} items · {order.time}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Invoice */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <div className="text-center border-b border-dashed border-gray-300 dark:border-gray-600 pb-4 mb-4">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">Petpooja Restaurant</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">123 Food Street, Mumbai · +91 98765 43210</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">GSTIN: 27XXXXX1234X1Z5</p>
          </div>

          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
            <span>Invoice: {selectedOrder.id}</span>
            <span>Table: {selectedOrder.table}</span>
          </div>

          <table className="w-full text-sm mb-4">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-600">
                <th className="text-left py-2 text-gray-500 dark:text-gray-400 font-medium">Item</th>
                <th className="text-center py-2 text-gray-500 dark:text-gray-400 font-medium">Qty</th>
                <th className="text-right py-2 text-gray-500 dark:text-gray-400 font-medium">Price</th>
                <th className="text-right py-2 text-gray-500 dark:text-gray-400 font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              {selectedOrder.items.map((item, idx) => (
                <tr key={idx} className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-2 dark:text-gray-200">{item.name}</td>
                  <td className="py-2 text-center dark:text-gray-300">{item.qty}</td>
                  <td className="py-2 text-right dark:text-gray-300">₹{item.price}</td>
                  <td className="py-2 text-right font-medium dark:text-gray-200">₹{item.price * item.qty}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="border-t border-dashed border-gray-300 dark:border-gray-600 pt-3 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
              <span className="dark:text-gray-300">₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">GST (5%)</span>
              <span className="dark:text-gray-300">₹{gst}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">Service Charge (10%)</span>
              <span className="dark:text-gray-300">₹{serviceCharge}</span>
            </div>
            <div className="flex justify-between text-base font-bold pt-2 border-t border-gray-200 dark:border-gray-600">
              <span className="dark:text-gray-100">Grand Total</span>
              <span className="text-orange-600">₹{total}</span>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={() => toast('Bill sent to printer', 'success')}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors"
            >
              <Printer size={16} />
              Print Bill
            </button>
            <button
              onClick={() => toast('PDF downloaded', 'success')}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <Download size={16} />
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
