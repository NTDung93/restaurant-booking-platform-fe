import Footer from '@/components/Footer';
import Header from '@/components/Header';
import MenuUser from '@/components/MenuUser';

export default function UserDetail() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow p-6 flex justify-center items-start bg-gray-100">
        <div className="bg-white w-full max-w-6xl p-8 shadow-lg rounded-lg grid grid-cols-1 lg:grid-cols-2 gap-8">
          <MenuUser />
          <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
            <h2 className="text-2xl font-semibold mb-6">THÔNG TIN TÀI KHOẢN</h2>
            <div className="space-y-6">
              <div className="flex items-center">
                <p className="w-32 font-medium text-lg">Tên:</p>
                <p className="text-lg">Đức Anh</p>
              </div>
              <div className="flex items-center">
                <p className="w-32 font-medium text-lg">Email:</p>
                <p className="text-lg">ducanhhadinh@gmail.com</p>
              </div>
              <div className="flex items-center">
                <p className="w-32 font-medium text-lg">Điểm:</p>
                <p className="text-lg">36</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
