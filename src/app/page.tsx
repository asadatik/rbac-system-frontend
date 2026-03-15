'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAccessToken } from '@/lib/auth';

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const token = getAccessToken();
    console.log('Page - token:', token);
    if (token) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  }, [router]);

  return null;
}
