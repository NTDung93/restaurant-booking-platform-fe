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
      <div className="relative w-full h-[400px] md:h-[700px] mb-20">
        <img
          className="absolute inset-0 w-full h-full object-cover opacity-90"
          src="https://res.cloudinary.com/dnslrwedn/image/upload/v1726239414/nha-hang-the-log-restaurant-222_uqjc8t.jpg"
          alt="Hero"
        />

        <div className="absolute bottom-[-50px] left-1/2 transform -translate-x-1/2 w-full max-w-screen-lg px-4">
          <div className="bg-white shadow-lg rounded-lg flex flex-col md:flex-row items-center p-4 md:p-6 space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex items-center w-full md:w-auto bg-white border border-gray-400 rounded-lg">
              <div className="text-black text-base font-medium ml-4">
                Quận 1
              </div>
              <div className="ml-auto mr-4">
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

            <div className="flex-grow bg-white border border-gray-400 rounded-lg ">
              <input
                ref={inputRef}
                type="text"
                placeholder="Bạn muốn đặt chỗ đến đâu"
                className="w-full h-full px-4 py-2 outline-none text-gray-600 text-base"
                onFocus={openModal}
              />
            </div>

            <button
              ref={buttonRef}
              onClick={openModal}
              className="bg-[#d86500] rounded-lg flex items-center justify-center text-white font-medium text-base px-6 py-3"
            >
              Tìm kiếm
            </button>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} width={modalWidth} />
    </>
  );
};

export default Hero;
