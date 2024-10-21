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
  const [foodImages, setFoodImages] = useState<string[]>(new Array(6).fill(''));
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
    newImages[index] = uploadedImageUrl.url; // Update the image at the index
    setFoodImages(newImages);
  };

  const handleImageDelete = (index: number) => {
    const newImages = [...foodImages];
    newImages[index] = ''; // Clear the image at the index
    setFoodImages(newImages);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const imagesString = foodImages.filter((img) => img).join(',');

    const newFood = {
      id: 0,
      name: foodName,
      price: foodPrice as number,
      description: foodDescription,
      status: 'ACTIVE',
      image: imagesString,
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
      <div className="bg-white rounded-lg p-6 w-11/12 md:w-2/3 lg:w-1/2">
        <h2 className="text-4xl font-bold text-amber-600 mb-6 text-center">
          Thêm Món Ăn
        </h2>

        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
          {/* Form bên trái */}
          <div className="w-full md:w-1/2 flex flex-grow items-center">
            <form onSubmit={handleSubmit} className="w-full">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-xl font-bold mb-2"
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
                  className="block text-gray-700 text-xl font-bold mb-2"
                  htmlFor="price"
                >
                  Giá
                </label>
                <div className="flex items-center">
                  <input
                    type="number"
                    id="price"
                    value={foodPrice}
                    onChange={(e) => setFoodPrice(Number(e.target.value))}
                    className="shadow border rounded w-full py-2 px-3 text-gray-700"
                    required
                  />
                  <span className="ml-2 font-bold text-lg text-green-400">
                    VND
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-xl font-bold mb-2"
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
                  <button
                    type="button"
                    className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                    onClick={() => handleImageDelete(index)}
                  >
                    <span className="text-lg">X</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Nút Thêm và Hủy */}
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="bg-amber-600 hover:bg-amber-700 text-white text-xl font-bold py-3 px-6 mr-2 rounded-lg"
            onClick={handleSubmit}
          >
            Thêm
          </button>
          <button
            type="button"
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 text-xl font-bold py-3 px-6 rounded-lg"
            onClick={onClose}
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddFoodModal;
