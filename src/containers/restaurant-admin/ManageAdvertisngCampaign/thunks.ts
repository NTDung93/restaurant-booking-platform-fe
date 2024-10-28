import { AdsRegistration, AdsResponse } from '@/common/models/ads';
import { LocationResponseLazy } from '@/common/models/location';
import { ResponseEntityPagination } from '@/common/models/pagination';
import { createAppAsyncThunk } from '@/libs/redux/createAppAsyncThunk';
import callApi from '@/utils/api';

const TypePrefix = 'ads';

export const fetchAdsOfSystem = createAppAsyncThunk(
  `${TypePrefix}/fetchAdsOfSystem`,
  async () => {
    const response = await callApi(
      {
        method: 'get',
        url: `/ads`,
      },
      true,
    );

    const adsResponse: ResponseEntityPagination<AdsResponse> = response;    
    return adsResponse;
  },
);

export const fetchAdsBannerOfLocation = createAppAsyncThunk(
  `${TypePrefix}/fetchAdsBannerOfLocation`,
  async () => {
    const response = await callApi(
      {
        method: 'get',
        url: `/locations/ads-type?adsType=BANNER`,
      },
      true,
    );

    const adsResponse: ResponseEntityPagination<LocationResponseLazy> = response;    
    return adsResponse;
  },
);

export const addAdsRegistration = createAppAsyncThunk(
  `${TypePrefix}/addAdsRegistration`,
  async (ads: AdsRegistration) =>
    await callApi(
      {
        method: 'post',
        url: '/ads-registrations',
        data: ads,
      },
      true,
    ),
);

export const fetchAdsRegistrationOfLocation = createAppAsyncThunk(
  `${TypePrefix}/fetchAdsRegistrationOfLocation`,
  async (locationId: number) =>{
    const response = await callApi(
      {
        method: 'get',
        url: `/ads-registrations/location/${locationId}`,
      },
      true,
    );

    return response.adsResponses;
  }
);
