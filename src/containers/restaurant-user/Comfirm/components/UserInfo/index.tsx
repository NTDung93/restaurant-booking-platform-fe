import React from 'react';

interface UserInfoProps {
  name: string;
  onNameChange: (name: string) => void;
  phone: string;
  onPhoneChange: (phone: string) => void;
  email: string;
  onEmailChange: (email: string) => void;
  notes: string;
  onNotesChange: (notes: string) => void;
}

const UserInfo: React.FC<UserInfoProps> = ({
  name,
  onNameChange,
  phone,
  onPhoneChange,
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
        placeholder="Nhập tên liên lạc"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        className="w-full px-4 py-2 border rounded-md  text-gray-700"
      />
    </div>
    <div className="mb-4">
      <label htmlFor="phone" className="block text-gray-700 font-medium">
        Số điện thoại *
      </label>
      <input
        type="text"
        id="phone"
        placeholder="Nhập số điện thoại"
        value={phone}
        onChange={(e) => onPhoneChange(e.target.value)}
        className="w-full px-4 py-2 border rounded-md  text-gray-700"
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
