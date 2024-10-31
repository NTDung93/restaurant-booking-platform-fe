import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { RESTAURANT_DETAIL_ROUTE } from '@/common/constants/routerConstant';
import LocationCardItem from '@/components/restaurant-user/LocationCardItem';
import { ReduxDispatch } from '@/libs/redux/store';
import { useDispatch } from 'react-redux';
import { ResponseEntityPagination } from '@/common/models/pagination';
import { LocationResponseLazy } from '@/common/models/location';
import { fetchPopularLocations } from '../../thunks';
import Toast, { ToastType } from '@/components/Toast';
import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd';

export default function PopularRestaurants() {
  const navigate = useNavigate();
  const [slidesToShow, setSlidesToShow] = useState(4);
  const cardMaxWidth = 400;
  const dispatch = useDispatch<ReduxDispatch>();
  const [responsePagination, setResponsePagination] =
    useState<ResponseEntityPagination<LocationResponseLazy>>();
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<ToastType>('success');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const cardsToShow = Math.floor(screenWidth / cardMaxWidth);
      setSlidesToShow(cardsToShow > 0 ? cardsToShow : 1);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const fetchData = async () => {
      try {
        const resultAction = await dispatch(fetchPopularLocations());
        if (fetchPopularLocations.fulfilled.match(resultAction)) {
          setLoading(false);
          const data: ResponseEntityPagination<LocationResponseLazy> =
            resultAction.payload;
          setResponsePagination(data);
          setToastMessage('Popular locations fetched successfully');
          setToastType('success');
        } else {
          setToastMessage('Error fetching popular locations');
          setToastType('error');
        }
      } catch (error) {
        setToastMessage('Error fetching popular locations');
        setToastType('error');
      }
    };

    fetchData();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch]);

  const cards = responsePagination?.content.map((location) => (
    <LocationCardItem
      key={location.id}
      imageUrl={location.image}
      name={location.name}
      address={location.address}
      rating={location.rating}
      booking={location.view}
      category={location.categoryName}
      onClick={() =>
        navigate(RESTAURANT_DETAIL_ROUTE.replace(':id', location.id.toString()))
      }
    />
  ));

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToShow,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="w-[80%] mx-auto mt-8 lg:mt-12 mb-10 mobile:max-md:w-full">
      <Toast type={toastType} message={toastMessage} />

      <div className="text-center mb-4 mobile:max-md:mt-8">
        <div className="mobile:max-md:text-3xl text-black text-4xl font-bold transition-transform duration-300 ease-in-out hover:scale-105 hover:opacity-90">
          Nhà hàng nổi bật
        </div>
      </div>

      {loading ? (
        <Flex
          align="center"
          gap="middle"
          className="place-content-center mt-14"
        >
          <Spin
            indicator={
              <LoadingOutlined style={{ fontSize: 50, color: 'orange' }} spin />
            }
          />
        </Flex>
      ) : (
        <>
          {/* Desktop Carousel */}
          <div className="hidden lg:block w-full">
            <Slider {...settings}>
              {React.Children.map(cards, (card) => (
                <div className="transition-transform duration-300 ease-in-out transform hover:scale-105 hover:opacity-90">
                  {card}
                </div>
              ))}
            </Slider>
          </div>

          {/* Mobile Display - Hide scrollbar using Tailwind */}
          <div className="lg:hidden w-full">
            <div className="flex space-x-4 overflow-x-auto px-4 [scrollbar-width:none]">
              {React.Children.map(cards, (card) => (
                <div className="flex-none min-w-[80%] transition-transform duration-300 ease-in-out transform hover:scale-105 hover:opacity-90">
                  {card}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
