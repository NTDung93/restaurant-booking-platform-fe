import Header from '@/components/restaurant-admin/Header';
import Menu from '@/components/restaurant-admin/Menu';
import { useState } from 'react';
import Image from '@/components/restaurant-admin/Img';

export default function ReviewManagementPage() {
  interface Review {
    id: string;
    tableNumber: number;
    customer: string;
    status: string;
    rating: number;
    date: string;
    note: string;
    guests: number; // Number of guests
    customerInfo: string; // Customer contact information
  }

  const [selectedReview, setSelectedReview] = useState<Review | null>(null); // State for selected review
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State for popup visibility
  const [reviews] = useState<Review[]>([
    {
      id: '#25',
      tableNumber: 5,
      customer: 'Khách Hàng SG1',
      status: 'Đã hoàn thành',
      rating: 5,
      date: '25/09/2024 19:00',
      note: 'Quán ngon, phục vụ tốt, sẽ quay lại!',
      guests: 4, // Number of guests
      customerInfo: 'khachhang1@example.com', // Customer contact information
    },
    {
      id: '#47',
      tableNumber: 3,
      customer: 'Khách Hàng SG2',
      status: 'Đã hoàn thành',
      rating: 4,
      date: '24/09/2024 18:30',
      note: 'Món ăn ngon, nhưng phục vụ hơi chậm.',
      guests: 2, // Number of guests
      customerInfo: 'khachhang2@example.com', // Customer contact information
    },
    {
      id: '#62',
      tableNumber: 1,
      customer: 'Khách Hàng SG3',
      status: 'Đã hoàn thành',
      rating: 5,
      date: '23/09/2024 20:00',
      note: 'Một trải nghiệm tuyệt vời, mọi thứ đều hoàn hảo!',
      guests: 3, // Number of guests
      customerInfo: 'khachhang3@example.com', // Customer contact information
    },
    {
      id: '#15',
      tableNumber: 4,
      customer: 'Khách Hàng SG4',
      status: 'Đã hoàn thành',
      rating: 3,
      date: '22/09/2024 19:15',
      note: 'Không gian đẹp nhưng món ăn hơi nhạt.',
      guests: 2, // Number of guests
      customerInfo: 'khachhang4@example.com', // Customer contact information
    },
    {
      id: '#78',
      tableNumber: 2,
      customer: 'Khách Hàng SG5',
      status: 'Đã hoàn thành',
      rating: 4,
      date: '21/09/2024 17:45',
      note: 'Quán sạch sẽ và nhân viên thân thiện.',
      guests: 5, // Number of guests
      customerInfo: 'khachhang5@example.com', // Customer contact information
    },
    {
      id: '#34',
      tableNumber: 6,
      customer: 'Khách Hàng SG6',
      status: 'Đã hoàn thành',
      rating: 5,
      date: '20/09/2024 21:00',
      note: 'Món ăn rất ngon, tôi sẽ giới thiệu cho bạn bè!',
      guests: 4, // Number of guests
      customerInfo: 'khachhang6@example.com', // Customer contact information
    },
    {
      id: '#92',
      tableNumber: 7,
      customer: 'Khách Hàng SG7',
      status: 'Đã hoàn thành',
      rating: 2,
      date: '19/09/2024 20:30',
      note: 'Thực phẩm không tươi, sẽ không quay lại.',
      guests: 3, // Number of guests
      customerInfo: 'khachhang7@example.com', // Customer contact information
    },
    {
      id: '#56',
      tableNumber: 8,
      customer: 'Khách Hàng SG8',
      status: 'Đã hoàn thành',
      rating: 5,
      date: '18/09/2024 19:00',
      note: 'Tuyệt vời! Tôi đã có một buổi tối tuyệt vời!',
      guests: 6, // Number of guests
      customerInfo: 'khachhang8@example.com', // Customer contact information
    },
    {
      id: '#83',
      tableNumber: 9,
      customer: 'Khách Hàng SG9',
      status: 'Đã hoàn thành',
      rating: 3,
      date: '17/09/2024 18:00',
      note: 'Tạm ổn, không có gì đặc biệt.',
      guests: 2, // Number of guests
      customerInfo: 'khachhang9@example.com', // Customer contact information
    },
    {
      id: '#99',
      tableNumber: 10,
      customer: 'Khách Hàng SG10',
      status: 'Đã hoàn thành',
      rating: 4,
      date: '16/09/2024 20:00',
      note: 'Đồ ăn ngon nhưng giá hơi cao.',
      guests: 4, // Number of guests
      customerInfo: 'khachhang10@example.com', // Customer contact information
    },
    {
      id: '#97',
      tableNumber: 10,
      customer: 'Khách Hàng SG11',
      status: 'Đã hoàn thành',
      rating: 4,
      date: '16/09/2024 20:00',
      note: 'Đồ ăn ngon nhưng giá hơi cao.',
      guests: 5, // Number of guests
      customerInfo: 'khachhang11@example.com', // Customer contact information
    },
  ]);

  const [searchText, setSearchText] = useState('');
  const [filter, setFilter] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;

  const filteredReviews = reviews.filter(
    (review) =>
      (!filter || review.rating === filter) &&
      (!searchText ||
        review.note.toLowerCase().includes(searchText.toLowerCase())),
  );

  const totalReviews = filteredReviews.length;
  const totalPages = Math.ceil(totalReviews / reviewsPerPage);

  const startIndex = (currentPage - 1) * reviewsPerPage;
  const currentReviews = filteredReviews.slice(
    startIndex,
    startIndex + reviewsPerPage,
  );

  const getPaginationRange = () => {
    const range = [];
    const maxPagesToShow = 5;
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }
    return range;
  };

  const paginationRange = getPaginationRange();

  const openPopup = (review: Review) => {
    setSelectedReview(review);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedReview(null);
  };

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
                Đánh giá nhà hàng
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
                    {currentReviews.map((review, index) => (
                      <tr
                        key={review.id}
                        className={`border-b hover:bg-gray-100 transition duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                      >
                        <td className="py-3 px-4 text-center">{review.id}</td>
                        <td className="py-3 px-4 text-center">{review.date}</td>
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
                        <td className="py-3 px-4 text-left">{review.note}</td>
                        <td className="py-3 px-4 text-left">
                          <span
                            className={`font-semibold ${review.status === 'Đã hoàn thành' ? 'text-green-600' : 'text-red-600'}`}
                          >
                            {review.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => openPopup(review)}
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

              {/* Popup for review details */}
              {isPopupOpen && selectedReview && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white p-10 rounded-lg shadow-lg max-w-3xl w-full">
                    {' '}
                    {/* Increased max width */}
                    <h3 className="text-3xl font-bold text-center mb-8">
                      Chi tiết đánh giá
                    </h3>{' '}
                    {/* Title size */}
                    <div className="mt-4 flex">
                      <div className="flex-1 pr-6 border-r border-gray-300">
                        {/* Left side: Review Details */}
                        <p className="mb-5 text-lg">
                          {' '}
                          {/* Font size */}
                          <strong>Mã bàn đặt:</strong>{' '}
                          {selectedReview.tableNumber}
                        </p>
                        <p className="mb-5 text-lg">
                          <strong>Số khách:</strong> {selectedReview.guests}
                        </p>
                        <p className="mb-5 text-lg">
                          <strong>Thời gian đặt:</strong> {selectedReview.date}
                        </p>
                        <p className="mb-5 text-lg">
                          <strong>Số sao đánh giá:</strong>{' '}
                          {Array.from({ length: 5 }, (_, i) => (
                            <span
                              key={i}
                              className={
                                i < selectedReview.rating
                                  ? 'text-amber-500'
                                  : 'text-gray-400'
                              }
                            >
                              ★
                            </span>
                          ))}
                        </p>
                        <p className="mb-5 text-lg">
                          <strong>Bình luận:</strong> {selectedReview.note}
                        </p>
                        <p className="mb-5 text-lg">
                          <strong>Trạng thái:</strong> {selectedReview.status}
                        </p>
                      </div>
                      <div className="flex-1 pl-6">
                        {/* Right side: Customer Info */}
                        <p className="mb-5 text-lg">
                          <strong>Khách hàng:</strong> {selectedReview.customer}
                        </p>
                        <p className="mb-5 text-lg">
                          <strong>Liên hệ:</strong>{' '}
                          {selectedReview.customerInfo}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-end mt-8">
                      <button
                        onClick={closePopup}
                        className="bg-amber-600 hover:bg-amber-700 text-white rounded-md py-2 px-6 transition-all duration-200"
                      >
                        Đóng
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Phân trang */}
              <div className="flex justify-center py-4">
                <button
                  onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                  className="bg-amber-600 hover:bg-amber-700 text-white rounded-md py-2 px-4 mx-1"
                  disabled={currentPage === 1}
                >
                  Trang trước
                </button>

                {paginationRange.map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`rounded-md py-2 px-4 mx-1 ${currentPage === page ? 'bg-amber-700 text-white' : 'bg-white text-amber-600 hover:bg-gray-100'}`}
                  >
                    {page}
                  </button>
                ))}

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
