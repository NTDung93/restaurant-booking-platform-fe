import { RESTAURANT_ADMIN_DETAIL_TABLE_BOOKING_ROUTE } from '@/common/constants/routerConstant';
import Header from '@/components/restaurant-admin/Header';
import Image from '@/components/restaurant-admin/Img';
import Menu from '@/components/restaurant-admin/Menu';
import { ReduxDispatch, ReduxState } from '@/libs/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchBookingByLocation } from './thunks';
import { useEffect, useState } from 'react';
import { ApiStatus } from '@/common/enums/apiStatus';
import { ResponseEntityPagination } from '@/common/models/pagination';
import { BookingLocation } from '@/common/models/booking';
import { selectBookingByLocation } from './selector';
import { selectUserInfo } from '@/containers/restaurant-user/Auth/selector';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export default function ManageBookingTableAll() {
  const navigate = useNavigate();
  const dispatch = useDispatch<ReduxDispatch>();
  const userInfo = useSelector(selectUserInfo);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);

  const [selectedStatus, setSelectedStatus] = useState('');

  const bookingsResponse = useSelector<
    ReduxState,
    ResponseEntityPagination<BookingLocation> | undefined
  >(selectBookingByLocation);
  const status = useSelector(
    (state: ReduxState) => state.bookingByLocation.status,
  );

  const totalPages = bookingsResponse?.totalPages || 0;
  const totalItems = bookingsResponse?.totalElements || 0;

  const handleDetail = (id: string) => {
    navigate(RESTAURANT_ADMIN_DETAIL_TABLE_BOOKING_ROUTE.replace(':id', id));
  };

  useEffect(() => {
    const locationId = userInfo?.locationId;
    if (locationId !== undefined) {
      dispatch(
        fetchBookingByLocation({
          locationId,
          currentPage,
          pageSize,
          status: selectedStatus,
        }),
      );
    }
  }, [dispatch, currentPage, pageSize, selectedStatus]);

  const goToPage = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <Header />
      <div className="mt-[100px] flex bg-gray-50">
        {/* Fixed Menu */}
        <div className="fixed top-[100px] left-0 w-[15vw]">
          <Menu />
        </div>

        {/* Main Content */}
        <div className="ml-[15vw] w-[85vw] flex flex-col overflow-y-auto">
          <Image />

          <div className="p-8 bg-background text-foreground space-y-10 mx-5">
            <h1 className="text-3xl font-bold text-amber-600 mb-8">
              Quản lý đặt bàn
            </h1>

            {/* Filter Buttons */}
            <div className="mb-6">
              <div className="flex space-x-10 text-lg font-medium text-gray-700">
                <button
                  className={`font-semibold border-b-2 pb-2 ${selectedStatus === '' ? 'border-amber-600 text-amber-600' : ''}`}
                  onClick={() => setSelectedStatus('')}
                >
                  Tất cả
                </button>
                <button
                  className={`font-semibold border-b-2 pb-2 ${selectedStatus === 'PENDING' ? 'border-amber-600 text-amber-600' : ''}`}
                  onClick={() => setSelectedStatus('PENDING')}
                >
                  Bàn đang đợi
                </button>
                <button
                  className={`font-semibold border-b-2 pb-2 ${selectedStatus === 'CONFIRMED' ? 'border-amber-600 text-amber-600' : ''}`}
                  onClick={() => setSelectedStatus('CONFIRMED')}
                >
                  Bàn đã xác nhận
                </button>
                <button
                  className={`font-semibold border-b-2 pb-2 ${selectedStatus === 'SUCCESSFUL' ? 'border-amber-600 text-amber-600' : ''}`}
                  onClick={() => setSelectedStatus('SUCCESSFUL')}
                >
                  Bàn hoàn thành
                </button>
                <button
                  className={`font-semibold border-b-2 pb-2 ${selectedStatus === 'CANCELLED' ? 'border-amber-600 text-amber-600' : ''}`}
                  onClick={() => setSelectedStatus('CANCELLED')}
                >
                  Bàn hủy
                </button>
              </div>
            </div>

            <div className="relative w-full p-6 bg-white shadow-md rounded-lg">
              <div className="text-center grid grid-cols-7 gap-6 text-lg font-semibold text-gray-800 mb-4 bg-gray-200 p-4 rounded-lg">
                <div className="font-bold">Mã bàn đặt</div>
                <div className="font-bold">Người lớn</div>
                <div className="font-bold">Trẻ em</div>
                <div className="font-bold">Ngày đặt</div>
                <div className="font-bold">Thời gian đặt</div>
                <div className="font-bold">Trạng thái</div>
              </div>

              {status === ApiStatus.Loading ? (
                <div className="text-center text-xl text-gray-500">
                  <Spin
                    indicator={
                      <LoadingOutlined
                        style={{ fontSize: 50, color: 'orange' }}
                        spin
                      />
                    }
                  />
                </div>
              ) : bookingsResponse?.content &&
                bookingsResponse.content.length > 0 ? (
                bookingsResponse.content.map(
                  (row: BookingLocation, idx: number) => (
                    <div
                      key={idx}
                      className="text-center grid grid-cols-7 gap-6 items-center text-lg font-normal text-gray-800 mb-4 p-4 bg-white rounded-lg shadow-sm"
                    >
                      <div className="font-bold">#{row.id}</div>
                      <div>{row.numberOfAdult}</div>
                      <div>{row.numberOfChildren}</div>
                      <div>{row.bookingDate}</div>
                      <div>{row.bookingTime}</div>
                      <div
                        className={`font-bold px-3 py-2 rounded-lg ${
                          row?.status === 'SUCCESSFUL'
                            ? 'bg-green-100 text-green-600'
                            : row?.status === 'CANCELLED'
                              ? 'bg-red-100 text-red-600'
                              : row?.status === 'CONFIRMED'
                                ? 'bg-yellow-100 text-yellow-600'
                                : 'bg-sky-100 text-sky-700'
                        }`}
                      >
                        {row.status}
                      </div>
                      <div className="flex gap-2">
                        <button
                          className="px-4 py-2 bg-amber-600 text-white rounded-lg font-bold hover:bg-amber-700"
                          onClick={() => handleDetail(row.id.toString())}
                        >
                          Chi tiết
                        </button>
                      </div>
                    </div>
                  ),
                )
              ) : (
                <div className="text-center text-lg text-gray-700">
                  Không có đơn đặt bàn
                </div>
              )}
            </div>

            <div className="flex justify-between items-center mt-6">
              <div className="text-lg text-gray-700">
                Hiển thị trang {currentPage} trên {totalPages} ({totalItems} bản
                ghi)
              </div>
              <div className="flex space-x-3 items-center">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-amber-600 text-white rounded-lg disabled:bg-gray-400"
                >
                  Trang trước
                </button>

                <span>
                  {currentPage} / {totalPages}
                </span>

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-amber-600 text-white rounded-lg disabled:bg-gray-400"
                >
                  Trang tiếp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
