import { useState } from 'react';
import {
  RESTAURANT_ADMIN_ALL_TABLE_BOOKING_ROUTE,
  RESTAURANT_ADMIN_MANAGE_FOOD_ROUTE,
} from '@/common/constants/routerConstant';
import { Link } from 'react-router-dom';

export default function Menu() {
  const [isFoodMenuOpen, setIsFoodMenuOpen] = useState(false);
  const [isReviewMenuOpen, setIsReviewMenuOpen] = useState(false);
  const [isTableMenuOpen, setIsTableMenuOpen] = useState(false);
  const [isReportMenuOpen, setIsReportMenuOpen] = useState(false);
  const [isMarketingMenuOpen, setIsMarketingMenuOpen] = useState(false);
  const [isOrderMenuOpen, setIsOrderMenuOpen] = useState(false);

  const toggleDropdown = (menu: string) => {
    switch (menu) {
      case 'food':
        setIsFoodMenuOpen((prev) => !prev);
        break;
      case 'review':
        setIsReviewMenuOpen((prev) => !prev);
        break;
      case 'table':
        setIsTableMenuOpen((prev) => !prev);
        break;
      case 'report':
        setIsReportMenuOpen((prev) => !prev);
        break;
      case 'marketing':
        setIsMarketingMenuOpen((prev) => !prev);
        break;
      case 'order':
        setIsOrderMenuOpen((prev) => !prev);
        break;
      default:
        break;
    }
  };

  return (
    <div className="w-[15vw] p-6 bg-amber-600 shadow-md min-h-screen">
      <div className="space-y-10">
        <div className="space-y-4">
          <Link to={RESTAURANT_ADMIN_ALL_TABLE_BOOKING_ROUTE}>
            <h2 className="text-2xl font-bold text-white">Quản lý Đặt bàn</h2>
          </Link>
        </div>
        <div className="space-y-4">
          <h2
            className="text-2xl font-bold text-white cursor-pointer"
            onClick={() => toggleDropdown('food')}
          >
            Quản lý Thực đơn
          </h2>
          {isFoodMenuOpen && (
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
          )}
        </div>
        <div className="space-y-4">
          <h2
            className="text-2xl font-bold text-white cursor-pointer"
            onClick={() => toggleDropdown('review')}
          >
            Quản lý Đánh giá
          </h2>
          {isReviewMenuOpen && (
            <div className="space-y-2 text-xl font-medium text-black">
              <p className="hover:text-white">Tất cả</p>
              <p className="hover:text-white">Cần phản hồi</p>
              <p className="hover:text-white">Đã trả lời</p>
            </div>
          )}
        </div>
        <div className="space-y-4">
          <h2
            className="text-2xl font-bold text-white cursor-pointer"
            onClick={() => toggleDropdown('table')}
          >
            Quản lý Bàn
          </h2>
          {isTableMenuOpen && (
            <div className="space-y-2 text-xl font-medium text-black">
              <p className="hover:text-white">Tất cả</p>
              <p className="hover:text-white">Bàn trống</p>
            </div>
          )}
        </div>
        <div className="space-y-4">
          <h2
            className="text-2xl font-bold text-white cursor-pointer"
            onClick={() => toggleDropdown('report')}
          >
            Báo cáo chi tiết
          </h2>
          {isReportMenuOpen && (
            <div className="space-y-2 text-xl font-medium text-black">
              <p className="hover:text-white">Báo cáo đặt bàn</p>
              <p className="hover:text-white">Thống kê lượt đặt bàn</p>
            </div>
          )}
        </div>
        <div className="space-y-4">
          <h2
            className="text-2xl font-bold text-white cursor-pointer"
            onClick={() => toggleDropdown('marketing')}
          >
            Tiếp thị và Quảng cáo
          </h2>
          {isMarketingMenuOpen && (
            <div className="space-y-2 text-xl font-medium text-black">
              <p className="hover:text-white">Chiến dịch quảng cáo</p>
              <p className="hover:text-white">Phân tích tiếp thị</p>
            </div>
          )}
        </div>
        <div className="space-y-4">
          <h2
            className="text-2xl font-bold text-white cursor-pointer"
            onClick={() => toggleDropdown('order')}
          >
            Đặt hàng Trực tuyến
          </h2>
          {isOrderMenuOpen && (
            <div className="space-y-2 text-xl font-medium text-black">
              <p className="hover:text-white">Quản lý đặt hàng trực tuyến</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
