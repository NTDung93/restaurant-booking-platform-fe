import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from '@/app/[locale]/page';
import ProfilesPage from './app/[locale]/(authenticated)/profiles/page';
import NotFoundPage from './app/[locale]/not-found/page';
import ProfileDetailPage from './app/[locale]/(authenticated)/profile-detail/page';
import SignInPage from './app/[locale]/sign-in/page';
import AuthProvider from './components/Auth/AuthProvider';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import { Provider } from 'react-redux';
import CounterPage from './app/[locale]/counter/page';
import { store } from './libs/redux/store';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      // <ProtectedRoute>
        <HomePage />
      // </ProtectedRoute>
    ),
    errorElement: <NotFoundPage />,
  },
  {
    path: '/profiles',
    element: <ProfilesPage />,
    children: [
      {
        path: '/profiles/:profileId',
        element: <ProfileDetailPage />,
      },
    ],
  },
  // {
  //   path: '/signin',
  //   element: <SignInPage />,
  // },
  {
    path: '/counter',
    element: <CounterPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <AuthProvider isSignedIn={false}> */}
        <RouterProvider router={router} />
      {/* </AuthProvider> */}
    </Provider>
  </React.StrictMode>,
);
