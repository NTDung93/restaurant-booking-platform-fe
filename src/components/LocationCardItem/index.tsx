import MapPinIcon from '@/common/icons/mapPinIcon';
import { Rate } from 'antd';

interface LocationCardItemProps {
  name: string;
  category: string;
  address: string;
  rating: number;
  booking: number;
  onClick: () => void;
}

export default function LocationCardItem({
  name,
  category,
  address,
  rating,
  booking,
  onClick,
}: LocationCardItemProps) {
  return (
    <div className="p-4 max-w-[400px]">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="w-full h-60 bg-zinc-300"></div>
        <div className="p-4">
          <div
            className="flex items-center mt-2 cursor-pointer"
            onClick={onClick}
          >
            <div className="text-black text-2xl font-bold ">{name}</div>
          </div>
          <div className="text-base font-['Be Vietnam Pro'] mt-2">
            <span className="text-amber-500 font-semibold">Loại hình: </span>
            <span>{category}</span>
          </div>
          <div className="flex text-zinc-500 text-base font-normal font-['Be Vietnam Pro'] mt-2">
            <span className="mr-2">
              <MapPinIcon />
            </span>
            <span>{address}</span>
          </div>
          <div className="flex justify-between items-center mt-4 ">
            <div className="flex">
              <div className="font-semibold text-black text-sm mr-2">
                Đánh giá:{' '}
              </div>
              <Rate disabled defaultValue={rating} className="text-sm" />
            </div>
            <div className="flex text-black text-sm ">
              <span className="font-semibold mr-2">Lượt đặt: </span>
              {booking}
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <button
              className="bg-amber-500 text-white text-lg font-medium px-6 py-2 rounded-full"
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
