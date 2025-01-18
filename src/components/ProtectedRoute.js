"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../app/context/AuthContext';

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      const path = window.location.pathname;
      if (path !== '/signin' && path !== '/signup') {
        router.push('/signin');
      }
    }
  }, [user, router]);
  if (!user) {
    return null;
  }

  return children;
}
