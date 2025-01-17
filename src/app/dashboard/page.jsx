'use client';
import { useState } from 'react';
import Sidebar from '../../components/Sidebar'; 
import Overview from '../pages/Overview';
import Analytics from '../pages/Analytics';
import Products from '../pages/Products';
import Orders from '../pages/Orders';
import Customers from '../pages/Customers';
import Reports from '../pages/Reports';
import Support from '../pages/Support';
import Settings from '../pages/Settings';
import ProtectedRoute from '../../components/ProtectedRoute';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <div className={`${sidebarOpen ? 'ml-[280px]' : 'ml-[80px]'} transition-all duration-300`}>
          <header className="bg-white dark:bg-gray-800 shadow-sm h-16 fixed right-0 top-0 left-auto w-[calc(100%-280px)] z-20">
          </header>
          <main className="p-8 pt-24">
            {renderContent()}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
