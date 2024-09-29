import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { useState } from 'react';

export default function Comfirm() {
  const [name] = useState('a');
  const [phone] = useState('a');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Header />
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md mt-10">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Thông tin người đặt
              </h2>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-medium"
                >
                  Tên liên lạc *
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  disabled
                  className="w-full px-4 py-2 border rounded-md bg-gray-200 text-gray-700"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="phone"
                  className="block text-gray-700 font-medium"
                >
                  Số điện thoại *
                </label>
                <input
                  type="text"
                  id="phone"
                  value={phone}
                  disabled
                  className="w-full px-4 py-2 border rounded-md bg-gray-200 text-gray-700"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Nhập Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="notes"
                  className="block text-gray-700 font-medium"
                >
                  Ghi chú
                </label>
                <textarea
                  id="notes"
                  placeholder="Nhập ghi chú"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
              <button className="w-full bg-gray-400 text-white py-2 rounded-md ">
                Xác nhận
              </button>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Thông tin đặt chỗ</h2>
              <div className="mb-4 p-4 bg-gray-100 rounded-md">
                <p className="text-gray-700">
                  <span className="font-semibold">Địa điểm:</span> Dìn Ký Cù Lao
                  Xanh - Trần Văn Trà Quận 7
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Khách:</span> 2 người lớn, 0
                  trẻ em
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Thời gian:</span> Thứ năm,
                  ngày 12/09/2024 21:00
                </p>
              </div>
              <button
                type="button"
                className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600"
              >
                Chỉnh sửa
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
