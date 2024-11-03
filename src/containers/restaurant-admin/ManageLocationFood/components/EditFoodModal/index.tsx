import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxDispatch } from '@/libs/redux/store';
import {
  editFood,
  deleteFood,
} from '@/containers/restaurant-user/Comfirm/components/FoodSelectionModal/thunks';
import { Food } from '@/common/models/food';
import { Modal, notification } from 'antd';
import { selectUserInfo } from '@/containers/restaurant-user/Auth/selector';

interface EditFoodModalProps {
  food: Food;
  onClose: () => void;
}

const EditFoodModal: React.FC<EditFoodModalProps> = ({ food, onClose }) => {
  const dispatch = useDispatch<ReduxDispatch>();

  const [foodName, setFoodName] = useState(food.name);
  const [foodPrice, setFoodPrice] = useState<number>(food.price);
  const [foodDescription, setFoodDescription] = useState(food.description);
  const [foodImages, setFoodImages] = useState<string[]>(new Array(6).fill(''));

  // Initialize foodImages with existing food image URLs
  useEffect(() => {
    const existingImages = food.image.split(',').map((img) => img.trim());
    setFoodImages((prevImages) => {
      const newImages = [...prevImages];
      existingImages.forEach((img, index) => {
        if (index < newImages.length) {
          newImages[index] = img; // fill the array with existing images
        }
      });
      return newImages;
    });
  }, [food.image]);

  const foodCategoryId = 1;
  const userInfo = useSelector(selectUserInfo);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'jq2n2xoh');
    data.append('cloud_name', 'dpysbryyk');

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/dpysbryyk/image/upload',
      {
        method: 'POST',
        body: data,
      },
    );

    const uploadedImageUrl = await res.json();
    const newImages = [...foodImages];
    newImages[index] = uploadedImageUrl.url; // Set the uploaded image URL
    setFoodImages(newImages);
  };

  const handleImageDelete = (index: number) => {
    const newImages = [...foodImages];
    newImages[index] = ''; // Clear the image URL at the index
    setFoodImages(newImages); // Update the state to trigger a re-render
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const imagesString = foodImages.filter((img) => img).join(','); // Only join non-empty image URLs

    const updatedFood = {
      ...food,
      name: foodName,
      price: foodPrice,
      description: foodDescription,
      image: imagesString,
      foodCategoryId,
      locationId: userInfo?.locationId ?? 0,
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
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2">
        <h2 className="text-2xl md:text-4xl font-bold text-amber-600 mb-6 text-center">
          Chỉnh Sửa Món Ăn
        </h2>

        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
          {/* Form bên trái */}
          <div className="w-full md:w-1/3 flex flex-grow items-center">
            <form onSubmit={handleSubmit} className="w-full">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-lg md:text-xl font-bold mb-2"
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
                  className="block text-gray-700 text-lg md:text-xl font-bold mb-2"
                  htmlFor="price"
                >
                  Giá
                </label>
                <input
                  type="number"
                  id="price"
                  value={foodPrice}
                  onChange={(e) =>
                    setFoodPrice(
                      e.target.value === '' ? 0 : Number(e.target.value),
                    )
                  }
                  className="shadow border rounded w-full py-2 px-3 text-gray-700"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-lg md:text-xl font-bold mb-2"
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
            </form>
          </div>

          {/* Khu vực upload ảnh bên phải */}
          <div className="w-full md:w-2/3">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
              {foodImages.map((image, index) => (
                <div key={index} className="relative group">
                  {image ? (
                    <div className="relative w-full h-[220px]">
                      <img
                        src={image}
                        alt={`Food Image ${index}`}
                        className="w-full h-full object-cover rounded-lg shadow-md"
                      />
                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={() => handleImageDelete(index)}
                        className="absolute top-3 right-3 w-8 h-8 bg-white/90 hover:bg-red-500 text-gray-600 hover:text-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <label className="block cursor-pointer">
                      <div className="w-full h-[220px] rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors bg-gray-50 flex flex-col items-center justify-center gap-3 group-hover:bg-gray-100">
                        <div className="p-3 rounded-full bg-gray-100 group-hover:bg-gray-200 transition-colors">
                          <svg
                            className="w-6 h-6 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                            />
                          </svg>
                        </div>
                        <div className="text-center px-4">
                          <span className="text-gray-500 text-sm font-medium">
                            Upload Image
                          </span>
                          <p className="text-gray-400 text-xs mt-1">
                            Click to browse
                          </p>
                        </div>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, index)}
                        accept="image/*"
                      />
                    </label>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={handleDelete}
            className="text-xl font-bold py-3 px-6 mr-2 rounded-lg text-white bg-red-600 hover:bg-red-700"
          >
            Xóa Món Ăn
          </button>
          <div className="flex space-x-2">
            <button
              type="submit"
              className="text-xl font-bold py-3 px-6 mr-2 rounded-lg text-white bg-amber-600 hover:bg-amber-700"
              onClick={handleSubmit}
            >
              Lưu
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-xl font-bold py-3 px-6 mr-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600"
            >
              Hủy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditFoodModal;
