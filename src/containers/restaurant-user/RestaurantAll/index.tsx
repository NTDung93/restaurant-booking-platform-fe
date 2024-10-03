import Footer from '@/components/restaurant-user/Footer';
import Header from '@/components/restaurant-user/Header';
import Hero from '@/components/restaurant-user/Hero';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const RestaurantAll: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/res-detail');
  };

  const cards = Array.from({ length: 12 }, (_, i) => (
    <div key={i} className="p-4 w-full md:w-1/3 lg:w-1/4">
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="w-full h-60 bg-zinc-300"></div>
        <div className="p-4">
          <div className="text-amber-500 text-base font-normal font-['Roboto']">
            150.000 - 2.000.000 VNĐ
          </div>
          <div
            className="flex items-center mt-2 cursor-pointer hover:text-amber-600 hover:underline"
            onClick={handleNavigation}
          >
            <div className="text-black text-2xl font-bold font-['Roboto']">
              Nhà hàng PUPU
            </div>
          </div>
          <div className="text-zinc-500 text-base font-normal font-['Be Vietnam Pro'] mt-2">
            Location: Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ
            Đức, Hồ Chí Minh 700000
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="text-black text-sm font-medium font-['Roboto']">
              Đánh giá
            </div>
            <div className="text-black text-sm font-medium font-['Roboto']">
              Lượt đặt : 300050
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <button
              className="bg-amber-500 text-white text-lg font-medium px-4 py-2 rounded-full transition-transform transform hover:scale-105 hover:bg-amber-600"
              onClick={handleNavigation}
            >
              ĐẶT BÀN NGAY
            </button>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Header />
        <Hero />
        <div className="bg-white p-4 shadow-md mt-4 ">
          <div className="container mx-auto w-4/5">
            <div className="text-xl font-bold mb-4">Lọc Kết Quả</div>
            <div className="flex flex-wrap gap-4">
              <div className="w-full md:w-1/4">
                <label className="block text-sm font-medium mb-1">Giá</label>
                <select className="block w-full border-gray-300 rounded-md shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-500 focus:ring-opacity-50">
                  <option>Thấp đến cao</option>
                  <option>Cao đến thấp</option>
                </select>
              </div>

              <div className="w-full md:w-1/4">
                <label className="block text-sm font-medium mb-1">
                  Khoảng cách
                </label>
                <select className="block w-full border-gray-300 rounded-md shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-500 focus:ring-opacity-50">
                  <option>1 km</option>
                  <option>5 km</option>
                  <option>10 km</option>
                  <option>50 km</option>
                </select>
              </div>
              <div className="w-full md:w-1/4">
                <label className="block text-sm font-medium mb-1">
                  Loại hình
                </label>
                <select className="block w-full border-gray-300 rounded-md shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-500 focus:ring-opacity-50">
                  <option>Nhà hàng</option>
                  <option>Quán cà phê</option>
                  <option>Bar</option>
                  <option>Đồ ăn nhanh</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto p-4 w-4/5">
          <div className="flex flex-wrap -mx-4 w-full">{cards}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RestaurantAll;
