import { ApiStatus } from '@/common/enums/apiStatus';
import {
  LocationResponseLazy,
  LocationResponseLazyDetail,
} from '@/common/models/location';
import { ResponseEntityPagination } from '@/common/models/pagination';
import {
  ActionReducerMapBuilder,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { fetchLocationDetail, searchLocation } from './thunks';

export interface LocationSliceState {
  locationsPaginationResponse:
    | ResponseEntityPagination<LocationResponseLazy>
    | undefined;
  locationDetail: LocationResponseLazyDetail | undefined;
  status: ApiStatus;
}

const initialState: LocationSliceState = {
  locationsPaginationResponse: undefined,
  locationDetail: undefined,
  status: ApiStatus.Idle,
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    setLocationPaginationResponse(builder);
    setLocationDetailResponse(builder);
  },
});

function setLocationPaginationResponse(
  builder: ActionReducerMapBuilder<LocationSliceState>,
) {
  builder
    .addCase(searchLocation.pending, (state: LocationSliceState) => {
      state.status = ApiStatus.Loading;
    })
    .addCase(
      searchLocation.fulfilled,
      (
        state: LocationSliceState,
        action: PayloadAction<ResponseEntityPagination<LocationResponseLazy>>,
      ) => {
        state.status = ApiStatus.Fulfilled;
        state.locationsPaginationResponse = action.payload;
      },
    )
    .addCase(searchLocation.rejected, (state: LocationSliceState) => {
      state.status = ApiStatus.Failed;
    });
}
function setLocationDetailResponse(
  builder: ActionReducerMapBuilder<LocationSliceState>,
) {
  builder
    .addCase(fetchLocationDetail.pending, (state: LocationSliceState) => {
      state.status = ApiStatus.Loading;
    })
    .addCase(
      fetchLocationDetail.fulfilled,
      (
        state: LocationSliceState,
        action: PayloadAction<LocationResponseLazyDetail>,
      ) => {
        state.status = ApiStatus.Fulfilled;
        state.locationDetail = action.payload;
      },
    )
    .addCase(fetchLocationDetail.rejected, (state: LocationSliceState) => {
      state.status = ApiStatus.Failed;
    });
}

export default locationSlice.reducer;
