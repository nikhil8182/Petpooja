import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const pageTitles = {
  '/': 'Dashboard',
  '/pos': 'Point of Sale',
  '/tables': 'Table Management',
  '/orders': 'Orders',
  '/kot': 'Kitchen Display',
  '/menu': 'Menu Management',
  '/inventory': 'Inventory',
  '/reports': 'Reports',
  '/staff': 'Staff',
  '/customers': 'Customers',
  '/settings': 'Settings',
};

export default function Layout() {
  const location = useLocation();
  const title = pageTitles[location.pathname] || 'PetPooja';

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="ml-56">
        <Header title={title} />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
