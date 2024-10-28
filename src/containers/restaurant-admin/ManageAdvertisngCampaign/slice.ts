import { ApiStatus } from '@/common/enums/apiStatus';
import {
  ActionReducerMapBuilder,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { fetchAdsBannerOfLocation, fetchAdsOfSystem, fetchAdsRegistrationOfLocation } from './thunks';
import { AdsResponse, AdsResponses } from '@/common/models/ads';
import { ResponseEntityPagination } from '@/common/models/pagination';
import { LocationResponseLazy } from '@/common/models/location';

export interface AdsOfLocationSliceState {
  adsResponse: ResponseEntityPagination<AdsResponse> | undefined;
  locationBanner: ResponseEntityPagination<LocationResponseLazy> | undefined;
  adsResponses: AdsResponses[] | undefined;
  status: ApiStatus;
}

const initialState: AdsOfLocationSliceState = {
  locationBanner: undefined,
  adsResponse: undefined,
  adsResponses: undefined,
  status: ApiStatus.Idle,
};

const adsOfSystemSlice = createSlice({
  name: 'adsOfSystem',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    setAdsOfSystemResponse(builder);
    setAdsBannerOfLocation(builder);
    setAdsRegistrationOfLocation(builder);
  },
});

function setAdsOfSystemResponse(
  builder: ActionReducerMapBuilder<AdsOfLocationSliceState>,
) {
  builder
    .addCase(fetchAdsOfSystem.pending, (state: AdsOfLocationSliceState) => {
      state.status = ApiStatus.Loading;
    })
    .addCase(
      fetchAdsOfSystem.fulfilled,
      (
        state: AdsOfLocationSliceState,
        action: PayloadAction<ResponseEntityPagination<AdsResponse>>,
      ) => {
        state.status = ApiStatus.Fulfilled;
        state.adsResponse = action.payload;
      },
    )
    .addCase(fetchAdsOfSystem.rejected, (state: AdsOfLocationSliceState) => {
      state.status = ApiStatus.Failed;
    });
}

function setAdsBannerOfLocation(
  builder: ActionReducerMapBuilder<AdsOfLocationSliceState>,
) {
  builder
    .addCase(fetchAdsBannerOfLocation.pending, (state: AdsOfLocationSliceState) => {
      state.status = ApiStatus.Loading;
    })
    .addCase(
      fetchAdsBannerOfLocation.fulfilled,
      (
        state: AdsOfLocationSliceState,
        action: PayloadAction<ResponseEntityPagination<LocationResponseLazy>>,
      ) => {
        state.status = ApiStatus.Fulfilled;
        state.locationBanner = action.payload;
      },
    )
    .addCase(fetchAdsBannerOfLocation.rejected, (state: AdsOfLocationSliceState) => {
      state.status = ApiStatus.Failed;
    });
}

function setAdsRegistrationOfLocation(
  builder: ActionReducerMapBuilder<AdsOfLocationSliceState>,
) {
  builder
    .addCase(fetchAdsRegistrationOfLocation.pending, (state: AdsOfLocationSliceState) => {
      state.status = ApiStatus.Loading;
    })
    .addCase(
      fetchAdsRegistrationOfLocation.fulfilled,
      (
        state: AdsOfLocationSliceState,
        action: PayloadAction<AdsResponses[]>,
      ) => {
        state.status = ApiStatus.Fulfilled;
        state.adsResponses = action.payload;
      },
    )
    .addCase(fetchAdsRegistrationOfLocation.rejected, (state: AdsOfLocationSliceState) => {
      state.status = ApiStatus.Failed;
    });
}
export default adsOfSystemSlice.reducer;
