import {
  HOME_ROUTE,
  RESTAURANT_ADMIN_INFO_ROUTE,
  SIGN_IN_ROUTE,
} from '@/common/constants/routerConstant';
import { selectUserInfo } from '@/containers/restaurant-user/Auth/selector';
import { clearUserInfo } from '@/containers/restaurant-user/Auth/slice';
import { getUserInfo, logout } from '@/containers/restaurant-user/Auth/thunks';
import { ReduxDispatch } from '@/libs/redux/store';
import { UserOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch<ReduxDispatch>();
  const userInfo = useSelector(selectUserInfo);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  const handleLogout = async () => {
    await dispatch(logout());
    await dispatch(clearUserInfo());
    Cookies.remove('access-token');
    Cookies.remove('refresh-token');

    navigate(HOME_ROUTE);
  };
  return (
    <>
      <header className="w-full h-[80px] md:h-[100px] bg-[#312525] fixed top-0 left-0 z-50">
        <div className="max-w-[98.5%] mx-auto h-full flex items-center justify-between">
          <div className="flex items-center space-x-2 md:space-x-4">
            <Link to={'#'}>
              <img
                className="w-[150px] h-auto"
                src="https://res.cloudinary.com/dnslrwedn/image/upload/v1727033229/SKEDEAT_logo_tr%E1%BA%AFng-01_rrkx3o.png"
                alt="Logo"
              />
            </Link>
            <nav
              className={`md:flex space-x-4 md:space-x-10 ml-0 flex-col md:flex-row absolute md:static left-0 top-[80px] w-full md:w-auto bg-[#312525] md:bg-transparent`}
              style={{ marginLeft: '0px' }}
            >
              <a></a>
              <Link
                to={'#'}
                className="text-white text-lg md:text-xl hover:text-[#D86500] p-4 md:p-0"
              >
                Kênh nhà hàng
              </Link>
              <a
                href="#"
                className="text-white text-lg md:text-xl hover:text-[#D86500] p-4 md:p-0"
              >
                Trang chủ
              </a>
            </nav>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            {userInfo ? (
              <div className="relative flex items-center">
                <span className="hidden md:inline-block text-lg md:text-xl text-[#D86500] mr-2">
                  Xin chào, {userInfo.userName}
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
                    <span className="block text-lg md:hidden text-[#D86500] px-4 py-2">
                      Xin chào, {userInfo.userName}
                    </span>
                    <Link
                      to={RESTAURANT_ADMIN_INFO_ROUTE}
                      className="block w-full text-left px-4 py-2 text-black hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Thông tin nhà hàng
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
              <Link
                to={SIGN_IN_ROUTE}
                className="text-lg px-5 py-3 font-bold bg-[#D86500] md:text-xl text-white rounded-xl hover:bg-[#f48c42] transition-colors duration-300"
              >
                Đăng nhập
              </Link>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
