import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ReduxDispatch } from '@/libs/redux/store';
import {
  editFood,
  deleteFood,
} from '@/containers/restaurant-user/Comfirm/components/FoodSelectionModal/thunks';
import { Food } from '@/common/models/food';
import { Modal, notification } from 'antd';

interface EditFoodModalProps {
  food: Food;
  onClose: () => void;
}

const EditFoodModal: React.FC<EditFoodModalProps> = ({ food, onClose }) => {
  const dispatch = useDispatch<ReduxDispatch>();

  const [foodName, setFoodName] = useState(food.name);
  const [foodPrice, setFoodPrice] = useState<number>(food.price);
  const [foodDescription, setFoodDescription] = useState(food.description);
  const [foodImage, setFoodImage] = useState(food.image);
  const foodCategoryId = 1;
  const locationId = 1;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedFood = {
      ...food,
      name: foodName,
      price: foodPrice,
      description: foodDescription,
      image: foodImage,
      foodCategoryId,
      locationId,
    };

    dispatch(editFood(updatedFood));

    notification.success({
      message: 'Thành Công',
      description: 'Món ăn đã được chỉnh sửa thành công!',
    });

    onClose();
  };

  const handleDelete = () => {
    Modal.confirm({
      title: 'Xóa Món Ăn',
      content: 'Bạn có chắc chắn muốn xóa món ăn này?',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: () => {
        dispatch(deleteFood(food.id));
        notification.success({
          message: 'Thành Công',
          description: 'Món ăn đã được xóa thành công!',
        });
        onClose();
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-11/12 md:w-1/3">
        <h2 className="text-2xl font-bold text-amber-500 mb-4">
          Chỉnh Sửa Món Ăn
        </h2>

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
              onChange={(e) =>
                setFoodPrice(e.target.value === '' ? 0 : Number(e.target.value))
              }
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
              Hình Ảnh URL
            </label>
            <input
              type="text"
              id="image"
              value={foodImage}
              onChange={(e) => setFoodImage(e.target.value)}
              className="shadow border rounded w-full py-2 px-3 text-gray-700"
              required
            />
          </div>

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Xóa Món Ăn
            </button>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="mr-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Lưu
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFoodModal;
