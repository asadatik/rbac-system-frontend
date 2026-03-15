'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { User } from '@/types';
import { clearTokens } from '@/lib/auth';

interface NavbarProps {
  user: User | null;
}

export const Navbar = ({ user }: NavbarProps) => {
  const router = useRouter();

  const handleLogout = () => {
    clearTokens();
    router.push('/login');
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border-b border-gray-200 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">RBAC Dashboard</h1>

        <div className="flex items-center gap-4">
          {user && (
            <>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-gray-500 capitalize text-xs">{user.role}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="px-3 py-1 text-sm bg-red-50 text-red-600 rounded hover:bg-red-100 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
};
