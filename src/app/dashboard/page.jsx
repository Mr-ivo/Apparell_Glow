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
      <div className="flex h-screen bg-gray-100">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <main className={`flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
          <div className="container mx-auto px-6 py-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
