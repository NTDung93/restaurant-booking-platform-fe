import React, { useState, useRef } from 'react';
import Modal from '@/components/Modal-search';
import { SearchOutlined } from '@ant-design/icons';
// Import magnifying glass icon from react-icons

const Hero: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalWidth, setModalWidth] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const openModal = () => {
    if (inputRef.current) {
      const width = inputRef.current.offsetWidth;
      setModalWidth(width);
      setModalOpen(true);
    }
  };

  const closeModal = () => setModalOpen(false);

  return (
    <>
      <div className="relative w-full h-[40vh] mb-10 md:mb-20">
        <img
          className="absolute inset-0 w-full h-full object-cover opacity-90"
          src="https://res.cloudinary.com/dnslrwedn/image/upload/v1726239414/nha-hang-the-log-restaurant-222_uqjc8t.jpg"
          alt="Hero"
        />

        <div className="absolute bottom-[-30px] md:bottom-[-50px] left-1/2 transform -translate-x-1/2 w-full max-w-screen-lg px-2 md:px-4">
          <div className="bg-white shadow-lg rounded-lg flex items-center p-3 md:p-6">
            {/* Search Input */}
            <div className="relative flex-grow w-full bg-white border h-12 rounded-lg">
              <input
                ref={inputRef}
                type="text"
                placeholder="Bạn muốn đặt chỗ đến đâu"
                className="w-full h-full px-4 py-2 pr-10 outline-none text-gray-600 text-sm md:text-base"
                onFocus={openModal}
              />
              {/* Magnifying glass icon inside input */}
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <SearchOutlined />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} width={modalWidth} />
    </>
  );
};

export default Hero;
