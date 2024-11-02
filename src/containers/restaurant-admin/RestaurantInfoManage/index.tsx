import Header from '@/components/restaurant-admin/Header';
import Image from '@/components/restaurant-admin/Img';
import Menu from '@/components/restaurant-admin/Menu';
import { selectUserInfo } from '@/containers/restaurant-user/Auth/selector';
import { selectLocationDetailById } from '@/containers/restaurant-user/Home/selectors';
import {
  fetchLocationDetailById,
  updateLocationDetailById,
} from '@/containers/restaurant-user/Home/thunks';
import { ReduxDispatch } from '@/libs/redux/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  EnvironmentOutlined,
  PhoneFilled,
  InfoCircleOutlined,
  PauseCircleOutlined,
  EditOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { LocationRequest } from '@/common/models/location';

export default function ManageLocationFood() {
  const dispatch = useDispatch<ReduxDispatch>();
  const locationDetail = useSelector(selectLocationDetailById);
  const userInfo = useSelector(selectUserInfo);

  useEffect(() => {
    const locationId = userInfo?.locationId;
    if (locationId) {
      dispatch(fetchLocationDetailById(locationId));
    }
  }, [dispatch]);

  console.log(locationDetail);

  const handleStopReceivingTables = () => {
    const categoryId = locationDetail?.category.map((cate) => cate.id) ?? [];
    const tagId = locationDetail?.tag.map((tag) => tag.id) ?? [];
    const updatedLocation: LocationRequest = {
      id: locationDetail?.id ?? 0,
      name: locationDetail?.name ?? '',
      address: locationDetail?.address ?? '',
      phone: locationDetail?.phone ?? '',
      latitude: locationDetail?.latitude ?? 0,
      longitude: locationDetail?.longitude ?? 0,
      description: locationDetail?.description ?? '',
      image: locationDetail?.image ?? '',
      status: locationDetail?.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE',
      userId: userInfo?.id ?? 0,
      brandId: locationDetail?.brand.id ?? 0,
      categoryId: categoryId,
      tagId: tagId,
    };

    dispatch(updateLocationDetailById(updatedLocation));
  };

  const handleUpdateRestaurantInfo = () => {
    // Add logic for updating restaurant information
    alert('Cập nhật thông tin nhà hàng.');
  };

  return (
    <>
      <Header />
      <div className="mt-[100px] flex min-h-screen">
        {/* Fixed Menu */}
        <div className="fixed top-[100px] left-0 w-[15vw] h-full bg-white shadow-md">
          <Menu />
        </div>

        {/* Main Content */}
        <div className="ml-[15vw] w-[85vw] flex flex-col items-center">
          <Image />

          <div className="max-w-4xl w-full p-10 bg-white rounded-3xl shadow-2xl mt-10 space-y-10 relative">
            <h1 className="text-4xl font-extrabold text-amber-600 mb-6 text-center">
              Thông tin nhà hàng
            </h1>

            {/* Restaurant Logo */}
            <div className="flex justify-center mb-8">
              <img
                className="w-44 h-44 rounded-full object-cover border-4 border-amber-500 shadow-lg"
                src="https://pendecor.vn/uploads/files/2023/10/03/thiet-ke-logo-nha-hang-5.jpg"
                alt="Logo Nhà Hàng"
              />
            </div>

            {/* Restaurant Info Sections */}
            <div className="space-y-8 text-gray-800">
              {/* Name */}
              <div className="flex items-center gap-3">
                <InfoCircleOutlined className="text-2xl text-amber-500" />
                <span className="text-xl font-semibold">Tên Nhà Hàng:</span>
                <span className="text-gray-900 text-2xl font-bold ml-2">
                  {locationDetail?.name || 'Tên nhà hàng'}
                </span>
              </div>

              {/* Description */}
              <div className="flex items-start gap-3">
                <EnvironmentOutlined className="text-2xl text-amber-500" />
                <div>
                  <span className="text-xl font-semibold">Mô tả Nhà Hàng:</span>
                  <p className="text-gray-700 leading-relaxed max-w-3xl mt-1">
                    {locationDetail?.description || 'Mô tả nhà hàng'}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3">
                <PhoneFilled className="text-2xl text-amber-500" />
                <span className="text-xl font-semibold">Số điện thoại:</span>
                <span className="text-gray-900 text-2xl font-bold ml-2">
                  {locationDetail?.phone || 'Số điện thoại'}
                </span>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3">
                <EnvironmentOutlined className="text-2xl text-amber-500" />
                <div>
                  <span className="text-xl font-semibold">Địa chỉ:</span>
                  <p className="text-gray-700 leading-relaxed max-w-3xl mt-1">
                    {locationDetail?.address || 'Địa chỉ nhà hàng'}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4">
                <button
                  onClick={handleStopReceivingTables}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-md transition ${
                    locationDetail?.status === 'INACTIVE'
                      ? 'bg-green-500 hover:bg-green-600 text-white'
                      : 'bg-red-500 hover:bg-red-600 text-white'
                  }`}
                >
                  {locationDetail?.status === 'INACTIVE' ? (
                    <>
                      <CheckCircleOutlined /> Có thể nhận bàn
                    </>
                  ) : (
                    <>
                      <PauseCircleOutlined /> Ngưng nhận bàn
                    </>
                  )}
                </button>

                <button
                  onClick={handleUpdateRestaurantInfo}
                  className="flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-amber-600 transition"
                >
                  <EditOutlined />
                  Cập nhật thông tin
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
