import Footer from '@/components/Footer';
import Header from '@/components/Header';
import VideosBlog from '@/components/Videos-blog';

export default function Blog() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <VideosBlog />
      <div className="flex-grow p-4">
        <div className="w-[80%] mx-auto max-w-[80%]">
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
            <div className="lg:col-span-7">
              <h1 className="text-6xl font-bold text-black mb-12">
                Bài viết mới
              </h1>
              <div className="flex flex-col md:flex-row items-start mb-16">
                <div className="w-full md:w-72 h-72 bg-stone-300 mr-0 md:mr-8 mb-4 md:mb-0" />
                <div className="max-w-md">
                  <div className="text-gray-500 text-xs flex items-center mb-4">
                    <i className="calendar-icon mr-2" />
                    08/08/2024
                  </div>
                  <h2 className="text-xl font-semibold mb-4">
                    Top 10 Nhà Hàng Sang Trọng Tại Sài Gòn Không Thể Bỏ Lỡ
                  </h2>
                  <p className="text-lg text-black">
                    TP. Hồ Chí Minh là điểm đến của vô số nhà hàng sang trọng,
                    nơi bạn có thể thưởng thức những bữa ăn tuyệt vời trong
                    không gian tinh tế. Dưới đây là top 10 nhà hàng sang trọng
                    tại Sài Gòn được yêu thích nhất...
                  </p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-start mb-16">
                <div className="w-full md:w-72 h-72 bg-stone-300 mr-0 md:mr-8 mb-4 md:mb-0" />
                <div className="max-w-md">
                  <div className="text-gray-500 text-xs flex items-center mb-4">
                    <i className="calendar-icon mr-2" />
                    15/08/2024
                  </div>
                  <h2 className="text-xl font-semibold mb-4">
                    Những Nhà Hàng Chay Tốt Nhất Tại Sài Gòn Dành Cho Bạn
                  </h2>
                  <p className="text-lg text-black">
                    Nếu bạn đang tìm kiếm một trải nghiệm ẩm thực chay ngon và
                    lành mạnh, TP. Hồ Chí Minh có nhiều nhà hàng chay tuyệt vời
                    để lựa chọn. Đây là danh sách những nhà hàng chay hàng
                    đầu...
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-3">
              <div className="bg-white shadow-lg rounded-lg p-6">
                <div className="w-96 h-10 relative mb-6">
                  <input
                    type="text"
                    placeholder="Tìm Kiếm"
                    className="w-full h-full pl-4 pr-12 rounded-2xl border border-black text-base text-zinc-500"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11 4a7 7 0 100 14 7 7 0 000-14zm0 0l7 7"
                      />
                    </svg>
                  </div>
                </div>

                <h3 className="text-2xl font-semibold mb-6">
                  BÀI VIẾT MỚI NHẤT
                </h3>

                <div className="space-y-6">
                  {[1, 2, 3, 4].map((_item, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-20 h-20 bg-zinc-300 rounded-lg mr-4" />
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold mb-2 leading-tight">
                          {index === 0
                            ? 'Top 5 Món Ăn Đường Phố Sài Gòn Bạn Phải Thử Một Lần Trong Đời'
                            : index === 1
                              ? 'Thưởng Thức Hải Sản Tươi Ngon Tại Các Nhà Hàng Sài Gòn'
                              : index === 2
                                ? 'Những Nhà Hàng Buffet Đẳng Cấp Tại Sài Gòn Dành Cho Các Tín Đồ Ẩm Thực'
                                : 'Những Món Ăn Đặc Sản Miền Trung Tại Các Nhà Hàng Sài Gòn'}
                        </h4>
                        <div className="text-gray-500 text-xs flex items-center">
                          <i className="calendar-icon mr-2" />
                          01 Th6 2023
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
