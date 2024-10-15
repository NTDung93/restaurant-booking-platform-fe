import { ApiStatus } from '@/common/enums/apiStatus';
import { Booking } from '@/common/models/booking';
import { ResponseEntityPagination } from '@/common/models/pagination';
import {
  ActionReducerMapBuilder,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { fetchBookingByLocation, createBooking } from './thunks';

export interface BookingByLocationSliceState {
  bookingsPaginationResponse: ResponseEntityPagination<Booking> | undefined;
  status: ApiStatus;
  createBookingStatus: ApiStatus;
}

const initialState: BookingByLocationSliceState = {
  bookingsPaginationResponse: undefined,
  status: ApiStatus.Idle,
  createBookingStatus: ApiStatus.Idle,
};

const bookingByLocationSlice = createSlice({
  name: 'bookingByLocation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    setBookingByLocationResponse(builder);
    setCreateBookingResponse(builder);
  },
});

function setBookingByLocationResponse(
  builder: ActionReducerMapBuilder<BookingByLocationSliceState>,
) {
  builder
    .addCase(
      fetchBookingByLocation.pending,
      (state: BookingByLocationSliceState) => {
        state.status = ApiStatus.Loading;
      },
    )
    .addCase(
      fetchBookingByLocation.fulfilled,
      (
        state: BookingByLocationSliceState,
        action: PayloadAction<ResponseEntityPagination<Booking>>,
      ) => {
        state.status = ApiStatus.Fulfilled;
        state.bookingsPaginationResponse = action.payload;
      },
    )
    .addCase(
      fetchBookingByLocation.rejected,
      (state: BookingByLocationSliceState) => {
        state.status = ApiStatus.Failed;
      },
    );
}

function setCreateBookingResponse(
  builder: ActionReducerMapBuilder<BookingByLocationSliceState>,
) {
  builder
    .addCase(createBooking.pending, (state: BookingByLocationSliceState) => {
      state.createBookingStatus = ApiStatus.Loading;
    })
    .addCase(createBooking.fulfilled, (state: BookingByLocationSliceState) => {
      state.createBookingStatus = ApiStatus.Fulfilled;
    })
    .addCase(createBooking.rejected, (state: BookingByLocationSliceState) => {
      state.createBookingStatus = ApiStatus.Failed;
    });
}

export default bookingByLocationSlice.reducer;
