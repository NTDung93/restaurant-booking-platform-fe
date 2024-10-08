import React, { useState } from 'react';
import EditReservationModal from '../EditReservationModal';

interface ReservationData {
  location: string;
  adults: number;
  children: number;
  date: string;
  time: string;
}

const ReservationInfo: React.FC = () => {
  const [reservation, setReservation] = useState<ReservationData>({
    location: 'Dìn Ký Cù Lao Xanh - Trần Văn Trà Quận 7',
    adults: 2,
    children: 0,
    date: '2024-09-12',
    time: '21:00',
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  const handleEditReservation = () => {
    setIsEditModalOpen(true);
  };

  const handleSaveReservation = (updatedReservation: ReservationData) => {
    setReservation(updatedReservation);
    setIsEditModalOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleEditReservation}
        className="absolute top-0 right-0 text-red-500 underline hover:text-red-600"
      >
        Chỉnh sửa
      </button>
      <h2 className="text-xl font-semibold mb-4">Thông tin đặt chỗ</h2>
      <div className="mb-4 p-4 bg-gray-100 rounded-md">
        <p className="text-gray-700">
          <span className="font-semibold">Địa điểm:</span>{' '}
          {reservation.location}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Khách:</span> {reservation.adults}{' '}
          người lớn, {reservation.children} trẻ em
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Thời gian:</span> Thứ năm, ngày{' '}
          {reservation.date} {reservation.time}
        </p>
      </div>
      <EditReservationModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveReservation}
        reservation={reservation}
      />
    </div>
  );
};

export default ReservationInfo;
