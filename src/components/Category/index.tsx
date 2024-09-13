export default function Category() {
  return (
    <>
      <div className="group-category w-full h-auto flex flex-wrap justify-center items-center space-x-0 sm:space-x-8 relative mt-5">
        <div className="group-category w-4/5 h-auto flex flex-col sm:flex-row flex-wrap justify-between items-center mx-auto space-y-4 sm:space-y-0 sm:space-x-4 relative">
          <div className="category-item flex flex-col items-center w-full sm:w-1/5 text-center">
            <img
              src="https://res.cloudinary.com/dnslrwedn/image/upload/v1726238852/OBJECTS_zrhobk.png"
              alt="Lẩu"
              className="w-25 h-25 object-cover rounded-lg"
            />
            <div className="mt-4 text-black text-2xl font-medium">Lẩu</div>
          </div>
          <div className="category-item flex flex-col items-center w-full sm:w-1/5 text-center">
            <img
              src="https://res.cloudinary.com/dnslrwedn/image/upload/v1726238852/Group_ujlmvm.png"
              alt="Món Nhật"
              className="w-25 h-25 object-cover rounded-lg"
            />
            <div className="mt-4 text-black text-2xl font-medium">Món Nhật</div>
          </div>
          <div className="category-item flex flex-col items-center w-full sm:w-1/5 text-center">
            <img
              src="https://res.cloudinary.com/dnslrwedn/image/upload/v1726238853/OBJECTS_1_yy9r9d.png"
              alt="Quán nhậu"
              className="w-25 h-25 object-cover rounded-lg"
            />
            <div className="mt-4 text-black text-2xl font-medium">
              Quán nhậu
            </div>
          </div>
          <div className="category-item flex flex-col items-center w-full sm:w-1/5 text-center">
            <img
              src="https://res.cloudinary.com/dnslrwedn/image/upload/v1726238854/Group_1000002666_avvhnl.png"
              alt="Hải sản"
              className="w-25 h-25 object-cover rounded-lg"
            />
            <div className="mt-4 text-black text-2xl font-medium">Hải sản</div>
          </div>
        </div>
      </div>
    </>
  );
}
