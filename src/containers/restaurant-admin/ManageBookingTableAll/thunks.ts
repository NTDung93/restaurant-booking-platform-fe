import { createAppAsyncThunk } from '@/libs/redux/createAppAsyncThunk';
import callApi from '@/utils/api';

const TypePrefix = 'booking';

export const fetchBookingByLocation = createAppAsyncThunk(
  `${TypePrefix}/fetchBookingByLocation`,
  async ({
    locationId,
    currentPage,
    pageSize,
  }: {
    locationId: number;
    currentPage: number;
    pageSize: number;
  }) =>
    await callApi(
      {
        method: 'get',
        url: `/location-bookings/location/${locationId}?pageNo=${currentPage - 1}&pageSize=${pageSize}`,
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
