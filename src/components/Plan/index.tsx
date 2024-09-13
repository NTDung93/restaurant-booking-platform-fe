export default function Plan() {
  return (
    <div className="w-4/5 mx-auto mt-10 mb-10">
      {/* Tiêu đề */}
      <div className="text-left mb-10">
        <h2 className="text-3xl font-semibold text-black mb-8">
          Lên kế hoạch cho bữa ăn nhanh chóng
        </h2>

        {/* Các loại bữa ăn */}
        <div className="flex justify-start space-x-4 mb-10 flex-wrap">
          <button className="px-4 py-2 text-black text-lg font-normal rounded-full border border-gray-400 hover:border-gray-600 hover:bg-gray-300 transition">
            Ăn sáng
          </button>

          <button className="px-4 py-2 text-black text-lg font-normal bg-gray-200 rounded-full hover:bg-gray-300 transition">
            Ăn trưa
          </button>
          <button className="px-4 py-2 text-black text-lg font-normal bg-gray-200 rounded-full hover:bg-gray-300 transition">
            Ăn tối
          </button>
          <button className="px-4 py-2 text-black text-lg font-normal bg-gray-200 rounded-full hover:bg-gray-300 transition">
            Hẹn hò
          </button>
          <button className="px-4 py-2 text-black text-lg font-normal bg-gray-200 rounded-full hover:bg-gray-300 transition">
            Meeting
          </button>
        </div>
      </div>

      {/* Lưới 4 thẻ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* Thẻ bữa ăn */}
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="relative w-72 h-[350px] bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-shadow flex flex-col justify-between"
          >
            {/* Phần hình ảnh */}
            <div>
              <div className="w-full h-48 bg-gray-300 rounded-tl-3xl rounded-tr-3xl"></div>
              <div className="px-4 py-4">
                <h3 className="text-lg font-medium text-neutral-900 mb-2">
                  Cơm tấm Baque
                </h3>
                <p className="text-xs font-normal text-neutral-600">
                  Lorem ipsum dolor sit ame, consectetur adipiscing elit.
                </p>
              </div>
            </div>
            <div className="px-4 pb-4">
              <button className="w-32 py-2 bg-black text-white font-semibold rounded-full text-sm hover:bg-gray-800 transition mx-auto">
                Đặt ngay
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
