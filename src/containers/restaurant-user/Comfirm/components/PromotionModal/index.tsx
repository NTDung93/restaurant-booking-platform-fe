import React, { useState } from 'react';
import PromotionCard from '../PromotionCard';
import { Promotion } from '@/common/models/promotion';

interface PromotionModalProps {
  isOpen: boolean;
  onClose: () => void;
  availablePromotions: Promotion[];

  onPromotionSelect: (selectedPromotion: string) => void;
}

const PromotionModal: React.FC<PromotionModalProps> = ({
  isOpen,
  onClose,
  availablePromotions,
  onPromotionSelect,
}) => {
  const [selectedPromotion, setSelectedPromotion] = useState<string | null>(
    null,
  );

  const handlePromotionSelect = (title: string) => {
    setSelectedPromotion(title);
    onPromotionSelect(title);
  };

  const handleConfirm = () => {
    onClose();
    setSelectedPromotion(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Chọn Promotion</h2>
        <div className="space-y-4">
          {availablePromotions.map((promotionItem, index) => (
            <PromotionCard
              key={index}
              imageSrc={promotionItem.image}
              title={promotionItem.title}
              description={promotionItem.description}
              onAdd={() => handlePromotionSelect(promotionItem.title)}
            />
          ))}
        </div>

        {selectedPromotion && (
          <div className="mt-4 p-2 border border-gray-300 rounded-md">
            <p className="font-medium">
              Promotion đã chọn:{' '}
              <span className="font-semibold">{selectedPromotion}</span>
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
          {selectedPromotion && (
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

export default PromotionModal;
