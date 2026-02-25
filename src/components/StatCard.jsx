export default function StatCard({ icon: Icon, label, value, sub, color = 'text-orange-500' }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className={`text-2xl font-bold mt-1 ${color}`}>{value}</p>
          {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <Icon size={22} className="text-gray-400" />
        </div>
      </div>
    </div>
  )
}
