import Footer from '@/components/restaurant-user/Footer';
import Header from '@/components/restaurant-user/Header';
import HeroBanner from '@/components/restaurant-user/HeroBanner';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectLocationSearchResult } from '../Home/selectors';
import LocationCardItem from '@/components/restaurant-user/LocationCardItem';
import { RESTAURANT_DETAIL_ROUTE } from '@/common/constants/routerConstant';
import { LocationSearchCriteria } from '@/common/models/location';
import {
  DEFAULT_PAGE_NO,
  DEFAULT_PAGE_SIZE,
  DEFAULT_SORT_BY,
  DEFAULT_SORT_DIR,
  DEFAULT_STATUS,
} from '@/common/constants/paginationConstant';
import { searchLocation } from '../Home/thunks';
import { ReduxDispatch } from '@/libs/redux/store';
import { getUserLocation, LocationResult } from '@/utils/location';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import {
  DollarOutlined,
  DownOutlined,
  EnvironmentOutlined,
  ForkOutlined,
  StarOutlined,
} from '@ant-design/icons';

const RestaurantAll: React.FC = () => {
  const navigate = useNavigate();
  const responsePagination = useSelector(selectLocationSearchResult);
  const dispatch = useDispatch<ReduxDispatch>();
  const [searchNearBy, setSearchNearBy] = useState<boolean>(false);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  let cards = undefined;

  // if user doesn't search anything, show all locations
  useEffect(() => {
    if (!responsePagination) {
      const fetchLocation = async () => {
        try {
          const result: LocationResult = await getUserLocation();
          setSearchNearBy(result.searchNearBy);
          if (result.searchNearBy && result.location) {
            setLatitude(result.location.latitude);
            setLongitude(result.location.longitude);
          } else {
            setLatitude(null);
            setLongitude(null);
          }
        } catch (error) {
          console.error('Error fetching user location:', error);
          setSearchNearBy(false);
          setLatitude(null);
          setLongitude(null);
        }
      };

      fetchLocation();

      const locationSearchCriteria: LocationSearchCriteria = {
        pageNo: DEFAULT_PAGE_NO,
        pageSize: DEFAULT_PAGE_SIZE,
        sortBy: DEFAULT_SORT_BY,
        sortDir: DEFAULT_SORT_DIR,
        status: DEFAULT_STATUS,
        searchNearBy: searchNearBy,
        ...(searchNearBy && latitude && longitude
          ? { latitude, longitude }
          : {}),
        searchText: undefined,
      };

      try {
        dispatch(searchLocation(locationSearchCriteria));
      } catch (error) {
        console.error('Error during searchLocation dispatch:', error);
      }
    }
    window.scrollTo(0, 0);
  }, []);

  if (responsePagination) {
    cards = responsePagination!.content.map((location) => (
      <div
        key={location.id}
        className="w-full sm:w-1/2 lg:w-1/4 p-2 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:opacity-90"
      >
        <LocationCardItem
          key={location.id}
          imageUrl={location.image}
          name={location.name}
          address={location.address}
          rating={location.rating}
          booking={location.view}
          category={location.categoryName}
          onClick={() =>
            navigate(
              RESTAURANT_DETAIL_ROUTE.replace(':id', location.id.toString()),
            )
          }
        />
      </div>
    ));
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Header />
        <HeroBanner />

        <div className="p-8 border-b-2">
          <div className="max-w-6xl mx-auto">
            {/* Enhanced Header */}
            <div className="flex items-center justify-between mb-8 border-b border-amber-200 pb-6">
              <div className="flex items-center gap-3">
                <div className="bg-amber-500 p-2 rounded-xl shadow-lg shadow-amber-200">
                  <StarOutlined className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
                  Lọc Kết Quả
                </h2>
              </div>
              <span className="text-sm text-amber-600 bg-amber-100 px-4 py-2 rounded-full font-medium">
                3 bộ lọc đang hoạt động
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Price Filter */}
              <div className="relative group">
                <label className="flex items-center gap-2 text-sm font-medium mb-3 text-gray-700">
                  <div className="bg-amber-100 p-1.5 rounded-lg">
                    <DollarOutlined className="w-4 h-4 text-amber-600" />
                  </div>
                  Giá
                </label>
                <div className="relative">
                  <select
                    className="w-full appearance-none bg-white px-4 py-4 rounded-xl border-2 border-gray-100
                           text-gray-700 cursor-pointer shadow-sm transition-all duration-200
                           hover:border-amber-400 focus:border-amber-500 focus:ring-4 focus:ring-amber-100
                           focus:outline-none"
                  >
                    <option>Thấp đến cao</option>
                    <option>Cao đến thấp</option>
                  </select>
                  <DownOutlined
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 
                                group-hover:text-amber-500 group-hover:transform group-hover:-translate-y-1/2 
                                group-hover:scale-110 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Distance Filter */}
              <div className="relative group">
                <label className="flex items-center gap-2 text-sm font-medium mb-3 text-gray-700">
                  <div className="bg-amber-100 p-1.5 rounded-lg">
                    <EnvironmentOutlined className="w-4 h-4 text-amber-600" />
                  </div>
                  Khoảng cách
                </label>
                <div className="relative">
                  <select
                    className="w-full appearance-none bg-white px-4 py-4 rounded-xl border-2 border-gray-100
                           text-gray-700 cursor-pointer shadow-sm transition-all duration-200
                           hover:border-amber-400 focus:border-amber-500 focus:ring-4 focus:ring-amber-100
                           focus:outline-none"
                  >
                    <option>1 km</option>
                    <option>5 km</option>
                    <option>10 km</option>
                    <option>50 km</option>
                  </select>
                  <DownOutlined
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 
                                group-hover:text-amber-500 group-hover:transform group-hover:-translate-y-1/2 
                                group-hover:scale-110 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Type Filter */}
              <div className="relative group">
                <label className="flex items-center gap-2 text-sm font-medium mb-3 text-gray-700">
                  <div className="bg-amber-100 p-1.5 rounded-lg">
                    <ForkOutlined className="w-4 h-4 text-amber-600" />
                  </div>
                  Loại hình
                </label>
                <div className="relative">
                  <select
                    className="w-full appearance-none bg-white px-4 py-4 rounded-xl border-2 border-gray-100
                           text-gray-700 cursor-pointer shadow-sm transition-all duration-200
                           hover:border-amber-400 focus:border-amber-500 focus:ring-4 focus:ring-amber-100
                           focus:outline-none"
                  >
                    <option>Nhà hàng</option>
                    <option>Quán cà phê</option>
                    <option>Bar</option>
                    <option>Đồ ăn nhanh</option>
                  </select>
                  <DownOutlined
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 
                                group-hover:text-amber-500 group-hover:transform group-hover:-translate-y-1/2 
                                group-hover:scale-110 transition-all duration-200"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-4 mx-auto w-4/5">
          {responsePagination && responsePagination.content.length > 0 ? (
            <div className="flex flex-wrap -mx-4">{cards}</div>
          ) : (
            <div className="p-4 text-center">
              <p className="text-gray-500">No search results to display.</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default RestaurantAll;
