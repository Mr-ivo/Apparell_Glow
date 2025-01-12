'use client';
import { TrendingUp, BarChart2, PieChart } from 'lucide-react';

export default function Analytics() {
  const metrics = [
    { id: 1, label: 'Total Sales', value: 'cfa80,200', trend: 'up' },
    { id: 2, label: 'Orders', value: '2,540', trend: 'up' },
    { id: 3, label: 'New Customers', value: '1,000', trend: 'up' },
    { id: 4, label: 'Returns', value: '15', trend: 'down' },
  ];

  const productTrends = [
    { id: 1, category: 'BodyLotion', value: 850 },
    { id: 2, category: 'Foundations', value: 620 },
    { id: 3, category: 'Moisturizers', value: 540 },
    { id: 4, category: 'Eyeshadows', value: 390 },
  ];

  return (
    <div className="min-h-screen bg-pink-50 dark:bg-gray-900 px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Analytics</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric) => (
          <div
            key={metric.id}
            className={`p-6 rounded-lg shadow-md flex items-center justify-between ${
              metric.trend === 'up'
                ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
            }`}
          >
            <div>
              <h2 className="text-sm font-medium">{metric.label}</h2>
              <p className="text-2xl font-bold">{metric.value}</p>
            </div>
            <TrendingUp className="w-8 h-8" />
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Top-Selling Categories</h2>
        <div className="space-y-4">
          {productTrends.map((trend) => (
            <div key={trend.id} className="flex items-center justify-between">
              <p className="text-gray-800 dark:text-gray-200">{trend.category}</p>
              <div className="w-2/3 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="h-2 bg-pink-500 rounded-full"
                  style={{ width: `${(trend.value / 850) * 100}%` }}
                />
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">{trend.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Sales Insights</h2>
          <p className="text-gray-600 dark:text-gray-300">
            BodyLotion and foundations are dominating sales, especially during promotional events. Seasonal sales see
            increased demand for moisturizers and skincare kits.
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Customer Preferences</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Most customers are interested in cruelty-free and vegan products. Social media campaigns have driven
            significant traffic and conversions.
          </p>
        </div>
      </div>
    </div>
  );
}
