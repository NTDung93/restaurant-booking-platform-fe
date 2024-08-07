import { ReduxState } from "@/libs/redux";

export const selectUserToken = (state: ReduxState) => 
    state.userToken.token;

export const selectUserStatus = (state: ReduxState) => 
    state.userToken.status;