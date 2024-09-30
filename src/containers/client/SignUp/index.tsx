import { useNavigate } from 'react-router-dom';
import Footer from '@/components/client/Footer';
import Header from '@/components/client/Header';

export default function SignUp() {
  const navigate = useNavigate();
  const handleSignIn = () => {
    navigate('/signin');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Header />

        {/* Main */}
        <div
          className="flex flex-col justify-center items-center h-screen px-4"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/dnslrwedn/image/upload/v1726239862/image_6_cirsev.png')",
          }}
        >
          <div className="max-w-[95%] sm:max-w-[85%] md:max-w-[75%] lg:max-w-[65%] w-full mx-auto flex flex-col items-center bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Form Section */}
            <div className="w-full h-full p-6 sm:p-8 md:p-10 lg:p-12 bg-[#d86500] text-white flex flex-col justify-center items-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8">
                Đăng ký
              </h2>

              <div className="w-full mb-4 sm:mb-6">
                <label className="text-lg sm:text-xl font-medium mb-2 block">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full p-2 border-b-2 border-white bg-transparent text-white focus:outline-none focus:border-gray-200 transition duration-300"
                  placeholder="Nhập email của bạn"
                />
              </div>

              <div className="w-full mb-4 sm:mb-6">
                <label className="text-lg sm:text-xl font-medium mb-2 block">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  className="w-full p-2 border-b-2 border-white bg-transparent text-white focus:outline-none focus:border-gray-200 transition duration-300"
                  placeholder="Nhập mật khẩu"
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
                />
              </div>

              <button className="w-full py-2 sm:py-3 bg-white text-[#d86500] font-bold text-base sm:text-lg md:text-xl rounded-lg shadow hover:bg-gray-100 transition duration-300 mb-3 sm:mb-4">
                Đăng ký
              </button>

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
