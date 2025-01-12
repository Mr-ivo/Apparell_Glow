'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useTranslations } from '../hooks/useTranslations';

const SignUp = () => {
  const { t } = useTranslations();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirm_password: '', 
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) { 
      setError(t('auth.signUp.passwordMismatch'));
      return;
    }

    try {
      const response = await fetch('https://glow-backend-2nxl.onrender.com/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const userData = await response.json();

      if (response.ok) {
        const user = {
          email: formData.email,
          username: formData.username
        };
        
        localStorage.setItem('user', JSON.stringify(user));
        Cookies.set('user', JSON.stringify(user), { expires: 7 });
        
        window.location.href = '/dashboard';
      } else {
        setError(userData.message);
      }
    } catch (error) {
      setError(t('auth.signUp.error'));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">{t('auth.signUp.title')}</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="username">
              {t('auth.signUp.username')}
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="email">
              {t('auth.signUp.email')}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="password">
              {t('auth.signUp.password')}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="confirm_password">
              {t('auth.signUp.confirmPassword')}
            </label>
            <input
              type="password"
              id="confirm_password"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
          >
            {t('auth.signUp.button')}
          </button>
          <p className="mt-4 text-sm text-center">
            {t('auth.signUp.haveAccount')}{' '}
            <Link href="/signin" className="text-blue-600 hover:underline">
              {t('auth.signUp.signInLink')}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
