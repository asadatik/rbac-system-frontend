'use client';

import { useEffect, useState } from 'react';
import { User } from '@/types';
import { getAccessToken } from '@/lib/auth';
import apiClient from '@/lib/api';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = getAccessToken();
        if (!token) {
          setLoading(false);
          return;
        }

        const response = await apiClient.get('/auth/me');
        setUser(response.data.user);
      } catch (err) {
        setError('Failed to fetch user');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
};
