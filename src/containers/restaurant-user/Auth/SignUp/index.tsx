import { AccountSignUp } from '@/common/models/user';
import { useDispatch } from 'react-redux';
import { signUp } from '@/containers/restaurant-user/Auth/thunks';
import Footer from '@/components/restaurant-user/Footer';
import Header from '@/components/restaurant-user/Header';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ReduxDispatch } from '@/libs/redux/store';
import { HOME_ROUTE, SIGN_IN_ROUTE } from '@/common/constants/routerConstant';
import { Spin, notification } from 'antd';
import {
  DownOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from '@ant-design/icons';
import ScrollToTopButton from '@/components/ScrollToTopButton';

export default function SignUp() {
  const dispatch = useDispatch<ReduxDispatch>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<AccountSignUp>({
    username: '',
    email: '',
    password: '',
    fullName: '',
    phone: '',
    gender: '',
  });

  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const openNotification = (message: string, description?: string) => {
    notification.error({
      message,
      description,
      placement: 'topRight',
      duration: 2.5,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    for (const key in formData) {
      if (formData[key as keyof AccountSignUp] === '') {
        openNotification('Thiếu thông tin', `Vui lòng nhập ${key}`);
        return;
      }
    }

    const passwordValidationRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!passwordValidationRegex.test(formData.password)) {
      openNotification(
        'Mật khẩu không hợp lệ',
        'Mật khẩu phải có ít nhất 8 ký tự, 1 chữ in hoa và 1 ký tự đặc biệt!',
      );
      return;
    }

    if (formData.password !== confirmPassword) {
      openNotification(
        'Mật khẩu không khớp',
        'Vui lòng xác nhận mật khẩu đúng!',
      );
      return;
    }

    const phoneValidationRegex = /^\d{10}$/;
    if (!phoneValidationRegex.test(formData.phone)) {
      openNotification(
        'Số điện thoại không hợp lệ',
        'Số điện thoại phải có đúng 10 chữ số!',
      );
      return;
    }

    setLoading(true);

    try {
      const dataToSend = {
        ...formData,
        username: formData.email,
      };

      await dispatch(signUp(dataToSend));
      navigate(HOME_ROUTE);
    } catch (error) {
      console.error('Đăng ký thất bại:', error);
      openNotification('Đăng ký thất bại', 'Vui lòng kiểm tra lại thông tin.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = () => {
    navigate(SIGN_IN_ROUTE);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
            <div className="w-full p-8 sm:p-10 bg-gradient-to-r from-amber-600/90 to-amber-400/90">
              <h2 className="text-4xl font-bold mb-8 text-center text-white drop-shadow-lg">
                Đăng ký
              </h2>

              <form className="w-full" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Email Input */}
                  <div className="w-full mb-4 sm:mb-6 space-y-2 relative">
                    <label className="text-lg font-semibold text-white/90 block">
                      Email
                    </label>
                    <span className="absolute left-4 top-10 text-white">
                      <MailOutlined />
                    </span>
                    <input
                      type="email"
                      name="email"
                      className="w-full pl-10 px-4 py-3.5 rounded-xl bg-white/10 border border-white/30 
        text-white placeholder-white/50 focus:outline-none focus:ring-2 
        focus:ring-white/50 focus:border-transparent transition-all duration-300
        hover:bg-white/20"
                      placeholder="Nhập email của bạn"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Full Name Input */}
                  <div className="w-full mb-4 sm:mb-6 space-y-2 relative">
                    <label className="text-lg font-semibold text-white/90 block">
                      Họ tên
                    </label>
                    <span className="absolute left-4 top-10 text-white">
                      <UserOutlined />
                    </span>
                    <input
                      type="text"
                      name="fullName"
                      className="w-full pl-10 px-4 py-3.5 rounded-xl bg-white/10 border border-white/30 
        text-white placeholder-white/50 focus:outline-none focus:ring-2 
        focus:ring-white/50 focus:border-transparent transition-all duration-300
        hover:bg-white/20"
                      placeholder="Nhập họ tên của bạn"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Password Input */}
                  <div className="w-full mb-4 sm:mb-6 relative space-y-2">
                    <label className="text-lg font-semibold text-white/90 block">
                      Mật khẩu
                    </label>
                    <span className="absolute left-4 top-10 text-white">
                      <LockOutlined />
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      className="w-full pl-10 px-4 py-3.5 rounded-xl bg-white/10 border border-white/30 
        text-white placeholder-white/50 focus:outline-none focus:ring-2 
        focus:ring-white/50 focus:border-transparent transition-all duration-300
        hover:bg-white/20"
                      placeholder="Nhập mật khẩu"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-10 text-white focus:outline-none"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeInvisibleOutlined />
                      ) : (
                        <EyeOutlined />
                      )}
                    </button>
                  </div>

                  {/* Confirm Password Input */}
                  <div className="w-full mb-4 sm:mb-6 relative space-y-2">
                    <label className="text-lg font-semibold text-white/90 block">
                      Xác nhận mật khẩu
                    </label>
                    <span className="absolute left-4 top-10 text-white">
                      <LockOutlined />
                    </span>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      className="w-full pl-10 px-4 py-3.5 rounded-xl bg-white/10 border border-white/30 
        text-white placeholder-white/50 focus:outline-none focus:ring-2 
        focus:ring-white/50 focus:border-transparent transition-all duration-300
        hover:bg-white/20"
                      placeholder="Nhập lại mật khẩu"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-10 text-white focus:outline-none"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeInvisibleOutlined />
                      ) : (
                        <EyeOutlined />
                      )}
                    </button>
                  </div>

                  {/* Phone Number Input */}
                  <div className="w-full mb-4 sm:mb-6 relative space-y-2">
                    <label className="text-lg font-semibold text-white/90 block">
                      Số điện thoại
                    </label>
                    <span className="absolute left-4 top-10 text-white">
                      <PhoneOutlined />
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      className="w-full pl-10 px-4 py-3.5 rounded-xl bg-white/10 border border-white/30 
        text-white placeholder-white/50 focus:outline-none focus:ring-2 
        focus:ring-white/50 focus:border-transparent transition-all duration-300
        hover:bg-white/20"
                      placeholder="Nhập số điện thoại"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Gender Select */}
                  <div className="w-full mb-4 sm:mb-6 relative space-y-2">
                    <label className="text-lg font-semibold text-white/90 block">
                      Giới tính
                    </label>
                    <span className="absolute left-4 top-10 text-white">
                      <UserOutlined />
                    </span>
                    <select
                      name="gender"
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/30 
      text-white placeholder-white/50 focus:outline-none focus:ring-2 
      focus:ring-white/50 focus:border-transparent transition-all duration-300
      hover:bg-white/20 appearance-none"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled className="text-white">
                        Chọn giới tính
                      </option>
                      <option value="Male" className="text-black">
                        Nam
                      </option>
                      <option value="Female" className="text-black">
                        Nữ
                      </option>
                      <option value="Other" className="text-black">
                        Khác
                      </option>
                    </select>
                    {/* Custom Arrow Icon */}
                    <span className="absolute right-4 top-10 text-white">
                      <DownOutlined />
                    </span>
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
                  {loading ? <Spin /> : 'Đăng ký'}
                </button>
                <div className="mt-6 text-center space-y-2">
                  <p className="text-white/90 text-lg">
                    Đã có tài khoản?{' '}
                    <span
                      onClick={handleSignIn}
                      className="text-white text-lg underline decoration-2 underline-offset-4
        hover:text-white/80 transition-colors duration-200 ml-2"
                    >
                      Đăng nhập
                    </span>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
