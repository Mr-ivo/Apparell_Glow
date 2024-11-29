'use client';
import { useState } from 'react';
import Sidebar from '../../components/Sidebar';  // Correct import for Sidebar
// Import all pages directly from src/app/pages
import Overview from '../pages/Overview';
import Analytics from '../pages/Analytics';
import Products from '../pages/Products';
import Orders from '../pages/Orders';
import Customers from '../pages/Customers';
import Reports from '../pages/Reports';
import Support from '../pages/Support';
import Settings from '../pages/Settings';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Function to render the correct component based on activeTab
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview />;
      case 'analytics':
        return <Analytics />;
      case 'products':
        return <Products />;
      case 'orders':
        return <Orders />;
      case 'customers':
        return <Customers />;
      case 'reports':
        return <Reports />;
      case 'support':
        return <Support />;
      case 'settings':
        return <Settings />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div className={`${sidebarOpen ? 'ml-[280px]' : 'ml-[80px]'} transition-all duration-300`}>
        <header className="bg-white dark:bg-gray-800 shadow-sm h-16 fixed right-0 top-0 left-auto w-[calc(100%-280px)] z-20">
          {/* Add header content here */}
        </header>
        <main className="pt-24 px-6 pb-8">{renderContent()}</main>
      </div>
    </div>
  );
}
