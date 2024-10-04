import Header from '@/components/restaurant-admin/Header';
import Image from '@/components/restaurant-admin/Img';
import Menu from '@/components/restaurant-admin/Menu';

export default function ManageBookingTableAll() {
  return (
    <>
      <Header />
      <div className="mt-[100px] flex min-h-screen">
        <Menu />
        <div className="w-[85vw] flex flex-col ">
          <Image />
          <div className=" ml-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">
              Quản lý đặt bàn
            </h1>
            <div className="relative flex justify-start items-center ">
              <div className="flex space-x-10 text-xl font-medium">
                <button className="text-amber-600 font-bold border-b-4 border-amber-600 pb-2">
                  Tất cả
                </button>
                <button className="text-gray-600 hover:text-amber-600 transition duration-200">
                  Bàn đang đợi
                </button>
                <button className="text-gray-600 hover:text-amber-600 transition duration-200">
                  Bàn hoàn thành
                </button>
                <button className="text-gray-600 hover:text-amber-600 transition duration-200">
                  Bàn hủy
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-4 mt-6">
              <div className="relative w-96">
                <div className="flex items-center justify-between bg-white border border-gray-300 rounded-full px-4 py-2">
                  <span className="text-gray-700 font-medium">Mã bàn đặt</span>
                  <div className="w-5 h-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5 text-gray-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 9l-7.5 7.5L4.5 9"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="relative w-96">
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-400 rounded-full focus:outline-none focus:border-amber-600"
                  placeholder="Nhập mã bàn..."
                />
              </div>
              <button className="bg-amber-600 text-white text-lg font-bold py-2 px-6 rounded-full transition duration-200 hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500">
                Xác nhận
              </button>

              <button className="text-amber-600 border border-amber-600 text-lg font-bold py-2 px-6 rounded-full transition duration-200 hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-500">
                Đặt lại
              </button>
            </div>
            <div className="relative w-full p-4">
              {/* Header */}
              <div className="mb-6 text-3xl font-bold text-black">
                99 Bàn đặt
              </div>

              {/* Table Header */}
              <div className="grid grid-cols-7 gap-4 items-center text-lg font-normal text-black mb-4 bg-gray-100 px-5 rounded-lg">
                <div>Mã bàn đặt</div>
                <div>Bàn</div>
                <div>Số khách</div>
                <div>Thời gian đặt</div>
                <div>Trạng thái thanh toán</div>
                <div>Trạng thái</div>
                <div>Thao tác</div>
              </div>

              {/* Table Rows */}
              {[
                {
                  id: '#5454648548791',
                  table: '08',
                  guests: '03/04',
                  time: '25/09/2024 19:00',
                  paymentStatus: 'Đã thanh toán',
                  status: 'Đã hoàn thành',
                },
                {
                  id: '#5454648548791',
                  table: '08',
                  guests: '03/04',
                  time: '25/09/2024 19:00',
                  paymentStatus: 'Chưa thanh toán',
                  status: 'Đang đợi',
                },
                {
                  id: '#5454648548791',
                  table: '15',
                  guests: '02/02',
                  time: '25/09/2024 19:00',
                  paymentStatus: 'Đã cọc',
                  status: 'Đang đợi',
                },
                {
                  id: '#5454648548791',
                  table: '08',
                  guests: '03/04',
                  time: '25/09/2024 19:00',
                  paymentStatus: 'Đã thanh toán',
                  status: 'Đã hủy',
                },
                {
                  id: '#5454648548791',
                  table: '15',
                  guests: '02/02',
                  time: '25/09/2024 19:00',
                  paymentStatus: 'Chưa thanh toán',
                  status: 'Đang đợi',
                },
                {
                  id: '#5454648548791',
                  table: '08',
                  guests: '03/04',
                  time: '25/09/2024 19:00',
                  paymentStatus: 'Đã thanh toán',
                  status: 'Đã hoàn thành',
                },
                {
                  id: '#5454648548791',
                  table: '08',
                  guests: '03/04',
                  time: '25/09/2024 19:00',
                  paymentStatus: 'Chưa thanh toán',
                  status: 'Đang đợi',
                },
                {
                  id: '#5454648548791',
                  table: '15',
                  guests: '02/02',
                  time: '25/09/2024 19:00',
                  paymentStatus: 'Đã cọc',
                  status: 'Đang đợi',
                },
                {
                  id: '#5454648548791',
                  table: '08',
                  guests: '03/04',
                  time: '25/09/2024 19:00',
                  paymentStatus: 'Đã thanh toán',
                  status: 'Đã hủy',
                },
                {
                  id: '#5454648548791',
                  table: '15',
                  guests: '02/02',
                  time: '25/09/2024 19:00',
                  paymentStatus: 'Chưa thanh toán',
                  status: 'Đang đợi',
                },
                {
                  id: '#5454648548791',
                  table: '08',
                  guests: '03/04',
                  time: '25/09/2024 19:00',
                  paymentStatus: 'Đã thanh toán',
                  status: 'Đã hoàn thành',
                },
                {
                  id: '#5454648548791',
                  table: '08',
                  guests: '03/04',
                  time: '25/09/2024 19:00',
                  paymentStatus: 'Chưa thanh toán',
                  status: 'Đang đợi',
                },
                {
                  id: '#5454648548791',
                  table: '15',
                  guests: '02/02',
                  time: '25/09/2024 19:00',
                  paymentStatus: 'Đã cọc',
                  status: 'Đang đợi',
                },
                {
                  id: '#5454648548791',
                  table: '08',
                  guests: '03/04',
                  time: '25/09/2024 19:00',
                  paymentStatus: 'Đã thanh toán',
                  status: 'Đã hủy',
                },
                {
                  id: '#5454648548791',
                  table: '15',
                  guests: '02/02',
                  time: '25/09/2024 19:00',
                  paymentStatus: 'Chưa thanh toán',
                  status: 'Đang đợi',
                },
              ].map((row, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-7 gap-4 items-center text-xl font-normal text-black mb-4 px-5"
                >
                  <div>{row.id}</div>
                  <div>{row.table}</div>
                  <div>{row.guests}</div>
                  <div>{row.time}</div>
                  <div
                    className={
                      row.paymentStatus === 'Đã thanh toán'
                        ? 'text-green-600'
                        : row.paymentStatus === 'Đã cọc'
                          ? 'text-sky-700'
                          : 'text-red-400'
                    }
                  >
                    {row.paymentStatus}
                  </div>
                  <div
                    className={
                      row.status === 'Đã hoàn thành'
                        ? 'text-green-600'
                        : row.status === 'Đã hủy'
                          ? 'text-red-600'
                          : 'text-sky-700'
                    }
                  >
                    {row.status}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <button className="px-4 py-2 bg-amber-600 text-white rounded-2xl font-bold">
                      Xác nhận
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
