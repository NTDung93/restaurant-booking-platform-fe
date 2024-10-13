import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { RESTAURANT_DETAIL_ROUTE } from '@/common/constants/routerConstant';
import { ReduxDispatch } from '@/libs/redux/store';
import { useDispatch } from 'react-redux';
import { ResponseEntityPagination } from '@/common/models/pagination';
import { LocationResponseLazy } from '@/common/models/location';
import Toast, { ToastType } from '@/components/Toast';
import { fetchLocationsByTag } from '../../thunks';
import LocationCardItem from '@/components/restaurant-user/LocationCardItem';

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
    <div className="mobile:max-md:w-[90%] mobile:max-md:overflow-hidden w-[80%] mx-auto lg:mt-12 mt-10">
      {toastMessage && <Toast type={toastType} message={toastMessage} />}

      <div className="text-left pl-2 lg:pl-4">
        <h2 className="text-xl md:text-3xl font-semibold text-black mb-4">
          Lên kế hoạch cho bữa ăn nhanh chóng
        </h2>
        <div className="flex flex-wrap justify-start gap-4 mb-4">
          {['Ăn sáng', 'Ăn trưa', 'Ăn tối', 'Hẹn hò', 'Gặp mặt'].map(
            (tag, index) => (
              <button
                key={tag}
                className={`px-4 py-2 text-sm md:text-lg font-normal rounded-full border ${
                  tagName === tag
                    ? 'border-gray-600 bg-amber-500 text-white border-none'
                    : 'border-gray-400 bg-gray-200'
                } hover:bg-amber-500 transition hover:text-white ${index === 4 ? 'hidden lg:block' : ''}`}
                onClick={() => handleTagChange(tag)}
              >
                {tag}
              </button>
            ),
          )}
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
