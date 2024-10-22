import Header from '@/components/restaurant-admin/Header';
import Image from '@/components/restaurant-admin/Img';
import Menu from '@/components/restaurant-admin/Menu';

export default function ManageReportBookingTableOnline() {
  return (
    <>
      <Header />
      <div className="mt-[100px] flex min-h-screen">
        <Menu />
        <div className="w-[85vw] flex flex-col">
          <Image />
          <div className="ml-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">
              Đặt hàng trực tuyến
            </h1>
            <div className="w-full max-w-[800px] h-auto relative bg-white p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-medium text-black">
                  Nhận đơn hàng
                </h2>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 transition-all duration-200 ease-in-out"></div>
                  <div className="absolute w-5 h-5 bg-white rounded-full shadow-md left-1 top-0.5 transition-all duration-200 ease-in-out peer-checked:translate-x-full peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <p className="text-lg text-gray-600 mb-4">
                Cho phép khách hàng đặt hàng trực tuyến từ nhà hàng của bạn.
              </p>
              <div className="flex flex-col space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-normal">Vận chuyển</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 transition-all duration-200 ease-in-out"></div>
                    <div className="absolute w-5 h-5 bg-white rounded-full shadow-md left-1 top-0.5 transition-all duration-200 ease-in-out peer-checked:translate-x-full peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-normal">Hỏa Tốc</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 transition-all duration-200 ease-in-out"></div>
                    <div className="absolute w-5 h-5 bg-white rounded-full shadow-md left-1 top-0.5 transition-all duration-200 ease-in-out peer-checked:translate-x-full peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-normal">Nhanh</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 transition-all duration-200 ease-in-out"></div>
                    <div className="absolute w-5 h-5 bg-white rounded-full shadow-md left-1 top-0.5 transition-all duration-200 ease-in-out peer-checked:translate-x-full peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-normal">Ghép đơn</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 transition-all duration-200 ease-in-out"></div>
                    <div className="absolute w-5 h-5 bg-white rounded-full shadow-md left-1 top-0.5 transition-all duration-200 ease-in-out peer-checked:translate-x-full peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
