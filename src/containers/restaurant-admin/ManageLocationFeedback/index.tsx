import Header from '@/components/restaurant-admin/Header';
import Menu from '@/components/restaurant-admin/Menu';
import { useEffect, useState } from 'react';
import Image from '@/components/restaurant-admin/Img';
import {
  selectAllFeedbackOfLocation,
  selectBookingHistoryDetail,
  selectFeedbackByLocationBookingId,
  selectUserInfo,
} from '@/containers/restaurant-user/Auth/selector';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxDispatch } from '@/libs/redux/store';
import {
  getAllFeedbackOfLocation,
  getBookingHitoryById,
  getFeedbackByLocationBookingId,
} from '@/containers/restaurant-user/Auth/thunks';
import { selectFoodById } from '@/containers/restaurant-user/Comfirm/components/FoodSelectionModal/selector';
import { fetchFoodById } from '@/containers/restaurant-user/Comfirm/components/FoodSelectionModal/thunks';

export default function ReviewManagementPage() {
  const dispatch = useDispatch<ReduxDispatch>();
  const feedbackByLocation = useSelector(selectAllFeedbackOfLocation);
  const bookingHistoryDetail = useSelector(selectBookingHistoryDetail);
  const foodResponse = useSelector(selectFoodById);
  const userInfo = useSelector(selectUserInfo);
  const locationFeedbackResponse = useSelector(
    selectFeedbackByLocationBookingId,
  );

  const [searchText, setSearchText] = useState('');
  const [filter, setFilter] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;
  const [selectedBooking, setSelectedBooking] = useState<number | null>(null);

  useEffect(() => {
    if (userInfo) {
      dispatch(
        getAllFeedbackOfLocation({
          locationId: userInfo?.locationId ?? 0,
          currentPage: currentPage - 1,
          pageSize: 5,
        }),
      );
    }
  }, [dispatch, currentPage]);

  const filteredReviews = feedbackByLocation?.content.filter(
    (review) =>
      (!filter || review.rating === filter) &&
      (!searchText ||
        review.content.toLowerCase().includes(searchText.toLowerCase())),
  );

  const totalReviews = filteredReviews?.length ?? 0;
  const totalPages = Math.ceil(totalReviews / reviewsPerPage);

  const startIndex = (currentPage - 1) * reviewsPerPage;
  const currentReviews = filteredReviews?.slice(
    startIndex,
    startIndex + reviewsPerPage,
  );

  const closePopup = () => {
    setSelectedBooking(null);
  };

  const openPopup = (bookingId: number) => {
    dispatch(getFeedbackByLocationBookingId(bookingId));
    dispatch(getBookingHitoryById(bookingId));
    setSelectedBooking(bookingId);
  };

  const getFoodById = (foodId: number) => dispatch(fetchFoodById(foodId));

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('vi-VN').format(price);

  return (
    <>
      <Header />
      <div className="mt-[100px] flex min-h-screen">
        {/* Fixed Menu */}
        <div className="fixed top-[100px] left-0 w-[15vw]">
          <Menu />
        </div>

        {/* Main Content */}
        <div className="ml-[15vw] w-[85vw] flex flex-col overflow-y-auto">
          <Image />

          <div className="p-8 bg-background text-foreground space-y-10 mx-5">
            {/* Đánh giá nhà hàng tổng quan */}
            <div className="space-y-4">
              <h2 className="text-2xl lg:text-3xl font-bold text-amber-600">
                Đánh giá Nhà Hàng
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 shadow-md rounded-lg">
                  <h3 className="text-lg font-semibold">Tổng lượt đánh giá</h3>
                  <p className="text-3xl lg:text-4xl font-bold">453</p>
                  <p className="text-sm text-gray-500">
                    So với 30 ngày trước: -5%
                  </p>
                </div>
                <div className="bg-white p-6 shadow-md rounded-lg">
                  <h3 className="text-lg font-semibold">
                    Tỷ lệ đánh giá 5 sao
                  </h3>
                  <p className="text-3xl lg:text-4xl font-bold">87%</p>
                  <p className="text-sm text-gray-500">
                    So với 30 ngày trước: +3%
                  </p>
                </div>
                <div className="bg-white p-6 shadow-md rounded-lg">
                  <h3 className="text-lg font-semibold">
                    Tỷ lệ đánh giá 4 sao
                  </h3>
                  <p className="text-3xl lg:text-4xl font-bold">80%</p>
                  <p className="text-sm text-gray-500">
                    So với 30 ngày trước: +2%
                  </p>
                </div>
              </div>
            </div>

            {/* Danh sách đánh giá */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Danh sách đánh giá</h2>
              <div className="flex flex-col md:flex-row md:space-x-4">
                <input
                  placeholder="Tìm kiếm"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="flex-grow py-2 px-4 text-xl border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                />
                <button
                  onClick={() => setFilter(null)}
                  className="bg-amber-600 font-semibold hover:bg-amber-700 text-white text-xl py-2 px-4 rounded-md transition duration-150 mt-2 md:mt-0"
                >
                  Xác nhận
                </button>
              </div>

              <div className="overflow-x-auto border border-gray-300 rounded-lg shadow-md">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="text-center py-3 px-4 text-gray-600 font-semibold">
                        Mã bàn đặt
                      </th>
                      <th className="text-center py-3 px-4 text-gray-600 font-semibold">
                        Thời gian đặt
                      </th>
                      <th className="text-center py-3 px-4 text-gray-600 font-semibold">
                        Số sao đánh giá
                      </th>
                      <th className="text-left py-3 px-4 text-gray-600 font-semibold">
                        Bình luận của khách hàng
                      </th>
                      <th className="text-left py-3 px-4 text-gray-600 font-semibold">
                        Trạng thái
                      </th>
                      <th className="text-center py-3 px-4 text-gray-600 font-semibold"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentReviews?.map((review, index) => (
                      <tr
                        key={review.id}
                        className={`border-b hover:bg-gray-100 transition duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                      >
                        <td className="py-3 px-4 text-center font-semibold">
                          #{review.locationBookingId}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {review.feedbackDate}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex justify-center items-center">
                            {Array.from({ length: 5 }, (_, i) => (
                              <span
                                key={i}
                                className={
                                  i < review.rating
                                    ? 'text-amber-500'
                                    : 'text-gray-400'
                                }
                              >
                                ★
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-left">
                          {review.content}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex space-x-2">
                            <button
                              onClick={() =>
                                openPopup(review.locationBookingId)
                              }
                              className="bg-amber-600 font-semibold hover:bg-amber-700 text-white rounded-md py-2 px-4 transition duration-150"
                            >
                              Xem
                            </button>
                            <button className="bg-amber-600 font-semibold hover:bg-amber-700 text-white rounded-md py-2 px-4 transition duration-150">
                              Báo cáo
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {selectedBooking && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                  <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg relative max-h-[90vh] overflow-y-auto">
                    <h3 className="text-2xl font-bold mb-6 border-b pb-3">
                      Chi tiết đặt hàng
                    </h3>
                    {bookingHistoryDetail && (
                      <div key={bookingHistoryDetail.id}>
                        <div className="flex flex-col space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Left column with booking details */}
                            <div className="p-4 bg-white border border-gray-300 rounded shadow">
                              <h3 className="text-xl font-semibold mb-4">
                                Thông tin đặt chỗ
                              </h3>
                              <p className="mb-2">
                                <strong>Mã đơn:</strong>{' '}
                                {bookingHistoryDetail.id}
                              </p>
                              <p className="mb-2">
                                <strong>Ngày đặt:</strong>{' '}
                                {bookingHistoryDetail.bookingDate} | Giờ:{' '}
                                {bookingHistoryDetail.bookingTime}
                              </p>
                              <p className="mb-2">
                                <strong>Địa chỉ:</strong>{' '}
                                {bookingHistoryDetail.address}
                              </p>
                              <p className="mb-2">
                                <strong>Điện thoại:</strong>{' '}
                                {bookingHistoryDetail.phone}
                              </p>
                            </div>

                            {/* Right column with payment and guest details */}
                            <div className="p-4 bg-white border border-gray-300 rounded shadow">
                              <h3 className="text-xl font-semibold mb-4">
                                Chi tiết thanh toán
                              </h3>
                              <p className="mb-2">
                                <strong>Số tiền:</strong>
                                <span className="text-black font-bold">
                                  {' '}
                                  {bookingHistoryDetail.amount} VND
                                </span>
                              </p>
                              <p className="mb-2">
                                <strong>Số người lớn:</strong>{' '}
                                {bookingHistoryDetail.numberOfAdult}
                              </p>
                              <p className="mb-2">
                                <strong>Số trẻ em:</strong>{' '}
                                {bookingHistoryDetail.numberOfChildren}
                              </p>
                              <p
                                className={`mb-2 font-semibold ${
                                  bookingHistoryDetail.status === 'PENDING'
                                    ? 'text-sky-700'
                                    : bookingHistoryDetail.status ===
                                        'SUCCESSFUL'
                                      ? 'text-green-600'
                                      : bookingHistoryDetail.status ===
                                          'CONFIRMED'
                                        ? 'text-yellow-600'
                                        : 'text-red-600'
                                }`}
                              >
                                <strong>Trạng thái:</strong>{' '}
                                {bookingHistoryDetail.status}
                              </p>
                            </div>
                          </div>

                          {/* Food bookings section */}
                          <div className="mt-6 border-t pt-4">
                            <h4 className="text-xl font-semibold mb-2">
                              Những món ăn đã đặt:
                            </h4>
                            {bookingHistoryDetail.foodBookings.length > 0 ? (
                              <ul className="list-disc ml-5 space-y-4">
                                {bookingHistoryDetail.foodBookings.map(
                                  (food) => {
                                    if (foodResponse === undefined) {
                                      getFoodById(food.foodId);
                                    }
                                    return (
                                      <li
                                        key={food.foodId}
                                        className="flex items-center space-x-4"
                                      >
                                        <img
                                          src={
                                            foodResponse?.image.split(',')[0]
                                          }
                                          alt={food.foodName}
                                          className="w-16 h-16 rounded object-cover"
                                        />
                                        <div>
                                          <span className="font-medium">
                                            {food.foodName}
                                          </span>{' '}
                                          - {food.quantity} món -{' '}
                                          <span className="text-black font-bold">
                                            {formatPrice(food.amount)} VNĐ
                                          </span>
                                        </div>
                                      </li>
                                    );
                                  },
                                )}
                              </ul>
                            ) : (
                              <p>Không có món nào đã đặt.</p>
                            )}
                          </div>
                          {locationFeedbackResponse && (
                            // Display existing feedback in read-only mode
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="font-semibold">
                                  Mức độ hài lòng:
                                </span>
                                <div className="flex space-x-1">
                                  {[1, 2, 3, 4, 5].map((rating) => (
                                    <span
                                      key={rating}
                                      className={`text-4xl ${
                                        locationFeedbackResponse?.rating ??
                                        0 >= rating
                                          ? 'text-yellow-500'
                                          : 'text-gray-300'
                                      }`}
                                    >
                                      ★
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <p className="mt-2 p-4 bg-gray-100 border border-gray-300 rounded-lg">
                                {locationFeedbackResponse?.content}
                              </p>

                              <div className="flex flex-wrap gap-4 mt-4">
                                {locationFeedbackResponse?.image
                                  .split(',')
                                  .map((image, index) => (
                                    <img
                                      key={index}
                                      src={image}
                                      alt={`Feedback Image ${index}`}
                                      className="w-32 h-32 rounded-lg object-cover shadow-md"
                                    />
                                  ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    {/* Action buttons for PENDING status */}
                    <div className="mt-6 flex justify-end space-x-4">
                      <button
                        className="bg-[#D86500] text-white font-bold py-2 px-4 rounded hover:bg-[#e29140]"
                        onClick={closePopup}
                      >
                        Đóng
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {/* Phân trang */}
              <div className="flex justify-center items-center">
                <button
                  onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                  className="bg-amber-600 hover:bg-amber-700 text-white rounded-md py-2 px-4 mx-1"
                  disabled={currentPage === 1}
                >
                  Trang trước
                </button>

                <span className="mx-3">
                  Trang {currentPage} / {totalPages}
                </span>

                <button
                  onClick={() =>
                    setCurrentPage(Math.min(currentPage + 1, totalPages))
                  }
                  className="bg-amber-600 hover:bg-amber-700 text-white rounded-md py-2 px-4 mx-1"
                  disabled={currentPage === totalPages}
                >
                  Trang kế
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
