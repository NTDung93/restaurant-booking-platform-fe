import { ApiError } from '@/common/models/apiError';
import { AxiosResponse } from 'axios';
import UserService from '@/services/user';
import axiosInstance from './axios';

export default async function callApi(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any = {},
  needAuth: boolean = false,
  needRefresh: boolean = false,
) {
  const headers = { ...options.headers };

  if (needAuth) {
    const accessToken = UserService.getInstance().getAccessToken();
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }
  }

  if (needRefresh) {
    const refreshToken = UserService.getInstance().getRefreshToken();
    if (refreshToken) {
      headers.Authorization = `Bearer ${refreshToken}`;
    }
  }

  return axiosInstance({ ...options, headers }).then(checkStatus);
}

async function checkStatus(response: AxiosResponse) {
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }

  const error: ApiError = {
    code: response.data?.code || 'Unknown',
    message: response.data?.message || 'An error occurred',
    httpStatusCode: response.status,
  };

  throw error;
}
