import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="w-full bg-[#312525] text-white relative ">
      <div className="max-w-[90%] md:max-w-[80%] mx-auto flex flex-col md:flex-row justify-between py-8 md:py-10 px-4 md:px-5">
        <div className="w-full md:w-1/4 mb-6 md:mb-0">
          <h3 className="text-md md:text-lg font-bold uppercase">
            Về chúng tôi
          </h3>
          <ul className="mt-3 md:mt-4 space-y-1 md:space-y-2 text-xs md:text-sm font-normal uppercase">
            <li>Chính sách đặt bàn</li>
            <li>Quy trình đặt bàn</li>
            <li>Thay đổi và hủy đặt bàn</li>
            <li>Chính sách đặc biệt</li>
          </ul>
        </div>

        <div className="w-full md:w-1/4 mb-6 md:mb-0">
          <h3 className="text-[#ffe8e8] text-md md:text-lg font-bold uppercase">
            Thông tin pháp lí
          </h3>
          <ul className="mt-3 md:mt-4 space-y-1 md:space-y-2 text-xs md:text-sm text-[#ffe8e8] font-normal uppercase">
            <li>Điều khoản dịch vụ</li>
            <li>Chính sách bảo mật</li>
            <li>Chính sách hoàn tiền</li>
            <li>Chính sách hợp tác</li>
          </ul>
        </div>

        <div className="w-full md:w-1/4 mb-6 md:mb-0">
          <h3 className="text-[#e5e8eb] text-md md:text-lg font-bold uppercase">
            Hỗ trợ
          </h3>
          <ul className="mt-3 md:mt-4 space-y-1 md:space-y-2 text-xs md:text-sm text-[#e5e8eb] font-normal uppercase">
            <li>Câu hỏi thường gặp (FAQ)</li>
            <li>Hỗ trợ trực tuyến</li>
            <li>Đánh giá và phản hồi</li>
            <li>Giờ làm việc: 24/7</li>
          </ul>
        </div>

        <div className="w-full md:w-1/4 mb-6 md:mb-0">
          <h3 className="text-[#ffe7e7] text-md md:text-lg font-semibold">
            Liên hệ
          </h3>
          <p className="text-[#ffe7e7] text-xs md:text-sm font-light mt-2">
            Địa chỉ văn phòng: [Địa chỉ văn phòng]
            <br />
            Thông tin liên lạc: [Thông tin liên lạc]
            <br />
            Email hỗ trợ: support@skedeat.site
            <br />
            Số điện thoại: (+84) 123 456 789
          </p>
          <div className="mt-4">
            <h4 className="text-[#ffe7e7] text-md md:text-lg font-semibold">
              Theo dõi chúng tôi trên mạng xã hội:
            </h4>
            <p className="text-[#ffe7e7] text-xs md:text-sm font-light mt-2">
              Facebook: facebook.com/skedeat
              <br />
              Tiktok: Skedeat
            </p>
          </div>
          <h4 className="text-[#ffe7e7] text-md md:text-lg font-semibold mt-4">
            Đăng ký email
          </h4>
          <p className="text-[#ffe7e7] text-xs md:text-sm font-light mt-2">
            Đăng ký nhận email để nhận thông tin mới nhất về các nhà hàng, món
            ăn, và chương trình khuyến mãi độc quyền.
          </p>
          <div className="mt-4">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-2 text-xs md:text-sm text-black placeholder-gray-400 rounded-md"
            />
            <button
              onClick={() => navigate('/signup')}
              className="mt-2 w-full bg-white text-black text-xs md:text-sm font-semibold py-2 rounded-md"
            >
              Đăng ký
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-600 py-4">
        <div className="max-w-[90%] md:max-w-[80%] mx-auto flex justify-between items-center text-xs md:text-sm text-gray-400">
          <div className="flex items-center">
            <div className="bg-white w-6 h-6 rounded-full flex items-center justify-center mr-2">
              <span className="text-black">C</span>
            </div>
            <p>2024 | 317.559.2041 | SkeadEat</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
