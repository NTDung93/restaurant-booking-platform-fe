import Header from '@/components/restaurant-admin/Header';
import Image from '@/components/restaurant-admin/Img';
import Menu from '@/components/restaurant-admin/Menu';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ManageReportBookingTable: React.FC = () => {
  const [selectedReport, setSelectedReport] =
    useState<string>('Báo cáo đặt bàn');
  const [startDate, setStartDate] = useState<Date | null>(
    new Date('2024-08-26'),
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date('2024-09-24'));
  const [confirmedStartDate, setConfirmedStartDate] = useState<Date | null>(
    null,
  );
  const [confirmedEndDate, setConfirmedEndDate] = useState<Date | null>(null);

  const [revenue, setRevenue] = useState<number>(38500000);
  const [bookingCount, setBookingCount] = useState<number>(684);
  const [conversionRate, setConversionRate] = useState<number>(80);
  const [visitors, setVisitors] = useState<number>(453);
  const [restaurantViews, setRestaurantViews] = useState<number>(5741);
  const [revenuePerBooking, setRevenuePerBooking] = useState<number>(200000);

  const [previousRevenue, setPreviousRevenue] = useState<number>(40000000);
  const [previousBookingCount, setPreviousBookingCount] = useState<number>(70);
  const [previousConversionRate, setPreviousConversionRate] =
    useState<number>(750);
  const [previousVisitors, setPreviousVisitors] = useState<number>(50);
  const [previousRestaurantViews, setPreviousRestaurantViews] =
    useState<number>(600);
  const [previousRevenuePerBooking, setPreviousRevenuePerBooking] =
    useState<number>(180000);

  const [rankings, setRankings] = useState<
    Array<{ rank: number; food: string; sales: number }>
  >([
    { rank: 1, food: 'Phở Bò', sales: 3500000 },
    { rank: 2, food: 'Bánh Mì', sales: 2500000 },
    { rank: 3, food: 'Gà Nướng', sales: 1500000 },
    { rank: 4, food: 'Bún Chả', sales: 1000000 },
    { rank: 5, food: 'Mì Quảng', sales: 500000 },
    { rank: 6, food: 'Nem Rán', sales: 300000 },
  ]);

  const maxDate = new Date();

  // Function to shuffle rankings
  const shuffleRankings = (
    rankingsArray: Array<{ rank: number; food: string; sales: number }>,
  ) => {
    for (let i = rankingsArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [rankingsArray[i], rankingsArray[j]] = [
        rankingsArray[j],
        rankingsArray[i],
      ];
    }
    return rankingsArray.map((item, index) => ({ ...item, rank: index + 1 }));
  };

  const handleConfirm = () => {
    setConfirmedStartDate(startDate);
    setConfirmedEndDate(endDate);

    setRevenue(Math.floor(Math.random() * 50000000) + 10000000);
    setBookingCount(Math.floor(Math.random() * 100) + 500);
    setConversionRate(Math.floor(Math.random() * 10));
    setVisitors(Math.floor(Math.random() * 1000) + 40);
    setRestaurantViews(Math.floor(Math.random() * 600) + 500);
    setRevenuePerBooking(Math.floor(Math.random() * 500000) + 100000);

    setPreviousRevenue(Math.floor(Math.random() * 50000000) + 35000000);
    setPreviousBookingCount(Math.floor(Math.random() * 100) + 600);
    setPreviousConversionRate(Math.floor(Math.random() * 10) + 70);
    setPreviousVisitors(Math.floor(Math.random() * 300) + 400);
    setPreviousRestaurantViews(Math.floor(Math.random() * 1000) + 5000);
    setPreviousRevenuePerBooking(Math.floor(Math.random() * 400000) + 150000);

    const newRankings = shuffleRankings(
      rankings.map((item) => ({
        ...item,
        sales: Math.floor(Math.random() * 5000000) + 1000000,
      })),
    );

    setRankings(newRankings);
  };

  // Function to calculate percentage change and color
  const calculateChange = (current: number, previous: number) => {
    const percentageChange = Math.abs(
      Math.round(((current - previous) / previous) * 100),
    );
    const sign = current > previous ? '+' : '-';
    const color = sign === '+' ? 'text-green-600' : 'text-red-600';
    return { sign, percentageChange, color };
  };

  return (
    <>
      <Header />
      <div className="mt-[100px] flex min-h-screen ">
        <Menu />
        <div className="w-[85vw] flex flex-col">
          <Image />
          <div className="ml-8 py-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">
              Báo cáo chi tiết
            </h1>

            <div className="flex items-center mb-8 space-x-4">
              <div className="text-amber-600 text-2xl font-bold">
                Chọn ngày:
              </div>
              <div className="flex space-x-4">
                <DatePicker
                  selected={startDate}
                  onChange={(date: Date | null) => setStartDate(date)}
                  selectsStart
                  startDate={startDate || undefined}
                  endDate={endDate || undefined}
                  maxDate={maxDate}
                  dateFormat="dd-MM-yyyy"
                  className="border rounded-lg p-2"
                />
                <span className="text-gray-600">đến</span>
                <DatePicker
                  selected={endDate}
                  onChange={(date: Date | null) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate || undefined}
                  endDate={endDate || undefined}
                  minDate={startDate || undefined}
                  maxDate={maxDate}
                  dateFormat="dd-MM-yyyy"
                  className="border rounded-lg p-2"
                />
                <button
                  onClick={handleConfirm}
                  className="bg-amber-600 text-white py-2 px-4 rounded-lg"
                >
                  Xác nhận
                </button>
              </div>
            </div>

            <div className="text-neutral-400 text-xl mb-4">
              Từ {confirmedStartDate?.toLocaleDateString('vi-VN')} đến{' '}
              {confirmedEndDate?.toLocaleDateString('vi-VN')}
            </div>

            <div className="mb-8">
              <div className="flex space-x-8">
                <button
                  className={`font-bold text-2xl pb-2 border-b-4 transition-colors 
                                            ${
                                              selectedReport ===
                                              'Báo cáo đặt bàn'
                                                ? 'border-amber-600 text-amber-600'
                                                : 'border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-800'
                                            }`}
                  onClick={() => setSelectedReport('Báo cáo đặt bàn')}
                >
                  Báo cáo đặt bàn
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-12 mt-8">
              <div className="flex flex-col items-center">
                <div className="text-xl text-gray-800">Doanh số</div>
                <div className="text-amber-500 text-4xl font-bold">
                  {revenue.toLocaleString()}
                </div>
                <div className="text-center text-neutral-400">
                  so với 30 ngày trước
                  {(() => {
                    const { sign, percentageChange, color } = calculateChange(
                      revenue,
                      previousRevenue,
                    );
                    return (
                      <span className={`ml-2 ${color}`}>
                        {sign} {percentageChange}%
                      </span>
                    );
                  })()}
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="text-xl text-gray-800">Đơn đặt bàn</div>
                <div className="text-amber-500 text-4xl font-bold">
                  {bookingCount}
                </div>
                <div className="text-center text-neutral-400">
                  so với 30 ngày trước
                  {(() => {
                    const { sign, percentageChange, color } = calculateChange(
                      bookingCount,
                      previousBookingCount,
                    );
                    return (
                      <span className={`ml-2 ${color}`}>
                        {sign} {percentageChange}%
                      </span>
                    );
                  })()}
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="text-xl text-gray-800">Tỷ lệ chuyển đổi</div>
                <div className="text-amber-500 text-4xl font-bold">
                  {conversionRate}%
                </div>
                <div className="text-center text-neutral-400">
                  so với 30 ngày trước
                  {(() => {
                    const { sign, percentageChange, color } = calculateChange(
                      conversionRate,
                      previousConversionRate,
                    );
                    return (
                      <span className={`ml-2 ${color}`}>
                        {sign} {percentageChange}%
                      </span>
                    );
                  })()}
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="text-xl text-gray-800">Lượt truy cập</div>
                <div className="text-amber-500 text-4xl font-bold">
                  {visitors}
                </div>
                <div className="text-center text-neutral-400">
                  so với 30 ngày trước
                  {(() => {
                    const { sign, percentageChange, color } = calculateChange(
                      visitors,
                      previousVisitors,
                    );
                    return (
                      <span className={`ml-2 ${color}`}>
                        {sign} {percentageChange}%
                      </span>
                    );
                  })()}
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="text-xl text-gray-800">Lượt xem nhà hàng</div>
                <div className="text-amber-500 text-4xl font-bold">
                  {restaurantViews}
                </div>
                <div className="text-center text-neutral-400">
                  so với 30 ngày trước
                  {(() => {
                    const { sign, percentageChange, color } = calculateChange(
                      restaurantViews,
                      previousRestaurantViews,
                    );
                    return (
                      <span className={`ml-2 ${color}`}>
                        {sign} {percentageChange}%
                      </span>
                    );
                  })()}
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="text-xl text-gray-800">
                  Doanh thu mỗi đơn đặt bàn
                </div>
                <div className="text-amber-500 text-4xl font-bold">
                  {revenuePerBooking.toLocaleString()} VNĐ
                </div>
                <div className="text-center text-neutral-400">
                  so với 30 ngày trước
                  {(() => {
                    const { sign, percentageChange, color } = calculateChange(
                      revenuePerBooking,
                      previousRevenuePerBooking,
                    );
                    return (
                      <span className={`ml-2 ${color}`}>
                        {sign} {percentageChange}%
                      </span>
                    );
                  })()}
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Top món ăn
              </h2>
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr>
                    <th className="border-b-2 border-gray-200 py-2 px-4 text-left">
                      #
                    </th>
                    <th className="border-b-2 border-gray-200 py-2 px-4 text-left">
                      Món ăn
                    </th>
                    <th className="border-b-2 border-gray-200 py-2 px-4 text-left">
                      Doanh số
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rankings.map((item) => (
                    <tr key={item.rank} className="hover:bg-gray-100">
                      <td className="border-b border-gray-200 py-2 px-4">
                        {item.rank}
                      </td>
                      <td className="border-b border-gray-200 py-2 px-4">
                        {item.food}
                      </td>
                      <td className="border-b border-gray-200 py-2 px-4">
                        {item.sales.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageReportBookingTable;
