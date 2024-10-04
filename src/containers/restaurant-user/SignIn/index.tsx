import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signIn } from './thunks';
import { ReduxDispatch } from '@/libs/redux/store';
import Footer from '@/components/restaurant-user/Footer';
import Header from '@/components/restaurant-user/Header';
import { pick } from 'lodash';
import { useState } from 'react';

const SignIn: React.FC = () => {
  const [userNameOrEmailOrPhone, setUserNameOrEmailOrPhone] =
    useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch<ReduxDispatch>();
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/signup');
  };

  const onFinish = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const accountSignIn = pick({ userNameOrEmailOrPhone, password }, [
      'userNameOrEmailOrPhone',
      'password',
    ]);
    const resultAction = await dispatch(signIn(accountSignIn));

    if (signIn.fulfilled.match(resultAction)) {
      navigate('/');
    } else {
      console.error('Login failed');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div
        className="flex flex-col justify-center items-center h-screen px-4"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dnslrwedn/image/upload/v1726239862/image_6_cirsev.png')",
        }}
      >
        <div className="max-w-[95%] sm:max-w-[85%] md:max-w-[75%] lg:max-w-[65%] w-full mx-auto flex flex-col items-center bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="w-full h-full p-6 sm:p-8 md:p-10 lg:p-12 bg-[#d86500] text-white flex flex-col justify-center items-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8">
              Đăng nhập
            </h2>
            <form className="w-full" onSubmit={onFinish}>
              <div className="w-full mb-4 sm:mb-6">
                <label className="text-lg sm:text-xl font-medium mb-2 block">
                  Email hoặc Tên đăng nhập
                </label>
                <input
                  type="text"
                  value={userNameOrEmailOrPhone}
                  onChange={(e) => setUserNameOrEmailOrPhone(e.target.value)}
                  className="w-full p-2 border-b-2 border-white bg-transparent text-white focus:outline-none focus:border-gray-200 transition duration-300"
                  placeholder="Nhập email hoặc tên đăng nhập của bạn"
                  required
                />
              </div>

              <div className="w-full mb-4 sm:mb-6">
                <label className="text-lg sm:text-xl font-medium mb-2 block">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border-b-2 border-white bg-transparent text-white focus:outline-none focus:border-gray-200 transition duration-300"
                  placeholder="Nhập mật khẩu"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 sm:py-3 bg-white text-[#d86500] font-bold text-base sm:text-lg md:text-xl rounded-lg shadow hover:bg-gray-100 transition duration-300 mb-3 sm:mb-4"
              >
                Đăng nhập
              </button>
              <span className="text-white text-sm sm:text-base mb-3 sm:mb-4">
                Chưa có tài khoản?
              </span>

              <span
                onClick={handleSignUp}
                className="text-white underline cursor-pointer text-sm sm:text-base"
              >
                Đăng ký
              </span>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignIn;
