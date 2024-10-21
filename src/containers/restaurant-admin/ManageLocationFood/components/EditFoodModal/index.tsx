import React, { useState, useEffect } from 'react';
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
  const locationId = 1;

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
          <div className="w-full md:w-1/2 flex flex-col">
            <form onSubmit={handleSubmit} className="w-full mx-3">
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
          <div className="w-full md:w-1/2">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {foodImages.map((image, index) => (
                <div
                  key={index}
                  className="relative border border-gray-300 p-2"
                >
                  {image ? (
                    <img
                      src={image}
                      alt={`Food Image ${index}`}
                      className="w-full h-[200px] object-cover"
                    />
                  ) : (
                    <label className="block cursor-pointer">
                      <div className="flex items-center justify-center w-full h-[200px] bg-gray-200">
                        <span className="text-gray-400">Upload</span>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, index)}
                      />
                    </label>
                  )}
                  {image && (
                    <button
                      type="button"
                      className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                      onClick={() => handleImageDelete(index)}
                    >
                      <span className="text-lg">X</span>
                    </button>
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
