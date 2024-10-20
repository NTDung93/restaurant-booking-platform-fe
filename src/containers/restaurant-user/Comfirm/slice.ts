import { ApiStatus } from '@/common/enums/apiStatus';
import {
  LocationBookingRequest,
  LocationBookingResponse,
} from '@/common/models/booking';
import { ResponseEntityPagination } from '@/common/models/pagination';
import {
  ActionReducerMapBuilder,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { fetchBookingByLocation, createBooking } from './thunks';

export interface BookingByLocationSliceState {
  bookingsPaginationResponse:
    | ResponseEntityPagination<LocationBookingResponse>
    | undefined;
  status: ApiStatus;
  createBookingStatus: ApiStatus;
  newBooking: LocationBookingRequest | null;
}

const initialState: BookingByLocationSliceState = {
  bookingsPaginationResponse: undefined,
  status: ApiStatus.Idle,
  createBookingStatus: ApiStatus.Idle,
  newBooking: null,
};

const bookingByLocationSlice = createSlice({
  name: 'bookingByLocation',
  initialState,
  reducers: {
    resetNewBooking: (state) => {
      state.newBooking = null;
    },
  },
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
        action: PayloadAction<
          ResponseEntityPagination<LocationBookingResponse>
        >,
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
    .addCase(
      createBooking.fulfilled,
      (
        state: BookingByLocationSliceState,
        action: PayloadAction<LocationBookingRequest>,
      ) => {
        state.createBookingStatus = ApiStatus.Fulfilled;

        state.newBooking = action.payload;
      },
    )
    .addCase(createBooking.rejected, (state: BookingByLocationSliceState) => {
      state.createBookingStatus = ApiStatus.Failed;
    });
}

export const { resetNewBooking } = bookingByLocationSlice.actions;

export default bookingByLocationSlice.reducer;
