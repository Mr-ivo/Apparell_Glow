'use client';
import { useState } from 'react';
import { CheckCircle, XCircle, Filter, Search } from 'lucide-react';

const ordersData = [
  {
    id: 'ORD-001',
    customer: 'Sophia Carter',
    date: '2024-11-01',
    total: '$125.00',
    status: 'Completed',
  },
  {
    id: 'ORD-002',
    customer: 'Michael Smith',
    date: '2024-11-05',
    total: '$89.00',
    status: 'Pending',
  },
  {
    id: 'ORD-003',
    customer: 'Emily Johnson',
    date: '2024-11-08',
    total: '$200.00',
    status: 'Cancelled',
  },
];

export default function Orders() {
  const [orders, setOrders] = useState(ordersData);
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const handleFilterChange = (status) => setFilter(status);
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const filteredOrders = orders.filter((order) => {
    return (
      (filter === 'All' || order.status === filter) &&
      order.customer.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Order Management</h1>

      {/* Order Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <button
          className={`py-2 px-4 rounded-lg ${
            filter === 'All'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
          onClick={() => handleFilterChange('All')}
        >
          All
        </button>
        <button
          className={`py-2 px-4 rounded-lg ${
            filter === 'Completed'
              ? 'bg-green-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
          onClick={() => handleFilterChange('Completed')}
        >
          Completed
        </button>
        <button
          className={`py-2 px-4 rounded-lg ${
            filter === 'Pending'
              ? 'bg-yellow-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
          onClick={() => handleFilterChange('Pending')}
        >
          Pending
        </button>
        <button
          className={`py-2 px-4 rounded-lg ${
            filter === 'Cancelled'
              ? 'bg-red-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
          onClick={() => handleFilterChange('Cancelled')}
        >
          Cancelled
        </button>

        <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg ml-auto">
          <Search className="w-5 h-5 text-gray-400 ml-3" />
          <input
            type="text"
            placeholder="Search by customer..."
            className="bg-transparent border-none focus:outline-none p-2"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {/* Order Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
            <tr>
              <th className="py-4 px-6">Order ID</th>
              <th className="py-4 px-6">Customer</th>
              <th className="py-4 px-6">Date</th>
              <th className="py-4 px-6">Total</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-gray-100 dark:hover:bg-gray-700 border-t border-gray-200 dark:border-gray-700"
              >
                <td className="py-4 px-6">{order.id}</td>
                <td className="py-4 px-6">{order.customer}</td>
                <td className="py-4 px-6">{order.date}</td>
                <td className="py-4 px-6">{order.total}</td>
                <td className="py-4 px-6">
                  {order.status === 'Completed' && (
                    <span className="flex items-center text-green-600">
                      <CheckCircle className="w-5 h-5 mr-2" /> {order.status}
                    </span>
                  )}
                  {order.status === 'Pending' && (
                    <span className="flex items-center text-yellow-600">
                      <Filter className="w-5 h-5 mr-2" /> {order.status}
                    </span>
                  )}
                  {order.status === 'Cancelled' && (
                    <span className="flex items-center text-red-600">
                      <XCircle className="w-5 h-5 mr-2" /> {order.status}
                    </span>
                  )}
                </td>
                <td className="py-4 px-6">
                  <button className="text-blue-500 hover:underline mr-4">View</button>
                  <button className="text-green-500 hover:underline mr-4">Edit</button>
                  <button className="text-red-500 hover:underline">Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
