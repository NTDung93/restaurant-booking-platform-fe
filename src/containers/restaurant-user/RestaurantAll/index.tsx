import { RESTAURANT_DETAIL_ROUTE } from '@/common/constants/routerConstant';
import Footer from '@/components/restaurant-user/Footer';
import Header from '@/components/restaurant-user/Header';
import HeroBanner from '@/components/restaurant-user/HeroBanner';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectLocationSearchResult } from '../Home/selectors';
import LocationCardItem from '@/components/restaurant-user/LocationCardItem';

const RestaurantAll: React.FC = () => {
  const navigate = useNavigate();
  const responsePagination = useSelector(selectLocationSearchResult);
  let cards = undefined;

  if (responsePagination) {
    cards = responsePagination!.content.map((location) => (
      <div key={location.id} className="w-full sm:w-1/2 lg:w-1/4 p-2">
        <LocationCardItem
          key={location.id}
          imageUrl={location.image}
          name={location.name}
          address={location.address}
          rating={location.rating}
          booking={location.view}
          category={location.categoryName}
          onClick={() => navigate(RESTAURANT_DETAIL_ROUTE)}
        />
      </div>
    ));
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Header />
        <HeroBanner />
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
        <div className="container py-2 mx-auto w-4/5">
          {responsePagination && responsePagination.content.length > 0 ? (
            <div className="flex flex-wrap -mx-4">{cards}</div>
          ) : (
            <div className="p-4">
              <div>No search results to display.</div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RestaurantAll;
