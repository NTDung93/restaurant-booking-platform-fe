import { createAppAsyncThunk } from '@/libs/redux/createAppAsyncThunk';
import callApi from '@/utils/api';

const TypePrefix = 'booking';

export const fetchBookingByLocation = createAppAsyncThunk(
  `${TypePrefix}/fetchBookingByLocation`,
  async ({
    locationId,
    currentPage,
    pageSize,
    status,
  }: {
    locationId: number;
    currentPage: number;
    pageSize: number;
    status?: string;
  }) =>
    await callApi(
      {
        method: 'get',
        url: `/location-bookings/location/${locationId}?pageNo=${currentPage - 1}&pageSize=${pageSize}&sortDir=desc${status ? `&status=${status}` : ''}`,
      },
      true,
    ),
);

export const approveBookingByLocation = createAppAsyncThunk(
  `${TypePrefix}/approveBookingByLocation`,
  async ({ locationId }: { locationId: number }) =>
    await callApi(
      {
        method: 'put',
        url: `/location-bookings/approve/${locationId}`,
      },
      true,
    ),
);

export const cancelBookingByLocation = createAppAsyncThunk(
  `${TypePrefix}/cancelBookingByLocation`,
  async ({ locationId }: { locationId: number }) =>
    await callApi(
      {
        method: 'put',
        url: `/location-bookings/cancel/${locationId}`,
      },
      true,
    ),
);

export const successBookingByLocation = createAppAsyncThunk(
  `${TypePrefix}/successBookingByLocation`,
  async ({ locationId }: { locationId: number }) =>
    await callApi(
      {
        method: 'put',
        url: `/location-bookings/success/${locationId}`,
      },
      true,
    ),
);

export const fetchBookingById = createAppAsyncThunk(
  `${TypePrefix}/fetchBookingById`,
  async (id: number) =>
    await callApi(
      {
        method: 'get',
        url: `/location-bookings/${id}`,
      },
      true,
    ),
);

export const commissonMonthly = createAppAsyncThunk(
  `${TypePrefix}/commissonMonthly`,
  async ({ userId }: { userId: number | undefined }) => {
    const response = await callApi(
      {
        method: 'post',
        url: `/notifications/commission-monthly-payment/${userId}`,
      },
      true,
    );
    console.log(response);

    return response.data;
  },
);
