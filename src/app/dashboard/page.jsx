'use client'
import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import styles from '../dashboard/page.module.css';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={styles.dashboard}>
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : styles.sidebarClosed}`}>
        <h2>Admin Dashboard</h2>
        <ul>
          <li className={activeTab === 'overview' ? styles.active : ''} onClick={() => setActiveTab('overview')}>Overview</li>
          <li className={activeTab === 'analytics' ? styles.active : ''} onClick={() => setActiveTab('analytics')}>Analytics</li>
          <li className={activeTab === 'products' ? styles.active : ''} onClick={() => setActiveTab('products')}>Products</li>
          <li className={activeTab === 'orders' ? styles.active : ''} onClick={() => setActiveTab('orders')}>Orders</li>
          <li className={activeTab === 'customers' ? styles.active : ''} onClick={() => setActiveTab('customers')}>Customers</li>
          <li className={activeTab === 'reports' ? styles.active : ''} onClick={() => setActiveTab('reports')}>Reports</li>
          <li className={activeTab === 'support' ? styles.active : ''} onClick={() => setActiveTab('support')}>Support</li>
          <li className={activeTab === 'settings' ? styles.active : ''} onClick={() => setActiveTab('settings')}>Settings</li>
          <li className={activeTab === 'users' ? styles.active : ''} onClick={() => setActiveTab('users')}>Users</li>
        </ul>
      </aside>

      <div className={styles.mainContent}>
        <header className={styles.header}>
          <FaBars className={styles.hamburger} onClick={toggleSidebar} />
          <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
        </header>

        <section className={styles.content}>
          {activeTab === 'overview' && <Overview />}
          {activeTab === 'analytics' && <Analytics />}
          {activeTab === 'products' && <Products />}
          {activeTab === 'orders' && <Orders />}
          {activeTab === 'customers' && <Customers />}
          {activeTab === 'reports' && <Reports />}
          {activeTab === 'support' && <Support />}
          {activeTab === 'settings' && <Settings />}
          {activeTab === 'users' && <Users />}
        </section>
      </div>
    </div>
  );
}

function Overview() {
  return (
    <div>
      <h2>Overview</h2>
      <p>Welcome to your dashboard. Here you can monitor and manage various aspects of your store.</p>
      <ul>
        <li>Total Sales: CAF45,000</li>
        <li>Total Orders: 1,230</li>
        <li>Total Customers: 980</li>
      </ul>
    </div>
  );
}

function Analytics() {
  return (
    <div>
      <h2>Analytics</h2>
      <p>View detailed analytics on your store’s performance.</p>
      <ul>
        <li>Daily Visitors: 1,000</li>
        <li>Bounce Rate: 35%</li>
        <li>Average Order Value: CAF50</li>
      </ul>
    </div>
  );
}

function Products() {
  return (
    <div>
      <h2>Products</h2>
      <p>Manage your product inventory.</p>
      <ul>
        <li>Total Products: 150</li>
        <li>Out of Stock: 5</li>
        <li>New Arrivals: 10</li>
      </ul>
      <button className={styles.btn}>Add New Product</button>
    </div>
  );
}

function Orders() {
  return (
    <div>
      <h2>Orders</h2>
      <p>View and manage customer orders.</p>
      <ul>
        <li>Pending Orders: 12</li>
        <li>Shipped Orders: 100</li>
        <li>Returned Orders: 2</li>
      </ul>
    </div>
  );
}

function Customers() {
  return (
    <div>
      <h2>Customers</h2>
      <p>Manage your customer information.</p>
      <ul>
        <li>New Customers: 20</li>
        <li>Returning Customers: 150</li>
        <li>VIP Customers: 5</li>
      </ul>
    </div>
  );
}

function Reports() {
  return (
    <div>
      <h2>Reports</h2>
      <p>Generate and view various reports.</p>
      <button className={styles.btn}>Generate Sales Report</button>
      <button className={styles.btn}>Generate Inventory Report</button>
    </div>
  );
}

function Support() {
  return (
    <div>
      <h2>Support</h2>
      <p>Access customer support and help center.</p>
      <ul>
        <li>Open Tickets: 2</li>
        <li>Closed Tickets: 15</li>
      </ul>
      <button className={styles.btn}>Contact Support</button>
    </div>
  );
}

function Settings() {
  return (
    <div>
      <h2>Settings</h2>
      <p>Manage store settings.</p>
      <ul>
        <li>Profile Settings</li>
        <li>Payment Settings</li>
        <li>Security Settings</li>
      </ul>
      <button className={styles.btn}>Update Settings</button>
    </div>
  );
}
function Users() {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
  ]);

  const [newUser, setNewUser] = useState({ name: '', email: '' });

  const addUser = () => {
    if (newUser.name && newUser.email) {
      setUsers([...users, { id: users.length + 1, ...newUser }]);
      setNewUser({ name: '', email: '' });
    }
  };

  const deleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div>
      <h2 className={styles.fine}>Users</h2>
      <p>Manage your users here.</p>

      <h3  className={styles.fine}>Add User</h3>
      <input className={styles.eat}
        type="text"
        placeholder="Name"
        value={newUser.name}
        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
      />
      <input className={styles.eat}
        type="email"
        placeholder="Email"
        value={newUser.email}
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
      />
      <button className={styles.btn3} onClick={addUser}>Add User</button>

      <h3 className={styles.fine}>User List</h3>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} ({user.email}) 
            <button onClick={() => deleteUser(user.id)} className={styles.btn3}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}


