import Footer from '@/components/restaurant-user/Footer';
import Header from '@/components/restaurant-user/Header';
import { useEffect, useState } from 'react';
import SelectionModal from './components/VoucherPromotionModal';
import UserInfo from './components/UserInfo';
import ReservationInfo, { ReservationData } from './components/ReservationInfo';
import FoodSelectionModal from './components/FoodSelectionModal';
import { useDispatch, useSelector } from 'react-redux';
import { selectFoodByLocation } from './components/FoodSelectionModal/selector';
import { fetchFoodByLocation } from './components/FoodSelectionModal/thunks';
import { createBooking } from './thunks';
import { ReduxDispatch } from '@/libs/redux/store';

export default function Confirm() {
  const dispatch = useDispatch<ReduxDispatch>();
  const foodsPaginationResponse = useSelector(selectFoodByLocation);
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [voucher, setVoucher] = useState<string>('');
  const [promotion, setPromotion] = useState<string>('');
  const [selectedFoods, setSelectedFoods] = useState<
    { name: string; quantity: number }[]
  >([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>('');
  const [reservationData, setReservationData] = useState<ReservationData>({
    restaurantName: localStorage.getItem('restaurantName') || '',
    location: localStorage.getItem('address') || '',
    adults: Number(localStorage.getItem('adults')) || 0,
    children: Number(localStorage.getItem('children')) || 0,
    date: localStorage.getItem('date') || '',
    time: localStorage.getItem('time') || '',
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isFoodModalOpen, setIsFoodModalOpen] = useState<boolean>(false);

  const availableVouchers = [
    {
      imageSrc: '/images/kimbap.jpg',
      title: 'Voucher Kimbap chiên',
      originalPrice: 45000,
      discountedPrice: 33000,
      discountAmount: 12000,
    },
    {
      imageSrc: '/images/burger.jpg',
      title: 'Voucher Burger gà',
      originalPrice: 55000,
      discountedPrice: 40000,
      discountAmount: 15000,
    },
    {
      imageSrc: '/images/pizza.jpg',
      title: 'Voucher Pizza hải sản',
      originalPrice: 95000,
      discountedPrice: 80000,
      discountAmount: 15000,
    },
  ];

  const availablePromotions = [
    {
      title: 'Promotion 1',
      description: 'Giảm 10% cho đơn hàng trên 200.000đ',
      imageSrc: '/images/promotion1.jpg',
    },
    {
      title: 'Promotion 2',
      description: 'Tặng 1 nước uống miễn phí',
      imageSrc: '/images/promotion2.jpg',
    },
    {
      title: 'Promotion 3',
      description: 'Giảm 50% cho lần đặt tiếp theo',
      imageSrc: '/images/promotion3.jpg',
    },
  ];

  const handleShowModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFoodSelect = (
    selectedFoods: { name: string; quantity: number }[],
  ) => {
    setSelectedFoods(selectedFoods);
    setIsFoodModalOpen(false);
  };

  const handleVoucherSelect = (selectedVoucher: string) => {
    setVoucher(selectedVoucher);
  };

  const handlePromotionSelect = (selectedPromotion: string) => {
    setPromotion(selectedPromotion);
  };

  const clearSelectedFoods = () => {
    setSelectedFoods([]);
    setSelectedPaymentMethod('');
  };

  const removeVoucher = () => {
    setVoucher('');
  };

  const removePromotion = () => {
    setPromotion('');
  };

  const handlePaymentMethodChange = (method: string) => {
    setSelectedPaymentMethod(method);
  };

  useEffect(() => {
    if (isModalOpen || isFoodModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen, isFoodModalOpen]);

  useEffect(() => {
    const locationId = localStorage.getItem('locationId');
    if (locationId) {
      dispatch(fetchFoodByLocation(parseInt(locationId)));
    }
  }, [dispatch]);
  const handleConfirmBooking = () => {
    const locationId = localStorage.getItem('locationId');

    const foodBookings = selectedFoods
      .map((food) => {
        const foodItem = foodsPaginationResponse?.content?.find(
          (item) => item.name === food.name,
        );
        if (foodItem && foodItem.id !== undefined) {
          return {
            foodId: foodItem.id,
            quantity: food.quantity,
          };
        }
        return null;
      })
      .filter(
        (foodBooking): foodBooking is { foodId: number; quantity: number } =>
          foodBooking !== null,
      );

    const bookingData = {
      id: 0,
      name,
      address: 'string',
      phone,
      bookingDate: reservationData.date,
      bookingTime: reservationData.time,
      numberOfAdult: reservationData.adults,
      numberOfChildren: reservationData.children,
      locationId: parseInt(locationId || '0'),
      voucherId: 0,
      promotionId: 0,
      foodBookings,
    };

    dispatch(createBooking(bookingData));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Header />
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md mt-10">
          <form className="space-y-6">
            <div className="flex flex-col lg:flex-row gap-10">
              <div className="lg:w-1/2 space-y-6">
                <UserInfo
                  name={name}
                  onNameChange={setName}
                  phone={phone}
                  onPhoneChange={setPhone}
                  email={email}
                  onEmailChange={setEmail}
                  notes={notes}
                  onNotesChange={setNotes}
                />

                <button
                  type="button"
                  onClick={() => setIsFoodModalOpen(true)}
                  className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
                >
                  Chọn món ăn
                </button>

                {selectedFoods.length > 0 && (
                  <>
                    <div className="mt-4 flex justify-between items-center">
                      <p className="text-gray-700">
                        <span className="font-semibold">Món ăn đã chọn:</span>
                      </p>
                      <button
                        onClick={clearSelectedFoods}
                        className="text-red-500 underline hover:text-red-600"
                      >
                        Xóa tất cả
                      </button>
                    </div>
                    <div className="mt-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {selectedFoods.map(({ name, quantity }) => {
                          const foodItem =
                            foodsPaginationResponse?.content?.find(
                              (food) => food.name === name,
                            );
                          return (
                            foodItem && (
                              <div
                                key={foodItem.id}
                                className="flex flex-col items-center border p-2 rounded-md shadow-md"
                              >
                                <img
                                  src={foodItem.image}
                                  alt={foodItem.name}
                                  className="w-32 h-32 rounded-md mb-2"
                                />
                                <p className="font-semibold">{foodItem.name}</p>
                                <p>Số lượng: {quantity}</p>
                              </div>
                            )
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="lg:w-1/2 space-y-6">
                <ReservationInfo onReservationChange={setReservationData} />

                <button
                  type="button"
                  onClick={handleShowModal}
                  className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                >
                  Chọn voucher hoặc promotion
                </button>

                {voucher && (
                  <div className="mt-4 flex justify-between items-center">
                    <p className="text-gray-700">
                      <span className="font-semibold">Voucher đã chọn:</span>{' '}
                      {voucher}
                    </p>
                    <button
                      onClick={removeVoucher}
                      className="text-red-500 underline hover:text-red-600"
                    >
                      Xóa
                    </button>
                  </div>
                )}

                {promotion && (
                  <div className="mt-4 flex justify-between items-center">
                    <p className="text-gray-700">
                      <span className="font-semibold">Promotion đã chọn:</span>{' '}
                      {promotion}
                    </p>
                    <button
                      onClick={removePromotion}
                      className="text-red-500 underline hover:text-red-600"
                    >
                      Xóa
                    </button>
                  </div>
                )}

                {selectedFoods.length > 0 && (
                  <div className="mt-6">
                    <h2 className="text-lg font-semibold">
                      Phương thức thanh toán
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <button
                        type="button"
                        onClick={() => handlePaymentMethodChange('ZaloPay')}
                        className={`flex items-center py-2 rounded-md ${
                          selectedPaymentMethod === 'ZaloPay'
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200'
                        }`}
                      >
                        <img
                          src="https://th.bing.com/th/id/OIP.e9A-iydJ2iR7AhuC3PacrwHaHa?w=166&h=180&c=7&r=0&o=5&pid=1.7"
                          alt="ZaloPay"
                          className="w-20 h-20 mb-2 rounded-lg ml-2 mr-2"
                        />
                        ZaloPay
                      </button>
                      <button
                        type="button"
                        onClick={() => handlePaymentMethodChange('MoMo')}
                        className={`flex items-center py-2 rounded-md ${
                          selectedPaymentMethod === 'MoMo'
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200'
                        }`}
                      >
                        <img
                          src="https://th.bing.com/th/id/OIP.1GNvjAZu4hlbE0bWflshGwHaHa?w=169&h=180&c=7&r=0&o=5&pid=1.7"
                          alt="MoMo"
                          className="w-20 h-20 mb-2 rounded-lg mr-2 ml-2"
                        />
                        MoMo
                      </button>
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleConfirmBooking}
                  className="w-full bg-gray-400 text-white py-2 rounded-md"
                >
                  Xác nhận
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <SelectionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        availableVouchers={availableVouchers}
        availablePromotions={availablePromotions}
        onVoucherSelect={handleVoucherSelect}
        onPromotionSelect={handlePromotionSelect}
      />
      <FoodSelectionModal
        isOpen={isFoodModalOpen}
        onClose={() => setIsFoodModalOpen(false)}
        availableFoods={foodsPaginationResponse?.content || []}
        onFoodSelect={handleFoodSelect}
      />
      <Footer />
    </div>
  );
}
