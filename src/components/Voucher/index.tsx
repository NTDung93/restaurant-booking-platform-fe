export default function Voucher() {
  return (
    <>
      <div className="voucher-container w-4/5 mx-auto flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
        <div className="voucher-item sm:w-1/3">
          <img
            className="w-full h-64 object-cover rounded-lg"
            src="https://res.cloudinary.com/dnslrwedn/image/upload/v1726238576/voucher_1_1_itfnop.png"
            alt="Voucher 1"
          />
        </div>

        <div className="voucher-item sm:w-1/3">
          <img
            className="w-full h-64 object-cover rounded-lg"
            src="https://res.cloudinary.com/dnslrwedn/image/upload/v1726238576/voucher_2_1_kzkgov.png"
            alt="Voucher 2"
          />
        </div>

        <div className="voucher-item sm:w-1/3">
          <img
            className="w-full h-64 object-cover rounded-lg"
            src="https://res.cloudinary.com/dnslrwedn/image/upload/v1726238576/voucher_3_1_bupzon.png"
            alt="Voucher 3"
          />
        </div>
      </div>
    </>
  );
}
