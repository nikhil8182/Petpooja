import { useState } from 'react'
import { Search, Filter, UtensilsCrossed } from 'lucide-react'
import { useApp } from '../data/AppContext'
import { categories } from '../data/sampleData'

export default function Menu() {
  const { menu } = useApp()
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = menu.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Menu Management</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your restaurant menu items</p>
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
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400"
          />
        </div>
        <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
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
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <UtensilsCrossed size={40} className="mx-auto text-gray-300 dark:text-gray-600 mb-3" />
          <p className="text-gray-500 dark:text-gray-400 font-medium">No items found</p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Try a different search or category</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 transition-shadow hover:shadow-md ${
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
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100">{item.name}</h3>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-5">{item.category}</p>
                </div>
                <span className="text-lg font-bold text-gray-800 dark:text-gray-100">₹{item.price}</span>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  item.available ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300' : 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300'
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
      )}
    </div>
  )
}
