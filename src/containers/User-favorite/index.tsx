import Footer from '@/components/Footer';
import Header from '@/components/Header';
import MenuUser from '@/components/MenuUser';

export default function UserFavorite() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow p-6 flex justify-center items-start bg-gray-100">
        <div className="bg-white w-full max-w-6xl p-8 shadow-lg rounded-lg grid grid-cols-1 lg:grid-cols-2 gap-8">
          <MenuUser />
          <div className="bg-gray-50 p-6 rounded-lg shadow-inner w-full">
            <div className="text-center mb-8">
              <h2 className="text-black text-3xl font-medium">
                Danh Sách Yêu Thích
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-3xl shadow-md overflow-hidden flex flex-col">
                {/* Image Placeholder */}
                <div className="w-full h-64 bg-neutral-400 rounded-t-3xl"></div>
                {/* Content */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-2xl font-bold text-black">
                      Nhà hàng PUPU
                    </h3>
                    <p className="text-amber-500 text-base font-medium mt-2">
                      150.000 - 2.000.000 VNĐ
                    </p>
                    <p className="text-gray-500 text-sm mt-2">
                      Lô E2a-7, Đường D1, Long Thạnh Mỹ, Thủ Đức, Hồ Chí Minh
                    </p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-sm font-medium text-gray-800">
                        Đánh giá
                      </span>
                      <span className="text-sm font-medium text-gray-800">
                        Lượt đặt: 300050
                      </span>
                    </div>
                  </div>
                  {/* Button */}
                  <div className="flex justify-center mt-6">
                    <button className="bg-amber-500 text-white text-lg font-medium px-6 py-2 rounded-full hover:bg-amber-600 transition duration-300">
                      Bỏ yêu thích
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-3xl shadow-md overflow-hidden flex flex-col">
                <div className="w-full h-64 bg-neutral-400 rounded-t-3xl"></div>
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-2xl font-bold text-black">
                      Nhà hàng ABC
                    </h3>
                    <p className="text-amber-500 text-base font-medium mt-2">
                      200.000 - 3.000.000 VNĐ
                    </p>
                    <p className="text-gray-500 text-sm mt-2">
                      Lô A1-3, Đường XYZ, Quận 1, TP Hồ Chí Minh
                    </p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-sm font-medium text-gray-800">
                        Đánh giá
                      </span>
                      <span className="text-sm font-medium text-gray-800">
                        Lượt đặt: 250000
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-center mt-6">
                    <button className="bg-amber-500 text-white text-lg font-medium px-6 py-2 rounded-full hover:bg-amber-600 transition duration-300">
                      Bỏ yêu thích
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-3xl shadow-md overflow-hidden flex flex-col">
                <div className="w-full h-64 bg-neutral-400 rounded-t-3xl"></div>
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-2xl font-bold text-black">
                      Nhà hàng DEF
                    </h3>
                    <p className="text-amber-500 text-base font-medium mt-2">
                      300.000 - 4.000.000 VNĐ
                    </p>
                    <p className="text-gray-500 text-sm mt-2">
                      Đường ABC, Quận 7, TP Hồ Chí Minh
                    </p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-sm font-medium text-gray-800">
                        Đánh giá
                      </span>
                      <span className="text-sm font-medium text-gray-800">
                        Lượt đặt: 150000
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-center mt-6">
                    <button className="bg-amber-500 text-white text-lg font-medium px-6 py-2 rounded-full hover:bg-amber-600 transition duration-300">
                      Bỏ yêu thích
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-3xl shadow-md overflow-hidden flex flex-col">
                <div className="w-full h-64 bg-neutral-400 rounded-t-3xl"></div>
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-2xl font-bold text-black">
                      Nhà hàng GHI
                    </h3>
                    <p className="text-amber-500 text-base font-medium mt-2">
                      250.000 - 3.500.000 VNĐ
                    </p>
                    <p className="text-gray-500 text-sm mt-2">
                      Đường DEF, Quận 3, TP Hồ Chí Minh
                    </p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-sm font-medium text-gray-800">
                        Đánh giá
                      </span>
                      <span className="text-sm font-medium text-gray-800">
                        Lượt đặt: 120000
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-center mt-6">
                    <button className="bg-amber-500 text-white text-lg font-medium px-6 py-2 rounded-full hover:bg-amber-600 transition duration-300">
                      Bỏ yêu thích
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
