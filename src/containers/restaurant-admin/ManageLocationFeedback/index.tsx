import Header from '@/components/restaurant-admin/Header';
import Menu from '@/components/restaurant-admin/Menu';
import { useState } from 'react';
import Image from '@/components/restaurant-admin/Img';

export default function ReviewManagementPage() {
  const [reviews] = useState([
    {
      id: '#25',
      tableNumber: 5,
      customer: 'Khách Hàng SG1',
      status: 'Đã hoàn thành',
      rating: 5,
      date: '25/09/2024 19:00',
      note: 'Quán ngon, phục vụ tốt, sẽ quay lại!',
    },
    {
      id: '#47',
      tableNumber: 3,
      customer: 'Khách Hàng SG2',
      status: 'Đã hoàn thành',
      rating: 4,
      date: '24/09/2024 18:30',
      note: 'Món ăn ngon, nhưng phục vụ hơi chậm.',
    },
    {
      id: '#62',
      tableNumber: 1,
      customer: 'Khách Hàng SG3',
      status: 'Đã hoàn thành',
      rating: 5,
      date: '23/09/2024 20:00',
      note: 'Một trải nghiệm tuyệt vời, mọi thứ đều hoàn hảo!',
    },
    {
      id: '#15',
      tableNumber: 4,
      customer: 'Khách Hàng SG4',
      status: 'Đã hoàn thành',
      rating: 3,
      date: '22/09/2024 19:15',
      note: 'Không gian đẹp nhưng món ăn hơi nhạt.',
    },
    {
      id: '#78',
      tableNumber: 2,
      customer: 'Khách Hàng SG5',
      status: 'Đã hoàn thành',
      rating: 4,
      date: '21/09/2024 17:45',
      note: 'Quán sạch sẽ và nhân viên thân thiện.',
    },
    {
      id: '#34',
      tableNumber: 6,
      customer: 'Khách Hàng SG6',
      status: 'Đã hoàn thành',
      rating: 5,
      date: '20/09/2024 21:00',
      note: 'Món ăn rất ngon, tôi sẽ giới thiệu cho bạn bè!',
    },
    {
      id: '#92',
      tableNumber: 7,
      customer: 'Khách Hàng SG7',
      status: 'Đã hoàn thành',
      rating: 2,
      date: '19/09/2024 20:30',
      note: 'Thực phẩm không tươi, sẽ không quay lại.',
    },
    {
      id: '#56',
      tableNumber: 8,
      customer: 'Khách Hàng SG8',
      status: 'Đã hoàn thành',
      rating: 5,
      date: '18/09/2024 19:00',
      note: 'Tuyệt vời! Tôi đã có một buổi tối tuyệt vời!',
    },
    {
      id: '#83',
      tableNumber: 9,
      customer: 'Khách Hàng SG9',
      status: 'Đã hoàn thành',
      rating: 3,
      date: '17/09/2024 18:00',
      note: 'Tạm ổn, không có gì đặc biệt.',
    },
    {
      id: '#99',
      tableNumber: 10,
      customer: 'Khách Hàng SG10',
      status: 'Đã hoàn thành',
      rating: 4,
      date: '16/09/2024 20:00',
      note: 'Đồ ăn ngon nhưng giá hơi cao.',
    },
    {
      id: '#97',
      tableNumber: 10,
      customer: 'Khách Hàng SG10',
      status: 'Đã hoàn thành',
      rating: 4,
      date: '16/09/2024 20:00',
      note: 'Đồ ăn ngon nhưng giá hơi cao.',
    },
  ]);

  const [searchText, setSearchText] = useState('');
  const [filter, setFilter] = useState<number | null>(null); // Xử lý bộ lọc đánh giá sao
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;

  // Lọc và tìm kiếm đánh giá
  const filteredReviews = reviews.filter(
    (review) =>
      (!filter || review.rating === filter) &&
      (!searchText ||
        review.note.toLowerCase().includes(searchText.toLowerCase())),
  );

  // Tính toán số trang
  const totalReviews = filteredReviews.length;
  const totalPages = Math.ceil(totalReviews / reviewsPerPage);

  // Tính toán các đánh giá cần hiển thị trên trang hiện tại
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const currentReviews = filteredReviews.slice(
    startIndex,
    startIndex + reviewsPerPage,
  );

  // Tính toán các trang cần hiển thị
  const getPaginationRange = () => {
    const range = [];
    const maxPagesToShow = 5; // Số trang tối đa để hiển thị
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }
    return range;
  };

  const paginationRange = getPaginationRange();

  return (
    <>
      <Header />
      <div className="mt-[100px] flex min-h-screen">
        <Menu />
        <div className="w-[85vw] flex flex-col">
          <Image />
          <div className="flex flex-col space-y-8 px-10">
            {/* Đánh giá nhà hàng tổng quan */}
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold">
                Đánh giá Nhà Hàng 4.9/5
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
                <button
                  onClick={() => setFilter(5)}
                  className="bg-amber-600 font-semibold hover:bg-amber-700 text-white text-xl rounded-md py-2 px-4 transition duration-150 mt-2 md:mt-0"
                >
                  Lọc 5 sao
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
                            <button className="bg-amber-600 font-semibold hover:bg-amber-700 text-white rounded-md py-2 px-4 transition duration-150">
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

              {/* Phân trang */}
              <div className="flex justify-center py-4">
                <button
                  onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                  className="bg-amber-600 hover:bg-amber-700 text-white rounded-md py-2 px-4 mx-1"
                  disabled={currentPage === 1}
                >
                  Prev
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
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
