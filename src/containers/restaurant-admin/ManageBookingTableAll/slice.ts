import { ApiStatus } from '@/common/enums/apiStatus';
import { BookingLocation } from '@/common/models/booking';
import { ResponseEntityPagination } from '@/common/models/pagination';
import {
  ActionReducerMapBuilder,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { fetchBookingByLocation, fetchBookingById, approveBookingByLocation, cancelBookingByLocation, successBookingByLocation } from './thunks';

export interface BookingByLocationSliceState {
  allBookingsPaginationResponse:
    | ResponseEntityPagination<BookingLocation>
    | undefined;
  bookingDetail: BookingLocation | undefined;
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
    setApproveBookingByLocation(builder);
    setCancelBookingByLocation(builder);
    setSuccessBookingByLocation(builder);
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

function setApproveBookingByLocation(
  builder: ActionReducerMapBuilder<BookingByLocationSliceState>,
) {
  builder
    .addCase(approveBookingByLocation.pending, (state: BookingByLocationSliceState) => {
      state.status = ApiStatus.Loading;
      state.bookingDetail = undefined;
    })
    .addCase(
      approveBookingByLocation.fulfilled,
      (
        state: BookingByLocationSliceState,
        action: PayloadAction<BookingLocation>,
      ) => {
        state.status = ApiStatus.Fulfilled;
        state.bookingDetail = action.payload;
      },
    )
    .addCase(
      approveBookingByLocation.rejected,
      (state: BookingByLocationSliceState) => {
        state.status = ApiStatus.Failed;
        state.bookingDetail = undefined;
      },
    );
}

function setCancelBookingByLocation(
  builder: ActionReducerMapBuilder<BookingByLocationSliceState>,
) {
  builder
    .addCase(cancelBookingByLocation.pending, (state: BookingByLocationSliceState) => {
      state.status = ApiStatus.Loading;
      state.bookingDetail = undefined;
    })
    .addCase(
      cancelBookingByLocation.fulfilled,
      (
        state: BookingByLocationSliceState,
        action: PayloadAction<BookingLocation>,
      ) => {
        state.status = ApiStatus.Fulfilled;
        state.bookingDetail = action.payload;
      },
    )
    .addCase(
      cancelBookingByLocation.rejected,
      (state: BookingByLocationSliceState) => {
        state.status = ApiStatus.Failed;
        state.bookingDetail = undefined;
      },
    );
}

function setSuccessBookingByLocation(
  builder: ActionReducerMapBuilder<BookingByLocationSliceState>,
) {
  builder
    .addCase(successBookingByLocation.pending, (state: BookingByLocationSliceState) => {
      state.status = ApiStatus.Loading;
      state.bookingDetail = undefined;
    })
    .addCase(
      successBookingByLocation.fulfilled,
      (
        state: BookingByLocationSliceState,
        action: PayloadAction<BookingLocation>,
      ) => {
        state.status = ApiStatus.Fulfilled;
        state.bookingDetail = action.payload;
      },
    )
    .addCase(
      successBookingByLocation.rejected,
      (state: BookingByLocationSliceState) => {
        state.status = ApiStatus.Failed;
        state.bookingDetail = undefined;
      },
    );
}

export default bookingByLocationSlice.reducer;
