import Header from '@/components/restaurant-admin/Header';
import Menu from '@/components/restaurant-admin/Menu';
import { useState } from 'react';
import Image from '@/components/restaurant-admin/Img';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '@/containers/restaurant-user/Auth/selector';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const FeeManagementPage = () => {
  const userInfo = useSelector(selectUserInfo);

  // State variables for filters
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  // Example fees data
  const feesData = [
    {
      id: 1,
      month: 1,
      year: 2024,
      commission: 500000,
      fixedFee: 300000,
      paymentStatus: 'Đã thanh toán',
      paymentDeadline: '31/01/2024',
      payerName: 'Nguyễn Văn A',
      payerPhone: '0123456789',
      payerEmail: 'nguyenvana@example.com',
    },
    {
      id: 2,
      month: 2,
      year: 2024,
      commission: 700000,
      fixedFee: 300000,
      paymentStatus: 'Chưa thanh toán',
      paymentDeadline: '28/02/2024',
      payerName: 'Trần Thị B',
      payerPhone: '0987654321',
      payerEmail: 'tranthib@example.com',
    },
    {
      id: 3,
      month: 3,
      year: 2024,
      commission: 600000,
      fixedFee: 300000,
      paymentStatus: 'Đã thanh toán',
      paymentDeadline: '31/03/2024',
      payerName: 'Lê Văn C',
      payerPhone: '0912345678',
      payerEmail: 'levanc@example.com',
    },
    // Add more data as needed
  ];

  // Filter the fees based on selected month and year
  const filteredFees = feesData.filter(
    (fee) => fee.month === selectedMonth && fee.year === selectedYear,
  );

  // Calculate total fee and payment status
  const totalCommission =
    filteredFees.length > 0 ? filteredFees[0].commission : 0;
  const totalAmount = totalCommission + 300000; // Cộng phí cố định 300k
  const paymentStatus =
    filteredFees.length > 0 ? filteredFees[0].paymentStatus : 'Chưa có dữ liệu';
  const paymentDeadline =
    filteredFees.length > 0
      ? filteredFees[0].paymentDeadline
      : 'Chưa có dữ liệu';

  const paymentStatusColor =
    paymentStatus === 'Chưa thanh toán'
      ? 'bg-red-100 text-red-600 px-3 py-2 rounded-lg'
      : paymentStatus === 'Đã thanh toán'
        ? 'bg-green-100 text-green-600 px-3 py-2 rounded-lg'
        : 'bg-gray-100 text-gray-600 px-3 py-2 rounded-lg';

  // Prepare data for the chart, showing all months but only displaying data for months with fees
  const chartData = Array.from({ length: 12 }, (_, index) => {
    const monthIndex = index + 1; // Month index (1-12)
    const feeForMonth = feesData.find((fee) => fee.month === monthIndex);
    return {
      month: `Tháng ${monthIndex}`,
      commission: feeForMonth ? feeForMonth.commission : 0,
      fixedFee: feeForMonth ? feeForMonth.fixedFee : 0,
    };
  });

  return (
    <>
      <Header />
      <div className="mt-[100px] flex min-h-screen">
        <Menu />
        <div className="w-[85vw] flex flex-col">
          <Image />
          <div className="px-5">
            {/* Fee Comparison Chart */}
            <h2 className="text-3xl font-bold my-6">
              So Sánh Chi Phí Các Tháng
            </h2>
            <div className="bg-white rounded-lg shadow-md p-4 mb-10">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="fixedFee"
                    fill="#ffcc00"
                    name="Khoảng Phí Cố Định"
                  />
                  <Bar
                    dataKey="commission"
                    fill="#ff9900"
                    name="Khoảng Phí Hoa Hồng"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="flex justify-between mb-6">
              <h1 className="text-3xl font-bold text-left text-black mb-2">
                Quản lý Khoảng Phí
              </h1>
              <div className="flex space-x-4">
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(Number(e.target.value))}
                  className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-amber-600"
                >
                  {Array.from({ length: currentMonth }, (_, i) => (
                    <option key={i} value={i + 1}>
                      Tháng {i + 1}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-amber-600"
                >
                  <option value={currentYear}>Năm {currentYear}</option>
                  <option value={currentYear - 1}>Năm {currentYear - 1}</option>
                </select>
              </div>
            </div>

            <div className="flex justify-between bg-white rounded-lg shadow-md p-6 mb-10">
              {/* Left side: Fee information */}
              <div className="flex flex-col w-1/2 pr-4">
                <h2 className="text-2xl font-semibold text-amber-600 mb-4">
                  Khoảng Phí
                </h2>
                <div className="flex justify-between border-b-2 pb-2 mb-4">
                  <span className="font-semibold text-lg">
                    Khoảng Phí Cố Định Hàng Tháng:
                  </span>
                  <span className="text-amber-600 font-semibold text-lg">
                    300,000 VNĐ
                  </span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="font-semibold text-lg">
                    Khoảng Phí Hoa Hồng:
                  </span>
                  <span className="text-amber-600 font-semibold text-lg">
                    {totalCommission.toLocaleString()} VNĐ
                  </span>
                </div>
                <div className="mt-10">
                  <div className="flex justify-between mb-4">
                    <span className="font-semibold text-xl">Tổng Tiền:</span>
                    <span className="text-amber-600 text-xl font-bold">
                      {totalAmount.toLocaleString()} VNĐ
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">
                      Trạng Thái Thanh Toán:
                    </span>
                    <span className={`${paymentStatusColor} text-xl font-bold`}>
                      {paymentStatus}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right side: Payer information */}
              <div className="flex flex-col w-1/2 pl-4 border-l">
                <h2 className="text-2xl font-bold text-amber-600 mb-4">
                  Thông Tin Người Thanh Toán
                </h2>
                <div className="flex justify-between mb-3">
                  <span className="font-semibold text-lg">Tên:</span>
                  <span className="text-lg font-semibold">
                    {userInfo?.fullName}
                  </span>
                </div>
                <div className="flex justify-between mb-3">
                  <span className="font-semibold text-lg">Số Điện Thoại:</span>
                  <span className="text-lg font-semibold">
                    {userInfo?.phone}
                  </span>
                </div>
                <div className="flex justify-between mb-3">
                  <span className="text-lg font-semibold">Email:</span>
                  <span className="text-lg font-semibold">
                    {userInfo?.email}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-lg">Hạn Thanh Toán:</span>
                  <span className="text-lg font-semibold">
                    {paymentDeadline}
                  </span>
                </div>

                <div className="flex justify-end mt-10">
                  <button className="bg-amber-600 text-xl font-semibold text-white px-5 py-3 rounded-md hover:bg-amber-700">
                    Thanh Toán
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeeManagementPage;
