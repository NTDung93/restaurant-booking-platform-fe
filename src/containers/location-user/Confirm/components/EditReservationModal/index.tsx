import React, { useState } from 'react';

interface EditReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedReservation: ReservationData) => void;
  reservation: ReservationData;
}

interface ReservationData {
  location: string;
  adults: number;
  children: number;
  date: string;
  time: string;
}

const EditReservationModal: React.FC<EditReservationModalProps> = ({
  isOpen,
  onClose,
  onSave,
  reservation,
}) => {
  const [location, setLocation] = useState(reservation.location);
  const [adults, setAdults] = useState(reservation.adults);
  const [children, setChildren] = useState(reservation.children);
  const [date, setDate] = useState(reservation.date);
  const [time, setTime] = useState(reservation.time);

  const handleSave = () => {
    onSave({
      location,
      adults,
      children,
      date,
      time,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full">
        <h2 className="text-xl font-semibold mb-4">
          Chỉnh sửa thông tin đặt chỗ
        </h2>

        <div className="mb-4">
          <label htmlFor="location" className="block text-gray-700 font-medium">
            Địa điểm
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="adults" className="block text-gray-700 font-medium">
            Người lớn
          </label>
          <input
            type="number"
            id="adults"
            value={adults}
            onChange={(e) => setAdults(parseInt(e.target.value))}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="children" className="block text-gray-700 font-medium">
            Trẻ em
          </label>
          <input
            type="number"
            id="children"
            value={children}
            onChange={(e) => setChildren(parseInt(e.target.value))}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-700 font-medium">
            Ngày
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="time" className="block text-gray-700 font-medium">
            Thời gian
          </label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Hủy
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditReservationModal;
