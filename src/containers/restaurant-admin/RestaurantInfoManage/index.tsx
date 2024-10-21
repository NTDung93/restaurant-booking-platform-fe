import Header from '@/components/restaurant-admin/Header';
import Image from '@/components/restaurant-admin/Img';
import Menu from '@/components/restaurant-admin/Menu';
import { selectUserInfo } from '@/containers/restaurant-user/Auth/selector';
import { selectLocationDetail } from '@/containers/restaurant-user/Home/selectors';
import { fetchLocationDetail } from '@/containers/restaurant-user/Home/thunks';
import { ReduxDispatch } from '@/libs/redux/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function ManageLocationFood() {
  const dispatch = useDispatch<ReduxDispatch>();
  const locationDetail = useSelector(selectLocationDetail);
  const userInfo = useSelector(selectUserInfo);

  useEffect(() => {
    const locationId = userInfo?.locationId;
    if (locationId) {
      dispatch(fetchLocationDetail(locationId));
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
              Thông tin nhà hàng
            </h1>
            <div className="flex flex-col space-y-6">
              <div className="flex items-center">
                <span className="text-gray-600 text-xl font-semibold w-48">
                  Tên Nhà Hàng:
                </span>
                <span className="text-gray-900 text-2xl font-bold">
                  {locationDetail?.name}
                </span>
              </div>

              <div className="flex items-center">
                <span className="text-gray-600 text-xl font-semibold w-48">
                  Logo Nhà Hàng:
                </span>
                <img
                  className="w-36 h-36 rounded-full object-cover border-2 border-gray-300"
                  src="https://pendecor.vn/uploads/files/2023/10/03/thiet-ke-logo-nha-hang-5.jpg"
                  alt="Logo Nhà Hàng"
                />
              </div>

              <div className="flex items-start">
                <span className="text-gray-600 text-xl font-semibold w-48">
                  Mô tả Nhà Hàng:
                </span>
                <p className="text-gray-700 text-lg max-w-3xl leading-relaxed">
                  {locationDetail?.description}
                </p>
              </div>

              <div className="flex items-center">
                <span className="text-gray-600 text-xl font-semibold w-48">
                  Số điện thoại:
                </span>
                <span className="text-gray-900 text-2xl font-bold">
                  {locationDetail?.phone}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
