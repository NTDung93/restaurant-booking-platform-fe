import { ApiStatus } from '@/common/enums/apiStatus';
import { Food } from '@/common/models/food';
import { ResponseEntityPagination } from '@/common/models/pagination';
import {
  ActionReducerMapBuilder,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { fetchFoodByLocation, addFood, editFood, deleteFood } from './thunks';

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
    setAddFoodResponse(builder);
    setEditFoodResponse(builder);
    setDeleteFoodResponse(builder);
  },
});

function setFoodByLocationResponse(
  builder: ActionReducerMapBuilder<FoodByLocationSliceState>,
) {
  builder
    .addCase(fetchFoodByLocation.pending, (state) => {
      state.status = ApiStatus.Loading;
    })
    .addCase(
      fetchFoodByLocation.fulfilled,
      (state, action: PayloadAction<ResponseEntityPagination<Food>>) => {
        state.status = ApiStatus.Fulfilled;
        state.foodsPaginationResponse = action.payload;
      },
    )
    .addCase(fetchFoodByLocation.rejected, (state) => {
      state.status = ApiStatus.Failed;
    });
}

function setAddFoodResponse(
  builder: ActionReducerMapBuilder<FoodByLocationSliceState>,
) {
  builder
    .addCase(addFood.pending, (state) => {
      state.status = ApiStatus.Loading;
    })
    .addCase(addFood.fulfilled, (state, action: PayloadAction<Food>) => {
      state.status = ApiStatus.Fulfilled;
      const newFood = action.payload;
      if (state.foodsPaginationResponse) {
        state.foodsPaginationResponse.content.push(newFood);
      }
    })
    .addCase(addFood.rejected, (state) => {
      state.status = ApiStatus.Failed;
    });
}

function setEditFoodResponse(
  builder: ActionReducerMapBuilder<FoodByLocationSliceState>,
) {
  builder
    .addCase(editFood.pending, (state) => {
      state.status = ApiStatus.Loading;
    })
    .addCase(editFood.fulfilled, (state, action: PayloadAction<Food>) => {
      state.status = ApiStatus.Fulfilled;
      const updatedFood = action.payload;

      if (state.foodsPaginationResponse) {
        const index = state.foodsPaginationResponse.content.findIndex(
          (food) => food.id === updatedFood.id,
        );
        if (index !== -1) {
          state.foodsPaginationResponse.content[index] = updatedFood;
        }
      }
    })
    .addCase(editFood.rejected, (state) => {
      state.status = ApiStatus.Failed;
    });
}

function setDeleteFoodResponse(
  builder: ActionReducerMapBuilder<FoodByLocationSliceState>,
) {
  builder
    .addCase(deleteFood.pending, (state) => {
      state.status = ApiStatus.Loading;
    })
    .addCase(deleteFood.fulfilled, (state, action: PayloadAction<number>) => {
      state.status = ApiStatus.Fulfilled;
      const id = action.payload;

      if (state.foodsPaginationResponse) {
        state.foodsPaginationResponse.content =
          state.foodsPaginationResponse.content.filter(
            (food) => food.id !== id,
          );
      }
    })
    .addCase(deleteFood.rejected, (state) => {
      state.status = ApiStatus.Failed;
    });
}

export default foodByLocationSlice.reducer;
