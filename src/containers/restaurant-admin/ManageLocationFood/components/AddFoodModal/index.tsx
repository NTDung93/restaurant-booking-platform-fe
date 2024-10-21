import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addFood } from '@/containers/restaurant-user/Comfirm/components/FoodSelectionModal/thunks';
import { ReduxDispatch } from '@/libs/redux/store';
import { notification } from 'antd';

const AddFoodModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const dispatch = useDispatch<ReduxDispatch>();

  const [foodName, setFoodName] = useState('');
  const [foodPrice, setFoodPrice] = useState<number | ''>('');
  const [foodDescription, setFoodDescription] = useState('');
  const [foodImage, setFoodImage] = useState('');
  const foodCategoryId = 1;
  const locationId = 1;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newFood = {
      id: 0,
      name: foodName,
      price: foodPrice as number,
      description: foodDescription,
      status: 'ACTIVE',
      image: foodImage,
      foodCategoryId,
      locationId,
    };

    try {
      await dispatch(addFood(newFood)).unwrap();
      notification.success({
        message: 'Thêm Món Ăn Thành Công',
        description: `Món ăn "${foodName}" đã được thêm thành công!`,
      });
      onClose();
    } catch (error) {
      notification.error({
        message: 'Thêm Món Ăn Thất Bại',
        description: 'Có lỗi xảy ra, vui lòng thử lại!',
      });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-11/12 md:w-1/3">
        <h2 className="text-2xl font-bold text-amber-500 mb-4">Thêm Món Ăn</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Tên Món Ăn
            </label>
            <input
              type="text"
              id="name"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              className="shadow border rounded w-full py-2 px-3 text-gray-700"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="price"
            >
              Giá
            </label>
            <input
              type="number"
              id="price"
              value={foodPrice}
              onChange={(e) => setFoodPrice(Number(e.target.value))}
              className="shadow border rounded w-full py-2 px-3 text-gray-700"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Mô Tả
            </label>
            <textarea
              id="description"
              value={foodDescription}
              onChange={(e) => setFoodDescription(e.target.value)}
              className="shadow border rounded w-full py-2 px-3 text-gray-700"
              rows={4}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="image"
            >
              Hình Ảnh
            </label>
            <input
              type="text"
              id="image"
              value={foodImage}
              onChange={(e) => setFoodImage(e.target.value)}
              className="shadow border rounded w-full py-2 px-3 text-gray-700"
              placeholder="URL hình ảnh"
              required
            />
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              onClick={onClose}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded"
            >
              Thêm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFoodModal;
