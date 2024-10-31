import Header from '@/components/restaurant-admin/Header';
import Menu from '@/components/restaurant-admin/Menu';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Image from '@/components/restaurant-admin/Img';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxDispatch } from '@/libs/redux/store';
import { selectBookingByLocation } from '../ManageBookingTableAll/selector';
import { useEffect, useState } from 'react';
import { selectUserInfo } from '@/containers/restaurant-user/Auth/selector';
import { fetchBookingByLocation } from '../ManageBookingTableAll/thunks';
import ScrollToTopButton from '@/components/ScrollToTopButton';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export default function Home() {
  const dispatch = useDispatch<ReduxDispatch>();
  const bookingsResponse = useSelector(selectBookingByLocation);
  const userInfo = useSelector(selectUserInfo);

  // Calculate order status counts
  const pendingCount = bookingsResponse?.content.filter(
    (b) => b.status === 'PENDING',
  ).length;
  const confirmedCount = bookingsResponse?.content.filter(
    (b) => b.status === 'CONFIRMED',
  ).length;
  const successCount = bookingsResponse?.content.filter(
    (b) => b.status === 'SUCCESSFUL',
  ).length;
  const cancelCount = bookingsResponse?.content.filter(
    (b) => b.status === 'CANCELLED',
  ).length;

  const [currentPage] = useState(1);
  const [pageSize] = useState(100);

  useEffect(() => {
    const locationId = userInfo?.locationId;
    if (locationId !== undefined) {
      dispatch(fetchBookingByLocation({ locationId, currentPage, pageSize }));
    }
  }, [dispatch, userInfo]);

  const chartData = {
    labels: ['00:00', '06:00', '12:00', '18:00', '24:00'],
    datasets: [
      {
        label: 'Doanh thu',
        data: [100, 200, 150, 300, 250], // Fluctuating revenue data
        borderColor: 'rgba(66, 135, 245, 0.8)',
        backgroundColor: 'rgba(66, 135, 245, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time',
          color: '#666',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Value',
          color: '#666',
        },
        min: 0,
        max: 400, // Adjust max based on data
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const statsData = {
    traffic: 1200, // Lượt truy cập
    bookings: 300, // Bàn đặt
    views: 4500, // Lượt xem
  };

  const conversionRate = (
    (statsData.bookings / statsData.traffic) *
    100
  ).toFixed(2);
  const conversionRateNumber = parseFloat(conversionRate);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
          <div className="mx-10">
            <div className="p-8 bg-background text-foreground space-y-10">
              <h2 className="text-amber-600 text-3xl font-bold mb-4">
                Danh sách đơn đặt bàn
              </h2>
              <p className="text-neutral-400 text-xl mb-8">
                Những việc bạn sẽ phải làm
              </p>

              <div className="flex justify-around">
                <div className="flex flex-col items-center">
                  <div className="text-amber-500 text-4xl font-bold">
                    {pendingCount}
                  </div>
                  <p className="text-black text-xl text-center">Chờ Xác Nhận</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-amber-500 text-4xl font-bold">
                    {confirmedCount}
                  </div>
                  <p className="text-black text-xl text-center">Đã Xử Lý</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-amber-500 text-4xl font-bold">
                    {successCount}
                  </div>
                  <p className="text-black text-xl text-center">Hoàn Thành</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-amber-500 text-4xl font-bold">
                    {cancelCount}
                  </div>
                  <p className="text-black text-xl text-center">Đơn hủy</p>
                </div>
              </div>
            </div>

            {/* Divider Line */}
            <div className="w-full h-px bg-neutral-300 my-8"></div>

            <div className="p-6 bg-white rounded-lg shadow-md">
              <h2 className="text-amber-600 text-3xl font-bold mb-4">
                Phân tích đặt bàn
              </h2>
              <p className="text-neutral-400 text-xl mb-8">
                Tổng quan dữ liệu của nhà hàng đối với bàn đã đặt
              </p>

              <div className="flex justify-between items-start">
                <div className="flex flex-col items-start">
                  <p className="text-black text-xl">Doanh thu</p>
                  <p className="text-neutral-400 text-base">
                    Hôm nay 00:00 GMT+7 15:00
                  </p>
                </div>
              </div>

              {/* Revenue Chart */}
              <div className="h-64 mt-8">
                <Line data={chartData} options={chartOptions} />
              </div>

              {/* Stats Section */}
              <div className="mt-8 flex justify-around">
                <div className="flex flex-col items-start">
                  <p className="text-black text-xl">Lượt truy cập</p>
                  <p className="text-amber-500 text-3xl font-semibold">
                    {statsData.traffic}
                  </p>
                  <p className="text-neutral-400 text-base">
                    Vs hôm qua{' '}
                    {(((statsData.traffic - 1000) / 1000) * 100).toFixed(2)}% --
                  </p>
                </div>
                <div className="flex flex-col items-start">
                  <p className="text-black text-xl">Bàn đặt</p>
                  <p className="text-amber-500 text-3xl font-semibold">
                    {statsData.bookings}
                  </p>
                  <p className="text-neutral-400 text-base">
                    Vs hôm qua{' '}
                    {(((statsData.bookings - 250) / 250) * 100).toFixed(2)}% --
                  </p>
                </div>
                <div className="flex flex-col items-start">
                  <p className="text-black text-xl">Lượt xem</p>
                  <p className="text-amber-500 text-3xl font-semibold">
                    {statsData.views}
                  </p>
                  <p className="text-neutral-400 text-base">
                    Vs hôm qua{' '}
                    {(((statsData.views - 4000) / 4000) * 100).toFixed(2)}% --
                  </p>
                </div>
                <div className="flex flex-col items-start">
                  <p className="text-black text-xl">Tỷ lệ chuyển đổi</p>
                  <p className="text-amber-500 text-3xl font-semibold">
                    {conversionRate}%
                  </p>
                  <p className="text-neutral-400 text-base">
                    Vs hôm qua {(conversionRateNumber - 0).toFixed(2)}% --
                  </p>
                </div>
              </div>

              {/* Rating Section */}
              <div className="relative p-6 bg-gray-50 rounded-lg shadow-md mt-8">
                <h2 className="text-amber-600 text-3xl font-bold mb-4">
                  Điểm Đánh Giá
                </h2>
                <p className="text-neutral-400 text-xl mb-4">
                  Hệ thống Điểm Đánh Giá giúp Nhà hàng duy trì dịch vụ đặt bàn
                  chất lượng, mang đến sự hài lòng cho Khách hàng.
                </p>

                <div className="flex justify-between items-center mb-8">
                  <p className="text-neutral-400 text-base">
                    Từ 1 Tháng 7 2024 đến 6 Tháng 10 2024
                  </p>
                </div>

                <div className="flex justify-around items-center">
                  <div className="text-center">
                    <p className="text-green-600 text-4xl font-semibold">4.5</p>{' '}
                    {/* Fixed rating value */}
                    <p className="text-green-600 text-2xl">điểm</p>
                  </div>
                  <div className="text-center">
                    <p className="text-red-600 text-4xl font-semibold">1.5</p>{' '}
                    {/* Fixed rating value */}
                    <p className="text-red-600 text-2xl">điểm</p>
                  </div>
                </div>

                <p className="text-black text-xl font-medium text-center mt-4">
                  Nhà hàng đang hoạt động rất hiệu quả, hãy giữ vững kết quả này
                  để Khách hàng thêm vững lòng tin nhé!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ScrollToTopButton />
    </>
  );
}
