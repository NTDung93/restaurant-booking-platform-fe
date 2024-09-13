import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

export default function Popular() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const cards = Array.from({ length: 12 }, (_, i) => (
    <div key={i} className="p-4">
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="w-full h-60 bg-zinc-300"></div>
        <div className="p-4">
          <div className="text-amber-500 text-base font-normal font-['Roboto']">
            150.000 - 2.000.000 VNĐ
          </div>
          <div className="flex items-center mt-2">
            <div className="text-black text-2xl font-bold font-['Roboto']">
              Nhà hàng PUPU
            </div>
          </div>
          <div className="text-zinc-500 text-base font-normal font-['Be Vietnam Pro'] mt-2">
            Location: Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ
            Đức, Hồ Chí Minh 700000
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="text-black text-sm font-medium font-['Roboto']">
              Đánh giá
            </div>
            <div className="text-black text-sm font-medium font-['Roboto']">
              Lượt đặt : 300050
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <button className="bg-amber-500 text-white text-lg font-medium px-4 py-2 rounded-full">
              ĐẶT BÀN NGAY
            </button>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="text-center mb-8 mt-8">
          <div className="text-black text-4xl font-bold font-['Be Vietnam Pro']">
            Nhà hàng nổi bật
          </div>
        </div>
        <Slider {...settings}>{cards}</Slider>
      </div>
    </>
  );
}
