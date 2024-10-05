import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Voucher() {
  // Slider settings for responsive behavior
  const settings = {
    dots: true, // Show navigation dots
    infinite: true, // Loop through slides infinitely
    speed: 500, // Transition speed
    slidesToShow: 3, // Number of slides to show at once on desktop
    slidesToScroll: 1, // Number of slides to scroll at once
    responsive: [
      {
        breakpoint: 1024, // For screens <= 1024px
        settings: {
          slidesToShow: 2, // Show 2 slides on tablet devices
        },
      },
      {
        breakpoint: 768, // For screens <= 768px (small tablets, larger phones)
        settings: {
          slidesToShow: 1, // Show 1 slide on mobile
        },
      },
    ],
  };

  return (
    <div className="voucher-container w-11/12 md:w-4/5 mx-auto mt-5">
      <Slider {...settings}>
        {/* Voucher 1 */}
        <div className="voucher-item px-2">
          <img
            className="w-full h-64 sm:h-56 object-cover rounded-lg"
            src="https://res.cloudinary.com/dnslrwedn/image/upload/v1726238576/voucher_1_1_itfnop.png"
            alt="Voucher 1"
          />
        </div>

        {/* Voucher 2 */}
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

        {/* Add more voucher items if needed */}
      </Slider>
    </div>
  );
}
