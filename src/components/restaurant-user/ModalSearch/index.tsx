import { RESTAURANT_DETAIL_ROUTE } from '@/common/constants/routerConstant';
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  width: number;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, width }) => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNavigation = () => {
    navigate(RESTAURANT_DETAIL_ROUTE);
  };

  return (
    <div
      className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-lg shadow-lg overflow-hidden"
        style={{ width }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="p-6 mt-4 flex flex-col h-full">
          <div className="flex items-center mb-4">
            <input
              ref={inputRef}
              type="text"
              placeholder="Nhập từ khóa"
              className="w-3/4 h-12 border border-neutral-400 rounded-l-lg px-4 text-gray-700 placeholder-gray-500"
            />
            <div className="cursor-pointer w-1/4 h-12 bg-amber-600 text-white text-base font-medium flex items-center justify-center rounded-r-lg border border-neutral-400">
              Tìm kiếm
            </div>
          </div>

          <div className="mt-2 text-black text-2xl font-bold">
            Tìm kiếm nổi bật
          </div>

          <div
            className="mt-4 flex-1 overflow-auto"
            style={{ maxHeight: 'calc(8 * 4rem)' }}
          >
            {[...Array(10)].map((_, index) => (
              <div
                key={index}
                className="cursor-pointer bg-white shadow rounded-lg border border-neutral-500 w-full p-4 flex flex-col gap-2 mb-4"
                onClick={handleNavigation}
              >
                <div className="flex items-center gap-2 border-b border-neutral-500 pb-2">
                  <div className="w-10 h-10 bg-gray-300 rounded-md"></div>
                  <div className="text-black text-base font-medium">
                    kichikichi
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức,
                  Hồ Chí Minh 700000
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="text-xs text-gray-800">Đánh giá</div>
                  <div className="text-xs text-gray-600">Lượt đặt: 300050</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
