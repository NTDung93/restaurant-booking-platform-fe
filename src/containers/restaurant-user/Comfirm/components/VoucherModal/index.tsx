import React, { useState } from 'react';
import VoucherCard from '../VoucherCard';

interface VoucherModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableVouchers: Array<{
    imageSrc: string;
    title: string;
    originalPrice: number;
    discountedPrice: number;
    discountAmount: number;
  }>;
  onVoucherSelect: (selectedVoucher: string) => void;
}

const VoucherModal: React.FC<VoucherModalProps> = ({
  isOpen,
  onClose,
  availableVouchers,
  onVoucherSelect,
}) => {
  const [selectedVoucher, setSelectedVoucher] = useState<string | null>(null);

  const handleVoucherSelect = (title: string) => {
    setSelectedVoucher(title);
    onVoucherSelect(title);
  };

  const handleConfirm = () => {
    onClose();
    setSelectedVoucher(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Chọn Voucher</h2>
        <div className="space-y-4">
          {availableVouchers.map((voucherItem, index) => (
            <VoucherCard
              key={index}
              imageSrc={voucherItem.imageSrc}
              title={voucherItem.title}
              originalPrice={voucherItem.originalPrice}
              discountedPrice={voucherItem.discountedPrice}
              discountAmount={voucherItem.discountAmount}
              onAdd={() => handleVoucherSelect(voucherItem.title)}
            />
          ))}
        </div>

        {selectedVoucher && (
          <div className="mt-4 p-2 border border-gray-300 rounded-md">
            <p className="font-medium">
              Voucher đã chọn:{' '}
              <span className="font-semibold">{selectedVoucher}</span>
            </p>
          </div>
        )}

        <div className="mt-6 flex justify-between">
          <button
            className="bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500"
            onClick={onClose}
          >
            Đóng
          </button>
          {selectedVoucher && (
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              onClick={handleConfirm}
            >
              Xác nhận
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoucherModal;
