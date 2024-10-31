import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { RESTAURANT_DETAIL_ROUTE } from '@/common/constants/routerConstant';
import { ReduxDispatch } from '@/libs/redux/store';
import { useDispatch } from 'react-redux';
import { ResponseEntityPagination } from '@/common/models/pagination';
import { LocationResponseLazy } from '@/common/models/location';
import Toast, { ToastType } from '@/components/Toast';
import { fetchLocationsByTag } from '../../thunks';
import LocationCardItem from '@/components/restaurant-user/LocationCardItem';
import { Flex, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export default function LocationsByTag() {
  let cards = undefined;
  const navigate = useNavigate();
  const [slidesToShow, setSlidesToShow] = useState(4);
  const cardMaxWidth = 400;
  const dispatch = useDispatch<ReduxDispatch>();
  const [responsePagination, setResponsePagination] =
    useState<ResponseEntityPagination<LocationResponseLazy>>();
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<ToastType>('success');
  const [tagName, setTagName] = useState('Ăn sáng');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const cardsToShow = Math.floor(screenWidth / cardMaxWidth);
      setSlidesToShow(cardsToShow > 0 ? cardsToShow : 1);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultAction = await dispatch(fetchLocationsByTag(tagName));

        if (fetchLocationsByTag.fulfilled.match(resultAction)) {
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
  }, [dispatch, tagName]);

  const handleTagChange = (tag: string) => {
    setTagName(tag);
  };

  if (responsePagination) {
    cards = responsePagination!.content.map((location) => (
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
    ));
  }

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
    <div className="w-[80%] mx-auto mt-8 lg:mt-12 mb-10 mobile:max-md:w-full ">
      {toastMessage && <Toast type={toastType} message={toastMessage} />}

      {/* Title and Tags Section */}
      <div className="bg-white rounded-lg text-left px-4 lg:px-6 py-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
          Lên kế hoạch cho bữa ăn nhanh chóng
        </h2>
        <div className="flex flex-wrap gap-3 md:gap-4 mb-4">
          {['Ăn sáng', 'Ăn trưa', 'Ăn tối', 'Hẹn hò', 'Gặp mặt'].map(
            (tag, index) => (
              <button
                key={tag}
                className={`px-5 py-2 text-sm md:text-lg font-medium rounded-full shadow-sm transition-all duration-300 transform hover:scale-105 ${
                  tagName === tag
                    ? 'bg-amber-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-amber-500 hover:text-white'
                } ${index === 4 ? 'hidden lg:block' : ''}`}
                onClick={() => handleTagChange(tag)}
              >
                {tag}
              </button>
            ),
          )}
        </div>
      </div>

      {/* Loading Spinner */}
      {loading && (
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
      )}

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
    </div>
  );
}
