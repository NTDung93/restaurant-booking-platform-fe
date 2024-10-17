import { useEffect, useState } from 'react';

import Footer from '@/components/restaurant-user/Footer';
import Header from '@/components/restaurant-user/Header';
import { useNavigate } from 'react-router-dom';
import { SUCCESSS_ROUTE } from '@/common/constants/routerConstant';

export default function Payment() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [date, setDate] = useState('');
  const [amout, setAmount] = useState('');
  const [selectedFoods, setSelectedFoods] = useState<
    { name: string; quantity: number }[]
  >([]);

  useEffect(() => {
    const storedName = localStorage.getItem('userName') || '';
    const storedPhone = localStorage.getItem('userPhone') || '';
    const storedEmail = localStorage.getItem('userEmail') || '';
    const storedDate = localStorage.getItem('date') || '';
    const storedFoods = localStorage.getItem('selectedFoods');
    const storedAmount = localStorage.getItem('amount') || '';

    setUserName(storedName);
    setUserPhone(storedPhone);
    setUserEmail(storedEmail);
    setDate(storedDate);
    setAmount(storedAmount);

    if (storedFoods) {
      setSelectedFoods(JSON.parse(storedFoods));
    }
  }, []);

  const handlePaymentComplete = () => {
    navigate(SUCCESSS_ROUTE);
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />

        <div className="flex-grow flex items-center justify-center bg-gray-100 p-4 sm:p-8">
          <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl">
            <div className="w-full lg:w-1/2 p-8">
              <h2 className="text-xl sm:text-2xl font-bold mb-4">
                Thông tin thanh toán
              </h2>
              <div className="mb-4">
                <p>
                  <strong>Ngày:</strong> {date}
                </p>
              </div>
              <div className="mb-4">
                <p>
                  <strong>Người đặt:</strong> {userName}
                </p>
                <p>
                  <strong>Email:</strong> {userEmail}
                </p>
                <p>
                  <strong>Số điện thoại:</strong> {userPhone}
                </p>
              </div>
              <div className="mb-4">
                <p>
                  <strong>Số tiền thanh toán:</strong> {amout} VNĐ
                </p>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold">Món ăn đã đặt:</h3>
                <ul className="list-disc ml-5">
                  {selectedFoods.map((food, index) => (
                    <li key={index}>
                      {food.name} - {food.quantity} phần
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-gray-600">
                  Xin vui lòng quét mã QR để hoàn tất thanh toán.
                </p>
              </div>
            </div>

            <div className="w-full lg:w-1/2 p-8 flex items-center justify-center bg-gray-50">
              <div className="flex flex-col items-center">
                <img
                  src="https://res.cloudinary.com/dnslrwedn/image/upload/v1729103861/Screenshot_2024-10-17_013728_zgl1wi.png"
                  alt="QR Code"
                  className="w-96 h-96 sm:w-96 sm:h-96 object-contain"
                />
                <p className="text-center text-gray-600 mt-4">
                  Quét mã QR để thanh toán
                </p>

                <button
                  onClick={handlePaymentComplete}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700 transition duration-200 mt-4" // Added mt-4 for spacing
                >
                  Tôi đã hoàn tất thanh toán
                </button>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
