import { ApiError } from '@/common/models/apiError';
import axios from './axios';
import { AxiosResponse } from 'axios';
import UserService from '@/services/user';

export default async function callApi(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any = {},
  needAuth: boolean = false,
) {
  const headers = { ...options.headers };

  if (needAuth) {
    const token = UserService.getInstance().getAccessToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  return axios({ ...options, headers }).then(checkStatus);
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
