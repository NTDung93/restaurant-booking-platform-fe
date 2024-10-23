import { createAppAsyncThunk } from '@/libs/redux/createAppAsyncThunk';
import callApi from '@/utils/api';

const TypePrefix = 'fees';

export const fetchFeesOfLocation = createAppAsyncThunk(
  `${TypePrefix}/getFeesOfLocation`,
  async ({ month, year }: { month: number; year: number }) => {
    const response = await callApi(
      {
        method: 'get',
        url: `/payment-histories/monthly-commission-payment?month=${month}&year=${year}`,
      },
      true,
    );

    return response;
  },
);
