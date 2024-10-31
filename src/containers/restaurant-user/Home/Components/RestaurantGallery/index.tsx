export default function RestaurantGallery() {
  return (
    <div className="hidden lg:block w-4/5 mx-auto mt-2 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-5 w-full md:h-[600px] gap-2">
        <div className="hidden md:col-span-2 md:flex flex-col gap-2">
          <div className="flex-1 flex flex-col md:flex-row">
            <img
              src="https://res.cloudinary.com/dnslrwedn/image/upload/v1727064584/image_i07eps.png"
              alt="Image 1"
              className="w-[45%] h-auto object-cover mb-1 md:mb-0 md:mr-1 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:opacity-90 md:flex-1"
            />
            <img
              src="https://res.cloudinary.com/dnslrwedn/image/upload/v1727081570/image_1_r4abui.png"
              alt="Image 2"
              className="w-[55%] h-auto object-cover mt-1 md:mt-0 md:ml-1 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:opacity-90 md:flex-1"
            />
          </div>
          <img
            src="https://res.cloudinary.com/dnslrwedn/image/upload/v1727064584/image_21_ohujuf.png"
            alt="Image 3"
            className="flex-1 object-cover h-full transition-transform duration-300 ease-in-out transform hover:scale-105 hover:opacity-90"
          />
        </div>

        <img
          src="https://res.cloudinary.com/dnslrwedn/image/upload/v1727064585/image_2_psvduu.png"
          alt="Image 4"
          className="hidden md:block h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-105 hover:opacity-90"
        />
        <img
          src="https://res.cloudinary.com/dnslrwedn/image/upload/v1727064587/image_4_jssjpu.png"
          alt="Image 5"
          className="hidden md:block h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-105 hover:opacity-90"
        />
        <img
          src="https://res.cloudinary.com/dnslrwedn/image/upload/v1727064584/image_3_gu60bh.png"
          alt="Image 6"
          className="hidden md:block h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-105 hover:opacity-90"
        />
      </div>
    </div>
  );
}
