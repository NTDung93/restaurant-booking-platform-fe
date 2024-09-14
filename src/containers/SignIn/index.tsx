import { useNavigate } from 'react-router-dom';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function SignIn() {
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
                src="https://res.cloudinary.com/dnslrwedn/image/upload/v1726239862/image_6_cirsev.png"
                alt="Placeholder"
              />
            </div>

            <div className="absolute top-[35%] md:top-[40%] right-[-10%] md:right-[-20%] transform rotate-[-90deg]">
              <button
                className="w-[150px] md:w-[180px] h-10 md:h-12 px-4 mb-4 mr-2.5 md:mb-6 bg-[#d86500] text-white font-medium text-lg md:text-xl rounded-lg hover:bg-[#ff8c1a] transition duration-300"
                onClick={() => navigate('/signin')}
              >
                Đăng nhập
              </button>
              <button
                className="w-[150px] md:w-[180px] h-10 md:h-12 px-4 ml-2.5 bg-transparent border-2 border-white text-white font-medium text-lg md:text-xl rounded-lg hover:bg-white hover:text-[#d86500] transition duration-300"
                onClick={() => navigate('/signup')}
              >
                Đăng ký
              </button>
            </div>
          </div>

          <div className="w-full md:w-1/2 px-6 md:px-10 flex flex-col items-center text-white">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8">
              Đăng nhập
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

            <button className="w-full py-3 bg-white text-[#d86500] font-bold text-lg md:text-xl rounded-lg hover:bg-gray-200 transition duration-300">
              Đăng nhập
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
