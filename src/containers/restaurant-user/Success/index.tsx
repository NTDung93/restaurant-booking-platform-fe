import Footer from '@/components/restaurant-user/Footer';
import Header from '@/components/restaurant-user/Header';
import { useNavigate } from 'react-router-dom';

export default function Success() {
  const navigate = useNavigate();

  const handleBacktoHome = () => {
    navigate('/');
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center p-8 bg-white shadow-md rounded-lg max-w-lg mt-10 mb-10">
            <div className="mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-green-500 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2l4-4m1-6h2a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2m4 0V3m0 0l1 1m-1-1l-1 1"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-4">Đặt bàn thành công!</h1>
            <p className="text-gray-700 mb-6">
              Đặt bàn của bạn đã được xác nhận. Chúng tôi rất mong được phục vụ
              bạn!
            </p>
            {/* <div className="mb-6">
                        <p><strong>Date:</strong> October 20, 2024</p>
                        <p><strong>Time:</strong> 7:00 PM</p>
                        <p><strong>Guests:</strong> 4 People</p>
                    </div> */}
            <button
              onClick={handleBacktoHome}
              className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
            >
              Trở về trang chủ
            </button>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
