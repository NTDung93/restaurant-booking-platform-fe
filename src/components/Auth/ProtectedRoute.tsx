import { PropsWithChildren, useEffect } from 'react';
import { useAuth } from './AuthProvider';
import { useNavigate } from 'react-router-dom';

type ProtectedRouteProps = PropsWithChildren;

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token === null) {
      navigate('/signin', { replace: true });
    }
  }, [navigate, token]);

  return children;
}
