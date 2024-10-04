import { AccountSignIn, User } from '@/common/models/user';
import { createAppAsyncThunk } from '@/libs/redux/createAppAsyncThunk';
import { UserToken } from '@/common/models/user';
import callApi from '@/utils/api';

const TypePrefix = 'user';

export const signIn = createAppAsyncThunk(
  `${TypePrefix}/signin`,
  async (data: AccountSignIn) => {
    const response = await callApi({
      method: 'post',
      url: 'http://localhost:8080/api/v1/auth/login',
      data: data,
    });

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
