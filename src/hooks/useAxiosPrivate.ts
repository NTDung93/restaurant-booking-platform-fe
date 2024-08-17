import { selectUserToken } from '@/containers/SignIn/selectors';
import { refreshToken } from '@/containers/SignIn/thunks';
import { ReduxDispatch } from '@/libs/redux/store';
import User from '@/services/user';
import axios, { axiosPrivate } from '@/utils/api/axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useAxiosPrivate = () => {
  const token = useSelector(selectUserToken);
  const dispatch = useDispatch<ReduxDispatch>();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] =
            `Bearer ${User.getInstance().getAccessToken()}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const getTokenResult = await dispatch(refreshToken());
          if (refreshToken.fulfilled.match(getTokenResult)) {
            prevRequest.headers['Authorization'] =
              `Bearer ${token?.accessToken}`;
            return axiosPrivate(prevRequest);
          }
          return Promise.reject(error);
        }
      },
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [dispatch, token]);

  return axios;
};
