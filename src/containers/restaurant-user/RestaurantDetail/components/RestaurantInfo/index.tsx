import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EnvironmentOutlined,
  PhoneFilled,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { selectLocationDetail } from '@/containers/restaurant-user/Home/selectors';

const RestaurantInfo: React.FC = () => {
  const locationDetail = useSelector(selectLocationDetail);

  const name = locationDetail?.name || 'Tên nhà hàng';
  const address = locationDetail?.address || 'Địa chỉ nhà hàng';
  const phone = locationDetail?.phone || 'Số điện thoại';
  const description = locationDetail?.description || 'Mô tả nhà hàng';
  const status = locationDetail?.status || 'INACTIVE';

  const descriptionParagraphs = description.split('\n');

  useEffect(() => {
    if (locationDetail) {
      localStorage.setItem('restaurantName', name);
      localStorage.setItem('address', address);
    }
  }, [locationDetail, name, address]);

  return (
    <div className="md:w-3/5 w-full text-gray-900 p-6 bg-white rounded-3xl shadow-xl border border-gray-100">
      <div className="relative w-full mb-10">
        <h2 className="text-4xl md:text-5xl font-bold text-amber-600 tracking-tight">
          {name}
        </h2>

        <p className="mt-4 text-lg md:text-xl text-gray-500 leading-relaxed tracking-tight flex items-center gap-2 cursor-pointer">
          <EnvironmentOutlined className="text-amber-500" />
          <span className="hover:underline hover:text-amber-600">
            {address} (nhấn vào để xem chỉ đường)
          </span>
        </p>

        <div className="mt-6 text-lg md:text-xl text-gray-500 leading-relaxed tracking-tight flex items-center gap-2">
          <PhoneFilled className="text-amber-500" />
          <span className="text-gray-800 font-semibold">Điện thoại:</span>
          <span className="ml-1">{phone}</span>
        </div>

        {/* Status Indicator */}
        <div className="mt-6 text-lg md:text-xl flex items-center gap-2">
          {status === 'ACTIVE' ? (
            <CheckCircleOutlined className="text-green-600 text-2xl" />
          ) : (
            <CloseCircleOutlined className="text-red-600 text-2xl" />
          )}
          <span
            className={`font-semibold ${
              status === 'ACTIVE' ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {status === 'ACTIVE' ? 'Còn bàn' : 'Đã hết bàn'}
          </span>
        </div>

        <div className="mt-6 text-lg md:text-xl text-gray-500 leading-relaxed tracking-tight flex items-center gap-2">
          <UnorderedListOutlined className="text-amber-500" />
          <span className="text-gray-800 font-semibold">Mô tả:</span>
        </div>

        <div className="mt-4 text-lg md:text-xl text-gray-600">
          {descriptionParagraphs.map((paragraph, index) => (
            <p key={index} className="mb-3 leading-loose">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantInfo;
