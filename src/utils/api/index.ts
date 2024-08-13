import { ApiError } from '@/common/models/apiError';
import axios from './axios';
import { AxiosResponse } from 'axios';

export default async function callApi(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any = {},
) {
  return axios(options).then(checkStatus);
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
