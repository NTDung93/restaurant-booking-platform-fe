import React from 'react';

interface PromotionCardProps {
  imageSrc: string;
  title: string;
  description: string;
  onAdd: () => void; // Giữ nguyên prop này
}

const PromotionCard: React.FC<PromotionCardProps> = ({
  imageSrc,
  title,
  description,
  onAdd,
}) => (
  <div
    onClick={onAdd}
    className="flex items-center border p-4 rounded-lg shadow-md bg-white h-24 cursor-pointer hover:bg-gray-100" // Thêm hover effect
  >
    <div className="w-16 h-16 mr-4">
      <img
        src={imageSrc}
        alt={title}
        className="w-full h-full object-cover rounded-md"
      />
    </div>

    <div className="flex-grow">
      <h3 className="font-semibold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

export default PromotionCard;
