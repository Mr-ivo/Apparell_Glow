'use client';
import { useState } from 'react';
import { Switch } from '@headlessui/react';
import { User, ShieldCheck, Bell, Sun, Moon } from 'lucide-react';

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Settings</h1>

      <div className="space-y-8">
        {/* Account Settings */}
        <section className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            <User className="inline-block mr-2 w-6 h-6 text-blue-500" />
            Account Settings
          </h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Save Changes
            </button>
          </form>
        </section>

        {/* Appearance */}
        <section className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            <Sun className="inline-block mr-2 w-6 h-6 text-yellow-500" />
            Appearance
          </h2>
          <div className="flex items-center justify-between">
            <span className="text-gray-800 dark:text-gray-300">Dark Mode</span>
            <Switch
              checked={darkMode}
              onChange={setDarkMode}
              className={`${
                darkMode ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'
              } relative inline-flex items-center h-6 rounded-full w-11`}
            >
              <span
                className={`${
                  darkMode ? 'translate-x-6' : 'translate-x-1'
                } inline-block w-4 h-4 transform bg-white rounded-full`}
              />
            </Switch>
          </div>
        </section>

        {/* Notifications */}
        <section className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            <Bell className="inline-block mr-2 w-6 h-6 text-green-500" />
            Notifications
          </h2>
          <div className="flex items-center justify-between">
            <span className="text-gray-800 dark:text-gray-300">Enable Notifications</span>
            <Switch
              checked={notificationsEnabled}
              onChange={setNotificationsEnabled}
              className={`${
                notificationsEnabled ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'
              } relative inline-flex items-center h-6 rounded-full w-11`}
            >
              <span
                className={`${
                  notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
                } inline-block w-4 h-4 transform bg-white rounded-full`}
              />
            </Switch>
          </div>
        </section>

        {/* Security */}
        <section className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            <ShieldCheck className="inline-block mr-2 w-6 h-6 text-red-500" />
            Security
          </h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Current Password
              </label>
              <input
                type="password"
                placeholder="Enter your current password"
                className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                New Password
              </label>
              <input
                type="password"
                placeholder="Enter your new password"
                className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Update Password
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
