import { LocationResponseLazy } from '@/common/models/location';
import { getFirstImageUrl } from '@/utils/imageHelper';
import { Rate } from 'antd';
import React from 'react';

interface ResultCardProps {
  location: LocationResponseLazy;
  onClick: () => void;
}

const LocationPopupSearchItem: React.FC<ResultCardProps> = ({
  location,
  onClick,
}) => (
  <div
    className="cursor-pointer bg-white shadow rounded-lg border border-neutral-500 w-full p-4 flex flex-col gap-2 mb-4"
    onClick={onClick}
  >
    <div className="flex items-center gap-2 border-b border-neutral-500 pb-2">
      <img
        src={getFirstImageUrl(location.image)}
        alt={location.name}
        className="w-10 h-10 bg-gray-300 rounded-md object-cover"
      />
      <div className="text-amber-500 text-base font-medium">
        {location.name}
      </div>
    </div>
    <div className="text-sm text-gray-600">{location.address}</div>
    <div className="flex items-center justify-between mt-2">
      <div className="flex justify-between items-center">
        <div className="text-xs text-gray-800 mr-1 lg:mr-2">Đánh giá: </div>
        <Rate disabled defaultValue={location.rating} className="text-sm" />
      </div>
      <div className="text-xs text-gray-600">Lượt đặt: {location.view}</div>
    </div>
  </div>
);

export default LocationPopupSearchItem;
