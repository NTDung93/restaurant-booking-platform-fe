import { ReduxState } from '@/libs/redux/store';
import { AdsResponse, AdsResponses } from '@/common/models/ads';
import { ResponseEntityPagination } from '@/common/models/pagination';
import { LocationResponseLazy } from '@/common/models/location';

export const getAdsOfSystem = (
  state: ReduxState,
): ResponseEntityPagination<AdsResponse> | undefined => state.ads.adsResponse;

export const getAdsBannerOfLocation = (
  state: ReduxState,
): ResponseEntityPagination<LocationResponseLazy> | undefined =>
  state.ads.locationBanner;

export const getAdsRegistrationOfLocation = (
  state: ReduxState,
): AdsResponses[] | undefined => state.ads.adsResponses;
