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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-4xl mx-auto max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4 text-center">Chọn món ăn</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableFoods.map((food, index) => (
            <div
              key={index}
              className="flex flex-col justify-between items-center border p-4 rounded-md cursor-pointer hover:bg-gray-100"
            >
              <img
                src={food.image}
                alt={food.name}
                className="w-24 h-24 mb-4 rounded-md"
              />
              <div className="text-center">
                <p className="font-semibold">{food.name}</p>
                <p className="text-gray-600">
                  {food.price.toLocaleString()} VND
                </p>
                <div className="flex items-center justify-center mt-2">
                  <button
                    onClick={() => handleDecrement(food.name)}
                    className="bg-gray-300 hover:bg-gray-400 rounded-l-md px-4 py-1"
                  >
                    -
                  </button>
                  <span className="mx-2">{foodQuantities[food.name] || 0}</span>
                  <button
                    onClick={() => handleIncrement(food.name)}
                    className="bg-gray-300 hover:bg-gray-400 rounded-r-md px-4 py-1"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 w-full sm:w-auto"
          >
            Hủy
          </button>
          <button
            onClick={handleConfirmSelection}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full sm:w-auto"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodSelectionModal;
