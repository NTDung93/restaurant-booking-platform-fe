import React, { useState } from 'react';
import VoucherCard from '../VoucherCard';
import PromotionCard from '../PromotionCard';

interface SelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableVouchers: Array<{
    imageSrc: string;
    title: string;
    originalPrice: number;
    discountedPrice: number;
    discountAmount: number;
  }>;
  availablePromotions: Array<{
    title: string;
    description: string;
    imageSrc: string;
  }>;
  onVoucherSelect: (selectedVoucher: string) => void;
  onPromotionSelect: (selectedPromotion: string) => void;
}

const SelectionModal: React.FC<SelectionModalProps> = ({
  isOpen,
  onClose,
  availableVouchers,
  availablePromotions,
  onVoucherSelect,
  onPromotionSelect,
}) => {
  const [selectedVoucher, setSelectedVoucher] = useState<string | null>(null);
  const [selectedPromotion, setSelectedPromotion] = useState<string | null>(
    null,
  );

  const handleVoucherSelect = (title: string) => {
    setSelectedVoucher(title);
    onVoucherSelect(title);
  };

  const handlePromotionSelect = (title: string) => {
    setSelectedPromotion(title);
    onPromotionSelect(title);
  };

  const handleConfirm = () => {
    setSelectedVoucher(null);
    setSelectedPromotion(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">
          Chọn Voucher hoặc Promotion
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Vouchers:</h3>
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
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Promotions:</h3>
            <div className="space-y-4">
              {availablePromotions.map((promotionItem, index) => (
                <PromotionCard
                  key={index}
                  imageSrc={promotionItem.imageSrc}
                  title={promotionItem.title}
                  description={promotionItem.description}
                  onAdd={() => handlePromotionSelect(promotionItem.title)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4">
          {selectedVoucher && (
            <div className="p-2 border border-gray-300 rounded-md">
              <p className="font-medium">
                Voucher đã chọn:{' '}
                <span className="font-semibold">{selectedVoucher}</span>{' '}
              </p>
            </div>
          )}
          {selectedPromotion && (
            <div className="p-2 border border-gray-300 rounded-md mt-2">
              <p className="font-medium">
                Promotion đã chọn:{' '}
                <span className="font-semibold">{selectedPromotion}</span>
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-between">
          <button
            className="bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500"
            onClick={onClose}
          >
            Đóng
          </button>
          {(selectedVoucher || selectedPromotion) && (
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

export default SelectionModal;
