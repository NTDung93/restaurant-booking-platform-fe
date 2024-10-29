import Footer from '@/components/restaurant-user/Footer';
import Header from '@/components/restaurant-user/Header';
import MenuUser from '@/components/restaurant-user/MenuUser';
import {
  createFeedback,
  getFeedbackByLocationBookingId,
  getUserBookingHitory,
} from '@/containers/restaurant-user/Auth/thunks';
import {
  selectFeedbackByLocationBookingId,
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
import { fetchFoodById } from '../Comfirm/components/FoodSelectionModal/thunks';
import { selectFoodById } from '../Comfirm/components/FoodSelectionModal/selector';

export default function UserBookingHistory() {
  const dispatch = useDispatch<ReduxDispatch>();
  const bookingHistory = useSelector(selectUserBookingHistory);
  const foodResponse = useSelector(selectFoodById);
  const locationFeedbackResponse = useSelector(
    selectFeedbackByLocationBookingId,
  );
  const userStatus = useSelector(selectUserStatus);
  const loading = userStatus === ApiStatus.Loading;
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(3);
  const [selectedBooking, setSelectedBooking] = useState<number | null>(null);
  const [locationId, setLocationId] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');
  const [selectedRating, setSelectedRating] = useState(1);
  const [feedbackImages, setFeedbackImages] = useState<string[]>(
    new Array(3).fill(''),
  );
  const [selectedStatus, setSelectedStatus] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const fetchBookingHistory = async () => {
      await dispatch(getUserBookingHitory({ currentPage, pageSize }));
    };

    fetchBookingHistory();

    const fetchFeedbackData = async () => {
      if (selectedBooking) {
        await dispatch(getFeedbackByLocationBookingId(selectedBooking));
      }
    };
    fetchFeedbackData();
  }, [dispatch, currentPage, pageSize, selectedBooking]);

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

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'jq2n2xoh');
    data.append('cloud_name', 'dpysbryyk');

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/dpysbryyk/image/upload',
      {
        method: 'POST',
        body: data,
      },
    );

    const uploadedImageUrl = await res.json();
    const newImages = [...feedbackImages];
    newImages[index] = uploadedImageUrl.url; // Update the image at the index
    setFeedbackImages(newImages);
  };

  const handleImageDelete = (index: number) => {
    const newImages = [...feedbackImages];
    newImages[index] = ''; // Clear the image at the index
    setFeedbackImages(newImages);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setLoadingFeedback(true);
    e.preventDefault();

    const imagesString = feedbackImages.filter((img) => img).join(',');

    const newFeedback = {
      id: 0,
      content: feedbackText,
      rating: selectedRating,
      image: imagesString,
      locationBookingId: selectedBooking ?? 0,
    };

    await dispatch(createFeedback(newFeedback)).unwrap();
    setLoadingFeedback(false);
    closePopup();
  };

  const handleFilter = () => {
    // const newFilteredBookings = currentBookings.filter((booking) => {
    //   const bookingDate = new Date(booking.bookingDate);
    //   const isWithinDateRange =
    //     (!startDate || bookingDate >= new Date(startDate)) &&
    //     (!endDate || bookingDate <= new Date(endDate));
    //   return (
    //     (selectedStatus ? booking.status === selectedStatus : true) &&
    //     isWithinDateRange
    //   );
    // });
    // setFilteredBookings(newFilteredBookings);
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('vi-VN').format(price);

  const getFoodById = (foodId: number) => dispatch(fetchFoodById(foodId));

  const elementHeight = 148;
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

            {/* Filter Section */}
            <div className="flex gap-4 mb-4">
              {/* Status Filter */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="border border-gray-300 rounded-md p-2"
              >
                <option value="">Tất cả trạng thái</option>
                <option value="SUCCESSFUL">Thành công</option>
                <option value="CANCELLED">Đã hủy</option>
                <option value="CONFIRMED">Đã xác nhận</option>
                <option value="PENDING">Đang chờ</option>
              </select>

              {/* Start Date Filter */}
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                max={new Date().toISOString().split('T')[0]} // Disable past dates
                className="border border-gray-300 rounded-md p-2"
              />

              {/* End Date Filter */}
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border border-gray-300 rounded-md p-2"
                max={new Date().toISOString().split('T')[0]} // Disable past dates
              />

              {/* Filter Button */}
              <button
                onClick={handleFilter}
                className="bg-amber-600 text-white px-4 py-2 rounded-md transition duration-200 hover:bg-amber-700"
              >
                Lọc
              </button>
            </div>

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
                          <div className="space-y-2">
                            <p className="font-semibold text-lg text-gray-700">
                              Mã đơn: {booking.id}
                            </p>
                            <p className="text-sm text-gray-600">
                              Ngày đặt:{' '}
                              <span className="font-bold">
                                {booking.bookingDate}
                              </span>{' '}
                              | Giờ:{' '}
                              <span className="font-bold">
                                {booking.bookingTime}
                              </span>
                            </p>
                            <p className="text-gray-800">
                              Số tiền:{' '}
                              <span className="text-red-500 font-semibold">
                                {formatPrice(booking.amount)} VNĐ
                              </span>
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
                            className="bg-[#D86500] text-white px-4 py-2 rounded-md transition duration-200 hover:bg-amber-700"
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

            <div className="flex justify-center items-center mt-6">
              <button
                className={`bg-amber-600 text-white px-4 py-2 rounded-md transition duration-200 font-semibold ${currentPage === 0 ? 'disabled:cursor-not-allowed bg-gray-500' : 'hover:bg-amber-700'}`}
                onClick={() => handlePageChange('prev')}
                disabled={currentPage === 0}
              >
                Trước
              </button>
              <span className="self-center font-medium mx-3">
                Trang {currentPage + 1} / {totalPages}
              </span>
              <button
                className={`bg-amber-600 text-white px-4 py-2 rounded-md transition duration-200 hover:bg-amber-700 font-semibold`}
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
          <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg relative max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold mb-6 border-b pb-3">
              Chi tiết đặt hàng
            </h3>
            {bookingHistory?.content.map(
              (booking) =>
                booking.id === selectedBooking && (
                  <div key={booking.id}>
                    <div className="flex flex-col space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left column with booking details */}
                        <div className="p-4 bg-white border border-gray-300 rounded shadow">
                          <h3 className="text-xl font-semibold mb-4">
                            Thông tin đặt chỗ
                          </h3>
                          <p className="mb-2">
                            <strong>Mã đơn:</strong> {booking.id}
                          </p>
                          <p className="mb-2">
                            <strong>Ngày đặt:</strong> {booking.bookingDate} |
                            Giờ: {booking.bookingTime}
                          </p>
                          <p className="mb-2">
                            <strong>Địa chỉ:</strong> {booking.address}
                          </p>
                          <p className="mb-2">
                            <strong>Điện thoại:</strong> {booking.phone}
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
                              {booking.amount} VND
                            </span>
                          </p>
                          <p className="mb-2">
                            <strong>Số người lớn:</strong>{' '}
                            {booking.numberOfAdult}
                          </p>
                          <p className="mb-2">
                            <strong>Số trẻ em:</strong>{' '}
                            {booking.numberOfChildren}
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
                        <h4 className="text-xl font-semibold mb-2">
                          Những món ăn đã đặt:
                        </h4>
                        {booking.foodBookings.length > 0 ? (
                          <ul className="list-disc ml-5 space-y-4">
                            {booking.foodBookings.map((food) => {
                              if (foodResponse === undefined) {
                                getFoodById(food.foodId);
                              }
                              return (
                                <li
                                  key={food.foodId}
                                  className="flex items-center space-x-4"
                                >
                                  <img
                                    src={foodResponse?.image.split(',')[0]}
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
                            })}
                          </ul>
                        ) : (
                          <p>Không có món nào đã đặt.</p>
                        )}
                      </div>
                      {locationFeedbackResponse &&
                      booking.status === 'SUCCESSFUL' ? (
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
                      ) : booking.status === 'SUCCESSFUL' ? (
                        <div className="mt-6 border-t pt-4">
                          <h4 className="text-xl font-semibold mb-2">
                            Phản hồi của bạn:
                          </h4>

                          {/* Rating selection */}
                          <div className="mb-4 flex items-center">
                            <span className="font-semibold mr-2">
                              Mức độ hài lòng:
                            </span>
                            <div className="flex space-x-2">
                              {[1, 2, 3, 4, 5].map((rating) => (
                                <label key={rating} className="cursor-pointer">
                                  <input
                                    type="radio"
                                    value={rating}
                                    checked={selectedRating === rating}
                                    onChange={() => setSelectedRating(rating)} // Update selected rating
                                    className="hidden"
                                  />
                                  <span
                                    className={`text-4xl ${
                                      selectedRating >= rating
                                        ? 'text-yellow-500'
                                        : 'text-gray-300'
                                    }`}
                                  >
                                    ★
                                  </span>
                                </label>
                              ))}
                            </div>
                          </div>

                          {/* Feedback textarea */}
                          <textarea
                            className="w-full border border-gray-300 p-2 mb-4 rounded-lg shadow"
                            rows={4}
                            placeholder="Nhập phản hồi của bạn..."
                            value={feedbackText} // State for managing feedback
                            onChange={(e) => setFeedbackText(e.target.value)} // Update feedback
                          />
                          <div className="flex justify-between gap-4 w-full">
                            {feedbackImages.map((image, index) => (
                              <div key={index} className="relative group w-1/3">
                                {image ? (
                                  <div className="relative w-full h-[220px]">
                                    <img
                                      src={image}
                                      alt={`Food Image ${index}`}
                                      className="w-full h-full object-cover rounded-lg shadow-md"
                                    />
                                    {/* Delete Button */}
                                    <button
                                      type="button"
                                      onClick={() => handleImageDelete(index)}
                                      className="absolute top-3 right-3 w-8 h-8 bg-white/90 hover:bg-red-500 text-gray-600 hover:text-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200"
                                    >
                                      <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M6 18L18 6M6 6l12 12"
                                        />
                                      </svg>
                                    </button>
                                  </div>
                                ) : (
                                  <label className="block cursor-pointer w-full h-[220px]">
                                    <div className="w-full h-full rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors bg-gray-50 flex flex-col items-center justify-center gap-3 group-hover:bg-gray-100">
                                      <div className="p-3 rounded-full bg-gray-100 group-hover:bg-gray-200 transition-colors">
                                        <svg
                                          className="w-6 h-6 text-gray-400"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                          />
                                        </svg>
                                      </div>
                                      <div className="text-center px-4">
                                        <span className="text-gray-500 text-sm font-medium">
                                          Upload Image
                                        </span>
                                        <p className="text-gray-400 text-xs mt-1">
                                          Click to browse
                                        </p>
                                      </div>
                                    </div>
                                    <input
                                      type="file"
                                      className="hidden"
                                      onChange={(e) =>
                                        handleFileUpload(e, index)
                                      }
                                      accept="image/*"
                                    />
                                  </label>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        ''
                      )}
                      {/* Feedback section for SUCCESSFUL status */}
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
                      {booking.status === 'SUCCESSFUL' && (
                        <button
                          disabled={loadingFeedback}
                          onClick={handleSubmit}
                          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 disabled:cursor-not-allowed"
                        >
                          {loadingFeedback ? (
                            <Spin size="small" />
                          ) : (
                            'Gửi Phản hồi'
                          )}
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
                ),
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
      )}
    </div>
  );
}
