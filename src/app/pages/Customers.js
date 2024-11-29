// src/app/pages/Customers.jsx

'use client';
import { useState } from 'react';
import { Pencil, Trash, PlusCircle } from 'lucide-react';

const initialUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '234-567-8901' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '345-678-9012' },
];

export default function Customers() {
  const [users, setUsers] = useState(initialUsers);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: '', email: '', phone: '' });

  // Function to handle adding or updating users
  const handleSave = () => {
    if (editMode) {
      const updatedUsers = users.map((user) =>
        user.id === currentUser.id ? currentUser : user
      );
      setUsers(updatedUsers);
    } else {
      setUsers([
        ...users,
        { id: users.length + 1, name: currentUser.name, email: currentUser.email, phone: currentUser.phone },
      ]);
    }
    setShowModal(false);
    setCurrentUser({ name: '', email: '', phone: '' });
    setEditMode(false);
  };

  // Function to handle deleting a user
  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  // Function to handle opening the edit modal
  const handleEdit = (user) => {
    setCurrentUser(user);
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
          }}
          className="flex items-center bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          <PlusCircle className="w-5 h-5 mr-2" /> Add Customer
        </button>
      </div>

      {/* Table for displaying users */}
      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left text-gray-600 dark:text-gray-300">Name</th>
              <th className="py-2 px-4 border-b text-left text-gray-600 dark:text-gray-300">Email</th>
              <th className="py-2 px-4 border-b text-left text-gray-600 dark:text-gray-300">Phone</th>
              <th className="py-2 px-4 border-b text-left text-gray-600 dark:text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="py-2 px-4 border-b text-gray-800 dark:text-gray-100">{user.name}</td>
                <td className="py-2 px-4 border-b text-gray-800 dark:text-gray-100">{user.email}</td>
                <td className="py-2 px-4 border-b text-gray-800 dark:text-gray-100">{user.phone}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleEdit(user)}
                    className="text-yellow-500 hover:text-yellow-600 mr-2"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
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

      {/* Modal for adding/editing a user */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-30">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">{editMode ? 'Edit Customer' : 'Add Customer'}</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
            >
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm text-gray-600 dark:text-gray-300">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full mt-1 p-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
                  value={currentUser.name}
                  onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
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
                <label htmlFor="phone" className="block text-sm text-gray-600 dark:text-gray-300">
                  Phone
                </label>
                <input
                  id="phone"
                  type="text"
                  className="w-full mt-1 p-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
                  value={currentUser.phone}
                  onChange={(e) => setCurrentUser({ ...currentUser, phone: e.target.value })}
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
                  {editMode ? 'Save Changes' : 'Add Customer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
