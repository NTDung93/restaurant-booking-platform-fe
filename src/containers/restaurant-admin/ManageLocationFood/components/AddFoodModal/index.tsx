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
          <div className="w-full md:w-1/3 flex flex-grow items-center">
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
