import { AccountSignIn } from '@/common/models/user';
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

    console.log('response ne', response);

    const userToken: UserToken = {
      accessToken: response.access_token,
      refreshToken: response.refresh_token,
    };

    return userToken;
  },
);
