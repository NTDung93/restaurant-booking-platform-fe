import axios from 'axios';
import { BASE_API_URL } from '@/utils/environment';

export default axios.create({
  baseURL: BASE_API_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});
