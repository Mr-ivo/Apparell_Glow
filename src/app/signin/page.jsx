'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useTranslations } from '../hooks/useTranslations';

const SignIn = () => {
  const { t } = useTranslations();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://glow-backend-2nxl.onrender.com/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const userData = await response.json();

      if (response.ok) {
        const user = { 
          email: email,
          username: userData.username || email.split('@')[0]
        };
        
        localStorage.setItem('user', JSON.stringify(user));
        Cookies.set('user', JSON.stringify(user), { expires: 7 });
        
        window.location.href = '/dashboard';
      } else {
        setError(userData.message);
      }
    } catch (error) {
      setError(t('auth.signIn.error'));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">{t('auth.signIn.title')}</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="email">
              {t('auth.signIn.email')}
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="password">
              {t('auth.signIn.password')}
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
          >
            {t('auth.signIn.button')}
          </button>
          <p className="mt-4 text-sm text-center">
            {t('auth.signIn.noAccount')}{' '}
            <Link href="/signup" className="text-blue-600 hover:underline">
              {t('auth.signIn.signUpLink')}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
