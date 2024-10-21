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
          <h2 className="text-2xl font-bold text-white">Quản lý Đặt bàn</h2>
          <div className="space-y-2 text-xl font-medium text-black">
            <Link to={RESTAURANT_ADMIN_ALL_TABLE_BOOKING_ROUTE}>Tất cả</Link>
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Quản lý Thực đơn</h2>
          <div className="space-y-2 text-xl font-medium text-black">
            <Link to={RESTAURANT_ADMIN_MANAGE_FOOD_ROUTE}>Tất cả</Link>
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Quản lý Đánh giá</h2>
          <div className="space-y-2 text-xl font-medium text-black">
            <p>Tất cả</p>
            <p>Cần phản hồi</p>
            <p>Đã trả lời</p>
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Quản lý Bàn</h2>
          <div className="space-y-2 text-xl font-medium text-black">
            <p>Tất cả</p>
            <p>Bàn trống</p>
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Báo cáo chi tiết</h2>
          <div className="space-y-2 text-xl font-medium text-black">
            <p>Báo cáo đặt bàn</p>
            <p>Thống kê lượt đặt bàn</p>
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">
            Tiếp thị và Quảng cáo
          </h2>
          <div className="space-y-2 text-xl font-medium text-black">
            <p>Chiến dịch quảng cáo</p>
            <p>Phân tích tiếp thị</p>
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Đặt hàng Trực tuyến</h2>
          <div className="space-y-2 text-xl font-medium text-black">
            <p>Quản lý đặt hàng trực tuyến</p>
          </div>
        </div>
      </div>
    </div>
  );
}
