import { ReduxState } from '@/libs/redux/store';

export const selectBookingsPaginationResponse = (state: ReduxState) =>
  state.booking.bookingsPaginationResponse;

export const selectBookingStatus = (state: ReduxState) => state.booking.status;

export const selectCreateBookingStatus = (state: ReduxState) =>
  state.booking.createBookingStatus;
