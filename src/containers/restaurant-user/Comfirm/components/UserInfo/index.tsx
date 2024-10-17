import React, { useEffect } from 'react';

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
}) => {
  // Use effect to load from localStorage on mount
  useEffect(() => {
    const savedName = localStorage.getItem('userName');
    const savedPhone = localStorage.getItem('userPhone');
    const savedEmail = localStorage.getItem('userEmail');

    if (savedName) onNameChange(savedName);
    if (savedPhone) onPhoneChange(savedPhone);
    if (savedEmail) onEmailChange(savedEmail);
  }, [onNameChange, onPhoneChange, onEmailChange]);

  // Save to localStorage when values change
  const handleNameChange = (value: string) => {
    onNameChange(value);
    localStorage.setItem('userName', value);
  };

  const handlePhoneChange = (value: string) => {
    onPhoneChange(value);
    localStorage.setItem('userPhone', value);
  };

  const handleEmailChange = (value: string) => {
    onEmailChange(value);
    localStorage.setItem('userEmail', value);
  };

  return (
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
          onChange={(e) => handleNameChange(e.target.value)}
          className="w-full px-4 py-2 border rounded-md text-gray-700"
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
          onChange={(e) => handlePhoneChange(e.target.value)}
          className="w-full px-4 py-2 border rounded-md text-gray-700"
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
          onChange={(e) => handleEmailChange(e.target.value)}
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
};

export default UserInfo;
