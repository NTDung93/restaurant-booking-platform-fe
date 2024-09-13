export default function Image() {
  return (
    <div className="w-4/5 mx-auto mt-10 mb-10">
      <div className="grid grid-cols-1 md:grid-cols-5 w-full md:h-[600px] gap-2">
        <div className="hidden md:col-span-2 md:flex flex-col gap-2">
          <div className="flex-1 flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 bg-black mb-1 md:mb-0 md:mr-1"></div>
            <div className="w-full md:w-1/2 bg-purple-500 mt-1 md:mt-0 md:ml-1"></div>
          </div>
          <div className="flex-1 bg-red-500"></div>
        </div>

        <div className="hidden md:block bg-green-500 h-full"></div>

        <div className="hidden md:block bg-blue-500 h-full"></div>

        <div className="hidden md:block bg-yellow-500 h-full"></div>
      </div>
    </div>
  );
}
