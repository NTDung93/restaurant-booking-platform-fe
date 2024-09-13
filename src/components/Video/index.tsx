export default function Video() {
  return (
    <div className="w-4/5 mx-auto mt-5">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 h-96 md:h-100 bg-gray-300 flex items-center justify-center mb-4 md:mb-0">
          <video className="w-full h-full object-cover" controls>
            <source src="path_to_your_video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="w-full md:w-1/2 h-60 md:h-100 p-4">
          <div className="w-full h-14 text-black text-xl md:text-2xl font-bold font-['Inter'] mb-2">
            TRẢI NGHIỆM KHÔNG GIAN NHÀ HÀNG SANG TRỌNG
          </div>
          <div className="w-full h-48 md:h-80 text-black text-base md:text-xl font-normal font-['Inter'] mt-8">
            Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod
            tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrum exercitationem ullam corporis suscipit
            laboriosam, nisi ut aliquid ex ea commodi consequatur.
          </div>
        </div>
      </div>
    </div>
  );
}
