import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ReservationForm: React.FC = () => {
  const navigate = useNavigate();

  // State để lưu trữ giá trị ngày và thời gian
  const [reservationDate, setReservationDate] = useState('');
  const [reservationTime, setReservationTime] = useState('');

  const handleReservation = () => {
    // Bạn có thể xử lý logic đặt bàn ở đây
    navigate('/confirm');
  };

  return (
    <div className="md:w-2/5 w-full bg-amber-500 text-white p-4 flex flex-col rounded-lg ml-0 md:ml-6">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-center text-black">
        Đặt bàn
      </h2>
      <div className="flex flex-col gap-4">
        <div className="bg-zinc-300 p-4 rounded-lg shadow-md">
          <label className="block text-lg md:text-xl font-medium text-black mb-2">
            Người lớn:
          </label>
          <input
            type="number"
            className="w-full p-2 bg-white text-black rounded-lg border border-gray-300"
            placeholder="Số người lớn"
          />
        </div>
        <div className="bg-zinc-300 p-4 rounded-lg shadow-md">
          <label className="block text-lg md:text-xl font-medium text-black mb-2">
            Trẻ em:
          </label>
          <input
            type="number"
            className="w-full p-2 bg-white text-black rounded-lg border border-gray-300"
            placeholder="Số trẻ em"
          />
        </div>
        <div className="bg-zinc-300 p-4 rounded-lg shadow-md">
          <label className="block text-lg md:text-xl font-medium text-black mb-2">
            Ngày đến:
          </label>
          <input
            type="date"
            className="w-full p-2 bg-white text-black rounded-lg border border-gray-300"
            value={reservationDate}
            onChange={(e) => setReservationDate(e.target.value)} // Cập nhật giá trị ngày
          />
        </div>
        <div className="bg-zinc-300 p-4 rounded-lg shadow-md">
          <label className="block text-lg md:text-xl font-medium text-black mb-2">
            Thời gian đến:
          </label>
          <input
            type="time"
            className="w-full p-2 bg-white text-black rounded-lg border border-gray-300"
            value={reservationTime}
            onChange={(e) => setReservationTime(e.target.value)} // Cập nhật giá trị thời gian
          />
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleReservation}
            className="bg-[#312525] text-white px-6 py-2 rounded-lg font-medium text-lg hover:bg-amber-600 transition duration-300"
          >
            ĐẶT BÀN
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationForm;
