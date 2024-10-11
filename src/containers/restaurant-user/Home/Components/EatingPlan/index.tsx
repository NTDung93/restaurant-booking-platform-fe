import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { RESTAURANT_DETAIL_ROUTE } from '@/common/constants/routerConstant';
import LocationCardItem from '@/components/restaurant-user/LocationCardItem';

export default function EatingPlan() {
  const navigate = useNavigate();
  const [slidesToShow, setSlidesToShow] = useState(4);
  const cardMaxWidth = 400;

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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToShow,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const handleNavigation = () => {
    navigate(RESTAURANT_DETAIL_ROUTE);
  };

  const cards = Array.from({ length: 8 }, (_, i) => (
    <LocationCardItem
      key={i}
      name={'Nhà hàng APIPI'}
      category={['Nhà hàng lẩu']}
      address={
        'Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Hồ Chí Minh 700000'
      }
      rating={3.5}
      booking={20000}
      imageUrl={''}
      onClick={handleNavigation}
    />
  ));

  return (
    <div className="mobile:max-md:w-[90%] mobile:max-md:overflow-hidden w-[80%] mx-auto lg:mt-24 mt-10">
      <div className="text-left pl-2 lg:pl-4">
        <h2 className="text-xl md:text-3xl font-semibold text-black mb-4">
          Lên kế hoạch cho bữa ăn nhanh chóng
        </h2>
        <div className="flex flex-wrap justify-start gap-4 mb-4">
          <button className="px-4 py-2 text-sm md:text-lg font-normal rounded-full border border-gray-400 hover:border-gray-600 hover:bg-gray-300 transition">
            Ăn sáng
          </button>
          <button className="px-4 py-2 text-sm md:text-lg font-normal bg-gray-200 rounded-full hover:bg-gray-300 transition">
            Ăn trưa
          </button>
          <button className="px-4 py-2 text-sm md:text-lg font-normal bg-gray-200 rounded-full hover:bg-gray-300 transition">
            Ăn tối
          </button>
          <button className="px-4 py-2 text-sm md:text-lg font-normal bg-gray-200 rounded-full hover:bg-gray-300 transition">
            Hẹn hò
          </button>
          <button className="hidden lg:block px-4 py-2 text-sm md:text-lg font-normal bg-gray-200 rounded-full hover:bg-gray-300 transition">
            Cuộc họp
          </button>
        </div>
      </div>
      <div className="hidden lg:block">
        <Slider {...settings}>{cards}</Slider>
      </div>
      <div className="block lg:hidden mobile:max-md:carousel mobile:max-md:carousel-center rounded-box max-w-md space-x-0">
        {cards}
      </div>
    </div>
  );
}
