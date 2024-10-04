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
