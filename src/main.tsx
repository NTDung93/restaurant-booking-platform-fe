import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import ProfilesPage from './app/[locale]/(authenticated)/profiles/page';
import NotFoundPage from './app/[locale]/not-found/page';
// import ProfileDetailPage from './app/[locale]/(authenticated)/profile-detail/page';
import SignInPage from './app/[locale]/sign-in/page';
import { Provider } from 'react-redux';
import CounterPage from './app/[locale]/counter/page';
import { store } from './libs/redux/store';
import AuthProvider from './components/Auth/AuthProvider';
import AccessDeniedPage from './app/[locale]/access-denied/page';
import HomePage from './app/[locale]/page';
import SignUpPage from './app/[locale]/sign-up/page';
import RestaurantDetailPage from './app/[locale]/restaurant-detail/page';
import Restaurant from './app/[locale]/restaurant/page';
import User from './app/[locale]/user/page';
import UserPass from './app/[locale]/user-pass/page';
import UserFavor from './app/[locale]/user-favorite/page';
import ComfirmPage from './app/[locale]/comfirm/page';
import BlogPage from './app/[locale]/blog/page';
import AboutUsPage from './app/[locale]/about-us/page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NotFoundPage />,
  },
  // {
  //   path: '/profiles',
  //   element: <ProfilesPage />,
  //   children: [
  //     {
  //       path: '/profiles/:profileId',
  //       element: <ProfileDetailPage />,
  //     },
  //   ],
  // },
  {
    path: '/user',
    element: <User />,
  },
  {
    path: '/user-pass',
    element: <UserPass />,
  },
  {
    path: '/user-favorite',
    element: <UserFavor />,
  },
  {
    path: '/signin',
    element: <SignInPage />,
  },
  {
    path: '/signup',
    element: <SignUpPage />,
  },
  {
    path: '/res-detail',
    element: <RestaurantDetailPage />,
  },
  {
    path: '/comfirm',
    element: <ComfirmPage />,
  },
  {
    path: '/blog',
    element: <BlogPage />,
  },
  {
    path: '/restaurant',
    element: <Restaurant />,
  },
  {
    path: '/about-us',
    element: <AboutUsPage />,
  },
  {
    path: '/counter',
    element: <CounterPage />,
  },
  {
    path: '/access-denied',
    element: <AccessDeniedPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Provider>
  </React.StrictMode>,
);
