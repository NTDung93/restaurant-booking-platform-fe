import counterReducer from '@/containers/restaurant-user/Counter/slice';
import userReducer from '@/containers/restaurant-user/SignIn/slice';
export const reducer = {
  counter: counterReducer,
  user: userReducer,
};
