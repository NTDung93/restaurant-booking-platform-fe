import { AccountSignIn, User } from '@/common/models/user';
import { createAppAsyncThunk } from '@/libs/redux/createAppAsyncThunk';
import { UserToken } from '../../common/models/user/index';
import callApi from '@/utils/api';

const TypePrefix = 'user';

export const signIn = createAppAsyncThunk(
  `${TypePrefix}/signin`,
  async (data: AccountSignIn) => {
    const response = await callApi({
      method: 'post',
      url: '/auth/user/signin',
      data: data,
    });

    const userToken: UserToken = {
      accessToken: response.access_token,
      refreshToken: response.refresh_token,
    };

    return userToken;
  },
);

export const refreshToken = createAppAsyncThunk(
  `${TypePrefix}/refreshToken`,
  async () => {
    const response = await callApi(
      {
        method: 'post',
        url: '/auth/refresh-token',
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
        url: '/auth/user/info',
      },
      true,
    );

    const userInfo: User = response;

    return userInfo;
  },
);
