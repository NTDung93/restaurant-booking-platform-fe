import counterReducer from '@/containers/restaurant-user/Counter/slice';
import userReducer from '@/containers/restaurant-user/Auth/slice';
import locationReducer from '@/containers/restaurant-user/Home/slice';
export const reducer = {
  counter: counterReducer,
  user: userReducer,
  location: locationReducer,
};
