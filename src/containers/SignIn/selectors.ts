import { ReduxState } from '@/libs/redux/store';

export const selectUserToken = (state: ReduxState) => state.userToken.token;

export const selectUserStatus = (state: ReduxState) => state.userToken.status;
