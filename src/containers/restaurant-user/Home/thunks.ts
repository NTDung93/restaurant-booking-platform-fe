import { LocationSearchCriteria } from '@/common/models/location';
import { createAppAsyncThunk } from '@/libs/redux/createAppAsyncThunk';
import callApi, { objectToQueryString } from '@/utils/api';

const TypePrefix = 'location';

export const searchLocation = createAppAsyncThunk(
  `${TypePrefix}/searchLocation`,
  async (data: LocationSearchCriteria) => {
    const queryString = objectToQueryString(data);
    return await callApi({
      method: 'get',
      url: `/locations/search?${queryString}`,
    });
  },
);
export const fetchLocationDetail = createAppAsyncThunk(
  `${TypePrefix}/fetchLocationDetail`,
  async (locationId: number) =>
    await callApi({
      method: 'get',
      url: `/locations/${locationId}`,
    }),
);
