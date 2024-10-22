import React from 'react';
import { message, Modal } from 'antd';
import Header from '@/components/restaurant-admin/Header';
import Image from '@/components/restaurant-admin/Img';
import Menu from '@/components/restaurant-admin/Menu';

const ManageAdvertisingCampaign: React.FC = () => {
  const showToast = (title: string, content: string) => {
    message.success({
      content: content,
      key: title,
      duration: 3, // Duration in seconds
    });
  };

  const handleRegister = (campaignName: string) => {
    Modal.confirm({
      title: `Xác nhận đăng ký ${campaignName}`,
      content: 'Bạn có chắc chắn muốn đăng ký chiến dịch này?',
      onOk() {
        showToast(
          'Đăng ký thành công',
          'Bạn đã đăng ký chiến dịch thành công, chúng tôi sẽ liên lạc với bạn sau ít phút',
        );
      },
    });
  };

  return (
    <>
      <Header />
      <div className="mt-[100px] flex min-h-screen">
        <Menu />
        <div className="w-[85vw] flex flex-col ">
          <Image />
          <div className="ml-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">
              Chiến dịch quảng cáo
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative bg-zinc-300 p-4 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-black mb-2">
                  Khuyễn mãi cuối tuần
                </h2>
                <p className="text-black text-xl font-normal mb-4">
                  Thời gian chương trình: 00:00:00 01-10-2024 đến 23:59:59
                  31-10-2024
                  <br />
                  <span className="text-green-600">Đang diễn ra</span>
                </p>
                <button
                  className="w-48 h-10 bg-amber-600 rounded-2xl text-white text-xl font-bold flex justify-center items-center"
                  onClick={() => handleRegister('Khuyễn mãi cuối tuần')}
                >
                  Đăng ký ngay
                </button>
              </div>
              <div className="relative bg-zinc-300 p-4 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-black mb-2">
                  Halloween
                </h2>
                <p className="text-black text-xl font-normal mb-4">
                  Thời gian chương trình: 00:00:00 21-10-2024 đến 23:59:59
                  31-10-2024
                  <br />
                  <span className="text-green-600">Đang diễn ra</span>
                </p>
                <button
                  className="w-48 h-10 bg-amber-600 rounded-2xl text-white text-xl font-bold flex justify-center items-center"
                  onClick={() => handleRegister('Halloween')}
                >
                  Đăng ký ngay
                </button>
              </div>
              <div className="relative bg-zinc-300 p-4 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-black mb-2">
                  Khuyến mãi tháng 11
                </h2>
                <p className="text-black text-xl font-normal mb-4">
                  Thời gian chương trình: 00:00:00 01-11-2024 đến 23:59:59
                  30-10-2024
                  <br />
                  <span className="text-red-600">Sắp diễn ra</span>
                </p>
                <button
                  className="w-48 h-10 bg-amber-600 rounded-2xl text-white text-xl font-bold flex justify-center items-center"
                  onClick={() => handleRegister('Khuyến mãi tháng 11')}
                >
                  Đăng ký ngay
                </button>
              </div>
              <div className="relative bg-zinc-300 p-4 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-black mb-2">
                  Mừng ngày nhà giáo 20/11
                </h2>
                <p className="text-black text-xl font-normal mb-4">
                  Thời gian chương trình: 00:00:00 01-11-2024 đến 23:59:59
                  31-11-2024
                  <br />
                  <span className="text-red-600">Sắp diễn ra</span>
                </p>
                <button
                  className="w-48 h-10 bg-amber-600 rounded-2xl text-white text-xl font-bold flex justify-center items-center"
                  onClick={() => handleRegister('Mừng ngày nhà giáo 20/11')}
                >
                  Đăng ký ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageAdvertisingCampaign;
