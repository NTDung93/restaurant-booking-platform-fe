import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="w-full bg-[#312525] text-white relative ">
      <div className="max-w-[90%] md:max-w-[80%] mx-auto flex flex-col md:flex-row justify-between py-8 md:py-10 px-4 md:px-5">
        <div className="w-full md:w-1/4 mb-6 md:mb-0">
          <h3 className="text-md md:text-lg font-bold uppercase">
            Về chúng tôi
          </h3>
          <ul className="mt-3 md:mt-4 space-y-1 md:space-y-2 text-xs md:text-sm font-normal uppercase">
            <li>Lorem ipsum dolo</li>
            <li>Lorem ipsum dolo</li>
            <li>Lorem ipsum dolo</li>
            <li>Lorem ipsum dolo</li>
          </ul>
        </div>

        <div className="w-full md:w-1/4 mb-6 md:mb-0">
          <h3 className="text-[#ffe8e8] text-md md:text-lg font-bold uppercase">
            Chính sách đặt bàn
          </h3>
          <ul className="mt-3 md:mt-4 space-y-1 md:space-y-2 text-xs md:text-sm text-[#ffe8e8] font-normal uppercase">
            <li>Lorem ipsum dolo</li>
            <li>Lorem ipsum dolo</li>
            <li>Lorem ipsum dolo</li>
            <li>Lorem ipsum dolo</li>
          </ul>
        </div>

        <div className="w-full md:w-1/4 mb-6 md:mb-0">
          <h3 className="text-[#e5e8eb] text-md md:text-lg font-bold uppercase">
            Liên hệ
          </h3>
          <ul className="mt-3 md:mt-4 space-y-1 md:space-y-2 text-xs md:text-sm text-[#e5e8eb] font-normal uppercase">
            <li>Lorem ipsum dolo</li>
            <li>Lorem ipsum dolo</li>
            <li>Lorem ipsum dolo</li>
            <li>Lorem ipsum dolo</li>
          </ul>
        </div>

        <div className="w-full md:w-1/4 mb-6 md:mb-0">
          <h3 className="text-[#ffe7e7] text-md md:text-lg font-semibold">
            Sign up for emails
          </h3>
          <p className="text-[#ffe7e7] text-xs md:text-sm font-light mt-2">
            Sign up for emails and receive $15 off your order of $75 or more.
            <br />
            <span className="underline">Exclusions apply</span>
          </p>
          <div className="mt-4">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-2 text-xs md:text-sm text-black placeholder-gray-400 rounded-md"
            />
            <button
              onClick={() => navigate('/signup')}
              className="mt-2 w-full bg-white text-black text-xs md:text-sm font-semibold py-2 rounded-md"
            >
              Đăng ký
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-600 py-4">
        <div className="max-w-[90%] md:max-w-[80%] mx-auto flex justify-between items-center text-xs md:text-sm text-gray-400">
          <div className="flex items-center">
            <div className="bg-white w-6 h-6 rounded-full flex items-center justify-center mr-2">
              <span className="text-black">C</span>
            </div>
            <p>2022 SLT Lending SPV INC | 317.559.2041 | Site Map</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
