import { AccountSignIn } from '@/common/models/user';
import { createAppAsyncThunk } from '@/libs/redux/createAppAsyncThunk';
import callApi from '@/utils/api';
import { UserToken } from '../../common/models/user/index';

const TypePrefix = 'user';

export const signIn = createAppAsyncThunk(
  `${TypePrefix}/signin`,
  async (data: AccountSignIn) => {
    // const response = await callApi(
    //   `/auth/user/signin`,
    //   {
    //     method: 'POST',
    //     body: JSON.stringify(data),
    //   },
    //   false,
    // );
    // const userToken: UserToken = {
    //   accessToken: response.access_token,
    //   refreshToken: response.refresh_token,
    // };
    const userToken: UserToken = {
      accessToken: '123',
      refreshToken: '456'
    }
    return userToken;
  }
);
