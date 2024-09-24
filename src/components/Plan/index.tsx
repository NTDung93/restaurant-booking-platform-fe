import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Plan() {
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
    navigate('/res-detail');
  };

  const cards = Array.from({ length: 8 }, (_, i) => (
    <div key={i} className="p-4 max-w-[400px]">
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="w-full h-60 bg-zinc-300"></div>
        <div className="p-4">
          <div className="text-amber-500 text-base font-normal ">
            150.000 - 2.000.000 VNĐ
          </div>
          <div
            className="flex items-center mt-2 cursor-pointer"
            onClick={handleNavigation}
          >
            <div className="text-black text-2xl font-bold ">Nhà hàng PUPU</div>
          </div>
          <div className="text-zinc-500 text-base font-normal font-['Be Vietnam Pro'] mt-2">
            Location: Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ
            Đức, Hồ Chí Minh 700000
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="text-black text-sm font-medium ">Đánh giá</div>
            <div className="text-black text-sm font-medium ">
              Lượt đặt : 300050
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <button
              className="bg-amber-500 text-white text-lg font-medium px-4 py-2 rounded-full"
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
    <div className="w-full md:w-4/5 mx-auto mt-10 mb-10">
      <div className="text-left mb-10">
        <h2 className="text-xl md:text-3xl font-semibold text-black mb-8 pl-4">
          Lên kế hoạch cho bữa ăn nhanh chóng
        </h2>
        <div className="flex flex-wrap justify-start gap-4 mb-10 pl-4">
          <button className="px-4 py-2 text-sm md:text-lg font-normal rounded-full border border-gray-400 hover:border-gray-600 hover:bg-gray-300 transition mb-2">
            Ăn sáng
          </button>
          <button className="px-4 py-2 text-sm md:text-lg font-normal bg-gray-200 rounded-full hover:bg-gray-300 transition mb-2">
            Ăn trưa
          </button>
          <button className="px-4 py-2 text-sm md:text-lg font-normal bg-gray-200 rounded-full hover:bg-gray-300 transition mb-2">
            Ăn tối
          </button>
          <button className="px-4 py-2 text-sm md:text-lg font-normal bg-gray-200 rounded-full hover:bg-gray-300 transition mb-2">
            Hẹn hò
          </button>
          <button className="px-4 py-2 text-sm md:text-lg font-normal bg-gray-200 rounded-full hover:bg-gray-300 transition mb-2">
            Meeting
          </button>
        </div>
      </div>
      <Slider {...settings}>{cards}</Slider>
    </div>
  );
}
