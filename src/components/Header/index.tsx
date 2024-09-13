import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <>
      <header className="w-full h-[80px] md:h-[100px] bg-[#312525]">
        <div className="max-w-[90%] md:max-w-[80%] mx-auto h-full flex items-center justify-between">
          <div className="flex items-center space-x-2 md:space-x-4">
            <img
              className="w-[80px] md:w-[100px] h-auto"
              src="https://via.placeholder.com/100x98"
              alt="Logo"
            />
            <nav className="hidden md:flex space-x-4 md:space-x-10">
              <Link
                to="/"
                className="text-white text-lg md:text-xl hover:text-[#D86500]"
              >
                Trang chủ
              </Link>
              <a
                href="#"
                className="text-white text-lg md:text-xl hover:text-[#D86500]"
              >
                Sự kiện
              </a>
              <a
                href="#"
                className="text-white text-lg md:text-xl hover:text-[#D86500]"
              >
                Liên hệ
              </a>
              <a
                href="#"
                className="text-white text-lg md:text-xl hover:text-[#D86500]"
              >
                Blogs
              </a>
              <a
                href="#"
                className="text-white text-lg md:text-xl hover:text-[#D86500]"
              >
                Gần bạn
              </a>
            </nav>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="text-white text-lg md:text-xl hover:text-[#D86500]">
              Tài khoản
            </div>
            <div className="w-[40px] md:w-[49px] h-[40px] md:h-[49px] bg-[#d9d9d9] rounded-full"></div>
          </div>
        </div>
      </header>
    </>
  );
}
