import { createAppAsyncThunk } from '@/libs/redux/createAppAsyncThunk';
import callApi from '@/utils/api';

const TypePrefix = 'food';

export const fetchFoodByLocation = createAppAsyncThunk(
  `${TypePrefix}/fetchFoodByLocation`,
  async (locationId: number) =>
    await callApi({
      method: 'get',
      url: `/foods/location/${locationId}`,
    }),
);
