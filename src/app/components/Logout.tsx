'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      localStorage.removeItem('token');
      
    } else {
      alert('User Already logged out');
    }
    router.push('/login');
  }, [router]);

  return null;
};

export default Logout;
