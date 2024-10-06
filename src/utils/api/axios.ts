import axios from 'axios';
import { BASE_API_URL } from '@/utils/environment';
import User from '@/services/user';

const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error?.config;
    if (error?.response?.status === 403 && !prevRequest?.sent) {
      prevRequest.sent = true;

      try {
        const response = await axiosInstance({
          method: 'post',
          url: '/auth/refresh-token',
          headers: {
            Authorization: `Bearer ${User.getInstance().getRefreshToken()}`,
          },
        });

        User.getInstance().setAccessToken(response.data.access_token);
        User.getInstance().setRefreshToken(response.data.refresh_token);

        prevRequest.headers['Authorization'] =
          `Bearer ${response.data.access_token}`;
        return axiosInstance(prevRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
