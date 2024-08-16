import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

type ProtectedRouteProps = PropsWithChildren & {
  allowedRoles?: string;
};

export default function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.userInfo === undefined) {
      navigate('/signin', { replace: true });
    } else {
      if (allowedRoles != auth.userInfo?.roleName) {
        navigate('/access-denied', { replace: true });
      }
    }
  }, [navigate]);

  return children;
}
