 'use client';
import { useState, useEffect } from 'react';
import { Pencil, Trash, PlusCircle } from 'lucide-react';

export default function Customers() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentUser, setCurrentUser] = useState({ username: '', email: '', password: '', confirmPassword: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://glow-backend-2nxl.onrender.com/api/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSave = async () => {
    if (!currentUser.username || !currentUser.email || !currentUser.password || !currentUser.confirmPassword) {
      alert('All fields are required!');
      return;
    }

    if (currentUser.password !== currentUser.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const endpoint = editMode
        ? `https://glow-backend-2nxl.onrender.com/api/users/${currentUser._id}`
        : `https://glow-backend-2nxl.onrender.com/api/users`;

      const method = editMode ? 'PUT' : 'POST';
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentUser),
      });

      if (response.ok) {
        fetchUsers();
        setShowModal(false);
        setCurrentUser({ username: '', email: '', password: '', confirmPassword: '' });
        setEditMode(false);
      } else {
        const error = await response.json();
        console.error('Error saving user:', error);
        alert('Failed to save user. Check the console for details.');
      }
    } catch (error) {
      console.error('Error saving user:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      const response = await fetch(`https://glow-backend-2nxl.onrender.com/api/users/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchUsers(); // Refresh users
      } else {
        const error = await response.json();
        console.error('Error deleting user:', error);
        alert('Failed to delete user. Check the console for details.');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleEdit = (user) => {
    setCurrentUser({ ...user, confirmPassword: user.password }); // Populate confirmPassword for editing
    setEditMode(true);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Customers</h1>
        <button
          onClick={() => {
            setEditMode(false);
            setShowModal(true);
            setCurrentUser({ username: '', email: '', password: '', confirmPassword: '' }); // Reset form
          }}
          className="flex items-center bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          <PlusCircle className="w-5 h-5 mr-2" /> Add Customer
        </button>
      </div>

      {/* User Table */}
      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left text-gray-600 dark:text-gray-300">Username</th>
              <th className="py-2 px-4 border-b text-left text-gray-600 dark:text-gray-300">Email</th>
              <th className="py-2 px-4 border-b text-left text-gray-600 dark:text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="py-2 px-4 border-b text-gray-800 dark:text-gray-100">{user.username}</td>
                <td className="py-2 px-4 border-b text-gray-800 dark:text-gray-100">{user.email}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleEdit(user)}
                    className="text-yellow-500 hover:text-yellow-600 mr-2"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Add/Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-30">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">{editMode ? 'Edit User' : 'Add User'}</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
            >
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm text-gray-600 dark:text-gray-300">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  className="w-full mt-1 p-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
                  value={currentUser.username}
                  onChange={(e) => setCurrentUser({ ...currentUser, username: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm text-gray-600 dark:text-gray-300">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full mt-1 p-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
                  value={currentUser.email}
                  onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm text-gray-600 dark:text-gray-300">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="w-full mt-1 p-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
                  value={currentUser.password}
                  onChange={(e) => setCurrentUser({ ...currentUser, password: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-sm text-gray-600 dark:text-gray-300">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  className="w-full mt-1 p-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
                  value={currentUser.confirmPassword}
                  onChange={(e) => setCurrentUser({ ...currentUser, confirmPassword: e.target.value })}
                  required
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                  {editMode ? 'Save Changes' : 'Add User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
