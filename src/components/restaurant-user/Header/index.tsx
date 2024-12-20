import { UserOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo, logout } from '@/containers/restaurant-user/Auth/thunks';
import { selectUserInfo } from '@/containers/restaurant-user/Auth/selector';
import { ReduxDispatch } from '@/libs/redux/store';
import {
  ABOUT_US_ROUTE,
  BLOG_ROUTE,
  HOME_ROUTE,
  RESTAURANT_ROUTE,
  SIGN_IN_ROUTE,
} from '@/common/constants/routerConstant';
import { clearUserInfo } from '@/containers/restaurant-user/Auth/slice';
import Cookies from 'js-cookie';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch<ReduxDispatch>();
  const userInfo = useSelector(selectUserInfo);
  const navigate = useNavigate();

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    await dispatch(logout());
    dispatch(clearUserInfo());

    Cookies.remove('access-token');
    Cookies.remove('refresh-token');

    localStorage.removeItem('access-token');
    localStorage.removeItem('refresh-token');
    sessionStorage.removeItem('access-token');
    sessionStorage.removeItem('refresh-token');

    navigate(HOME_ROUTE);
  };

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  const hideSignInButton = ['/signin', '/signup'].includes(location.pathname);

  return (
    <>
      <header className="w-full h-[80px] md:h-[100px] bg-[#312525] fixed top-0 left-0 z-50">
        <div className="max-w-[90%] md:max-w-[80%] mx-auto h-full flex items-center justify-between">
          <div className="flex items-center space-x-2 md:space-x-4">
            <Link to={HOME_ROUTE} onClick={handleLinkClick}>
              <img
                className="w-[150px] h-auto"
                src="https://res.cloudinary.com/dnslrwedn/image/upload/v1727033229/SKEDEAT_logo_tr%E1%BA%AFng-01_rrkx3o.png"
                alt="Logo"
              />
            </Link>
            <nav
              className={`md:flex space-x-4 md:space-x-10 ml-0 ${isMenuOpen ? 'flex' : 'hidden'} md:block flex-col md:flex-row absolute md:static left-0 top-[80px] w-full md:w-auto bg-[#312525] md:bg-transparent`}
              style={{ marginLeft: '0px' }}
            >
              <a></a>
              <Link
                to={HOME_ROUTE}
                className={`text-lg md:text-xl p-4 md:p-0 ${location.pathname === '/' ? 'text-[#D86500] font-bold' : 'text-white'} hover:text-[#D86500]`}
                onClick={handleLinkClick}
              >
                Trang chủ
              </Link>
              <Link
                to={RESTAURANT_ROUTE}
                className={`text-lg md:text-xl p-4 md:p-0 ${location.pathname === '/restaurant' ? 'text-[#D86500] font-bold' : 'text-white'} hover:text-[#D86500]`}
                onClick={handleLinkClick}
              >
                Gần bạn
              </Link>
              <Link
                to={BLOG_ROUTE}
                className={`text-lg md:text-xl p-4 md:p-0 ${location.pathname === '/blog' ? 'text-[#D86500] font-bold' : 'text-white'} hover:text-[#D86500]`}
                onClick={handleLinkClick}
              >
                Blogs
              </Link>
              <Link
                to={ABOUT_US_ROUTE}
                className={`text-lg md:text-xl p-4 md:p-0 ${location.pathname === '/about-us' ? 'text-[#D86500] font-bold' : 'text-white'} hover:text-[#D86500]`}
                onClick={handleLinkClick}
              >
                Về chúng tôi
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            {userInfo ? (
              <div className="relative flex items-center">
                <span className="hidden md:inline-block text-lg md:text-xl text-white mr-2">
                  Xin chào,{' '}
                  <span className="font-bold text-[#D86500]">
                    {userInfo.fullName}
                  </span>
                </span>
                <div
                  className="relative w-[40px] md:w-[50px] h-[40px] md:h-[49px] bg-[#d9d9d9] rounded-full flex items-center justify-center cursor-pointer"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <UserOutlined style={{ fontSize: '24px' }} />
                </div>

                {isDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-[200px] bg-white shadow-lg rounded-lg overflow-hidden z-50"
                    style={{ top: '100%' }}
                  >
                    <Link
                      to="/user"
                      className="block w-full text-left px-4 py-2 text-black hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Tài khoản của tôi
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-black hover:bg-gray-100"
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              !hideSignInButton && (
                <Link
                  to={SIGN_IN_ROUTE}
                  className="text-lg px-5 py-3 font-bold bg-[#D86500] md:text-xl text-white rounded-xl hover:bg-[#f48c42] transition-colors duration-300"
                >
                  Đăng nhập
                </Link>
              )
            )}

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
