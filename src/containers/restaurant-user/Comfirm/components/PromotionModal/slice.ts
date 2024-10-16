import { ApiStatus } from '@/common/enums/apiStatus';

import {
  ActionReducerMapBuilder,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import { Promotion } from '@/common/models/promotion';
import { fetchPromotionByLocation } from './thunks';

export interface promotionByLocationSliceState {
  promotionPaginationResponse: Promotion | undefined;
  status: ApiStatus;
}

const initialState: promotionByLocationSliceState = {
  promotionPaginationResponse: undefined,
  status: ApiStatus.Idle,
};

const promotionByLocationSlice = createSlice({
  name: 'promotionByLocation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    setPromotionByLocationResponse(builder);
  },
});

function setPromotionByLocationResponse(
  builder: ActionReducerMapBuilder<promotionByLocationSliceState>,
) {
  builder
    .addCase(
      fetchPromotionByLocation.pending,
      (state: promotionByLocationSliceState) => {
        state.status = ApiStatus.Loading;
      },
    )
    .addCase(
      fetchPromotionByLocation.fulfilled,
      (
        state: promotionByLocationSliceState,
        action: PayloadAction<Promotion>,
      ) => {
        state.status = ApiStatus.Fulfilled;
        state.promotionPaginationResponse = action.payload;
      },
    )
    .addCase(
      fetchPromotionByLocation.rejected,
      (state: promotionByLocationSliceState) => {
        state.status = ApiStatus.Failed;
      },
    );
}

export default promotionByLocationSlice.reducer;
