import { ReduxState } from '@/libs/redux/store';

export const selectUserToken = (state: ReduxState) => state.user.token;

export const selectUserInfo = (state: ReduxState) => state.user.userInfo;

export const selectUserStatus = (state: ReduxState) => state.user.status;

export const selectUserBookingHistory = (state: ReduxState) =>
  state.user.userBookingHitory;

export const selectFeedbackByLocationBookingId = (state: ReduxState) =>
  state.user.locationFeedbackResponse;

export const selectAllFeedbackOfLocation = (state: ReduxState) =>
  state.user.feedbackByLocation;
