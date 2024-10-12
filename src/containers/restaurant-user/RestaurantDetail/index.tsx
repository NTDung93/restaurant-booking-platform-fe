import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import { useParams } from 'react-router-dom';

import { PrevArrow, NextArrow } from '@/components/Arrow';
import Header from '@/components/restaurant-user/Header';
import HeroBanner from '@/components/restaurant-user/HeroBanner';
import Footer from '@/components/restaurant-user/Footer';
import Interest from './components/Interest';
import VoucherSection from './components/VoucherSection';
import RestaurantInfo from './components/RestaurantInfo';
import ReservationForm from './components/ReservationForm';
import CommentSection from './components/CommentSection';
import MenuSection from './components/MenuSection';
import { fetchLocationDetail } from '@/containers/restaurant-user/Home/thunks';
import { selectLocationDetail } from '@/containers/restaurant-user/Home/selectors';
import { ReduxDispatch } from '@/libs/redux/store';

const RestaurantDetail: React.FC = () => {
  const dispatch = useDispatch<ReduxDispatch>();
  const locationDetail = useSelector(selectLocationDetail);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const sliderRef = useRef<Slider>(null);
  const { id } = useParams<{ id: string }>();
  const numericLocationId = Number(id);

  useEffect(() => {
    dispatch(fetchLocationDetail(numericLocationId));
  }, [dispatch, numericLocationId]);

  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const imageString: string | undefined = Array.isArray(locationDetail?.image)
      ? locationDetail?.image.join(',')
      : locationDetail?.image;

    if (imageString) {
      const processedImages = imageString
        .replace(/^\[|\]$/g, '')
        .split(',')
        .map((url) => url.trim());

      setImages(processedImages);
    }
  }, [locationDetail]);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    beforeChange: (_current: number, next: number) => setCurrentSlide(next),
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const handleThumbnailClick = (index: number) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Header />
        <HeroBanner />
        <div className="w-full max-w-screen-xl mx-auto flex flex-col md:flex-row md:h-[600px] px-4">
          <div className="md:w-3/5 w-full h-full p-4 mb-4 md:mb-0 rounded-lg flex items-center justify-center relative">
            <Slider {...settings} className="w-full h-full" ref={sliderRef}>
              {images.map((image, index) => (
                <div
                  key={index}
                  className="w-full h-full flex items-center justify-center"
                >
                  <img
                    src={image}
                    alt={`Slide ${index}`}
                    className="object-cover w-full h-[577px] rounded-lg"
                  />
                </div>
              ))}
            </Slider>
          </div>

          <div className="hidden md:flex md:w-1/5 w-full flex-col mt-2">
            {images.slice(0, 3).map((image, index) => (
              <div
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={`h-1/3 p-2 rounded-lg flex items-center justify-center relative ${
                  currentSlide === index ? 'border-4 border-blue-500' : ''
                }`}
              >
                <img
                  src={image}
                  alt={`Image ${index + 1}`}
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
            ))}
          </div>

          <div className="hidden md:flex md:w-1/5 w-full flex-col mt-2">
            {images.slice(3).map((image, index) => (
              <div
                key={index + 3}
                onClick={() => handleThumbnailClick(index + 3)}
                className={`h-1/3 p-2 mb-1 rounded-lg flex items-center justify-center relative ${
                  currentSlide === index + 3 ? 'border-4 border-blue-500' : ''
                }`}
              >
                <img
                  src={image}
                  alt={`Image ${index + 4}`}
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full max-w-screen-xl mx-auto flex flex-col md:flex-row mt-10 px-4">
          <RestaurantInfo />
          <ReservationForm />
        </div>
        <MenuSection />
        <VoucherSection />
        <CommentSection />
        <Interest />
      </div>
      <Footer />
    </div>
  );
};

export default RestaurantDetail;
