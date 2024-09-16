import React, { useState } from 'react';
import Slider from 'react-slick';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Interest from '@/components/Interest';
import { PrevArrow, NextArrow } from '@/components/Arrow';
import {
  CarOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  EnvironmentOutlined,
  FlagOutlined,
} from '@ant-design/icons';

const images: string[] = [
  'https://th.bing.com/th/id/OIP.pgdXkU8beYpa682VgWl_YgHaE7?w=289&h=193&c=7&r=0&o=5&pid=1.7',
  'https://th.bing.com/th/id/OIP.4qYMNFgBVmHdBT38W0bhigHaE8?w=279&h=186&c=7&r=0&o=5&pid=1.7',
  'https://th.bing.com/th/id/OIP.bOtKagLFpyyGAGJ_viBhrAHaFj?w=330&h=198&c=7&r=0&o=5&pid=1.7',
  'https://th.bing.com/th/id/OIP.qcBSaNlQcjlgQG4-Cy1J8wHaE8?w=290&h=193&c=7&r=0&o=5&pid=1.7',
  'http://ts3.mm.bing.net/th?id=OIP.YkWIKXQcc3f7puhCdPnp7gHaE7&pid=15.1',
  'http://ts2.mm.bing.net/th?id=OIP.rIhZBu4pqP4cOgW8tuQzlQHaEc&pid=15.1',
];

const RestaurantDetail: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    beforeChange: (_current: number, next: number) => setCurrentSlide(next),
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Header />
        <Hero />
        <div className="w-full max-w-screen-xl mx-auto flex flex-col md:flex-row md:h-[600px] px-4">
          <div className="md:w-3/5 w-full h-full p-4 mb-4 md:mb-0 rounded-lg flex items-center justify-center relative">
            <Slider {...settings} className="w-full h-full">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="w-full h-full flex items-center justify-center"
                >
                  <img
                    src={image}
                    alt={`Slide ${index}`}
                    className="object-cover w-full h-[577.5px] rounded-lg"
                  />
                </div>
              ))}
            </Slider>
          </div>

          <div className="md:w-1/5 w-full flex flex-col mt-2">
            {images.slice(0, 3).map((image, index) => (
              <div
                key={index}
                className={`h-1/3 p-2 rounded-lg flex items-center justify-center relative ${currentSlide === index ? 'border-4 border-blue-500' : ''}`}
              >
                <img
                  src={image}
                  alt={`Image ${index + 1}`}
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
            ))}
          </div>

          <div className="md:w-1/5 w-full flex flex-col mt-2">
            {images.slice(3).map((image, index) => (
              <div
                key={index + 3}
                className={`h-1/3 p-2 mb-1 rounded-lg flex items-center justify-center relative ${currentSlide === index + 3 ? 'border-4 border-blue-500' : ''}`}
              >
                <img
                  src={image}
                  alt={`Image ${index + 4}`}
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="w-full max-w-screen-xl mx-auto flex flex-col md:flex-row mt-10 px-4">
          {/* Bên trái */}
          <div className="md:w-3/5 w-full text-white p-4">
            <div className="relative w-full mb-10">
              <h2 className="text-3xl md:text-6xl font-normal text-black">
                Cơm tấm Baque
              </h2>
              <p className="mt-2 text-lg md:text-xl text-zinc-500 leading-loose tracking-tight">
                <EnvironmentOutlined /> Lô E2a-7, Đường D1, Đ. D1, Long Thạnh
                Mỹ, Thành Phố Thủ Đức, Hồ Chí Minh 700000 (nhấn vào để xem chỉ
                đường)
              </p>
              <div className="mt-4 text-lg md:text-xl text-zinc-500 leading-loose tracking-tight">
                <FlagOutlined />
                <span className="text-red-600 ml-3">Loại hình:</span> Cơm tấm
                không nước
              </div>
              <div className="flex items-center text-lg md:text-xl text-zinc-500 leading-loose tracking-tight">
                <DollarOutlined />{' '}
                <span className="mr-2 text-black ml-3">Khoảng giá:</span> 30,000
                - 40,000đ/người
              </div>
              <div className="flex items-center text-lg md:text-xl text-green-800 leading-loose tracking-tight">
                <ClockCircleOutlined />{' '}
                <span className="mr-2 text-black ml-3">Đang mở cửa:</span> 6:00
                - 22:00
              </div>
              <div className="text-lg md:text-xl text-zinc-500 leading-loose tracking-tight">
                <CarOutlined />{' '}
                <span className="text-black ml-2">Chỗ để xe:</span> Xe máy (miễn
                phí)
              </div>
            </div>
          </div>

          {/* Bên phải */}
          <div className="md:w-2/5 w-full bg-amber-500 text-white p-4 flex flex-col rounded-lg ml-0 md:ml-6">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-center text-black">
              Đặt bàn
            </h2>
            <div className="flex flex-col gap-4">
              <div className="bg-zinc-300 p-4 rounded-lg shadow-md">
                <label className="block text-lg md:text-xl font-medium text-black mb-2">
                  Người lớn:
                </label>
                <input
                  type="number"
                  className="w-full p-2 bg-white text-black rounded-lg border border-gray-300"
                  placeholder="Số người lớn"
                />
              </div>
              <div className="bg-zinc-300 p-4 rounded-lg shadow-md">
                <label className="block text-lg md:text-xl font-medium text-black mb-2">
                  Trẻ em:
                </label>
                <input
                  type="number"
                  className="w-full p-2 bg-white text-black rounded-lg border border-gray-300"
                  placeholder="Số trẻ em"
                />
              </div>
              <div className="bg-zinc-300 p-4 rounded-lg shadow-md">
                <label className="block text-lg md:text-xl font-medium text-black mb-2">
                  Thời gian đến:
                </label>
                <input
                  type="datetime-local"
                  className="w-full p-2 bg-white text-black rounded-lg border border-gray-300"
                />
              </div>
              <div className="flex justify-center">
                <button className="bg-[#312525] text-white px-6 py-2 rounded-lg font-medium text-lg hover:bg-amber-600 transition duration-300">
                  ĐẶT BÀN
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full max-w-screen-xl mx-auto mt-10 px-4">
          <h1 className="text-3xl md:text-6xl font-normal text-black">
            Thực đơn
          </h1>
          <img
            src="https://th.bing.com/th/id/OIP.HXzsBD_yPoXjc2xdjhVKBgHaE_?w=253&h=180&c=7&r=0&o=5&pid=1.7"
            alt="Additional Image"
            className="w-full h-auto rounded-lg object-cover mt-10"
          />
        </div>

        <Interest />
      </div>
      <Footer />
    </div>
  );
};

export default RestaurantDetail;
