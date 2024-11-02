import { ApiStatus } from '@/common/enums/apiStatus';
import {
  LocationResponse,
  LocationResponseLazy,
  LocationResponseLazyDetail,
} from '@/common/models/location';
import { ResponseEntityPagination } from '@/common/models/pagination';
import {
  ActionReducerMapBuilder,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import {
  fetchLocationDetail,
  fetchLocationDetailById,
  fetchLocationsByTag,
  fetchOnSaleLocations,
  fetchPopularLocations,
  searchLocation,
  updateLocationDetailById,
} from './thunks';

export interface LocationSliceState {
  locationsPaginationResponse:
    | ResponseEntityPagination<LocationResponseLazy>
    | undefined;
  locationDetail: LocationResponseLazyDetail | undefined;
  locationDetailById: LocationResponse | undefined;
  popularLocationsResponse:
    | ResponseEntityPagination<LocationResponseLazy>
    | undefined;
  locationsByTagResponse:
    | ResponseEntityPagination<LocationResponseLazy>
    | undefined;
  onSaleLocationsResponse:
    | ResponseEntityPagination<LocationResponseLazy>
    | undefined;
  searchLocationStatus: ApiStatus;
  status: ApiStatus;
}

const initialState: LocationSliceState = {
  locationsPaginationResponse: undefined,
  locationDetail: undefined,
  popularLocationsResponse: undefined,
  locationsByTagResponse: undefined,
  onSaleLocationsResponse: undefined,
  locationDetailById: undefined,
  searchLocationStatus: ApiStatus.Idle,
  status: ApiStatus.Idle,
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    setLocationPaginationResponse(builder);
    setLocationDetailResponse(builder);
    setPopularLocationsResponse(builder);
    setLocationsByTagResponse(builder);
    setOnSaleLocationsResponse(builder);
    setLocationDetailById(builder);
    setUpdateLocationDetailById(builder);
  },
});

function setLocationPaginationResponse(
  builder: ActionReducerMapBuilder<LocationSliceState>,
) {
  builder
    .addCase(searchLocation.pending, (state: LocationSliceState) => {
      state.searchLocationStatus = ApiStatus.Loading;
    })
    .addCase(
      searchLocation.fulfilled,
      (
        state: LocationSliceState,
        action: PayloadAction<ResponseEntityPagination<LocationResponseLazy>>,
      ) => {
        state.searchLocationStatus = ApiStatus.Fulfilled;
        state.locationsPaginationResponse = action.payload;
      },
    )
    .addCase(searchLocation.rejected, (state: LocationSliceState) => {
      state.searchLocationStatus = ApiStatus.Failed;
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

function setPopularLocationsResponse(
  builder: ActionReducerMapBuilder<LocationSliceState>,
) {
  builder
    .addCase(fetchPopularLocations.pending, (state: LocationSliceState) => {
      state.status = ApiStatus.Loading;
    })
    .addCase(
      fetchPopularLocations.fulfilled,
      (
        state: LocationSliceState,
        action: PayloadAction<ResponseEntityPagination<LocationResponseLazy>>,
      ) => {
        state.status = ApiStatus.Fulfilled;
        state.popularLocationsResponse = action.payload;
      },
    )
    .addCase(fetchPopularLocations.rejected, (state: LocationSliceState) => {
      state.status = ApiStatus.Failed;
    });
}

function setLocationsByTagResponse(
  builder: ActionReducerMapBuilder<LocationSliceState>,
) {
  builder
    .addCase(fetchLocationsByTag.pending, (state: LocationSliceState) => {
      state.status = ApiStatus.Loading;
    })
    .addCase(
      fetchLocationsByTag.fulfilled,
      (
        state: LocationSliceState,
        action: PayloadAction<ResponseEntityPagination<LocationResponseLazy>>,
      ) => {
        state.status = ApiStatus.Fulfilled;
        state.locationsByTagResponse = action.payload;
      },
    )
    .addCase(fetchLocationsByTag.rejected, (state: LocationSliceState) => {
      state.status = ApiStatus.Failed;
    });
}

function setOnSaleLocationsResponse(
  builder: ActionReducerMapBuilder<LocationSliceState>,
) {
  builder
    .addCase(fetchOnSaleLocations.pending, (state: LocationSliceState) => {
      state.status = ApiStatus.Loading;
    })
    .addCase(
      fetchOnSaleLocations.fulfilled,
      (
        state: LocationSliceState,
        action: PayloadAction<ResponseEntityPagination<LocationResponseLazy>>,
      ) => {
        state.status = ApiStatus.Fulfilled;
        state.onSaleLocationsResponse = action.payload;
      },
    )
    .addCase(fetchOnSaleLocations.rejected, (state: LocationSliceState) => {
      state.status = ApiStatus.Failed;
    });
}

function setLocationDetailById(
  builder: ActionReducerMapBuilder<LocationSliceState>,
) {
  builder
    .addCase(fetchLocationDetailById.pending, (state: LocationSliceState) => {
      state.status = ApiStatus.Loading;
    })
    .addCase(
      fetchLocationDetailById.fulfilled,
      (state: LocationSliceState, action: PayloadAction<LocationResponse>) => {
        state.status = ApiStatus.Fulfilled;
        state.locationDetailById = action.payload;
      },
    )
    .addCase(fetchLocationDetailById.rejected, (state: LocationSliceState) => {
      state.status = ApiStatus.Failed;
    });
}

function setUpdateLocationDetailById(
  builder: ActionReducerMapBuilder<LocationSliceState>,
) {
  builder
    .addCase(updateLocationDetailById.pending, (state: LocationSliceState) => {
      state.status = ApiStatus.Loading;
    })
    .addCase(
      updateLocationDetailById.fulfilled,
      (state: LocationSliceState, action: PayloadAction<LocationResponse>) => {
        state.status = ApiStatus.Fulfilled;
        state.locationDetailById = action.payload;
      },
    )
    .addCase(updateLocationDetailById.rejected, (state: LocationSliceState) => {
      state.status = ApiStatus.Failed;
    });
}

export default locationSlice.reducer;
