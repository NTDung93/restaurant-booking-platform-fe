import CategoryItem from '../../../../../components/restaurant-user/CategoryItem';

export default function Category() {
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
    <div className="w-full h-auto flex flex-wrap justify-center items-center space-x-0 sm:space-x-8 relative">
      <div className="w-4/5 h-auto flex flex-col sm:flex-row flex-wrap justify-between items-center mx-auto space-y-4 sm:space-y-0 sm:space-x-4 relative">
        {categories.map((category, index) => (
          <div key={index} className="w-full sm:w-1/5">
            <CategoryItem
              imgSrc={category.imgSrc}
              altText={category.altText}
              title={category.title}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
