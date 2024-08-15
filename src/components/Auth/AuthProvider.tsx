import { createContext, PropsWithChildren, useContext, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AuthContext = createContext<any>({});

export default function AuthProvider({ children }: PropsWithChildren) {
  // const token = useSelector(selectUserToken);
  // const [accessToken, setAccessToken] = useState(null);

  // useEffect(() => {
  //   setAccessToken(token?.accessToken ? token?.accessToken : null);
  // }, [token]);
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
