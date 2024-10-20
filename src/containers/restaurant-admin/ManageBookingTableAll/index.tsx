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

export default function ManageBookingTableAll() {
  const navigate = useNavigate();
  const dispatch = useDispatch<ReduxDispatch>();
  const userInfo = useSelector(selectUserInfo);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

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
      dispatch(fetchBookingByLocation({ locationId, currentPage, pageSize }));
    }
  }, [dispatch, currentPage, pageSize]);

  const goToPage = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <Header />
      <div className="mt-[100px] flex min-h-screen">
        <Menu />
        <div className="w-[85vw] flex flex-col ">
          <Image />
          <div className="ml-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">
              Quản lý đặt bàn
            </h1>
            <div className="relative flex justify-start items-center ">
              <div className="flex space-x-10 text-xl font-medium">
                <button className="text-amber-600 font-bold border-b-4 border-amber-600 pb-2">
                  Tất cả
                </button>
              </div>
            </div>
            <div className="relative w-full p-4">
              <div className="grid grid-cols-7 gap-4 items-center text-lg font-normal text-black mb-4 bg-gray-100 px-5 rounded-lg">
                <div>Mã bàn đặt</div>
                <div>Người lớn</div>
                <div>Trẻ em</div>
                <div>Ngày đặt</div>
                <div>Thời gian đặt</div>
                <div>Trạng thái</div>
                <div>Thao tác</div>
              </div>

              {status === ApiStatus.Loading ? (
                <div>Đang tải...</div>
              ) : (
                bookingsResponse?.content.map(
                  (row: BookingLocation, idx: number) => (
                    <div
                      key={idx}
                      className="grid grid-cols-7 gap-4 items-center text-xl font-normal text-black mb-4 px-5"
                    >
                      <div>#{row.id}</div>
                      <div>{row.numberOfAdult}</div>
                      <div>{row.numberOfChildren}</div>
                      <div>{row.bookingDate}</div>
                      <div>{row.bookingTime}</div>
                      <div
                        className={
                          row.status === 'Đã hoàn thành'
                            ? 'text-green-600'
                            : row.status === 'Đã hủy'
                              ? 'text-red-600'
                              : 'text-sky-700'
                        }
                      >
                        {row.status}
                      </div>

                      <div className="flex gap-4">
                        <button
                          className="px-4 py-2 bg-amber-600 text-white rounded-2xl font-bold"
                          onClick={() => handleDetail(row.id.toString())}
                        >
                          Chi tiết
                        </button>
                      </div>
                    </div>
                  ),
                )
              )}
            </div>

            <div className="flex justify-between items-center mt-6">
              <div className="text-lg">
                Hiển thị trang {currentPage} trên {totalPages} ({totalItems} bản
                ghi)
              </div>
              <div className="flex space-x-2 items-center">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="bg-amber-600 text-white px-4 py-2 rounded-lg disabled:bg-gray-400"
                >
                  Trang trước
                </button>
                <div className="flex space-x-1">
                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1,
                  ).map((page) => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`px-2 py-1 rounded-lg ${
                        page === currentPage
                          ? 'bg-amber-600 text-white'
                          : 'bg-gray-200 text-black'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="bg-amber-600 text-white px-4 py-2 rounded-lg disabled:bg-gray-400"
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
