import counterReducer from '@/containers/Counter/slice';
import userReducer from '@/containers/SignIn/slice';
export const reducer = {
  counter: counterReducer,
  user: userReducer,
};
