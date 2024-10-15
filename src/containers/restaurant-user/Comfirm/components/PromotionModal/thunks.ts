import { createAppAsyncThunk } from '@/libs/redux/createAppAsyncThunk';
import callApi from '@/utils/api';

const TypePrefix = 'promotion';

export const fetchPromotionByLocation = createAppAsyncThunk(
  `${TypePrefix}/fetchPromotionByLocation`,
  async (locationId: number) =>
    await callApi(
      {
        method: 'get',
        url: `/promotions/usable-promotions/${locationId}`,
      },
      true,
    ),
);
