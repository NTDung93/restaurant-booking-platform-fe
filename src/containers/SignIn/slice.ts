import { ApiStatus } from '@/common/enums/apiStatus';
import { User, UserToken } from '@/common/models/user';
import { getUserInfo, signIn } from './thunks';
import {
  ActionReducerMapBuilder,
  PayloadAction,
  createSlice,
} from '@reduxjs/toolkit';
import UserService from '@/services/user';

export interface UserSliceState {
  token: UserToken | undefined;
  userInfo: User | undefined;
  status: ApiStatus;
}

const initialState: UserSliceState = {
  token: undefined,
  userInfo: undefined,
  status: ApiStatus.Idle,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    setUserToken(builder);
    setUserInfo(builder);
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

export default userSlice.reducer;
