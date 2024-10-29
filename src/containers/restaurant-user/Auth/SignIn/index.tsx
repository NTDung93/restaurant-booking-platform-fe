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
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  LockOutlined,
  MailOutlined,
} from '@ant-design/icons';

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
    <div className="flex flex-col min-h-screen bg-[#d86500]">
      <Header />
      <div
        className="flex flex-col justify-center items-center h-screen relative"
        style={{
          backgroundColor: '#d86500',
        }}
      >
        <div
          className="absolute inset-0 w-full"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/dnslrwedn/image/upload/v1726239862/image_6_cirsev.png')",
            backgroundPosition: 'center',
            opacity: 0.7,
            zIndex: 0,
          }}
        ></div>

        <div className="relative z-10 max-w-[90%] sm:max-w-[60%] md:max-w-[50%] lg:max-w-[35%] w-full mx-auto">
          <div
            className="backdrop-blur-sm bg-white/10 rounded-2xl shadow-2xl overflow-hidden 
                         transition-all duration-300 transform hover:scale-[1.02] border border-white/20"
          >
            <div className="w-full p-8 sm:p-10 bg-gradient-to-r from-[#d86500]/90 to-[#ffaf40]/90">
              <h2 className="text-4xl font-bold mb-8 text-center text-white drop-shadow-lg">
                Đăng nhập
              </h2>

              <form className="w-full space-y-6" onSubmit={onFinish}>
                <div className="space-y-2">
                  <label className="text-lg font-semibold text-white/90 block">
                    Email
                  </label>
                  <div className="relative">
                    <MailOutlined className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70" />
                    <input
                      type="text"
                      value={userNameOrEmailOrPhone}
                      onChange={(e) =>
                        setUserNameOrEmailOrPhone(e.target.value)
                      }
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/30 
                     text-white placeholder-white/50 focus:outline-none focus:ring-2 
                     focus:ring-white/50 focus:border-transparent transition-all duration-300
                     hover:bg-white/20"
                      placeholder="Nhập email của bạn"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-lg font-semibold text-white/90 block">
                    Mật khẩu
                  </label>
                  <div className="relative">
                    <LockOutlined className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/30 
                     text-white placeholder-white/50 focus:outline-none focus:ring-2 
                     focus:ring-white/50 focus:border-transparent transition-all duration-300
                     hover:bg-white/20"
                      placeholder="Nhập mật khẩu"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 
                     hover:text-white transition-colors duration-200"
                    >
                      {showPassword ? (
                        <EyeInvisibleOutlined className="text-xl" />
                      ) : (
                        <EyeOutlined className="text-xl" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 mt-6 bg-white rounded-xl text-[#d86500] font-bold text-lg
               shadow-lg hover:bg-opacity-90 transform transition-all duration-300
               hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-white/50
               active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? <Spin size="small" /> : 'Đăng nhập'}
                </button>

                <div className="mt-6 text-center space-y-2">
                  <p className="text-white/90 text-lg">
                    Chưa có tài khoản?
                    <span
                      onClick={handleSignUp}
                      className="text-white text-lg underline decoration-2 underline-offset-4
                   hover:text-white/80 transition-colors duration-200 ml-2"
                    >
                      Đăng ký
                    </span>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignIn;
