import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RootState } from 'src/services/store';

interface ProtectedRouteProps {
  children: ReactNode;
  unAuth?: boolean;
}
export const ProtectedRoute = ({
  children,
  unAuth = false
}: ProtectedRouteProps) => {
  const { user } = useSelector((state: RootState) => state.user);
  const isAuthenticated = !!user;
  const location = useLocation();
  if (unAuth && isAuthenticated) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate to={from} replace />;
  }
  if (!unAuth && !isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }
  return <>{children}</>;
};
