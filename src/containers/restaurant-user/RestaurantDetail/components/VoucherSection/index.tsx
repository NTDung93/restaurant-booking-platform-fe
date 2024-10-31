import React from 'react';

const VoucherSection: React.FC = () => (
  <div className="w-full max-w-screen-xl mx-auto mt-10 px-4">
    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 text-center">
      Voucher
    </h2>
    <div
      className="relative bg-gradient-to-br from-yellow-50 to-amber-100 text-gray-800 mt-8 p-8 rounded-2xl shadow-xl border border-amber-200 w-full md:w-2/5 mx-auto flex flex-col justify-between"
      style={{ height: '220px' }}
    >
      <div className="flex-grow">
        <p className="text-lg md:text-xl font-semibold mb-4 text-center leading-relaxed">
          Nhập mã: <span className="font-bold text-red-500">COMTAM10</span> để
          được giảm 10% cho đơn hàng từ 100,000đ trở lên.
        </p>
      </div>

      <div className="border-t-2 border-dashed border-amber-300 my-4 w-full"></div>

      <div className="flex justify-center">
        <button className="bg-red-500 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-red-600 transition duration-300 shadow-lg">
          Sử dụng mã: COMTAM10
        </button>
      </div>
    </div>
  </div>
);

export default VoucherSection;
