import React from 'react';

const VoucherSection: React.FC = () => (
  <div className="w-full max-w-screen-xl mx-auto mt-10 px-4">
    <h2 className="text-3xl md:text-5xl font-bold text-black">Voucher</h2>
    <div
      className="relative bg-amber-100 text-black mt-6 p-6 rounded-lg shadow-lg border-2  w-full md:w-2/5 mx-auto flex flex-col justify-between"
      style={{ height: '200px' }}
    >
      <div className="flex-grow">
        <p className="text-lg md:text-xl font-medium mb-4">
          Nhập mã: <span className="font-bold text-red-600">COMTAM10</span> để
          được giảm 10% cho đơn hàng từ 100,000đ trở lên.
        </p>
      </div>

      <div className="border-t-2 border-dashed border-black my-4 w-full"></div>

      <div className="flex justify-center items-center">
        <button className="bg-red-600 text-white px-6 py-2 rounded-lg font-medium text-lg hover:bg-red-700 transition duration-300">
          COMTAM10
        </button>
      </div>
    </div>
  </div>
);

export default VoucherSection;
