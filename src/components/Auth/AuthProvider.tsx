import { selectUserToken } from '@/containers/SignIn/selectors';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useSelector } from 'react-redux';

const AuthContext = createContext<string | null>(null);

export default function AuthProvider({ children }: PropsWithChildren) {
  const token = useSelector(selectUserToken);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    setAccessToken(token?.accessToken ? token?.accessToken : null);
  }, [token]);

  return (
    <AuthContext.Provider value={accessToken}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
