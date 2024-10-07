import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import ProfilesPage from './app/[locale]/(authenticated)/profiles/page';
import NotFoundPage from './app/[locale]/not-found/page';
// import ProfileDetailPage from './app/[locale]/(authenticated)/profile-detail/page';
import SignInPage from './app/[locale]/restaurant-user/SignIn/page';
import { Provider } from 'react-redux';
import CounterPage from './app/[locale]/counter/page';
import { store } from './libs/redux/store';
import AuthProvider from './components/Auth/AuthProvider';
import AccessDeniedPage from './app/[locale]/access-denied/page';
import HomePage from './app/[locale]/restaurant-user/Home/page';
import SignUpPage from './app/[locale]/restaurant-user/SignUp/page';
import RestaurantDetailPage from './app/[locale]/restaurant-user/RestaurantDetail/page';
import Restaurant from './app/[locale]/restaurant-user/Restaurant/page';
import User from './app/[locale]/restaurant-user/User/page';
import UserPass from './app/[locale]/restaurant-user/UserPassword/page';
import UserFavor from './app/[locale]/restaurant-user/UserFavorite/page';
import ComfirmPage from './app/[locale]/restaurant-user/Confirm/page';
import BlogPage from './app/[locale]/restaurant-user/Blog/page';
import AboutUsPage from './app/[locale]/restaurant-user/AboutUs/page';
import HomePageRestaurant from './app/[locale]/restaurant-admin/Home/page';
import ManageTableBookingAllPage from './app/[locale]/restaurant-admin/ManageTableBookingAll/page';
import {
  ABOUT_US,
  ACCESS_DENIED,
  BLOG,
  CONFIRM,
  COUNTER,
  HOME,
  RESTAURANT,
  RESTAURANT_ADMIN_ALL_TABLE_BOOKING,
  RESTAURANT_ADMIN_HOME,
  RESTAURANT_DETAIL_ROUTE,
  SIGN_IN,
  SIGN_UP,
  USER,
  USER_FAVOR,
  USER_PASS,
} from './common/constants/routerConstant';

const router = createBrowserRouter([
  {
    path: HOME,
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
    path: USER,
    element: <User />,
  },
  {
    path: USER_PASS,
    element: <UserPass />,
  },
  {
    path: USER_FAVOR,
    element: <UserFavor />,
  },
  {
    path: SIGN_IN,
    element: <SignInPage />,
  },
  {
    path: SIGN_UP,
    element: <SignUpPage />,
  },
  {
    path: RESTAURANT_DETAIL_ROUTE,
    element: <RestaurantDetailPage />,
  },
  {
    path: CONFIRM,
    element: <ComfirmPage />,
  },
  {
    path: BLOG,
    element: <BlogPage />,
  },
  {
    path: RESTAURANT,
    element: <Restaurant />,
  },
  {
    path: ABOUT_US,
    element: <AboutUsPage />,
  },
  {
    path: COUNTER,
    element: <CounterPage />,
  },
  {
    path: ACCESS_DENIED,
    element: <AccessDeniedPage />,
  },
  {
    path: RESTAURANT_ADMIN_HOME,
    element: <HomePageRestaurant />,
  },
  {
    path: RESTAURANT_ADMIN_ALL_TABLE_BOOKING,
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
