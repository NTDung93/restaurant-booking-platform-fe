export default function Video() {
  return (
    <div className="w-4/5 mx-auto mt-5">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 h-96 md:h-100 bg-gray-300 flex items-center justify-center mb-4 md:mb-0">
          {/* Thay video bằng img */}
          <img
            src="https://res.cloudinary.com/dnslrwedn/image/upload/v1727065395/image_15_kkeucl.png"
            alt="Restaurant Experience"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 h-60 md:h-100 p-4">
          <div className="w-full h-14 text-black text-xl md:text-2xl font-bold font-['Inter'] mb-2">
            TRẢI NGHIỆM KHÔNG GIAN NHÀ HÀNG SANG TRỌNG
          </div>
          <div className="w-full h-48 md:h-80 text-black text-base md:text-xl font-normal font-['Inter'] mt-8">
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
