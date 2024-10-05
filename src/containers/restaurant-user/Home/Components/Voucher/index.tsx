import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Voucher() {
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
    <div className="voucher-container w-10/12 md:w-4/5 mx-auto mt-5">
      <Slider {...settings}>
        {/* Voucher 1 */}
        <div className="voucher-item px-2">
          <img
            className="w-full h-64 sm:h-56 object-cover rounded-lg"
            src="https://res.cloudinary.com/dnslrwedn/image/upload/v1726238576/voucher_1_1_itfnop.png"
            alt="Voucher 1"
          />
        </div>

        <div className="voucher-item px-2">
          <img
            className="w-full h-64 sm:h-56 object-cover rounded-lg"
            src="https://res.cloudinary.com/dnslrwedn/image/upload/v1726238576/voucher_2_1_kzkgov.png"
            alt="Voucher 2"
          />
        </div>

        {/* Voucher 3 */}
        <div className="voucher-item px-2">
          <img
            className="w-full h-64 sm:h-56 object-cover rounded-lg"
            src="https://res.cloudinary.com/dnslrwedn/image/upload/v1726238576/voucher_3_1_bupzon.png"
            alt="Voucher 3"
          />
        </div>
      </Slider>
    </div>
  );
}
