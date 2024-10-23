import { ApiStatus } from '@/common/enums/apiStatus';
import {
  ActionReducerMapBuilder,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { fetchFeesOfLocation } from './thunks';
import { MonthlyCommissionPayment } from '@/common/models/fee';

export interface FeeByLocationSliceState {
  monthlyCommissionPayment: MonthlyCommissionPayment | undefined;
  status: ApiStatus;
}

const initialState: FeeByLocationSliceState = {
  monthlyCommissionPayment: undefined,
  status: ApiStatus.Idle,
};

const feeByLocationSlice = createSlice({
  name: 'feeByLocation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    setFeesOfLocationResponse(builder);
  },
});

function setFeesOfLocationResponse(
  builder: ActionReducerMapBuilder<FeeByLocationSliceState>,
) {
  builder
    .addCase(fetchFeesOfLocation.pending, (state: FeeByLocationSliceState) => {
      state.status = ApiStatus.Loading;
    })
    .addCase(
      fetchFeesOfLocation.fulfilled,
      (
        state: FeeByLocationSliceState,
        action: PayloadAction<MonthlyCommissionPayment>,
      ) => {
        state.status = ApiStatus.Fulfilled;
        state.monthlyCommissionPayment = action.payload;
      },
    )
    .addCase(fetchFeesOfLocation.rejected, (state: FeeByLocationSliceState) => {
      state.status = ApiStatus.Failed;
    });
}

export default feeByLocationSlice.reducer;
