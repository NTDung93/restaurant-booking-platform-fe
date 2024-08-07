import { ApiStatus } from '@/common/enums/apiStatus';
import { UserToken } from '@/common/models/user';
import { signIn } from './thunks';
import { ActionReducerMapBuilder, PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface UserTokenSliceState {
  token: UserToken | undefined;
  status: ApiStatus;
}

const initialState: UserTokenSliceState = {
  token: undefined,
  status: ApiStatus.Idle,
};

const userTokenSlice = createSlice({
  name: 'userToken',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    setUserToken(builder);
  },
});

function setUserToken(builder: ActionReducerMapBuilder<UserTokenSliceState>) {
  builder
    .addCase(signIn.pending, (state: UserTokenSliceState) => {
      state.status = ApiStatus.Loading;
    })
    .addCase(
      signIn.fulfilled,
      (state: UserTokenSliceState, action: PayloadAction<UserToken>) => {
        state.status = ApiStatus.Fulfilled;
        state.token = action.payload;
      },
    )
    .addCase(signIn.rejected, (state: UserTokenSliceState) => {
      state.status = ApiStatus.Failed;
    });
}

export default userTokenSlice.reducer;