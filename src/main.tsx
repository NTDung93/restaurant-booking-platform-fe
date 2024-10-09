import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import ProfilesPage from './app/[locale]/(authenticated)/profiles/page';
import NotFoundPage from './app/[locale]/not-found/page';
// import ProfileDetailPage from './app/[locale]/(authenticated)/profile-detail/page';
import SignInPage from '@/app/[locale]/location-user/SignIn/page';
import { Provider } from 'react-redux';
import CounterPage from './app/[locale]/counter/page';
import { store } from './libs/redux/store';
import AuthProvider from './components/Auth/AuthProvider';
import AccessDeniedPage from './app/[locale]/access-denied/page';
import HomePage from '@/app/[locale]/location-user/Home/page';
import SignUpPage from '@/app/[locale]/location-user/SignUp/page';
import LocationDetailPage from '@/app/[locale]/location-user/LocationDetail/page';
import Restaurant from '@/app/[locale]/location-user/Location/page';
import User from '@/app/[locale]/location-user/User/page';
import UserPass from '@/app/[locale]/location-user/UserPassword/page';
import UserFavor from '@/app/[locale]/location-user/UserFavorite/page';
import ConfirmPage from '@/app/[locale]/location-user/Confirm/page';
import BlogPage from '@/app/[locale]/location-user/Blog/page';
import AboutUsPage from '@/app/[locale]/location-user/AboutUs/page';
import HomePageLocation from '@/app/[locale]/location-admin/Home/page';
import ManageTableBookingAllPage from '@/app/[locale]/location-admin/ManageTableBookingAll/page';
import {
  ABOUT_US_ROUTE,
  ACCESS_DENIED_ROUTE,
  BLOG_ROUTE,
  CONFIRM_ROUTE,
  COUNTER_ROUTE,
  HOME_ROUTE,
  RESTAURANT_ADMIN_ALL_TABLE_BOOKING_ROUTE,
  RESTAURANT_ADMIN_HOME_ROUTE,
  RESTAURANT_DETAIL_ROUTE,
  RESTAURANT_ROUTE,
  SIGN_IN_ROUTE,
  SIGN_UP_ROUTE,
  USER_FAVOR_ROUTE,
  USER_PASS_ROUTE,
  USER_ROUTE,
} from './common/constants/routerConstant';

const router = createBrowserRouter([
  {
    path: HOME_ROUTE,
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
    path: USER_ROUTE,
    element: <User />,
  },
  {
    path: USER_PASS_ROUTE,
    element: <UserPass />,
  },
  {
    path: USER_FAVOR_ROUTE,
    element: <UserFavor />,
  },
  {
    path: SIGN_IN_ROUTE,
    element: <SignInPage />,
  },
  {
    path: SIGN_UP_ROUTE,
    element: <SignUpPage />,
  },
  {
    path: RESTAURANT_DETAIL_ROUTE,
    element: <LocationDetailPage />,
  },
  {
    path: CONFIRM_ROUTE,
    element: <ConfirmPage />,
  },
  {
    path: BLOG_ROUTE,
    element: <BlogPage />,
  },
  {
    path: RESTAURANT_ROUTE,
    element: <Restaurant />,
  },
  {
    path: ABOUT_US_ROUTE,
    element: <AboutUsPage />,
  },
  {
    path: COUNTER_ROUTE,
    element: <CounterPage />,
  },
  {
    path: ACCESS_DENIED_ROUTE,
    element: <AccessDeniedPage />,
  },
  {
    path: RESTAURANT_ADMIN_HOME_ROUTE,
    element: <HomePageLocation />,
  },
  {
    path: RESTAURANT_ADMIN_ALL_TABLE_BOOKING_ROUTE,
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
