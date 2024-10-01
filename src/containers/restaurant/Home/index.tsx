import Header from '@/components/restaurant/Header';
import Menu from '@/components/restaurant/Menu';
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
import Image from '@/components/restaurant/Img';

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
  const chartData = {
    labels: ['00:00', '06:00', '12:00', '18:00', '24:00'],
    datasets: [
      {
        label: 'Doanh thu',
        data: [0, 0, 0, 0, 0],
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
        max: 1,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <>
      <Header />
      <div className="mt-[100px] flex min-h-screen">
        <Menu />
        <div className="w-[85vw] flex flex-col ">
          <Image />

          {/* Task List Section */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-black text-4xl font-bold mb-4">
              Danh sách cần làm
            </h2>
            <p className="text-neutral-400 text-xl mb-8">
              Những việc bạn sẽ phải làm
            </p>

            <div className="flex justify-around">
              {[
                'Chờ Xác Nhận',
                'Chờ Xử Lý',
                'Hoàn Thành',
                'Món ăn tạm khóa',
              ].map((label, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className="text-amber-500 text-4xl font-bold">0</div>
                  <p className="text-black text-xl text-center">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Divider Line */}
          <div className="w-full h-px bg-neutral-300 my-8"></div>

          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-black text-4xl font-bold mb-4">
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
              {['Lượt truy cập', 'Bàn đặt', 'Lượt xem', 'Tỷ lệ chuyển đổi'].map(
                (label, idx) => (
                  <div key={idx} className="flex flex-col items-start">
                    <p className="text-black text-xl">{label}</p>
                    <p className="text-amber-500 text-3xl font-semibold">0</p>
                    <p className="text-neutral-400 text-base">
                      Vs hôm qua 0,00% --
                    </p>
                  </div>
                ),
              )}
            </div>

            {/* Rating Section */}
            <div className="relative p-6 bg-gray-50 rounded-lg shadow-md mt-8">
              <h2 className="text-black text-4xl font-bold mb-4">
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
                  <p className="text-green-600 text-4xl font-semibold">0</p>
                  <p className="text-green-600 text-2xl">điểm</p>
                </div>
                <div className="text-center">
                  <p className="text-red-600 text-4xl font-semibold">0</p>
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
    </>
  );
}
