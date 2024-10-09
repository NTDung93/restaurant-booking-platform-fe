import counterReducer from '@/containers/location-user/Counter/slice';
import userReducer from '@/containers/location-user/Auth/slice';
export const reducer = {
  counter: counterReducer,
  user: userReducer,
};
