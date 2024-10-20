import Header from '@/components/restaurant-admin/Header';
import Image from '@/components/restaurant-admin/Img';
import Menu from '@/components/restaurant-admin/Menu';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ReduxDispatch, ReduxState } from '@/libs/redux/store';
import { BookingLocation } from '@/common/models/booking';
import { fetchBookingById } from '../ManageBookingTableAll/thunks';
import { selectBookingById } from '../ManageBookingTableAll/selector';
import { ApiStatus } from '@/common/enums/apiStatus';

export default function ManageBookingTableDetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch<ReduxDispatch>();
  const { id } = useParams<{ id: string }>();

  const bookingDetail = useSelector<ReduxState, BookingLocation | undefined>(
    selectBookingById,
  );
  const status = useSelector(
    (state: ReduxState) => state.bookingByLocation.status,
  );

  const handleBackClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchBookingById(Number(id)));
    }
  }, [dispatch, id]);

  return (
    <>
      <Header />
      <div className="mt-[100px] flex min-h-screen">
        <Menu />
        <div className="w-[85vw] flex flex-col">
          <Image />
          <div className="ml-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">
              Chi tiết đặt bàn
            </h1>

            {status === ApiStatus.Loading ? (
              <div>Đang tải thông tin...</div>
            ) : (
              <div className="bg-white shadow-md rounded-lg p-8 grid grid-cols-2 gap-8 text-xl">
                <div className="space-y-6">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">
                      Mã bàn đặt:
                    </span>
                    <span className="text-black">#{bookingDetail?.id}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Người lớn</span>
                    <span className="text-black">
                      {bookingDetail?.numberOfAdult}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Trẻ em:</span>
                    <span className="text-black">
                      {bookingDetail?.numberOfChildren}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">
                      Thời gian đặt:
                    </span>
                    <span className="text-black">
                      {bookingDetail?.bookingDate} {bookingDetail?.bookingTime}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">
                      Tổng giá trị:
                    </span>
                    <span className="text-black">
                      {bookingDetail?.amount} VNĐ
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">
                      Trạng thái thanh toán:
                    </span>
                    <span
                      className={`text-${bookingDetail?.status === 'Đã cọc' ? 'sky-700' : 'red-600'}`}
                    >
                      {bookingDetail?.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">
                      Tên khách hàng:
                    </span>
                    <span className="text-black">{bookingDetail?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">SĐT:</span>
                    <span className="text-black">{bookingDetail?.phone}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8">
              <button
                onClick={handleBackClick}
                className="bg-amber-600 text-white text-lg font-bold py-2 px-6 rounded-full transition duration-200 hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                Quay lại
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
