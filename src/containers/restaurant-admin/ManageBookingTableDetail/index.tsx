import Header from '@/components/restaurant-admin/Header';
import Image from '@/components/restaurant-admin/Img';
import Menu from '@/components/restaurant-admin/Menu';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ReduxDispatch, ReduxState } from '@/libs/redux/store';
import { BookingLocation } from '@/common/models/booking';
import {
  approveBookingByLocation,
  cancelBookingByLocation,
  fetchBookingById,
  successBookingByLocation,
} from '../ManageBookingTableAll/thunks';
import { selectBookingById } from '../ManageBookingTableAll/selector';
import { ApiStatus } from '@/common/enums/apiStatus';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export default function ManageBookingTableDetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch<ReduxDispatch>();
  const { id } = useParams<{ id: string }>();
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
  const [isApproveModalVisible, setIsApproveModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

  const bookingDetail = useSelector<ReduxState, BookingLocation | undefined>(
    selectBookingById,
  );
  const status = useSelector(
    (state: ReduxState) => state.bookingByLocation.status,
  );

  const handleCancelBooking = async () => {
    if (!bookingDetail) return;

    try {
      await dispatch(
        cancelBookingByLocation({ locationId: bookingDetail.id }),
      ).unwrap();
      alert('Đơn đặt bàn đã được hủy thành công!');
      setIsCancelModalVisible(false);
      dispatch(fetchBookingById(Number(id)));
    } catch (error) {
      console.error('Failed to cancel order:', error);
      alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
    }
  };

  const handleApproveBooking = async () => {
    if (!bookingDetail) return;

    try {
      await dispatch(
        approveBookingByLocation({ locationId: bookingDetail.id }),
      ).unwrap();
      setIsApproveModalVisible(false);
      dispatch(fetchBookingById(Number(id)));
    } catch (error) {
      alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
    }
  };

  const handleSuccessBooking = async () => {
    if (!bookingDetail) return;

    try {
      await dispatch(
        successBookingByLocation({ locationId: bookingDetail.id }),
      ).unwrap();
      setIsSuccessModalVisible(false);
      dispatch(fetchBookingById(Number(id)));
    } catch (error) {
      alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
    }
  };

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
          <div className="mx-8 my-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">
              Chi tiết đặt bàn
            </h1>

            {status === ApiStatus.Loading ? (
              <div className="text-center text-xl">
                <Spin
                  indicator={
                    <LoadingOutlined
                      style={{ fontSize: 50, color: 'orange' }}
                      spin
                    />
                  }
                />
              </div>
            ) : (
              <div className="bg-white shadow-md rounded-lg p-8 grid grid-cols-2 gap-8 text-xl">
                <div className="space-y-6">
                  <div className="p-3 bg-white shadow-md rounded-lg">
                    <h2 className="text-2xl font-bold mb-4 border-b pb-2">
                      Mã đặt bàn: #{bookingDetail?.id}
                    </h2>

                    <div className="flex justify-between mb-4">
                      <span className="font-medium text-gray-600">
                        Người lớn:
                      </span>
                      <span className="text-black">
                        {bookingDetail?.numberOfAdult}
                      </span>
                    </div>
                    <div className="flex justify-between mb-4">
                      <span className="font-medium text-gray-600">Trẻ em:</span>
                      <span className="text-black">
                        {bookingDetail?.numberOfChildren}
                      </span>
                    </div>
                    <div className="flex justify-between mb-4">
                      <span className="font-medium text-gray-600">
                        Thời gian đặt:
                      </span>
                      <span className="text-black">
                        {bookingDetail?.bookingDate}{' '}
                        {bookingDetail?.bookingTime}
                      </span>
                    </div>

                    <div className="border-t border-gray-300 pt-4">
                      <h3 className="text-xl font-semibold mb-2">
                        Các món đã đặt:
                      </h3>
                      <ul className="space-y-2">
                        {bookingDetail?.foodBookings?.map((dish, index) => (
                          <li
                            key={index}
                            className="flex justify-between items-center"
                          >
                            <span className="font-medium text-gray-600">
                              {dish.foodName}
                            </span>
                            <span className="text-black">
                              {dish.quantity} x {dish.amount} VNĐ
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
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
                  <div className="flex justify-between border-t border-gray-300 my-4 pt-4">
                    <span className="font-medium text-gray-600">
                      Tổng giá trị:
                    </span>
                    <span className="text-black font-bold">
                      {bookingDetail?.amount} VNĐ
                    </span>
                  </div>

                  <div className="flex justify-between mb-4">
                    <span className="font-medium text-gray-600">
                      Trạng thái đơn hàng:
                    </span>
                    <span
                      className={`font-bold px-3 py-2 rounded-lg ${
                        bookingDetail?.status === 'SUCCESSFUL'
                          ? 'bg-green-100 text-green-600'
                          : bookingDetail?.status === 'CANCELLED'
                            ? 'bg-red-100 text-red-600'
                            : bookingDetail?.status === 'CONFIRMED'
                              ? 'bg-yellow-100 text-yellow-600'
                              : 'bg-sky-100 text-sky-700'
                      }`}
                    >
                      {bookingDetail?.status}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-between">
              <button
                onClick={handleBackClick}
                className="bg-amber-600 text-white text-lg font-bold py-2 px-6 rounded-full transition duration-200 hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                Quay lại
              </button>
              {bookingDetail?.status === 'PENDING' ? (
                <div>
                  <button
                    onClick={() => setIsApproveModalVisible(true)}
                    className="mr-3 bg-amber-600 text-white text-lg font-bold py-2 px-6 rounded-full transition duration-200 hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    Xác nhận
                  </button>
                  <button
                    onClick={() => setIsCancelModalVisible(true)}
                    className="mr-3 bg-red-600 text-white text-lg font-bold py-2 px-6 rounded-full transition duration-200 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Hủy Đơn
                  </button>
                </div>
              ) : bookingDetail?.status === 'CONFIRMED' ? (
                <button
                  onClick={() => setIsSuccessModalVisible(true)}
                  className="mr-3 bg-green-600 text-white text-lg font-bold py-2 px-6 rounded-full transition duration-200 hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  Hoàn Tất Đơn
                </button>
              ) : null}
            </div>

            {isApproveModalVisible && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
                <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
                  <h2 className="text-2xl font-bold mb-4 text-center">
                    Xác nhận hủy đơn
                  </h2>
                  <p className="text-lg text-center mb-6">
                    Bạn có chắc chắn muốn hủy đơn đặt bàn này?
                  </p>
                  <div className="flex justify-center mt-4 space-x-4">
                    <button
                      onClick={() => setIsApproveModalVisible(false)}
                      className="bg-gray-300 text-black py-3 px-8 rounded-full text-lg"
                    >
                      Hủy
                    </button>
                    <button
                      onClick={handleApproveBooking}
                      className="bg-sky-700 text-white py-3 px-8 rounded-full text-lg"
                    >
                      Xác nhận đơn
                    </button>
                  </div>
                </div>
              </div>
            )}

            {isSuccessModalVisible && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
                <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
                  <h2 className="text-2xl font-bold mb-4 text-center">
                    Xác nhận hủy đơn
                  </h2>
                  <p className="text-lg text-center mb-6">
                    Bạn có chắc chắn muốn hủy đơn đặt bàn này?
                  </p>
                  <div className="flex justify-center mt-4 space-x-4">
                    <button
                      onClick={() => setIsApproveModalVisible(false)}
                      className="bg-gray-300 text-black py-3 px-8 rounded-full text-lg"
                    >
                      Hủy
                    </button>
                    <button
                      onClick={handleSuccessBooking}
                      className="bg-green-600 text-white py-3 px-8 rounded-full text-lg"
                    >
                      Hoàn tất đơn
                    </button>
                  </div>
                </div>
              </div>
            )}

            {isCancelModalVisible && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
                <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
                  <h2 className="text-2xl font-bold mb-4 text-center">
                    Xác nhận hủy đơn
                  </h2>
                  <p className="text-lg text-center mb-6">
                    Bạn có chắc chắn muốn hủy đơn đặt bàn này?
                  </p>
                  <div className="flex justify-center mt-4 space-x-4">
                    <button
                      onClick={() => setIsCancelModalVisible(false)}
                      className="bg-gray-300 text-black py-3 px-8 rounded-full text-lg"
                    >
                      Hủy
                    </button>
                    <button
                      onClick={handleCancelBooking}
                      className="bg-red-600 text-white py-3 px-8 rounded-full text-lg"
                    >
                      Xác nhận hủy đơn
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
