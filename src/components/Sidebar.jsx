import { NavLink } from 'react-router-dom'
import { LayoutDashboard, UtensilsCrossed, ClipboardList, Grid3X3, Receipt } from 'lucide-react'

const links = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/menu', icon: UtensilsCrossed, label: 'Menu' },
  { to: '/orders', icon: ClipboardList, label: 'Orders' },
  { to: '/tables', icon: Grid3X3, label: 'Tables' },
  { to: '/billing', icon: Receipt, label: 'Billing' },
]

export default function Sidebar() {
  return (
    <aside className="w-56 bg-gray-900 text-white min-h-screen flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold text-orange-400">Petpooja</h1>
        <p className="text-xs text-gray-400 mt-0.5">Restaurant POS</p>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-orange-500 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-700 text-xs text-gray-500">
        Study Demo v1.0
      </div>
    </aside>
  )
}
