 'use client';
import { ShoppingCart, Users, Package, TrendingUp } from 'lucide-react';

export default function Overview() {
  const activities = [
    { id: 1, message: 'New order placed by John Doe', timestamp: '10 mins ago' },
    { id: 2, message: 'Customer Sarah Johnson signed up', timestamp: '30 mins ago' },
    { id: 3, message: 'Product "Smartphone" added to inventory', timestamp: '1 hour ago' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Sales</h2>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">cfa30,000</p>
          </div>
          <TrendingUp className="w-10 h-10 text-blue-500" />
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-sm font-medium text-gray-600 dark:text-gray-400">Orders</h2>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">1,000</p>
          </div>
          <ShoppingCart className="w-10 h-10 text-green-500" />
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-sm font-medium text-gray-600 dark:text-gray-400">Customers</h2>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">820</p>
          </div>
          <Users className="w-10 h-10 text-orange-500" />
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-sm font-medium text-gray-600 dark:text-gray-400">Products</h2>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">156</p>
          </div>
          <Package className="w-10 h-10 text-red-500" />
        </div>
      </div>

      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Recent Activities</h2>
        <ul className="space-y-4">
          {activities.map((activity) => (
            <li key={activity.id} className="flex items-center justify-between">
              <p className="text-gray-800 dark:text-gray-200">{activity.message}</p>
              <span className="text-sm text-gray-500 dark:text-gray-400">{activity.timestamp}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
