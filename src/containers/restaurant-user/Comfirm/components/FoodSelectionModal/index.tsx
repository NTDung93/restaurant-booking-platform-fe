import { Food } from '@/common/models/food';
import React, { useState } from 'react';

interface FoodSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableFoods: Food[];
  onFoodSelect: (selectedFoods: { name: string; quantity: number }[]) => void;
}

const FoodSelectionModal: React.FC<FoodSelectionModalProps> = ({
  isOpen,
  onClose,
  availableFoods,
  onFoodSelect,
}) => {
  const [foodQuantities, setFoodQuantities] = useState<{
    [key: string]: number;
  }>({});

  const handleIncrement = (foodTitle: string) => {
    setFoodQuantities((prev) => ({
      ...prev,
      [foodTitle]: (prev[foodTitle] || 0) + 1,
    }));
  };

  const handleDecrement = (foodTitle: string) => {
    setFoodQuantities((prev) => {
      const newQuantity = (prev[foodTitle] || 0) - 1;
      return {
        ...prev,
        [foodTitle]: newQuantity < 0 ? 0 : newQuantity,
      };
    });
  };

  const handleConfirmSelection = () => {
    const selectedFoods = Object.entries(foodQuantities)
      .filter(([, quantity]) => quantity > 0)
      .map(([name, quantity]) => ({ name, quantity }));

    onFoodSelect(selectedFoods);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-5xl mx-auto max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Chọn món ăn
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableFoods.map((food, index) => (
            <div
              key={index}
              className="flex flex-col justify-between items-center bg-gray-50 border border-gray-200 p-6 rounded-lg cursor-pointer transition-transform hover:scale-105 hover:bg-gray-100"
            >
              <img
                src={food.image}
                alt={food.name}
                className="w-32 h-32 object-cover mb-4 rounded-lg shadow-md"
              />
              <div className="text-center">
                <p className="font-semibold text-lg text-gray-900">
                  {food.name}
                </p>
                <p className="text-gray-600 text-sm mt-1">
                  {food.price.toLocaleString()} VND
                </p>

                <div className="flex items-center justify-center mt-4">
                  <button
                    onClick={() => handleDecrement(food.name)}
                    className="bg-red-400 text-white rounded-l-md px-4 py-2 hover:bg-red-500 transition-colors"
                  >
                    -
                  </button>
                  <span className="mx-4 text-gray-800 font-semibold text-lg">
                    {foodQuantities[food.name] || 0}
                  </span>
                  <button
                    onClick={() => handleIncrement(food.name)}
                    className="bg-green-400 text-white rounded-r-md px-4 py-2 hover:bg-green-500 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-6 py-2 rounded-md hover:bg-gray-500 transition-colors w-full sm:w-auto"
          >
            Hủy
          </button>
          <button
            onClick={handleConfirmSelection}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors w-full sm:w-auto"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodSelectionModal;
