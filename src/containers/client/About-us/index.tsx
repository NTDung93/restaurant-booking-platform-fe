import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function AboutUs() {
  const [openQuestionIndex, setOpenQuestionIndex] = useState<number | null>(
    null,
  );

  const faqData: FAQItem[] = [
    {
      question: 'SkedEat là gì?',
      answer:
        'SkedEat là nền tảng trực tuyến giúp bạn đặt bàn trước tại các nhà hàng và quán ăn trên toàn quốc một cách nhanh chóng và tiện lợi.',
    },
    {
      question: 'Làm thế nào để đặt bàn qua SkedEat?',
      answer:
        'Bạn chỉ cần truy cập vào website hoặc ứng dụng SkedEat, tìm nhà hàng yêu thích, chọn thời gian và số lượng khách, sau đó nhấn “Đặt bàn”. Bạn sẽ nhận được xác nhận đặt bàn ngay lập tức.',
    },
    {
      question: 'Có phí khi đặt bàn qua SkedEat không?',
      answer:
        'Việc đặt bàn qua SkedEat hoàn toàn miễn phí. Bạn chỉ cần thanh toán cho nhà hàng theo hóa đơn khi dùng bữa.',
    },
    {
      question: 'Tôi có thể hủy hoặc thay đổi đặt bàn như thế nào?',
      answer:
        "Bạn có thể hủy hoặc thay đổi đặt bàn bằng cách đăng nhập vào tài khoản SkedEat của mình và chọn mục 'Quản lý đặt bàn'. Tại đây, bạn sẽ thấy các lựa chọn để hủy hoặc điều chỉnh thời gian đặt.",
    },
    {
      question: 'SkedEat có cung cấp ưu đãi hay khuyến mãi gì không?',
      answer:
        'Có, SkedEat thường xuyên có các chương trình khuyến mãi và ưu đãi đặc biệt dành cho người dùng. Hãy theo dõi trang web hoặc đăng ký nhận tin để không bỏ lỡ cơ hội!',
    },
    {
      question: 'Nhà hàng có cần xác nhận lại đặt bàn không?',
      answer:
        'Sau khi bạn đặt bàn thành công trên SkedEat, nhà hàng sẽ xác nhận thông qua hệ thống của chúng tôi. Bạn có thể yên tâm đến nhà hàng theo thời gian đã đặt mà không cần xác nhận thêm.',
    },
    {
      question: 'Tôi có thể xem thực đơn nhà hàng trước khi đặt bàn không?',
      answer:
        'Có, trên SkedEat, bạn có thể xem thực đơn của các nhà hàng, đánh giá từ người dùng và các hình ảnh thực tế trước khi quyết định đặt bàn.',
    },
    {
      question:
        'Tôi có thể đặt bàn cho các sự kiện lớn như tiệc sinh nhật hoặc hội nghị không?',
      answer:
        'Tất nhiên! SkedEat hỗ trợ đặt bàn cho các sự kiện lớn với số lượng khách lớn. Bạn chỉ cần liên hệ trực tiếp với chúng tôi để được hỗ trợ chi tiết.',
    },
    {
      question: 'SkedEat có những nhà hàng nào gần vị trí của tôi?',
      answer:
        "Chức năng 'Nhà hàng gần tôi' sẽ giúp bạn tìm kiếm các địa điểm phù hợp với vị trí hiện tại của mình. Bạn có thể lựa chọn nhà hàng theo loại hình ẩm thực, giá cả, hoặc khoảng cách.",
    },
    {
      question: 'Tôi cần hỗ trợ thêm, liên hệ với ai?',
      answer:
        "Nếu bạn cần hỗ trợ, hãy liên hệ với đội ngũ chăm sóc khách hàng của chúng tôi qua mục 'Liên hệ' trên website, hoặc gọi trực tiếp đến hotline để được giải đáp nhanh chóng.",
    },
  ];

  const toggleQuestion = (index: number) => {
    setOpenQuestionIndex(openQuestionIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Header />
        <div className="p-4 mx-auto max-w-screen-lg w-11/12">
          <h1 className="text-2xl font-bold mb-4">Giới thiệu về SkedEat</h1>
          <p className="mb-4">
            SkedEat là nền tảng booking trực tuyến dành cho quán ăn, nhà hàng.
            Chờ đợi và không biết ăn gì luôn là nỗi lo âu đối với khách hàng.
            Chúng tôi ở đây để phục vụ, lên lịch, gợi ý đa dạng những quán ăn,
            nhà hàng về ẩm thực Việt Nam ngoài nước nhanh chóng và tiện lợi.
          </p>
          <p className="mb-4">
            SkedEat là nền tảng đặt bàn nhà hàng và quán ăn hàng đầu, mang đến
            cho thực khách trải nghiệm tiện lợi và nhanh chóng khi khám phá ẩm
            thực tại các địa điểm nổi tiếng. Với sứ mệnh kết nối người dùng với
            hệ sinh thái nhà hàng phong phú, chúng tôi cam kết mang lại dịch vụ
            tốt nhất, giúp việc đặt bàn trở nên dễ dàng hơn bao giờ hết.
          </p>
          <p className="mb-4">
            Tại SkedEat, chúng tôi luôn đặt trải nghiệm khách hàng lên hàng đầu.
            Hệ thống đặt bàn thông minh, giao diện thân thiện cùng với hàng loạt
            ưu đãi hấp dẫn dành riêng cho người dùng mới và khách hàng trung
            thành, tất cả được thiết kế để mang lại sự hài lòng tối đa. Ngoài
            ra, với sự hỗ trợ của đội ngũ chăm sóc khách hàng chuyên nghiệp,
            chúng tôi luôn sẵn sàng giải quyết mọi thắc mắc và hỗ trợ nhanh
            chóng.
          </p>
          <h2 className="text-xl font-semibold mb-2">
            Quyền lợi khách hàng khi sử dụng SkedEat
          </h2>
          <ul className="list-disc pl-6 mb-4">
            <li>
              Đặt bàn dễ dàng và nhanh chóng: Khách hàng có thể dễ dàng đặt bàn
              tại nhà hàng yêu thích chỉ với vài cú nhấp chuột, mà không cần
              phải chờ đợi hoặc gọi điện xác nhận.
            </li>
            <li>
              Ưu đãi và khuyến mãi hấp dẫn: SkedEat thường xuyên có các chương
              trình ưu đãi, khuyến mãi đặc biệt dành cho khách hàng mới và khách
              hàng thân thiết.
            </li>
            <li>
              Đa dạng nhà hàng, nhiều lựa chọn ẩm thực: SkedEat hợp tác với
              nhiều nhà hàng, từ quán ăn đường phố đến nhà hàng cao cấp.
            </li>
            <li>
              Xem đánh giá và thực đơn trước khi đặt bàn: Khách hàng có thể xem
              thực đơn, hình ảnh và đánh giá từ các khách hàng trước đó.
            </li>
            <li>
              Hỗ trợ khách hàng chuyên nghiệp: Đội ngũ chăm sóc khách hàng của
              SkedEat luôn sẵn sàng hỗ trợ bạn 24/7.
            </li>
            <li>
              Tiện lợi, không cần thanh toán trước: Việc đặt bàn qua SkedEat
              hoàn toàn miễn phí.
            </li>
          </ul>
          <h2 className="text-xl font-semibold mb-2">
            Quyền lợi đối tác khi hợp tác với SkedEat
          </h2>
          <ul className="list-disc pl-6 mb-4">
            <li>Tiếp cận lượng khách hàng tiềm năng lớn.</li>
            <li>Quảng bá thương hiệu hiệu quả.</li>
            <li>Hỗ trợ truyền thông và marketing.</li>
            <li>Quản lý đặt bàn thông minh.</li>
            <li>Tăng doanh thu từ các chương trình khuyến mãi.</li>
            <li>Hỗ trợ kỹ thuật và chăm sóc đối tác.</li>
          </ul>

          {/* Phần Câu Hỏi Thường Gặp (FAQ) */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 text-stone-900">
              Câu Hỏi Thường Gặp (FAQ) - SkedEat
            </h2>
            <div className="space-y-4">
              {faqData.map((item, index) => (
                <div key={index}>
                  <div
                    className="bg-white shadow rounded-lg p-4 transition hover:bg-gray-100 cursor-pointer"
                    onClick={() => toggleQuestion(index)}
                  >
                    <div className="flex justify-between items-center">
                      <div className="text-xl font-bold text-stone-900">
                        {item.question}
                      </div>
                      <div className="text-stone-900 text-xl font-black">
                        {openQuestionIndex === index ? (
                          <UpOutlined />
                        ) : (
                          <DownOutlined />
                        )}
                      </div>
                    </div>
                  </div>
                  {openQuestionIndex === index && (
                    <div className="bg-gray-100 rounded-lg p-4 mt-2 text-stone-800">
                      {item.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
