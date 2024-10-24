import {
  RESTAURANT_ADMIN_ALL_TABLE_BOOKING_ROUTE,
  RESTAURANT_ADMIN_MANAGE_ADVERTISEMENT_ROUTE,
  RESTAURANT_ADMIN_MANAGE_BOOKING_TABLE_ONLINE_ROUTE,
  RESTAURANT_ADMIN_MANAGE_FEES_ROUTE,
  RESTAURANT_ADMIN_MANAGE_FOOD_ROUTE,
  RESTAURANT_ADMIN_REPORT_BOOKING_TABLE_ROUTE,
  RESTAURANT_FEEDBACK_ROUTE,
} from '@/common/constants/routerConstant';
import { Link } from 'react-router-dom';
import {
  TableOutlined,
  CoffeeOutlined,
  StarOutlined,
  PieChartOutlined,
  BellOutlined,
  ShoppingCartOutlined,
  DollarOutlined, // Thêm icon cho khoảng phí
} from '@ant-design/icons';

export default function Menu() {
  return (
    <div className="w-[16vw] p-6 bg-amber-600 shadow-xl min-h-screen">
      <div className="space-y-8">
        {/* Quản lý Đặt bàn */}
        <div className="group">
          <Link to={RESTAURANT_ADMIN_ALL_TABLE_BOOKING_ROUTE}>
            <div className="flex items-center space-x-3">
              <TableOutlined
                className={`text-white group-hover:text-yellow-300 transition-all duration-300 text-2xl ${location.pathname === '/manage/all-table-booking' ? 'text-yellow-300' : ''}`}
              />
              <h2
                className={`text-2xl font-bold text-white group-hover:text-yellow-300 transition-all duration-300 ${location.pathname === '/manage/all-table-booking' ? 'text-yellow-300' : ''}`}
              >
                Quản lý Đặt bàn
              </h2>
            </div>
          </Link>
        </div>

        {/* Quản lý Thực đơn */}
        <div className="group">
          <Link to={RESTAURANT_ADMIN_MANAGE_FOOD_ROUTE}>
            <div className="flex items-center space-x-3">
              <CoffeeOutlined
                className={`text-white group-hover:text-yellow-300 transition-all duration-300 text-2xl ${location.pathname === '/manage/food' ? 'text-yellow-300' : ''}`}
              />
              <h2
                className={`text-2xl font-bold text-white group-hover:text-yellow-300 transition-all duration-300 ${location.pathname === '/manage/food' ? 'text-yellow-300' : ''}`}
              >
                Quản lý Thực đơn
              </h2>
            </div>
          </Link>
        </div>

        {/* Quản lý Đánh giá */}
        <div className="group">
          <div className="flex items-center space-x-3 cursor-pointer">
            <StarOutlined className="text-white group-hover:text-yellow-300 transition-all duration-300 text-2xl" />
            <Link to={RESTAURANT_FEEDBACK_ROUTE}>
              <h2
                className={`text-2xl font-bold text-white group-hover:text-yellow-300 transition-all duration-300 ${location.pathname === '/manage/feedback' ? 'text-yellow-300' : ''}`}
              >
                Quản lý Đánh giá
              </h2>
            </Link>
          </div>
          <div className="ml-9 mt-2 space-y-2 text-lg font-medium text-gray-100 group-hover:text-white transition-colors duration-300">
            <p className="hover:text-yellow-300 cursor-pointer">Tất cả</p>
            <p className="hover:text-yellow-300 cursor-pointer">Cần phản hồi</p>
            <p className="hover:text-yellow-300 cursor-pointer">Đã trả lời</p>
          </div>
        </div>

        {/* Quản lý Khoảng Phí */}
        <div className="group">
          <Link to={RESTAURANT_ADMIN_MANAGE_FEES_ROUTE}>
            <div className="flex items-center space-x-3">
              <DollarOutlined className="text-white group-hover:text-yellow-300 transition-all duration-300 text-2xl" />
              <h2
                className={`text-2xl font-bold text-white group-hover:text-yellow-300 transition-all duration-300 ${location.pathname === '/manage/fees' ? 'text-yellow-300' : ''}`}
              >
                Quản lý Khoảng Phí
              </h2>
            </div>
          </Link>
        </div>

        {/* Báo cáo chi tiết */}
        <div className="group">
          <div className="flex items-center space-x-3 cursor-pointer">
            <PieChartOutlined className="text-white group-hover:text-yellow-300 transition-all duration-300 text-2xl" />
            <h2 className="text-2xl font-bold text-white group-hover:text-yellow-300 transition-all duration-300">
              Báo cáo chi tiết
            </h2>
          </div>
          <div className="ml-9 mt-2 space-y-2 text-lg font-medium text-gray-100 group-hover:text-white transition-colors duration-300">
            <p className="hover:text-yellow-300 cursor-pointer">
              <Link to={RESTAURANT_ADMIN_REPORT_BOOKING_TABLE_ROUTE}>
                Báo cáo đặt bàn
              </Link>
            </p>
            {/* <p className="hover:text-yellow-300 cursor-pointer">
              Thống kê lượt đặt bàn
            </p> */}
          </div>
        </div>

        {/* Tiếp thị và Quảng cáo */}
        <div className="group">
          <div className="flex items-center space-x-3 cursor-pointer">
            <BellOutlined className="text-white group-hover:text-yellow-300 transition-all duration-300 text-2xl" />
            <h2 className="text-2xl font-bold text-white group-hover:text-yellow-300 transition-all duration-300">
              Tiếp thị và Quảng cáo
            </h2>
          </div>
          <div className="ml-9 mt-2 space-y-2 text-lg font-medium text-gray-100 group-hover:text-white transition-colors duration-300">
            <p className="hover:text-yellow-300 cursor-pointer">
              <Link to={RESTAURANT_ADMIN_MANAGE_ADVERTISEMENT_ROUTE}>
                Chiến dịch quảng cáo
              </Link>
            </p>
            {/* <p className="hover:text-yellow-300 cursor-pointer">
              Phân tích tiếp thị
            </p> */}
          </div>
        </div>

        {/* Đặt hàng Trực tuyến */}
        <div className="group">
          <div className="flex items-center space-x-3 cursor-pointer">
            <ShoppingCartOutlined className="text-white group-hover:text-yellow-300 transition-all duration-300 text-2xl" />
            <h2 className="text-2xl font-bold text-white group-hover:text-yellow-300 transition-all duration-300">
              <Link to={RESTAURANT_ADMIN_MANAGE_BOOKING_TABLE_ONLINE_ROUTE}>
                Đặt hàng Trực tuyến
              </Link>
            </h2>
          </div>
          <div className="ml-9 mt-2 space-y-2 text-lg font-medium text-gray-100 group-hover:text-white transition-colors duration-300">
            <p className="hover:text-yellow-300 cursor-pointer">
              Quản lý đặt hàng trực tuyến
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
