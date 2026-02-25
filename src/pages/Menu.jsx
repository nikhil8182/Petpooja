import { useState } from 'react'
import { Search, Filter } from 'lucide-react'
import { menuItems, categories } from '../data/sampleData'

export default function Menu() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = menuItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Menu Management</h2>
        <p className="text-sm text-gray-500 mt-1">Manage your restaurant menu items</p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search menu items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400"
          />
        </div>
        <div className="flex items-center gap-1.5 text-gray-500">
          <Filter size={14} />
          <span className="text-xs font-medium">{filtered.length} items</span>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              activeCategory === cat
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className={`bg-white rounded-xl border p-4 transition-shadow hover:shadow-md ${
              !item.available ? 'opacity-50' : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-sm border-2 ${
                    item.veg ? 'border-green-600' : 'border-red-600'
                  }`}>
                    <span className={`block w-1.5 h-1.5 rounded-full m-auto mt-0.5 ${
                      item.veg ? 'bg-green-600' : 'bg-red-600'
                    }`} />
                  </span>
                  <h3 className="font-semibold text-gray-800">{item.name}</h3>
                </div>
                <p className="text-xs text-gray-500 mt-1 ml-5">{item.category}</p>
              </div>
              <span className="text-lg font-bold text-gray-800">₹{item.price}</span>
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                item.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {item.available ? 'Available' : 'Unavailable'}
              </span>
              <button className="text-xs text-orange-600 hover:text-orange-700 font-medium">
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
