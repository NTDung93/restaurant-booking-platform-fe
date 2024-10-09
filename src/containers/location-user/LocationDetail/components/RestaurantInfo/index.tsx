import React from 'react';
import {
  EnvironmentOutlined,
  FlagOutlined,
  DollarOutlined,
  ClockCircleOutlined,
  CarOutlined,
} from '@ant-design/icons';

const RestaurantInfo: React.FC = () => (
  <div className="md:w-3/5 w-full text-white p-4">
    <div className="relative w-full mb-10">
      <h2 className="text-3xl md:text-6xl font-normal text-black">
        Cơm tấm Baque
      </h2>
      <p className="mt-2 text-lg md:text-xl text-zinc-500 leading-loose tracking-tight">
        <EnvironmentOutlined /> Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành
        Phố Thủ Đức, Hồ Chí Minh 700000 (nhấn vào để xem chỉ đường)
      </p>
      <div className="mt-4 text-lg md:text-xl text-zinc-500 leading-loose tracking-tight">
        <FlagOutlined />
        <span className="text-red-600 ml-3">Loại hình:</span> Cơm tấm không nước
      </div>
      <div className="flex items-center text-lg md:text-xl text-zinc-500 leading-loose tracking-tight">
        <DollarOutlined />{' '}
        <span className="mr-2 text-black ml-3">Khoảng giá:</span> 30,000 -
        40,000đ/người
      </div>
      <div className="flex items-center text-lg md:text-xl text-green-800 leading-loose tracking-tight">
        <ClockCircleOutlined />{' '}
        <span className="mr-2 text-black ml-3">Đang mở cửa:</span> 6:00 - 22:00
      </div>
      <div className="text-lg md:text-xl text-zinc-500 leading-loose tracking-tight">
        <CarOutlined /> <span className="text-black ml-2">Chỗ để xe:</span> Xe
        máy (miễn phí)
      </div>
    </div>
  </div>
);

export default RestaurantInfo;
