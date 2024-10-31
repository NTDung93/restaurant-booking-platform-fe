import { ApiStatus } from '@/common/enums/apiStatus';
import { User, UserToken } from '@/common/models/user';
import {
  getAllFeedbackOfLocation,
  getBookingHitoryById,
  getFeedbackByLocationBookingId,
  getUserBookingHitory,
  getUserInfo,
  logout,
  signIn,
} from '@/containers/restaurant-user/Auth/thunks';
import {
  ActionReducerMapBuilder,
  PayloadAction,
  createSlice,
} from '@reduxjs/toolkit';
import UserService from '@/services/user';
import { LocationBookingResponse } from '@/common/models/booking';
import { ResponseEntityPagination } from '@/common/models/pagination';
import { LocationFeedbackResponse } from '@/common/models/feedback';

export interface UserSliceState {
  token: UserToken | undefined;
  userInfo: User | undefined;
  userBookingHitory:
    | ResponseEntityPagination<LocationBookingResponse>
    | undefined;
  bookingHitoryDetail: LocationBookingResponse | undefined;
  userStatus: ApiStatus;
  locationFeedbackResponse: LocationFeedbackResponse | undefined;
  feedbackByLocation:
    | ResponseEntityPagination<LocationFeedbackResponse>
    | undefined;
  status: ApiStatus;
}

const initialState: UserSliceState = {
  token: undefined,
  userInfo: undefined,
  userBookingHitory: undefined,
  locationFeedbackResponse: undefined,
  feedbackByLocation: undefined,
  bookingHitoryDetail: undefined,
  userStatus: ApiStatus.Idle,
  status: ApiStatus.Idle,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserInfo(state) {
      state.userInfo = undefined;
      state.token = undefined;
      state.userBookingHitory = undefined;
      state.locationFeedbackResponse = undefined;
      state.status = ApiStatus.Idle;
    },
  },
  extraReducers: (builder) => {
    setUserToken(builder);
    setUserInfo(builder);
    setUserBookingHitory(builder);
    setFeedbackByLocationBookingId(builder);
    setBookingHitoryDetail(builder);
    setAllFeedbackOfLocation(builder);
    setLogout(builder);
  },
});

function setUserToken(builder: ActionReducerMapBuilder<UserSliceState>) {
  builder
    .addCase(signIn.pending, (state: UserSliceState) => {
      state.status = ApiStatus.Loading;
    })
    .addCase(
      signIn.fulfilled,
      (state: UserSliceState, action: PayloadAction<UserToken>) => {
        state.status = ApiStatus.Fulfilled;
        state.token = action.payload;
        UserService.getInstance().setAccessToken(action.payload.accessToken);
        UserService.getInstance().setRefreshToken(action.payload.refreshToken);
      },
    )
    .addCase(signIn.rejected, (state: UserSliceState) => {
      state.status = ApiStatus.Failed;
    });
}

function setUserInfo(builder: ActionReducerMapBuilder<UserSliceState>) {
  builder
    .addCase(getUserInfo.pending, (state: UserSliceState) => {
      state.status = ApiStatus.Loading;
    })
    .addCase(
      getUserInfo.fulfilled,
      (state: UserSliceState, action: PayloadAction<User>) => {
        state.status = ApiStatus.Fulfilled;
        state.userInfo = action.payload;
      },
    )
    .addCase(getUserInfo.rejected, (state: UserSliceState) => {
      state.status = ApiStatus.Failed;
    });
}

function setUserBookingHitory(
  builder: ActionReducerMapBuilder<UserSliceState>,
) {
  builder
    .addCase(getUserBookingHitory.pending, (state: UserSliceState) => {
      state.userStatus = ApiStatus.Loading;
    })
    .addCase(
      getUserBookingHitory.fulfilled,
      (
        state: UserSliceState,
        action: PayloadAction<
          ResponseEntityPagination<LocationBookingResponse>
        >,
      ) => {
        state.userStatus = ApiStatus.Fulfilled;
        state.userBookingHitory = action.payload;
      },
    )
    .addCase(getUserBookingHitory.rejected, (state: UserSliceState) => {
      state.status = ApiStatus.Failed;
    });
}

function setBookingHitoryDetail(
  builder: ActionReducerMapBuilder<UserSliceState>,
) {
  builder
    .addCase(getBookingHitoryById.pending, (state: UserSliceState) => {
      state.userStatus = ApiStatus.Loading;
    })
    .addCase(
      getBookingHitoryById.fulfilled,
      (
        state: UserSliceState,
        action: PayloadAction<LocationBookingResponse>,
      ) => {
        state.userStatus = ApiStatus.Fulfilled;
        state.bookingHitoryDetail = action.payload;
      },
    )
    .addCase(getBookingHitoryById.rejected, (state: UserSliceState) => {
      state.status = ApiStatus.Failed;
    });
}

function setFeedbackByLocationBookingId(
  builder: ActionReducerMapBuilder<UserSliceState>,
) {
  builder
    .addCase(
      getFeedbackByLocationBookingId.pending,
      (state: UserSliceState) => {
        state.userStatus = ApiStatus.Loading;
      },
    )
    .addCase(
      getFeedbackByLocationBookingId.fulfilled,
      (
        state: UserSliceState,
        action: PayloadAction<LocationFeedbackResponse>,
      ) => {
        state.userStatus = ApiStatus.Fulfilled;
        state.locationFeedbackResponse = action.payload;
      },
    )
    .addCase(
      getFeedbackByLocationBookingId.rejected,
      (state: UserSliceState) => {
        state.status = ApiStatus.Failed;
        state.locationFeedbackResponse = undefined;
      },
    );
}

function setAllFeedbackOfLocation(
  builder: ActionReducerMapBuilder<UserSliceState>,
) {
  builder
    .addCase(getAllFeedbackOfLocation.pending, (state: UserSliceState) => {
      state.userStatus = ApiStatus.Loading;
    })
    .addCase(
      getAllFeedbackOfLocation.fulfilled,
      (
        state: UserSliceState,
        action: PayloadAction<
          ResponseEntityPagination<LocationFeedbackResponse>
        >,
      ) => {
        state.userStatus = ApiStatus.Fulfilled;
        state.feedbackByLocation = action.payload;
      },
    )
    .addCase(getAllFeedbackOfLocation.rejected, (state: UserSliceState) => {
      state.status = ApiStatus.Failed;
      state.feedbackByLocation = undefined;
    });
}

function setLogout(builder: ActionReducerMapBuilder<UserSliceState>) {
  builder.addCase(logout.fulfilled, (state: UserSliceState) => {
    state.status = ApiStatus.Idle;
    state.token = undefined;
    state.userInfo = undefined;
  });
}

export const { clearUserInfo } = userSlice.actions;
export default userSlice.reducer;
