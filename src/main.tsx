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

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
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
  {
    path: '/signin',
    element: <SignInPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider isSignedIn={false}>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);
