import counterReducer from '@/containers/Counter/slice';
import userTokenReducer from '@/containers/SignIn/slice';
export const reducer = {
  counter: counterReducer,
  userToken: userTokenReducer,
};
