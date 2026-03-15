import { hasRole, hasPermission } from '@/lib/auth';
import { User } from '@/types';

interface RoleGuardProps {
  user: User | null;
  requiredRole?: string;
  requiredPermission?: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const RoleGuard = ({
  user,
  requiredRole,
  requiredPermission,
  children,
  fallback = null,
}: RoleGuardProps) => {
  if (!user) return fallback;

  const roleCheck = requiredRole ? hasRole(user.role, requiredRole) : true;
  const permissionCheck = requiredPermission
    ? hasPermission(user.permissions, requiredPermission)
    : true;

  if (roleCheck && permissionCheck) {
    return <>{children}</>;
  }

  return fallback;
};
