import { Booking } from '@/common/models/booking';
import { createAppAsyncThunk } from '@/libs/redux/createAppAsyncThunk';
import callApi from '@/utils/api';

const TypePrefix = 'location-booking';

export const createBooking = createAppAsyncThunk(
  `${TypePrefix}/createBooking`,
  async (bookingData: Booking) => {
    const response = await callApi(
      {
        method: 'post',
        url: '/location-bookings',
        data: bookingData,
      },
      true,
    );
    return response.data;
  },
);
export const fetchBookingByLocation = createAppAsyncThunk(
  `${TypePrefix}/fetchBookingByLocation`,
  async () =>
    await callApi({
      method: 'get',
      url: `/location-bookings`,
    }),
);
