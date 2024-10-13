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

export const fetchPopularLocations = createAppAsyncThunk(
  `${TypePrefix}/fetchPopularLocations`,
  async () =>
    await callApi({
      method: 'get',
      url: `/locations/recommend`,
    }),
);

export const fetchLocationsByTag = createAppAsyncThunk(
  `${TypePrefix}/fetchLocationsByTag`,
  async (tagName: string) =>
    await callApi({
      method: 'get',
      url: `/locations/tag?tagName=${tagName}`,
    }),
);

export const fetchOnSaleLocations = createAppAsyncThunk(
  `${TypePrefix}/fetchOnSaleLocations`,
  async () =>
    await callApi({
      method: 'get',
      url: `/locations/ads-type?adsType=FLASH_SALE`,
    }),
);
