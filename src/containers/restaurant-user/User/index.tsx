import Footer from '@/components/restaurant-user/Footer';
import Header from '@/components/restaurant-user/Header';
import MenuUser from '@/components/restaurant-user/MenuUser';
import { getUserInfo } from '@/containers/restaurant-user/Auth/thunks';
import { selectUserInfo } from '@/containers/restaurant-user/Auth/selector';
import { ReduxDispatch } from '@/libs/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function UserDetail() {
  const dispatch = useDispatch<ReduxDispatch>();
  const userInfo = useSelector(selectUserInfo);

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow p-6 flex justify-center items-start bg-gray-100">
        <div className="bg-white w-full max-w-6xl p-8 shadow-lg rounded-lg grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="col-span-4">
            <MenuUser />
          </div>
          <div className="col-span-8 bg-gray-50 p-6 rounded-lg shadow-inner">
            <h2 className="text-2xl font-semibold mb-6">THÔNG TIN TÀI KHOẢN</h2>
            <div className="space-y-6">
              <div className="flex items-center">
                <p className="w-32 font-medium text-lg">Họ và Tên:</p>
                <p className="text-lg">{userInfo?.fullName}</p>
              </div>
              <div className="flex items-center">
                <p className="w-32 font-medium text-lg">Email:</p>
                <p className="text-lg">{userInfo?.email}</p>
              </div>
              <div className="flex items-center">
                <p className="w-32 font-medium text-lg">Số điện thoại:</p>
                <p className="text-lg">{userInfo?.phone}</p>
              </div>
              <div className="flex items-center">
                <p className="w-32 font-medium text-lg">Điểm:</p>
                <p className="text-lg">{userInfo?.point}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
