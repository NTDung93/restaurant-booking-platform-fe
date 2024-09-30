import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import Footer from '@/components/client/Footer';
import Header from '@/components/client/Header';
import Hero from '@/components/client/Hero';
import Interest from '@/components/client/Interest';
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
  const [comments, setComments] = useState<
    { name: string; content: string; time: string }[]
  >([]);
  const [commentInput, setCommentInput] = useState<string>('');

  const sliderRef = useRef<Slider>(null);

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

  const handleThumbnailClick = (index: number) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
    }
  };

  const handleAddComment = () => {
    if (commentInput.trim()) {
      const now = new Date();
      const time = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
      const name = 'User';
      setComments([...comments, { name, content: commentInput, time }]);
      setCommentInput('');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Header />
        <Hero />
        <div className="w-full max-w-screen-xl mx-auto flex flex-col md:flex-row md:h-[600px] px-4">
          <div className="md:w-3/5 w-full h-full p-4 mb-4 md:mb-0 rounded-lg flex items-center justify-center relative">
            <Slider {...settings} className="w-full h-full" ref={sliderRef}>
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
                onClick={() => handleThumbnailClick(index)}
                className={`h-1/3 p-2 rounded-lg flex items-center justify-center relative ${
                  currentSlide === index ? 'border-4 border-blue-500' : ''
                }`}
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
                onClick={() => handleThumbnailClick(index + 3)}
                className={`h-1/3 p-2 mb-1 rounded-lg flex items-center justify-center relative ${
                  currentSlide === index + 3 ? 'border-4 border-blue-500' : ''
                }`}
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

        <div className="w-full max-w-screen-xl mx-auto mt-10 px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-black">Voucher</h2>
          <div
            className="relative bg-amber-100 text-black mt-6 p-6 rounded-lg shadow-lg border-2  w-full md:w-2/5 mx-auto flex flex-col justify-between"
            style={{ height: '200px' }}
          >
            {/* Phần trên (2/3) */}
            <div className="flex-grow">
              <p className="text-lg md:text-xl font-medium mb-4">
                Nhập mã:{' '}
                <span className="font-bold text-red-600">COMTAM10</span> để được
                giảm 10% cho đơn hàng từ 100,000đ trở lên.
              </p>
            </div>

            {/* Đường gạch đứt ngăn cách */}
            <div className="border-t-2 border-dashed border-black my-4 w-full"></div>

            {/* Phần dưới (1/3) */}
            <div className="flex justify-center items-center">
              <button className="bg-red-600 text-white px-6 py-2 rounded-lg font-medium text-lg hover:bg-red-700 transition duration-300">
                COMTAM10
              </button>
            </div>
          </div>
        </div>

        <div className="w-full max-w-screen-xl mx-auto mt-10 px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-black">
            Bình luận
          </h2>
          <div className="mt-6 bg-zinc-100 p-6 rounded-lg shadow-md">
            <textarea
              className="w-full p-4 bg-white text-black rounded-lg border border-gray-300 mb-4"
              placeholder="Nhập bình luận của bạn..."
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
            />
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium text-lg hover:bg-blue-700 transition duration-300"
              onClick={handleAddComment}
            >
              Gửi bình luận
            </button>

            <div className="mt-6">
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-lg shadow-md mb-4"
                  >
                    <p className="text-lg md:text-xl text-black font-bold">
                      {comment.name}
                    </p>
                    <p className="text-sm md:text-base text-gray-500 mb-2">
                      {comment.time}
                    </p>
                    <p className="text-lg md:text-xl text-black">
                      {comment.content}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-lg md:text-xl text-gray-500">
                  Chưa có bình luận nào.
                </p>
              )}
            </div>
          </div>
        </div>

        <Interest />
      </div>
      <Footer />
    </div>
  );
};

export default RestaurantDetail;
