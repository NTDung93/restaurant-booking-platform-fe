import React, { useState, useEffect } from 'react';
import EditReservationModal from '../EditReservationModal';

export interface ReservationData {
  restaurantName: string;
  location: string;
  adults: number;
  children: number;
  date: string;
  time: string;
}

interface ReservationInfoProps {
  onReservationChange: (reservation: ReservationData) => void;
}

const ReservationInfo: React.FC<ReservationInfoProps> = ({
  onReservationChange,
}) => {
  const [reservation, setReservation] = useState<ReservationData>({
    restaurantName: localStorage.getItem('restaurantName') || '',
    location: localStorage.getItem('address') || '',
    adults: Number(localStorage.getItem('adults')) || 0,
    children: Number(localStorage.getItem('children')) || 0,
    date: localStorage.getItem('date') || '',
    time: localStorage.getItem('time') || '',
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  const handleEditReservation = () => {
    setIsEditModalOpen(true);
  };

  const handleSaveReservation = (updatedReservation: ReservationData) => {
    setReservation(updatedReservation);
    setIsEditModalOpen(false);
    onReservationChange(updatedReservation);
  };

  useEffect(() => {
    if (isEditModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isEditModalOpen]);

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
          <span className="font-semibold">Nhà hàng:</span>{' '}
          {reservation.restaurantName}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Địa điểm:</span>{' '}
          {reservation.location}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Khách:</span> {reservation.adults}{' '}
          người lớn, {reservation.children} trẻ em
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Thời gian:</span> Ngày{' '}
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
