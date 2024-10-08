import { AccountSignUp } from '@/common/models/user'; // Nhập model
import { useDispatch } from 'react-redux';
import { signUp } from '@/containers/restaurant-user/Auth/thunks'; // Nhập thunk đăng ký
import Footer from '@/components/restaurant-user/Footer';
import Header from '@/components/restaurant-user/Header';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ReduxDispatch } from '@/libs/redux/store';
import { SIGN_IN_ROUTE } from '@/common/constants/routerConstant';

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== confirmPassword) {
      alert('Mật khẩu không khớp!');
      return;
    }

    try {
      await dispatch(signUp(formData));
      navigate(SIGN_IN_ROUTE);
    } catch (error) {
      console.error('Đăng ký thất bại:', error);
      alert('Đăng ký thất bại! Vui lòng kiểm tra lại thông tin.');
    }
  };

  const handleSignIn = () => {
    navigate(SIGN_IN_ROUTE);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
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

                  <div className="w-full mb-4 sm:mb-6">
                    <label className="text-lg sm:text-xl font-medium mb-2 block">
                      Mật khẩu
                    </label>
                    <input
                      type="password"
                      name="password"
                      className="w-full p-2 border-b-2 border-white bg-transparent text-white focus:outline-none focus:border-gray-200 transition duration-300"
                      placeholder="Nhập mật khẩu"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="w-full mb-4 sm:mb-6">
                    <label className="text-lg sm:text-xl font-medium mb-2 block">
                      Xác nhận mật khẩu
                    </label>
                    <input
                      type="password"
                      className="w-full p-2 border-b-2 border-white bg-transparent text-white focus:outline-none focus:border-gray-200 transition duration-300"
                      placeholder="Nhập lại mật khẩu"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>

                  {/* Thêm các trường khác như fullName, phone, gender ở đây nếu cần */}
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

                <button className="w-full py-2 sm:py-3 bg-white text-[#d86500] font-bold text-base sm:text-lg md:text-xl rounded-lg shadow hover:bg-gray-100 transition duration-300 mb-3 sm:mb-4">
                  Đăng ký
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
