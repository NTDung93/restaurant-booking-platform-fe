import Footer from '@/components/restaurant-user/Footer';
import Header from '@/components/restaurant-user/Header';
import MenuUser from '@/components/restaurant-user/MenuUser';
import { getUserBookingHitory } from '@/containers/restaurant-user/Auth/thunks';
import {
  selectUserBookingHistory,
  selectUserStatus,
} from '@/containers/restaurant-user/Auth/selector';
import { ReduxDispatch } from '@/libs/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { ApiStatus } from '@/common/enums/apiStatus';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { cancelBookingByLocation } from '@/containers/restaurant-admin/ManageBookingTableAll/thunks';

export default function UserBookingHistory() {
  const dispatch = useDispatch<ReduxDispatch>();
  const bookingHistory = useSelector(selectUserBookingHistory);
  const userStatus = useSelector(selectUserStatus);
  const loading = userStatus === ApiStatus.Loading;
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(3);
  const [selectedBooking, setSelectedBooking] = useState<number | null>(null);
  const [locationId, setLocationId] = useState(0);

  useEffect(() => {
    const fetchBookingHistory = async () => {
      await dispatch(getUserBookingHitory({ currentPage, pageSize }));
    };

    fetchBookingHistory();
  }, [dispatch, currentPage, pageSize]);

  const totalElements = bookingHistory?.totalElements ?? 0;
  const totalPages = Math.ceil(totalElements / pageSize);

  const currentBookings = bookingHistory?.content || [];

  const closePopup = () => {
    setSelectedBooking(null);
  };

  const openPopup = (bookingId: number) => {
    setSelectedBooking(bookingId);
    setLocationId(bookingId);
  };

  const handlePageChange = (direction: 'next' | 'prev') => {
    if (direction === 'next' && currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
      dispatch({ type: 'SET_STATUS', payload: ApiStatus.Loading });
    } else if (direction === 'prev' && currentPage > 0) {
      setCurrentPage(currentPage - 1);
      dispatch({ type: 'SET_STATUS', payload: ApiStatus.Loading });
    }
  };

  const handleCancelBooking = async () => {
    try {
      setIsCancelModalVisible(false);
      setSelectedBooking(null);
      await dispatch(
        cancelBookingByLocation({ locationId: locationId }),
      ).unwrap();
      await dispatch(getUserBookingHitory({ currentPage, pageSize }));
    } catch (error) {
      console.error('Failed to cancel order:', error);
      alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
    }
  };

  const elementHeight = 125;
  const margin = 10;

  const fixedHeight = elementHeight * pageSize + margin * (pageSize - 1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="flex-grow p-6 flex justify-center items-start">
        <div className="bg-white w-full max-w-6xl p-8 shadow-lg rounded-lg grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="col-span-4">
            <MenuUser />
          </div>
          <div className="col-span-8 bg-gray-50 p-6 rounded-lg shadow-inner">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Lịch sử đơn đặt hàng
            </h2>
            <div
              className={`overflow-hidden rounded-md border border-gray-300 bg-white shadow-sm`}
              style={{ height: `${fixedHeight}px` }}
            >
              {loading ? (
                <div className={`flex justify-center items-center h-full`}>
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
                <>
                  {currentBookings.length === 0 ? (
                    <p className="text-center text-lg text-gray-500">
                      Bạn chưa có đơn đặt hàng nào.
                    </p>
                  ) : (
                    <div>
                      {currentBookings.map((booking) => (
                        <div
                          key={booking.id}
                          className="border-b border-gray-200 last:border-b-0 p-4 flex justify-between items-center"
                        >
                          <div>
                            <p className="font-semibold text-lg text-gray-700">
                              Mã đơn: {booking.id}
                            </p>
                            <p className="text-sm text-gray-600">
                              Ngày đặt: {booking.bookingDate} | Giờ:{' '}
                              {booking.bookingTime}
                            </p>
                            <p className="text-gray-800">
                              Số tiền: {booking.amount} VND
                            </p>
                            <p
                              className={`font-bold rounded-lg ${
                                booking?.status === 'SUCCESSFUL'
                                  ? 'text-green-600'
                                  : booking?.status === 'CANCELLED'
                                    ? 'text-red-600'
                                    : booking?.status === 'CONFIRMED'
                                      ? 'text-yellow-600'
                                      : 'text-sky-700'
                              }`}
                            >
                              Trạng thái: {booking.status}
                            </p>
                          </div>
                          <button
                            className="bg-[#D86500] text-white px-4 py-2 rounded-md transition duration-200 hover:bg-[#e29140]"
                            onClick={() => openPopup(booking.id)}
                          >
                            Chi tiết
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="flex justify-between items-center mt-6">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md transition duration-200 hover:bg-gray-400"
                onClick={() => handlePageChange('prev')}
                disabled={currentPage === 0}
              >
                Trước
              </button>
              <span className="self-center font-medium">
                Trang {currentPage + 1} / {totalPages}
              </span>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md transition duration-200 hover:bg-gray-400"
                onClick={() => handlePageChange('next')}
                disabled={currentPage >= totalPages - 1}
              >
                Tiếp theo
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 font-bold"
              onClick={closePopup}
            >
              X đóng
            </button>
            {bookingHistory?.content
              .filter((booking) => booking.id === selectedBooking)
              .map((booking) => (
                <div key={booking.id}>
                  <h3 className="text-2xl font-bold mb-6 border-b pb-3">
                    Chi tiết đặt hàng
                  </h3>

                  <div className="grid grid-cols-2 gap-6">
                    {/* Left column with booking details */}
                    <div>
                      <p className="mb-2">
                        <strong>Mã đơn:</strong> {booking.id}
                      </p>
                      <p className="mb-2">
                        <strong>Ngày đặt:</strong> {booking.bookingDate} | Giờ:{' '}
                        {booking.bookingTime}
                      </p>
                      <p className="mb-2">
                        <strong>Địa chỉ:</strong> {booking.address}
                      </p>
                      <p className="mb-2">
                        <strong>Điện thoại:</strong> {booking.phone}
                      </p>
                    </div>

                    {/* Right column with payment and guest details */}
                    <div>
                      <p className="mb-2">
                        <strong>Số tiền:</strong>
                        <span className="text-black font-bold">
                          {' '}
                          {booking.amount} VND
                        </span>
                      </p>
                      <p className="mb-2">
                        <strong>Số người lớn:</strong> {booking.numberOfAdult}
                      </p>
                      <p className="mb-2">
                        <strong>Số trẻ em:</strong> {booking.numberOfChildren}
                      </p>
                      <p
                        className={`mb-2 font-semibold ${
                          booking.status === 'PENDING'
                            ? 'text-sky-700'
                            : booking.status === 'SUCCESSFUL'
                              ? 'text-green-600'
                              : booking.status === 'CONFIRMED'
                                ? 'text-yellow-600'
                                : 'text-red-600'
                        }`}
                      >
                        <strong>Trạng thái:</strong> {booking.status}
                      </p>
                    </div>
                  </div>

                  {/* Food bookings section */}
                  <div className="mt-6 border-t pt-4">
                    <h4 className="text-lg font-semibold mb-2">
                      Những món ăn đã đặt:
                    </h4>
                    {booking.foodBookings.length > 0 ? (
                      <ul className="list-disc ml-5 space-y-2">
                        {booking.foodBookings.map((food) => (
                          <li key={food.foodId}>
                            <span className="font-medium">{food.foodName}</span>{' '}
                            - {food.quantity} món -{' '}
                            <span className="text-black font-bold">
                              {food.amount} VND
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>Không có món nào đã đặt.</p>
                    )}
                  </div>

                  {/* Action buttons for PENDING status */}

                  <div className="mt-6 flex justify-end space-x-4">
                    {booking.status === 'PENDING' && (
                      <button
                        onClick={() => setIsCancelModalVisible(true)}
                        className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600"
                      >
                        Hủy Đơn
                      </button>
                    )}
                    <button
                      className="bg-[#D86500] text-white font-bold py-2 px-4 rounded hover:bg-[#e29140]"
                      onClick={closePopup}
                    >
                      Đóng
                    </button>
                  </div>
                </div>
              ))}
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
      )}
    </div>
  );
}
