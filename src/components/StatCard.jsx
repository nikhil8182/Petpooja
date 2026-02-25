export default function StatCard({ icon: Icon, label, value, sub, color = 'text-orange-500' }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
          <p className={`text-2xl font-bold mt-1 ${color}`}>{value}</p>
          {sub && <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{sub}</p>}
        </div>
        <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <Icon size={22} className="text-gray-400" />
        </div>
      </div>
    </div>
  )
}
