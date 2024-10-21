import {
  RESTAURANT_ADMIN_ALL_TABLE_BOOKING_ROUTE,
  RESTAURANT_ADMIN_MANAGE_FOOD_ROUTE,
} from '@/common/constants/routerConstant';
import { Link } from 'react-router-dom';

export default function Menu() {
  return (
    <div className="w-[15vw] p-6 bg-amber-600 shadow-md min-h-screen">
      <div className="space-y-10">
        <div className="space-y-4">
          <Link
            to={RESTAURANT_ADMIN_ALL_TABLE_BOOKING_ROUTE}
            className="hover:text-white"
          >
            <h2 className="text-2xl font-bold text-white">Quản lý Đặt bàn</h2>
          </Link>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white cursor-pointer">
            Quản lý Thực đơn
          </h2>
          <div className="space-y-2 text-xl font-medium text-black">
            <Link
              to={RESTAURANT_ADMIN_MANAGE_FOOD_ROUTE}
              className="hover:text-white"
            >
              Tất cả
            </Link>
            <p className="hover:text-white">Thêm khuyến mãi</p>
            <p className="hover:text-white">Thực đơn động</p>
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white cursor-pointer">
            Quản lý Đánh giá
          </h2>
          <div className="space-y-2 text-xl font-medium text-black">
            <p className="hover:text-white">Tất cả</p>
            <p className="hover:text-white">Cần phản hồi</p>
            <p className="hover:text-white">Đã trả lời</p>
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white cursor-pointer">
            Quản lý Bàn
          </h2>
          <div className="space-y-2 text-xl font-medium text-black">
            <p className="hover:text-white">Tất cả</p>
            <p className="hover:text-white">Bàn trống</p>
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white cursor-pointer">
            Báo cáo chi tiết
          </h2>
          <div className="space-y-2 text-xl font-medium text-black">
            <p className="hover:text-white">Báo cáo đặt bàn</p>
            <p className="hover:text-white">Thống kê lượt đặt bàn</p>
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white cursor-pointer">
            Tiếp thị và Quảng cáo
          </h2>
          <div className="space-y-2 text-xl font-medium text-black">
            <p className="hover:text-white">Chiến dịch quảng cáo</p>
            <p className="hover:text-white">Phân tích tiếp thị</p>
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white cursor-pointer">
            Đặt hàng Trực tuyến
          </h2>
          <div className="space-y-2 text-xl font-medium text-black">
            <p className="hover:text-white">Quản lý đặt hàng trực tuyến</p>
          </div>
        </div>
      </div>
    </div>
  );
}
