import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Grid3X3, 
  Utensils, 
  FileText, 
  ChefHat, 
  Package, 
  BarChart3, 
  Users, 
  UserCircle, 
  Settings,
  LogOut
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const menuItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/pos', icon: ShoppingCart, label: 'POS' },
  { path: '/tables', icon: Grid3X3, label: 'Tables' },
  { path: '/orders', icon: Utensils, label: 'Orders' },
  { path: '/kot', icon: ChefHat, label: 'KOT' },
  { path: '/menu', icon: FileText, label: 'Menu' },
  { path: '/inventory', icon: Package, label: 'Inventory' },
  { path: '/reports', icon: BarChart3, label: 'Reports' },
  { path: '/staff', icon: Users, label: 'Staff' },
  { path: '/customers', icon: UserCircle, label: 'Customers' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar() {
  const { logout } = useAuthStore();

  return (
    <aside className="w-56 bg-gray-900 text-white flex flex-col h-screen fixed left-0 top-0">
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-petpooja-orange rounded-lg flex items-center justify-center">
            <span className="font-display font-bold text-xl text-white">P</span>
          </div>
          <div>
            <h1 className="font-display font-bold text-lg">PetPooja</h1>
            <p className="text-xs text-gray-400">Restaurant POS</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-petpooja-orange text-white'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`
                }
              >
                <item.icon size={20} />
                <span className="text-sm font-medium">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-all duration-200"
        >
          <LogOut size={20} />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
