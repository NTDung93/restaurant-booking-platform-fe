import React from 'react';
import { useSelector } from 'react-redux';
import {
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

  const descriptionParagraphs = description.split('\n');

  return (
    <div className="md:w-3/5 w-full text-white p-4">
      <div className="relative w-full mb-10">
        <h2 className="text-3xl md:text-6xl font-normal text-black">{name}</h2>

        <p className="mt-2 text-lg md:text-xl text-zinc-500 leading-loose tracking-tight">
          <EnvironmentOutlined /> {address} (nhấn vào để xem chỉ đường)
        </p>

        <div className="mt-4 text-lg md:text-xl text-zinc-500 leading-loose tracking-tight">
          <PhoneFilled />
          <span className="text-red-600 ml-3">Điện thoại:</span> {phone}
        </div>

        <div className="mt-4 text-lg md:text-xl text-zinc-500 leading-loose tracking-tight">
          <UnorderedListOutlined />
          <span className="text-red-600 ml-3">Mô tả:</span>
        </div>

        <div className="mt-2 text-lg md:text-xl text-zinc-500">
          {descriptionParagraphs.map((paragraph, index) => (
            <p key={index} className="mb-2">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantInfo;
