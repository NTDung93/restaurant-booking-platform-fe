import MapPinIcon from '@/common/icons/mapPinIcon';
import { getFirstImageUrl } from '@/utils/imageHelper';
import { Rate } from 'antd';

interface LocationCardItemProps {
  imageUrl: string;
  name: string;
  category: string[];
  address: string;
  rating: number;
  booking: number;
  onClick: () => void;
}

export default function LocationCardItem({
  imageUrl,
  name,
  category,
  address,
  rating,
  booking,
  onClick,
}: LocationCardItemProps) {
  return (
    <div className="p-2 mobile:max-md:carousel-item max-w-[320px] lg:p-4 lg:max-w-[400px]">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-full">
        <div className="w-full h-60 bg-zinc-300">
          <img
            className="w-full h-full object-cover"
            src={getFirstImageUrl(imageUrl)}
            alt={name}
          />
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex items-center cursor-pointer" onClick={onClick}>
            <div
              className="text-black text-xl lg:text-2xl font-bold line-clamp-1"
              title={name}
            >
              {name}
            </div>
          </div>
          <div className="text-sm lg:text-base mt-2">
            <span className="text-amber-500 font-semibold">Loại hình: </span>
            <span className="text-zinc-500">{category}</span>
          </div>
          <div className="h-12 flex text-zinc-500 text-sm lg:text-base mt-2">
            <span className="mr-1 lg:mr-2">
              <MapPinIcon />
            </span>
            <span className="line-clamp-2" title={address}>
              {address}
            </span>
          </div>
          <div className="flex justify-between text-sm items-center mt-4">
            <div className="flex">
              <div className="font-semibold text-black mr-1 lg:mr-2">
                Đánh giá:{' '}
              </div>
              <Rate disabled defaultValue={rating} className="text-sm" />
            </div>
            <div className="flex text-black">
              <span className="font-semibold mr-1 lg:mr-2">Lượt đặt: </span>
              {booking}
            </div>
          </div>
          <div className="flex justify-center mt-auto pt-6">
            <button
              className="bg-amber-500 text-white text-base lg:text-lg font-medium px-6 py-2 rounded-full"
              onClick={onClick}
            >
              ĐẶT BÀN NGAY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
