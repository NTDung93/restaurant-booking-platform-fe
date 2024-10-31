import React, { useEffect, useState } from 'react';
import Header from '@/components/restaurant-admin/Header';
import Image from '@/components/restaurant-admin/Img';
import Menu from '@/components/restaurant-admin/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxDispatch } from '@/libs/redux/store';
import { getAdsOfSystem, getAdsRegistrationOfLocation } from './selector';
import {
  addAdsRegistration,
  fetchAdsOfSystem,
  fetchAdsRegistrationOfLocation,
} from './thunks';
import { AdsResponse } from '@/common/models/ads';
import { selectUserInfo } from '@/containers/restaurant-user/Auth/selector';
import { CreatePaymentDto } from '@/common/models/booking';
import { createPaymentLink } from '@/containers/restaurant-user/Comfirm/thunks';
import { ToastContainer, toast } from 'react-toastify';
import { Spin } from 'antd';

import 'react-toastify/dist/ReactToastify.css';
import { RESTAURANT_ADMIN_MANAGE_ADVERTISEMENT_ANALYSIS_ROUTE } from '@/common/constants/routerConstant';
import { Link } from 'react-router-dom';

const ManageAdvertisingCampaign: React.FC = () => {
  interface Item {
    name: string;
    quantity: number;
    price: number;
  }

  const dispatch = useDispatch<ReduxDispatch>();
  const adsResponse = useSelector(getAdsOfSystem);
  const adsOfLocation = useSelector(getAdsRegistrationOfLocation);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedAd, setSelectedAd] = useState<AdsResponse | null>(null);
  const [bannerImage, setBannerImage] = useState<string | null>(null);
  const userInfo = useSelector(selectUserInfo);
  const [loadingArray, setLoadingArray] = useState(
    Array(adsResponse?.content.length).fill(false),
  );
  const [loading, setLoading] = useState(false);
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
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
    setBannerImage(uploadedImageUrl.url);
  };

  const handleSubmitAdsBANNER = async (price: number, name: string) => {
    if (!bannerImage) {
      console.log(bannerImage);
      toast.error('Bạn phải tải ảnh lên trước khi thanh toán!');
    } else {
      setLoading(true);
      const items: Item[] = [
        {
          name: `Ads - ${name}`,
          quantity: 1,
          price: price,
        },
      ];
      const paymentData: CreatePaymentDto = {
        buyerName: userInfo?.fullName || 'Unknown Buyer',
        buyerPhone: userInfo?.phone || 'Unknown Phone',
        description: 'Payment monthly',
        returnUrl: 'https://skedeat.site/manage/advertisement',
        cancelUrl: 'https://skedeat.site/manage/advertisement',
        paymentType: 'ORDER',
        items: items,
      };

      const paymentResponse = await dispatch(createPaymentLink(paymentData));

      if (paymentResponse.meta.requestStatus === 'fulfilled') {
        const checkoutUrl = paymentResponse.payload; // Directly use the payload since it should be a string

        if (checkoutUrl) {
          setLoading(false);
          localStorage.setItem('uploadedImage', bannerImage ?? '');
          localStorage.setItem(
            'adsId',
            selectedAd?.id !== undefined ? selectedAd.id.toString() : '0',
          );
          localStorage.setItem('price', price.toString());

          window.location.href = checkoutUrl;
          closePopup();
        } else {
          toast.error('Không tìm thấy đường dẫn thanh toán.');
        }
      } else {
        toast.error('Tạo liên kết thanh toán không thành công.');
      }
    }
  };

  const handleImageDelete = () => {
    setBannerImage(''); // Clear the single image
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get('status');

    dispatch(fetchAdsOfSystem());
    if (userInfo?.locationId !== undefined) {
      dispatch(fetchAdsRegistrationOfLocation(userInfo.locationId));
      if (status === 'PAID') {
        const adsRegistration = {
          locationId: userInfo.locationId,
          adsId: Number(localStorage.getItem('adsId')),
          bannerImage: localStorage.getItem('uploadedImage') || '',
        };

        dispatch(addAdsRegistration(adsRegistration));
        localStorage.removeItem('adsId');
        localStorage.removeItem('uploadedImage');
      }
    }
  }, [dispatch, userInfo]);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('vi-VN').format(price);

  const handleRegisterClick = async (adIndex: number, ad: AdsResponse) => {
    setLoadingArray((prev) => {
      const newLoadingArray = [...prev];
      newLoadingArray[adIndex] = true;
      return newLoadingArray;
    });

    if (ad.type === 'BANNER') {
      setSelectedAd(ad);
      setIsPopupOpen(true);
      setLoadingArray((prev) => {
        const newLoadingArray = [...prev];
        newLoadingArray[adIndex] = false;
        return newLoadingArray;
      });
    } else if (ad.type === 'AREA') {
      const items: Item[] = [
        {
          name: `Ads - ${ad.name}`,
          quantity: 1,
          price: ad.price,
        },
      ];

      const paymentData: CreatePaymentDto = {
        buyerName: userInfo?.fullName || 'Unknown Buyer',
        buyerPhone: userInfo?.phone || 'Unknown Phone',
        description: 'Payment monthly',
        returnUrl: 'https://skedeat.site/manage/advertisement',
        cancelUrl: 'https://skedeat.site/manage/advertisement',
        paymentType: 'ORDER',
        items: items,
      };

      const paymentResponse = await dispatch(createPaymentLink(paymentData));

      localStorage.setItem(
        'adsId',
        ad?.id !== undefined ? ad.id.toString() : '0',
      );
      localStorage.setItem('price', ad.price.toString());

      if (paymentResponse.meta.requestStatus === 'fulfilled') {
        const checkoutUrl = paymentResponse.payload;
        if (checkoutUrl) {
          setLoadingArray((prev) => {
            const newLoadingArray = [...prev];
            newLoadingArray[adIndex] = false;
            return newLoadingArray;
          });
          window.location.href = checkoutUrl;
        } else {
          toast.error('Không tìm thấy đường dẫn thanh toán.');
        }
      } else {
        toast.error('Tạo liên kết thanh toán không thành công.');
      }
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedAd(null);
  };

  const isAdPackageRegistered = (adId: number) =>
    adsOfLocation?.some((ad) => ad.ads.id === adId) || false;

  return (
    <>
      <Header />
      <div className="mt-[100px] flex min-h-screen">
        <div className="fixed top-[100px] left-0 w-[15vw]">
          <Menu />
        </div>

        <div className="ml-[15vw] w-[85vw] flex flex-col overflow-y-auto">
          <Image />
          <div className="p-8 bg-background text-foreground space-y-10 mx-5">
            <h1 className="text-3xl text-amber-600 font-bold text-left mb-6">
              Tiếp Thị và Quảng Cáo
            </h1>

            <div>
              <div className="mb-6">
                <div className="flex space-x-10 text-lg text-gray-700">
                  <button
                    className={`font-semibold border-b-2 border-amber-600 text-amber-600 pb-2`}
                  >
                    Chiến dịch quảng cáo
                  </button>
                  <Link
                    to={RESTAURANT_ADMIN_MANAGE_ADVERTISEMENT_ANALYSIS_ROUTE}
                  >
                    <button className={`font-semibold border-b-2 pb-2`}>
                      Phân tích
                    </button>
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Khuyến Mãi của Nhà hàng',
                    description:
                      'Công cụ tăng đơn hàng bằng cách tạo chương trình giảm giá',
                  },
                  {
                    title: 'Flash Sale Của Nhà hàng',
                    description:
                      'Công cụ giúp tăng doanh số bằng cách tạo khuyến mãi khủng trong các khung giờ nhất định',
                  },
                  {
                    title: 'Đặt Kèm Deal Sốc',
                    description:
                      'Công cụ tăng đơn hàng bằng cách tạo mã giảm giá tặng cho khách hàng',
                  },
                ].map((campaign, index) => (
                  <div
                    key={index}
                    className="flex flex-col justify-between bg-card p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
                  >
                    <div>
                      <h3 className="text-xl font-semibold text-primary-foreground mb-2">
                        {campaign.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {campaign.description}
                      </p>
                    </div>
                    <button className="mt-6 bg-white border-2 border-amber-600 text-amber-600 py-2 px-4 rounded-lg font-semibold hover:bg-amber-600 hover:text-white transition-colors hover:font-semibold duration-300">
                      Tạo
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-10 border-b-2 border-gray-300"></div>
            </div>

            <div className="text-left p-6">
              <h2 className="text-3xl font-bold mb-8 text-amber-600">
                <span className="">Các gói quảng cáo</span>
              </h2>

              {/* Monthly Packages */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-6 ">Gói Tháng</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      name: 'Gói Cơ Bản',
                      description:
                        'Cập nhật thông tin cơ bản và voucher giới hạn',
                      price: '500.000₫',
                      duration: '/tháng',
                      features: [
                        'Thông tin cơ bản',
                        'Voucher tùy chỉnh 5 lần',
                        'Theo dịp lễ hội',
                        'Khuyến mãi đặc biệt',
                        'Khung giờ vàng',
                      ],
                    },
                    {
                      name: 'Gói Nổi Bật',
                      description:
                        'Phát hành và quản lý số lượng voucher tùy chỉnh',
                      price: '1.500.000₫',
                      duration: '/tháng',
                      features: [
                        'Voucher tùy chỉnh không giới hạn',
                        'Theo dịp lễ hội',
                        'Khuyến mãi đặc biệt',
                        'Khung giờ vàng',
                        'Tất cả tính năng của gói Cơ Bản',
                      ],
                    },
                    {
                      name: 'Gói Cao Cấp',
                      description: 'Đẩy nhà hàng lên vị trí nổi bật',
                      price: '3.000.000₫',
                      duration: '/tháng',
                      features: [
                        'Tìm kiếm nổi bật',
                        'Banner trên đầu trang',
                        'Tất cả tính năng của gói Nổi Bật',
                      ],
                    },
                  ].map((pkg, index) => (
                    <div
                      key={index}
                      className="rounded-xl p-6 transition-all duration-300 flex flex-col shadow-lg hover:shadow-xl hover:scale-105"
                    >
                      {/* Content Section */}
                      <div className="flex-grow">
                        {/* Header with icon */}
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">S</span>
                          </div>
                          <span className="font-medium">Premium</span>
                        </div>

                        {/* Package Name */}
                        <h3 className="text-amber-600 text-3xl font-bold mb-2">
                          {pkg.name}
                        </h3>

                        {/* Price Section */}
                        <div className="flex items-baseline gap-1 mb-6">
                          <span className="text-xl font-bold">{pkg.price}</span>
                          <span className="text-gray-400 text-sm">
                            {pkg.duration}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-gray-400 text-sm mb-6">
                          {pkg.description}
                        </p>

                        {/* Features */}
                        <ul className="space-y-4">
                          {pkg.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-xl">•</span>
                              <span className="text-lg">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Button and Terms Section - Fixed at bottom */}
                      <div className="mt-6">
                        <button className="w-full bg-amber-600 text-white font-bold py-3 px-8 rounded-full hover:scale-105 transition-transform">
                          Đăng ký ngay
                        </button>
                        <div className="text-center mt-4">
                          <p className="text-gray-400 text-sm hover:underline">
                            Có áp dụng điều khoản
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10 border-b-2 border-gray-300"></div>

              {/* One-time Packages */}
              <div className="mt-5">
                <h3 className="text-2xl font-bold mb-6">Gói Lẻ</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {adsResponse?.content.map((ad, index) => (
                    <div
                      key={index}
                      className="rounded-lg p-6 transition-all duration-300 flex flex-col shadow-lg hover:shadow-xl hover:scale-105"
                    >
                      {/* Content Section */}
                      <div className="flex-grow">
                        {/* Header with icon */}
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">S</span>
                          </div>
                          <span className="font-medium">Premium</span>
                        </div>

                        {/* Package Name */}
                        <h3 className="text-amber-600 text-3xl font-bold mb-2">
                          {ad.name}
                        </h3>

                        {/* Price Section */}
                        <div className="flex items-baseline gap-1 mb-6">
                          <span className="text-xl font-bold">
                            {formatPrice(ad.price)}₫
                          </span>
                          <span className="text-gray-400 text-sm">
                            / {ad.duration} phút
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-gray-400 text-lg mb-6">
                          {ad.description}
                        </p>
                      </div>

                      {/* Button and Terms Section - Fixed at bottom */}
                      <div className="mt-6">
                        <button
                          type="submit"
                          disabled={
                            loadingArray[index] ||
                            !!isAdPackageRegistered(ad.id)
                          }
                          onClick={() => handleRegisterClick(index, ad)}
                          className={`w-full ${isAdPackageRegistered(ad.id) ? 'bg-white text-amber-600 border-2' : 'text-white bg-amber-600'}  font-bold py-3 px-8 rounded-full hover:scale-105 transition-transform`}
                        >
                          {loadingArray[index] ? (
                            <Spin size="small" />
                          ) : isAdPackageRegistered(ad.id) ? (
                            'Đã đăng kí'
                          ) : (
                            'Đăng ký ngay'
                          )}
                        </button>
                        <div className="text-center mt-4">
                          <p className="text-gray-400 text-sm hover:underline">
                            Có áp dụng điều khoản
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />

      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closePopup}
          />

          {/* Modal */}
          <div className="bg-white rounded-xl shadow-2xl w-[1920px] h-[630px] relative animate-in zoom-in-95">
            {/* Header */}
            <div className="p-6 text-center">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Upload Banner Image
              </h2>
              <p className="text-gray-500 text-sm">
                Recommended size: 1920x630px
              </p>
            </div>

            {/* Upload Area */}
            <label className="block cursor-pointer mx-6" htmlFor="file-upload">
              <div className="relative group">
                {bannerImage ? (
                  <div className="relative w-full h-[420px]">
                    <img
                      src={bannerImage}
                      alt="Banner Preview"
                      className="w-full h-full object-cover rounded-lg shadow-md"
                    />
                    {/* Delete Button */}
                    <button
                      type="button"
                      onClick={handleImageDelete}
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
                  <div className="w-full h-[420px] rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors bg-gray-50 flex flex-col items-center justify-center gap-4">
                    <div className="p-4 rounded-full bg-gray-100">
                      <svg
                        className="w-8 h-8 text-gray-400"
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
                    <div className="text-center">
                      <span className="text-gray-600 font-medium">
                        Click to upload image
                      </span>
                      <p className="text-gray-400 text-sm mt-1">
                        or drag and drop your file here
                      </p>
                    </div>
                  </div>
                )}
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </div>
            </label>

            {/* Action Buttons */}
            <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-end items-center gap-3 border-t">
              <button
                onClick={closePopup}
                className="px-6 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                disabled={loading}
                onClick={() =>
                  handleSubmitAdsBANNER(
                    selectedAd?.price ?? 0,
                    selectedAd?.name ?? '',
                  )
                }
                className="px-6 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white transition-colors font-medium"
              >
                {loading ? <Spin size="small" /> : 'Tải ảnh và Đăng kí'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageAdvertisingCampaign;
