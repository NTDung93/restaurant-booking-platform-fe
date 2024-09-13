import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const navigate = useNavigate();
  return (
    <>
      <Header />

      {/* Main */}
      <div className="flex flex-col md:flex-row justify-center items-center h-screen relative">
        <div className="max-w-[90%] md:max-w-[80%] w-full mx-auto flex flex-col md:flex-row items-center bg-[#d86500]">
          <div className="w-full md:w-1/2 flex justify-center items-center relative">
            <div className="w-full h-full bg-black/20">
              <img
                className="w-full h-full object-cover"
                src="https://via.placeholder.com/941x752"
                alt="Placeholder"
              />
            </div>

            <div className="absolute top-[35%] md:top-[40%] right-[-10%] md:right-[-20%] transform rotate-[-90deg]">
              <button
                className="w-[150px] md:w-[180px] h-10 md:h-12 px-4 mr-2.5 ml-2.5 bg-transparent border-2 border-white text-white font-medium text-lg md:text-xl rounded-lg hover:bg-white hover:text-[#d86500] transition duration-300"
                onClick={() => navigate('/signin')}
              >
                Đăng nhập
              </button>
              <button
                className="w-[150px] md:w-[180px] h-10 md:h-12 px-4 mb-4  md:mb-6 bg-[#d86500] text-white font-medium text-lg md:text-xl rounded-lg hover:bg-[#ff8c1a] transition duration-300"
                onClick={() => navigate('/signup')}
              >
                Đăng ký
              </button>
            </div>
          </div>

          <div className="w-full md:w-1/2 px-6 md:px-10 flex flex-col items-center text-white">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8">
              Đăng ký
            </h2>

            <div className="w-full mb-4 md:mb-6">
              <label className="text-xl md:text-2xl font-medium">Email</label>
              <input
                type="email"
                className="w-full mt-2 p-2 border-b-2 border-white bg-transparent text-white focus:outline-none"
                placeholder="Nhập email của bạn"
              />
            </div>

            <div className="w-full mb-4 md:mb-6">
              <label className="text-xl md:text-2xl font-medium">
                Mật khẩu
              </label>
              <input
                type="password"
                className="w-full mt-2 p-2 border-b-2 border-white bg-transparent text-white focus:outline-none"
                placeholder="Nhập mật khẩu"
              />
            </div>
            <div className="w-full mb-4 md:mb-6">
              <label className="text-xl md:text-2xl font-medium">
                Xác nhận mật khẩu
              </label>
              <input
                type="password"
                className="w-full mt-2 p-2 border-b-2 border-white bg-transparent text-white focus:outline-none"
                placeholder="Nhập mật khẩu"
              />
            </div>

            <button className="w-full py-3 bg-white text-[#d86500] font-bold text-lg md:text-xl rounded-lg hover:bg-gray-200 transition duration-300">
              Đăng ký
            </button>

            <div className="flex items-center mt-4 md:mt-6">
              <input
                type="checkbox"
                id="terms"
                className="w-4 h-4 md:w-5 md:h-5 mr-2"
              />
              <label htmlFor="terms" className="text-sm md:text-xl">
                Tôi chấp nhận Điều khoản và Điều kiện
              </label>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
