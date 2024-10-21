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
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

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
      await dispatch(signUp(formData));
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
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Header />

        <div
          className="flex flex-col justify-center items-center px-4 py-10"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/dnslrwedn/image/upload/v1726239862/image_6_cirsev.png')",
          }}
        >
          <div className="max-w-[90%] sm:max-w-[60%] md:max-w-[50%] lg:max-w-[35%] w-full mx-auto flex flex-col items-center bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="w-full h-full p-6 sm:p-8 md:p-10 bg-[#d86500] text-white flex flex-col justify-center items-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
                Đăng ký
              </h2>

              <form className="w-full" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="w-full mb-4 sm:mb-6">
                    <label className="text-lg sm:text-xl font-medium mb-2 block">
                      Tên người dùng
                    </label>
                    <input
                      type="text"
                      name="username"
                      className="w-full p-2 border-b-2 border-white bg-transparent text-white focus:outline-none focus:border-gray-200 transition duration-300"
                      placeholder="Nhập tên người dùng"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="w-full mb-4 sm:mb-6">
                    <label className="text-lg sm:text-xl font-medium mb-2 block">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="w-full p-2 border-b-2 border-white bg-transparent text-white focus:outline-none focus:border-gray-200 transition duration-300"
                      placeholder="Nhập email của bạn"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="w-full mb-4 sm:mb-6 relative">
                    <label className="text-lg sm:text-xl font-medium mb-2 block">
                      Mật khẩu
                    </label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      className="w-full p-2 border-b-2 border-white bg-transparent text-white focus:outline-none focus:border-gray-200 transition duration-300"
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

                  <div className="w-full mb-4 sm:mb-6 relative">
                    <label className="text-lg sm:text-xl font-medium mb-2 block">
                      Xác nhận mật khẩu
                    </label>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      className="w-full p-2 border-b-2 border-white bg-transparent text-white focus:outline-none focus:border-gray-200 transition duration-300"
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

                  <div className="w-full mb-4 sm:mb-6">
                    <label className="text-lg sm:text-xl font-medium mb-2 block">
                      Họ tên
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      className="w-full p-2 border-b-2 border-white bg-transparent text-white focus:outline-none focus:border-gray-200 transition duration-300"
                      placeholder="Nhập họ tên của bạn"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="w-full mb-4 sm:mb-6">
                    <label className="text-lg sm:text-xl font-medium mb-2 block">
                      Số điện thoại
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      className="w-full p-2 border-b-2 border-white bg-transparent text-white focus:outline-none focus:border-gray-200 transition duration-300"
                      placeholder="Nhập số điện thoại"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="w-full mb-4 sm:mb-6">
                    <label className="text-lg sm:text-xl font-medium mb-2 block">
                      Giới tính
                    </label>
                    <select
                      name="gender"
                      className="w-full p-2 border-b-2 border-white bg-transparent text-black focus:outline-none focus:border-gray-200 transition duration-300"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Chọn giới tính</option>
                      <option value="Male">Nam</option>
                      <option value="Female">Nữ</option>
                      <option value="Other">Khác</option>
                    </select>
                  </div>
                </div>

                <button
                  className="w-full py-2 sm:py-3 bg-white text-[#d86500] font-bold text-base sm:text-lg md:text-xl rounded-lg shadow hover:bg-gray-100 transition duration-300 mb-3 sm:mb-4 flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? <Spin size="small" /> : 'Đăng ký'}
                </button>
              </form>

              <span className="text-white text-sm sm:text-base mb-3 sm:mb-4">
                Đã có tài khoản ?
              </span>

              <span
                onClick={handleSignIn}
                className="text-white underline cursor-pointer text-sm sm:text-base"
              >
                Đăng nhập
              </span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
