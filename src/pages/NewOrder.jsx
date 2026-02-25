import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Plus, Minus, Trash2, ChevronRight, ShoppingCart, CheckCircle } from 'lucide-react'
import { useApp } from '../data/AppContext'
import { useToast } from '../components/Toast'
import { categories } from '../data/sampleData'

const STEPS = ['Select Table', 'Add Items', 'Review & Place']

export default function NewOrder() {
  const { menu, tables, placeOrder } = useApp()
  const toast = useToast()
  const navigate = useNavigate()

  const [step, setStep] = useState(0)
  const [selectedTable, setSelectedTable] = useState(null)
  const [cart, setCart] = useState([])
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [placedOrderId, setPlacedOrderId] = useState(null)

  const availableTables = tables.filter((t) => t.status === 'available')

  function addToCart(item) {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id)
      if (existing) {
        return prev.map((c) => (c.id === item.id ? { ...c, qty: c.qty + 1 } : c))
      }
      return [...prev, { ...item, qty: 1 }]
    })
  }

  function updateQty(itemId, delta) {
    setCart((prev) =>
      prev
        .map((c) => (c.id === itemId ? { ...c, qty: c.qty + delta } : c))
        .filter((c) => c.qty > 0)
    )
  }

  function removeFromCart(itemId) {
    setCart((prev) => prev.filter((c) => c.id !== itemId))
  }

  const cartTotal = cart.reduce((s, c) => s + c.price * c.qty, 0)
  const cartCount = cart.reduce((s, c) => s + c.qty, 0)

  const filteredMenu = menu.filter((item) => {
    if (!item.available) return false
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase())
    const matchesCat = activeCategory === 'All' || item.category === activeCategory
    return matchesSearch && matchesCat
  })

  function handlePlaceOrder() {
    const orderId = placeOrder({ tableId: selectedTable.id, items: cart })
    setPlacedOrderId(orderId)
    setStep(3)
    toast(`Order ${orderId} placed for Table ${selectedTable.name}`, 'success')
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">New Order</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Create a new order for a table</p>
      </div>

      {/* Step Indicator */}
      {step < 3 && (
        <div className="flex items-center gap-2 flex-wrap">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <button
                onClick={() => i < step && setStep(i)}
                disabled={i > step}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  i === step
                    ? 'bg-orange-500 text-white'
                    : i < step
                    ? 'bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 hover:bg-orange-200 cursor-pointer'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-400'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">
                  {i + 1}
                </span>
                <span className="hidden sm:inline">{label}</span>
              </button>
              {i < STEPS.length - 1 && <ChevronRight size={14} className="text-gray-300 dark:text-gray-600" />}
            </div>
          ))}
        </div>
      )}

      {/* Step 1: Select Table */}
      {step === 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-700 dark:text-gray-200">Choose an available table</h3>
          {availableTables.length === 0 ? (
            <div className="text-center py-12 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">No tables available right now.</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Free up a table from Table Management first</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {availableTables.map((table) => (
                <button
                  key={table.id}
                  onClick={() => {
                    setSelectedTable(table)
                    setStep(1)
                  }}
                  className="p-5 rounded-xl border-2 border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800 text-center transition-all hover:shadow-md hover:border-orange-300"
                >
                  <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{table.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{table.seats} seats</p>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Step 2: Add Items */}
      {step === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search menu..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                />
              </div>
              <span className="text-xs text-gray-400 whitespace-nowrap">
                Table {selectedTable?.name}
              </span>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                    activeCategory === cat
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredMenu.map((item) => {
                const inCart = cart.find((c) => c.id === item.id)
                return (
                  <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${item.veg ? 'bg-green-500' : 'bg-red-500'}`} />
                      <div>
                        <p className="text-sm font-medium dark:text-gray-200">{item.name}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">{item.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold dark:text-gray-200">₹{item.price}</span>
                      {inCart ? (
                        <div className="flex items-center gap-1.5 bg-orange-50 dark:bg-orange-900/30 rounded-lg px-1">
                          <button onClick={() => updateQty(item.id, -1)} className="p-1 text-orange-600 hover:bg-orange-100 dark:hover:bg-orange-900/50 rounded">
                            <Minus size={14} />
                          </button>
                          <span className="text-sm font-bold text-orange-600 dark:text-orange-400 w-5 text-center">{inCart.qty}</span>
                          <button onClick={() => updateQty(item.id, 1)} className="p-1 text-orange-600 hover:bg-orange-100 dark:hover:bg-orange-900/50 rounded">
                            <Plus size={14} />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(item)}
                          className="p-1.5 text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/30 rounded-lg transition-colors"
                        >
                          <Plus size={18} />
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Cart Sidebar */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5 h-fit sticky top-6">
            <div className="flex items-center gap-2 mb-4">
              <ShoppingCart size={18} className="text-gray-500 dark:text-gray-400" />
              <h3 className="font-semibold text-gray-700 dark:text-gray-200">Cart</h3>
              <span className="ml-auto text-xs bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400 px-2 py-0.5 rounded-full font-medium">
                {cartCount} items
              </span>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart size={28} className="mx-auto text-gray-300 dark:text-gray-600 mb-2" />
                <p className="text-sm text-gray-400 dark:text-gray-500">No items added yet</p>
              </div>
            ) : (
              <>
                <div className="space-y-3 max-h-80 overflow-y-auto mb-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate dark:text-gray-200">{item.name}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">₹{item.price} x {item.qty}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold dark:text-gray-200">₹{item.price * item.qty}</span>
                        <button onClick={() => removeFromCart(item.id)} className="p-1 text-gray-400 hover:text-red-500">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-100 dark:border-gray-700 pt-3 mb-4">
                  <div className="flex justify-between font-bold dark:text-gray-100">
                    <span>Total</span>
                    <span className="text-orange-600">₹{cartTotal}</span>
                  </div>
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="w-full py-2.5 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                >
                  Review Order
                  <ChevronRight size={16} />
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Step 3: Review & Place */}
      {step === 2 && (
        <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 space-y-5">
          <div className="text-center">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">Order Summary</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Table {selectedTable?.name} · {cart.length} items</p>
          </div>

          <div className="space-y-2">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-300">
                  {item.name} <span className="text-gray-400 dark:text-gray-500">x{item.qty}</span>
                </span>
                <span className="font-medium dark:text-gray-200">₹{item.price * item.qty}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-dashed border-gray-300 dark:border-gray-600 pt-3">
            <div className="flex justify-between text-lg font-bold dark:text-gray-100">
              <span>Total</span>
              <span className="text-orange-600">₹{cartTotal}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep(1)}
              className="flex-1 py-2.5 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Back to Menu
            </button>
            <button
              onClick={handlePlaceOrder}
              className="flex-1 py-2.5 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors"
            >
              Place Order
            </button>
          </div>
        </div>
      )}

      {/* Success */}
      {step === 3 && (
        <div className="max-w-md mx-auto text-center py-12 space-y-4">
          <CheckCircle size={64} className="mx-auto text-green-500" />
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Order Placed!</h3>
          <p className="text-gray-500 dark:text-gray-400">
            Order <span className="font-semibold text-gray-800 dark:text-gray-200">{placedOrderId}</span> has been
            sent to the kitchen for Table {selectedTable?.name}
          </p>
          <div className="flex gap-3 justify-center pt-4">
            <button
              onClick={() => navigate('/orders')}
              className="px-5 py-2.5 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors"
            >
              View Orders
            </button>
            <button
              onClick={() => { setStep(0); setCart([]); setSelectedTable(null); setPlacedOrderId(null) }}
              className="px-5 py-2.5 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              New Order
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
