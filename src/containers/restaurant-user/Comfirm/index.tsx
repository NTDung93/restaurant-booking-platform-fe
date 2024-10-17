import Footer from '@/components/restaurant-user/Footer';
import Header from '@/components/restaurant-user/Header';
import { useEffect, useState } from 'react';
import UserInfo from './components/UserInfo';
import ReservationInfo, { ReservationData } from './components/ReservationInfo';
import FoodSelectionModal from './components/FoodSelectionModal';
import { useDispatch, useSelector } from 'react-redux';
import { selectFoodByLocation } from './components/FoodSelectionModal/selector';
import { fetchFoodByLocation } from './components/FoodSelectionModal/thunks';
import { createBooking } from './thunks';
import { ReduxDispatch } from '@/libs/redux/store';
import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

// import VoucherModal from './components/VoucherModal';
import PromotionModal from './components/PromotionModal';
import { selectPromotionByLocation } from './components/PromotionModal/selector';
import { fetchPromotionByLocation } from './components/PromotionModal/thunks';
import { Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  PAYMENT_ROUTE,
  SUCCESSS_ROUTE,
} from '@/common/constants/routerConstant';

export default function Confirm() {
  const dispatch = useDispatch<ReduxDispatch>();
  const navigate = useNavigate();
  const foodsPaginationResponse = useSelector(selectFoodByLocation);
  const promotions = useSelector(selectPromotionByLocation);

  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [loading, setLoading] = useState(false);

  // const [voucher, setVoucher] = useState<string>('');
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

  // const [isVoucherModalOpen, setIsVoucherModalOpen] = useState<boolean>(false);
  const [isPromotionModalOpen, setIsPromotionModalOpen] =
    useState<boolean>(false);
  const [isFoodModalOpen, setIsFoodModalOpen] = useState<boolean>(false);

  // const availableVouchers = [
  //   {
  //     imageSrc: '/images/kimbap.jpg',
  //     title: 'Voucher Kimbap chiên',
  //     originalPrice: 45000,
  //     discountedPrice: 33000,
  //     discountAmount: 12000,
  //   },
  //   {
  //     imageSrc: '/images/burger.jpg',
  //     title: 'Voucher Burger gà',
  //     originalPrice: 55000,
  //     discountedPrice: 40000,
  //     discountAmount: 15000,
  //   },
  //   {
  //     imageSrc: '/images/pizza.jpg',
  //     title: 'Voucher Pizza hải sản',
  //     originalPrice: 95000,
  //     discountedPrice: 80000,
  //     discountAmount: 15000,
  //   },
  // ];

  const handleFoodSelect = (
    selectedFoods: { name: string; quantity: number }[],
  ) => {
    setSelectedFoods(selectedFoods);
    setIsFoodModalOpen(false);
  };

  // const handleVoucherSelect = (selectedVoucher: string) => {
  //   setVoucher(selectedVoucher);
  // };

  const handlePromotionSelect = (selectedPromotion: string) => {
    setPromotion(selectedPromotion);
  };

  const clearSelectedFoods = () => {
    setSelectedFoods([]);
    setSelectedPaymentMethod('');
  };

  // const removeVoucher = () => {
  //   setVoucher('');
  // };

  const removePromotion = () => {
    setPromotion('');
  };

  const handlePaymentMethodChange = (method: string) => {
    setSelectedPaymentMethod(method);
  };

  useEffect(() => {
    if (/*isVoucherModalOpen ||*/ isPromotionModalOpen || isFoodModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [/*isVoucherModalOpen,*/ isPromotionModalOpen, isFoodModalOpen]);
  useEffect(() => {
    if (selectedFoods.length > 0) {
      localStorage.setItem('selectedFoods', JSON.stringify(selectedFoods));
    } else {
      localStorage.removeItem('selectedFoods');
    }
  }, [selectedFoods]);

  useEffect(() => {
    const locationId = localStorage.getItem('locationId');
    if (locationId) {
      dispatch(fetchFoodByLocation(parseInt(locationId)));
      dispatch(fetchPromotionByLocation(parseInt(locationId)));
    }
  }, [dispatch]);

  const handlePayment = async () => {
    setLoading(true);

    try {
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

      const selectedPromotion = (
        Array.isArray(promotions) ? promotions : []
      ).find((promo) => promo.title === promotion);
      const promotionId = selectedPromotion ? selectedPromotion.id : 0;

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
        promotionId: promotionId,
        foodBookings,
      };

      await dispatch(createBooking(bookingData));
      toast.success('Đặt bàn thành công!', {
        position: 'top-right',
        autoClose: 3000,
      });

      navigate(PAYMENT_ROUTE);
    } catch (error) {
      toast.error('Có lỗi xảy ra. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmBooking = async () => {
    setLoading(true);
    try {
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

      const selectedPromotion = (
        Array.isArray(promotions) ? promotions : []
      ).find((promo) => promo.title === promotion);
      const promotionId = selectedPromotion ? selectedPromotion.id : 0;

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
        promotionId: promotionId,
        foodBookings,
      };

      await dispatch(createBooking(bookingData));
      toast.success('Đặt bàn thành công!', {
        position: 'top-right',
        autoClose: 3000,
      });

      navigate(SUCCESSS_ROUTE);
    } catch (error) {
      toast.error('Đặt bàn thất bại!', {
        position: 'top-right',
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
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
                    <div className="mt-4 flex flex-col gap-4">
                      {selectedFoods.map(({ name, quantity }) => {
                        const foodItem = foodsPaginationResponse?.content?.find(
                          (food) => food.name === name,
                        );
                        return (
                          foodItem && (
                            <div
                              key={foodItem.id}
                              className="flex justify-between items-center border p-2 rounded-md shadow-md"
                            >
                              <div className="flex items-center gap-4">
                                <img
                                  src={foodItem.image}
                                  alt={foodItem.name}
                                  className="w-20 h-20 rounded-md"
                                />
                                <p className="font-semibold">{foodItem.name}</p>
                              </div>
                              <div className="flex flex-col items-end">
                                <p className="text-gray-500">
                                  Giá: {foodItem.price.toLocaleString()} VND
                                </p>
                                <p>Số lượng: {quantity}</p>
                              </div>
                            </div>
                          )
                        );
                      })}
                    </div>
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold">Tổng giá trị:</h3>
                      <p className="text-xl font-bold">
                        {selectedFoods
                          .reduce((total, { name, quantity }) => {
                            const foodItem =
                              foodsPaginationResponse?.content?.find(
                                (food) => food.name === name,
                              );
                            return total + (foodItem?.price || 0) * quantity;
                          }, 0)
                          .toLocaleString()}{' '}
                        VND
                      </p>
                    </div>

                    {promotion && (
                      <>
                        {(() => {
                          const selectedPromotion = (
                            Array.isArray(promotions) ? promotions : []
                          ).find((promo) => promo.title === promotion);

                          if (selectedPromotion) {
                            const { discountValue, maxDiscount } =
                              selectedPromotion;
                            const total = selectedFoods.reduce(
                              (total, { name, quantity }) => {
                                const foodItem =
                                  foodsPaginationResponse?.content?.find(
                                    (food) => food.name === name,
                                  );
                                return (
                                  total + (foodItem?.price || 0) * quantity
                                );
                              },
                              0,
                            );

                            const discountAmount = total * discountValue;
                            const finalDiscount =
                              discountAmount > maxDiscount
                                ? maxDiscount
                                : discountAmount;

                            return (
                              <p className="text-xl font-bold text-red-500">
                                Giảm giá: -{finalDiscount.toLocaleString()} VND
                              </p>
                            );
                          }

                          return null;
                        })()}
                      </>
                    )}

                    {promotion && (
                      <div className="mt-2">
                        <h4 className="text-lg font-semibold">
                          Tổng sau khi giảm giá:
                        </h4>
                        {(() => {
                          const selectedPromotion = (
                            Array.isArray(promotions) ? promotions : []
                          ).find((promo) => promo.title === promotion);

                          if (selectedPromotion) {
                            const { discountValue, maxDiscount } =
                              selectedPromotion;
                            const total = selectedFoods.reduce(
                              (total, { name, quantity }) => {
                                const foodItem =
                                  foodsPaginationResponse?.content?.find(
                                    (food) => food.name === name,
                                  );
                                return (
                                  total + (foodItem?.price || 0) * quantity
                                );
                              },
                              0,
                            );

                            const discountAmount = total * discountValue;
                            const finalDiscount =
                              discountAmount > maxDiscount
                                ? maxDiscount
                                : discountAmount;
                            const totalAfterDiscount = total - finalDiscount;

                            return (
                              <p className="text-xl font-bold">
                                {totalAfterDiscount.toLocaleString()} VND
                              </p>
                            );
                          }

                          return null;
                        })()}
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="lg:w-1/2 space-y-6">
                <ReservationInfo onReservationChange={setReservationData} />

                {/* <button
                  type="button"
                  onClick={() => setIsVoucherModalOpen(true)}
                  className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                >
                  Chọn voucher
                </button> */}
                {/* 
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
                )} */}

                {selectedFoods.length > 0 && (
                  <>
                    <button
                      type="button"
                      onClick={() => setIsPromotionModalOpen(true)}
                      className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                    >
                      Chọn promotion
                    </button>

                    {promotion && (
                      <div className="mt-4 flex justify-between items-center">
                        <p className="text-gray-700">
                          <span className="font-semibold">
                            Promotion đã chọn:
                          </span>{' '}
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
                  </>
                )}

                {selectedFoods.length > 0 && (
                  <div className="mt-6">
                    <h2 className="text-lg font-semibold">
                      Phương thức thanh toán
                    </h2>
                    <div className="grid grid-cols-1 gap-4 mt-4">
                      {' '}
                      {/* Đổi thành grid-cols-1 */}
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
                        Ngân hàng
                      </button>
                    </div>
                  </div>
                )}

                {selectedFoods.length > 0 ? (
                  // Nút Thanh toán
                  <button
                    type="button"
                    onClick={handlePayment}
                    className={`w-full py-2 rounded-md ${
                      loading ? 'bg-gray-400' : 'bg-blue-800 text-white'
                    }`}
                    disabled={loading}
                  >
                    {loading ? <Spin size="small" /> : 'Thanh toán'}
                  </button>
                ) : (
                  // Nút Xác nhận
                  <button
                    type="button"
                    onClick={handleConfirmBooking}
                    className={`w-full py-2 rounded-md ${
                      loading ? 'bg-gray-400' : 'bg-blue-800 text-white'
                    }`}
                    disabled={loading}
                  >
                    {loading ? <Spin size="small" /> : 'Xác nhận'}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>

      <FoodSelectionModal
        isOpen={isFoodModalOpen}
        onClose={() => setIsFoodModalOpen(false)}
        availableFoods={foodsPaginationResponse?.content || []}
        onFoodSelect={handleFoodSelect}
      />

      {/* <VoucherModal
        isOpen={isVoucherModalOpen}
        onClose={() => setIsVoucherModalOpen(false)}
        availableVouchers={availableVouchers}
        onVoucherSelect={handleVoucherSelect}
      /> */}

      <PromotionModal
        isOpen={isPromotionModalOpen}
        onClose={() => setIsPromotionModalOpen(false)}
        availablePromotions={Array.isArray(promotions) ? promotions : []}
        onPromotionSelect={handlePromotionSelect}
      />
      <ToastContainer />
      <Footer />
    </div>
  );
}
