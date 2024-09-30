export default function Image() {
  return (
    <div className="w-4/5 mx-auto mt-2 mb-20">
      <div className="grid grid-cols-1 md:grid-cols-5 w-full md:h-[600px] gap-2">
        <div className="hidden md:col-span-2 md:flex flex-col gap-2">
          <div className="flex-1 flex flex-col md:flex-row">
            <img
              src="https://res.cloudinary.com/dnslrwedn/image/upload/v1727064584/image_i07eps.png"
              alt="Image 1"
              className="w-full md:w-1/2 object-cover mb-1 md:mb-0 md:mr-1"
            />
            <img
              src="https://res.cloudinary.com/dnslrwedn/image/upload/v1727081570/image_1_r4abui.png"
              alt="Image 2"
              className="w-full md:w-1/2 object-cover mt-1 md:mt-0 md:ml-1 "
            />
          </div>
          <img
            src="https://res.cloudinary.com/dnslrwedn/image/upload/v1727064584/image_21_ohujuf.png"
            alt="Image 3"
            className="flex-1 object-cover  "
          />
        </div>

        <img
          src="https://res.cloudinary.com/dnslrwedn/image/upload/v1727064585/image_2_psvduu.png"
          alt="Image 4"
          className="hidden md:block h-full object-cover mr-36"
        />
        <img
          src="https://res.cloudinary.com/dnslrwedn/image/upload/v1727064587/image_4_jssjpu.png"
          alt="Image 5"
          className="hidden md:block h-full object-cover"
        />
        <img
          src="https://res.cloudinary.com/dnslrwedn/image/upload/v1727064584/image_3_gu60bh.png"
          alt="Image 6"
          className="hidden md:block h-full object-cover"
        />
      </div>
    </div>
  );
}
