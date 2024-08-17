import { ReduxDispatch } from '@/libs/redux/store';
import { useDispatch } from 'react-redux';
import { getUserInfo, refreshToken } from '../SignIn/thunks';

export default function Home() {
  const dispatch = useDispatch<ReduxDispatch>();

  return (
    <>
      <h1 className="text-3xl font-bold underline text-red-600">Home</h1>
      <p>Welcome to the home page</p>
      <button onClick={() => dispatch(refreshToken())}>Refresh</button>
      <br></br>
      <button onClick={() => dispatch(getUserInfo())}>Get user info</button>
    </>
  );
}
