import React, { useState, useRef } from 'react';
import Modal from '@/components/Modal-search';

const Hero: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalWidth, setModalWidth] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const openModal = () => {
    if (inputRef.current && buttonRef.current) {
      const width =
        inputRef.current.offsetWidth + buttonRef.current.offsetWidth;
      setModalWidth(width);
      setModalOpen(true);
    }
  };

  const closeModal = () => setModalOpen(false);

  return (
    <>
      <div className="group-hero-section w-full h-[700px] relative">
        <img
          className="hero-image w-full h-[90%] object-cover absolute opacity-90"
          src="https://res.cloudinary.com/dnslrwedn/image/upload/v1726239414/nha-hang-the-log-restaurant-222_uqjc8t.jpg"
          alt="Hero"
        />

        <div className="search-bar w-[80%] max-w-[1290px] h-[125px] left-1/2 -translate-x-1/2 bottom-4 absolute bg-white shadow-lg rounded-lg flex items-center">
          <div className="location-dropdown flex items-center w-[200px] h-[60px] ml-6 bg-white border border-gray-400 rounded-lg">
            <div className="location-text text-black text-base font-medium ml-4">
              Quận 1
            </div>
            <div className="arrow-down ml-auto mr-4">
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
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          <div className="search-input flex-grow h-[60px] mx-4 bg-white border border-gray-400 rounded-lg flex items-center px-4">
            <input
              ref={inputRef}
              type="text"
              placeholder="Bạn muốn đặt chỗ đến đâu"
              className="w-full h-full outline-none text-gray-600 font-normal text-base"
              onFocus={openModal}
            />
          </div>

          <button
            ref={buttonRef}
            onClick={openModal}
            className="search-button w-[190px] h-[60px] mr-6 bg-[#d86500] rounded-lg flex items-center justify-center text-white font-medium text-base"
          >
            Tìm kiếm
          </button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} width={modalWidth} />
    </>
  );
};

export default Hero;
