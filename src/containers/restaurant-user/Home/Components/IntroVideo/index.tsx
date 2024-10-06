import { useEffect, useRef, useState } from 'react';

export default function IntroVideo() {
  const videoRef = useRef(null);
  const [isVideoVisible, setIsVideoVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsVideoVisible(true);
        } else {
          setIsVideoVisible(false);
        }
      },
      { threshold: 0.5 }, // 50% of the video must be visible
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <div className="mobile:max-md:w-[90%] w-[80%] mx-auto lg:mt-20 mt-10">
      <div className="flex flex-col md:flex-row">
        <div
          className="w-full md:w-1/2 h-60 md:h-96 bg-gray-300 flex items-center justify-center"
          ref={videoRef}
        >
          {isVideoVisible && (
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/NmrnXic2eUs?autoplay=1&mute=1"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </div>
        <div className="w-full md:w-1/2 h-auto lg:p-4 pt-4">
          <div className="w-full text-black text-lg md:text-2xl font-bold">
            TRẢI NGHIỆM KHÔNG GIAN NHÀ HÀNG SANG TRỌNG
          </div>
          <div className="w-full lg:mt-4 mt-2 text-black text-sm md:text-lg">
            Khi bước vào Pizza 4P's Lê Đại Hành, bạn sẽ bị cuốn hút bởi không
            gian vừa hiện đại vừa ấm cúng. Thiết kế mở với những khung cửa kính
            lớn cho phép ánh sáng tự nhiên tràn ngập, tạo cảm giác thoáng đãng
            và dễ chịu, tạo ra một môi trường cởi mở và thư giãn với các cổng
            cong và phân vùng tạo cảm giác gần gũi hơn cho thực khách, đồng thời
            sử dụng vật liệu tự nhiên như bê tông, gỗ và terrazzo.
          </div>
        </div>
      </div>
    </div>
  );
}
