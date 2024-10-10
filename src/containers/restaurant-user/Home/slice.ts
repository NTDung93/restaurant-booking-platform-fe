import { ApiStatus } from '@/common/enums/apiStatus';
import { LocationResponseLazy } from '@/common/models/location';
import { ResponseEntityPagination } from '@/common/models/pagination';
import {
  ActionReducerMapBuilder,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { searchLocation } from './thunks';

export interface LocationSliceState {
  locationsPaginationResponse:
    | ResponseEntityPagination<LocationResponseLazy>
    | undefined;
  status: ApiStatus;
}

const initialState: LocationSliceState = {
  locationsPaginationResponse: undefined,
  status: ApiStatus.Idle,
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    setLocationPaginationResponse(builder);
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

export default locationSlice.reducer;
