import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState(''); // Thêm trạng thái cho link được nhấn

  const handleNavClick = (navItem: string) => {
    setActiveNav(navItem);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="w-full h-[80px] md:h-[100px] bg-[#312525] fixed top-0 left-0 z-50">
        <div className="max-w-[90%] md:max-w-[80%] mx-auto h-full flex items-center justify-between">
          <div className="flex items-center space-x-2 md:space-x-4">
            <img
              className="w-[80px] md:w-[100px] h-auto"
              src="https://via.placeholder.com/100x98"
              alt="Logo"
            />
            <nav
              className={`md:flex space-x-4 md:space-x-10 ${isMenuOpen ? 'flex' : 'hidden'} md:block flex-col md:flex-row absolute md:static left-0 top-[80px] w-full bg-[#312525] md:bg-transparent`}
            >
              <a href=""></a>
              <Link
                to="/"
                className={`text-white text-lg md:text-xl hover:text-[#D86500] p-4 md:p-0 ${activeNav === 'home' ? 'text-[#D86500]' : ''}`}
                onClick={() => handleNavClick('home')}
              >
                Trang chủ
              </Link>
              <a
                href="#"
                className={`text-white text-lg md:text-xl hover:text-[#D86500] p-4 md:p-0 ${activeNav === 'event' ? 'text-[#D86500]' : ''}`}
                onClick={() => handleNavClick('event')}
              >
                Sự kiện
              </a>
              <a
                href="#"
                className={`text-white text-lg md:text-xl hover:text-[#D86500] p-4 md:p-0 ${activeNav === 'contact' ? 'text-[#D86500]' : ''}`}
                onClick={() => handleNavClick('contact')}
              >
                Liên hệ
              </a>
              <a
                href="#"
                className={`text-white text-lg md:text-xl hover:text-[#D86500] p-4 md:p-0 ${activeNav === 'blogs' ? 'text-[#D86500]' : ''}`}
                onClick={() => handleNavClick('blogs')}
              >
                Blogs
              </a>
              <a
                href="#"
                className={`text-white text-lg md:text-xl hover:text-[#D86500] p-4 md:p-0 ${activeNav === 'nearYou' ? 'text-[#D86500]' : ''}`}
                onClick={() => handleNavClick('nearYou')}
              >
                Gần bạn
              </a>
            </nav>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="hidden md:flex items-center flex-grow mx-4">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="w-full p-2 text-black placeholder-gray-400 rounded-md"
              />
            </div>
            <Link
              to="/signin"
              className="text-white text-lg md:text-xl hover:text-[#D86500]"
            >
              Đăng nhập
            </Link>
            <div className="w-[40px] md:w-[49px] h-[40px] md:h-[49px] bg-[#d9d9d9] rounded-full"></div>
            <button
              className="md:hidden text-white text-2xl"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? '✖️' : '☰'}
            </button>
          </div>
        </div>
      </header>
      <div className="h-[80px] md:h-[100px]"></div>
    </>
  );
}
