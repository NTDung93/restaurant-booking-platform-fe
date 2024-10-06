import { useNavigate } from 'react-router-dom';
import { RESTAURANT_DETAIL_ROUTE } from '@/common/constants/routerConstant';

export default function FullBleedCarousel() {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(RESTAURANT_DETAIL_ROUTE);
  };

  const cards = Array.from({ length: 8 }, (_, i) => (
    <div key={i} className="carousel-item p-2 max-w-[300px]">
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="w-full h-60 bg-zinc-300"></div>
        <div className="p-4">
          <div className="text-amber-500 text-base font-normal ">
            150.000 - 2.000.000 VNĐ
          </div>
          <div
            className="flex items-center mt-2 cursor-pointer"
            onClick={handleNavigation}
          >
            <div className="text-black text-2xl font-bold ">Nhà hàng PUPU</div>
          </div>
          <div className="text-zinc-500 text-base font-normal font-['Be Vietnam Pro'] mt-2">
            Location: Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ
            Đức, Hồ Chí Minh 700000
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="text-black text-sm font-medium ">Đánh giá</div>
            <div className="text-black text-sm font-medium ">
              Lượt đặt : 300050
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <button
              className="bg-amber-500 text-white text-lg font-medium px-4 py-2 rounded-full"
              onClick={handleNavigation}
            >
              ĐẶT BÀN NGAY
            </button>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="w-[90%] mx-auto overflow-hidden">
      <div className="text-center mb-4 mt-8">
        <div className="text-black text-3xl font-bold ">Nhà hàng nổi bật</div>
      </div>
      <div className="carousel carousel-center rounded-box max-w-md space-x-2">
        {cards}
      </div>
    </div>
  );
}
