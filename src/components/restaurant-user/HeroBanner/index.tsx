import React, { useState, useRef, useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import LocationPopupSearch from '@/containers/restaurant-user/Home/Components/LocationPopupSearch';
import Slider from 'react-slick';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxDispatch } from '@/libs/redux/store';
import { getAdsBannerOfLocation } from '@/containers/restaurant-admin/ManageAdvertisngCampaign/selector';
import { fetchAdsBannerOfLocation } from '@/containers/restaurant-admin/ManageAdvertisngCampaign/thunks';

const HeroBanner: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalWidth, setModalWidth] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch<ReduxDispatch>();
  const locationBanner = useSelector(getAdsBannerOfLocation);

  useEffect(() => {
    dispatch(fetchAdsBannerOfLocation());
  }, [dispatch]);

  const openModal = () => {
    if (inputRef.current) {
      const width = inputRef.current.offsetWidth;
      setModalWidth(width);
      setModalOpen(true);
    }
  };

  const closeModal = () => setModalOpen(false);

  const sliderSettings = {
    dots: false,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
  };

  const firstImages =
    locationBanner?.content
      ?.map((item) => {
        if (item.bannerImage) {
          return item.bannerImage;
        }
        return null;
      })
      .filter((image) => image !== null) || [];

  return (
    <>
      <div className="relative w-full h-[50vh] mb-10 md:mb-14">
        {firstImages.length > 0 ? (
          <Slider {...sliderSettings}>
            {firstImages.map((src, index) => (
              <div key={index}>
                <img
                  className="w-full h-[50vh] object-cover opacity-90"
                  src={src?.trim()}
                  alt={`Slide ${index + 1}`}
                />
              </div>
            ))}
          </Slider>
        ) : (
          <img
            className="w-full h-[50vh] object-cover opacity-90"
            src="https://res.cloudinary.com/dnslrwedn/image/upload/v1726239414/nha-hang-the-log-restaurant-222_uqjc8t.jpg"
            alt="Default Banner"
          />
        )}

        <div className="absolute bottom-[-30px] md:bottom-[-50px] left-1/2 transform -translate-x-1/2 w-full max-w-screen-lg px-2 md:px-4">
          <div className="bg-white shadow-lg rounded-lg flex items-center p-3 md:p-6">
            <div className="relative flex-grow w-full bg-white border h-12 rounded-lg">
              <input
                ref={inputRef}
                type="text"
                placeholder="Bạn muốn đặt chỗ đến đâu"
                className="w-full h-full px-4 py-2 pr-10 outline-none text-gray-600 text-sm md:text-base"
                onFocus={openModal}
              />
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <SearchOutlined />
              </div>
            </div>
          </div>
        </div>
      </div>

      <LocationPopupSearch
        isOpen={isModalOpen}
        onClose={closeModal}
        width={modalWidth}
      />
    </>
  );
};

export default HeroBanner;
