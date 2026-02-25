import { NavLink, useLocation } from 'react-router-dom'
import { LayoutDashboard, UtensilsCrossed, ClipboardList, Grid3X3, Receipt, PlusCircle, Menu, X, Moon, Sun } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useTheme } from '../data/ThemeContext'

const links = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/new-order', icon: PlusCircle, label: 'New Order' },
  { to: '/menu', icon: UtensilsCrossed, label: 'Menu' },
  { to: '/orders', icon: ClipboardList, label: 'Orders' },
  { to: '/tables', icon: Grid3X3, label: 'Tables' },
  { to: '/billing', icon: Receipt, label: 'Billing' },
]

export default function Sidebar() {
  const [open, setOpen] = useState(false)
  const { dark, toggle } = useTheme()
  const location = useLocation()

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  const navContent = (
    <>
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-orange-400">Petpooja</h1>
          <p className="text-xs text-gray-400 mt-0.5">Restaurant POS</p>
        </div>
        <button onClick={() => setOpen(false)} className="lg:hidden p-1 text-gray-400 hover:text-white">
          <X size={20} />
        </button>
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
      <div className="p-4 border-t border-gray-700 space-y-3">
        <button
          onClick={toggle}
          className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors w-full"
        >
          {dark ? <Sun size={14} /> : <Moon size={14} />}
          {dark ? 'Light Mode' : 'Dark Mode'}
        </button>
        <p className="text-xs text-gray-600">Study Demo v1.0</p>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile header bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-gray-900 text-white flex items-center justify-between px-4 py-3">
        <button onClick={() => setOpen(true)} className="p-1">
          <Menu size={22} />
        </button>
        <h1 className="text-lg font-bold text-orange-400">Petpooja</h1>
        <button onClick={toggle} className="p-1 text-gray-400">
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setOpen(false)}>
          <aside
            className="w-64 bg-gray-900 text-white min-h-screen flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {navContent}
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-56 bg-gray-900 text-white min-h-screen flex-col shrink-0">
        {navContent}
      </aside>
    </>
  )
}
