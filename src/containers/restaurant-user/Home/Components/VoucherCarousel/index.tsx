import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function VoucherCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="w-10/12 md:w-4/5 mx-auto mt-5">
      <Slider {...settings}>
        <div className="px-2">
          <img
            className="w-full h-auto object-cover rounded-lg"
            src="https://res.cloudinary.com/dnslrwedn/image/upload/v1726238576/voucher_1_1_itfnop.png"
            alt="Voucher 1"
          />
        </div>

        <div className="px-2">
          <img
            className="w-full h-auto object-cover rounded-lg"
            src="https://res.cloudinary.com/dnslrwedn/image/upload/v1726238576/voucher_2_1_kzkgov.png"
            alt="Voucher 2"
          />
        </div>

        <div className="px-2">
          <img
            className="w-full h-auto object-cover rounded-lg"
            src="https://res.cloudinary.com/dnslrwedn/image/upload/v1726238576/voucher_3_1_bupzon.png"
            alt="Voucher 3"
          />
        </div>
      </Slider>
    </div>
  );
}
