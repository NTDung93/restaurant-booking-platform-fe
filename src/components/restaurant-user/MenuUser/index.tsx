import { logout } from '@/containers/restaurant-user/Auth/thunks';
import { ReduxDispatch } from '@/libs/redux/store';
import {
  HeartOutlined,
  HistoryOutlined,
  KeyOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { HOME_ROUTE } from '@/common/constants/routerConstant';
import { clearUserInfo } from '@/containers/restaurant-user/Auth/slice';

export default function MenuUser() {
  const dispatch = useDispatch<ReduxDispatch>();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logout());
    await dispatch(clearUserInfo());
    Cookies.remove('access-token');
    Cookies.remove('refresh-token');

    navigate(HOME_ROUTE);
  };

  return (
    <>
      <div>
        <div className="border-b pb-4 mb-6">
          <h2 className="text-xl font-semibold text-black">
            Thông tin tài khoản
          </h2>
        </div>
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <UserOutlined />
            <Link
              to="/user"
              className={`${location.pathname === '/user' ? 'text-[#D86500] font-bold' : ''} text-lg font-medium hover:text-[#D86500] hover:underline`}
            >
              Thông tin tài khoản
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <KeyOutlined />
            <Link
              to="/user-pass"
              className={`${location.pathname === '/user-pass' ? 'text-[#D86500] font-bold' : ''} text-lg font-medium hover:text-[#D86500] hover:underline`}
            >
              Quản lý mật khẩu
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <HeartOutlined />
            <Link
              to="/user-favorite"
              className={`${location.pathname === '/user-favorite' ? 'text-[#D86500] font-bold' : ''} text-lg font-medium hover:text-[#D86500] hover:underline`}
            >
              Yêu thích
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <HistoryOutlined />
            <Link
              to="/history"
              className={`${location.pathname === '/history' ? 'text-[#D86500] font-bold' : ''} text-lg font-medium hover:text-[#D86500] hover:underline`}
            >
              Lịch sử đơn đặt chỗ
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <LogoutOutlined />
            <button
              onClick={handleLogout}
              className="text-lg font-medium text-red-500 hover:text-red-700 hover:underline"
            >
              Thoát
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
