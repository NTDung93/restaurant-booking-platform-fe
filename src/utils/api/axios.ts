import axios from 'axios';
import { BASE_API_URL } from '@/utils/environment';

export default axios.create({
  baseURL: BASE_API_URL,
});
