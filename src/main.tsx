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
  ABOUT_US_ROUTE,
  ACCESS_DENIED_ROUTE,
  BLOG_ROUTE,
  BOOKING_HISTORY,
  CONFIRM_ROUTE,
  COUNTER_ROUTE,
  HOME_ROUTE,
  PAYMENT_ROUTE,
  RESTAURANT_ADMIN_ALL_TABLE_BOOKING_ROUTE,
  RESTAURANT_ADMIN_DETAIL_TABLE_BOOKING_ROUTE,
  RESTAURANT_ADMIN_HOME_ROUTE,
  RESTAURANT_ADMIN_INFO_ROUTE,
  RESTAURANT_ADMIN_MANAGE_ADVERTISEMENT_ROUTE,
  RESTAURANT_ADMIN_MANAGE_BOOKING_TABLE_ONLINE_ROUTE,
  RESTAURANT_ADMIN_MANAGE_FEES_ROUTE,
  RESTAURANT_ADMIN_MANAGE_FOOD_ROUTE,
  RESTAURANT_ADMIN_REPORT_BOOKING_TABLE_ROUTE,
  RESTAURANT_DETAIL_ROUTE,
  RESTAURANT_FEEDBACK_ROUTE,
  RESTAURANT_ROUTE,
  SIGN_IN_ROUTE,
  SIGN_UP_ROUTE,
  SUCCESSS_ROUTE,
  USER_FAVOR_ROUTE,
  USER_PASS_ROUTE,
  USER_ROUTE,
} from './common/constants/routerConstant';
import SuccessPage from './app/[locale]/restaurant-user/Success/page';
import PaymentPage from './app/[locale]/restaurant-user/Payment/page';
import UserBookingHistory from './containers/restaurant-user/UserBookingHistory';
import ManageTableBookingDetailPage from './app/[locale]/restaurant-admin/ManageBookingTableDetail/page';
import ManageLocationFoodPage from './app/[locale]/restaurant-admin/ManageLocationFood';
import RestaurantInfoPage from './app/[locale]/restaurant-admin/RestaurantInfo/page';
import ManageLocationFeedbackPage from './app/[locale]/restaurant-admin/ManageLocationFeedback/page';
import ManageLocationFeesPage from './app/[locale]/restaurant-admin/ManageLocationFees';
import ManageReportBookingTablePage from './app/[locale]/restaurant-admin/ManageReportBookingTable/page';
import ManageReportBookingTableOnlinePage from './app/[locale]/restaurant-admin/ManageBookingTableOnline/page';
import ManageAdvertisngCampaignPage from './app/[locale]/restaurant-admin/ManageAdvertisngCampaign/page';

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
    path: BOOKING_HISTORY,
    element: <UserBookingHistory />,
  },
  {
    path: SIGN_UP_ROUTE,
    element: <SignUpPage />,
  },
  {
    path: RESTAURANT_DETAIL_ROUTE,
    element: <RestaurantDetailPage />,
  },
  {
    path: CONFIRM_ROUTE,
    element: <ComfirmPage />,
  },
  {
    path: SUCCESSS_ROUTE,
    element: <SuccessPage />,
  },
  {
    path: PAYMENT_ROUTE,
    element: <PaymentPage />,
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
    element: <HomePageRestaurant />,
  },
  {
    path: RESTAURANT_ADMIN_ALL_TABLE_BOOKING_ROUTE,
    element: <ManageTableBookingAllPage />,
  },
  {
    path: RESTAURANT_ADMIN_DETAIL_TABLE_BOOKING_ROUTE,
    element: <ManageTableBookingDetailPage />,
  },
  {
    path: RESTAURANT_ADMIN_MANAGE_FOOD_ROUTE,
    element: <ManageLocationFoodPage />,
  },
  {
    path: RESTAURANT_ADMIN_INFO_ROUTE,
    element: <RestaurantInfoPage />,
  },
  {
    path: RESTAURANT_FEEDBACK_ROUTE,
    element: <ManageLocationFeedbackPage />,
  },
  {
    path: RESTAURANT_ADMIN_MANAGE_FEES_ROUTE,
    element: <ManageLocationFeesPage />,
  },
  {
    path: RESTAURANT_ADMIN_REPORT_BOOKING_TABLE_ROUTE,
    element: <ManageReportBookingTablePage />,
  },
  {
    path: RESTAURANT_ADMIN_MANAGE_BOOKING_TABLE_ONLINE_ROUTE,
    element: <ManageReportBookingTableOnlinePage />,
  },
  {
    path: RESTAURANT_ADMIN_MANAGE_ADVERTISEMENT_ROUTE,
    element: <ManageAdvertisngCampaignPage />,
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
