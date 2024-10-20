import { ReduxState } from '@/libs/redux/store';
import { BookingLocation } from '@/common/models/booking';

export const selectBookingByLocation = (state: ReduxState) =>
  state.bookingByLocation.allBookingsPaginationResponse;

export const selectBookingById = (
  state: ReduxState,
): BookingLocation | undefined => state.bookingByLocation.bookingDetail;
