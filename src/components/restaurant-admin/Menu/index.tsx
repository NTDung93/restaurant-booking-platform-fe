import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  TableOutlined,
  CoffeeOutlined,
  StarOutlined,
  PieChartOutlined,
  BellOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
} from '@ant-design/icons';
import {
  RESTAURANT_ADMIN_ALL_TABLE_BOOKING_ROUTE,
  RESTAURANT_ADMIN_MANAGE_ADVERTISEMENT_ROUTE,
  RESTAURANT_ADMIN_MANAGE_BOOKING_TABLE_ONLINE_ROUTE,
  RESTAURANT_ADMIN_MANAGE_FEES_ROUTE,
  RESTAURANT_ADMIN_MANAGE_FOOD_ROUTE,
  RESTAURANT_ADMIN_REPORT_BOOKING_TABLE_ROUTE,
  RESTAURANT_FEEDBACK_ROUTE,
} from '@/common/constants/routerConstant';

export default function Menu() {
  const location = useLocation();

  const menuItems = [
    {
      route: RESTAURANT_ADMIN_ALL_TABLE_BOOKING_ROUTE,
      label: 'Quản lý đặt bàn',
      icon: <TableOutlined />,
    },
    {
      route: RESTAURANT_ADMIN_MANAGE_FOOD_ROUTE,
      label: 'Quản lý thực đơn',
      icon: <CoffeeOutlined />,
    },
    {
      route: RESTAURANT_FEEDBACK_ROUTE,
      label: 'Quản lý đánh giá',
      icon: <StarOutlined />,
    },
    {
      route: RESTAURANT_ADMIN_MANAGE_FEES_ROUTE,
      label: 'Quản lý khoản phí',
      icon: <DollarOutlined />,
    },
    {
      route: RESTAURANT_ADMIN_REPORT_BOOKING_TABLE_ROUTE,
      label: 'Báo cáo chi tiết',
      icon: <PieChartOutlined />,
    },
    {
      route: RESTAURANT_ADMIN_MANAGE_ADVERTISEMENT_ROUTE,
      label: 'Tiếp thị và Quảng cáo',
      icon: <BellOutlined />,
    },
    {
      route: RESTAURANT_ADMIN_MANAGE_BOOKING_TABLE_ONLINE_ROUTE,
      label: 'Đặt hàng trực tuyến',
      icon: <ShoppingCartOutlined />,
    },
  ];

  return (
    <div className="w-[15vw] p-4 bg-white/90 backdrop-blur-sm shadow-lg min-h-screen fixed border-r border-gray-100">
      <div className="mt-6 space-y-2">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.route;

          return (
            <div
              key={index}
              className={`
                group relative 
                transform transition-all duration-300 ease-out
                hover:-translate-y-0.5
              `}
            >
              <Link to={item.route}>
                <div
                  className={`
                  flex items-center px-4 py-3 rounded-xl
                  ${isActive ? 'bg-orange-50 shadow-sm' : 'hover:bg-gray-50'}
                  transition-all duration-300 ease-in-out
                `}
                >
                  <div
                    className={`
                    flex items-center space-x-3 relative z-10
                    transition-transform duration-300
                  `}
                  >
                    {React.cloneElement(item.icon, {
                      className: `text-xl transition-all duration-300
                        ${
                          isActive
                            ? 'text-orange-500'
                            : 'text-gray-400 group-hover:text-gray-600'
                        }
                      `,
                    })}
                    <h2
                      className={`
                      text-lg font-medium tracking-wide
                      transition-all duration-300
                      ${
                        isActive
                          ? 'text-orange-500'
                          : 'text-gray-500 group-hover:text-gray-700'
                      }
                    `}
                    >
                      {item.label}
                    </h2>
                  </div>

                  {isActive && (
                    <div
                      className="absolute right-2 w-1 h-6 bg-orange-500/20 
                      rounded-full transition-all duration-300"
                    />
                  )}
                </div>
              </Link>

              {/* Soft glow effect on hover */}
              <div
                className={`
                absolute inset-0 rounded-xl transition-opacity duration-300
                bg-gradient-to-r from-orange-100/0 via-orange-100/30 to-orange-100/0
                opacity-0 group-hover:opacity-100 pointer-events-none
              `}
              />

              {/* Active indicator */}
              <div
                className={`
                absolute left-0 w-1 h-8 bg-orange-400 rounded-r
                top-1/2 -translate-y-1/2
                transition-all duration-300 ease-in-out
                ${isActive ? 'opacity-100' : 'opacity-0'}
                ${isActive ? 'scale-100' : 'scale-0'}
              `}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
