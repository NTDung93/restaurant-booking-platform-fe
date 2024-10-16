import Footer from '@/components/restaurant-user/Footer';
import Header from '@/components/restaurant-user/Header';

export default function Payment() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />

        <div className="flex-grow flex items-center justify-center bg-gray-100 p-4 sm:p-8">
          <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl">
            {/* Thông tin thanh toán bên trái */}
            <div className="w-full lg:w-1/2 p-8">
              <h2 className="text-xl sm:text-2xl font-bold mb-4">
                Thông tin thanh toán
              </h2>
              <div className="mb-4">
                <p>
                  <strong>Hóa đơn:</strong> #1
                </p>
                <p>
                  <strong>Ngày:</strong> 11/11/2024
                </p>
              </div>
              <div className="mb-4">
                <p>
                  <strong>Người đặt:</strong> Hà Đình Đức Anh
                </p>
                <p>
                  <strong>Email:</strong> ducanhhadinh@gmail.com
                </p>
              </div>
              <div className="mb-4">
                <p>
                  <strong>Số tiền thanh toán:</strong> 1.200.000 VND
                </p>
              </div>
              <div>
                <p className="text-gray-600">
                  Xin vui lòng quét mã QR để hoàn tất thanh toán.
                </p>
              </div>
            </div>

            <div className="w-full lg:w-1/2 p-8 flex items-center justify-center bg-gray-50">
              <div>
                <img
                  src="https://res.cloudinary.com/dnslrwedn/image/upload/v1729103861/Screenshot_2024-10-17_013728_zgl1wi.png"
                  alt="QR Code"
                  className="w-96 h-96 sm:w-96 sm:h-96 object-contain"
                />
                <p className="text-center text-gray-600 mt-4">
                  Quét mã QR để thanh toán
                </p>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
