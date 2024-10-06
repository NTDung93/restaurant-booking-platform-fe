import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import CategoryItem from '../CategoryItem';

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

  const categories = [
    {
      imgSrc:
        'https://res.cloudinary.com/dnslrwedn/image/upload/v1726238852/OBJECTS_zrhobk.png',
      altText: 'Lẩu',
      title: 'Lẩu',
    },
    {
      imgSrc:
        'https://res.cloudinary.com/dnslrwedn/image/upload/v1726238852/Group_ujlmvm.png',
      altText: 'Món Nhật',
      title: 'Món Nhật',
    },
    {
      imgSrc:
        'https://res.cloudinary.com/dnslrwedn/image/upload/v1726238853/OBJECTS_1_yy9r9d.png',
      altText: 'Quán nhậu',
      title: 'Quán nhậu',
    },
    {
      imgSrc:
        'https://res.cloudinary.com/dnslrwedn/image/upload/v1726238854/Group_1000002666_avvhnl.png',
      altText: 'Hải sản',
      title: 'Hải sản',
    },
  ];

  return (
    <>
      <Slider {...settings} className="overflow-hidden">
        {categories.map((category, index) => (
          <div key={index}>
            <CategoryItem
              imgSrc={category.imgSrc}
              altText={category.altText}
              title={category.title}
            />
          </div>
        ))}
      </Slider>
    </>
  );
}
