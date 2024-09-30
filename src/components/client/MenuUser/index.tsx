import {
  HeartOutlined,
  HistoryOutlined,
  KeyOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

export default function MenuUser() {
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
              className="text-lg font-medium hover:text-blue-500 hover:underline"
            >
              Thông tin tài khoản
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <KeyOutlined />
            <Link
              to="/user-pass"
              className="text-lg font-medium hover:text-blue-500 hover:underline"
            >
              Quản lý mật khẩu
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <HeartOutlined />
            <Link
              to="/user-favorite"
              className="text-lg font-medium hover:text-blue-500 hover:underline"
            >
              Yêu thích
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <HistoryOutlined />
            <Link
              to="#"
              className="text-lg font-medium hover:text-blue-500 hover:underline"
            >
              Lịch sử đơn đặt chỗ
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <LogoutOutlined />
            <Link
              to="#"
              className="text-lg font-medium text-red-500 hover:text-red-700 hover:underline"
            >
              Thoát
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
