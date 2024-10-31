import Menu from '@/components/restaurant-admin/Menu';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Image from '@/components/restaurant-admin/Img';
import { RESTAURANT_ADMIN_MANAGE_ADVERTISEMENT_ROUTE } from '@/common/constants/routerConstant';
import Header from '@/components/restaurant-admin/Header';

const PAGE_SIZE = 5;

const ManageAdvertisingAnalysis: React.FC = () => {
  // Dữ liệu mẫu cho chiến dịch quảng cáo
  const sampleData = Array.from({ length: 50 }, (_, index) => {
    const campaignNames = [
      'Mùa Hè Rực Rỡ',
      'Giảm Giá Đặc Biệt Cuối Tuần',
      'Lễ Hội Món Ăn',
      'Ngày Hội Ăn Uống',
      'Đón Giáng Sinh',
      'Flash Sale Đêm Hè',
      'Siêu Ưu Đãi Tháng 10',
      'Khai Trương Nhà Hàng',
      'Black Friday',
      'Tết Nguyên Đán Khuyến Mãi',
      'Ưu Đãi Đặc Biệt Mùa Thu',
      'Chào Xuân Tưng Bừng',
    ];

    const promoTypes = [
      'Giảm giá',
      'Quà tặng',
      'Combo',
      'Tích điểm',
      'Voucher',
    ];
    const month = (index % 12) + 1;
    const randomDay = Math.floor(Math.random() * 28) + 1;
    const salesAmount = (Math.floor(Math.random() * 100) + 1) * 100000;
    const ordersCount = Math.floor(Math.random() * 50) + 1;

    return {
      name: campaignNames[index % campaignNames.length],
      type: promoTypes[index % promoTypes.length],
      time: `${randomDay < 10 ? '0' : ''}${randomDay}/${month}/2024 23:00`,
      sales: `${salesAmount.toLocaleString('vi-VN')}`,
      orders: ordersCount,
    };
  });

  // State
  const [data] = useState(sampleData);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Lọc dữ liệu theo từ khóa tìm kiếm
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Tính toán dữ liệu trang hiện tại
  const paginatedData = filteredData.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  // Số lượng trang
  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);

  return (
    <>
      <Header />
      <div className="mt-[100px] flex min-h-screen">
        <div className="fixed top-[100px] left-0 w-[15vw]">
          <Menu />
        </div>

        <div className="ml-[15vw] w-[85vw] flex flex-col overflow-y-auto">
          <Image />
          <div className="p-8 bg-background text-foreground space-y-10 mx-5">
            <h1 className="text-3xl text-amber-600 font-bold text-left mb-6">
              Tiếp thị và Quảng cáo
            </h1>

            <div>
              <div className="mb-6">
                <div className="flex space-x-10 text-lg text-gray-700">
                  <Link to={RESTAURANT_ADMIN_MANAGE_ADVERTISEMENT_ROUTE}>
                    <button className={`font-semibold border-b-2 pb-2`}>
                      Chiến dịch quảng cáo
                    </button>
                  </Link>
                  <button
                    className={`font-semibold border-b-2 border-amber-600 text-amber-600 pb-2`}
                  >
                    Phân tích
                  </button>
                </div>
              </div>
            </div>

            <h1 className="text-2xl text-black font-bold text-left mb-6">
              Tổng quan
            </h1>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="text-lg text-muted">Doanh số</div>
                <div className="text-4xl font-bold text-amber-600">
                  5.000.000
                </div>
                <div className="text-base text-muted text-gray-400">
                  so với hôm qua{' '}
                  <span className="text-red-500 font-semibold">-5%</span>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="text-lg text-muted">Đơn đặt bàn</div>
                <div className="text-4xl font-bold text-amber-600">14</div>
                <div className="text-base text-muted text-gray-400">
                  so với hôm qua{' '}
                  <span className="text-red-500 font-semibold">-5%</span>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="text-lg text-muted">Số khách</div>
                <div className="text-4xl font-bold text-amber-600">54</div>
                <div className="text-base text-muted text-gray-400">
                  so với hôm qua{' '}
                  <span className="text-green-500 font-semibold">+10%</span>
                </div>
              </div>
            </div>

            <div className="mt-10 border-b-2 border-gray-300"></div>

            <h1 className="text-2xl text-black font-bold text-left mb-6">
              Danh sách hiệu suất
            </h1>

            {/* Thanh tìm kiếm và các nút điều hướng */}
            <div className="flex items-center space-x-2 mt-3 mb-8">
              <select className="border border-border rounded-lg p-2 outline-none">
                <option>Tên chiến dịch</option>
                <option>Chiến dịch 1</option>
                <option>Chiến dịch 2</option>
              </select>

              <input
                type="text"
                placeholder="Tìm kiếm chiến dịch..."
                className="border-2 rounded-lg p-2 flex-grow outline-none pl-5"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <button
                className="px-6 py-2 text-amber-600 font-semibold rounded-lg transition duration-300 border-amber-600 border-2 hover:bg-amber-600 hover:text-white"
                onClick={() => setSearchTerm('')}
              >
                Đặt lại
              </button>
            </div>

            {/* Bảng dữ liệu với dữ liệu phân trang */}
            <table className="mt-4 w-full border-collapse shadow-md rounded-lg overflow-hidden">
              <thead className="bg-card text-card-foreground">
                <tr>
                  <th className="border border-border p-2 text-left text-lg">
                    Tên chiến dịch
                  </th>
                  <th className="border border-border p-2 text-center text-lg">
                    Loại khuyến mãi
                  </th>
                  <th className="border border-border p-2 text-center text-lg">
                    Thời gian
                  </th>
                  <th className="border border-border p-2 text-center text-lg">
                    Doanh số(VNĐ)
                  </th>
                  <th className="border border-border p-2 text-center text-lg">
                    Đơn đặt bàn
                  </th>
                  <th className="border border-border p-2 text-lg text-center">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item, index) => (
                  <tr
                    key={index}
                    className="border border-border hover:bg-gray-100 transition duration-200"
                  >
                    <td className="border border-border p-2 text-base">
                      {item.name}
                    </td>
                    <td className="border border-border p-2 text-center">
                      {item.type}
                    </td>
                    <td className="border border-border p-2 text-center">
                      {item.time}
                    </td>
                    <td className="border border-border p-2 text-center font-semibold text-amber-600">
                      {item.sales}
                    </td>
                    <td className="border border-border p-2 text-center">
                      {item.orders}
                    </td>
                    <td className="border border-border p-2 text-center">
                      <button className="bg-amber-600 text-white font-semibold hover:bg-white hover:border-2 hover:border-amber-600 hover:text-amber-600 px-4 py-2 rounded-lg">
                        Chỉnh sửa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Điều hướng trang */}
            <div className="flex justify-center items-center mt-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-amber-600 rounded-md text-white font-semibold"
              >
                Trang trước
              </button>
              <div className="mx-5">
                Trang {currentPage} / {totalPages}
              </div>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-amber-600 rounded-md text-white font-semibold"
              >
                Trang sau
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageAdvertisingAnalysis;
