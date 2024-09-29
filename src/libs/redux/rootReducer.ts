import counterReducer from '@/containers/client/Counter/slice';
import userReducer from '@/containers/client/SignIn/slice';
export const reducer = {
  counter: counterReducer,
  user: userReducer,
};
