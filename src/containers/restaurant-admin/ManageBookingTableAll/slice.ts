import { ApiStatus } from '@/common/enums/apiStatus';
import { BookingLocation } from '@/common/models/booking';
import { ResponseEntityPagination } from '@/common/models/pagination';
import {
  ActionReducerMapBuilder,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { fetchBookingByLocation, fetchBookingById } from './thunks';

export interface BookingByLocationSliceState {
  allBookingsPaginationResponse:
    | ResponseEntityPagination<BookingLocation>
    | undefined;
  bookingDetail: BookingLocation | undefined; // Thêm trường cho booking theo ID
  status: ApiStatus;
}

const initialState: BookingByLocationSliceState = {
  allBookingsPaginationResponse: undefined,
  bookingDetail: undefined, // Khởi tạo bookingDetail là undefined
  status: ApiStatus.Idle,
};

const bookingByLocationSlice = createSlice({
  name: 'bookingByLocation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    setBookingByLocationResponse(builder);
    setBookingByIdResponse(builder);
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
        action: PayloadAction<ResponseEntityPagination<BookingLocation>>,
      ) => {
        state.status = ApiStatus.Fulfilled;
        state.allBookingsPaginationResponse = action.payload;
      },
    )
    .addCase(
      fetchBookingByLocation.rejected,
      (state: BookingByLocationSliceState) => {
        state.status = ApiStatus.Failed;
      },
    );
}

function setBookingByIdResponse(
  builder: ActionReducerMapBuilder<BookingByLocationSliceState>,
) {
  builder
    .addCase(fetchBookingById.pending, (state: BookingByLocationSliceState) => {
      state.status = ApiStatus.Loading;
      state.bookingDetail = undefined;
    })
    .addCase(
      fetchBookingById.fulfilled,
      (
        state: BookingByLocationSliceState,
        action: PayloadAction<BookingLocation>,
      ) => {
        state.status = ApiStatus.Fulfilled;
        state.bookingDetail = action.payload;
      },
    )
    .addCase(
      fetchBookingById.rejected,
      (state: BookingByLocationSliceState) => {
        state.status = ApiStatus.Failed;
        state.bookingDetail = undefined;
      },
    );
}

export default bookingByLocationSlice.reducer;
