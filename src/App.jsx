import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Menu from './pages/Menu'
import Orders from './pages/Orders'
import Tables from './pages/Tables'
import Billing from './pages/Billing'

function App() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/tables" element={<Tables />} />
          <Route path="/billing" element={<Billing />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
