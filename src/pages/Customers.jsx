import { useState } from 'react';
import { customers, membershipLevels } from '../data/mockCustomers';
import { Search, Star, Crown, Gem, Calendar } from 'lucide-react';

export default function Customers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMembership, setSelectedMembership] = useState('all');

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm);
    const matchesMembership = selectedMembership === 'all' || customer.membership === selectedMembership;
    return matchesSearch && matchesMembership;
  });

  const getMembershipIcon = (level) => {
    switch (level) {
      case 'Platinum': return <Gem size={14} />;
      case 'Gold': return <Crown size={14} />;
      default: return <Star size={14} />;
    }
  };

  const getMembershipColor = (level) => {
    switch (level) {
      case 'Platinum': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Gold': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const stats = [
    { label: 'Total Customers', value: customers.length },
    { label: 'Platinum', value: customers.filter(c => c.membership === 'Platinum').length, color: 'text-purple-600' },
    { label: 'Gold', value: customers.filter(c => c.membership === 'Gold').length, color: 'text-yellow-600' },
    { label: 'Silver', value: customers.filter(c => c.membership === 'Silver').length, color: 'text-gray-600' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-gray-800">Customer Management</h2>
          <p className="text-gray-500">{customers.length} registered customers</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className={`font-display text-2xl font-bold ${stat.color || 'text-gray-800'}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by name or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm"
          />
        </div>
        <select
          value={selectedMembership}
          onChange={(e) => setSelectedMembership(e.target.value)}
          className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm"
        >
          <option value="all">All Memberships</option>
          {membershipLevels.map((level) => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Customer</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Contact</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Membership</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Visits</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Total Spent</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Last Visit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredCustomers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-petpooja-orange to-orange-400 rounded-full flex items-center justify-center text-white font-bold">
                      {customer.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{customer.name}</p>
                      {customer.birthday && (
                        <p className="text-xs text-gray-500">Birthday: {customer.birthday}</p>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  <p>{customer.phone}</p>
                  <p className="text-xs text-gray-400">{customer.email}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getMembershipColor(customer.membership)}`}>
                    {getMembershipIcon(customer.membership)}
                    {customer.membership}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {customer.totalVisits}
                </td>
                <td className="px-6 py-4">
                  <span className="font-semibold text-gray-800">₹{customer.totalSpent.toLocaleString()}</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    {customer.lastVisit}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
