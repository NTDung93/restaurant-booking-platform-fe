import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { RESTAURANT_DETAIL_ROUTE } from '@/common/constants/routerConstant';
import LocationCardItem from '@/components/restaurant-user/LocationCardItem';
import { useDispatch } from 'react-redux';
import { ReduxDispatch } from '@/libs/redux/store';
import { ResponseEntityPagination } from '@/common/models/pagination';
import { LocationResponseLazy } from '@/common/models/location';
import Toast, { ToastType } from '@/components/Toast';
import { fetchOnSaleLocations } from '../../thunks';

export default function OnSaleRestaurants() {
  let cards = undefined;
  const navigate = useNavigate();
  const [slidesToShow, setSlidesToShow] = useState(4);
  const cardMaxWidth = 400;
  const dispatch = useDispatch<ReduxDispatch>();
  const [responsePagination, setResponsePagination] =
    useState<ResponseEntityPagination<LocationResponseLazy>>();
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<ToastType>('success');

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
        const resultAction = await dispatch(fetchOnSaleLocations());

        if (fetchOnSaleLocations.fulfilled.match(resultAction)) {
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
  }, []);

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
    <div className="mobile:max-md:w-[90%] mobile:max-md:overflow-hidden w-[80%] mx-auto mt-8 lg:mt-12 mb-10">
      {toastMessage && <Toast type={toastType} message={toastMessage} />}

      <div className="text-center mb-4">
        <div className="mobile:max-md:text-3xl text-black text-4xl font-bold ">
          Đang giảm giá
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
