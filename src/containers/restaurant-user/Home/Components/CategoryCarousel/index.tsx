import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

export default function CategoryMobile() {
  const settings = {
    dots: false, // Disable dots for navigation if not needed
    infinite: true,
    speed: 500,
    slidesToShow: 2, // You can set this based on your preference or screen size
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768, // Mobile screens
        settings: {
          slidesToShow: 2, // Show 2 items at a time on mobile
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      <div className="category-item flex-shrink-0 w-40 flex flex-col items-center text-center">
        <div className="h-40 flex items-center justify-center">
          <img
            src="https://res.cloudinary.com/dnslrwedn/image/upload/v1726238852/OBJECTS_zrhobk.png"
            alt="Lẩu"
            className="w-20 h-30 object-cover rounded-lg"
          />
        </div>
        <div className="mt-2 text-black text-xl">Lẩu</div>
      </div>

      <div className="category-item flex-shrink-0 w-40 flex flex-col items-center text-center">
        <div className="h-40 flex items-center justify-center">
          <img
            src="https://res.cloudinary.com/dnslrwedn/image/upload/v1726238852/Group_ujlmvm.png"
            alt="Món Nhật"
            className="w-20 h-30 object-cover rounded-lg"
          />
        </div>
        <div className="mt-2 text-black text-xl">Món Nhật</div>
      </div>

      <div className="category-item flex-shrink-0 w-40 flex flex-col items-center text-center">
        <div className="h-40 flex items-center justify-center">
          <img
            src="https://res.cloudinary.com/dnslrwedn/image/upload/v1726238853/OBJECTS_1_yy9r9d.png"
            alt="Quán nhậu"
            className="w-20 h-30 object-cover rounded-lg"
          />
        </div>
        <div className="mt-2 text-black text-xl">Quán nhậu</div>
      </div>

      <div className="category-item flex-shrink-0 w-40 flex flex-col items-center text-center">
        <div className="h-40 flex items-center justify-center">
          <img
            src="https://res.cloudinary.com/dnslrwedn/image/upload/v1726238854/Group_1000002666_avvhnl.png"
            alt="Hải sản"
            className="w-20 h-30 object-cover rounded-lg"
          />
        </div>
        <div className="mt-2 text-black text-xl">Hải sản</div>
      </div>
    </Slider>
  );
}
