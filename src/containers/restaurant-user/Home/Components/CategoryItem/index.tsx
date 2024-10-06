interface CategoryItemProps {
  imgSrc: string;
  altText: string;
  title: string;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  imgSrc,
  altText,
  title,
}) => (
  <div className="place-items-stretch flex flex-col items-center text-center">
    <div className="h-40 flex items-center justify-center">
      <img
        src={imgSrc}
        alt={altText}
        className="w-20 h-30 object-cover rounded-lg"
      />
    </div>
    <div className="text-black text-xl">{title}</div>
  </div>
);
export default CategoryItem;
