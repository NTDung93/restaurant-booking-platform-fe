import Header from '@/components/restaurant-admin/Header';
import Image from '@/components/restaurant-admin/Img';
import Menu from '@/components/restaurant-admin/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { ReduxDispatch } from '@/libs/redux/store';
import { selectFoodByLocation } from '@/containers/restaurant-user/Comfirm/components/FoodSelectionModal/selector';
import { fetchFoodByLocation } from '@/containers/restaurant-user/Comfirm/components/FoodSelectionModal/thunks';
import { selectUserInfo } from '@/containers/restaurant-user/Auth/selector';
import AddFoodModal from './components/AddFoodModal';
import EditFoodModal from './components/EditFoodModal'; // Import the EditFoodModal
import { Food } from '@/common/models/food'; // Make sure to import your Food type

const ManageLocationFood: React.FC = () => {
  const dispatch = useDispatch<ReduxDispatch>();
  const foodsPaginationResponse = useSelector(selectFoodByLocation);
  const userInfo = useSelector(selectUserInfo);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 3;
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [editFoodItem, setEditFoodItem] = useState<Food | null>(null); // State to hold the food item being edited
  const locationId = userInfo?.locationId;

  useEffect(() => {
    if (locationId) {
      dispatch(fetchFoodByLocation(locationId));
    }
  }, [dispatch, locationId]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    foodsPaginationResponse?.content?.slice(
      indexOfFirstItem,
      indexOfLastItem,
    ) || [];

  const totalPages = Math.ceil(
    (foodsPaginationResponse?.totalElements || 0) / itemsPerPage,
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleEditClick = (food: Food) => {
    setEditFoodItem(food);
    setShowEditModal(true);
  };

  return (
    <>
      <Header />
      <div className="mt-[100px] flex min-h-screen">
        <Menu />
        <div className="w-[85vw] flex flex-col">
          <Image />
          <div className="ml-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-4xl font-bold text-gray-800">
                Tất cả món ăn
              </h1>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Thêm món ăn
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentItems.map((food) => (
                <div
                  key={food.id}
                  className="w-[400px] bg-white shadow-lg rounded-3xl overflow-hidden"
                >
                  <img
                    className="w-full h-64 object-cover"
                    src={food.image}
                    alt={food.name}
                  />
                  <div className="p-6 flex flex-col items-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      {food.name}
                    </h2>
                    <div className="flex justify-center items-center  w-full">
                      <span className="text-amber-500 font-medium text-xl">
                        Giá: {food.price.toLocaleString()} VNĐ
                      </span>
                    </div>
                    <div
                      onClick={() => handleEditClick(food)}
                      className="flex items-center justify-center w-52 h-10 p-2 bg-amber-500 rounded-2xl hover:bg-amber-600 transition duration-200 cursor-pointer mt-4" // Thêm margin-top
                    >
                      <span className="text-center text-white text-lg font-medium">
                        Chỉnh sửa
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {currentItems.length === 0 && (
              <p className="text-xl text-gray-500">
                Không có món ăn nào được tìm thấy.
              </p>
            )}

            <div className="flex justify-center mt-8 mb-4">
              <nav>
                <ul className="flex space-x-4">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <li key={index + 1}>
                      <button
                        className={`px-4 py-2 rounded-md text-white ${currentPage === index + 1 ? 'bg-blue-600' : 'bg-gray-400'}`}
                        onClick={() => handlePageChange(index + 1)}
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {showAddModal && (
              <AddFoodModal onClose={() => setShowAddModal(false)} />
            )}
            {showEditModal && (
              <EditFoodModal
                food={editFoodItem!}
                onClose={() => {
                  setShowEditModal(false);
                  setEditFoodItem(null);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageLocationFood;
