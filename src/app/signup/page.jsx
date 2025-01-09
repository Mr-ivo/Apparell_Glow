'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const SignUp = () => {
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
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Sign-Up successful! Please sign in.');
        router.push('/signin'); 
      } else {
        const result = await response.json();
        setError(result.message);
      }
    } catch (error) {
      setError('There was an error signing up. Please try again later.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-bold mb-3 text-center">Sign Up</h2>
        {error && <p className="text-red-500 mb-3">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="block text-sm font-medium mb-1" htmlFor="username">
              Username:
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
          <div className="mb-2">
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email:
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
          <div className="mb-2">
            <label className="block text-sm font-medium mb-1" htmlFor="password">
              Password:
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
          <div className="mb-2">
            <label className="block text-sm font-medium mb-1" htmlFor="confirm_password"> 
              Confirm Password:
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
            Sign Up
          </button>
          <p className="mt-3 text-sm text-center">
            Already have an account?{' '}
            <Link href="/signin" className="text-blue-600 hover:underline">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
