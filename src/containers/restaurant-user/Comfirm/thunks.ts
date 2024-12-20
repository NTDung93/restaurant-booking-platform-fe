import {
  CreatePaymentDto,
  LocationBookingRequest,
} from '@/common/models/booking';
import { createAppAsyncThunk } from '@/libs/redux/createAppAsyncThunk';
import callApi from '@/utils/api';

const TypePrefix = 'location-booking';

export const createBooking = createAppAsyncThunk(
  `${TypePrefix}/createBooking`,
  async (bookingData: LocationBookingRequest) => {
    const response = await callApi(
      {
        method: 'post',
        url: '/location-bookings',
        data: bookingData,
      },
      true,
    );

    localStorage.setItem('id', JSON.stringify(response.id));
    localStorage.setItem('amount', JSON.stringify(response.amount));

    return response.data;
  },
);

export const createPaymentLink = createAppAsyncThunk(
  `${TypePrefix}/createPaymentLink`,
  async (createPaymentDTO: CreatePaymentDto) => {
    const response = await callApi(
      {
        method: 'post',
        url: '/pay-os/create-payment-link',
        data: createPaymentDTO,
      },
      true,
    );
    console.log(response.data.checkoutUrl);

    return response.data.checkoutUrl;
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
