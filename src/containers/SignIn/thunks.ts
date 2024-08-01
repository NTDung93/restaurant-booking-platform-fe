import { AccountSignIn } from '@/common/models/user';
import { createAppAsyncThunk } from '@/libs/redux/createAppAsyncThunk';
import callApi from '@/utils/api';

const TypePrefix = 'user';

export const signIn = createAppAsyncThunk(
  `${TypePrefix}/signin`,
  async (data: AccountSignIn) =>
    await callApi(
      `/auth/user/signin`,
      {
        method: 'POST',
        body: JSON.stringify(data),
      },
      false,
    ),
);
