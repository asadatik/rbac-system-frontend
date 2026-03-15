'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Navbar } from '@/components/Navbar';
import { RoleGuard } from '@/components/RoleGuard';
import { getAccessToken } from '@/lib/auth';

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  
console.log('DashboardPage user:', user);

  useEffect(() => {
    if (!loading && !getAccessToken()) {
      router.push('/login');
    }
  }, [loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <Navbar user={user} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome, {user?.name}!</h2>
            <p className="text-gray-600">
              Role: <span className="font-semibold capitalize">{user?.role}</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-lg shadow p-6 border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">User Profile</h3>
              <p className="text-sm text-gray-600">Email: {user?.email}</p>
              <p className="text-sm text-gray-600 mt-1">
                Joined: {user?.createdAt && new Date(user.createdAt).toLocaleDateString()}
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-lg shadow p-6 border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Permissions</h3>
              <p className="text-sm text-gray-600">{user?.permissions.length || 0} permissions</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {user?.permissions.slice(0, 3).map((perm) => (
                  <span
                    key={perm}
                    className="inline-block px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded"
                  >
                    {perm}
                  </span>
                ))}
                {(user?.permissions.length || 0) > 3 && (
                  <span className="text-xs text-gray-500">
                    +{(user?.permissions.length || 0) - 3} more
                  </span>
                )}
              </div>
            </motion.div>

            <RoleGuard user={user} requiredRole="admin">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-lg shadow p-6 border border-gray-200"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Admin Panel</h3>
                <p className="text-sm text-gray-600">You have admin access</p>
                <button className="mt-3 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                  Manage Users
                </button>
              </motion.div>
            </RoleGuard>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">All Permissions</h3>
            <div className="flex flex-wrap gap-2">
              {user?.permissions.map((perm) => (
                <span
                  key={perm}
                  className="inline-block px-3 py-1 text-sm bg-green-50 text-green-700 rounded-full border border-green-200"
                >
                  {perm}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </ProtectedRoute>
  );
}
