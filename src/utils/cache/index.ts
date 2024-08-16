import Cookies from 'js-cookie';
import { cookies } from 'next/dist/client/components/headers';
import { isServer } from '@/utils/server';

const getCookie = (key: string) =>
  isServer() ? cookies().get(key)?.value : Cookies.get(key);

const setCookie = (key: string, value: string) => {
  if (isServer()) cookies().set(key, value);
  Cookies.set(key, value);
};

const removeCookie = (key: string) => {
  if (isServer()) cookies().delete(key);
  Cookies.remove(key);
};

const removeAllCookies = () => {
  const allCookies = Cookies.get();

  for (const cookieName in allCookies) {
    Cookies.remove(cookieName);
  }
};

const getLocalStorage = (key: string) => localStorage.getItem(key);

const setLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

const removeLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

const removeAllLocalStorage = () => {
  localStorage.clear();
};

const removeSessionStorage = (key: string) => {
  sessionStorage.removeItem(key);
};

export {
  getCookie,
  setCookie,
  removeCookie,
  removeAllCookies,
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage,
  removeAllLocalStorage,
  removeSessionStorage,
};
