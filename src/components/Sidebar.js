import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  BarChart2,
  Package,
  ShoppingCart,
  Users,
  FileText,
  HelpCircle,
  Settings,
  LogOut,
  Menu,
} from 'lucide-react';


const menuItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'analytics', label: 'Analytics', icon: BarChart2 },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'orders', label: 'Orders', icon: ShoppingCart },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'reports', label: 'Reports', icon: FileText },
  { id: 'support', label: 'Support', icon: HelpCircle },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }) {
  const handleLogout = () => console.log('Logging out...')
  ;

  return (
    <motion.aside
      initial={false}
      animate={{
        width: sidebarOpen ? 280 : 80,
        transition: { duration: 0.3 },
      }}
      className="fixed left-0 top-0 h-screen bg-white dark:bg-gray-800 shadow-lg z-30"
    >
      <div className="p-4 flex items-center justify-between">
        {sidebarOpen && (
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-xl font-bold text-gray-800 dark:text-white"
          >
            Admin Dashboard
          </motion.h2>
        )}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        </button>
      </div>
      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center p-4 ${
                activeTab === item.id
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
              }`}
            >
              <Icon className="w-5 h-5" />
              {sidebarOpen && <span className="ml-4 font-medium">{item.label}</span>}
            </motion.button>
          );
        })}
      </nav>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleLogout}
        className="absolute bottom-4 left-4 right-4 p-4 flex items-center text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
      >
        <LogOut className="w-5 h-5" />
        {sidebarOpen && <span className="ml-4 font-medium">Logout</span>}
      </motion.button>
    </motion.aside>
  );
}
