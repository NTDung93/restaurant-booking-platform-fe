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

export default function UserBookingHistory() {
  const dispatch = useDispatch<ReduxDispatch>();
  const bookingHistory = useSelector(selectUserBookingHistory);
  const userStatus = useSelector(selectUserStatus);
  const loading = userStatus === ApiStatus.Loading;

  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(3);

  useEffect(() => {
    const fetchBookingHistory = async () => {
      await dispatch(getUserBookingHitory({ currentPage, pageSize }));
    };

    fetchBookingHistory();
  }, [dispatch, currentPage, pageSize]);

  const totalElements = bookingHistory?.totalElements ?? 0;
  const totalPages = Math.ceil(totalElements / pageSize);

  const currentBookings = bookingHistory?.content || [];

  const [selectedBooking, setSelectedBooking] = useState<number | null>(null);

  const closePopup = () => {
    setSelectedBooking(null);
  };

  const openPopup = (bookingId: number) => {
    setSelectedBooking(bookingId);
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

  const elementHeight = 130;
  const margin = 10;

  const fixedHeight = elementHeight * pageSize + margin * (pageSize - 1);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="flex-grow p-6 flex justify-center items-start">
        <div className="bg-white w-full max-w-6xl p-8 shadow-lg rounded-lg grid grid-cols-1 lg:grid-cols-2 gap-8">
          <MenuUser />

          <div
            className={`h-[${fixedHeight}px] bg-gray-50 p-6 rounded-lg shadow-inner w-full`}
          >
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
                    <div className="space-y-4">
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
                              className={`text-sm font-semibold ${
                                booking?.status === 'PENDING'
                                  ? 'text-yellow-500'
                                  : 'text-red-500'
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
          <div className="bg-white w-full max-w-2xl p-8 rounded-lg shadow-lg relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={closePopup}
            >
              X đóng
            </button>
            {bookingHistory?.content
              .filter((booking) => booking.id === selectedBooking)
              .map((booking) => (
                <div key={booking.id}>
                  <h3 className="text-xl font-bold mb-4">Chi tiết đặt hàng</h3>
                  <div className="flex">
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
                    <div className="ml-5">
                      <p className="mb-2">
                        <span>
                          <strong>Số tiền: </strong>
                        </span>
                        <span className="font-bold">{booking.amount} VND</span>
                      </p>
                      <p className="mb-2">
                        <strong>Số người lớn:</strong> {booking.numberOfAdult}
                      </p>
                      <p className="mb-2">
                        <strong>Số trẻ em:</strong> {booking.numberOfChildren}
                      </p>
                      <p
                        className={`mb-2 ${
                          booking.status === 'PENDING'
                            ? 'text-yellow-500'
                            : 'text-red-500'
                        }`}
                      >
                        <strong>Trạng thái:</strong> {booking.status}
                      </p>
                    </div>
                  </div>

                  <p className="mb-2 mt-3">
                    <strong>Những món ăn đã đặt:</strong>
                    {booking.foodBookings.length > 0 ? (
                      <ul className="list-disc ml-5">
                        {booking.foodBookings.map((food) => (
                          <li key={food.foodId}>
                            {food.foodName} - {food.quantity} món -{' '}
                            {food.amount} VND
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>Không có món nào đã đặt.</p>
                    )}
                  </p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
