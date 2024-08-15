import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, USER_ID_KEY } from '@/constants';
import {
  getCookie,
  removeAllCookies,
  removeAllLocalStorage,
  setCookie,
} from '@/utils/cache';

export default class User {
  private static instance: User;
  private constructor() {}

  static getInstance(): User {
    if (!User.instance) {
      User.instance = new User();
    }
    return User.instance;
  }

  setAccessToken(accessToken: string) {
    setCookie(ACCESS_TOKEN_KEY, accessToken);
  }

  setRefreshToken(refreshToken: string) {
    setCookie(REFRESH_TOKEN_KEY, refreshToken);
  }

  getAccessToken() {
    return getCookie(ACCESS_TOKEN_KEY);
  }

  getRefreshToken() {
    return getCookie(REFRESH_TOKEN_KEY);
  }

  getUserId() {
    return getCookie(USER_ID_KEY);
  }

  logout() {
    removeAllCookies();
    removeAllLocalStorage();
  }
}
