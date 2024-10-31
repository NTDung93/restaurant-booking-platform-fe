import Header from '@/components/restaurant-admin/Header';
import Image from '@/components/restaurant-admin/Img';
import Menu from '@/components/restaurant-admin/Menu';

export default function ManageReportBookingTableOnline() {
  return (
    <>
      <Header />
      <div className="mt-[100px] flex min-h-screen">
        {/* Fixed Menu */}
        <div className="fixed top-[100px] left-0 w-[15vw]">
          <Menu />
        </div>

        <div className="ml-[15vw] w-[85vw] flex flex-col overflow-y-auto">
          <Image />

          {/* Content */}
          <div className="p-8 bg-white shadow-lg rounded-lg mx-auto w-[80%] max-w-3xl">
            <h1 className="text-3xl font-bold mb-6 text-amber-600">
              Đặt hàng Trực tuyến
            </h1>

            {/* Order Acceptance Section */}
            <div className="mb-8 p-4 bg-gray-100 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold mb-3 text-gray-800">
                Nhận đơn hàng
              </h2>
              <p className="text-gray-600 mb-4">
                Cho phép khách hàng đặt hàng trực tuyến từ nhà hàng của bạn.
              </p>
              <label className="flex items-center">
                <span className="mr-3 text-gray-800">Bật nhận đơn hàng</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-14 h-8 bg-amber-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300transition-all duration-200 ease-in-out"></div>
                  <div className="absolute w-6 h-6 bg-white rounded-full shadow-md left-1 top-1 transition-all duration-200 ease-in-out peer-checked:translate-x-full peer-checked:bg-amber-500"></div>
                </label>
              </label>
            </div>

            <hr className="my-6 border-gray-300" />

            {/* Shipping Options Section */}
            <div className="mb-8 p-4 bg-gray-100 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold mb-3 text-gray-800">
                Vận chuyển
              </h2>
              {['Hỏa Tốc', 'Nhanh', 'Ghép đơn', 'Hàng dễ vỡ'].map(
                (label, index) => (
                  <div
                    className="flex items-center justify-between mb-5"
                    key={index}
                  >
                    <span className="text-gray-700">{label}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-14 h-8 bg-amber-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300transition-all duration-200 ease-in-out"></div>
                      <div className="absolute w-6 h-6 bg-white rounded-full shadow-md left-1 top-1 transition-all duration-200 ease-in-out peer-checked:translate-x-full peer-checked:bg-amber-500"></div>
                    </label>
                  </div>
                ),
              )}
              <button className="mt-4 bg-amber-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-amber-700 transition duration-200">
                Thiết lập đơn vị vận chuyển
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
