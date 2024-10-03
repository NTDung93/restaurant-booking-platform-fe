import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import ProfilesPage from './app/[locale]/(authenticated)/profiles/page';
import NotFoundPage from './app/[locale]/not-found/page';
// import ProfileDetailPage from './app/[locale]/(authenticated)/profile-detail/page';
import SignInPage from './app/[locale]/client/sign-in/page';
import { Provider } from 'react-redux';
import CounterPage from './app/[locale]/counter/page';
import { store } from './libs/redux/store';
import AuthProvider from './components/Auth/AuthProvider';
import AccessDeniedPage from './app/[locale]/access-denied/page';
import HomePage from './app/[locale]/client/Home/page';
import SignUpPage from './app/[locale]/client/sign-up/page';
import RestaurantDetailPage from './app/[locale]/client/restaurant-detail/page';
import Restaurant from './app/[locale]/client/restaurant/page';
import User from './app/[locale]/client/user/page';
import UserPass from './app/[locale]/client/user-pass/page';
import UserFavor from './app/[locale]/client/user-favorite/page';
import ComfirmPage from './app/[locale]/client/comfirm/page';
import BlogPage from './app/[locale]/client/blog/page';
import AboutUsPage from './app/[locale]/client/about-us/page';
import HomePageRestaurant from './app/[locale]/restaurant-client/Home/page';
import ManageTableBookingAllPage from './app/[locale]/restaurant-client/Manage-table-booking-all-page/page';

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
  {
    path: '/manage/home',
    element: <HomePageRestaurant />,
  },
  {
    path: '/manage/all-table-booking',
    element: <ManageTableBookingAllPage />,
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
