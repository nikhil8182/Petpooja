import { useApp } from '../data/AppContext'
import { useToast } from '../components/Toast'

const statusConfig = {
  available: { bg: 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800', dot: 'bg-green-500', text: 'text-green-700 dark:text-green-400' },
  occupied: { bg: 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800', dot: 'bg-red-500', text: 'text-red-700 dark:text-red-400' },
  reserved: { bg: 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800', dot: 'bg-yellow-500', text: 'text-yellow-700 dark:text-yellow-400' },
}

const statusFlow = { available: 'occupied', occupied: 'reserved', reserved: 'available' }

export default function Tables() {
  const { tables, updateTableStatus } = useApp()
  const toast = useToast()

  function handleCycle(table) {
    const next = statusFlow[table.status]
    updateTableStatus(table.id, next)
    toast(`${table.name} set to ${next}`, 'info')
  }

  const counts = {
    available: tables.filter((t) => t.status === 'available').length,
    occupied: tables.filter((t) => t.status === 'occupied').length,
    reserved: tables.filter((t) => t.status === 'reserved').length,
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Table Management</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">View and manage restaurant tables</p>
      </div>

      {/* Summary */}
      <div className="flex gap-4 flex-wrap">
        {Object.entries(counts).map(([status, count]) => (
          <div key={status} className="flex items-center gap-2 text-sm">
            <span className={`w-2.5 h-2.5 rounded-full ${statusConfig[status].dot}`} />
            <span className="text-gray-600 dark:text-gray-300 capitalize">{status}: <strong>{count}</strong></span>
          </div>
        ))}
      </div>

      {/* Table Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {tables.map((table) => {
          const cfg = statusConfig[table.status]
          return (
            <button
              key={table.id}
              onClick={() => handleCycle(table)}
              className={`p-5 rounded-xl border-2 text-center transition-all hover:shadow-md ${cfg.bg}`}
            >
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{table.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{table.seats} seats</p>
              <p className={`text-xs font-semibold mt-2 capitalize ${cfg.text}`}>{table.status}</p>
            </button>
          )
        })}
      </div>

      <p className="text-xs text-gray-400 dark:text-gray-500">Click a table to cycle its status</p>
    </div>
  )
}
