import { useState } from 'react';
import { useMenuStore } from '../store/menuStore';
import { useCartStore } from '../store/cartStore';
import { useOrderStore } from '../store/orderStore';
import { useTableStore } from '../store/tableStore';
import { 
  Plus, 
  Minus, 
  Trash2, 
  Printer, 
  Receipt, 
  CreditCard, 
  Banknote, 
  Smartphone,
  X,
  Check
} from 'lucide-react';

export default function POS() {
  const { categories, menuItems } = useMenuStore();
  const [activeCategory, setActiveCategory] = useState(1);
  const [showInvoice, setShowInvoice] = useState(false);
  const [showKOT, setShowKOT] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [showTableSelect, setShowTableSelect] = useState(false);

  const {
    items: cartItems,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    orderType,
    setOrderType,
    selectedTable,
    setSelectedTable,
    customerName,
    setCustomerName,
    discount,
    setDiscount,
    getSubtotal,
    getTax,
    getTotal
  } = useCartStore();

  const { addOrder } = useOrderStore();
  const { tables, updateTableStatus } = useTableStore();

  const filteredItems = menuItems.filter(item => item.category === activeCategory && item.available);

  const availableTables = tables.filter(t => t.status === 'available');

  const handleAddToCart = (item) => {
    addItem(item);
  };

  const handlePlaceOrder = () => {
    const order = {
      items: cartItems,
      subtotal: getSubtotal(),
      tax: getTax(),
      discount,
      total: getTotal(),
      type: orderType,
      tableId: selectedTable,
      customerName: orderType !== 'Dine-in' ? customerName : null,
      status: 'Pending',
      paymentMethod,
      staffId: 1
    };

    addOrder(order);

    if (orderType === 'Dine-in' && selectedTable) {
      updateTableStatus(selectedTable, 'occupied', null);
    }

    clearCart();
    setShowInvoice(false);
  };

  const handlePrintKOT = () => {
    setShowKOT(true);
  };

  return (
    <div className="flex h-[calc(100vh-140px)] gap-4">
      {/* Left Panel - Menu */}
      <div className="flex-1 flex flex-col bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Order Type Selector */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex gap-2 mb-3">
            {['Dine-in', 'Takeaway', 'Delivery'].map((type) => (
              <button
                key={type}
                onClick={() => setOrderType(type)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  orderType === type
                    ? 'bg-petpooja-orange text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {orderType === 'Dine-in' && (
            <button
              onClick={() => setShowTableSelect(true)}
              className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200 transition-all"
            >
              {selectedTable ? `Table ${selectedTable}` : 'Select Table'}
            </button>
          )}

          {orderType !== 'Dine-in' && (
            <input
              type="text"
              placeholder="Customer Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700 w-full"
            />
          )}
        </div>

        {/* Categories */}
        <div className="p-4 border-b border-gray-100 overflow-x-auto">
          <div className="flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-petpooja-orange text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <span className="mr-2">{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-3 gap-3">
            {filteredItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleAddToCart(item)}
                className="bg-gray-50 hover:bg-orange-50 border border-gray-100 hover:border-orange-200 rounded-xl p-3 text-left transition-all group"
              >
                <div className="aspect-video bg-gray-200 rounded-lg mb-2 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <p className="font-medium text-gray-800 text-sm truncate">{item.name}</p>
                <p className="text-petpooja-orange font-semibold">₹{item.price}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Cart */}
      <div className="w-96 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-display font-semibold text-lg text-gray-800">Current Order</h3>
          <p className="text-sm text-gray-500">{cartItems.length} items</p>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <Receipt size={48} className="mx-auto mb-3 opacity-50" />
              <p>No items in cart</p>
            </div>
          ) : (
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div key={item.itemId} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 text-sm">{item.name}</p>
                    <p className="text-gray-500 text-xs">₹{item.price} each</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.itemId, item.qty - 1)}
                      className="w-7 h-7 bg-white rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-200"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center font-medium">{item.qty}</span>
                    <button
                      onClick={() => updateQuantity(item.itemId, item.qty + 1)}
                      className="w-7 h-7 bg-white rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-200"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <div className="text-right w-16">
                    <p className="font-medium text-gray-800">₹{item.total}</p>
                  </div>
                  <button
                    onClick={() => removeItem(item.itemId)}
                    className="text-red-500 hover:bg-red-50 p-1 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Discount Input */}
        {cartItems.length > 0 && (
          <div className="p-4 border-t border-gray-100">
            <label className="text-sm text-gray-600 mb-1 block">Discount (₹)</label>
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
              placeholder="0"
            />
          </div>
        )}

        {/* Totals */}
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">₹{getSubtotal()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax (12%)</span>
              <span className="font-medium">₹{getTax()}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-₹{discount}</span>
              </div>
            )}
            <div className="flex justify-between text-lg font-semibold pt-2 border-t border-gray-200">
              <span>Total</span>
              <span className="text-petpooja-orange">₹{getTotal()}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 border-t border-gray-100 space-y-2">
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setPaymentMethod('Cash')}
              className={`p-2 rounded-lg text-xs font-medium transition-all ${
                paymentMethod === 'Cash' ? 'bg-petpooja-orange text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Banknote size={20} className="mx-auto mb-1" />
              Cash
            </button>
            <button
              onClick={() => setPaymentMethod('Card')}
              className={`p-2 rounded-lg text-xs font-medium transition-all ${
                paymentMethod === 'Card' ? 'bg-petpooja-orange text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              <CreditCard size={20} className="mx-auto mb-1" />
              Card
            </button>
            <button
              onClick={() => setPaymentMethod('UPI')}
              className={`p-2 rounded-lg text-xs font-medium transition-all ${
                paymentMethod === 'UPI' ? 'bg-petpooja-orange text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Smartphone size={20} className="mx-auto mb-1" />
              UPI
            </button>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={handlePrintKOT}
              disabled={cartItems.length === 0}
              className="flex-1 py-3 bg-gray-800 text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Printer size={18} />
              KOT
            </button>
            <button
              onClick={() => setShowInvoice(true)}
              disabled={cartItems.length === 0}
              className="flex-1 py-3 bg-petpooja-orange text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-petpooja-orange-dark disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Receipt size={18} />
              Pay
            </button>
          </div>
        </div>
      </div>

      {/* Table Selection Modal */}
      {showTableSelect && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-display font-semibold text-lg">Select Table</h3>
              <button onClick={() => setShowTableSelect(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <div className="space-y-2">
              {availableTables.map((table) => (
                <button
                  key={table.id}
                  onClick={() => {
                    setSelectedTable(table.name);
                    setShowTableSelect(false);
                  }}
                  className="w-full p-3 bg-gray-50 hover:bg-orange-50 rounded-lg text-left flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium text-gray-800">{table.name}</p>
                    <p className="text-sm text-gray-500">{table.floor} Floor • {table.capacity} seats</p>
                  </div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Invoice Modal */}
      {showInvoice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[400px]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-display font-semibold text-lg">Confirm Payment</h3>
              <button onClick={() => setShowInvoice(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>

            <div className="mb-6">
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Items</span>
                    <span>{cartItems.reduce((sum, item) => sum + item.qty, 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>₹{getSubtotal()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span>₹{getTax()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-₹{discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-semibold text-lg pt-2 border-t border-gray-200">
                    <span>Total</span>
                    <span className="text-petpooja-orange">₹{getTotal()}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                {['Cash', 'Card', 'UPI'].map((method) => (
                  <button
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium ${
                      paymentMethod === method 
                        ? 'bg-petpooja-orange text-white' 
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full py-3 bg-petpooja-orange text-white rounded-lg font-medium hover:bg-petpooja-orange-dark"
            >
              Complete Payment
            </button>
          </div>
        </div>
      )}

      {/* KOT Modal */}
      {showKOT && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[400px]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-display font-semibold text-lg">Kitchen Order Ticket</h3>
              <button onClick={() => setShowKOT(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>

            <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-4 mb-4">
              <div className="text-center mb-4">
                <h4 className="font-display font-bold text-xl">PETPOOJA</h4>
                <p className="text-sm text-gray-500">Kitchen Order</p>
                <p className="text-sm text-gray-500">{new Date().toLocaleTimeString()}</p>
              </div>

              <div className="border-t border-b border-gray-200 py-4 mb-4">
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.itemId} className="flex justify-between items-center">
                      <span className="font-medium">{item.name}</span>
                      <span className="font-bold">x{item.qty}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center text-sm text-gray-500">
                <p>Table: {selectedTable || 'Takeaway'}</p>
                <p>Type: {orderType}</p>
              </div>
            </div>

            <button
              onClick={() => {
                alert('KOT sent to kitchen!');
                setShowKOT(false);
                clearCart();
              }}
              className="w-full py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-900"
            >
              Print KOT
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
