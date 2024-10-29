import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ReduxDispatch } from '@/libs/redux/store';
import Footer from '@/components/restaurant-user/Footer';
import Header from '@/components/restaurant-user/Header';
import { pick } from 'lodash';
import { useEffect, useState } from 'react';
import { getUserInfo, signIn } from '../thunks';
import {
  HOME_ROUTE,
  RESTAURANT_ADMIN_HOME_ROUTE,
  SIGN_UP_ROUTE,
} from '@/common/constants/routerConstant';
import { Spin, notification } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import ScrollToTopButton from '@/components/ScrollToTopButton';

const SignIn: React.FC = () => {
  const [userNameOrEmailOrPhone, setUserNameOrEmailOrPhone] =
    useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<ReduxDispatch>();
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate(SIGN_UP_ROUTE);
  };

  const onFinish = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const accountSignIn = pick({ userNameOrEmailOrPhone, password }, [
      'userNameOrEmailOrPhone',
      'password',
    ]);
    const resultAction = await dispatch(signIn(accountSignIn));

    if (signIn.fulfilled.match(resultAction)) {
      const userInfoAction = await dispatch(getUserInfo());

      if (getUserInfo.fulfilled.match(userInfoAction)) {
        const userInfo = userInfoAction.payload;
        if (userInfo.roleName === 'USER') {
          navigate(HOME_ROUTE);
        } else {
          navigate(RESTAURANT_ADMIN_HOME_ROUTE);
        }
      } else {
        notification.error({
          message: 'Không thể lấy thông tin người dùng',
          description: 'Vui lòng thử lại sau.',
          placement: 'topRight',
        });
      }
    } else {
      notification.error({
        message: 'Đăng nhập không thành công',
        description: 'Sai tài khoản hoặc mật khẩu.',
        placement: 'topRight',
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [dispatch]);

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
        <div className="max-w-[90%] sm:max-w-[60%] md:max-w-[50%] lg:max-w-[35%] w-full mx-auto flex flex-col items-center bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="w-full h-full p-6 sm:p-8 md:p-10 bg-[#d86500] text-white flex flex-col justify-center items-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
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

              <div className="w-full mb-4 sm:mb-6 relative">
                <label className="text-lg sm:text-xl font-medium mb-2 block">
                  Mật khẩu
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border-b-2 border-white bg-transparent text-white focus:outline-none focus:border-gray-200 transition duration-300"
                  placeholder="Nhập mật khẩu"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-10 text-white focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-2 sm:py-3 bg-white text-[#d86500] font-bold text-base sm:text-lg md:text-xl rounded-lg shadow hover:bg-gray-100 transition duration-300 mb-3 sm:mb-4 flex items-center justify-center"
                disabled={loading}
              >
                {loading ? <Spin size="small" /> : 'Đăng nhập'}
              </button>
              <span className="text-white text-sm sm:text-base mb-3 sm:mb-4 text-center block">
                Chưa có tài khoản?
              </span>

              <span
                onClick={handleSignUp}
                className="text-white text-sm sm:text-base mb-3 sm:mb-4 text-center block underline cursor-pointer"
              >
                Đăng ký
              </span>
            </form>
          </div>
        </div>
      </div>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default SignIn;
