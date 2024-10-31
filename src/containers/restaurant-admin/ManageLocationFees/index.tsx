import Header from '@/components/restaurant-admin/Header';
import Menu from '@/components/restaurant-admin/Menu';
import { useEffect, useState } from 'react';
import Image from '@/components/restaurant-admin/Img';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserInfo } from '@/containers/restaurant-user/Auth/selector';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ReduxDispatch } from '@/libs/redux/store';
import { getFeesOfLocation } from './selector';
import { fetchFeesOfLocation } from './thunks';
import { CreatePaymentDto } from '@/common/models/booking';
import { createPaymentLink } from '@/containers/restaurant-user/Comfirm/thunks';
import { toast } from 'react-toastify';
import { Spin } from 'antd';

const FeeManagementPage = () => {
  interface CommissionData {
    month: string;
    commission: number;
    fixedFee: number;
  }

  interface Item {
    name: string;
    quantity: number;
    price: number;
  }

  const userInfo = useSelector(selectUserInfo);

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch<ReduxDispatch>();
  const monthlyCommission = useSelector(getFeesOfLocation);

  const [yearlyData, setYearlyData] = useState<CommissionData[]>([]);

  useEffect(() => {
    dispatch(fetchFeesOfLocation({ month: selectedMonth, year: selectedYear }));
  }, [dispatch, selectedMonth, selectedYear]);

  useEffect(() => {
    const fetchYearlyData = async () => {
      const promises = Array.from({ length: 12 }, (_, index) =>
        dispatch(fetchFeesOfLocation({ month: index + 1, year: selectedYear })),
      );
      const results = await Promise.all(promises);

      const formattedData = results.map((result, index) => {
        const data = result.payload;
        return {
          month: `Tháng ${index + 1}`,
          commission: data?.totalAmount || 0,
          fixedFee: data?.fixedAmount || 0,
        };
      });

      setYearlyData(formattedData);
    };

    fetchYearlyData();
  }, [dispatch, selectedMonth, selectedYear]);

  const totalCommission = monthlyCommission?.totalAmount || 0;
  const fixedAmount = monthlyCommission?.fixedAmount || 0;
  const totalAmount = totalCommission + fixedAmount;
  const paymentStatus = monthlyCommission
    ? monthlyCommission.isPaid
      ? 'Đã thanh toán'
      : 'Chưa thanh toán'
    : 'Chưa có dữ liệu';
  const paymentDeadline = monthlyCommission?.expiredAt
    ? new Date(monthlyCommission?.expiredAt)
    : null;

  const paymentStatusColor =
    paymentStatus === 'Chưa thanh toán'
      ? 'bg-red-100 text-red-600 px-3 py-2 rounded-lg'
      : paymentStatus === 'Đã thanh toán'
        ? 'bg-green-100 text-green-600 px-3 py-2 rounded-lg'
        : 'bg-gray-100 text-gray-600 px-3 py-2 rounded-lg';

  const formatDate = (date: Date | null): string => {
    if (!date) return 'Chưa có dữ liệu';
    return date.toLocaleString();
  };

  const handlePayment = async () => {
    try {
      setLoading(true);

      const items: Item[] = [
        {
          name: `Commissions in Month ${selectedMonth} and Year ${selectedYear}`,
          quantity: 1,
          price: monthlyCommission?.totalAmount ?? 0, // Price is based on quantity * unit price
        },
        {
          name: `Fixed Amount in Month ${selectedMonth} and Year ${selectedYear}`,
          quantity: 1,
          price: monthlyCommission?.fixedAmount ?? 0, // Price is based on quantity * unit price
        },
      ];

      const paymentData: CreatePaymentDto = {
        buyerName: userInfo?.fullName || 'Unknown Buyer',
        buyerPhone: userInfo?.phone || 'Unknown Phone',
        description: 'Payment monthly',
        returnUrl: 'https://skedeat.site/manage/fees',
        cancelUrl: 'https://skedeat.site/manage/fees',
        paymentType: 'ORDER',
        items: items,
      };

      const paymentResponse = await dispatch(createPaymentLink(paymentData));

      if (paymentResponse.meta.requestStatus === 'fulfilled') {
        const checkoutUrl = paymentResponse.payload; // Directly use the payload since it should be a string

        if (checkoutUrl) {
          toast.success('Đặt bàn thành công!', {
            position: 'top-right',
            autoClose: 3000,
          });
          window.location.href = checkoutUrl;
        } else {
          toast.error('Không tìm thấy đường dẫn thanh toán.');
        }
      } else {
        toast.error('Tạo liên kết thanh toán không thành công.');
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Header />
      <div className="mt-[100px] flex min-h-screen">
        {/* Fixed Menu */}
        <div className="fixed top-[100px] left-0 w-[15vw]">
          <Menu />
        </div>

        {/* Main Content */}
        <div className="ml-[15vw] w-[85vw] flex flex-col overflow-y-auto">
          <Image />

          <div className="p-8 bg-background text-foreground space-y-10 mx-5">
            {/* Fee Comparison Chart */}
            <h2 className="text-3xl text-amber-600 font-bold text-left mb-6">
              So sánh chi phí
            </h2>
            <div className="bg-white rounded-lg shadow-md p-4 mb-10">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={yearlyData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="fixedFee"
                    fill="#ffcc00"
                    name="Khoảng Phí Cố Định"
                  />
                  <Bar
                    dataKey="commission"
                    fill="#ff9900"
                    name="Khoảng Phí Hoa Hồng"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="flex justify-between mb-6">
              <h1 className="text-3xl font-bold text-left text-black mb-2">
                Quản lý Khoảng Phí
              </h1>
              <div className="flex space-x-4">
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(Number(e.target.value))}
                  className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-amber-600"
                >
                  {Array.from({ length: currentMonth }, (_, i) => (
                    <option key={i} value={i + 1}>
                      Tháng {i + 1}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-amber-600"
                >
                  <option value={currentYear}>Năm {currentYear}</option>
                  <option value={currentYear - 1}>Năm {currentYear - 1}</option>
                </select>
              </div>
            </div>

            <div className="flex justify-between bg-white rounded-lg shadow-md p-6 mb-10">
              {/* Left side: Fee information */}
              <div className="flex flex-col w-1/2 pr-4">
                <h2 className="text-2xl font-semibold text-amber-600 mb-4">
                  Khoảng Phí
                </h2>
                <div className="flex justify-between border-b-2 pb-2 mb-4">
                  <span className="font-semibold text-lg">
                    Khoảng Phí Cố Định Hàng Tháng:
                  </span>
                  <span className="text-amber-600 font-semibold text-lg">
                    {fixedAmount.toLocaleString()} VNĐ
                  </span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="font-semibold text-lg">
                    Khoảng Phí Hoa Hồng:
                    <span className="text-red-400">
                      {' '}
                      x{totalCommission / 20000} x 20.000VNĐ
                    </span>
                  </span>
                  <span className="text-amber-600 font-semibold text-lg">
                    {totalCommission.toLocaleString()} VNĐ
                  </span>
                </div>
                <div className="mt-10">
                  <div className="flex justify-between mb-4">
                    <span className="font-semibold text-xl">Tổng Tiền:</span>
                    <span className="text-amber-600 text-xl font-bold">
                      {totalAmount.toLocaleString()} VNĐ
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">
                      Trạng Thái Thanh Toán:
                    </span>
                    <span className={`${paymentStatusColor} text-xl font-bold`}>
                      {paymentStatus}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right side: Payer information */}
              <div className="flex flex-col w-1/2 pl-4 border-l">
                <h2 className="text-2xl font-bold text-amber-600 mb-4">
                  Thông Tin Người Thanh Toán
                </h2>
                <div className="flex justify-between mb-3">
                  <span className="font-semibold text-lg">Tên:</span>
                  <span className="text-lg font-semibold">
                    {userInfo?.fullName}
                  </span>
                </div>
                <div className="flex justify-between mb-3">
                  <span className="font-semibold text-lg">Số Điện Thoại:</span>
                  <span className="text-lg font-semibold">
                    {userInfo?.phone}
                  </span>
                </div>
                <div className="flex justify-between mb-3">
                  <span className="text-lg font-semibold">Email:</span>
                  <span className="text-lg font-semibold">
                    {userInfo?.email}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-lg">Hạn Thanh Toán:</span>
                  <span className="text-lg font-semibold text-red-400">
                    {formatDate(paymentDeadline)}
                  </span>
                </div>

                <div className="flex justify-end mt-10">
                  <button
                    onClick={handlePayment}
                    disabled={totalAmount === 0} // Disable button if totalAmount is 0
                    className={`${
                      loading || totalAmount === 0
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-amber-600 text-white hover:bg-amber-700'
                    } text-xl font-semibold text-white px-3 py-3 rounded-md mt-3`}
                  >
                    {loading ? (
                      <Spin size="small" className="px-3 py-3" />
                    ) : (
                      'Thanh toán'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeeManagementPage;
