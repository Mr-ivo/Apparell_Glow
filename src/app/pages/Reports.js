 'use client';
import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Calendar, BarChart, TrendingUp } from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Reports() {
  const [timeRange, setTimeRange] = useState('Last 30 Days');

  const salesData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Revenue ($)',
        data: [1500, 2000, 1800, 2200],
        backgroundColor: '#4F46E5',
        borderRadius: 8,
      },
    ],
  };

  const topProducts = [
    { name: 'Hydrating Lip Balm', sales: 120 },
    { name: 'Glow Serum', sales: 95 },
    { name: 'Matte Lipstick', sales: 85 },
  ];

  const metrics = [
    { title: 'Total Revenue', value: '$7,500', icon: <BarChart className="w-6 h-6 text-blue-500" /> },
    { title: 'Total Orders', value: '320', icon: <Calendar className="w-6 h-6 text-yellow-500" /> },
    { title: 'Top Product', value: 'Hydrating Lip Balm', icon: <TrendingUp className="w-6 h-6 text-green-500" /> },
  ];

  const handleTimeRangeChange = (range) => setTimeRange(range);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Reports</h1>

      <div className="flex items-center gap-4 mb-8">
        {['Last 7 Days', 'Last 30 Days', 'Last 6 Months'].map((range) => (
          <button
            key={range}
            className={`py-2 px-4 rounded-lg ${
              timeRange === range
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
            onClick={() => handleTimeRangeChange(range)}
          >
            {range}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {metrics.map((metric, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 flex items-center gap-4"
          >
            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full">
              {metric.icon}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{metric.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{metric.value}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-8">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Revenue Trend</h3>
        <Bar
          data={salesData}
          options={{
            responsive: true,
            plugins: {
              legend: { display: false },
            },
            scales: {
              x: {
                type: 'category',
              },
              y: {
                type: 'linear',
                beginAtZero: true,
              },
            },
          }}
        />
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Top-Selling Products</h3>
        <ul>
          {topProducts.map((product, idx) => (
            <li
              key={idx}
              className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700"
            >
              <span className="text-gray-800 dark:text-gray-300">{product.name}</span>
              <span className="font-semibold text-gray-800 dark:text-white">{product.sales} Sales</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
