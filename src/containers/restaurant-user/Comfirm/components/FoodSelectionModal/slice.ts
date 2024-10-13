import { ApiStatus } from '@/common/enums/apiStatus';
import { Food } from '@/common/models/food';
import { ResponseEntityPagination } from '@/common/models/pagination';
import {
  ActionReducerMapBuilder,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { fetchFoodByLocation } from './thunks';

export interface FoodByLocationSliceState {
  foodsPaginationResponse: ResponseEntityPagination<Food> | undefined;
  status: ApiStatus;
}

const initialState: FoodByLocationSliceState = {
  foodsPaginationResponse: undefined,
  status: ApiStatus.Idle,
};

const foodByLocationSlice = createSlice({
  name: 'foodByLocation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    setFoodByLocationResponse(builder);
  },
});

function setFoodByLocationResponse(
  builder: ActionReducerMapBuilder<FoodByLocationSliceState>,
) {
  builder
    .addCase(fetchFoodByLocation.pending, (state: FoodByLocationSliceState) => {
      state.status = ApiStatus.Loading;
    })
    .addCase(
      fetchFoodByLocation.fulfilled,
      (
        state: FoodByLocationSliceState,
        action: PayloadAction<ResponseEntityPagination<Food>>,
      ) => {
        state.status = ApiStatus.Fulfilled;
        state.foodsPaginationResponse = action.payload;
      },
    )
    .addCase(
      fetchFoodByLocation.rejected,
      (state: FoodByLocationSliceState) => {
        state.status = ApiStatus.Failed;
      },
    );
}

export default foodByLocationSlice.reducer;
