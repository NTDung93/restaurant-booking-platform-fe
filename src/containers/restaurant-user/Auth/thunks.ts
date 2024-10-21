import { AccountSignIn, AccountSignUp, User } from '@/common/models/user';
import { createAppAsyncThunk } from '@/libs/redux/createAppAsyncThunk';
import { UserToken } from '@/common/models/user';
import callApi from '@/utils/api';
import Cookies from 'js-cookie';
import { LocationBookingResponse } from '@/common/models/booking';
import { ResponseEntityPagination } from '@/common/models/pagination';

const TypePrefix = 'user';

export const signIn = createAppAsyncThunk(
  `${TypePrefix}/signin`,
  async (data: AccountSignIn) => {
    const response = await callApi({
      method: 'post',
      url: '/auth/login',
      data: data,
    });

    const userToken: UserToken = {
      accessToken: response.access_token,
      refreshToken: response.refresh_token,
    };

    return userToken;
  },
);
export const signUp = createAppAsyncThunk(
  `${TypePrefix}/signup`,
  async (data: AccountSignUp) => {
    const response = await callApi({
      method: 'post',
      url: '/auth/register/user',
      data: data,
    });

    const userToken: UserToken = {
      accessToken: response.access_token,
      refreshToken: response.refresh_token,
    };

    Cookies.set('access-token', userToken.accessToken);
    Cookies.set('refresh-token', userToken.refreshToken);

    return userToken;
  },
);

export const refreshToken = createAppAsyncThunk(
  `${TypePrefix}/refreshToken`,
  async () => {
    const response = await callApi(
      {
        method: 'post',
        url: '/auth/refresh_token',
      },
      false,
      true,
    );

    const userToken: UserToken = {
      accessToken: response.access_token,
      refreshToken: response.refresh_token,
    };

    return userToken;
  },
);

export const getUserInfo = createAppAsyncThunk(
  `${TypePrefix}/getUserInfo`,
  async () => {
    const response = await callApi(
      {
        method: 'get',
        url: '/auth/info',
      },
      true,
    );

    const userInfo: User = response;

    return userInfo;
  },
);

export const getUserBookingHitory = createAppAsyncThunk(
  `${TypePrefix}/getUserBookingHitory`,
  async ({
    currentPage,
    pageSize,
  }: {
    currentPage: number;
    pageSize: number;
  }) => {
    const response = await callApi(
      {
        method: 'get',
        url: `/location-bookings/user?pageNo=${currentPage}&pageSize=${pageSize}&sortDir=desc`,
      },
      true,
    );

    const userBookingHistory: ResponseEntityPagination<LocationBookingResponse> =
      response;
    return userBookingHistory;
  },
);

export const logout = createAppAsyncThunk(`${TypePrefix}/logout`, async () => {
  await callApi({
    method: 'get',
    url: '/logout',
  }),
    true;
});
