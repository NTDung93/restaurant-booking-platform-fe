import Header from '@/components/restaurant-admin/Header';
import Image from '@/components/restaurant-admin/Img';
import Menu from '@/components/restaurant-admin/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { ReduxDispatch } from '@/libs/redux/store';
import { selectFoodByLocation } from '@/containers/restaurant-user/Comfirm/components/FoodSelectionModal/selector';
import { fetchFoodByLocation } from '@/containers/restaurant-user/Comfirm/components/FoodSelectionModal/thunks';
import { selectUserInfo } from '@/containers/restaurant-user/Auth/selector';

export default function ManageLocationFood() {
  const dispatch = useDispatch<ReduxDispatch>();
  const foodsPaginationResponse = useSelector(selectFoodByLocation);
  const userInfo = useSelector(selectUserInfo);
  useEffect(() => {
    const locationId = userInfo?.locationId;
    if (locationId) {
      dispatch(fetchFoodByLocation(locationId));
    }
  }, [dispatch]);

  return (
    <>
      <Header />
      <div className="mt-[100px] flex min-h-screen">
        <Menu />
        <div className="w-[85vw] flex flex-col">
          <Image />
          <div className="ml-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">
              Tất cả món ăn
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {foodsPaginationResponse?.content?.map((food) => (
                <div
                  key={food.id}
                  className="w-[400px] bg-white shadow-lg rounded-3xl overflow-hidden"
                >
                  <img
                    className="w-full h-64 object-cover"
                    src={food.image}
                    alt={food.name}
                  />
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      {food.name}
                    </h2>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-amber-500 font-medium text-xl">
                        Giá: {food.price.toLocaleString()} VNĐ
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Nếu chưa có món ăn */}
            {foodsPaginationResponse?.content?.length === 0 && (
              <p className="text-xl text-gray-500">
                Không có món ăn nào được tìm thấy.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
