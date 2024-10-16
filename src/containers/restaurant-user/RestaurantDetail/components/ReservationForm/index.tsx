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
    if (
      !reservationDate ||
      !reservationTime ||
      numAdults === '' ||
      numChildren === ''
    ) {
      setError('Vui lòng nhập tất cả các thông tin yêu cầu.');
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

  return (
    <div className="md:w-2/5 w-full bg-amber-500 text-white p-4 flex flex-col rounded-lg ml-0 md:ml-6">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-center text-black">
        Đặt bàn
      </h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <div className="flex flex-col gap-4">
        <div className="bg-zinc-300 p-4 rounded-lg shadow-md">
          <label className="block text-lg md:text-xl font-medium text-black mb-2">
            Người lớn:
          </label>
          <input
            type="number"
            className="w-full p-2 bg-white text-black rounded-lg border border-gray-300"
            placeholder="Số người lớn"
            value={numAdults}
            onChange={(e) =>
              setNumAdults(e.target.value ? Number(e.target.value) : '')
            }
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
            value={numChildren}
            onChange={(e) =>
              setNumChildren(e.target.value ? Number(e.target.value) : '')
            }
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
            onChange={(e) => setReservationDate(e.target.value)}
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
            onChange={(e) => setReservationTime(e.target.value)}
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
