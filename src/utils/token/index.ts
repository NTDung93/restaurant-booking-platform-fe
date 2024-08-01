import { jwtDecode } from 'jwt-decode';
import callApi from '../api';
import { UserRefreshToken } from '@/common/models/user';

export const isTokenExpired = (
  token: string,
  bufferTime: number = 0,
): boolean => {
  try {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp) {
      const currentTime = Date.now() / 1000;
      return decodedToken.exp < currentTime + bufferTime;
    }
    return false;
  } catch (error) {
    return true;
  }
};

export const setNewAccessToken = async (
  refreshToken: string,
): Promise<UserRefreshToken | null> => {
  try {
    const refreshTokenResponse = await callApi('user/refresh-token', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });
    return refreshTokenResponse;
  } catch (error) {
    return null;
  }
};
