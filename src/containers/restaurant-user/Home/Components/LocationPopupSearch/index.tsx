import {
  DEFAULT_PAGE_NO,
  DEFAULT_PAGE_SIZE,
  DEFAULT_SORT_BY,
  DEFAULT_SORT_DIR,
  DEFAULT_STATUS,
} from '@/common/constants/paginationConstant';
import { RESTAURANT_DETAIL_ROUTE } from '@/common/constants/routerConstant';
import { debounce } from 'lodash';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ReduxDispatch } from '@/libs/redux/store';
import { searchLocation } from '../../thunks';
import { getUserLocation, LocationResult } from '@/utils/location';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  width: number;
}

const LocationPopupSearch: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  width,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<ReduxDispatch>();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [searchText, setSearchText] = useState<string>('');
  const [searchNearBy, setSearchNearBy] = useState<boolean>(false);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (inputRef.current) {
        inputRef.current.focus();
      }

      const fetchLocation = async () => {
        try {
          const result: LocationResult = await getUserLocation();
          setSearchNearBy(result.searchNearBy);
          if (result.searchNearBy && result.location) {
            setLatitude(result.location.latitude);
            setLongitude(result.location.longitude);
          } else {
            setLatitude(null);
            setLongitude(null);
          }
        } catch (error) {
          console.error('Error fetching user location:', error);
          setSearchNearBy(false);
          setLatitude(null);
          setLongitude(null);
        }
      };

      fetchLocation();
    }
  }, [isOpen]);

  const debouncedSearch = useCallback(
    debounce(async (searchText: string) => {
      console.log('API call with search text:', searchText);
      console.log('searchNearBy:', searchNearBy);
      console.log('latitude:', latitude);
      console.log('longitude:', longitude);

      // Define the search criteria
      // disable any here
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const locationSearchCriteria: any = {
        pageNo: DEFAULT_PAGE_NO,
        pageSize: DEFAULT_PAGE_SIZE,
        sortBy: DEFAULT_SORT_BY,
        sortDir: DEFAULT_SORT_DIR,
        status: DEFAULT_STATUS,
        name: searchText,
        brandName: searchText,
        categoryName: [],
        tagName: [],
        searchNearBy: searchNearBy,
        ...(searchNearBy && latitude && longitude
          ? { latitude, longitude }
          : {}),
      };

      const resultAction = await dispatch(
        searchLocation(locationSearchCriteria),
      );

      if (searchLocation.fulfilled.match(resultAction)) {
        console.log('Search result:', resultAction.payload);
      } else {
        console.error('Search failed:', resultAction.error);
      }
    }, 1000), // 1 second delay before the API call is triggered
    [searchNearBy, latitude, longitude, dispatch],
  );

  useEffect(() => {
    if (searchText.trim()) {
      debouncedSearch(searchText.trim());
    }

    return () => {
      debouncedSearch.cancel();
    };
  }, [searchText, debouncedSearch]);

  const handleNavigation = () => {
    navigate(RESTAURANT_DETAIL_ROUTE);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-lg shadow-lg overflow-hidden"
        style={{ width }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="p-6 mt-4 flex flex-col h-full">
          <div className="flex items-center mb-4">
            <input
              ref={inputRef}
              type="text"
              placeholder="Nhập từ khóa"
              className="w-3/4 h-12 border border-neutral-400 rounded-l-lg px-4 text-gray-700 placeholder-gray-500"
              value={searchText}
              onChange={handleInputChange}
            />
            <button className="cursor-pointer w-1/4 h-12 bg-amber-600 text-white text-base font-medium flex items-center justify-center rounded-r-lg border border-neutral-400">
              Tìm kiếm
            </button>
          </div>

          <div className="mt-2 text-black text-2xl font-bold">
            Tìm kiếm nổi bật
          </div>

          <div
            className="mt-4 flex-1 overflow-auto"
            style={{ maxHeight: 'calc(8 * 4rem)' }}
          >
            {[...Array(10)].map((_, index) => (
              <div
                key={index}
                className="cursor-pointer bg-white shadow rounded-lg border border-neutral-500 w-full p-4 flex flex-col gap-2 mb-4"
                onClick={handleNavigation}
              >
                <div className="flex items-center gap-2 border-b border-neutral-500 pb-2">
                  <div className="w-10 h-10 bg-gray-300 rounded-md"></div>
                  <div className="text-black text-base font-medium">
                    kichikichi
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức,
                  Hồ Chí Minh 700000
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="text-xs text-gray-800">Đánh giá</div>
                  <div className="text-xs text-gray-600">Lượt đặt: 300050</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationPopupSearch;
