import React from 'react';

interface VoucherCardProps {
  imageSrc: string;
  title: string;
  originalPrice: number;
  discountedPrice: number;
  discountAmount: number;
  onAdd: () => void; // Giữ nguyên prop này
}

const VoucherCard: React.FC<VoucherCardProps> = ({
  imageSrc,
  title,
  originalPrice,
  discountedPrice,
  onAdd,
}) => (
  <div
    onClick={onAdd} // Thực hiện hành động khi nhấn card
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
      <div className="flex items-center">
        <span className="ml-2 line-through text-gray-500 text-sm">
          {originalPrice.toLocaleString()} đ
        </span>
      </div>
      <div className="text-gray-900 font-semibold">
        {discountedPrice.toLocaleString()} đ
      </div>
    </div>
  </div>
);

export default VoucherCard;
