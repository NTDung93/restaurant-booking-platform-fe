import { LocationResponseLazy } from '@/common/models/location';
import { getFirstImageUrl } from '@/utils/imageHelper';
import { Rate } from 'antd';
import React from 'react';

interface ResultCardProps {
  location: LocationResponseLazy;
  onClick: (id: string) => void;
}

const LocationPopupSearchItem: React.FC<ResultCardProps> = ({
  location,
  onClick,
}) => (
  <div
    className="cursor-pointer bg-white shadow-lg rounded-lg border border-gray-300 w-full p-5 flex flex-col gap-3 hover:shadow-xl transition-shadow duration-300 mb-5"
    onClick={() => onClick(location.id.toString())}
  >
    {/* Thông tin tên và ảnh */}
    <div className="flex items-center gap-4 border-b border-gray-200 pb-3">
      <img
        src={getFirstImageUrl(location.image)}
        alt={location.name}
        className="w-12 h-12 bg-gray-200 rounded-md object-cover"
      />
      <div className="text-amber-600 text-lg font-semibold">
        {location.name}
      </div>
    </div>

    {/* Địa chỉ và khoảng cách */}
    <div className="flex justify-between items-center text-gray-700 text-sm mt-2">
      <div>{location.address}</div>
      <div className="text-xs text-gray-500">{location.distance}</div>
    </div>

    {/* Đánh giá và lượt đặt */}
    <div className="flex items-center justify-between mt-3 text-gray-800">
      <div className="flex items-center">
        <span className="text-xs font-medium mr-2">Đánh giá:</span>
        <Rate disabled defaultValue={location.rating} className="text-base" />
      </div>
      <div className="text-xs font-medium text-gray-600">
        Lượt đặt: {location.view}
      </div>
    </div>
  </div>
);

export default LocationPopupSearchItem;
