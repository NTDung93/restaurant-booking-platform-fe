import React from 'react';

interface UserInfoProps {
  name: string;
  phone: string;
  email: string;
  onEmailChange: (email: string) => void;
  notes: string;
  onNotesChange: (notes: string) => void;
}

const UserInfo: React.FC<UserInfoProps> = ({
  name,
  phone,
  email,
  onEmailChange,
  notes,
  onNotesChange,
}) => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Thông tin người đặt</h2>
    <div className="mb-4">
      <label htmlFor="name" className="block text-gray-700 font-medium">
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
      <label htmlFor="phone" className="block text-gray-700 font-medium">
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
      <label htmlFor="email" className="block text-gray-700 font-medium">
        Email *
      </label>
      <input
        type="email"
        id="email"
        placeholder="Nhập Email"
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
        className="w-full px-4 py-2 border rounded-md"
      />
    </div>
    <div className="mb-4">
      <label htmlFor="notes" className="block text-gray-700 font-medium">
        Ghi chú
      </label>
      <textarea
        id="notes"
        placeholder="Nhập ghi chú"
        value={notes}
        onChange={(e) => onNotesChange(e.target.value)}
        className="w-full px-4 py-2 border rounded-md"
      />
    </div>
  </div>
);

export default UserInfo;
