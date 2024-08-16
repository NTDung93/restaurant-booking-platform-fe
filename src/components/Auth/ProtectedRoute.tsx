import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '@/containers/SignIn/selectors';

type ProtectedRouteProps = PropsWithChildren;

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const userInfo = useSelector(selectUserInfo);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo === null) {
      navigate('/signin', { replace: true });
    }
  }, [navigate, userInfo]);

  return children;
}
