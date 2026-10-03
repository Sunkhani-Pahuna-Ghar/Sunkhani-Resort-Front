import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  // If true, requires the real admin claim, not just any signed-in account.
  adminOnly?: boolean;
}

export default function ProtectedRoute({ children, adminOnly = false }: ProtectedRouteProps) {
  const { user, isAdmin, loading } = useAuth();

  if (loading) {
    return <div className="px-5 py-28 text-center text-ink-light">Loading…</div>;
  }

  if (!user) {
    return <Navigate to={adminOnly ? '/admin/login' : '/login'} replace />;
  }

  if (adminOnly && !isAdmin) {
    // Signed in, but not an admin -- e.g. a registered guest trying to reach /admin.
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
