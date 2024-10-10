import counterReducer from '@/containers/restaurant-user/Counter/slice';
import userReducer from '@/containers/restaurant-user/Auth/slice';
export const reducer = {
  counter: counterReducer,
  user: userReducer,
};
