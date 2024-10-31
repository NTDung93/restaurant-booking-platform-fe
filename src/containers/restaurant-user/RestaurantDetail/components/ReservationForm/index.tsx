import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ReservationForm: React.FC = () => {
  const navigate = useNavigate();

  const [reservationDate, setReservationDate] = useState<string>('');
  const [reservationTime, setReservationTime] = useState<string>('');
  const [numAdults, setNumAdults] = useState<number | ''>('');
  const [numChildren, setNumChildren] = useState<number | ''>('');
  const [error, setError] = useState<string>('');

  const handleReservation = () => {
    const currentDateTime = new Date();
    const selectedDateTime = new Date(`${reservationDate}T${reservationTime}`);

    const currentTimeInGMT7 = new Date(
      currentDateTime.getTime() +
        currentDateTime.getTimezoneOffset() * 60000 +
        7 * 60 * 60000,
    );

    if (
      !reservationDate ||
      !reservationTime ||
      numAdults === '' ||
      numChildren === ''
    ) {
      setError('Vui lòng nhập tất cả các thông tin yêu cầu.');
      return;
    }

    if (selectedDateTime < currentTimeInGMT7) {
      setError('Ngày và thời gian không được là quá khứ.');
      return;
    }

    navigate('/confirm');
  };

  useEffect(() => {
    localStorage.setItem('date', reservationDate);
    localStorage.setItem('time', reservationTime);
    localStorage.setItem('adults', String(numAdults));
    localStorage.setItem('children', String(numChildren));
  }, [reservationDate, reservationTime, numAdults, numChildren]);

  const today = new Date();
  const minDate = today.toISOString().split('T')[0];

  // Convert current time to the format HH:MM without seconds
  const currentTime = new Date()
    .toLocaleTimeString('it-IT', {
      hour: '2-digit',
      minute: '2-digit',
    })
    .slice(0, 5);

  return (
    <div className="md:w-2/5 w-full bg-gradient-to-br from-amber-600/90 to-amber-400/90 text-white p-6 flex flex-col rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-4 text-center text-white">
        Đặt Bàn
      </h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <div className="flex flex-col gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Người lớn:
          </label>
          <input
            type="number"
            className="w-full p-3 text-black rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-600 transition duration-200"
            placeholder="Số người lớn"
            value={numAdults}
            onChange={(e) => {
              const value = e.target.value;
              setNumAdults(value === '' ? '' : Math.max(0, Number(value)));
            }}
          />
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Trẻ em:
          </label>
          <input
            type="number"
            className="w-full p-3 text-black rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-600 transition duration-200"
            placeholder="Số trẻ em"
            value={numChildren}
            onChange={(e) => {
              const value = e.target.value;
              setNumChildren(value === '' ? '' : Math.max(0, Number(value)));
            }}
          />
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Ngày đến:
          </label>
          <input
            type="date"
            className="w-full p-3 text-black rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-600 transition duration-200"
            value={reservationDate}
            min={minDate}
            onChange={(e) => setReservationDate(e.target.value)}
          />
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Thời gian đến:
          </label>
          <input
            type="time"
            className="w-full p-3 text-black rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-600 transition duration-200"
            value={reservationTime}
            onChange={(e) => setReservationTime(e.target.value)}
            min={reservationDate === minDate ? currentTime : undefined}
          />
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={handleReservation}
            className="bg-white text-amber-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-amber-600 hover:text-white transition duration-300 shadow-lg"
          >
            ĐẶT BÀN
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationForm;
