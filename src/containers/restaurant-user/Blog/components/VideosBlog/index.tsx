export default function VideosBlog() {
  return (
    <>
      <div className="flex-grow py-8">
        <div className="w-[80%] mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Review Quán Ăn / Video
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, idx) => (
              <div
                key={idx}
                className="bg-white shadow rounded-lg overflow-hidden"
              >
                <div className="relative h-60 bg-gray-300 flex items-center justify-center">
                  <div className="w-12 h-12 bg-black bg-opacity-50 rounded-full flex items-center justify-center cursor-pointer">
                    {/* Icon placeholder */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14.752 11.168l-6.518 3.73A1 1 0 017 14.097V9.903a1 1 0 011.234-.97l6.518 3.73a1 1 0 010 1.736z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    Lorem ipsum dolor sit
                  </h3>
                  <p className="text-sm text-gray-500">
                    Lorem ipsum dolor sit amet consectetur. Ac hac sociis arcu
                    aenean mi. Et habitant ullamcorper amet egestas.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
